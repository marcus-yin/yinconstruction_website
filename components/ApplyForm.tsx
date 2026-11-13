"use client";

import { useRef, useState, type FormEvent } from "react";
import { company, applyPage } from "@/content/site";
import { isEmailConfigured } from "@/lib/quote-request";
import { submitToBackend } from "@/lib/form-backend";
import {
  buildApplicationMailtoUrl,
  formatApplicationMessage,
  type JobApplication,
} from "@/lib/job-application";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

async function fileToBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return dataUrl.slice(dataUrl.indexOf(",") + 1);
}

type Errors = Partial<Record<keyof JobApplication, string>>;

const CONTACT_METHODS = ["Phone", "Email", "Text"];

const inputClass =
  "mt-2 block w-full rounded-md border border-steel-300 bg-white px-3 py-2 text-navy-900 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600";
const errorClass = "border-red-600";

export default function ApplyForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<
    | { kind: "idle" }
    | { kind: "sent"; resumeAttached: boolean }
    | { kind: "mailto-opened"; message: string; resumeFileName: string }
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

  function validate(data: JobApplication): Errors {
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
    if (!data.position) next.position = "Please choose a position.";
    if (!data.experience) next.experience = "Please choose your experience level.";
    if (!data.about.trim())
      next.about = "Please tell us a little about yourself and your experience.";
    if (!data.preferredContact)
      next.preferredContact = "Please choose how you'd like to be contacted.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Honeypot: real visitors never see or fill this field.
    if (String(formData.get("website") ?? "").length > 0) return;

    const resumeFile = formData.get("resume");
    const hasResume = resumeFile instanceof File && resumeFile.size > 0;
    const resumeFileName = hasResume ? resumeFile.name : "";

    const data: JobApplication = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      position: String(formData.get("position") ?? ""),
      experience: String(formData.get("experience") ?? ""),
      wage: String(formData.get("wage") ?? ""),
      town: String(formData.get("town") ?? ""),
      about: String(formData.get("about") ?? ""),
      resumeFileName,
      preferredContact: String(formData.get("preferredContact") ?? ""),
    };

    const nextErrors = validate(data);
    if (hasResume && resumeFile.size > MAX_RESUME_BYTES) {
      nextErrors.resumeFileName = "Resume must be under 4 MB.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }

    // Primary path: deliver directly to the business inbox (resume attached).
    setSending(true);
    try {
      const resume = hasResume
        ? { filename: resumeFile.name, dataBase64: await fileToBase64(resumeFile) }
        : undefined;
      const delivered = await submitToBackend({
        kind: "application",
        website: "",
        ...data,
        resume,
      });
      if (delivered) {
        setResult({ kind: "sent", resumeAttached: hasResume });
        return;
      }
    } catch {
      /* fall through to the mailto fallback below */
    } finally {
      setSending(false);
    }

    // Fallback: open the applicant's email app pre-filled (resume must be
    // attached by hand there - mailto links can't carry files).
    const message = formatApplicationMessage(data);
    if (isEmailConfigured()) {
      window.location.href = buildApplicationMailtoUrl(data);
      setResult({ kind: "mailto-opened", message, resumeFileName });
    } else {
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
          Application sent
        </h3>
        <p className="mt-2 text-steel-700">
          Your application{result.resumeAttached ? " and resume were" : " was"}{" "}
          delivered to{" "}
          <a
            href={`mailto:${company.email}`}
            className="font-semibold text-navy-700 underline"
          >
            {company.email}
          </a>
          . We&apos;ll follow up using the contact method you chose. Questions
          in the meantime? Call{" "}
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
              Your email app should have opened with your application
              pre-filled. Your application is <strong>not sent</strong> until
              you send that email.{" "}
              {result.resumeFileName ? (
                <>
                  Your resume (<strong>{result.resumeFileName}</strong>) is{" "}
                  <strong>not attached automatically</strong>: please attach
                  the file to the email before sending.
                </>
              ) : (
                <>You can attach your resume to it before sending.</>
              )}{" "}
              If it didn&apos;t open, copy the message below and email it to{" "}
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
              want to pretend otherwise. Your application is composed below:
              copy it and reach us by phone or email, and we&apos;ll take it
              from there.
            </p>
          </>
        )}

        <label htmlFor="composed-application" className="sr-only">
          Your composed application
        </label>
        <textarea
          id="composed-application"
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

  const fieldError = (key: keyof JobApplication, id: string) =>
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
          <label htmlFor="town" className="block text-sm font-semibold text-navy-900">
            Where are you based?
          </label>
          <input
            id="town"
            name="town"
            type="text"
            autoComplete="address-level2"
            placeholder="Town / city"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-navy-900">
            Position <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="position"
            name="position"
            required
            defaultValue=""
            aria-invalid={errors.position ? true : undefined}
            aria-describedby={errors.position ? "position-error" : undefined}
            className={`${inputClass} ${errors.position ? errorClass : ""}`}
          >
            <option value="" disabled>
              Select a position
            </option>
            {applyPage.positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          {fieldError("position", "position-error")}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-semibold text-navy-900">
            Years of experience <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="experience"
            name="experience"
            required
            defaultValue=""
            aria-invalid={errors.experience ? true : undefined}
            aria-describedby={errors.experience ? "experience-error" : undefined}
            className={`${inputClass} ${errors.experience ? errorClass : ""}`}
          >
            <option value="" disabled>
              Select experience level
            </option>
            {applyPage.experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {fieldError("experience", "experience-error")}
        </div>

        <div>
          <label htmlFor="wage" className="block text-sm font-semibold text-navy-900">
            Expected hourly wage
          </label>
          <input
            id="wage"
            name="wage"
            type="text"
            inputMode="decimal"
            placeholder="e.g. $25/hr or negotiable"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-semibold text-navy-900">
            Resume
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            aria-invalid={errors.resumeFileName ? true : undefined}
            aria-describedby={errors.resumeFileName ? "resume-error" : "resume-hint"}
            className="mt-2 block w-full text-sm text-steel-700 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-navy-700 file:px-4 file:py-2.5 file:font-heading file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
          />
          <p id="resume-hint" className="mt-1.5 text-sm text-steel-500">
            PDF or Word, up to 4 MB. Sent along with your application.
          </p>
          {fieldError("resumeFileName", "resume-error")}
        </div>
      </div>

      <div>
        <label htmlFor="about" className="block text-sm font-semibold text-navy-900">
          About you &amp; your experience <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="about"
          name="about"
          rows={5}
          required
          aria-invalid={errors.about ? true : undefined}
          aria-describedby={errors.about ? "about-error" : "about-hint"}
          className={`${inputClass} ${errors.about ? errorClass : ""}`}
        />
        <p id="about-hint" className="mt-1.5 text-sm text-steel-500">
          The work you&apos;ve done, tools and finishes you know, and anything
          else we should know.
        </p>
        {fieldError("about", "about-error")}
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
        {sending ? "Sending..." : "Send Application"}
      </button>
    </form>
  );
}
