import {
  SITE_URL,
  company,
  countiesServed,
  serviceAreas,
  services,
  socialProfiles,
  type Service,
} from "@/content/site";

/**
 * schema.org JSON-LD builders. Everything is generated from content/site.ts,
 * and values still carrying {{TODO}} tokens are omitted (never emitted), so
 * search engines only ever see verified facts. Output is checked after every
 * build by scripts/validate-jsonld.mjs, which fails the build on malformed
 * JSON, missing required fields, or leaked tokens.
 */

const isReal = (value: string) => !value.includes("{{");

/** Cities + counties for areaServed. */
function areaServed() {
  return [
    ...serviceAreas.map((area) => ({
      "@type": "City" as const,
      name: `${area.name}, NY`,
    })),
    ...countiesServed.map((county) => ({
      "@type": "AdministrativeArea" as const,
      name: `${county}, NY`,
    })),
  ];
}

/**
 * Site-wide LocalBusiness subtype GeneralContractor, rendered on every page.
 * No Review/AggregateRating: there are no published reviews in the content
 * file, and none may be added to schema until real ones exist.
 */
export function localBusinessSchema() {
  const sameAs = socialProfiles.filter(isReal);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#business`,
    name: company.name,
    description: company.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og-image.png`,
    telephone: company.phone.e164,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      // Street/city/zip are omitted until the address is published in site.ts.
      ...(company.address.street && { streetAddress: company.address.street }),
      ...(company.address.city && { addressLocality: company.address.city }),
      addressRegion: company.address.state,
      ...(company.address.zip && { postalCode: company.address.zip }),
      addressCountry: "US",
    },
    ...(company.geo.lat !== null &&
      company.geo.lng !== null && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: company.geo.lat,
          longitude: company.geo.lng,
        },
      }),
    openingHoursSpecification: company.hoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: areaServed(),
    ...(sameAs.length > 0 && { sameAs }),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };
}

/** Service schema for /services/[slug]/ pages. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title.split(" (")[0],
    description: service.short,
    url: `${SITE_URL}/services/${service.slug}/`,
    provider: {
      "@type": "GeneralContractor",
      "@id": `${SITE_URL}/#business`,
      name: company.name,
      url: SITE_URL,
    },
    areaServed: areaServed(),
  };
}

export type BreadcrumbItem = { name: string; href: string };

/** BreadcrumbList schema matching the visible breadcrumb trail. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // The last crumb (current page) carries no item URL per Google's docs.
      ...(index < items.length - 1 && { item: `${SITE_URL}${item.href}` }),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/**
 * FAQPage schema. Only Q&As free of {{TODO}} tokens are included, so the
 * schema is always a subset of the visible, finished content.
 */
export function faqSchema(faqs: readonly FaqItem[]) {
  const finished = faqs.filter(
    (faq) => isReal(faq.question) && isReal(faq.answer)
  );
  if (finished.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: finished.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
