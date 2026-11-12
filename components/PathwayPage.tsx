import Link from "next/link";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/graphics/ProcessTimeline";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import QuoteCTA from "@/components/QuoteCTA";
import { services, processSteps, type Pathway } from "@/content/site";

/**
 * Shared template for the audience pathway pages (/homeowners/ and
 * /general-contractors/). Content comes entirely from content/site.ts.
 */
export default function PathwayPage({ pathway }: { pathway: Pathway }) {
  const pathwayServices = pathway.serviceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader title={pathway.title} description={pathway.intro} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Services for this audience */}
        <section aria-labelledby="pathway-services-heading">
          <h2
            id="pathway-services-heading"
            className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            What We Do for {pathway.label}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {pathwayServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full gap-4 rounded-lg border border-steel-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy-700 text-white">
                    <ServiceIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-semibold text-navy-900 group-hover:underline">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-steel-600">
                      {service.short}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Expectations */}
        <section
          aria-labelledby="expectations-heading"
          className="mt-16 rounded-lg border border-steel-200 bg-mist p-8"
        >
          <h2
            id="expectations-heading"
            className="font-heading text-xl font-bold tracking-tight text-navy-900"
          >
            What You Can Expect
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {pathway.expectations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-steel-700">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-navy-700" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={pathway.cta.href}
            className="mt-7 inline-block rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700"
          >
            {pathway.cta.label}
          </Link>
        </section>

        {/* Process */}
        <section aria-labelledby="pathway-process-heading" className="mt-16">
          <h2
            id="pathway-process-heading"
            className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            How We Work
          </h2>
          <div className="mt-10">
            <ProcessTimeline steps={processSteps} />
          </div>
        </section>
      </div>

      <QuoteCTA />
    </>
  );
}
