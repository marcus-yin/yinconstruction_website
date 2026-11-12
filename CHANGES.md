# What changed

## Round 2 — lead-generation and local SEO audit (Nov 12)

- **Honest contact form**: removed the placeholder handler that falsely
  showed "we got your request." The form now composes the request and either
  opens the visitor's email app pre-filled (once a real business email is set
  in `content/site.ts`) or states plainly that online submission isn't
  connected, with a copyable message. Backend plan:
  `docs/CONTACT-FORM-BACKEND.md`.
- **Real domain**: canonical URLs, sitemap, robots, Open Graph, and JSON-LD
  now use `https://yinconstruction.com`.
- **New hero positioning**: "Professional Drywall & Interior Construction in
  Central New York" with dual CTAs — Request an Estimate / Request a
  Subcontractor Bid — replacing the generic quote CTA and the
  years-in-business token in the hero.
- **Customer pathways**: new `/homeowners/` and `/general-contractors/`
  pages (shared `PathwayPage` template), a "Who We Work With" homepage
  section, and a required "I am a" customer-type field on the quote form,
  preselected via `?type=homeowner|contractor|commercial` links.
- **Dedicated service pages**: `/services/[slug]/` for all six services
  (SSG via `generateStaticParams`) with unique titles/descriptions/canonicals,
  breadcrumbs, Service structured data, related-service internal links, and a
  natural service-area mention. `/services/` is now an overview grid; old
  `#anchor` links still land via preserved ids. Footer and homepage link to
  the new pages.
- **Projects page**: with no verified projects published, the page now shows
  a capabilities statement with an estimate CTA instead of a bare empty
  state. `ProjectCard` gained an optional completion-year field.


A full redesign of the YIN Construction site, replacing the generic
placeholder build. Framework and routing are unchanged (Next.js App Router,
TypeScript, Tailwind CSS 4, deployed to AWS Amplify from `main`).

## Highlights

- **Branding fixed**: the duplicated-letter logo ("YYour…") is gone; the
  header renders a code-native logo mark plus the company name (YIN
  Construction) from the content file.
- **One source of truth**: all copy and business facts live in
  **`content/site.ts`** — company info, services, projects, stats, values,
  process steps, FAQs, certifications, team, testimonials. Components contain
  no hard-coded copy. Unverifiable facts are `{{TODO}}` tokens tracked in
  `TODO-CONTENT.md` (no invented licenses, projects, or reviews).
- **Services reconciled**: pages, meta descriptions, footer, the quote-form
  project-type dropdown, and JSON-LD all derive from the same `services`
  array (drywall installation, taping & finishing, repair, commercial
  interiors, residential renovations, painting).
- **Code-native visual system** (no photography): navy/steel palette with a
  safety-orange accent reserved for CTAs, Poppins headings, and a reusable
  graphics kit in `components/graphics/`:
  blueprint grid backgrounds, a consistent line-icon set for services, angled
  section dividers, an isometric wall-assembly hero illustration, animated
  stat counters (reduced-motion safe), a numbered process timeline, a
  stylized Central NY service-area map, a drywall finish-levels diagram,
  monogram avatars, and certification badges. The old static SVG placeholders
  were deleted.
- **New pages**: richer Home (hero + trust strip, stats, services, process,
  values, service area, projects, conditional testimonials, CTA), detailed
  Services sections with checklists and the Levels 0–5 diagram, a filterable
  Projects grid with clearly-flagged samples (hidden in production), About
  with safety/team sections, badge-style Certifications, and a Contact page
  with a validated, honeypot-protected quote form plus FAQ accordion.
- **SEO & a11y**: per-page titles/descriptions/canonicals, Open Graph +
  Twitter tags, LocalBusiness(GeneralContractor) JSON-LD from the content
  file, sitemap/robots, one h1 per page, labelled nav/accordion/form
  controls, visible focus states, prefers-reduced-motion respected, sticky
  mobile Call / Get-a-Quote bar.

## How to edit content

1. Open **`content/site.ts`**. Everything editable is there, typed and
   commented. Replace `{{TODO: ...}}` tokens with real facts
   (checklist: `TODO-CONTENT.md`).
2. **Stats counters**: set `value` to a real number to activate animation.
3. **Projects**: replace the `sample: true` entries with real work; add
   photos to `public/images/projects/` and reference them via the `photo`
   field. Samples stay hidden in production until
   `flags.showSampleProjectsInProduction` is flipped.
4. **Testimonials**: add entries to `testimonials` and the section renders
   automatically.
5. **Quote form**: wire `lib/submit-quote.ts` to Lambda/SES or a form
   service — it currently succeeds without sending.

Every commit in this series builds cleanly (`npm run build`); pushing to
`main` triggers the Amplify deploy.
