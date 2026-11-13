/**
 * Form backend for yinconstruction.com (quote requests + job applications).
 *
 * Receives POST JSON from the website's forms, validates it server-side,
 * and emails the submission to the business inbox via Amazon SES. Job
 * applications may include a base64-encoded resume, which is attached to
 * the email - no extra step for the applicant.
 *
 * Deployed as a Lambda with a public Function URL (CORS restricted to the
 * site's domains). See infra/form-handler/README.md for deploy commands.
 * No secrets live here or in the frontend; the function's IAM role is
 * scoped to ses:SendEmail / ses:SendRawEmail on the business identity only.
 */

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});

/** Business address - SES-verified; both sender and recipient. */
const BUSINESS_EMAIL = "info@yinconstruction.com";
const FROM = `YIN Construction Website <${BUSINESS_EMAIL}>`;

/** 4 MB raw resume cap (fits the 6 MB Function URL payload limit as base64). */
const MAX_RESUME_BASE64_CHARS = 4 * 1024 * 1024 * 1.4;
const MAX_FIELD_CHARS = 5000;

const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strips header-injection characters from values used in MIME headers. */
function headerSafe(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function field(body, key) {
  const value = String(body[key] ?? "").trim();
  return value.slice(0, MAX_FIELD_CHARS);
}

function formatLines(kind, body) {
  if (kind === "quote") {
    return [
      "Quote request from the website",
      "",
      `Name: ${field(body, "name")}`,
      `Email: ${field(body, "email")}`,
      `Phone: ${field(body, "phone")}`,
      `Customer type: ${field(body, "customerType")}`,
      `Project type: ${field(body, "projectType")}`,
      `Location: ${field(body, "town") || "Not provided"}`,
      `Approximate size: ${field(body, "size") || "Not provided"}`,
      `Timeline: ${field(body, "timeline")}`,
      `Preferred contact method: ${field(body, "preferredContact")}`,
      "",
      "Project description:",
      field(body, "description"),
    ];
  }
  return [
    "Job application from the website",
    "",
    `Name: ${field(body, "name")}`,
    `Email: ${field(body, "email")}`,
    `Phone: ${field(body, "phone")}`,
    `Position: ${field(body, "position")}`,
    `Experience: ${field(body, "experience")}`,
    `Expected hourly wage: ${field(body, "wage") || "Not provided"}`,
    `Location: ${field(body, "town") || "Not provided"}`,
    `Preferred contact method: ${field(body, "preferredContact")}`,
    "",
    "About / experience:",
    field(body, "about"),
  ];
}

function validate(kind, body) {
  const required =
    kind === "quote"
      ? ["name", "email", "phone", "customerType", "projectType", "timeline", "description", "preferredContact"]
      : ["name", "email", "phone", "position", "experience", "about", "preferredContact"];
  for (const key of required) {
    if (!field(body, key)) return `Missing field: ${key}`;
  }
  if (!EMAIL_RE.test(field(body, "email"))) return "Invalid email address";
  return null;
}

function validateResume(resume) {
  if (typeof resume.filename !== "string" || typeof resume.dataBase64 !== "string") {
    return "Malformed resume payload";
  }
  const name = resume.filename.toLowerCase();
  if (!ALLOWED_RESUME_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "Resume must be a PDF or Word document";
  }
  if (resume.dataBase64.length > MAX_RESUME_BASE64_CHARS) {
    return "Resume is too large (4 MB max)";
  }
  if (!/^[A-Za-z0-9+/=\s]+$/.test(resume.dataBase64)) {
    return "Malformed resume payload";
  }
  return null;
}

/** Builds a raw RFC 5322 message so we can attach the resume. */
function buildRawEmail({ subject, replyTo, textBody, attachment }) {
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const lines = [
    `From: ${FROM}`,
    `To: ${BUSINESS_EMAIL}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    textBody,
  ];
  if (attachment) {
    // Keep only safe filename characters for the MIME headers.
    const safeName = attachment.filename.replace(/[^A-Za-z0-9._ -]/g, "_");
    const wrapped = attachment.dataBase64.replace(/\s+/g, "").replace(/(.{76})/g, "$1\r\n");
    lines.push(
      "",
      `--${boundary}`,
      `Content-Type: application/octet-stream; name="${safeName}"`,
      `Content-Disposition: attachment; filename="${safeName}"`,
      "Content-Transfer-Encoding: base64",
      "",
      wrapped
    );
  }
  lines.push("", `--${boundary}--`, "");
  return lines.join("\r\n");
}

export async function handler(event) {
  const method = event?.requestContext?.http?.method;
  if (method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let body;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf8")
      : event.body ?? "";
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  // Honeypot: real visitors never fill this field. Pretend success to bots.
  if (String(body.website ?? "").length > 0) {
    return json(200, { ok: true });
  }

  const kind = body.kind === "application" ? "application" : body.kind === "quote" ? "quote" : null;
  if (!kind) return json(400, { ok: false, error: "Unknown form kind" });

  const error = validate(kind, body);
  if (error) return json(400, { ok: false, error });

  let attachment = null;
  if (kind === "application" && body.resume) {
    const resumeError = validateResume(body.resume);
    if (resumeError) return json(400, { ok: false, error: resumeError });
    attachment = { filename: body.resume.filename, dataBase64: body.resume.dataBase64 };
  }

  const name = headerSafe(field(body, "name"));
  const email = headerSafe(field(body, "email"));
  const subject =
    kind === "quote"
      ? `Quote request from ${name} (${headerSafe(field(body, "customerType"))})`
      : `Job application from ${name} (${headerSafe(field(body, "position"))})`;

  const raw = buildRawEmail({
    subject,
    replyTo: `${name} <${email}>`,
    textBody: formatLines(kind, body).join("\r\n"),
    attachment,
  });

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: FROM,
        Destination: { ToAddresses: [BUSINESS_EMAIL] },
        ReplyToAddresses: [email],
        Content: { Raw: { Data: Buffer.from(raw) } },
      })
    );
  } catch (err) {
    console.error("SES send failed", err);
    // The frontend falls back to its mailto path on any non-200 response,
    // so a temporary SES issue never strands the visitor.
    return json(502, { ok: false, error: "Email delivery failed" });
  }

  return json(200, { ok: true });
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}
