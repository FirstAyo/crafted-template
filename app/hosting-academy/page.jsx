import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity/client";

export const metadata = {
  title: "Hosting Academy — Crafted Template",
  description:
    "A step-by-step series that teaches you how to host any Crafted Template — from GitHub Pages and Vercel to VPS, Docker, and CI/CD.",
  openGraph: {
    title: "Hosting Academy — Crafted Template",
    description:
      "Learn hosting from beginner to pro: GitHub Pages, Vercel, Netlify, Hostinger, AWS, Docker, CI/CD, and more.",
    type: "website",
    url: "https://your-site.com/hosting-academy",
  },
};

const QUERY = /* groq */ `
*[_type == "post" && series == "hosting-academy"]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  level,
  publishedAt,
  coverImage{
    asset->{url, metadata{lqip, dimensions}}
  }
} | order(coalesce(orderIndex, publishedAt) asc)
`;

function groupByLevel(posts) {
  const buckets = { beginner: [], intermediate: [], advanced: [], pro: [] };
  for (const p of posts) {
    const key = (p.level || "").toLowerCase();
    if (buckets[key]) buckets[key].push(p);
    else buckets.beginner.push(p); // sensible fallback
  }
  return buckets;
}

export default async function HostingAcademyPage() {
  const posts = await sanityClient.fetch(
    QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
  const groups = groupByLevel(posts);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Hosting Academy</h1>
        <p className="mt-3 text-lg text-neutral-600">
          Follow our beginner → pro path to get any Crafted Template live. Each
          lesson links to a full guide with copy-paste commands and screenshots.
        </p>
      </header>

      <AcademySection
        title="Beginner"
        items={groups.beginner}
        subtitle="Zero-to-live with free hosts & static sites."
      />
      <AcademySection
        title="Intermediate"
        items={groups.intermediate}
        subtitle="cPanel, FTP, domains, SSL."
      />
      <AcademySection
        title="Advanced"
        items={groups.advanced}
        subtitle="Cloud, VPS, Nginx, Docker."
      />
      <AcademySection
        title="Pro"
        items={groups.pro}
        subtitle="Automation, CI/CD, migrations."
      />

      <aside className="mt-16 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Get new lessons</h2>
        <p className="mt-2 text-neutral-600">
          New Hosting Academy posts drop weekly. Join the list:
        </p>
        <form
          className="mt-4 flex flex-col md:flex-row gap-3 max-w-md"
          action="/api/subscribe"
          method="post"
        >
          <input
            className="flex-1 rounded-xl border px-4 py-3 outline-none"
            type="email"
            name="email"
            placeholder="you@domain.com"
            required
          />
          <button className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90">
            Subscribe
          </button>
        </form>
      </aside>
    </main>
  );
}

function AcademySection({ title, subtitle, items }) {
  if (!items?.length) return null;
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-neutral-600">{subtitle}</p>}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <li
            key={post._id}
            className="group rounded-2xl border overflow-hidden hover:shadow-lg transition"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/9] bg-neutral-100">
                {post?.coverImage?.asset?.url ? (
                  <Image
                    src={post.coverImage.asset.url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    placeholder={
                      post.coverImage.asset.metadata?.lqip ? "blur" : "empty"
                    }
                    blurDataURL={
                      post.coverImage.asset.metadata?.lqip || undefined
                    }
                  />
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug group-hover:underline">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-neutral-600">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 text-sm text-neutral-500">
                  {formatLevel(post.level)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatLevel(level) {
  const l = (level || "").toLowerCase();
  if (["beginner", "intermediate", "advanced", "pro"].includes(l))
    return l[0].toUpperCase() + l.slice(1);
  return "Beginner";
}
