import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplateBySlug, getTemplates } from "../../../lib/cms";
import BuyButton from "../../../components/BuyButton";
import Image from "next/image";
import { signDownloadToken } from "@/lib/security/downloadToken";
import PaymentBadges from "@/components/PaymentBadges";

export const revalidate = 300;

export async function generateStaticParams() {
  const all = await getTemplates();
  return all.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const t = await getTemplateBySlug(params.slug);
  if (!t) return { title: "Template — CraftedTemplate" };
  const url = `https://craftedtemplate.com/templates/${t.slug}`;
  return {
    title: `${t.title} — CraftedTemplate`,
    description: t.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: t.title,
      description: t.excerpt,
      url,
      siteName: "CraftedTemplate",
      type: "website",
      images: t.image ? [t.image] : ["/og/default.png"],
    },
    twitter: { card: "summary_large_image" },
  };
}

function BreadcrumbJsonLd({ slug, title, baseUrl }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Templates",
        item: `${baseUrl}/templates`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}/templates/${slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function JsonLd({ template }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: template.title,
    description: template.excerpt || "",
    image: template.image ? [template.image] : undefined,
    brand: { "@type": "Brand", name: "CraftedTemplate" },
    sku: template.id || undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: String(template.free ? 0 : template.priceUSD || 0),
      availability: "https://schema.org/InStock",
      url: `https://craftedtemplate.com/templates/${template.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function TemplateDetail({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const t = await getTemplateBySlug(params.slug);
  if (!t) return notFound();

  const imgSrc =
    typeof t.image === "string" && t.image.trim() !== "" ? t.image : null;

  return (
    <div className="container py-10">
      <JsonLd template={t} />
      <BreadcrumbJsonLd slug={t.slug} title={t.title} baseUrl={baseUrl} />
      <nav className="text-sm text-zinc-600">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
        <Link href="/templates">Templates</Link>{" "}
        <span aria-hidden="true">›</span>{" "}
        <span className="text-zinc-900">{t.title}</span>
      </nav>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div
            className="aspect-[16/10] w-full rounded-xl bg-zinc-100"
            id="demo"
          >
            <Image
              src={imgSrc}
              alt={t.title}
              width={1000}
              height={800}
              className="object-cover"
              sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 100vw"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          <p className="mt-2 text-zinc-700">{t.excerpt}</p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-700">What’s included</div>
              <div className="text-lg font-semibold">
                {t.free ? "Free" : `$${t.priceUSD}`}
              </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 space-y-1">
              <li>Source code and assets</li>
              <li>README with setup & deploy guides</li>
              <li>Lifetime updates to this template</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {t.free ? (
                <a
                  href={`/api/download?token=${signDownloadToken({ slug: t.slug, minutes: 30 })}`}
                  className="rounded-xl bg-brand px-5 py-3 text-white"
                >
                  Free download
                </a>
              ) : (
                <BuyButton template={t} />
              )}

              {t.demoUrl && (
                <a
                  href={t.demoUrl}
                  target="_blank"
                  className="rounded-xl border border-zinc-300 px-5 py-3 font-medium hover:bg-zinc-50"
                >
                  Live demo
                </a>
              )}
            </div>
            <div className="mt-3 text-xs text-zinc-600">
              Updated {new Date(t.updatedAt || Date.now()).toLocaleDateString()}
              <PaymentBadges />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
