# Blog Patch (Sanity) — CraftedTemplate

This patch adds a functional blog powered by Sanity.

## Install
```bash
npm i @portabletext/react
```

## What changed
- **Sanity Schemas**: `author`, `category`, `post` (update `sanity/schemas/index.js`)
- **Queries & Helpers**: `lib/sanity/queries.blog.js`, `lib/blog.js`
- **Pages**: `app/blog/page.js`, `app/blog/[slug]/page.js`
- **Components**: `components/BlogCard.jsx`, `components/RichText.jsx`
- **Sitemap**: updated to include blog posts (uses `NEXT_PUBLIC_SITE_URL` if set)

## Studio
Open `/studio` and create:
1. Author (name + optional photo)
2. Post with title, slug, cover image, author, body, and `publishedAt`

Publish, then visit `/blog` and `/blog/[slug]`.

## Notes
- Images are served from Sanity CDN; ensure `cdn.sanity.io` is allowed in `next.config.js` images.remotePatterns.
- If you have no posts yet, the blog shows a friendly empty state.
