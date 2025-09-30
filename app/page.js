import Link from "next/link";
import TemplateCard from "../components/TemplateCard";
import BlogCard from "../components/BlogCard";
import { getTemplates } from "../lib/cms";
import { getPosts } from "../lib/blog";
import HeroRotator from "@/components/HeroRotator";

export const revalidate = 300;
// app/page.js (or wherever this metadata lives)
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com"
  ),
  title: "CraftedTemplate — Website templates & student projects",
  description:
    "High-quality website templates and student project starters. Browse, preview, and ship faster with clean, SEO-ready designs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CraftedTemplate",
    description: "High-quality website templates and student project starters.",
    url: "/",
    type: "website",
    images: [
      {
        url: "./opengraph-image.png", // put the file at: public/og/home.png
        width: 1200,
        height: 630,
        alt: "CraftedTemplate — website templates & student projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["./opengraph-image.png"], // same file; Twitter uses absolute via metadataBase
  },
};

function JsonLdHome() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  const dataOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CraftedTemplate",
    url: base,
    logo: `${base}/opengraph-image.png`,
  };
  const dataSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: "CraftedTemplate",
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/templates?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataSite) }}
      />
    </>
  );
}

export default async function HomePage() {
  const [templates, posts] = await Promise.all([getTemplates(), getPosts()]);

  // Featured: newest 8 templates
  const featured = [...templates]
    .sort((a, b) => +new Date(b.updatedAt || 0) - +new Date(a.updatedAt || 0))
    .slice(0, 8);

  const recentPosts = (posts || []).slice(0, 3);

  // Build hero pool (only with images), then pick 5 at random
  const heroPool = (templates || [])
    .filter((t) => typeof t.image === "string" && t.image)
    .map((t) => ({ src: t.image, lqip: t.lqip, title: t.title, slug: t.slug }));

  function pickRandom(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }
  const heroItems = pickRandom(heroPool, Math.min(5, heroPool.length));

  return (
    <div>
      <JsonLdHome />

      {/* Hero */}
      <section className="container py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Ship faster with ready-to-use{" "}
              <span className="text-brand">templates</span>
            </h1>
            <p className="mt-3 text-lg text-zinc-700">
              Clean, SEO-ready designs for business, portfolios, SaaS, and
              student projects. Copy, customize, deploy.
            </p>

            {/* Search */}
            <form action="/templates" className="mt-6 flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search templates… e.g., portfolio, restaurant, SaaS"
                className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
                aria-label="Search templates"
              />
              <button className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">
                Search
              </button>
            </form>

            {/* Quick categories */}
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {[
                "portfolio",
                "business",
                "student",
                "saas",
                "react",
                "next",
                "html",
              ].map((c) => (
                <Link
                  key={c}
                  href={`/templates?category=${c}`}
                  className="rounded-full border border-zinc-300 px-3 py-1 hover:border-brand hover:text-brand"
                >
                  #{c}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex gap-3">
              <Link
                href="/templates"
                className="rounded-xl bg-black px-5 py-3 text-white font-medium hover:opacity-90"
              >
                Browse templates
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-zinc-300 px-5 py-3 font-medium hover:bg-zinc-50"
              >
                Read the blog
              </Link>
            </div>
          </div>

          {/* Hero visual (rotating gallery) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <HeroRotator items={heroItems} intervalMs={4000} />
          </div>
        </div>
      </section>

      {/* Featured templates */}
      <section className="container pb-10">
        <div className="flex items-end justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Featured templates</h2>
          <Link
            href="/templates"
            className="text-sm text-brand hover:text-brand-dark"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className="container pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-xl md:text-2xl font-bold">From the blog</h2>
          <Link
            href="/blog"
            className="text-sm text-brand hover:text-brand-dark"
          >
            All posts
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-700">
              No posts yet. Create one in Sanity Studio.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((p) => (
              <BlogCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* Email capture */}
      <section className="container pb-20">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                Get new templates in your inbox
              </h3>
              <p className="text-sm text-zinc-600">
                One update per week. No spam.
              </p>
            </div>
            <form
              className="flex w-full md:w-auto gap-2"
              action="/api/subscribe"
              method="POST"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
              />
              <button className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
