import { company } from "@/content/site";

/**
 * Job application handling - same honest delivery model as the quote form
 * (see lib/quote-request.ts): no fake "submitted!" path. With a real
 * business email configured, we open the applicant's email app pre-filled
 * (mailto:); the application is sent by the applicant, not by the site.
 *
 * Resumes: mailto links can't attach files, so the composed email asks the
 * applicant to attach their resume before sending.
 */

export type JobApplication = {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  town: string;
  about: string;
  preferredContact: string;
};

export function formatApplicationMessage(data: JobApplication): string {
  return [
    `Job application for ${company.name}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Position: ${data.position}`,
    `Experience: ${data.experience}`,
    `Location: ${data.town || "Not provided"}`,
    `Preferred contact method: ${data.preferredContact}`,
    "",
    "About / experience:",
    data.about,
    "",
    "(If you have a resume, please attach it to this email before sending.)",
  ].join("\n");
}

export function buildApplicationMailtoUrl(data: JobApplication): string {
  const subject = `Job application from ${data.name} (${data.position})`;
  return `mailto:${company.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(formatApplicationMessage(data))}`;
}
