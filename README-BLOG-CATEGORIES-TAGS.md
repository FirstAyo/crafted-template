# Blog Categories & Tags Patch

Adds:
- `/blog/categories` (with per-category post counts)
- `/blog/category/[slug]` detail route
- `/blog/tags` (with tag clouds + counts)
- `/blog/tag/[tag]` detail route
- Sanity `post` schema now supports `tags` (array of strings)
- Updated GROQ queries to include `tags`
- Sitemap now includes category & tag pages

## Steps
1. Copy files into your project (overwrite when prompted).
2. In **Sanity Studio**, re-deploy schema (or just refresh) so the new `tags` field appears on posts.
3. Add categories (via references) and tags (strings) to a few posts, publish them.
4. Visit:
   - `/blog/categories` → list
   - `/blog/category/<slug>` → category page
   - `/blog/tags` → tags list
   - `/blog/tag/<tag>` → tag page

## Notes
- Category links also hook into `/blog?category=slug` for the index filter.
- All routes use ISR (revalidate = 300) and will refresh via your existing `/api/revalidate` webhook if you include `post` in triggers.
