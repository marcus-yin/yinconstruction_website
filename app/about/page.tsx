import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import { aboutContent, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, a construction company serving Central New York. Our story, our values, and our approach to every project.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description={aboutContent.intro}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {aboutContent.story}
            </p>
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

        <section aria-labelledby="values-heading" className="mt-20">
          <h2
            id="values-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            What We Stand For
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <QuoteCTA />
    </>
  );
}
