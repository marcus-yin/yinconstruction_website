/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH for all site copy and business facts.
 *
 * Components must read from this file - no hard-coded copy in components.
 *
 * Any value wrapped in {{TODO: ...}} is a placeholder token for a real fact
 * that must be supplied and verified by the business owner. Every token is
 * listed in TODO-CONTENT.md at the repo root. Do not invent values.
 * ============================================================================
 */

/* ----------------------------------------------------------------- company */

export const company = {
  name: "YIN Construction",
  tagline: "Drywall & interior construction for Central New York",
  /** Production domain - drives canonical URLs, sitemap.xml, and Open Graph. */
  url: "https://yinconstruction.com",
  phone: {
    /** Shown to visitors, e.g. "(315) 123-4567" */
    display: "(315) 216-7657",
    /** Used in tel: links, e.g. "+13151234567" */
    e164: "+13152167657",
  },
  email: "info@yinconstruction.com",
  address: {
    // Street/city/zip hidden for now. To publish the address, replace the
    // nulls, e.g. street: "123 Main St", city: "Syracuse", zip: "13201".
    street: null as string | null,
    city: null as string | null,
    state: "NY",
    zip: null as string | null,
  },
  hours: "Mon-Fri 7:00 AM - 5:00 PM, Sat 10:00 AM - 2:00 PM",
  /** Same hours in schema.org openingHours format for structured data. */
  hoursSchema: ["Mo-Fr 07:00-17:00", "Sa 10:00-14:00"],
  /** Same hours as schema.org OpeningHoursSpecification input. */
  hoursSpecification: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    { days: ["Saturday"], opens: "10:00", closes: "14:00" },
  ],
  /**
   * Office coordinates for LocalBusiness geo schema.
   * {{TODO: latitude/longitude of the business address}} - set both numbers
   * (e.g. lat: 43.0481, lng: -76.1474) once the address is published.
   */
  geo: { lat: null as number | null, lng: null as number | null },
  serviceAreaStatement:
    "Serving Syracuse and communities throughout Central New York",
} as const;

/**
 * Canonical production origin (no www, no trailing slash). Drives canonical
 * URLs, Open Graph, sitemap.xml, robots.txt, and all JSON-LD schema URLs.
 * The www host 301-redirects here (see docs/SEO-SETUP.md).
 */
export const SITE_URL = company.url;

/**
 * Public profile URLs for schema.org sameAs and local citations.
 * {{TODO}} tokens are filtered out of the emitted schema until replaced
 * with real URLs (see docs/SEO-SETUP.md for creating these profiles).
 */
export const socialProfiles = [
  "{{TODO: Google Business Profile URL}}",
  "{{TODO: Facebook page URL}}",
  "{{TODO: LinkedIn company page URL}}",
];

/** Counties covered, used in schema areaServed alongside the city list. */
export const countiesServed = [
  "Onondaga County",
  "Oneida County",
  "Cayuga County",
  "Oswego County",
  "Cortland County",
];

/* --------------------------------------------------------------------- hero */

export const hero = {
  kicker: "Built right. Built to last.",
  headline: "Professional Drywall & Interior Construction in Central New York",
  subcopy:
    "Drywall installation, taping and finishing, repairs, and interior construction services for residential and commercial projects throughout the Syracuse region.",
  primaryCta: { label: "Request an Estimate", href: "/contact/?type=homeowner" },
  secondaryCta: {
    label: "Request a Subcontractor Bid",
    href: "/contact/?type=contractor",
  },
};

/* -------------------------------------------------------------- navigation */

export type NavLink = {
  href: string;
  label: string;
  /** Temporarily hidden from navigation and sitemap (page still exists). */
  hidden?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  // Hidden until real projects/certifications are ready to publish.
  // Remove `hidden: true` to bring them back.
  { href: "/projects/", label: "Projects", hidden: true },
  { href: "/about/", label: "About" },
  { href: "/certifications/", label: "Certifications", hidden: true },
  { href: "/contact/", label: "Contact" },
  { href: "/apply/", label: "Apply" },
];

/** Navigation links currently shown in the header, footer, and sitemap. */
export const visibleNavLinks: NavLink[] = navLinks.filter((link) => !link.hidden);

/* ------------------------------------------------------------------- flags */

export const flags = {
  /**
   * The 3 projects marked `sample: true` below are examples, not real work.
   * They render in development so the layout can be reviewed, but are hidden
   * in production builds until this flag is flipped to true (or the samples
   * are replaced with real projects).
   */
  showSampleProjectsInProduction: false,
} as const;

/* ---------------------------------------------------------------- services */

