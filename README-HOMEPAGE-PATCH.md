# Homepage Patch — CraftedTemplate

This replaces `app/page.js` with a functional marketing homepage and adds a stub `/api/subscribe` route.

## Features
- Hero with search box → `/templates?q=...`
- Quick category pills
- Featured templates (newest 8, from Sanity via `getTemplates()`)
- Recent blog posts (latest 3, from Sanity via `getPosts()`)
- Newsletter capture form (stub API you can wire to your ESP)
- SEO: Organization + WebSite JSON-LD (with SearchAction)
- ISR (`revalidate = 300`)

## Install
1) Copy files into your project:
   - `app/page.js`
   - `app/api/subscribe/route.js`
2) Ensure you have:
   - `getTemplates()` in `lib/cms.js`
   - `getPosts()` in `lib/blog.js`
   - `components/TemplateCard.jsx` and `components/BlogCard.jsx`
3) Optional: set `NEXT_PUBLIC_SITE_URL` in `.env.local` for correct JSON-LD URLs.
4) Run `npm run dev` and open `/`.

## Wiring the subscribe API
Replace the TODO in `app/api/subscribe/route.js` with a call to your email service.
