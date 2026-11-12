import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import FinishLevels from "@/components/graphics/FinishLevels";
import { company, services, finishLevels } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `${company.name} services: ${services
    .map((s) => s.title.split(" (")[0])
    .join(", ")} — serving Central New York with free written estimates.`,
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Interior construction from bare studs to final coat of paint — for homeowners, builders, and commercial clients across Central New York."
      />

      {/* In-page service navigation */}
      <nav
        aria-label="Services on this page"
        className="border-b border-steel-200 bg-white"
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {services.map((service) => (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-heading`}
              className="scroll-mt-24"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-navy-700 text-white">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h2
                    id={`${service.slug}-heading`}
                    className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-1 text-steel-500">{service.short}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-10 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                  {service.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed text-steel-700">
                      {paragraph}
                    </p>
                  ))}

                  {/* Finish levels diagram inside Taping & Finishing */}
                  {service.slug === "taping-finishing" && (
                    <div className="rounded-lg border border-steel-200 bg-mist p-5">
                      <h3 className="font-heading text-base font-semibold text-navy-900">
                        The six finish levels, explained
                      </h3>
                      <div className="mt-4">
                        <FinishLevels levels={finishLevels} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border border-steel-200 bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                      What&apos;s included
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {service.included.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-steel-700">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-steel-200 bg-mist p-5">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                      Ideal for
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {service.idealFor.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-steel-700">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-steel-400"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact/"
                    className="block rounded-md bg-accent-600 px-5 py-3 text-center font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                  >
                    Get a quote for {service.title.split(" (")[0].toLowerCase()}
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}
