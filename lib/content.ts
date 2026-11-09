/**
 * ============================================================================
 * SITE CONTENT — ALL CONTENT IN THIS FILE IS PLACEHOLDER CONTENT.
 *
 * Replace every value marked [PLACEHOLDER] with real information before
 * launch. Nothing in this file describes a real company, project,
 * certification, license, or client. Do not publish until replaced.
 * ============================================================================
 */

export const siteConfig = {
  /** [PLACEHOLDER] Replace with your company's legal / trade name. */
  name: "Your Company Name Construction",
  /** [PLACEHOLDER] Short tagline shown in the hero and metadata. */
  tagline: "Quality construction services for Central New York",
  /** [PLACEHOLDER] Replace with your production domain before launch. */
  url: "https://www.example.com",
  /** [PLACEHOLDER] Replace with your business phone number. */
  phone: "(315) 555-0100",
  /** [PLACEHOLDER] Replace with your business email. */
  email: "info@example.com",
  /** [PLACEHOLDER] Replace with your business address. */
  address: {
    street: "123 Main Street",
    city: "Syracuse",
    state: "NY",
    zip: "13202",
  },
  /** [PLACEHOLDER] Replace with your actual service area description. */
  serviceArea:
    "Serving Syracuse, Utica, and communities throughout Central New York",
  /** [PLACEHOLDER] Replace with real business hours. */
  hours: "Monday – Friday, 7:00 AM – 5:00 PM",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/certifications/", label: "Certifications" },
  { href: "/contact/", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
};

/**
 * [PLACEHOLDER] Example service categories common to general contractors.
 * Edit, remove, or add services to match what your company actually offers.
 */
export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    summary:
      "[PLACEHOLDER] New home builds, additions, and major renovations tailored to your family's needs.",
    details: [
      "[PLACEHOLDER] Custom home construction",
      "[PLACEHOLDER] Home additions and extensions",
      "[PLACEHOLDER] Kitchen and bathroom remodeling",
      "[PLACEHOLDER] Basement finishing",
    ],
    image: "/images/service-residential.svg",
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    summary:
      "[PLACEHOLDER] Ground-up commercial builds and tenant improvements delivered on schedule.",
    details: [
      "[PLACEHOLDER] Office and retail build-outs",
      "[PLACEHOLDER] Light industrial facilities",
      "[PLACEHOLDER] Tenant improvements",
      "[PLACEHOLDER] ADA compliance upgrades",
    ],
    image: "/images/service-commercial.svg",
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    summary:
      "[PLACEHOLDER] Transform existing spaces with thoughtful design and quality craftsmanship.",
    details: [
      "[PLACEHOLDER] Whole-home renovations",
      "[PLACEHOLDER] Historic building restoration",
      "[PLACEHOLDER] Interior reconfiguration",
      "[PLACEHOLDER] Energy-efficiency upgrades",
    ],
    image: "/images/service-renovation.svg",
  },
  {
    slug: "roofing-exteriors",
    title: "Roofing & Exteriors",
    summary:
      "[PLACEHOLDER] Durable roofing, siding, and exterior work built for Central New York winters.",
    details: [
      "[PLACEHOLDER] Roof replacement and repair",
      "[PLACEHOLDER] Siding installation",
      "[PLACEHOLDER] Windows and doors",
      "[PLACEHOLDER] Gutters and drainage",
    ],
    image: "/images/service-roofing.svg",
  },
  {
    slug: "concrete-masonry",
    title: "Concrete & Masonry",
    summary:
      "[PLACEHOLDER] Foundations, flatwork, and masonry built to last through freeze-thaw cycles.",
    details: [
      "[PLACEHOLDER] Foundations and footings",
      "[PLACEHOLDER] Driveways, patios, and walkways",
      "[PLACEHOLDER] Retaining walls",
      "[PLACEHOLDER] Brick and stone work",
    ],
    image: "/images/service-concrete.svg",
  },
  {
    slug: "project-management",
    title: "Project Management",
    summary:
      "[PLACEHOLDER] End-to-end coordination of permits, subcontractors, and schedules.",
    details: [
      "[PLACEHOLDER] Pre-construction planning and budgeting",
      "[PLACEHOLDER] Permitting and inspections coordination",
      "[PLACEHOLDER] Subcontractor management",
      "[PLACEHOLDER] Owner progress reporting",
    ],
    image: "/images/service-management.svg",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  featured: boolean;
};

