import Image from "next/image";
import Link from "next/link";

export default function TemplateCard({ t }) {
  // accept only a non-empty string
  const imgSrc =
    typeof t.image === "string" && t.image.trim() !== "" ? t.image : null;

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm relative">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={t.title || "Template thumbnail"}
            fill
            // let the image fill the aspect box
            className="object-cover"
            sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 100vw"
          />
        ) : (
          <span className="px-2 text-xs text-zinc-500">No image</span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold leading-snug">
            <Link href={`/templates/${t.slug}`} className="hover:underline">
              {t.title}
            </Link>
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${t.free ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}
          >
            {t.free ? "Free" : `$${t.priceUSD}`}
          </span>
        </div>

        <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{t.excerpt}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {(t.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/templates/${t.slug}`}
            className="text-sm text-brand hover:text-brand-dark"
          >
            Details
          </Link>
          <Link
            href={`/templates/${t.slug}#demo`}
            className="text-sm text-zinc-700 hover:text-black"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
