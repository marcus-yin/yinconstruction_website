import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import { company, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `${company.name} services: ${services
    .map((s) => s.title.split(" (")[0])
    .join(", ")}. Serving Syracuse and Central New York with free written estimates.`,
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Interior construction from bare studs to final coat of paint, for homeowners, builders, and commercial clients across Central New York."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            // id preserves old /services/#slug anchor links
            <li key={service.slug} id={service.slug} className="scroll-mt-24">
              <article className="flex h-full flex-col rounded-lg border border-steel-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-700 text-white">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-heading text-lg font-semibold text-navy-900">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">
                  {service.short}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.included.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-steel-700">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-steel-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}/`}
                  className="mt-5 font-heading text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
                >
                  {service.title.split(" (")[0]} details &rarr;
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <QuoteCTA />
    </>
  );
}