export type Service = {
  slug: string;
  title: string;
  /** Icon key understood by components/graphics/ServiceIcon.tsx */
  icon: "drywall-sheet" | "taping-knife" | "patch" | "commercial" | "renovation" | "paint-roller";
  /** One-liner for cards */
  short: string;
  /** SEO: full <title> ("keyword in Syracuse, NY | YIN Construction", <=64 chars) */
  metaTitle: string;
  /** SEO: meta description (<=155 chars) */
  metaDescription: string;
  /** 2–3 paragraphs of body copy for the Services page */
  paragraphs: string[];
  included: string[];
  idealFor: string[];
  /** Service-specific FAQs, shown on the detail page with FAQPage schema. */
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "drywall-installation",
    title: "Drywall Installation",
    icon: "drywall-sheet",
    short:
      "Precise board hanging for new builds, additions, and remodels: square, plumb, and ready for a flawless finish.",
    metaTitle: "Drywall Installation in Syracuse, NY | YIN Construction",
    metaDescription:
      "Professional drywall installation in Syracuse and Central New York: new builds, additions, and remodels, hung square and plumb. Free written estimates.",
    paragraphs: [
      "Good drywall starts long before the first sheet goes up. We check framing for straightness, plan board layout to minimize butt joints, and stage material so your space stays workable. The result is a substrate that finishes faster and looks better for the life of the building.",
      "We hang standard, moisture-resistant, mold-resistant, and fire-rated board, matching the right product to each room. Bathrooms, garages, party walls, and mechanical spaces all have different requirements. Ceilings, curves, and high walls are all in a day's work.",
      "Whether it's a single room or a whole house, we keep the jobsite clean, protect finished surfaces, and coordinate closely with your other trades so nothing holds up the schedule.",
    ],
    included: [
      "Board layout planning to minimize visible seams",
      "Standard, moisture/mold-resistant, and fire-rated board",
      "Ceilings, soffits, archways, and curved surfaces",
      "Screw-pattern and fastening to spec",
      "Jobsite protection and daily cleanup",
    ],
    idealFor: [
      "New home construction and additions",
      "Garage and basement board-outs",
      "Fire-rated assemblies and party walls",
    ],
    faqs: [
      {
        question: "How long does drywall installation take?",
        answer:
          "Hanging goes quickly: an average room is typically boarded in about a day, and a whole house takes days rather than weeks. Taping and finishing add drying time between coats, so your written estimate includes a schedule for the complete scope, not just the hang.",
      },
      {
        question: "What type of drywall should go in a bathroom or garage?",
        answer:
          "Moisture-resistant board belongs in bathrooms and laundry areas, and garages or walls shared with living space often require fire-rated board by code. We spec the right product room by room as part of the estimate, so you're never paying for upgrades you don't need or missing ones you do.",
      },
      {
        question: "Do you handle just hanging, or taping and finishing too?",
        answer:
          "Either. Most of our work is hang-and-finish under one crew, which is how you get the straightest walls. But we also take over finishing on board hung by others, and on larger builds we can hang for your own finisher.",
      },
      {
        question: "Can new drywall match the thicker walls in my older home?",
        answer:
          "Yes. Many older Central New York homes have plaster walls thicker than modern half-inch board. We shim the framing, use five-eighths board, or build out the surface so new drywall lands flush with the existing walls and trim.",
      },
      {
        question: "Do I need a permit to install drywall?",
        answer:
          "Drywall replacement alone rarely requires a permit, but the work behind it (new framing, electrical, or structural changes) often does. If your project involves new walls, we flag what should be confirmed with your local building department before work starts.",
      },
    ],
  },
  {
    slug: "taping-finishing",
    title: "Taping & Finishing (Levels 0–5)",
    icon: "taping-knife",
    short:
      "Smooth, consistent finishing to the industry-standard levels, from fire-tape to Level 5 skim coats for critical light.",
    metaTitle: "Drywall Taping & Finishing in Syracuse, NY | YIN Construction",
    metaDescription:
      "Drywall taping and finishing in Syracuse, NY to industry-standard Levels 0-5, including Level 5 skim coats for critical light. Dust-controlled sanding.",
    paragraphs: [
      "Finishing is where drywall work succeeds or fails. We tape and finish to the industry-standard levels (0 through 5), so you get exactly the surface your space needs, no more and no less, and you know precisely what you're paying for.",
      "Most living spaces call for a Level 4 finish, ready for flat or low-sheen paint. For walls washed in natural light, hallways with wall grazing fixtures, or anywhere gloss paint is planned, we recommend a Level 5 skim coat that eliminates photographing of joints and fasteners.",
      "We feather joints wide, sand with dust control, and check our work under raking light before we call it done.",
    ],
    included: [
      "Taping, bedding, and multiple finish coats",
      "Level 0–5 finishes matched to the room's lighting and paint",
      "Corner bead: square, bullnose, and specialty profiles",
      "Dust-controlled sanding",
      "Raking-light quality check before handoff",
    ],
    idealFor: [
      "New drywall ready for paint",
      "High-end finishes under critical lighting",
      "Skim-coating over dated texture",
    ],
    faqs: [
      {
        question: "What finish level does my project need?",
        answer:
          "Level 4 is the standard for most living spaces receiving flat or low-sheen paint. Go to Level 5 (a full skim coat) where walls get strong natural light, wall-grazing fixtures, or gloss paint, because those conditions make joints and fasteners \"photograph\" through lesser finishes. Garages and utility areas can often stop at fire-tape or Level 2.",
      },
      {
        question: "How long does taping and finishing take?",
        answer:
          "Longer than hanging, because each coat has to dry before the next. A typical room takes several visits across consecutive days: tape and bed, second coat, third coat, then sanding. Rushing drying times causes cracks and shrinkage, so we don't.",
      },
      {
        question: "Can you skim coat over old texture or plaster?",
        answer:
          "Yes. A Level 5 skim coat over sound textured walls or aged plaster is one of the most cost-effective ways to modernize a room. We check adhesion first, repair loose areas, and skim to a smooth paint-ready surface.",
      },
      {
        question: "How do you control sanding dust?",
        answer:
          "We sand with vacuum-assisted dust-control equipment, seal doorways, and protect floors and returns. There's no such thing as a dust-free drywall job, but containment is part of our standard scope, not an upsell.",
      },
      {
        question: "Why do drywall joints show through paint?",
        answer:
          "That's called joint banding or photographing: the paper, compound, and board absorb paint differently, and light exposes the difference. The fix is the right finish level for the lighting conditions plus a proper primer, which is exactly what we quote for each room.",
      },
    ],
  },
  {
    slug: "repair-patching",
    title: "Drywall Repair & Patching",
    icon: "patch",
    short:
      "Seamless repairs for holes, cracks, and water damage, with texture matching so the patch disappears.",
    metaTitle: "Drywall Repair in Syracuse, NY | YIN Construction",
    metaDescription:
      "Drywall repair and patching in Syracuse and Central New York: holes, cracks, water damage, and texture matching that makes the patch disappear.",
    paragraphs: [
      "From doorknob holes to ceiling water damage, we make drywall repairs that blend in completely. A proper repair isn't just filling a hole. It's cutting back to sound material, backing the patch correctly, and building the finish out wide enough that the wall reads as one surface.",
      "Water-damaged drywall needs special attention: we check for hidden moisture and replace compromised board rather than coating over a problem that will come back.",
      "We match existing textures (knockdown, orange peel, or smooth) and leave the surface paint-ready, so your painter (or our painting service) can make it disappear.",
    ],
    included: [
      "Hole, crack, and corner repairs",
      "Water-damage assessment and board replacement",
      "Texture matching (smooth, knockdown, orange peel)",
      "Paint-ready surface preparation",
    ],
    idealFor: [
      "Home sale punch lists",
      "Water or impact damage",
      "Settling cracks and nail pops",
    ],
    faqs: [
      {
        question: "Can a water-damaged ceiling be patched, or does it need replacement?",
        answer:
          "It depends on what the moisture did. Stained but sound board can often be sealed and refinished; sagging, soft, or moldy board gets cut back to clean material and replaced. We check moisture levels before patching so you're not painting over a problem that will return.",
      },
      {
        question: "Can you match my existing wall texture?",
        answer:
          "Yes: smooth, knockdown, and orange peel are all matchable. Texture matching is the difference between a repair you can find and one you can't, so we blend the new texture past the patch edges until the wall reads as one surface.",
      },
      {
        question: "Is a small hole worth a contractor visit?",
        answer:
          "Often several small repairs make one sensible visit: doorknob holes, settling cracks, nail pops, and corner dings across the house. Home-sale punch lists are a common version of this, where one trip makes every wall inspection-ready.",
      },
      {
        question: "Will I be able to see the patch after painting?",
        answer:
          "Not if the repair is done right. That means backing the patch properly, feathering compound well beyond the hole, matching texture, and priming the repair before paint so the sheen is uniform across the wall.",
      },
      {
        question: "Do you also paint the repaired area?",
        answer:
          "We leave every repair paint-ready, and through our painting service we can also prime and paint the wall so the repair disappears completely. Whole-wall repaints hide better than spot touch-ups on aged paint.",
      },
    ],
  },
  {
    slug: "commercial-interiors",
    title: "Commercial Interiors & Tenant Improvements",
    icon: "commercial",
    short:
      "Metal stud framing, drywall, and acoustical ceilings for offices, retail, and medical fit-outs, built to schedule.",
    metaTitle: "Commercial Drywall Contractor in Syracuse, NY | YIN Construction",
    metaDescription:
      "Commercial drywall contractor for Central New York: metal stud framing, drywall, and acoustical ceilings for tenant improvements and office fit-outs.",
    paragraphs: [
      "Commercial interiors run on schedules, and we build to them. We provide metal stud framing, drywall, and acoustical ceiling tile (ACT) systems for tenant improvements, office fit-outs, retail spaces, and light medical work across Central New York.",
      "Our crews are comfortable working from architectural drawings, coordinating with electrical, mechanical, and sprinkler trades, and phasing work in occupied buildings with minimal disruption to your tenants or staff.",
      "From layout to final ceiling tile, you get one accountable contractor for the interior shell: framing that's straight, assemblies that meet rating requirements, and ceilings that line up.",
    ],
    included: [
      "Metal stud framing and layout from drawings",
      "Drywall hang and finish for commercial assemblies",
      "Suspended acoustical ceiling (ACT) grid and tile",
      "Fire-rated and sound-rated assemblies",
      "Coordination with other trades and building management",
    ],
    idealFor: [
      "Tenant improvements and office fit-outs",
      "Retail and restaurant build-outs",
      "Property managers refreshing commercial space",
    ],
    faqs: [
      {
        question: "Do you bid from architectural drawings?",
        answer:
          "Yes. Send plan sets and specs and we'll return a written scope with inclusions and exclusions stated plainly, so bid leveling is easy. We're comfortable with partition types, rated assemblies, and reflected ceiling plans.",
      },
      {
        question: "Can you work in an occupied building?",
        answer:
          "Yes. We phase work, contain dust, and coordinate noisy tasks with building management so tenants and staff can keep operating. Night and weekend phasing can be built into the schedule where the project requires it.",
      },
      {
        question: "Do you build fire-rated and sound-rated assemblies?",
        answer:
          "Yes. We frame and board UL-rated partitions to the listed assembly, including staggered-stud and double-layer configurations, insulation placement, and proper sealing, and we document what was built for your close-out.",
      },
      {
        question: "Do you install acoustical (drop) ceilings?",
        answer:
          "Yes: suspended grid and tile is part of our standard commercial package, laid out from the reflected ceiling plan and coordinated with lighting, HVAC diffusers, and sprinklers.",
      },
      {
        question: "How do you keep interior work on the construction schedule?",
        answer:
          "Framing, board, finish, and ceilings are sequenced trades, and delays compound. We stage material ahead of mobilization, staff to the milestone dates in your schedule, and flag conflicts with other trades early rather than the week they bite.",
      },
    ],
  },
  {
    slug: "residential-renovations",
    title: "Residential Renovations & Basement Finishing",
    icon: "renovation",
    short:
      "Turn unfinished space into living space: framing, drywall, ceilings, and finish work under one roof.",
    metaTitle: "Basement Finishing in Syracuse, NY | YIN Construction",
    metaDescription:
      "Basement finishing and interior renovations in Syracuse, NY: framing, drywall, ceilings, and paint under one roof. Free written estimates.",
    paragraphs: [
      "A basement is the least expensive square footage you'll ever add to your home. It's already built; it just needs finishing. We handle the full interior package: framing, insulation coordination, drywall, ceilings, and final paint.",
      "Beyond basements, we take on interior renovations where walls move, ceilings change, or spaces open up: bedroom conversions, home offices, and layout changes that modernize older Central New York homes.",
      "We give you a clear written scope, protect the rest of your home with dust barriers, and clean up daily, because you still have to live there while we work.",
    ],
    included: [
      "Basement layout and framing",
      "Drywall, ceilings, and trim-ready finishing",
      "Egress and code-aware planning with your inspector",
      "Dust containment and daily cleanup",
      "Paint-through to a finished space",
    ],
    idealFor: [
      "Basement family rooms, offices, and gyms",
      "Room conversions and layout changes",
      "Finishing bonus rooms and attics",
    ],
    faqs: [
      {
        question: "How much does it cost to finish a basement?",
        answer:
          "It depends on size, ceiling choices, and how finished you want it, so we don't quote blind. What we do promise: a free site visit and a written line-item estimate, so you can see exactly where the money goes and trim scope to fit a budget.",
      },
      {
        question: "Do I need an egress window to finish my basement?",
        answer:
          "If the finished space includes a bedroom, code requires an egress path, usually an egress window or door. Family rooms and offices have different requirements. We plan the layout around what your local code official will look for, before drywall goes up.",
      },
      {
        question: "How long does basement finishing take?",
        answer:
          "Typically weeks, not days: framing, inspections, board, finishing with drying time, and paint each take their turn. Your written estimate includes a realistic project duration for the scope you choose.",
      },
      {
        question: "What about moisture in the basement?",
        answer:
          "Water wins against drywall every time, so moisture problems get solved before finishing starts. We look for signs of water during the site visit and will tell you plainly if waterproofing or drainage work should come first.",
      },
      {
        question: "Do you handle the whole basement project?",
        answer:
          "We take the interior from bare studs to painted walls: framing, drywall, ceilings, and finish work. Electrical and plumbing are performed by licensed trades, and we coordinate the schedule so inspections and cover-up happen in the right order.",
      },
    ],
  },
  {
    slug: "painting-finish",
    title: "Painting & Final Finish",
    icon: "paint-roller",
    short:
      "Prime and paint by the same crew that finished the walls. One contractor, one standard, zero finger-pointing.",
    metaTitle: "Painting & Finish Work in Syracuse, NY | YIN Construction",
    metaDescription:
      "Interior painting and final finish in Syracuse, NY by the crew that finished your drywall: priming, walls, ceilings, and trim with one quality standard.",
    paragraphs: [
      "The best time to paint a wall is right after the people who finished it sign off on it. We prime and paint the surfaces we install, so there's one standard of quality from bare stud to final coat, and no gap between trades where defects hide.",
      "We spec the right primer for fresh drywall, back-roll for uniform texture, and apply finish coats suited to each room: scrubbable finishes for hallways and kids' rooms, moisture-resistant paint in baths, and flat ceilings that hide everything.",
      "Walkthrough happens under the same raking light we use to check our finishing. If we can see it, we fix it before you ever do.",
    ],
    included: [
      "New-drywall priming and sealing",
      "Walls, ceilings, and trim",
      "Sheen and product selection per room",
      "Color consultation from your selections",
      "Final walkthrough under raking light",
    ],
    idealFor: [
      "Newly finished drywall",
      "Repaints after repairs",
      "Whole-space refreshes during renovations",
    ],
    faqs: [
      {
        question: "Why does new drywall need primer before paint?",
        answer:
          "Bare compound and paper absorb paint at different rates, which shows as flashing and banding under light. A dedicated new-drywall primer equalizes the surface so finish coats lay down uniformly. Skipping it is the most common reason new walls look blotchy.",
      },
      {
        question: "What paint sheen should I use in each room?",
        answer:
          "As a rule: flat on ceilings, matte or eggshell in living spaces, and a scrubbable satin or semi-gloss in kitchens, baths, and high-traffic hallways. Higher sheen shows more surface imperfection, which is why sheen and finish level get chosen together.",
      },
      {
        question: "Do you paint rooms you didn't drywall?",
        answer:
          "Our painting service exists to finish our own drywall work to one standard, and that's where it shines. For repaint-only projects, ask: if the scope fits our schedule we'll quote it honestly or tell you it's a better fit for a dedicated painter.",
      },
      {
        question: "How soon after finishing can walls be painted?",
        answer:
          "Once the final coat of compound is fully dry, sanded, and dusted off, priming can start, usually the next working day. Humidity slows drying, so basements and new construction sometimes need longer.",
      },
      {
        question: "Do you help choose colors?",
        answer:
          "We'll give practical input on your selections (how a sheen behaves on your walls, where an accent wall will or won't work) but color choices stay yours. Bring us swatches and we'll tell you what they'll look like under your lighting.",
      },
    ],
  },
];

