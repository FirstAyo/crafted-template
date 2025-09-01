# Activate Sanity CMS in your Next.js starter

This kit **swaps your app to Sanity**, adds **JSON-LD Product schema**, a **dynamic sitemap**, and provides a **seed dataset**.

## 1) Install dependencies
```bash
npm i sanity next-sanity @sanity/client @sanity/vision @sanity/image-url
```

## 2) Configure env
Create `.env.local` from `.env.example` and fill:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2023-10-01
REVALIDATE_SECRET=supersecret
# optional SANITY_READ_TOKEN for draft preview
```

## 3) Create Sanity project (once)
```bash
npx sanity@latest init --dataset production
# copy your projectId into .env.local
```

## 4) (Optional) Import demo content
```bash
npx sanity dataset import sanity/seed-templates.ndjson production
```

## 5) Add files to your project
Copy the folders from this archive into your Next.js project, **overwriting** existing files when prompted:
- `app/templates/page.js` and `app/templates/[slug]/page.js` (now use Sanity + JSON-LD)
- `app/studio/[[...index]]/page.jsx` (embedded Studio at `/studio`)
- `lib/cms.js` and `lib/sanity/*` (fetch helpers + queries)
- `app/api/revalidate/route.js` (for ISR webhooks)
- `app/sitemap.js` and `app/robots.js` (SEO)

## 6) Run
```bash
npm run dev
# http://localhost:3000/studio  → add/edit templates
# http://localhost:3000/templates
```

## 7) Webhook (recommended)
In Sanity → Project Settings → API → Webhooks, POST to:
```
/api/revalidate
```
Header: `x-revalidate-secret: YOUR_SECRET`  
Body: `{ "secret": "YOUR_SECRET" }` (either header or body is fine)

## Notes
- If env vars are missing or Sanity fetch fails, the app **falls back to your local demo data** so it never breaks.
- Add images in Studio later; the seed uses empty images for simplicity.
- The template detail page now emits **schema.org Product JSON-LD**, which helps SEO for template listings.
