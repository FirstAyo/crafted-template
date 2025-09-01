export const metadata = { title: "Pricing — CraftedTemplate" };

export default function PricingPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-zinc-600">Start free, upgrade when you need more.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {name: "Free", price: "$0", features: ["1 free template", "Basic docs", "Community support"], cta: "Start free"},
          {name: "Single Template", price: "From $29", features: ["One premium template", "Full docs", "Email support"], cta: "Buy a template"},
          {name: "All-Access (coming soon)", price: "$9.99/mo", features: ["All templates", "Updates", "Priority support"], cta: "Join waitlist"},
        ].map((p) => (
          <div key={p.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-brand">{p.name}</div>
            <div className="mt-2 text-3xl font-bold">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <button className="mt-6 w-full rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
