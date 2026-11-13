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
  serviceAreaStatement:
    "Serving Syracuse and communities throughout Central New York",
} as const;

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
  /** One-liner for cards and meta descriptions */
  short: string;
  /** 2–3 paragraphs of body copy for the Services page */
  paragraphs: string[];
  included: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    slug: "drywall-installation",
    title: "Drywall Installation",
    icon: "drywall-sheet",
    short:
      "Precise board hanging for new builds, additions, and remodels: square, plumb, and ready for a flawless finish.",
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
  },
  {
    slug: "taping-finishing",
    title: "Taping & Finishing (Levels 0–5)",
    icon: "taping-knife",
    short:
      "Smooth, consistent finishing to the industry-standard levels, from fire-tape to Level 5 skim coats for critical light.",
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
  },
  {
    slug: "repair-patching",
    title: "Drywall Repair & Patching",
    icon: "patch",
    short:
      "Seamless repairs for holes, cracks, and water damage, with texture matching so the patch disappears.",
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
  },
  {
    slug: "commercial-interiors",
    title: "Commercial Interiors & Tenant Improvements",
    icon: "commercial",
    short:
      "Metal stud framing, drywall, and acoustical ceilings for offices, retail, and medical fit-outs, built to schedule.",
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
  },
  {
    slug: "residential-renovations",
    title: "Residential Renovations & Basement Finishing",
    icon: "renovation",
    short:
      "Turn unfinished space into living space: framing, drywall, ceilings, and finish work under one roof.",
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
  },
  {
    slug: "painting-finish",
    title: "Painting & Final Finish",
    icon: "paint-roller",
    short:
      "Prime and paint by the same crew that finished the walls. One contractor, one standard, zero finger-pointing.",
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
};

export const serviceAreas: ServiceArea[] = [
  { name: "Syracuse", mapX: 44, mapY: 54, hub: true },
  { name: "Oswego", mapX: 34, mapY: 16 },
  { name: "Fulton", mapX: 39, mapY: 28 },
  { name: "Rome", mapX: 76, mapY: 30 },
  { name: "Utica", mapX: 86, mapY: 44 },
  { name: "Auburn", mapX: 22, mapY: 62 },
  { name: "Cortland", mapX: 52, mapY: 86 },
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
  defaultTitle: `${company.name} | ${company.tagline}`,
  defaultDescription: `${company.name} provides ${services
    .map((s) => s.title.toLowerCase().split(" (")[0])
    .slice(0, 4)
    .join(", ")}, and more across Central New York. Free estimates.`,
};
