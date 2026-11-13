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
  /** Expected hourly wage - free text, e.g. "$25/hr" or "negotiable". */
  wage: string;
  town: string;
  about: string;
  /** Name of the resume file the applicant selected (not uploaded - the
   * applicant attaches it to the email themselves). Empty if none. */
  resumeFileName: string;
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
    `Expected hourly wage: ${data.wage || "Not provided"}`,
    `Location: ${data.town || "Not provided"}`,
    `Preferred contact method: ${data.preferredContact}`,
    "",
    "About / experience:",
    data.about,
    "",
    data.resumeFileName
      ? `Resume: ${data.resumeFileName} - PLEASE ATTACH this file to this email before sending.`
      : "(If you have a resume, please attach it to this email before sending.)",
  ].join("\n");
}

export function buildApplicationMailtoUrl(data: JobApplication): string {
  const subject = `Job application from ${data.name} (${data.position})`;
  return `mailto:${company.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(formatApplicationMessage(data))}`;
}
