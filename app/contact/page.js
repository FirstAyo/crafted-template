// app/contact/page.js
import Link from "next/link";
//import ContactForm from "@/components/ContactForm"; // uses the @ alias
import ContactForm from "../../components/ContactForm";

export const revalidate = 86400;
export const dynamic = "force-static";

function ContactJsonLd() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL || "https://craftedtemplate.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — CraftedTemplate",
    url: `${site}/contact`,
    description:
      "Get in touch with CraftedTemplate about custom templates, support, or modifications.",
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
    title: "Contact — CraftedTemplate",
    description:
      "Contact CraftedTemplate for custom templates, support, modifications, and general questions. We typically reply within 1–2 business days.",
    alternates: { canonical: `${site}/contact` },
    robots: { index: true, follow: true },
  };
}

/* --------- SERVER ACTION (stays in a Server Component file) --------- */
export async function sendContactAction(_prevState, formData) {
  "use server";
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const phone = (formData.get("phone") || "").toString().trim();
  const service = (formData.get("service") || "").toString();
  const title = (formData.get("title") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();
  const honey = (formData.get("company") || "").toString().trim(); // honeypot

  const errors = {};
  if (!name || name.length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";
  if (!service) errors.service = "Please choose a service.";
  if (!title || title.length < 3) errors.title = "Please add a short title.";
  if (!message || message.length < 10)
    errors.message = "Please include a brief message.";
  if (honey) return { ok: false, message: "Spam detected.", errors };
  if (Object.keys(errors).length)
    return { ok: false, message: "Please correct the errors below.", errors };

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto;line-height:1.55">
      <h2 style="margin:0 0 8px">New contact request</h2>
      <p style="margin:0 0 12px">From: <strong>${name}</strong> (${email})${phone ? ` • ${phone}` : ""}</p>
      <p style="margin:0 0 8px"><strong>Service:</strong> ${service}</p>
      <p style="margin:0 0 8px"><strong>Title:</strong> ${title}</p>
      <p style="white-space:pre-wrap;margin:12px 0 0">${message.replace(/</g, "&lt;")}</p>
    </div>
  `;
  const text =
    `New contact request\n\n` +
    `From: ${name} (${email})${phone ? ` • ${phone}` : ""}\n` +
    `Service: ${service}\n` +
    `Title: ${title}\n\n${message}\n`;

  try {
    const to = process.env.CONTACT_TO || "support@craftedtemplate.com";
    const from =
      process.env.EMAIL_FROM || "CraftedTemplate <onboarding@resend.dev>";
    const key = process.env.RESEND_API_KEY;

    if (!key) {
      console.warn("[contact] RESEND_API_KEY missing—skipping send", {
        to,
        from,
        name,
        email,
        phone,
        service,
        title,
      });
      return {
        ok: true,
        message: "Thanks! Your message has been recorded. We'll reply soon.",
      };
    }
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Contact: ${service} — ${title}`,
      html,
      text,
    });

    await resend.emails.send({
      from,
      to: email,
      subject: "We received your message — CraftedTemplate",
      text:
        `Hi ${name},\n\nThanks for reaching out! We received your message about "${service}".\n` +
        `Subject: ${title}\n\nWe typically reply within 1–2 business days.\n\n— CraftedTemplate`,
    });

    return {
      ok: true,
      message:
        "Thanks! Your message has been sent. We’ll get back to you shortly.",
    };
  } catch (err) {
    console.error("[contact] error sending email", err);
    return {
      ok: false,
      message:
        "Something went wrong sending your message. Please try again later.",
    };
  }
}

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <ContactJsonLd />

      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Contact CraftedTemplate
        </h1>
        <p className="mt-3 text-zinc-700">
          Tell us what you need—<strong>custom templates</strong>,{" "}
          <strong>modifications</strong>, or <strong>support</strong>. We’ll get
          back to you with next steps and timelines.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">How we can help</h2>
        <ul className="mt-3 grid gap-3 md:grid-cols-3 text-sm text-zinc-700">
          <li className="rounded-lg border border-zinc-200 p-3">
            Custom landing pages & sites
          </li>
          <li className="rounded-lg border border-zinc-200 p-3">
            Template tweaks & integrations
          </li>
          <li className="rounded-lg border border-zinc-200 p-3">
            Support & troubleshooting
          </li>
        </ul>

        {/* Client form gets the server action */}
        <ContactForm action={sendContactAction} />
      </section>
    </main>
  );
}
