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
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    openingHours: company.hours,
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
