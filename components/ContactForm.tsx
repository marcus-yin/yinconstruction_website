"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { services, company, customerTypes } from "@/content/site";
import { submitToBackend } from "@/lib/form-backend";
import {
  buildMailtoUrl,
  formatQuoteMessage,
  isEmailConfigured,
  type QuoteRequest,
} from "@/lib/quote-request";

type Errors = Partial<Record<keyof QuoteRequest, string>>;

const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "3–6 months",
  "6+ months",
  "Just planning / budgeting",
];

const CONTACT_METHODS = ["Phone", "Email", "Text"];

/** Maps ?type= query values (from CTAs) to customer types. */
const TYPE_PARAM_MAP: Record<string, (typeof customerTypes)[number]> = {
  homeowner: "Homeowner",
  contractor: "General Contractor",
  commercial: "Commercial Client",
};

const inputClass =
  "mt-2 block w-full rounded-md border border-steel-300 bg-white px-3 py-2 text-navy-900 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600";
const errorClass = "border-red-600";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedType =
    TYPE_PARAM_MAP[searchParams.get("type") ?? ""] ?? "";

  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<
    | { kind: "idle" }
    | { kind: "sent" }
    | { kind: "mailto-opened"; message: string }
    | { kind: "not-connected"; message: string }
  >({ kind: "idle" });
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function isValidPhone(raw: string): boolean {
    const trimmed = raw.trim();
    // Only digits and common phone formatting characters allowed.
    if (!/^[+]?[\d\s().-]+$/.test(trimmed)) return false;
    const digits = trimmed.replace(/\D/g, "");
    // 10 digits, or 11 with a leading 1 (US country code).
    return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
  }

  function validate(data: QuoteRequest): Errors {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.phone.trim()) {
      next.phone = "Please enter a phone number.";
    } else if (!isValidPhone(data.phone)) {
      next.phone = "Please enter a 10-digit phone number (e.g. 315-555-0100).";
    }
    if (!data.email.trim()) {
      next.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (!data.customerType) next.customerType = "Please tell us who you are.";
    if (!data.projectType) next.projectType = "Please choose a project type.";
    if (!data.timeline) next.timeline = "Please choose a timeline.";
    if (!data.description.trim())
      next.description = "Please tell us a little about the project.";
    if (!data.preferredContact)
      next.preferredContact = "Please choose how you'd like to be contacted.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Honeypot: real visitors never see or fill this field.
    if (String(formData.get("website") ?? "").length > 0) return;

    const data: QuoteRequest = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      customerType: String(formData.get("customerType") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      town: String(formData.get("town") ?? ""),
      size: String(formData.get("size") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      description: String(formData.get("description") ?? ""),
      preferredContact: String(formData.get("preferredContact") ?? ""),
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }

    // Primary path: deliver directly to the business inbox.
    setSending(true);
    try {
      const delivered = await submitToBackend({
        kind: "quote",
        website: "",
        ...data,
      });
      if (delivered) {
        setResult({ kind: "sent" });
        return;
      }
    } catch {
      /* fall through to the mailto fallback below */
    } finally {
      setSending(false);
    }

    // Fallback: open the visitor's email app pre-filled.
    const message = formatQuoteMessage(data);
    if (isEmailConfigured()) {
      window.location.href = buildMailtoUrl(data);
      setResult({ kind: "mailto-opened", message });
    } else {
      // Honest fallback: no backend and no business email configured yet.
      setResult({ kind: "not-connected", message });
    }
  }

  async function copyMessage(message: string) {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      /* clipboard unavailable - the message is selectable below */
    }
  }

  if (result.kind === "sent") {
    return (
      <div role="status" className="rounded-lg border border-steel-200 bg-mist p-8">
        <h3 className="font-heading text-xl font-bold text-navy-900">
          Request sent
        </h3>
        <p className="mt-2 text-steel-700">
          Your request was delivered to{" "}
          <a
            href={`mailto:${company.email}`}
            className="font-semibold text-navy-700 underline"
          >
            {company.email}
          </a>
          . We&apos;ll follow up using the contact method you chose. Need us
          sooner? Call{" "}
          <a
            href={`tel:${company.phone.e164}`}
            className="font-semibold text-navy-700 underline"
          >
            {company.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  if (result.kind !== "idle") {
    return (
      <div role="status" className="rounded-lg border border-steel-200 bg-mist p-8">
        {result.kind === "mailto-opened" ? (
          <>
            <h3 className="font-heading text-xl font-bold text-navy-900">
              Almost done: hit send in your email app
            </h3>
            <p className="mt-2 text-steel-700">
              Your email app should have opened with your request pre-filled.
              Your request is <strong>not sent</strong> until you send that
              email. If it didn&apos;t open, copy the message below and email
              it to{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-semibold text-navy-700 underline"
              >
                {company.email}
              </a>
              , or call{" "}
              <a
                href={`tel:${company.phone.e164}`}
                className="font-semibold text-navy-700 underline"
              >
                {company.phone.display}
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h3 className="font-heading text-xl font-bold text-navy-900">
              Online submission isn&apos;t connected yet
            </h3>
            <p className="mt-2 text-steel-700">
              This form doesn&apos;t deliver messages yet, and we didn&apos;t
              want to pretend otherwise. Your request is composed below: copy it and
              reach us by phone or email, and we&apos;ll take it from there.
            </p>
          </>
        )}

        <label htmlFor="composed-message" className="sr-only">
          Your composed request
        </label>
        <textarea
          id="composed-message"
          readOnly
          rows={10}
          value={result.message}
          className="mt-4 block w-full rounded-md border border-steel-300 bg-white px-3 py-2 font-mono text-sm text-navy-900"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => copyMessage(result.message)}
            className="rounded-md bg-navy-700 px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            {copied ? "Copied!" : "Copy message"}
          </button>
          <button
            type="button"
            onClick={() => {
              setResult({ kind: "idle" });
              setCopied(false);
            }}
            className="rounded-md border border-steel-300 px-5 py-2.5 font-heading text-sm font-semibold text-steel-700 transition-colors hover:border-navy-700 hover:text-navy-900"
          >
            Back to form
          </button>
        </div>
      </div>
    );
  }

  const fieldError = (key: keyof QuoteRequest, id: string) =>
    errors[key] ? (
      <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot - hidden from real users and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy-900">
            Full name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputClass} ${errors.name ? errorClass : ""}`}
          />
          {fieldError("name", "name-error")}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy-900">
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${errors.email ? errorClass : ""}`}
          />
          {fieldError("email", "email-error")}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy-900">
            Phone <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="315-555-0100"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${inputClass} ${errors.phone ? errorClass : ""}`}
          />
          {fieldError("phone", "phone-error")}
        </div>

        <div>
          <label htmlFor="customerType" className="block text-sm font-semibold text-navy-900">
            I am a <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="customerType"
            name="customerType"
            required
            defaultValue={preselectedType}
            aria-invalid={errors.customerType ? true : undefined}
            aria-describedby={errors.customerType ? "customerType-error" : undefined}
            className={`${inputClass} ${errors.customerType ? errorClass : ""}`}
          >
            <option value="" disabled>
              Select customer type
            </option>
            {customerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldError("customerType", "customerType-error")}
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm font-semibold text-navy-900">
            Project type <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={`${inputClass} ${errors.projectType ? errorClass : ""}`}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other / not sure</option>
          </select>
          {fieldError("projectType", "projectType-error")}
        </div>

        <div>
          <label htmlFor="town" className="block text-sm font-semibold text-navy-900">
            Project location / town
          </label>
          <input
            id="town"
            name="town"
            type="text"
            autoComplete="address-level2"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-semibold text-navy-900">
            Approximate size
          </label>
          <input
            id="size"
            name="size"
            type="text"
            placeholder="e.g. 800 sq ft basement, 3 rooms"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-semibold text-navy-900">
            Desired timeline <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            aria-invalid={errors.timeline ? true : undefined}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
            className={`${inputClass} ${errors.timeline ? errorClass : ""}`}
          >
            <option value="" disabled>
              When would you like to start?
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {fieldError("timeline", "timeline-error")}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-navy-900">
          Project description <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "description-error" : "description-hint"}
          className={`${inputClass} ${errors.description ? errorClass : ""}`}
        />
        <p id="description-hint" className="mt-1.5 text-sm text-steel-500">
          What are we building or fixing? Rooms, ceilings, existing conditions:
          anything helps. Have photos? Mention them here and we&apos;ll request
          them by email (direct photo upload is coming).
        </p>
        {fieldError("description", "description-error")}
      </div>

      <fieldset
        aria-describedby={errors.preferredContact ? "preferredContact-error" : undefined}
      >
        <legend className="text-sm font-semibold text-navy-900">
          Preferred contact method <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-5">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="flex items-center gap-2 text-steel-800">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                className="h-4 w-4 accent-navy-700"
                aria-invalid={errors.preferredContact ? true : undefined}
              />
              {method}
            </label>
          ))}
        </div>
        {fieldError("preferredContact", "preferredContact-error")}
      </fieldset>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
