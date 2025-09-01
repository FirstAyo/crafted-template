import Stripe from "stripe";
import { Resend } from "resend";
import { signDownloadToken } from "../../../../lib/security/downloadToken";
import { getServerClient } from "../../../../lib/sanity/serverClient";

export const runtime = "nodejs";

function htmlEmail({ title, link, site }) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;color:#111827">
    <h2 style="margin:0 0 8px 0">Your download is ready 🎉</h2>
    <p style="margin:0 0 16px 0">Thanks for your purchase of <strong>${title}</strong>.</p>
    <p style="margin:0 0 16px 0">
      <a href="${link}" style="display:inline-block;background:#0ea5e9;color:white;padding:10px 14px;border-radius:10px;text-decoration:none">Download template</a>
    </p>
    <p style="margin:0 0 6px 0;font-size:14px;color:#374151">This link will expire in 72 hours.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
    <p style="font-size:12px;color:#6b7280">If the button doesn't work, copy and paste this URL:<br/>${link}</p>
    <p style="font-size:12px;color:#9ca3af">— ${site.replace(/^https?:\/\//, "")}</p>
  </div>`;
}

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!webhookSecret || !stripeSecret) {
    return new Response("Stripe not configured", { status: 400 });
  }

  const buf = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    const stripe = new Stripe(stripeSecret, { apiVersion: "2025-08-27" });
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const slug = session.metadata?.slug;
    if (!slug) {
      return new Response("Missing slug metadata", { status: 200 });
    }

    const sanity = getServerClient();
    const doc = await sanity.fetch(
      `*[_type=="template" && slug.current==$slug][0]{title, "fileUrl": downloadFile.asset->url}`,
      { slug }
    );

    if (doc?.fileUrl && email && resendKey) {
      const token = signDownloadToken({ slug, minutes: 72 * 60 });
      const link = `${site}/api/download?token=${token}`;

      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "CraftedTemplate <downloads@craftedtemplate.com>",
          to: email,
          subject: `Your download: ${doc.title}`,
          html: htmlEmail({ title: doc.title || "Template", link, site }),
        });
      } catch (e) {
        console.error("Resend error:", e?.message || e);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "content-type": "application/json" },
  });
}
