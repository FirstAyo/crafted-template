# Payments Patch — Lemon Squeezy + Stripe (pick one)

## Option A: Lemon Squeezy
1. Create a product + variant in Lemon Squeezy.
2. Set `NEXT_PUBLIC_LS_STORE_DOMAIN` in `.env.local` (e.g., `yourstore.lemonsqueezy.com`).
3. In **Sanity Studio** → Template, fill **Lemon Squeezy Variant ID**.
4. (Optional) Webhook: set endpoint to `/api/lemonsqueezy/webhook` and save the signing secret to `LS_WEBHOOK_SECRET`.
5. On the template detail page, render `<BuyButton template={t} />`.

## Option B: Stripe Checkout
1. Create a **Price** in Stripe.
2. Put `STRIPE_SECRET_KEY` in `.env.local`.
3. Fill **Stripe Price ID** in your Template document.
4. The Buy button calls `/api/stripe/checkout` and redirects to Checkout.
5. Webhook: add `/api/stripe/webhook`, copy signing secret into `STRIPE_WEBHOOK_SECRET`, then handle `checkout.session.completed` in the route.

## Fulfillment
- Easiest: let Lemon Squeezy email the file/license automatically.
- Build-your-own: In webhooks, send a signed download link or grant access in your DB.

## Install
Copy these files into your project and update the template detail page to use the BuyButton.
