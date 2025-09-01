export const metadata = { title: "Purchase successful — CraftedTemplate" };

export default function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id;
  return (
    <div className="container py-16">
      <h1 className="text-2xl md:text-3xl font-bold">Thank you! 🎉</h1>
      <p className="mt-2 text-zinc-700">
        Your purchase was successful. A receipt and download instructions are on their way to your email.
      </p>
      {sessionId ? (
        <p className="mt-2 text-sm text-zinc-600">Stripe session: {sessionId}</p>
      ) : null}
      <div className="mt-6">
        <a href="/templates" className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">Browse more templates</a>
      </div>
    </div>
  );
}
