import BlogCard from "../../../../components/BlogCard";
import { getTagCounts, getPostsByTag } from "../../../../lib/blog.taxonomy";

export const revalidate = 300;

export async function generateStaticParams() {
  const tags = await getTagCounts();
  return tags.map(t => ({ tag: t.tag }));
}

export async function generateMetadata({ params }) {
  const title = `Tag: ${params.tag} — CraftedTemplate`;
  return { title, description: `Posts tagged ${params.tag}` };
}

export default async function TagPage({ params }) {
  const posts = await getPostsByTag(params.tag);
  return (
    <div className="container py-12">
      <h1 className="text-2xl md:text-3xl font-bold">Tag: {params.tag}</h1>
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
