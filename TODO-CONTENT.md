# TODO: Content to supply before launch

Every `{{TODO: ...}}` token on the site is listed here. All of them live in
**`content/site.ts`** — edit that one file and the change appears everywhere
the fact is used. Nothing below has been invented; each token needs a real,
verified value from the business owner.

## Global (used on every page — header, footer, sticky call bar, JSON-LD schema)

| Token | What's needed |
| --- | --- |
| `{{TODO: business phone number}}` | Phone number as it should display, e.g. `(315) 123-4567` |
| `{{TODO: business phone, digits only with +1 prefix}}` | Same number for `tel:` links, e.g. `+13151234567` |
| `{{TODO: business email address}}` | Email for mailto links and the contact page |
| `{{TODO: street address}}` / `{{TODO: city}}` / `{{TODO: ZIP code}}` | Business mailing address (footer + LocalBusiness schema) |
| `{{TODO: business hours, e.g. Mon-Fri 7:00 AM - 5:00 PM}}` | Hours for footer, contact page, and schema |
| `{{TODO: production domain}}` | The real domain (`company.url`) — drives canonical URLs, sitemap.xml, robots.txt, Open Graph. Keep it a valid URL. |

## Home page

| Token | What's needed |
| --- | --- |
| `{{TODO: years in business}}` | Used in the hero intro sentence and the stats band |
| `{{TODO: projects completed}}` | Stats band — set `value` to a number in `stats` to enable the animated counter |
| `{{TODO: total sq ft finished}}` | Stats band counter |
| `{{TODO: service radius in miles}}` | Stats band + "Where We Work" sentence |
| `{{TODO: license/registration details}}` | Trust strip note next to "Licensed & Insured" |

> Stats note: each stat in `content/site.ts` has `value: null` plus a token.
> Replace `value` with a real number (e.g. `value: 15`) and the animated
> counter activates automatically; the token is then ignored.

## Services page

| Token | What's needed |
| --- | --- |
| `{{TODO: warranty terms}}` | Referenced in the process timeline step 6 (also shown on Home) |

## Projects page

| Token | What's needed |
| --- | --- |
| `{{TODO: square footage}}` (×3) | Real square footage for each project that replaces a sample |
| `{{TODO: project duration}}` (×3) | Real duration for each project |

> The three current entries are marked `sample: true` and **do not render in
> production** until `flags.showSampleProjectsInProduction` is flipped or they
> are replaced with real projects (with client permission for any photos —
> drop image files in `public/images/projects/` and set each project's
> `photo` field).

## About page

| Token | What's needed |
| --- | --- |
| `{{TODO: founding year}}` | Company story, first paragraph |
| `{{TODO: founder name and background}}` | Company story |
| `{{TODO: 2-3 sentences about how the company started...}}` | Company story |
| `{{TODO: OSHA 10/30 cards held by team members}}` | Safety section (also on Certifications) |
| `{{TODO: team member 1/2/3 name}}` + `role` | Team section — update `initials` for the monogram avatars too |

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

- `lib/submit-quote.ts` — the quote form currently resolves without sending
  anything. Wire it to AWS Lambda + SES or a form service (instructions in
  the file).
- `next.config.ts` — remove `images.unoptimized` once real photos replace
  SVG graphics, to enable Amplify image optimization.
- `testimonials` in `content/site.ts` is an empty array by design. The
  Testimonials section appears automatically once real, permissioned quotes
  are added.
