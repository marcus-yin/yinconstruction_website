# SEO setup — manual steps

Everything in code is done (see `CHANGES.md`, Round 3). The items below
require accounts, dashboards, or DNS access and must be done by hand.
Work top to bottom; each step is independent.

## 1. Google Search Console — submit the sitemap

The domain property for `yinconstruction.com` is **already verified** via a
DNS TXT record.

1. Open https://search.google.com/search-console and pick the
   `yinconstruction.com` domain property.
2. Left menu → **Sitemaps** → enter `sitemap.xml` → Submit.
   (Full URL: `https://yinconstruction.com/sitemap.xml` — it lists all 27
   indexable pages, including the new `/service-areas/` pages.)
3. Over the following days, check **Pages** (indexing report) for errors.
4. Optional but useful: **URL Inspection** on the homepage and one service
   page → "Request indexing" to speed up the first crawl.

## 2. Bing Webmaster Tools

1. Open https://www.bing.com/webmasters and sign in.
2. Choose **Import from Google Search Console** — it reuses the Google
   verification and imports the sitemap automatically. That's the whole step.

## 3. Google Business Profile (biggest local-SEO lever)

1. https://business.google.com → create the profile for **YIN Construction**.
2. Primary category: **Drywall contractor**. Secondary: **General contractor**.
3. Use exactly the NAP shown on the site (keep it consistent everywhere):
   - Name: YIN Construction
   - Phone: (315) 216-7657
   - Website: https://yinconstruction.com
   - Hours: Mon–Fri 7:00 AM–5:00 PM, Sat 10:00 AM–2:00 PM
4. If you don't want the street address public, choose
   **Service-area business** and list the areas: Syracuse, Utica, Auburn,
   Rome, Cortland, Oswego, Fulton NY.
5. After it's live, paste the profile's public URL into
   `socialProfiles` in `content/site.ts` (replacing the
   `{{TODO: Google Business Profile URL}}` token) so it appears in the
   site's structured data.

## 4. Citations (consistent NAP everywhere)

List the business with the identical name/phone/website on:

- Yelp (https://biz.yelp.com)
- Angi / HomeAdvisor
- Houzz
- Facebook business page (then fill the `{{TODO: Facebook page URL}}` token)
- Apple Business Connect (https://businessconnect.apple.com)
- Nextdoor business page
- Syracuse-area chamber of commerce directory, if joining

Consistency matters more than quantity — same spelling, same phone format.

## 5. AWS Amplify — redirect and noindex (console steps)

Per the standing rule, these infrastructure changes are documented here,
not performed. App: `dmbp3awrmzs4t`, region us-east-1.

**a) www → apex 301 redirect** (canonical domain is the apex, no www):

Amplify console → Hosting → **Rewrites and redirects** → add rule:

| Source | Target | Type |
| --- | --- | --- |
| `https://www.yinconstruction.com` | `https://yinconstruction.com` | 301 (Permanent redirect) |

(If www is managed in the Domain management screen instead, set
"Redirect www to apex" there.)

**b) Keep the amplifyapp.com URL out of Google.** The default
`*.amplifyapp.com` domain serves the same content and could compete with
the real domain. In Amplify console → Hosting → Rewrites and redirects,
add a redirect from the default domain to the custom domain, or restrict
the default domain under App settings → Access control. (A robots-header
alternative requires a server middleware; the redirect is simpler.)

**c) Cache headers** need no action: `customHttp.yml` is in the repo and
Amplify applies it on the next deploy.

## 6. GA4 analytics

1. Create a GA4 property at https://analytics.google.com → copy the
   measurement ID (`G-XXXXXXXXXX`).
2. Amplify console → App settings → **Environment variables** → add
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` = the ID → redeploy.
3. Until that variable is set, **no analytics script ships at all** (by
   design). Once set, the site reports page views plus:
   `quote_form_submit`, `application_form_submit`, `phone_click`,
   `email_click`, and `quote_cta_click`. No other trackers exist.

## 7. Content tokens that boost local SEO when filled

In `content/site.ts` (tracked in `TODO-CONTENT.md`):

- `socialProfiles` — Google Business Profile, Facebook, LinkedIn URLs
  (feeds `sameAs` in structured data).
- `company.geo` latitude/longitude — enables the `geo` property on the
  LocalBusiness schema (use the shop/base location).
- `company.address` — street/city/ZIP are currently hidden; filling them
  strengthens the LocalBusiness schema and footer NAP.
