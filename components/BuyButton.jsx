"use client";
import { useState } from "react";

export default function BuyButton({ template }) {
  const [loading, setLoading] = useState(false);
  const priceId = template?.stripePriceId;

  if (!priceId) {
    return (
      <span className="rounded-xl bg-zinc-300 text-white font-medium inline-flex items-center justify-center">
        Coming soon
      </span>
    );
  }

  async function handleClick(e) {
    // block any default link/form navigation from parent elements
    e?.preventDefault?.();
    e?.stopPropagation?.();

    try {
      setLoading(true);
      const res = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId, slug: template.slug }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = await res.json();
      window.location.assign(url); // go to Stripe Checkout
    } catch (err) {
      alert(err?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button" // <-- important: don't submit any form
      onClick={handleClick}
      className="rounded-xl bg-brand text-white font-medium hover:bg-brand-dark disabled:opacity-60"
      disabled={loading}
    >
      {loading ? "Redirecting…" : "Buy now"}
    </button>
  );
}
