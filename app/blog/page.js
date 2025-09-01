import Link from "next/link";
import BlogCard from "../../components/BlogCard";
import { getPosts } from "../../lib/blog";

export const revalidate = 300;
export const metadata = {
  title: "Blog — CraftedTemplate",
  description: "Guides, tutorials, and announcements from CraftedTemplate.",
};

function uniq(arr) {
  return Array.from(new Set(arr));
}

export default async function BlogIndex({ searchParams }) {
  const posts = await getPosts();
  const q = (searchParams?.q || "").toLowerCase();
  const cat = (searchParams?.category || "").toLowerCase();

  const categories = uniq(
    posts.flatMap((p) =>
      (p.categories || []).map((c) => c?.slug || c?.title || "")
    )
  ).filter(Boolean);

  const filtered = posts.filter((p) => {
    const matchQ = q
      ? (p.title || "").toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)
      : true;
    const matchCat = cat
      ? (p.categories || []).some(
          (c) => (c?.slug || c?.title || "").toLowerCase() === cat
        )
      : true;
    return matchQ && matchCat;
  });

  const qs = (parts) => {
    const params = new URLSearchParams();
    if (parts.q) params.set("q", parts.q);
    if (parts.category) params.set("category", parts.category);
    return params.toString() ? "?" + params.toString() : "";
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-zinc-600">
        Guides, tutorials, and template announcements.
      </p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form action="/blog" className="flex-1">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search posts…"
            className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40"
          />
        </form>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/blog${qs({ q })}`}
            className={`text-xs rounded-full px-3 py-1 border ${cat ? "border-zinc-300 text-zinc-700" : "border-brand text-brand"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog${qs({ q, category: c })}`}
              className={`text-xs rounded-full px-3 py-1 border ${cat === c ? "border-brand text-brand" : "border-zinc-300 text-zinc-700"}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-700">No matching posts yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <BlogCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