/**
 * Drywall finish levels (industry-standard GA-214 levels), shown as a
 * diagram in the Taping & Finishing section of the Services page.
 */
export type FinishLevelInfo = { level: number; name: string; blurb: string };

export const finishLevels: FinishLevelInfo[] = [
  {
    level: 0,
    name: "No finish",
    blurb: "Board hung only, for temporary construction or undecided surfaces.",
  },
  {
    level: 1,
    name: "Fire tape",
    blurb: "Tape set in compound. Concealed areas like plenums and attics.",
  },
  {
    level: 2,
    name: "One coat",
    blurb: "Tape plus one coat over joints and fasteners. Garages, storage.",
  },
  {
    level: 3,
    name: "Two coats",
    blurb: "For heavy textures or commercial walls getting thick wallcovering.",
  },
  {
    level: 4,
    name: "Three coats",
    blurb: "The standard for living spaces, ready for flat or low-sheen paint.",
  },
  {
    level: 5,
    name: "Skim coat",
    blurb: "Full skim for gloss paint and critical natural or raking light.",
  },
];

/* ---------------------------------------------------------------- pathways */

export type Pathway = {
  slug: string;
  /** Short label for cards and links */
  label: string;
  title: string;
  intro: string;
  /** Slugs into `services` - only services actually offered to this audience */
  serviceSlugs: string[];
  /** What this audience can expect - verifiable process claims only */
  expectations: string[];
  cta: { label: string; href: string };
};

