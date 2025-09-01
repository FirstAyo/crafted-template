export const metadata = { title: "Checkout — CraftedTemplate" };
export default function CheckoutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-zinc-600">
        This front-end checkout will connect to Stripe/Lemon Squeezy later.
      </p>
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 max-w-md">
          <input
            placeholder="Email"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40"
          />
          <button className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">
            Pay now
          </button>
          <p className="text-xs text-zinc-600">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
