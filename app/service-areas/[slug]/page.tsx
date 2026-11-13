import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import BlueprintGrid from "@/components/graphics/BlueprintGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import QuoteCTA from "@/components/QuoteCTA";
import { cityPages, services } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cityPages.map((city) => ({ slug: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = cityPages.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: `/service-areas/${city.slug}/` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/service-areas/${city.slug}/`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const city = cityPages.find((c) => c.slug === slug);
  if (!city) notFound();

  const featured = city.featuredServices
    .map((entry) => {
      const service = services.find((s) => s.slug === entry.slug);
      return service ? { ...entry, service } : null;
    })
    .filter((entry) => entry !== null);

  const otherCities = cityPages.filter((c) => c.slug !== city.slug);

  return (
    <>
      {/* Page hero */}
      <div className="relative bg-navy-900">
        <BlueprintGrid tone="dark" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Service Areas", href: "/service-areas/" },
              { name: `${city.city}, NY`, href: `/service-areas/${city.slug}/` },
            ]}
          />
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {city.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy-100">
            {city.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {city.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-steel-700">
                {paragraph}
              </p>
            ))}
            <p className="rounded-lg bg-mist px-5 py-4 text-sm leading-relaxed text-steel-700">
              {city.schedulingNote}
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-steel-200 bg-white p-5 shadow-sm">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                Also serving nearby
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {city.nearby.map((town) => (
                  <li
                    key={town}
                    className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-sm text-steel-700"
                  >
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-navy-700" />
                    {town}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-steel-200 bg-mist p-5">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                Popular services here
              </h2>
              <ul className="mt-3 space-y-3">
                {featured.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/services/${entry.slug}/`}
                      className="group flex items-center gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white text-navy-700">
                        <ServiceIcon name={entry.service.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-navy-900 group-hover:underline">
                        {entry.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Other service areas - internal linking */}
        <section aria-labelledby="other-areas-heading" className="mt-16 border-t border-steel-200 pt-10">
          <h2
            id="other-areas-heading"
            className="font-heading text-xl font-bold tracking-tight text-navy-900"
          >
            Other Areas We Serve
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {otherCities.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/service-areas/${other.slug}/`}
                  className="inline-flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-700 hover:underline"
                >
                  <MapPin aria-hidden="true" className="h-4 w-4 text-navy-700" />
                  {other.city}, NY
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <QuoteCTA />
    </>
  );
}
