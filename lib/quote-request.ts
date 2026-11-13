import { company } from "@/content/site";

/**
 * Quote/bid request fallback handling.
 *
 * The primary delivery path is the form backend (lib/form-backend.ts -
 * Lambda + SES, see infra/form-handler/). This module is the fallback used
 * when that request fails: it composes the request into a structured
 * message the visitor sends themselves via their email app (mailto:).
 * There is intentionally no fake "submission succeeded" path anywhere.
 * Do not embed credentials here.
 */

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  customerType: string;
  projectType: string;
  town: string;
  size: string;
  timeline: string;
  description: string;
  preferredContact: string;
};

/** True once a real email address replaces the {{TODO}} token. */
export function isEmailConfigured(): boolean {
  return !company.email.includes("{{") && company.email.includes("@");
}

export function formatQuoteMessage(data: QuoteRequest): string {
  return [
    `Quote request for ${company.name}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Customer type: ${data.customerType}`,
    `Project type: ${data.projectType}`,
    `Location: ${data.town || "Not provided"}`,
    `Approximate size: ${data.size || "Not provided"}`,
    `Timeline: ${data.timeline}`,
    `Preferred contact method: ${data.preferredContact}`,
    "",
    "Project description:",
    data.description,
  ].join("\n");
}

export function buildMailtoUrl(data: QuoteRequest): string {
  const subject = `Quote request from ${data.name} (${data.customerType})`;
  return `mailto:${company.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(formatQuoteMessage(data))}`;
}
