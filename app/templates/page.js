import Link from "next/link";
import TemplateCard from "../../components/TemplateCard";
import { getTemplates } from "../../lib/cms";

export const revalidate = 300; // ISR

const toStr = (v) => Array.isArray(v) ? v[0] : (v || "");

export default async function TemplatesPage({ searchParams }) {
  const all = await getTemplates();

  const q = toStr(searchParams?.q).toLowerCase();
  const category = toStr(searchParams?.category).toLowerCase();
  const price = toStr(searchParams?.price).toLowerCase();
  const tech = toStr(searchParams?.tech).toLowerCase();
  const sort = (toStr(searchParams?.sort) || "newest").toLowerCase();

  let filtered = all.filter(t => {
    const matchQ = q ? (
      (t.title || "").toLowerCase().includes(q) ||
      (t.excerpt || "").toLowerCase().includes(q) ||
      (Array.isArray(t.tags) ? t.tags.join(" ") : "").toLowerCase().includes(q)
    ) : true;
    const matchCat = category ? (t.category || "").toLowerCase().startsWith(category) : true;
    const matchPrice = price === "free" ? !!t.free : price === "paid" ? !t.free : true;
    const matchTech = tech ? (Array.isArray(t.tech) ? t.tech.join(" ") : "").toLowerCase().includes(tech) : true;
    return matchQ && matchCat && matchPrice && matchTech;
  });

  filtered = filtered.sort((a,b) => {
    if (sort === "price-low") return (a.free ? 0 : a.priceUSD||0) - (b.free ? 0 : b.priceUSD||0);
    if (sort === "price-high") return (b.free ? 0 : b.priceUSD||0) - (a.free ? 0 : a.priceUSD||0);
    if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return +new Date(b.updatedAt||0) - +new Date(a.updatedAt||0);
  });

  const qs = (parts) => {
    const params = new URLSearchParams();
    Object.entries(parts).forEach(([k,v]) => { if (v) params.set(k, v); });
    const s = params.toString();
    return s ? `?${s}` : "";
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Templates</h1>
      <p className="mt-2 text-zinc-600">Search and filter curated templates.</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-4 h-fit">
          <div className="space-y-5">
            <div>
              <div className="text-sm font-semibold">Category</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["", "portfolio", "business", "student", "saas"].map(c => (
                  <Link key={c || "all"} href={`/templates${qs({category: c || undefined, price, tech, q, sort})}`}
                    className={`text-xs rounded-full px-3 py-1 border ${(!category && !c) || category===c ? "border-brand text-brand" : "border-zinc-300 text-zinc-700"}`}>
                    {c || "All"}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Price</div>
              <div className="mt-2 flex gap-2">
                {["", "free", "paid"].map(p => (
                  <Link key={p || "all"} href={`/templates${qs({category, price: p || undefined, tech, q, sort})}`}
                    className={`text-xs rounded-full px-3 py-1 border ${(!price && !p) || price===p ? "border-brand text-brand" : "border-zinc-300 text-zinc-700"}`}>
                    {p || "All"}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Tech</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["", "next", "react", "html", "tailwind"].map(t => (
                  <Link key={t || "all"} href={`/templates${qs({category, price, tech: t || undefined, q, sort})}`}
                    className={`text-xs rounded-full px-3 py-1 border ${(!tech && !t) || tech===t ? "border-brand text-brand" : "border-zinc-300 text-zinc-700"}`}>
                    {t || "All"}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Sort</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[["newest","Newest"],["rating","Top rated"],["price-low","Price: low"],["price-high","Price: high"]].map(([key,label]) => (
                  <Link key={key} href={`/templates${qs({category, price, tech, q, sort: key})}`}
                    className={`text-xs rounded-full px-3 py-1 border ${sort===key ? "border-brand text-brand" : "border-zinc-300 text-zinc-700"}`}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between gap-3">
            <form action="/templates" className="flex-1">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search templates, e.g., portfolio, restaurant…"
                className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40"
                aria-label="Search templates"
              />
            </form>
            <div className="text-sm text-zinc-600">{filtered.length} result{filtered.length===1 ? "" : "s"}</div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => <TemplateCard key={t.id} t={t} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
