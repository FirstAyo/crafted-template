export function buildLemonCheckoutUrl({ variantId, slug, storeDomain }) {
  if (!variantId || !storeDomain) return null;
  const base = `https://${storeDomain.replace(/^https?:\/\//, "")}`;
  const url = new URL(`/checkout`, base);
  url.searchParams.set("variants", String(variantId));
  url.searchParams.set("checkout[custom][template]", slug || "");
  return url.toString();
}