export const pathways: Pathway[] = [
  {
    slug: "homeowners",
    label: "Homeowners",
    title: "Drywall & Interior Work for Your Home",
    intro:
      "From a single wall repair to a fully finished basement, we handle residential drywall and interior projects across the Syracuse region, with free written estimates, dust control, and daily cleanup, because you still live there while we work.",
    serviceSlugs: [
      "drywall-installation",
      "repair-patching",
      "residential-renovations",
      "painting-finish",
    ],
    expectations: [
      "Free written estimate after a short site visit",
      "Dust containment and broom-clean jobsites every night",
      "One point of contact from estimate to walkthrough",
      "Clear schedule before work begins",
    ],
    cta: { label: "Request an Estimate", href: "/contact/?type=homeowner" },
  },
  {
    slug: "general-contractors",
    label: "General Contractors & Commercial",
    title: "A Drywall Sub That Protects Your Schedule",
    intro:
      "We provide drywall installation, taping and finishing, metal stud framing, and acoustical ceilings for general contractors, property managers, and commercial clients in Central New York. Bid from your drawings, built to your schedule.",
    serviceSlugs: [
      "drywall-installation",
      "taping-finishing",
      "commercial-interiors",
    ],
    expectations: [
      "Bids from architectural drawings with clear scope and exclusions",
      "Coordination with other trades and building management",
      "Fire-rated and sound-rated assemblies built to spec",
      "Certificate of insurance available on request",
    ],
    cta: {
      label: "Request a Subcontractor Bid",
      href: "/contact/?type=contractor",
    },
  },
];

/* ------------------------------------------------------------ trust & stats */

export type TrustItem = { label: string; note?: string };

