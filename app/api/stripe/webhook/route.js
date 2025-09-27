// app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { Resend } from "resend";
import { getServerClient } from "@/lib/sanity/serverClient";
import { signDownloadToken } from "@/lib/security/downloadToken";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // ✅ raw body for Stripe signature verification
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session?.customer_details?.email || session?.customer_email;
      const slug = session?.metadata?.slug;

      if (email && slug) {
        // find the file and build a signed link
        const sanity = getServerClient();
        const doc = await sanity.fetch(
          `*[_type=="template" && slug.current==$slug][0]{title,"fileUrl": downloadFile.asset->url}`,
          { slug }
        );

        if (doc?.fileUrl) {
          const site =
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
          const token = signDownloadToken({ slug, sid: session.id, minutes: 60 * 72 }); // 72 hours
          const link = `${site}/api/download?token=${token}`;

          await resend.emails.send({
            from:
              process.env.EMAIL_FROM ||
              "CraftedTemplate <onboarding@resend.dev>",
            to: email,
            subject: `Your download: ${doc.title}`,
            html: `
              <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
                <h2>Thanks for your purchase!</h2>
                <p>Your download is ready. This link expires in 72 hours.</p>
                <p><a href="${link}" style="display:inline-block;background:#111827;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none">Download your template</a></p>
                <p>If the button doesn't work, copy this URL:<br>${link}</p>
              </div>
            `,
          });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new Response("Webhook error", { status: 400 });
  }
}
