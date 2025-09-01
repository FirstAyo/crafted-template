import Link from "next/link";
import { getCategoryCounts } from "../../../lib/blog.taxonomy";

export const revalidate = 300;
export const metadata = {
  title: "Blog Categories — CraftedTemplate",
  description: "Browse blog posts by category."
};

export default async function CategoriesPage() {
  const list = await getCategoryCounts();
  const qs = (p) => {
    const s = new URLSearchParams(p);
    const q = s.toString();
    return q ? "?" + q : "";
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
      <p className="mt-2 text-zinc-600">Browse posts by topic.</p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-700">No categories yet. Add categories to your posts in Studio.</p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <li key={c.slug} className="rounded-xl border border-zinc-200 bg-white p-4 flex items-center justify-between">
              <div className="font-medium">{c.slug}</div>
              <div className="text-sm text-zinc-600">{c.count} post{c.count===1?"":"s"}</div>
              <div className="ml-auto flex gap-3">
                <Link href={`/blog?category=${encodeURIComponent(c.slug)}`} className="text-sm text-brand hover:text-brand-dark">View</Link>
                <Link href={`/blog/category/${encodeURIComponent(c.slug)}`} className="text-sm text-zinc-700 hover:text-black">Page</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