export const trustStrip: TrustItem[] = [
  // When license/registration details are available, add them back as:
  // note: "NYS registration #..." (or similar)
  { label: "Licensed & Insured" },
  { label: "Free Estimates" },
  { label: "Serving Central NY" },
  { label: "Residential & Commercial" },
];

export type Stat = {
  label: string;
  /**
   * Set to a real number to enable the animated counter.
   * While null, the {{TODO}} token is displayed instead.
   */
  value: number | null;
  token: string;
  suffix?: string;
};

export const stats: Stat[] = [
  {
    label: "Years in business",
    value: null,
    token: "{{TODO: years in business}}",
    suffix: "+",
  },
  {
    label: "Projects completed",
    value: null,
    token: "{{TODO: projects completed}}",
    suffix: "+",
  },
  {
    label: "Sq ft of drywall finished",
    value: null,
    token: "{{TODO: total sq ft finished}}",
    suffix: "+",
  },
  {
    label: "Mile service radius",
    value: null,
    token: "{{TODO: service radius in miles}}",
  },
];

/* ------------------------------------------------------------ service areas */

export type ServiceArea = {
  name: string;
  /** Position (0–100) on the stylized Central NY map in ServiceAreaMap.tsx */
  mapX: number;
  mapY: number;
  /** The hub gets the radius ring */
  hub?: boolean;
  /** Slug of the matching /service-areas/ city page */
  citySlug: string;
};

export const serviceAreas: ServiceArea[] = [
  { name: "Syracuse", mapX: 44, mapY: 54, hub: true, citySlug: "syracuse-ny" },
  { name: "Oswego", mapX: 34, mapY: 16, citySlug: "oswego-fulton-ny" },
  { name: "Fulton", mapX: 39, mapY: 28, citySlug: "oswego-fulton-ny" },
  { name: "Rome", mapX: 76, mapY: 30, citySlug: "rome-ny" },
  { name: "Utica", mapX: 86, mapY: 44, citySlug: "utica-ny" },
  { name: "Auburn", mapX: 22, mapY: 62, citySlug: "auburn-ny" },
  { name: "Cortland", mapX: 52, mapY: 86, citySlug: "cortland-ny" },
];

/* --------------------------------------------------------- city area pages */

