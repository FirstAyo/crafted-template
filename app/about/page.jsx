// app/about/page.js
import Link from "next/link";

export const revalidate = 86400; // re-generate daily
export const dynamic = "force-static";

function AboutJsonLd() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}#org`,
        name: "CraftedTemplate",
        url: site,
        description:
          "Affordable, production-ready website templates and student project starters.",
        founder: { "@id": `${site}#person` },
      },
      {
        "@type": "Person",
        "@id": `${site}#person`,
        name: "Festus Ayomike",
        jobTitle: "Full-stack Web Developer & Computer Science Student",
        nationality: "Nigerian",
        worksFor: { "@id": `${site}#org` },
        homeLocation: "Canada",
        url: `${site}/about`,
      },
      {
        "@type": "WebSite",
        name: "CraftedTemplate",
        url: site,
        publisher: { "@id": `${site}#org` },
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

export function generateMetadata() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  return {
    title: "About — CraftedTemplate",
    description:
      "CraftedTemplate by Festus Ayomike: affordable, production-ready website templates and student project starters. Built to help students, startups, and small businesses launch faster.",
    alternates: { canonical: `${site}/about` },
    openGraph: {
      title: "About CraftedTemplate",
      description:
        "Affordable, production-ready templates to help you launch faster.",
      url: `${site}/about`,
      siteName: "CraftedTemplate",
      type: "website",
    },
  };
}

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <AboutJsonLd />

      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About CraftedTemplate
        </h1>
        <p className="mt-3 text-zinc-700">
          Affordable, production-ready templates so you can launch in hours—not
          weeks.
        </p>
      </header>

      {/* Founder card */}
      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Hi, I’m Festus Ayomike 👋</h2>
        <p className="mt-3 text-zinc-800 leading-relaxed">
          I’m a <strong>full-stack web developer</strong> and{" "}
          <strong>Computer Science student</strong> living in Canada, originally
          from <strong>Nigeria</strong>. I built CraftedTemplate after seeing
          the same struggle over and over: students racing against deadlines,
          founders stuck on boilerplate, and small businesses paying too much
          for simple websites.
        </p>
        <p className="mt-3 text-zinc-800 leading-relaxed">
          The idea is simple:{" "}
          <em>
            give people robust, modern templates that are actually ready for
            production
          </em>
          —so you can focus on your content, customers, and grades instead of
          wrestling with setup.
        </p>
      </section>

      {/* Mission */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Our mission</h2>
        <p className="mt-3 text-zinc-800 leading-relaxed">
          Help <strong>students</strong>, <strong>startups</strong>,{" "}
          <strong>freelancers</strong>, and <strong>small businesses</strong>{" "}
          get access to <strong>affordable</strong> but <strong>robust</strong>{" "}
          templates—quickly and easily. Every template ships with sane defaults,
          clean code, docs, and the essentials wired in.
        </p>
      </section>

      {/* What makes us different */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          What makes CraftedTemplate different?
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          <li className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold">Production-ready</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Real integrations (Next.js, Sanity, Stripe), SEO-friendly
              metadata, and clean UX out of the box.
            </p>
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold">Student & business friendly</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Priced so students and small teams can afford them—without cutting
              corners.
            </p>
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold">Time-to-launch</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Skip boilerplate. Deploy fast. Spend time on your idea, not setup.
            </p>
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold">Clear docs & updates</h3>
            <p className="mt-1 text-sm text-zinc-700">
              Step-by-step README, sensible defaults, and lifetime updates per
              template.
            </p>
          </li>
        </ul>
      </section>

      {/* Who it's for */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Who it’s for</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800 space-y-2">
          <li>
            <strong>Students:</strong> kick-start course projects with best
            practices baked in.
          </li>
          <li>
            <strong>Founders & SMBs:</strong> validate ideas and launch landing
            pages quickly.
          </li>
          <li>
            <strong>Freelancers & agencies:</strong> deliver faster with quality
            starters.
          </li>
          <li>
            <strong>Developers learning modern stacks:</strong> study real,
            production-grade examples.
          </li>
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-3 list-decimal pl-6 text-zinc-800 space-y-2">
          <li>
            Browse{" "}
            <Link href="/templates" className="text-brand underline">
              templates
            </Link>{" "}
            and pick one.
          </li>
          <li>
            Purchase securely with Stripe (free templates download instantly).
          </li>
          <li>Follow the README to customize, connect your CMS, and deploy.</li>
        </ol>
      </section>

      {/* Roadmap / vision */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Roadmap</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800 space-y-2">
          <li>
            <strong>Accounts</strong> with premium-only access to certain
            templates.
          </li>
          <li>
            More categories (SaaS, e-commerce, portfolios, student capstones,
            dashboards).
          </li>
          <li>
            Guides & blog posts that teach the stack behind each template.
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-12 flex flex-col items-center gap-3">
        <Link
          href="/templates"
          className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark"
        >
          Browse templates
        </Link>
        <Link
          href="/blog"
          className="text-sm text-zinc-700 hover:text-black underline"
        >
          Read the blog
        </Link>
      </section>

      {/* Contact */}
      <section className="mt-12 border-t border-zinc-200 pt-6">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-zinc-800">
          Questions, ideas, or requests? Email{" "}
          <a
            href="mailto:support@craftedtemplate.com"
            className="text-brand underline"
          >
            support@craftedtemplate.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
