import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteCTA from "@/components/QuoteCTA";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import { aboutContent, projects, services, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: `${siteConfig.serviceArea}. Residential and commercial construction, renovation, roofing, concrete, and project management. Request a free quote.`,
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            {siteConfig.serviceArea}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Built right. Built to last.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            [PLACEHOLDER] Introduce your company in one or two sentences:
            what you build, who you serve, and why clients choose you.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact/"
              className="rounded-md bg-amber-500 px-6 py-3 text-center text-base font-semibold text-slate-900 transition-colors hover:bg-amber-400"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/projects/"
              className="rounded-md border border-slate-500 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:border-slate-300 hover:bg-slate-800"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section
        aria-labelledby="services-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="services-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Our Services
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              From new construction to renovations, we handle projects of
              every size across Central New York.
            </p>
          </div>
          <Link
            href="/services/"
            className="shrink-0 text-base font-semibold text-amber-600 hover:text-amber-700 hover:underline"
          >
            All services &rarr;
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="projects-heading" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="projects-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Featured Projects
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Sample entries shown below — replace with your real completed
                projects.
              </p>
            </div>
            <Link
              href="/projects/"
              className="shrink-0 text-base font-semibold text-amber-600 hover:text-amber-700 hover:underline"
            >
              All projects &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <section
        aria-labelledby="about-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              A local team you can count on
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {aboutContent.intro}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutContent.values.map((value) => (
                <li key={value.title} className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-slate-800">
                    {value.title}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/about/"
              className="mt-8 inline-block text-base font-semibold text-amber-600 hover:text-amber-700 hover:underline"
            >
              Learn more about us &rarr;
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/about.svg"
              alt="Placeholder image — replace with a photo of your team or jobsite"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote request CTA */}
      <QuoteCTA />
    </>
  );
}