export type CityPage = {
  slug: string;
  city: string;
  /** H1: primary keyword + location */
  headline: string;
  /** Full <title> (bypasses the template) */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Distinct local copy - geography and housing-stock context only, no
   *  invented past-project claims. */
  paragraphs: string[];
  /** Nearby towns, villages, and neighborhoods we also serve (public geography). */
  nearby: string[];
  /** Most relevant services with descriptive local anchor text. */
  featuredServices: { slug: string; label: string }[];
  schedulingNote: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "syracuse-ny",
    city: "Syracuse",
    headline: "Drywall Contractor in Syracuse, NY",
    metaTitle: "Drywall Contractor in Syracuse, NY | YIN Construction",
    metaDescription:
      "Syracuse drywall contractor for installation, taping & finishing, repairs, basement finishing, and commercial interiors. Free written estimates.",
    intro:
      "Syracuse is our home base. From city neighborhoods to the surrounding Onondaga County suburbs, this is where our crews spend most of their working days.",
    paragraphs: [
      "The Syracuse area mixes every kind of interior work we do: older city homes on tree streets in Eastwood, Strathmore, and the Valley with original plaster walls; post-war suburbs in Liverpool, North Syracuse, and Camillus; and newer builds in Clay, Cicero, and Baldwinsville. Plaster-era homes often benefit most from skim coats or plaster-to-drywall conversions, while newer homes tend to call for basement finishing and repair work.",
      "Commercial and tenant-improvement work concentrates downtown, along Erie Boulevard, and in the office and retail corridors of DeWitt and Salina, where we provide metal stud framing, drywall, and acoustical ceilings on a schedule your lease deadline can live with.",
      "Snow country is hard on ceilings. Ice dams and roof leaks leave stained, sagging drywall behind, and repairing that properly (moisture checked, compromised board replaced, texture matched) is some of the most common work in any Central New York winter.",
    ],
    nearby: [
      "Liverpool",
      "Clay",
      "Cicero",
      "North Syracuse",
      "Baldwinsville",
      "Camillus",
      "Fayetteville",
      "Manlius",
      "DeWitt",
      "Onondaga",
    ],
    featuredServices: [
      { slug: "repair-patching", label: "Drywall repair in Syracuse" },
      { slug: "residential-renovations", label: "Basement finishing in Syracuse" },
      { slug: "commercial-interiors", label: "Commercial drywall for Syracuse tenant improvements" },
      { slug: "taping-finishing", label: "Taping and finishing for Syracuse homes" },
    ],
    schedulingNote:
      "As our home base, Syracuse and its suburbs get our most flexible scheduling: site visits fit around your day, and small repairs are easy to slot between larger projects.",
  },
  {
    slug: "utica-ny",
    city: "Utica",
    headline: "Drywall & Interior Contractor in Utica, NY",
    metaTitle: "Drywall Contractor in Utica, NY | YIN Construction",
    metaDescription:
      "Drywall installation, repair, and interior renovations in Utica and the Mohawk Valley: New Hartford, Whitesboro, Clinton. Free written estimates.",
    intro:
      "Utica anchors the eastern edge of our service area, and the Mohawk Valley's housing stock is unlike anywhere else we work.",
    paragraphs: [
      "Utica's neighborhoods are full of two- and three-family homes built generations ago, and that age shows up in the walls: cracked plaster, layers of old repairs, and framing that isn't flat. We're comfortable working with it, whether that means skim-coating sound plaster back to smooth, converting rooms to drywall during renovations, or furring walls flat before new board goes up.",
      "In New Hartford, Whitesboro, and Clinton, the work shifts toward suburban renovation: basement finishing, room conversions, and repair-and-repaint projects that bring a dated interior up to modern smooth-wall finishes.",
      "For landlords and property managers, interior turnover work (patching, skim coats, and durable repaint-ready finishes between tenants) is a natural fit for the same crew doing full renovations nearby.",
    ],
    nearby: [
      "New Hartford",
      "Whitesboro",
      "Yorkville",
      "Clinton",
      "Marcy",
      "Oriskany",
      "Frankfort",
    ],
    featuredServices: [
      { slug: "taping-finishing", label: "Skim coats and plaster-smooth finishing in Utica" },
      { slug: "residential-renovations", label: "Interior renovations in Utica and New Hartford" },
      { slug: "repair-patching", label: "Drywall and ceiling repair in the Mohawk Valley" },
    ],
    schedulingNote:
      "Utica is about an hour east of Syracuse, so we plan work there in efficient blocks. Bundling several small repairs into one visit gets you the best value at this edge of our service area.",
  },
  {
    slug: "auburn-ny",
    city: "Auburn",
    headline: "Drywall Contractor in Auburn, NY",
    metaTitle: "Drywall Contractor in Auburn, NY | YIN Construction",
    metaDescription:
      "Drywall installation, plaster repair, and renovations in Auburn, Skaneateles, and the Finger Lakes area. Free written estimates.",
    intro:
      "Auburn and the surrounding Finger Lakes towns bring us some of the most interesting older homes in Central New York.",
    paragraphs: [
      "Auburn's historic districts are lined with 19th-century homes where plaster walls, high ceilings, and original trim deserve a careful hand. We repair and skim-coat plaster where it's sound, replace it with drywall where it isn't, and keep new surfaces flush with the original woodwork either way.",
      "Around Owasco and Skaneateles lakes, renovation work follows the seasons: finishing lower levels, converting porches to year-round rooms, and refreshing interiors between summers. Lake-adjacent properties also see more than their share of moisture-related ceiling and wall repairs.",
      "Closer to the village centers of Weedsport, Union Springs, and Moravia, the mix is familiar: repairs, basement finishing, and repaint-ready surfaces for homes heading to market.",
    ],
    nearby: [
      "Skaneateles",
      "Weedsport",
      "Union Springs",
      "Owasco",
      "Moravia",
      "Port Byron",
      "Cayuga",
    ],
    featuredServices: [
      { slug: "repair-patching", label: "Plaster and drywall repair in Auburn" },
      { slug: "taping-finishing", label: "Level 5 finishes for Finger Lakes homes" },
      { slug: "residential-renovations", label: "Renovations in Auburn and Skaneateles" },
    ],
    schedulingNote:
      "Auburn sits an easy half hour west of Syracuse, so estimates and projects schedule much like our home-base work. Lake-area projects book heaviest between fall and spring.",
  },
  {
    slug: "rome-ny",
    city: "Rome",
    headline: "Drywall & Commercial Interior Contractor in Rome, NY",
    metaTitle: "Drywall Contractor in Rome, NY | YIN Construction",
    metaDescription:
      "Drywall, metal stud framing, and interior work in Rome, NY, from home repairs to commercial fit-outs near Griffiss. Free written estimates.",
    intro:
      "Rome combines classic Central New York neighborhoods with one of the region's most active commercial redevelopment stories.",
    paragraphs: [
      "Rome's residential streets are largely post-war: homes with original plaster or early drywall that's ready for repairs, skim coats, and modernizing renovations. Basement finishing is a popular way to add space without an addition, and we take those projects from framing through paint.",
      "On the commercial side, the Griffiss Business and Technology Park area and Rome's downtown corridor generate steady tenant-improvement work: metal stud framing, drywall, and acoustical ceilings built from drawings and coordinated with the other trades on site.",
      "Between Rome and Oneida, village homes in Verona, Westmoreland, and Lee Center fit the same pattern we see across the region: bundled repairs, one-room renovations, and finish upgrades ahead of a sale.",
    ],
    nearby: [
      "Lee Center",
      "Westernville",
      "Verona",
      "Westmoreland",
      "Oneida",
      "Camden",
    ],
    featuredServices: [
      { slug: "commercial-interiors", label: "Commercial interiors near Griffiss in Rome" },
      { slug: "residential-renovations", label: "Basement finishing in Rome" },
      { slug: "repair-patching", label: "Drywall repair in Rome and Oneida" },
    ],
    schedulingNote:
      "Rome is under an hour from our Syracuse base. Commercial projects run on their own schedules; for residential work, grouping repairs into a single visit keeps costs down.",
  },
  {
    slug: "cortland-ny",
    city: "Cortland",
    headline: "Drywall Contractor in Cortland, NY",
    metaTitle: "Drywall Contractor in Cortland, NY | YIN Construction",
    metaDescription:
      "Drywall installation, repair, and rental turnover work in Cortland, Homer, and Tully. Durable finishes for homes and student rentals.",
    intro:
      "Cortland marks the southern end of our service area, where village homes, farmhouses, and a college rental market each ask for something different.",
    paragraphs: [
      "The older homes of Cortland and Homer villages carry the same plaster-era construction we work with across Central New York: walls worth skim-coating smooth, ceilings that need honest repair after winter, and trim lines that new drywall has to respect.",
      "With SUNY Cortland in town, rental housing is a big part of the local market. Turnover work rewards durability: properly backed patches, scrubbable finish levels, and repairs done right once instead of patched every lease cycle. That's work we build around a landlord's calendar, not ours.",
      "North toward Tully and Preble, newer homes bring basement finishing and bonus-room projects, and the half-hour run up Route 81 makes scheduling simple.",
    ],
    nearby: ["Homer", "McGraw", "Tully", "Preble", "Marathon", "Dryden"],
    featuredServices: [
      { slug: "repair-patching", label: "Rental turnover drywall repair in Cortland" },
      { slug: "taping-finishing", label: "Durable finishes for Cortland rentals" },
      { slug: "residential-renovations", label: "Basement finishing in Cortland and Tully" },
    ],
    schedulingNote:
      "Cortland is roughly 35 minutes south of Syracuse on Route 81. Landlord and property-manager work can be scheduled around tenant turnover dates; just tell us your lease calendar.",
  },
  {
    slug: "oswego-fulton-ny",
    city: "Oswego & Fulton",
    headline: "Drywall Contractor in Oswego & Fulton, NY",
    metaTitle: "Drywall Contractor in Oswego & Fulton, NY | YIN Construction",
    metaDescription:
      "Drywall repair, installation, and renovations in Oswego and Fulton, NY. Snow-country ceiling repairs and lakeside renovation work.",
    intro:
      "Oswego County is true snow country, and the lake-effect winters off Lake Ontario shape the interior work its homes need.",
    paragraphs: [
      "No part of our service area is harder on ceilings than the Oswego snow belt. Ice dams, wind-driven leaks, and freeze-thaw cycles leave water-stained and sagging drywall behind every winter. Done right, those repairs start with a moisture check and end with texture matching that makes the damage disappear, not a coat of stain-blocker over a problem.",
      "In the city of Oswego, the housing mix runs from historic homes near the river to rentals serving SUNY Oswego, where durable, repairable finishes matter more than delicate ones. Fulton's neighborhoods, and the villages of Phoenix, Mexico, and Central Square along the Route 481/81 corridors, bring steady repair, renovation, and basement-finishing work.",
      "Lakeside and riverside properties also see seasonal conversion projects: three-season rooms and porches brought up to insulated, drywalled, year-round comfort.",
    ],
    nearby: [
      "Minetto",
      "Scriba",
      "Hannibal",
      "Phoenix",
      "Mexico",
      "Central Square",
      "Volney",
    ],
    featuredServices: [
      { slug: "repair-patching", label: "Ceiling and water-damage repair in Oswego County" },
      { slug: "residential-renovations", label: "Renovations and conversions in Oswego and Fulton" },
      { slug: "drywall-installation", label: "Drywall installation in Oswego and Fulton" },
    ],
    schedulingNote:
      "Oswego and Fulton are 30-45 minutes north of Syracuse. Winter ceiling repairs are in highest demand after each thaw, so getting on the schedule early beats waiting for the drip to spread.",
  },
];

