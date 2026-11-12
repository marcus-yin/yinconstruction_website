import { company } from "@/content/site";

/**
 * Quote/bid request handling for a static site with NO form backend yet.
 *
 * IMPORTANT: there is intentionally no fake "submission succeeded" path.
 * Until a backend exists, the form composes the request into a structured
 * message the visitor can send themselves:
 *   - if a real business email is configured in content/site.ts, we open
 *     the visitor's email app pre-filled (mailto:) — a genuine delivery path;
 *   - otherwise we show the composed message with copy instructions and
 *     the business phone/email placeholders, and say plainly that online
 *     submission isn't connected yet.
 *
 * See docs/CONTACT-FORM-BACKEND.md for the plan to wire real submissions
 * (AWS Lambda + SES or a form service). Do not embed credentials here.
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
