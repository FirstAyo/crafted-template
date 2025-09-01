import Stripe from "stripe";

export const runtime = "nodejs"; // <-- REQUIRED for Stripe SDK

console.log("[checkout route] loaded at", new Date().toISOString());

export async function POST(request) {
  try {
    const body = await request.json();
    const priceId = body?.priceId;
    const slug = body?.slug || "template";

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response("Stripe not configured", { status: 400 });
    }
    if (!priceId || !String(priceId).startsWith("price_")) {
      return new Response("Missing or invalid priceId", { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      // payment_method_collection: "always", // show card form immediately
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/templates/${slug}`,
      metadata: { slug },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return new Response(e?.message || "Stripe error", { status: 500 });
  }
}
