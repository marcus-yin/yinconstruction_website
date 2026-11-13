import type { MetadataRoute } from "next";
import {
  visibleNavLinks as navLinks,
  company,
  services,
  pathways,
  cityPages,
} from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pageRoutes = navLinks.map((link) => ({
    url: `${company.url}${link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const pathwayRoutes = pathways.map((pathway) => ({
    url: `${company.url}/${pathway.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${company.url}/services/${service.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaRoutes = [
    {
      url: `${company.url}/service-areas/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...cityPages.map((city) => ({
      url: `${company.url}/service-areas/${city.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...pageRoutes, ...pathwayRoutes, ...serviceRoutes, ...areaRoutes];
}
