/**
 * Real form delivery: both site forms POST to a Lambda Function URL that
 * validates the submission and emails it to the business inbox via SES
 * (resume attachments included). Source and deploy commands live in
 * infra/form-handler/.
 *
 * The URL is public by design (it's where the public form posts) and safe
 * to commit - there are no secrets in it. CORS on the endpoint is
 * restricted to the site's domains.
 *
 * If the request fails (offline, endpoint down), callers fall back to the
 * original mailto flow, so a visitor is never shown a fake success and
 * never left stranded.
 */

export const FORM_ENDPOINT =
  "https://5sgvgv5eano6becwewade6afqq0lqedb.lambda-url.us-east-1.on.aws/";

/** True if the submission was delivered; false means use the fallback. */
export async function submitToBackend(
  payload: Record<string, unknown>
): Promise<boolean> {
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    return (
      typeof result === "object" &&
      result !== null &&
      (result as { ok?: boolean }).ok === true
    );
  } catch {
    return false;
  }
}
