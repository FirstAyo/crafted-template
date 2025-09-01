# Stripe Fulfillment (Signed Download + Email via Resend)

## What this does
- Verifies Stripe webhook signature
- Generates a **signed 72‑hour** download link
- Emails the link to the buyer via **Resend**

## Files
- `lib/sanity/serverClient.js`
- `lib/security/downloadToken.js`
- `app/api/download/route.js`
- `app/api/stripe/webhook/route.js`

## Env
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
DOWNLOAD_SECRET=super-secret-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2023-10-01
# SANITY_READ_TOKEN=...   # if dataset is private
```

## Test
```
npm run dev
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
```
Check your inbox if `RESEND_API_KEY` is set.

## Notes
- Upload a `downloadFile` to each Template in Studio.
- The slug is passed to Stripe metadata during checkout creation.
- Edit the expiry by changing `minutes: 72 * 60`.
