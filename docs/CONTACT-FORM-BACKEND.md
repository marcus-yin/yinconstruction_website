# Contact form backend

> **STATUS: IMPLEMENTED (Nov 2026).** The architecture below is deployed:
> Lambda Function URL + SES, with the quote form (`/contact/`) and the job
> application form (`/apply/`, resume attachments included) posting to it.
> See `infra/form-handler/README.md` for the deployed resources and update
> commands. The mailto flow described below remains as the fallback when a
> request to the backend fails.

## Fallback behavior (honest by design)

If the backend request fails, the form never claims a message was sent:

- If a real business email is set in `content/site.ts`, submitting opens the
  visitor's email app pre-filled (`mailto:`) and the UI explains the email
  still has to be sent. This is a genuine delivery path with zero backend.
- While the email is still a `{{TODO}}` token, the UI states plainly that
  online submission isn't connected and shows the composed message with a
  copy button plus phone/email guidance.

Fallback logic lives in `lib/quote-request.ts`, `lib/job-application.ts`,
and the form components.

## Recommended target architecture (AWS, fits Amplify hosting)

```
Browser (static form)
   └─ POST JSON ─▶ Lambda Function URL (or API Gateway HTTP API)
                      └─ validates + rate-limits ─▶ SES SendEmail ─▶ business inbox
```

Setup steps (all outside this repo — no secrets in frontend code):

1. **SES**: verify the sending domain (`yinconstruction.com`) or a sending
   address; while SES is in sandbox mode, also verify the receiving address;
   request production access to lift sandbox limits.
2. **Lambda** (Node 20): accepts `POST` JSON matching the `QuoteRequest`
   type, validates fields server-side, rejects if the honeypot field is
   filled, and calls `ses:SendEmail`. Grant the function an IAM role with
   `ses:SendEmail` on the verified identity only.
3. **Function URL / API Gateway**: enable CORS restricted to
   `https://yinconstruction.com` (and the Amplify preview domain while
   testing). No auth needed for a public form; add basic rate limiting
   (API Gateway throttling or a WAF rule).
4. **Frontend**: replace the `isEmailConfigured()` branch in
   `components/ContactForm.tsx` with a `fetch` POST to the endpoint; keep the
   mailto path as a fallback on network error. The endpoint URL is public and
   safe to commit (or set via `NEXT_PUBLIC_QUOTE_ENDPOINT` in Amplify).
5. **Spam defense**: keep the honeypot; optionally add a time-to-submit
   check in Lambda. Avoid CAPTCHA unless spam becomes a real problem.

## Alternative: form service (fastest)

Formspree, Basin, or similar: create a form, then POST the same JSON to
their endpoint from `ContactForm.tsx`. No AWS setup; free tiers are fine for
early lead volume. Trade-off: lead data flows through a third party.

## Future: project photo uploads

Planned approach once the Lambda path exists: the form requests a presigned
S3 PUT URL from the Lambda, uploads the image directly to a private bucket
(size/type-limited), and includes the object key in the email. Do not accept
file uploads before server-side validation exists. The form copy already
tells visitors photos will be requested by email in the meantime.
