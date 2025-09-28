import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "../../../components/RichText";
import { getPosts, getPostBySlug } from "../../../lib/blog";

export const revalidate = 300;

// Build static params from your data source
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getPostBySlug(params.slug);
  if (!p) return { title: "Blog — CraftedTemplate" };
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
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
      images: p.coverUrl ? [p.coverUrl] : ["/og/default.png"],
    },
    twitter: { card: "summary_large_image" },
  };
}

function ArticleJsonLd({ post, base }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.coverUrl ? [post.coverUrl] : undefined,
    author: post.author?.name
      ? [{ "@type": "Person", name: post.author.name }]
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- Utilities ---------------------------------------------------------------

function byDateDesc(a, b) {
  return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
}

function overlapCount(a = [], b = []) {
  const set = new Set((a || []).map((t) => `${t}`.toLowerCase()));
  let n = 0;
  (b || []).forEach((t) => set.has(`${t}`.toLowerCase()) && n++);
  return n;
}

/**
 * Pick up to N related posts:
 * 1) same series (excluding current)
 * 2) else, by overlapping tags
 * 3) fill with recent posts as fallback
 */
function getRelated(all, current, N = 4) {
  const others = all.filter((p) => p.slug !== current.slug);

  // Same series first
  let picks = [];
  if (current.series) {
    picks = others
      .filter((p) => p.series && p.series === current.series)
      .sort(byDateDesc)
      .slice(0, N);
  }

  // Add by tag overlap if needed
  if (picks.length < N) {
    const remaining = others
      .filter((p) => !picks.find((x) => x.slug === p.slug))
      .map((p) => ({ p, score: overlapCount(p.tags, current.tags) }))
      .filter((x) => x.score > 0)
      .sort((a, b) =>
        b.score !== a.score ? b.score - a.score : byDateDesc(a.p, b.p)
      )
      .map((x) => x.p)
      .slice(0, N - picks.length);
    picks = picks.concat(remaining);
  }

  // Fill with most recent if still short
  if (picks.length < N) {
    const fillers = others
      .filter((p) => !picks.find((x) => x.slug === p.slug))
      .sort(byDateDesc)
      .slice(0, N - picks.length);
    picks = picks.concat(fillers);
  }

  return picks;
}

/** Build prev/next from all posts ordered newest -> oldest */
function getPrevNext(all, current) {
  const sorted = [...all].sort(byDateDesc);
  const idx = sorted.findIndex((p) => p.slug === current.slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null, // previous newer post
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null, // next older post
  };
}

// --- Page --------------------------------------------------------------------

export default async function BlogPostPage({ params }) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";

  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getPosts(),
  ]);

  if (!post) return notFound();

  const related = getRelated(allPosts, post, 4);
  const { prev, next } = getPrevNext(allPosts, post);

  return (
    <div className="container py-10">
      <ArticleJsonLd post={post} base={base} />

      {/* Breadcrumb */}
      <div className="text-sm text-zinc-600">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        <span aria-hidden="true">›</span>{" "}
        <span className="text-zinc-900">{post.title}</span>
      </div>

      {/* Title + meta */}
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <div className="mt-1 text-sm text-zinc-600">
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString()
          : ""}
        {post.author?.name ? ` • ${post.author.name}` : ""}
      </div>

      {/* Layout: article + aside */}
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Main */}
        <div className="lg:col-span-8">
          {post.coverUrl ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          ) : null}

          <article className="mt-8 prose prose-zinc max-w-none">
            <RichText value={post.body} />
          </article>

          <div className="flex flex-col gap-6 mt-10">
            {/* Hosting Academy box */}
            <HostingAcademyBox series={post.series} />
            {/* Prev/Next */}
            <nav
              className="rounded-2xl border bg-white p-4 shadow-sm"
              aria-label="Post navigation"
            >
              <div className="flex flex-col gap-3">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group inline-flex items-start gap-3 rounded-lg border px-3 py-2 hover:bg-zinc-50"
                  >
                    <ArrowLeft className="mt-1 h-4 w-4 text-zinc-500 group-hover:text-zinc-700" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-zinc-500">
                        Previous
                      </div>
                      <div className="line-clamp-2 font-medium text-zinc-900">
                        {prev.title}
                      </div>
                    </div>
                  </Link>
                ) : null}

                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group inline-flex items-start gap-3 rounded-lg border px-3 py-2 hover:bg-zinc-50"
                  >
                    <ArrowRight className="mt-1 h-4 w-4 text-zinc-500 group-hover:text-zinc-700" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-zinc-500">
                        Next
                      </div>
                      <div className="line-clamp-2 font-medium text-zinc-900">
                        {next.title}
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            </nav>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <RelatedPosts related={related} />
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- Components --------------------------------------------------------------

function RelatedPosts({ related = [] }) {
  if (!related.length) return null;
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Related posts</h2>
      <ul className="space-y-4">
        {related.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group grid grid-cols-5 gap-3"
            >
              <div className="col-span-2 relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-100">
                {p.coverUrl ? (
                  <Image
                    src={p.coverUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="col-span-3">
                <h3 className="line-clamp-2 font-medium text-zinc-900 group-hover:underline">
                  {p.title}
                </h3>
                {p.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
                    {p.excerpt}
                  </p>
                ) : null}
                <div className="mt-1 text-xs text-zinc-500">
                  {p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString()
                    : ""}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HostingAcademyBox({ series }) {
  if (series !== "hosting-academy") return null;
  return (
    <section className="mt-10 rounded-2xl border bg-gradient-to-br from-zinc-50 to-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Part of the Hosting Academy</h2>
          <p className="mt-1 text-zinc-600">
            Follow the full beginner → pro path to deploy any Crafted Template.
          </p>
        </div>
        <Link
          href="/hosting-academy"
          className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50"
        >
          Browse the series →
        </Link>
      </div>
    </section>
  );
}

// Minimal inline icons to avoid extra deps
function ArrowLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
