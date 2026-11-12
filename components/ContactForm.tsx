"use client";

import { useRef, useState, type FormEvent } from "react";
import { services, company } from "@/content/site";
import { submitQuoteRequest, type QuoteRequest } from "@/lib/submit-quote";

type Errors = Partial<Record<keyof QuoteRequest, string>>;

const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "3–6 months",
  "6+ months",
  "Just planning / budgeting",
];

const CONTACT_METHODS = ["Phone", "Email", "Text"];

const inputClass =
  "mt-2 block w-full rounded-md border border-steel-300 bg-white px-3 py-2 text-navy-900 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600";
const errorClass = "border-red-600";

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: QuoteRequest): Errors {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.phone.trim()) {
      next.phone = "Please enter a phone number.";
    } else if (data.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a 10-digit phone number.";
    }
    if (!data.email.trim()) {
      next.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address (e.g. name@example.com).";
    }
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
    if (String(formData.get("website") ?? "").length > 0) {
      setStatus("success");
      return;
    }

    const data: QuoteRequest = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
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
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']"
      );
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitQuoteRequest(data);
      setStatus(result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-steel-200 bg-mist p-8 text-center"
      >
        <h3 className="font-heading text-xl font-bold text-navy-900">
          Thanks — we got your request.
        </h3>
        <p className="mt-2 text-steel-700">
          We&apos;ll follow up using your preferred contact method. Need us sooner?
          Call{" "}
          <a href={`tel:${company.phone.e164}`} className="font-semibold text-navy-700 underline">
            {company.phone.display}
          </a>
          .
        </p>
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
      {/* Honeypot — hidden from real users and assistive tech */}
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
          <label htmlFor="phone" className="block text-sm font-semibold text-navy-900">
            Phone <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${inputClass} ${errors.phone ? errorClass : ""}`}
          />
          {fieldError("phone", "phone-error")}
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
            Location / town
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

        <div className="sm:col-span-2">
          <label htmlFor="timeline" className="block text-sm font-semibold text-navy-900">
            Timeline <span aria-hidden="true">*</span>
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
          What are we building or fixing? Rooms, ceilings, existing conditions —
          anything helps.
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

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send Quote Request"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm font-medium text-red-700">
            Something went wrong sending your request. Please call{" "}
            <a href={`tel:${company.phone.e164}`} className="underline">
              {company.phone.display}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${company.email}`} className="underline">
              {company.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
