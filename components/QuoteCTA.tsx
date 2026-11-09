import Link from "next/link";
import { siteConfig } from "@/lib/content";

export default function QuoteCTA() {
  return (
    <section
      aria-labelledby="quote-cta-heading"
      className="bg-amber-500"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2
            id="quote-cta-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Ready to start your project?
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-slate-800">
            Request a free, no-obligation quote today. We&apos;ll review your
            project and get back to you promptly.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            className="rounded-md bg-slate-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Request a Quote
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            className="rounded-md border-2 border-slate-900 px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
