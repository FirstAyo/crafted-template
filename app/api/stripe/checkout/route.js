import Stripe from "stripe";
import { getServerClient } from "@/lib/sanity/serverClient";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    // Accept JSON or form; we only trust the slug
    const ct = request.headers.get("content-type") || "";
    let slug = "template";

    if (ct.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      slug = body?.slug || slug;
    } else {
      const form = await request.formData();
      slug = form.get("slug") || slug;
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response("Stripe not configured", { status: 400 });
    }

    // 🔒 Look up the Stripe Price ID in Sanity by slug (ignore client priceId)
    const sanity = getServerClient();
    const doc = await sanity.fetch(
      `*[_type=="template" && slug.current==$slug][0]{ "priceId": stripePriceId }`,
      { slug }
    );

    const priceId = doc?.priceId;
    if (!priceId || !String(priceId).startsWith("price_")) {
      return new Response("No price configured for this template", {
        status: 400,
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/templates/${slug}`,
      metadata: { slug }, // used later for fulfillment
    });

    // Using JSON response (works with your current BuyButton)
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return new Response(e?.message || "Stripe error", { status: 500 });
  }
}