/* ------------------------------------------------------------------- values */

export type Value = {
  title: string;
  icon: "quality" | "communication" | "safety" | "local";
  description: string;
};

export const values: Value[] = [
  {
    title: "Quality Craftsmanship",
    icon: "quality",
    description:
      "We check every finish under raking light before we consider it done, because that's how your eye will see it.",
  },
  {
    title: "Clear Communication",
    icon: "communication",
    description:
      "You get a written estimate, a named point of contact, and updates at the end of every work day.",
  },
  {
    title: "Safety First",
    icon: "safety",
    description:
      "Clean, organized jobsites with dust containment, posted safety practices, and tools put away every night.",
  },
  {
    title: "Local Commitment",
    icon: "local",
    description:
      "We live and work in Central New York, and our reputation here is the only marketing we can't replace.",
  },
];

/* ------------------------------------------------------------------ process */

export type ProcessStep = { title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    title: "Free consultation & site visit",
    description: "We walk the space with you, measure, and listen to what you want.",
  },
  {
    title: "Detailed written estimate",
    description: "A clear scope with line items. No vague allowances or surprises.",
  },
  {
    title: "Scheduling & material planning",
    description: "Firm start date, material staged, and other trades coordinated.",
  },
  {
    title: "Build with daily cleanup & clear updates",
    description: "Dust contained, site broom-clean nightly, progress reported daily.",
  },
  {
    title: "Walkthrough & punch list",
    description: "We inspect together under raking light and list anything to correct.",
  },
  {
    // When warranty terms are available, retitle to "Final sign-off & warranty"
    // and append: "Work is backed by our warranty: ..."
    title: "Final sign-off",
    description: "You sign off when it's right.",
  },
];

/* ----------------------------------------------------------------- projects */

export type ProjectCategory = "Residential" | "Commercial" | "Renovation";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  scope: string[];
  sqft: string;
  duration: string;
  /** Year the project was completed */
  completionYear?: string;
  /** Optional photo slot - add a file under public/images/projects/ and reference it here. */
  photo?: { src: string; alt: string };
  /** Sample entries are examples, not real work. See flags.showSampleProjectsInProduction. */
  sample: boolean;
};

export const projects: Project[] = [
  {
    slug: "sample-basement-finish",
    title: "SAMPLE: Basement Finishing",
    category: "Residential",
    location: "Syracuse, NY",
    scope: [
      "Framing and insulation coordination",
      "Drywall hang with Level 4 finish",
      "Painted ceilings and walls",
    ],
    sqft: "{{TODO: square footage}}",
    duration: "{{TODO: project duration}}",
    completionYear: "{{TODO: year}}",
    sample: true,
  },
  {
    slug: "sample-office-fitout",
    title: "SAMPLE: Office Tenant Improvement",
    category: "Commercial",
    location: "Utica, NY",
    scope: [
      "Metal stud framing from architectural drawings",
      "Fire-rated drywall assemblies",
      "Suspended acoustical ceiling grid and tile",
    ],
    sqft: "{{TODO: square footage}}",
    duration: "{{TODO: project duration}}",
    completionYear: "{{TODO: year}}",
    sample: true,
  },
  {
    slug: "sample-whole-home-refinish",
    title: "SAMPLE: Whole-Home Wall Refinish",
    category: "Renovation",
    location: "Auburn, NY",
    scope: [
      "Skim coat over dated texture to Level 5",
      "Crack and water-damage repairs",
      "Prime and repaint throughout",
    ],
    sqft: "{{TODO: square footage}}",
    duration: "{{TODO: project duration}}",
    completionYear: "{{TODO: year}}",
    sample: true,
  },
];

/**
 * Shown on the Projects page (and the homepage) while no verified projects
 * are published - an honest capabilities statement instead of an empty
 * gallery or invented work.
 */
export const projectsCapabilities = {
  heading: "Our portfolio is being built. Our capabilities aren't.",
  paragraphs: [
    "YIN Construction is actively taking on drywall and interior construction projects across Central New York. As completed projects are documented (with client permission), they'll be published here.",
    "In the meantime, here's the kind of work we're equipped to take on today:",
  ],
  capabilities: [
    "Residential drywall installation, repair, and finishing",
    "Basement finishing and interior renovations",
    "Commercial tenant improvements with metal stud framing",
    "Acoustical ceiling (ACT) systems",
    "Level 0–5 taping and finishing, including Level 5 skim coats",
    "Priming and painting of finished surfaces",
  ],
};

/** Projects visible in the current environment (hides samples in production). */
export function visibleProjects(): Project[] {
  const showSamples =
    process.env.NODE_ENV !== "production" ||
    flags.showSampleProjectsInProduction;
  return projects.filter((p) => !p.sample || showSamples);
}

/* ------------------------------------------------------------- testimonials */

export type Testimonial = {
  quote: string;
  author: string;
  location?: string;
};

/**
 * Intentionally empty - no fake reviews. The Testimonials section renders
 * only when real, permissioned quotes are added here.
 */
export const testimonials: Testimonial[] = [];

/* -------------------------------------------------------------------- about */

