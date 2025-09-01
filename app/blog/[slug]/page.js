import Image from "next/image";
import { notFound } from "next/navigation";
import RichText from "../../../components/RichText";
import { getPosts, getPostBySlug } from "../../../lib/blog";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getPostBySlug(params.slug);
  if (!p) return { title: "Blog — CraftedTemplate" };
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  const url = `${base}/blog/${p.slug}`;
  return {
    title: `${p.title} — CraftedTemplate`,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url,
      siteName: "CraftedTemplate",
      type: "article",
      images: p.coverUrl ? [p.coverUrl] : ["/og/default.png"]
    },
    twitter: { card: "summary_large_image" }
  };
}

function ArticleJsonLd({ post, base }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.coverUrl ? [post.coverUrl] : undefined,
    author: post.author?.name ? [{ "@type": "Person", name: post.author.name }] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${post.slug}` }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";

  return (
    <div className="container py-10">
      <ArticleJsonLd post={post} base={base} />

      <div className="text-sm text-zinc-600">
        <a href="/blog">Blog</a> <span aria-hidden="true">›</span>{" "}
        <span className="text-zinc-900">{post.title}</span>
      </div>

      <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <div className="mt-1 text-sm text-zinc-600">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
        {post.author?.name ? ` • ${post.author.name}` : ""}
      </div>

      {post.coverUrl ? (
        <div className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover" />
        </div>
      ) : null}

      <article className="mt-8">
        <RichText value={post.body} />
      </article>
    </div>
  );
}