/**
 * [PLACEHOLDER] These are sample project entries, NOT real completed
 * projects. Replace each entry with real projects (with client permission)
 * and real photos before launch.
 */
export const projects: Project[] = [
  {
    slug: "sample-project-1",
    title: "Sample Project — Residential Build",
    category: "Residential",
    location: "Syracuse, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-1.svg",
    featured: true,
  },
  {
    slug: "sample-project-2",
    title: "Sample Project — Commercial Renovation",
    category: "Commercial",
    location: "Utica, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-2.svg",
    featured: true,
  },
  {
    slug: "sample-project-3",
    title: "Sample Project — Exterior Remodel",
    category: "Renovation",
    location: "Auburn, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-3.svg",
    featured: true,
  },
  {
    slug: "sample-project-4",
    title: "Sample Project — Concrete & Sitework",
    category: "Concrete",
    location: "Oswego, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-4.svg",
    featured: false,
  },
  {
    slug: "sample-project-5",
    title: "Sample Project — Roofing Replacement",
    category: "Roofing",
    location: "Cortland, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-5.svg",
    featured: false,
  },
  {
    slug: "sample-project-6",
    title: "Sample Project — Interior Build-Out",
    category: "Commercial",
    location: "Rome, NY",
    description:
      "[PLACEHOLDER] Describe a real completed project here: scope, size, timeline, and outcome. This entry is an example only.",
    image: "/images/project-6.svg",
    featured: false,
  },
];

/**
 * [PLACEHOLDER] Certification/license SLOTS only — intentionally generic.
 * Replace with the certifications, licenses, and memberships your company
 * actually holds, including license numbers where applicable. Do not
 * publish this page until every entry is verified and accurate.
 */
export const certificationSlots = [
  {
    title: "[Certification or license name]",
    issuer: "[Issuing organization]",
    description:
      "Replace with details of a certification or license your company actually holds, including the license number if applicable.",
  },
  {
    title: "[Certification or license name]",
    issuer: "[Issuing organization]",
    description:
      "Replace with details of a certification or license your company actually holds, including the license number if applicable.",
  },
  {
    title: "[Insurance / bonding details]",
    issuer: "[Insurance carrier]",
    description:
      "Replace with your actual liability insurance and bonding information.",
  },
  {
    title: "[Trade association membership]",
    issuer: "[Association name]",
    description:
      "Replace with trade associations or builder groups your company belongs to.",
  },
];

/** [PLACEHOLDER] Replace with your company's real story and values. */
export const aboutContent = {
  intro:
    "[PLACEHOLDER] Write a short paragraph introducing your company: when it was founded, who leads it, and what it specializes in.",
  story:
    "[PLACEHOLDER] Tell your company's story here — how it started, how it has grown, and what makes it different from other contractors in Central New York.",
  values: [
    {
      title: "Quality Craftsmanship",
      description:
        "[PLACEHOLDER] Describe your commitment to quality workmanship.",
    },
    {
      title: "Clear Communication",
      description:
        "[PLACEHOLDER] Describe how you keep clients informed throughout a project.",
    },
    {
      title: "Safety First",
      description:
        "[PLACEHOLDER] Describe your approach to jobsite safety.",
    },
    {
      title: "Local Commitment",
      description:
        "[PLACEHOLDER] Describe your ties to the Central New York community.",
    },
  ],
};
