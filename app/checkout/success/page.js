import Stripe from "stripe";
import { signDownloadToken } from "@/lib/security/downloadToken";

export const runtime = "nodejs";
export const metadata = {
  title: "Purchase successful — CraftedTemplate",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id;
  let link = null;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20",
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const slug = session?.metadata?.slug;
      if (slug) {
        const site =
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const token = signDownloadToken({ slug, minutes: 60 }); // 1-hour link
        link = `${site}/api/download?token=${token}`;
      }
    } catch (e) {
      console.error("Success page error:", e);
    }
  }

  return (
    <div className="container py-16">
      <h1 className="text-2xl md:text-3xl font-bold">Thank you! 🎉</h1>
      <p className="mt-2 text-zinc-700">Your purchase was successful.</p>

      {link ? (
        <a
          href={link}
          className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark"
        >
          Download your template
        </a>
      ) : (
        <p className="mt-2 text-sm text-zinc-600">
          We’re preparing your download link. Check your email in a moment.
        </p>
      )}

      <div className="mt-6">
        <a
          href="/templates"
          className="text-sm text-brand hover:text-brand-dark"
        >
          Browse more templates
        </a>
      </div>
    </div>
  );
}
