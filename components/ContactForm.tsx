"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/content";

/**
 * Static-site friendly contact form: on submit it opens the visitor's email
 * client with the message pre-filled (no backend required).
 *
 * To receive submissions directly instead, connect a form service such as
 * Formspree or AWS SES via API Gateway, and point the submit handler at it.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const subject = `Quote request from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Project type: ${data.get("projectType")}`,
      "",
      "Project details:",
      String(data.get("message")),
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-900"
          >
            Full name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-900"
          >
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-900"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-slate-900"
          >
            Project type <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="" disabled>
              Select a project type
            </option>
            <option value="Residential construction">
              Residential construction
            </option>
            <option value="Commercial construction">
              Commercial construction
            </option>
            <option value="Renovation / remodeling">
              Renovation / remodeling
            </option>
            <option value="Roofing / exteriors">Roofing / exteriors</option>
            <option value="Concrete / masonry">Concrete / masonry</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-900"
        >
          Project details <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-describedby="message-hint"
          className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <p id="message-hint" className="mt-2 text-sm text-slate-500">
          Tell us about your project: location, scope, and rough timeline.
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
      >
        Send Quote Request
      </button>

      {submitted && (
        <p role="status" className="text-sm font-medium text-green-700">
          Your email app should have opened with your request pre-filled. If
          it didn&apos;t, email us directly at {siteConfig.email}.
        </p>
      )}

      <p className="text-xs text-slate-500">
        This form opens your email app — no information is stored on this
        website.
      </p>
    </form>
  );
}
