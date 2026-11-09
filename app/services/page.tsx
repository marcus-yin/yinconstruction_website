import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import { services, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: `Construction services from ${siteConfig.name}: residential and commercial construction, renovation, roofing, concrete and masonry, and project management in Central New York.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="[PLACEHOLDER] Summarize the range of construction services your company offers across Central New York."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {services.map((service, index) => (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-heading`}
              className={`grid items-center gap-8 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2
                  id={`${service.slug}-heading`}
                  className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                >
                  {service.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {service.summary}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <svg
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}
