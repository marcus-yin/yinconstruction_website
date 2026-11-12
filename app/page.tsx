import type { Metadata } from "next";
import Link from "next/link";
import { Award, MessagesSquare, HardHat, MapPin, Check } from "lucide-react";
import BlueprintGrid from "@/components/graphics/BlueprintGrid";
import IsometricHero from "@/components/graphics/IsometricHero";
import SectionDivider from "@/components/graphics/SectionDivider";
import StatCounter from "@/components/graphics/StatCounter";
import ProcessTimeline from "@/components/graphics/ProcessTimeline";
import ServiceAreaMap from "@/components/graphics/ServiceAreaMap";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import ProjectCard from "@/components/ProjectCard";
import Testimonials from "@/components/Testimonials";
import QuoteCTA from "@/components/QuoteCTA";
import {
  company,
  seo,
  hero,
  navLinks,
  pathways,
  trustStrip,
  stats,
  services,
  processSteps,
  values,
  serviceAreas,
  visibleProjects,
  projectsCapabilities,
} from "@/content/site";

export const metadata: Metadata = {
  title: seo.defaultTitle,
  description: seo.defaultDescription,
  alternates: { canonical: "/" },
};

const VALUE_ICONS = {
  quality: Award,
  communication: MessagesSquare,
  safety: HardHat,
  local: MapPin,
} as const;

export default function HomePage() {
  const featured = visibleProjects().slice(0, 3);
  // Featured Projects section follows the Projects nav link: hidden while the
  // page is hidden from navigation (remove `hidden: true` in content/site.ts
  // to bring both back).
  const showProjectsSection = !navLinks.find((link) => link.href === "/projects/")?.hidden;

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="hero-heading" className="relative bg-mist">
        <BlueprintGrid tone="light" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-steel-600">
              {hero.kicker}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl"
            >
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-700">
              {hero.subcopy}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={hero.primaryCta.href}
                className="rounded-md bg-accent-600 px-6 py-3 text-center font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="rounded-md border-2 border-navy-700 px-6 py-3 text-center font-heading text-base font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <IsometricHero className="hidden w-full lg:block" />
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-steel-200 bg-white/70">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {trustStrip.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-navy-700" />
                <span className="font-semibold text-navy-900">{item.label}</span>
                {item.note && (
                  <span className="hidden text-xs text-steel-500 xl:inline">{item.note}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Stats band
          Hidden until at least one real number is set in content/site.ts
          (stats with value: null would otherwise show {{TODO}} tokens). */}
      {stats.some((stat) => stat.value !== null) && (
        <section aria-label="Company statistics" className="relative bg-navy-800">
          <BlueprintGrid tone="dark" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16">
            {stats
              .filter((stat) => stat.value !== null)
              .map((stat) => (
                <StatCounter key={stat.label} stat={stat} />
              ))}
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- Services */}
      <section
        aria-labelledby="services-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="services-heading"
              className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              Our Services
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-steel-600">
              From a single patch to a full commercial fit-out — interior work,
              done right the first time.
            </p>
          </div>
          <Link
            href="/services/"
            className="shrink-0 font-heading text-base font-semibold text-navy-700 hover:text-navy-900 hover:underline"
          >
            All services &rarr;
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}/`}
                className="group flex h-full flex-col rounded-lg border border-steel-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">
                  {service.short}
                </p>
                <span className="mt-4 text-sm font-semibold text-navy-700 group-hover:underline">
                  Learn more &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------- Customer pathways */}
      <section aria-labelledby="pathways-heading" className="relative bg-navy-800">
        <BlueprintGrid tone="dark" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            id="pathways-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Who We Work With
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {pathways.map((pathway) => (
              <div
                key={pathway.slug}
                className="flex flex-col rounded-lg bg-white p-8 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-steel-500">
                  For {pathway.label}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-navy-900">
                  {pathway.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-600">
                  {pathway.intro}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={pathway.cta.href}
                    className="rounded-md bg-accent-600 px-5 py-2.5 text-center font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                  >
                    {pathway.cta.label}
                  </Link>
                  <Link
                    href={`/${pathway.slug}/`}
                    className="rounded-md border border-navy-700 px-5 py-2.5 text-center font-heading text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ How we work */}
      <div className="text-mist">
        <SectionDivider />
      </div>
      <section aria-labelledby="process-heading" className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            id="process-heading"
            className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
          >
            How We Work
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-steel-600">
            Six steps, no surprises — the same process on every job.
          </p>
          <div className="mt-12">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>
      <div className="rotate-180 text-mist">
        <SectionDivider />
      </div>

      {/* ----------------------------------------------------- Why choose us */}
      <section
        aria-labelledby="values-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <h2
          id="values-heading"
          className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          Why Choose Us
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <li
                key={value.title}
                className="rounded-lg border border-steel-200 bg-white p-6 shadow-sm"
              >
                <Icon aria-hidden="true" className="h-7 w-7 text-navy-700" />
                <h3 className="mt-4 font-heading text-base font-semibold text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {value.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------ Service area */}
      <section aria-labelledby="area-heading" className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <h2
              id="area-heading"
              className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              Where We Work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel-700">
              Based in the Syracuse area, we take on projects across Central New
              York — within roughly {"{{TODO: service radius in miles}}"} miles
              of Syracuse.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <li key={area.name} className="flex items-center gap-2 text-steel-800">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-navy-700" />
                  {area.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-steel-500">
              Outside these areas? <Link href="/contact/" className="font-semibold text-navy-700 underline">Ask us</Link> — we regularly travel for the right project.
            </p>
          </div>
          <ServiceAreaMap className="mx-auto w-full max-w-md" />
        </div>
      </section>

      {/* ------------------------------------------------- Featured projects */}
      {showProjectsSection && (
      <section
        aria-labelledby="projects-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="projects-heading"
            className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
          >
            Featured Projects
          </h2>
          <Link
            href="/projects/"
            className="shrink-0 font-heading text-base font-semibold text-navy-700 hover:text-navy-900 hover:underline"
          >
            All projects &rarr;
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-steel-200 bg-mist p-8">
            <h3 className="font-heading text-lg font-semibold text-navy-900">
              {projectsCapabilities.heading}
            </h3>
            <p className="mt-2 max-w-3xl text-steel-700">
              {projectsCapabilities.paragraphs[0]}{" "}
              <Link href="/contact/" className="font-semibold text-navy-700 underline">
                Request an estimate
              </Link>{" "}
              and we&apos;ll walk you through recent work in person.
            </p>
          </div>
        )}
      </section>
      )}

      {/* ----------------------------------------------------- Testimonials */}
      <Testimonials />

      {/* ------------------------------------------------------- Closing CTA */}
      <QuoteCTA />
    </>
  );
}
