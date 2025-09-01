import { sanityClient } from "./sanity/client";
import { POST_LIST, POST_BY_SLUG } from "./sanity/queries.blog";
import { posts as localPosts } from "./data/posts";

const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export async function getPosts() {
  if (!hasSanity) return localPosts;
  try {
    const data = await sanityClient.fetch(POST_LIST);
    if (!Array.isArray(data) || data.length === 0) return localPosts;
    return data;
  } catch (e) {
    console.warn("Sanity posts fetch failed, using localPosts:", e?.message || e);
    return localPosts;
  }
}

export async function getPostBySlug(slug) {
  if (!hasSanity) return localPosts.find(p => p.slug === slug);
  try {
    const data = await sanityClient.fetch(POST_BY_SLUG, { slug });
    return data || localPosts.find(p => p.slug === slug);
  } catch (e) {
    console.warn("Sanity post fetch failed, using localPosts:", e?.message || e);
    return localPosts.find(p => p.slug === slug);
  }
}
