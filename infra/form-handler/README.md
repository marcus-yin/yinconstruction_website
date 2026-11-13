# Form handler Lambda

Receives quote requests and job applications from the website forms and
emails them to **info@yinconstruction.com** via Amazon SES. Job application
resumes (PDF/Word, 4 MB max) arrive as real email attachments.

## Deployed state (account 704353679084, us-east-1)

- **Lambda**: `yinconstruction-form-handler` (Node 22, 256 MB, 15 s timeout)
- **Function URL** (public, CORS-restricted to the site's domains):
  `https://5sgvgv5eano6becwewade6afqq0lqedb.lambda-url.us-east-1.on.aws/`
  - The frontend uses this URL via `lib/form-backend.ts`.
- **IAM role**: `yinconstruction-form-handler-role`
  - `AWSLambdaBasicExecutionRole` (CloudWatch logs)
  - Inline `send-form-email`: `ses:SendEmail` / `ses:SendRawEmail` scoped to
    the `info@yinconstruction.com` identity only
- **SES identity**: `info@yinconstruction.com`, verified. The account is in
  the SES sandbox, which is fine: mail is only sent *to* that same verified
  address. If you ever want SES to email other recipients (e.g. an
  auto-reply to visitors), request SES production access first.

## Updating the function code

After editing `index.mjs`:

```powershell
Compress-Archive -Path infra\form-handler\index.mjs -DestinationPath $env:TEMP\form-handler.zip -Force
aws lambda update-function-code --function-name yinconstruction-form-handler --zip-file fileb://$env:TEMP/form-handler.zip
```

## Request format

`POST` JSON to the Function URL:

- `kind`: `"quote"` or `"application"`
- `website`: honeypot, must be empty (bots that fill it get a fake 200)
- Quote fields: `name, email, phone, customerType, projectType, town, size, timeline, description, preferredContact`
- Application fields: `name, email, phone, position, experience, wage, town, about, preferredContact`
  plus optional `resume: { filename, dataBase64 }`

Responses: `200 {ok:true}` on delivery, `400` on validation failure,
`502` if SES rejects the send. The frontend falls back to its mailto flow
on anything other than `{ok:true}`.
