import { getPosts } from "./blog";

export async function getCategoryCounts() {
  const posts = await getPosts();
  const counts = new Map();
  for (const p of posts) {
    for (const c of (p.categories || [])) {
      const key = (c?.slug || c?.title || "").toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a,b) => b.count - a.count);
}

export async function getTagCounts() {
  const posts = await getPosts();
  const counts = new Map();
  for (const p of posts) {
    for (const t of (p.tags || [])) {
      const key = String(t).toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a,b) => b.count - a.count);
}

export async function getPostsByCategory(slug) {
  const posts = await getPosts();
  const s = slug.toLowerCase();
  return posts.filter(p => (p.categories || []).some(c => (c?.slug || c?.title || "").toLowerCase() === s));
}

export async function getPostsByTag(tag) {
  const posts = await getPosts();
  const s = tag.toLowerCase();
  return posts.filter(p => (p.tags || []).map(x => String(x).toLowerCase()).includes(s));
}
