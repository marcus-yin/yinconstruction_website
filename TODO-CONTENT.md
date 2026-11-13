# TODO: Content to supply before launch

Every `{{TODO: ...}}` token on the site is listed here. All of them live in
**`content/site.ts`** — edit that one file and the change appears everywhere
the fact is used. Nothing below has been invented; each token needs a real,
verified value from the business owner.

## Global (used on every page — header, footer, sticky call bar, JSON-LD schema)

| Token | What's needed |
| --- | --- |
| Street address / city / ZIP | Hidden for now (nulls in `company.address`) — fill in to show in the footer and LocalBusiness schema |
| `{{TODO: Google Business Profile URL}}` | `socialProfiles` — create the profile first (steps in `SEO-SETUP.md`), then paste its public URL; feeds `sameAs` in the LocalBusiness schema |
| `{{TODO: Facebook page URL}}` | `socialProfiles` — business page URL, if/when one exists |
| `{{TODO: LinkedIn company page URL}}` | `socialProfiles` — company page URL, if/when one exists |
| `company.geo` latitude/longitude | Currently `null` — coordinates of the shop/base location enable the `geo` property in the LocalBusiness schema |
| `{{TODO: GA4 measurement ID}}` | Not in `site.ts` — set the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable in the Amplify console (steps in `SEO-SETUP.md`). Until then no analytics ships |

> Already set: phone `(315) 216-7657`, email `info@yinconstruction.com`,
> hours `Mon-Fri 7:00 AM - 5:00 PM, Sat 10:00 AM - 2:00 PM`, and the
> production domain `https://yinconstruction.com` (drives canonical URLs,
> sitemap.xml, robots.txt, and Open Graph).
>
> **Contact form delivery is active.** Both the quote form and the job
> application form submit directly to info@yinconstruction.com via the
> Lambda + SES backend (resumes arrive as attachments). If a submission
> fails, the forms fall back to opening the visitor's email app pre-filled.
> See `infra/form-handler/README.md`.

## Home page

| Token | What's needed |
| --- | --- |
| `{{TODO: years in business}}` | Used in the hero intro sentence and the stats band |
| `{{TODO: projects completed}}` | Stats band — set `value` to a number in `stats` to enable the animated counter |
| `{{TODO: total sq ft finished}}` | Stats band counter |
| `{{TODO: service radius in miles}}` | Stats band (hidden); the "Where We Work" sentence mention is removed for now — restore note is in `app/page.tsx` |
| `{{TODO: license/registration details}}` | Trust strip note next to "Licensed & Insured" |

> Stats note: each stat in `content/site.ts` has `value: null` plus a token.
> Replace `value` with a real number (e.g. `value: 15`) and the animated
> counter activates automatically; the token is then ignored.

## Services page

| Token | What's needed |
| --- | --- |
| Warranty terms | Hidden for now — process timeline step 6 (Home + Services) says only "You sign off when it's right."; add the warranty sentence back in `processSteps` when terms are available |

## Projects page

| Token | What's needed |
| --- | --- |
| `{{TODO: square footage}}` (×3) | Real square footage for each project that replaces a sample |
| `{{TODO: project duration}}` (×3) | Real duration for each project |
| `{{TODO: year}}` (×3) | Completion year for each project |

> The three current entries are marked `sample: true` and **do not render in
> production** until `flags.showSampleProjectsInProduction` is flipped or they
> are replaced with real projects (with client permission for any photos —
> drop image files in `public/images/projects/` and set each project's
> `photo` field).

## About page

| Token | What's needed |
| --- | --- |
| Founding story paragraph | Hidden for now (commented out in `about.story`) — needs founding year, founder name/background, and 2-3 sentences on how the company started |
| `{{TODO: OSHA 10/30 cards held by team members}}` | Safety section (also on Certifications) |
| Team members | "Our Team" section is hidden while `teamMembers` is empty — add real names/roles/initials to bring it back |

## Certifications page

| Token | What's needed |
| --- | --- |
| `{{TODO: municipal/county contractor licenses...}}` | NYS licenses contractors locally — list each registration + number |
| `{{TODO: general liability carrier and coverage amount}}` | GL insurance details |
| `{{TODO: workers' compensation carrier and policy details}}` | Workers' comp details |
| `{{TODO: OSHA 10/30 training cards held by team members}}` | Safety training held |
| `{{TODO: MWBE/DBE or other New York State certifications, if applicable}}` | Remove this card in `content/site.ts` if none |

## Contact page (FAQ answers)

| Token | What's needed |
| --- | --- |
| `{{TODO: current lead time}}` | Typical wait for new projects |
| `{{TODO: license/registration summary}}` | One-line licensing answer |
| `{{TODO: warranty length and terms}}` | Warranty FAQ |
| `{{TODO: payment terms — deposit amount, progress payments, accepted payment methods}}` | Payment FAQ |

## Code TODOs (not content)

- ~~Contact form backend~~ — **done**: both forms deliver directly to
  info@yinconstruction.com via Lambda + SES (resumes attached on the apply
  form). See `infra/form-handler/README.md`. The mailto flow remains as the
  fallback if a request fails.
- `next.config.ts` — remove `images.unoptimized` once real photos replace
  SVG graphics, to enable Amplify image optimization.
- `testimonials` in `content/site.ts` is an empty array by design. The
  Testimonials section appears automatically once real, permissioned quotes
  are added.
