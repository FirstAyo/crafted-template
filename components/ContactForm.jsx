"use client";

import Link from "next/link";
import { useActionState } from "react";

const initialState = { ok: null, message: "", errors: {} };

export default function ContactForm({ action }) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            aria-invalid={!!state.errors?.name}
            aria-describedby="name-err"
            placeholder="Festus Ayomike"
          />
          {state.errors?.name && (
            <p id="name-err" className="mt-1 text-xs text-red-600">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            aria-invalid={!!state.errors?.email}
            aria-describedby="email-err"
            placeholder="you@example.com"
          />
          {state.errors?.email && (
            <p id="email-err" className="mt-1 text-xs text-red-600">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-700"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-zinc-700"
          >
            Service
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            aria-invalid={!!state.errors?.service}
            aria-describedby="service-err"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option>Custom template</option>
            <option>Template modification</option>
            <option>Support</option>
            <option>Bug report</option>
            <option>Other</option>
          </select>
          {state.errors?.service && (
            <p id="service-err" className="mt-1 text-xs text-red-600">
              {state.errors.service}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-zinc-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          aria-invalid={!!state.errors?.title}
          aria-describedby="title-err"
          placeholder="e.g., Need a SaaS landing page template"
        />
        {state.errors?.title && (
          <p id="title-err" className="mt-1 text-xs text-red-600">
            {state.errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          aria-invalid={!!state.errors?.message}
          aria-describedby="message-err"
          placeholder="Tell us about your project, deadline, and any stack/integrations you prefer."
        />
        {state.errors?.message && (
          <p id="message-err" className="mt-1 text-xs text-red-600">
            {state.errors.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
        <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-brand"></span>
        <p>
          We’ll use your details to respond to this request and, if you opt in
          elsewhere, to send our weekly newsletter. We never sell your data. See
          our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-brand px-5 py-3 text-white font-medium hover:bg-brand-dark disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Send message"}
        </button>
        {state.message && (
          <p
            className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
