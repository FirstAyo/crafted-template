import BlogCard from "../../../../components/BlogCard";
import { getPostsByCategory, getCategoryCounts } from "../../../../lib/blog.taxonomy";

export const revalidate = 300;

export async function generateStaticParams() {
  const cats = await getCategoryCounts();
  return cats.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const title = `Category: ${params.slug} — CraftedTemplate`;
  return { title, description: `Posts in ${params.slug}` };
}

export default async function CategoryPage({ params }) {
  const posts = await getPostsByCategory(params.slug);
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Category: {params.slug}</h1>
      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-700">No posts yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((p) => <BlogCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
