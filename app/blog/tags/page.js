import Link from "next/link";
import { getTagCounts } from "../../../lib/blog.taxonomy";

export const revalidate = 300;
export const metadata = {
  title: "Blog Tags — CraftedTemplate",
  description: "Browse blog posts by tag."
};

export default async function TagsPage() {
  const list = await getTagCounts();

  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Tags</h1>
      <p className="mt-2 text-zinc-600">Explore common topics across posts.</p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-700">No tags yet. Add tags to your posts in Studio.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          {list.map((t) => (
            <Link
              key={t.tag}
              href={`/blog/tag/${encodeURIComponent(t.tag)}`}
              className="rounded-full border border-zinc-300 px-3 py-1 text-sm hover:border-brand hover:text-brand"
            >
              #{t.tag} <span className="text-zinc-500">({t.count})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
