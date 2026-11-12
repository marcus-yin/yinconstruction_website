import Link from "next/link";
import { company } from "@/content/site";
import BlueprintGrid from "@/components/graphics/BlueprintGrid";

export default function QuoteCTA() {
  return (
    <section aria-labelledby="quote-cta-heading" className="relative bg-navy-900">
      <BlueprintGrid tone="dark" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2
            id="quote-cta-heading"
            className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Ready to start your project?
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-navy-100">
            Request a free, no-obligation estimate. We&apos;ll walk the space,
            measure, and put everything in writing.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            className="rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Request a Free Quote
          </Link>
          <a
            href={`tel:${company.phone.e164}`}
            className="rounded-md border-2 border-navy-300 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Call {company.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
