export const metadata = { title: "Checkout canceled — CraftedTemplate" };

export default function CancelPage() {
  return (
    <div className="container py-16">
      <h1 className="text-2xl md:text-3xl font-bold">Checkout canceled</h1>
      <p className="mt-2 text-zinc-700">No worries—your cart is empty. You can try again anytime.</p>
      <div className="mt-6">
        <a href="/templates" className="rounded-xl border border-zinc-300 px-5 py-3 font-medium hover:bg-zinc-50">Back to templates</a>
      </div>
    </div>
  );
}
