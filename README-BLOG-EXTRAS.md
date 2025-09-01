# Blog Extras: Categories Filter, RSS, and OG Images

This patch adds:
- Category **filters** on `/blog`
- An **RSS feed** at `/feed.xml`
- **Dynamic Open Graph images** for posts (`/blog/[slug]/opengraph-image`)

## Install
No extra packages required. (OG images use `next/og`.)

## Steps
1. Copy these files into your project (overwrite `app/blog/page.js`):
   - `app/blog/page.js` (with category filters)
   - `app/feed.xml/route.js` (RSS)
   - `app/blog/[slug]/opengraph-image.js` (dynamic OG)
2. Ensure `NEXT_PUBLIC_SITE_URL` is set in `.env.local` for correct RSS item links.
3. Deploy. Your blog posts will now have per-post OG images automatically.
4. (Optional) Link the RSS in your `<head>` by adding to your root layout metadata:
```js
export const metadata = {
  other: {
    "link:alternate": [{ rel: "alternate", type: "application/rss+xml", title: "CraftedTemplate Blog RSS", href: "/feed.xml" }]
  }
};
```

## Notes
- Category values use the `slug` (or fallback to title) from your Sanity categories.
- The OG image is text-based and fast. You can customize colors & layout easily.
