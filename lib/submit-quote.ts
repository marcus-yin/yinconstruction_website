/**
 * Quote request submission — PLACEHOLDER HANDLER.
 *
 * TODO(owner): connect this to a real backend before launch. Options:
 *   - AWS Lambda behind API Gateway or a Lambda Function URL, sending mail
 *     via SES (fits the existing AWS Amplify hosting), or
 *   - a form service such as Formspree/Basin (POST the payload to their
 *     endpoint and check the response).
 *
 * Until then this resolves successfully without sending anything, so the
 * form UX can be reviewed end to end.
 */

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  town: string;
  size: string;
  timeline: string;
  description: string;
  preferredContact: string;
};

export async function submitQuoteRequest(
  data: QuoteRequest
): Promise<{ ok: boolean }> {
  // TODO(owner): replace with a real POST, e.g.:
  // const res = await fetch("https://YOUR-ENDPOINT", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // return { ok: res.ok };

  console.info("[placeholder] Quote request not sent — no backend wired yet:", data);
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}
