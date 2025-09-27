// app/(legal)/privacy/page.js
export const revalidate = 86400;
export const dynamic = "force-static";

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you sell my email address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not sell personal information. We use your email to deliver purchases, account notices, and—if you opt in—weekly newsletters.",
        },
      },
      {
        "@type": "Question",
        name: "Can I unsubscribe from marketing emails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every marketing email includes an unsubscribe link. You can also contact support@craftedtemplate.com to adjust preferences.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my credit card information?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Payments are processed by Stripe. We do not store full card numbers on our servers.",
        },
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
    title: "Privacy Policy — CraftedTemplate",
    description:
      "Learn how CraftedTemplate collects, uses, and protects your information. GDPR/UK GDPR, CCPA/CPRA, and PIPEDA aligned.",
    alternates: { canonical: `${site}/privacy` },
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <FaqJsonLd />

      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Last updated: September 27, 2025
      </p>

      <p className="mt-6 text-zinc-800">
        This Privacy Policy explains how <strong>CraftedTemplate</strong> (“we,”
        “us,” “our”) collects, uses, and shares information when you use{" "}
        <strong>craftedtemplate.com</strong> and related services (“Service”).
        We operate from Canada and serve users globally.
      </p>

      <section id="data-we-collect" className="mt-10">
        <h2 className="text-2xl font-semibold">1) Personal data we collect</h2>
        <h3 className="mt-4 text-lg font-semibold">You provide</h3>
        <ul className="mt-2 list-disc pl-6 text-zinc-800">
          <li>
            <strong>Account:</strong> name, email, password (hashed), and
            optionally phone number for account security or 2FA/SMS notices.
          </li>
          <li>
            <strong>Purchases:</strong> billing email, country/region, and
            details you share with support.
          </li>
          <li>
            <strong>Communications:</strong> newsletter preferences (weekly),
            and messages you send us.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Automatically collected</h3>
        <ul className="mt-2 list-disc pl-6 text-zinc-800">
          <li>
            Device/browser type, IP address, pages visited, timestamps,
            referring/exit pages.
          </li>
          <li>
            Cookies/local storage for sign-in sessions, preferences, analytics,
            and performance.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold">From processors</h3>
        <ul className="mt-2 list-disc pl-6 text-zinc-800">
          <li>
            <strong>Payments:</strong> Stripe (payment confirmations; we do not
            store full card numbers).
          </li>
          <li>
            <strong>Email:</strong> Resend (email delivery and bounce/spam
            metrics).
          </li>
          <li>
            <strong>Hosting/CMS/Analytics:</strong> Vercel, Sanity, and
            analytics providers (if enabled).
          </li>
        </ul>
      </section>

      <section id="how-we-use" className="mt-10">
        <h2 className="text-2xl font-semibold">2) How we use personal data</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            Provide the Service (accounts, premium access, template delivery,
            customer support).
          </li>
          <li>Process transactions, send receipts and download links.</li>
          <li>
            Security and fraud prevention; protecting accounts and our Service.
          </li>
          <li>
            Communications: service notices and (with your consent) a weekly
            newsletter with template updates. You can unsubscribe anytime.
          </li>
          <li>
            Improve and personalize the Service; analytics and product
            development.
          </li>
          <li>Legal compliance, including tax and accounting.</li>
        </ul>
      </section>

      <section id="lawful-bases" className="mt-10">
        <h2 className="text-2xl font-semibold">
          3) Lawful bases (GDPR/UK GDPR)
        </h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            <strong>Contract:</strong> to deliver downloads and premium access
            you request.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to secure, improve, and
            market the Service (balanced against your rights).
          </li>
          <li>
            <strong>Consent:</strong> for newsletters, some cookies/analytics,
            and any SMS marketing.
          </li>
          <li>
            <strong>Legal obligation:</strong> tax, accounting, and compliance.
          </li>
        </ul>
      </section>

      <section id="sharing" className="mt-10">
        <h2 className="text-2xl font-semibold">4) How we share data</h2>
        <p className="mt-3 text-zinc-800">
          We <strong>do not sell</strong> personal information. We share only as
          needed to operate the Service with trusted processors (Stripe, Vercel,
          Sanity, Resend, analytics). We may also share in connection with
          business transfers or to comply with law.
        </p>
      </section>

      <section id="marketing" className="mt-10">
        <h2 className="text-2xl font-semibold">5) Marketing communications</h2>
        <p className="mt-3 text-zinc-800">
          We send product updates and a weekly newsletter if you opt in.
          Unsubscribe anytime using the link in any marketing email or by
          contacting support. If SMS is enabled, you can reply{" "}
          <strong>STOP</strong> to opt out (message/data rates may apply).
        </p>
      </section>

      <section id="cookies" className="mt-10">
        <h2 className="text-2xl font-semibold">6) Cookies &amp; tracking</h2>
        <p className="mt-3 text-zinc-800">
          We use cookies and similar technologies for authentication,
          preferences, analytics, and performance. Where required by law, we
          present a consent banner for non-essential cookies. You can manage
          cookies in your browser settings.
        </p>
      </section>

      <section id="retention" className="mt-10">
        <h2 className="text-2xl font-semibold">7) Data retention</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            Account data: retained while your account is active;
            deleted/anonymized upon request, subject to legal retention.
          </li>
          <li>
            Transaction records: retained as required by tax/accounting law.
          </li>
          <li>
            Marketing preferences: retained until you unsubscribe or delete your
            account.
          </li>
        </ul>
      </section>

      <section id="transfers" className="mt-10">
        <h2 className="text-2xl font-semibold">8) International transfers</h2>
        <p className="mt-3 text-zinc-800">
          We may process data in Canada, the U.S., the EU/EEA, and other
          countries where our processors operate. Where required, we rely on
          appropriate safeguards (e.g., Standard Contractual Clauses).
        </p>
      </section>

      <section id="security" className="mt-10">
        <h2 className="text-2xl font-semibold">9) Security</h2>
        <p className="mt-3 text-zinc-800">
          We use reasonable technical and organizational measures (HTTPS, access
          controls, least-privilege, encryption in transit, secret rotation). No
          method is 100% secure; please use strong, unique passwords and enable
          2FA when available.
        </p>
      </section>

      <section id="your-rights" className="mt-10">
        <h2 className="text-2xl font-semibold">10) Your rights</h2>
        <p className="mt-3 text-zinc-800">
          Depending on your location, you may have rights to access, correct,
          delete, or port your data; object to or restrict certain processing;
          and withdraw consent (e.g., newsletters). We will honor these rights
          in accordance with applicable laws.
        </p>
        <h3 className="mt-4 text-lg font-semibold">California (CCPA/CPRA)</h3>
        <p className="mt-2 text-zinc-800">
          California residents can request to know, delete, or correct personal
          information and opt out of sale/sharing. We{" "}
          <strong>do not sell</strong> personal information or engage in
          cross-context behavioral advertising.
        </p>
        <h3 className="mt-4 text-lg font-semibold">Canada (PIPEDA)</h3>
        <p className="mt-2 text-zinc-800">
          You may request access to personal information and challenge its
          accuracy/completeness. We will respond within applicable timeframes
          and provide reasons if an exception applies.
        </p>
        <p className="mt-3 text-zinc-800">
          To exercise any rights, email{" "}
          <a
            className="text-brand underline"
            href="mailto:privacy@craftedtemplate.com"
          >
            privacy@craftedtemplate.com
          </a>
          . We may need to verify your identity.
        </p>
      </section>

      <section id="children" className="mt-10">
        <h2 className="text-2xl font-semibold">11) Children’s privacy</h2>
        <p className="mt-3 text-zinc-800">
          The Service is not directed to children under 13 (or the applicable
          digital consent age). We do not knowingly collect data from children
          without appropriate consent.
        </p>
      </section>

      <section id="controller" className="mt-10">
        <h2 className="text-2xl font-semibold">12) Data controller</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            <strong>Controller:</strong> CraftedTemplate (Canada)
          </li>
          <li>
            <strong>Contact:</strong>{" "}
            <a
              className="text-brand underline"
              href="mailto:privacy@craftedtemplate.com"
            >
              privacy@craftedtemplate.com
            </a>
          </li>
        </ul>
      </section>

      <section id="changes" className="mt-10">
        <h2 className="text-2xl font-semibold">13) Changes to this Policy</h2>
        <p className="mt-3 text-zinc-800">
          We may update this Policy periodically. Material changes will be noted
          here and, where appropriate, notified to you.
        </p>
      </section>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-semibold">14) Contact</h2>
        <p className="mt-3 text-zinc-800">
          Privacy questions:{" "}
          <a
            className="text-brand underline"
            href="mailto:privacy@craftedtemplate.com"
          >
            privacy@craftedtemplate.com
          </a>
          <br />
          General support:{" "}
          <a
            className="text-brand underline"
            href="mailto:support@craftedtemplate.com"
          >
            support@craftedtemplate.com
          </a>
        </p>
      </section>
    </main>
  );
}
