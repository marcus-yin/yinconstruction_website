import type { MetadataRoute } from "next";
import { navLinks, company, services, pathways } from "@/content/site";

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

  return [...pageRoutes, ...pathwayRoutes, ...serviceRoutes];
}
