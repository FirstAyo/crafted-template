// app/sitemap.js
// import type { MetadataRoute } from "next";

export const revalidate = 3600; // refresh sitemap hourly

import { getTemplates } from "../lib/cms";
import { getPosts } from "../lib/blog";
import { getCategoryCounts, getTagCounts } from "../lib/blog.taxonomy";

export default async function sitemap(/*): Promise<MetadataRoute.Sitemap> */) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";

  const now = new Date();

  const staticRoutes = [
    "",
    "/templates",
    "/pricing",
    "/blog",
    "/blog/categories",
    "/blog/tags",
    "/checkout",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: now, // Date is fine; Next also accepts strings
    // changeFrequency: "weekly",
    // priority: 0.7,
  }));

  let templateItems = [];
  try {
    const templates = await getTemplates();
    templateItems = templates.map((t) => ({
      url: `${base}/templates/${t.slug}`,
      lastModified: t.updatedAt ? new Date(t.updatedAt) : now,
      // changeFrequency: "weekly",
    }));
  } catch {}

  let blogItems = [];
  try {
    const posts = await getPosts();
    blogItems = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt
        ? new Date(p.updatedAt)
        : p.publishedAt
          ? new Date(p.publishedAt)
          : now,
      // changeFrequency: "weekly",
    }));
  } catch {}

  let catItems = [];
  try {
    const cats = await getCategoryCounts();
    catItems = cats.map((c) => ({
      url: `${base}/blog/category/${encodeURIComponent(c.slug)}`,
      lastModified: now,
    }));
  } catch {}

  let tagItems = [];
  try {
    const tags = await getTagCounts();
    tagItems = tags.map((t) => ({
      url: `${base}/blog/tag/${encodeURIComponent(t.tag)}`,
      lastModified: now,
    }));
  } catch {}

  return [
    ...staticRoutes,
    ...templateItems,
    ...blogItems,
    ...catItems,
    ...tagItems,
    {
      url: `${base}/terms`,
      changeFrequency: "monthly",
      priority: 0.3,
      lastModified: now,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
      lastModified: now,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.3,
      lastModified: new Date(),
    },
    {
      url: `${base}/contact`,
      changeFrequency: "monthly",
      priority: 0.3,
      lastModified: new Date(),
    },
  ];
}
