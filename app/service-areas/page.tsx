import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import ServiceAreaMap from "@/components/graphics/ServiceAreaMap";
import { cityPages, company } from "@/content/site";

export const metadata: Metadata = {
  title: "Drywall Service Areas in Central New York",
  description:
    "YIN Construction serves Syracuse, Utica, Auburn, Rome, Cortland, Oswego, and Fulton, NY with drywall, finishing, repairs, and interior construction.",
  alternates: { canonical: "/service-areas/" },
  openGraph: { url: "/service-areas/" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHeader
        title="Where We Work"
        description={`${company.serviceAreaStatement}. Pick your area for local details, or ask us about anywhere in between.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas/" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="grid gap-5 sm:grid-cols-2">
              {cityPages.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-areas/${city.slug}/`}
                    className="group flex h-full flex-col rounded-lg border border-steel-200 bg-white p-6 shadow-sm transition-colors hover:border-navy-700"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin aria-hidden="true" className="h-5 w-5 text-navy-700" />
                      <span className="font-heading text-lg font-semibold text-navy-900 group-hover:underline">
                        {city.city}, NY
                      </span>
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-steel-600">
                      {city.intro}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ServiceAreaMap className="mx-auto w-full max-w-sm" />
        </div>

        <p className="mt-12 max-w-3xl text-steel-700">
          Don&apos;t see your town? These pages cover our core areas, but we
          regularly work throughout Central New York.{" "}
          <Link href="/contact/" className="font-semibold text-navy-700 underline">
            Ask us about your project
          </Link>{" "}
          and we&apos;ll tell you honestly whether it&apos;s a fit.
        </p>
      </div>

      <QuoteCTA />
    </>
  );
}
