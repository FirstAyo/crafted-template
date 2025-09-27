import { getTemplates } from "../lib/cms";
import { getPosts } from "../lib/blog";
import { getCategoryCounts, getTagCounts } from "../lib/blog.taxonomy";

export default async function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";

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
    lastModified: new Date().toISOString(),
  }));

  let templateItems = [];
  try {
    const templates = await getTemplates();
    templateItems = templates.map((t) => ({
      url: `${base}/templates/${t.slug}`,
      lastModified: t.updatedAt || new Date().toISOString(),
    }));
  } catch {}

  let blogItems = [];
  try {
    const posts = await getPosts();
    blogItems = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt || p.publishedAt || new Date().toISOString(),
    }));
  } catch {}

  let catItems = [];
  try {
    const cats = await getCategoryCounts();
    catItems = cats.map((c) => ({
      url: `${base}/blog/category/${encodeURIComponent(c.slug)}`,
      lastModified: new Date().toISOString(),
    }));
  } catch {}

  let tagItems = [];
  try {
    const tags = await getTagCounts();
    tagItems = tags.map((t) => ({
      url: `${base}/blog/tag/${encodeURIComponent(t.tag)}`,
      lastModified: new Date().toISOString(),
    }));
  } catch {}

  return [
    ...staticRoutes,
    ...templateItems,
    ...blogItems,
    ...catItems,
    ...tagItems,
    { url: `${base}/terms`, changefreq: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, changefreq: "monthly", priority: 0.3 },
  ];
}
