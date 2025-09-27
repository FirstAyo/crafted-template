// app/(legal)/terms/page.js
export const revalidate = 86400; // re-generate daily
export const dynamic = "force-static";

export function generateMetadata() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  return {
    title: "Terms of Service — CraftedTemplate",
    description:
      "Read CraftedTemplate’s Terms of Service covering accounts, purchases, licenses, acceptable use, and dispute terms.",
    alternates: { canonical: `${site}/terms` },
    robots: { index: true, follow: true },
  };
}

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Last updated: September 27, 2025
      </p>

      <p className="mt-6 text-zinc-800">
        Welcome to <strong>CraftedTemplate</strong> (“<em>we</em>,” “
        <em>our</em>,” “<em>us</em>”). These Terms govern your access to and use
        of <strong>craftedtemplate.com</strong> and related services (the
        “Service”). By using the Service, you agree to these Terms. If you do
        not agree, do not use the Service.
      </p>

      <section id="who-we-are" className="mt-10">
        <h2 className="text-2xl font-semibold">1) Who we are</h2>
        <p className="mt-3 text-zinc-800">
          CraftedTemplate provides website-ready templates and student project
          templates, including free and premium downloads. We operate from
          Canada and serve customers globally.
        </p>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            <strong>Business:</strong> CraftedTemplate
          </li>
          <li>
            <strong>Jurisdiction:</strong> British Columbia, Canada
          </li>
          <li>
            <strong>Contact:</strong>{" "}
            <a
              className="text-brand underline"
              href="mailto:support@craftedtemplate.com"
            >
              support@craftedtemplate.com
            </a>
          </li>
        </ul>
      </section>

      <section id="eligibility" className="mt-10">
        <h2 className="text-2xl font-semibold">
          2) Accounts &amp; eligibility
        </h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>
            You must be at least 13 (or the age of digital consent in your
            region). If under 18, parental/guardian consent is required.
          </li>
          <li>
            You are responsible for safeguarding your login credentials and
            activity on your account.
          </li>
        </ul>
      </section>

      <section id="purchases" className="mt-10">
        <h2 className="text-2xl font-semibold">
          3) Purchases, pricing &amp; taxes
        </h2>
        <p className="mt-3 text-zinc-800">
          Prices are listed in USD unless noted and may change. Payments are
          processed by third-party providers (e.g., Stripe). We do{" "}
          <strong>not</strong> store full card numbers. Taxes may apply based on
          your billing address and applicable law.
        </p>
        <h3 className="mt-6 text-xl font-semibold">
          Subscriptions (if offered)
        </h3>
        <p className="mt-2 text-zinc-800">
          Subscriptions auto-renew until cancelled. You can cancel anytime
          before renewal from your account or by contacting support.
          Cancellations take effect at the end of the current term.
        </p>
      </section>

      <section id="delivery" className="mt-10">
        <h2 className="text-2xl font-semibold">4) Delivery of digital items</h2>
        <p className="mt-3 text-zinc-800">
          After successful payment, you’ll receive a download link via the
          success page and/or email. Links may be time-limited to prevent abuse.
        </p>
      </section>

      <section id="refunds" className="mt-10">
        <h2 className="text-2xl font-semibold">5) Refunds</h2>
        <p className="mt-3 text-zinc-800">
          Due to the nature of digital products, sales are generally{" "}
          <strong>final</strong> once a download link has been issued or a file
          accessed, except where required by law. If you encounter an issue,
          contact support and we’ll help.
        </p>
      </section>

      <section id="license" className="mt-10">
        <h2 className="text-2xl font-semibold">6) License to templates</h2>
        <p className="mt-3 text-zinc-800">
          Unless a specific license is shown on a product page, your purchase
          grants a non-exclusive, non-transferable license for your own personal
          or business projects.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">You may</h3>
            <ul className="mt-2 list-disc pl-6 text-zinc-800">
              <li>
                Edit, modify, and combine the template with your own work.
              </li>
              <li>
                Use in one or multiple end projects (as stated on the product
                page).
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">You may not</h3>
            <ul className="mt-2 list-disc pl-6 text-zinc-800">
              <li>Resell, re-license, or redistribute the template “as is.”</li>
              <li>
                Claim the template as your own without material modification.
              </li>
              <li>
                Use our content to train foundation AI models without our prior
                written consent.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="acceptable-use" className="mt-10">
        <h2 className="text-2xl font-semibold">7) Acceptable use</h2>
        <ul className="mt-3 list-disc pl-6 text-zinc-800">
          <li>No unlawful, infringing, or harmful activity.</li>
          <li>No attempts to access accounts or data without authorization.</li>
          <li>No scraping, rate-limit evasion, or distribution of malware.</li>
        </ul>
      </section>

      <section id="ip" className="mt-10">
        <h2 className="text-2xl font-semibold">8) Intellectual property</h2>
        <p className="mt-3 text-zinc-800">
          The Service, templates, and brand assets are owned by CraftedTemplate
          or its licensors. Only the limited license above is granted.
        </p>
      </section>

      <section id="feedback" className="mt-10">
        <h2 className="text-2xl font-semibold">
          9) User content &amp; feedback
        </h2>
        <p className="mt-3 text-zinc-800">
          If you provide feedback or suggestions, you grant us a worldwide,
          royalty-free license to use it to improve the Service. Do not submit
          content you lack rights to share.
        </p>
      </section>

      <section id="third-parties" className="mt-10">
        <h2 className="text-2xl font-semibold">10) Third-party services</h2>
        <p className="mt-3 text-zinc-800">
          We rely on third parties (e.g., Stripe for payments, Vercel for
          hosting, Sanity for CMS, Resend for email). Their services may have
          separate terms and policies.
        </p>
      </section>

      <section id="disclaimers" className="mt-10">
        <h2 className="text-2xl font-semibold">11) Disclaimers</h2>
        <p className="mt-3 text-zinc-800">
          The Service and templates are provided “as is” without warranties of
          any kind, express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement, to the fullest extent
          permitted by law.
        </p>
      </section>

      <section id="liability" className="mt-10">
        <h2 className="text-2xl font-semibold">12) Limitation of liability</h2>
        <p className="mt-3 text-zinc-800">
          To the fullest extent permitted by law, we are not liable for
          indirect, incidental, special, consequential, or punitive damages, or
          lost profits/revenue. Our aggregate liability shall not exceed the
          amount you paid in the 12 months before the claim.
        </p>
      </section>

      <section id="indemnity" className="mt-10">
        <h2 className="text-2xl font-semibold">13) Indemnity</h2>
        <p className="mt-3 text-zinc-800">
          You agree to defend, indemnify, and hold us harmless from claims
          arising out of your use of the Service or violation of these Terms.
        </p>
      </section>

      <section id="changes" className="mt-10">
        <h2 className="text-2xl font-semibold">
          14) Changes to the Service/Terms
        </h2>
        <p className="mt-3 text-zinc-800">
          We may modify the Service or these Terms at any time. If changes are
          material, we’ll update the “Last updated” date above. Your continued
          use constitutes acceptance.
        </p>
      </section>

      <section id="law" className="mt-10">
        <h2 className="text-2xl font-semibold">
          15) Governing law &amp; disputes
        </h2>
        <p className="mt-3 text-zinc-800">
          These Terms are governed by the laws of British Columbia, Canada. You
          agree to the exclusive jurisdiction of the provincial/federal courts
          located in British Columbia, unless otherwise required by law.
        </p>
      </section>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-semibold">16) Contact</h2>
        <p className="mt-3 text-zinc-800">
          Questions?{" "}
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
