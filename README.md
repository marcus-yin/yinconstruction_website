# YIN Construction — website

Marketing site for YIN Construction, a drywall and interior construction
contractor in Central New York. Built with Next.js (App Router), TypeScript,
and Tailwind CSS. Every page is statically generated; no database, no
authentication. Deployed via AWS Amplify's Next.js hosting from `main`
(build output directory: `.next`).

## Getting started

```bash
npm install
npm run dev     # develop at http://localhost:3000
npm run build   # production build (all pages prerendered)
```

## Editing content

All site copy and business facts live in **`content/site.ts`** — see
`CHANGES.md` for a guide and `TODO-CONTENT.md` for the checklist of
`{{TODO}}` tokens that need real values before launch.

Graphics are code-native (inline SVG components in `components/graphics/`);
the only photo slots are on project cards (`public/images/projects/`).

## Deploying

Pushing to `main` triggers the Amplify build (`npm run build`, output
`.next`). To deploy to S3 + CloudFront instead, add `output: "export"` to
`next.config.ts` and publish the `out/` directory.
