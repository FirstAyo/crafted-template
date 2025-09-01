import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ p }) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative aspect-[16/9] bg-zinc-100">
        {p.coverUrl ? (
          <Image
            src={p.coverUrl}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
          />
        ) : null}
      </div>
      <div className="p-5">
        <div className="text-xs text-zinc-600">
          {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : ""}
        </div>
        <h3 className="mt-1 text-lg font-semibold leading-snug">
          <Link href={`/blog/${p.slug}`} className="hover:underline">
            {p.title}
          </Link>
        </h3>
        {p.excerpt ? <p className="mt-2 text-sm text-zinc-700 line-clamp-2">{p.excerpt}</p> : null}
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
          {p.author?.name ? <span>By {p.author.name}</span> : null}
          {p.categories?.length ? <span>• {p.categories[0].title}</span> : null}
        </div>
        <div className="mt-4">
          <Link href={`/blog/${p.slug}`} className="text-sm text-brand hover:text-brand-dark">Read more</Link>
        </div>
      </div>
    </article>
  );
}
