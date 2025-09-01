import { getPosts } from "../../lib/blog";

export async function GET() {
  const posts = await getPosts();
  const site = process.env.NEXT_PUBLIC_URL || "https://craftedtemplate.com";

  const rssItems = posts.map(p => {
    const link = `${site}/blog/${p.slug}`;
    const pub = new Date(p.publishedAt || p.updatedAt || Date.now()).toUTCString();
    const description = (p.excerpt || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return `
      <item>
        <title>${p.title}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pub}</pubDate>
        <description>${description}</description>
      </item>
    `;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CraftedTemplate Blog</title>
    <link>${site}/blog</link>
    <description>Guides, tutorials, and announcements from CraftedTemplate.</description>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