export const about = {
  intro:
    "YIN Construction is a drywall and interior construction contractor based in Central New York, serving homeowners, builders, and businesses across the Syracuse area.",
  story: [
    // Founding paragraph hidden until real details are available. Restore as:
    // "YIN Construction was founded in {{TODO: founding year}} by {{TODO: founder name and background}}. {{TODO: 2-3 sentences about how the company started and what it focused on early on}}.",
    "Today we focus on what we do best: drywall installation and finishing, commercial interiors, and the renovations that turn unused space into favorite rooms. We keep our crews small and accountable, and the person who estimates your project is the one who answers for it.",
  ],
  mission:
    "Deliver straight walls, flawless finishes, and honest schedules, and leave every jobsite cleaner than we found it.",
  safety: {
    heading: "Our commitment to safety",
    paragraphs: [
      "A safe jobsite is a productive one. Our crews follow OSHA-aligned practices for ladder and scaffold use, material handling, and silica dust control during sanding and cutting.",
      // When the Certifications page returns, append: "- details on our Certifications page."
      "Team training: {{TODO: OSHA 10/30 cards held by team members}}. We carry general liability and workers' compensation coverage.",
    ],
  },
  localRoots:
    "We're based in Central New York and build here year-round, in the same neighborhoods, villages, and commercial corridors where our families live. When you call us, you're calling a local business that plans to be here for the long haul.",
};

export type TeamMember = {
  /** {{TODO}} tokens until real team info is supplied - no invented names. */
  name: string;
  role: string;
  /** Short string rendered in the SVG monogram avatar */
  initials: string;
};

// The "Our Team" section on the About page is hidden while this array is
// empty. Add real members to bring it back, e.g.:
// { name: "Jane Doe", role: "Project Manager", initials: "JD" },
export const teamMembers: TeamMember[] = [];

/* ----------------------------------------------------------- certifications */

export type Certification = {
  title: string;
  badge: "document" | "shield" | "hardhat" | "ribbon";
  description: string;
};

export const certifications: Certification[] = [
  {
    title: "Contractor Licensing & Registration",
    badge: "document",
    description:
      "{{TODO: municipal/county contractor licenses or registrations held; New York State licenses contractors at the local level, so list each city/county registration and number}}",
  },
  {
    title: "General Liability Insurance",
    badge: "shield",
    description:
      "{{TODO: general liability carrier and coverage amount}}",
  },
  {
    title: "Workers' Compensation",
    badge: "shield",
    description:
      "{{TODO: workers' compensation carrier and policy details}}",
  },
  {
    title: "OSHA Safety Training",
    badge: "hardhat",
    description:
      "{{TODO: OSHA 10/30 training cards held by team members}}",
  },
  {
    title: "NYS Business Certifications",
    badge: "ribbon",
    description:
      "{{TODO: MWBE/DBE or other New York State certifications, if applicable; remove this card if none}}",
  },
];

export const certificationsNote =
  "Certificate of insurance available on request.";

/* --------------------------------------------------------------------- FAQs */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How much does an estimate cost?",
    answer:
      "Nothing. We provide free written estimates, usually after a short site visit so we can measure and see the existing conditions. You'll get a clear scope with line items, not a single vague number.",
  },
  {
    question: "How long will my project take?",
    answer:
      "It depends on scope: a typical room repair takes days, a basement finish takes weeks, and commercial fit-outs are scheduled to your lease timeline. Current lead time for new projects is {{TODO: current lead time}}. Your written estimate includes a project duration.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      // When the Certifications page returns, append: "Details are on our Certifications page."
      "Yes. {{TODO: license/registration summary}}. We carry general liability and workers' compensation coverage, and a certificate of insurance is available on request.",
  },
  {
    question: "Do you do both residential and commercial work?",
    answer:
      "Yes. We work in homes (repairs, renovations, and basement finishing) and in commercial spaces, where we provide metal stud framing, drywall, and acoustical ceilings for tenant improvements and fit-outs.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes. Our workmanship is covered by a warranty: {{TODO: warranty length and terms}}. If a seam cracks or a fastener pops within the warranty period due to our workmanship, we come back and make it right.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "{{TODO: payment terms: deposit amount, progress payments, accepted payment methods}}. Terms are stated plainly on every written estimate before any work begins.",
  },
];

/* ------------------------------------------------------------ contact form */

export const customerTypes = [
  "Homeowner",
  "General Contractor",
  "Commercial Client",
] as const;

export type CustomerType = (typeof customerTypes)[number];

/* --------------------------------------------------------------- apply page */

export const applyPage = {
  /** "We're Hiring" band on the homepage, linking to /apply/. */
  hiringBanner: {
    heading: "We're Hiring",
    body: "Drywall hangers, tapers, painters, and helpers willing to learn: we want to hear from you.",
    cta: { label: "Apply Now", href: "/apply/" },
  },
  title: "Work With Us",
  intro:
    "We're a small, accountable crew doing drywall and interior construction across Central New York, and we're always interested in hearing from skilled tradespeople who take pride in their finish work.",
  formHeading: "Apply Now",
  formIntro:
    "Tell us about yourself and your experience. We'll follow up by phone or email to talk about current and upcoming work.",
  // EDIT: adjust this list to the roles you actually hire for.
  positions: [
    "Drywall Hanger",
    "Taper / Finisher",
    "Painter",
    "Laborer / Helper",
    "Other / General Application",
  ],
  experienceLevels: [
    "No experience - willing to learn",
    "1-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years",
  ],
  // Shown in the sidebar. EDIT: replace with real hiring details
  // (pay range, benefits, schedule) when you're ready - nothing is
  // promised here that isn't true.
  whatToExpect: [
    "We review every application and respond to each one.",
    "A short phone call first, then an in-person meet-up on a jobsite or over coffee.",
    "Bring proof of any OSHA cards or trade training you have. Helpful, not required.",
  ],
};

/* ---------------------------------------------------------------------- SEO */

export const seo = {
  /** Home page + default <title>: primary keyword + location + brand. */
  defaultTitle: "Drywall & Interior Contractor in Syracuse, NY | YIN Construction",
  /** Home page + default meta description (<=155 chars). */
  defaultDescription:
    "Drywall installation, taping & finishing, repairs, commercial interiors, and basement finishing across Syracuse and Central New York. Free estimates.",
};
