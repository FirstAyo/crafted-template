import Stripe from "stripe";
import { getServerClient } from "@/lib/sanity/serverClient";
import { verifyDownloadToken } from "@/lib/security/downloadToken";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token) return new Response("Missing token", { status: 400 });

    const { ok, slug, sid } = verifyDownloadToken(token);
    if (!ok || !slug)
      return new Response("Invalid or expired link", { status: 403 });

    // Optional but recommended: verify the Stripe session is paid and matches the slug
    if (sid && process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20",
      });
      const session = await stripe.checkout.sessions
        .retrieve(sid)
        .catch(() => null);
      const paid = session?.payment_status === "paid";
      const slugMatches = session?.metadata?.slug === slug;
      if (!paid || !slugMatches)
        return new Response("Unauthorized", { status: 403 });
    }

    // Fetch file from Sanity
    const sanity = getServerClient();
    const doc = await sanity.fetch(
      `*[_type=="template" && slug.current==$slug][0]{"fileUrl": downloadFile.asset->url}`,
      { slug }
    );
    if (!doc?.fileUrl) return new Response("File not found", { status: 404 });

    return Response.redirect(doc.fileUrl, 302);
  } catch (e) {
    console.error("download error", e);
    return new Response("Server error", { status: 500 });
  }
}
