import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import BlueprintGrid from "@/components/graphics/BlueprintGrid";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import FinishLevels from "@/components/graphics/FinishLevels";
import QuoteCTA from "@/components/QuoteCTA";
import {
  company,
  services,
  serviceAreas,
  finishLevels,
  hero,
} from "@/content/site";
import { serviceSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}/`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const areaList = serviceAreas.map((a) => a.name).join(", ");

  // Service structured data - only facts already stated on the page.
  const schema = serviceSchema(service);

  return (
    <>
      {/* Page hero */}
      <div className="relative bg-navy-900">
        <BlueprintGrid tone="dark" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-navy-200">
            <ol className="flex flex-wrap gap-1.5">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
                <span aria-hidden="true" className="ml-1.5">/</span>
              </li>
              <li>
                <Link href="/services/" className="hover:text-white hover:underline">
                  Services
                </Link>
                <span aria-hidden="true" className="ml-1.5">/</span>
              </li>
              <li aria-current="page" className="text-white">
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="mt-6 flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-navy-100">
                {service.short}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-steel-700">
                {paragraph}
              </p>
            ))}

            {service.slug === "taping-finishing" && (
              <div className="rounded-lg border border-steel-200 bg-mist p-5">
                <h2 className="font-heading text-base font-semibold text-navy-900">
                  The six finish levels, explained
                </h2>
                <div className="mt-4">
                  <FinishLevels levels={finishLevels} />
                </div>
              </div>
            )}

            <p className="rounded-lg bg-mist px-5 py-4 text-sm leading-relaxed text-steel-700">
              {service.title.split(" (")[0]} available in {areaList}, and
              surrounding Central New York communities.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-steel-200 bg-white p-5 shadow-sm">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                What&apos;s included
              </h2>
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
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
                Ideal for
              </h2>
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

            <div className="flex flex-col gap-3">
              <Link
                href={hero.primaryCta.href}
                className="rounded-md bg-accent-600 px-5 py-3 text-center font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-700"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="rounded-md border-2 border-navy-700 px-5 py-3 text-center font-heading text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Related services - internal linking */}
        <section aria-labelledby="related-heading" className="mt-16 border-t border-steel-200 pt-10">
          <h2
            id="related-heading"
            className="font-heading text-xl font-bold tracking-tight text-navy-900"
          >
            Related Services
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}/`}
                  className="group flex h-full items-center gap-3 rounded-lg border border-steel-200 bg-white p-4 transition-colors hover:border-navy-700"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-navy-50 text-navy-700">
                    <ServiceIcon name={other.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy-900 group-hover:underline">
                    {other.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <QuoteCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
