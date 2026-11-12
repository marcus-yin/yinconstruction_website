import { company, serviceAreas, services } from "@/content/site";

/**
 * LocalBusiness / GeneralContractor structured data, populated from
 * content/site.ts. {{TODO}} tokens appear here until real facts are
 * filled in - search engines will simply ignore the invalid values,
 * but replace them before launch (see TODO-CONTENT.md).
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    description: company.tagline,
    url: company.url,
    telephone: company.phone.display,
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
    openingHours: company.hoursSchema,
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area.name}, NY`,
    })),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
