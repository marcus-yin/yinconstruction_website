import type { Metadata } from "next";
import { Award, MessagesSquare, HardHat, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import MonogramAvatar from "@/components/graphics/MonogramAvatar";
import ServiceAreaMap from "@/components/graphics/ServiceAreaMap";
import { company, about, values, teamMembers } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${company.name}: a drywall and interior construction contractor based in Central New York. Our story, mission, values, and commitment to safety.`,
  alternates: { canonical: "/about/" },
};

const VALUE_ICONS = {
  quality: Award,
  communication: MessagesSquare,
  safety: HardHat,
  local: MapPin,
} as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" description={about.intro} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Story + mission */}
        <div className="grid gap-12 lg:grid-cols-3">
          <section aria-labelledby="story-heading" className="lg:col-span-2">
            <h2
              id="story-heading"
              className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
            >
              Our Story
            </h2>
            <div className="mt-4 space-y-4">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-steel-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <aside className="rounded-lg bg-navy-900 p-8">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-navy-200">
              Our Mission
            </h2>
            <p className="mt-3 font-heading text-xl font-semibold leading-snug text-white">
              {about.mission}
            </p>
          </aside>
        </div>

        {/* Values */}
        <section aria-labelledby="values-heading" className="mt-20">
          <h2
            id="values-heading"
            className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            What We Stand For
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Safety */}
        <section
          aria-labelledby="safety-heading"
          className="mt-20 rounded-lg border border-steel-200 bg-mist p-8 lg:p-10"
        >
          <div className="flex items-start gap-4">
            <HardHat aria-hidden="true" className="h-8 w-8 shrink-0 text-navy-700" />
            <div>
              <h2
                id="safety-heading"
                className="font-heading text-2xl font-bold tracking-tight text-navy-900"
              >
                {about.safety.heading}
              </h2>
              <div className="mt-4 max-w-3xl space-y-4">
                {about.safety.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-steel-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* Certifications page is hidden for now; restore this link when
                  it returns to navigation:
                  "Insurance and training details are on our Certifications page." */}
              <p className="mt-4 text-sm text-steel-500">
                A certificate of insurance is available on request.
              </p>
            </div>
          </div>
        </section>

        {/* Local roots */}
        <section aria-labelledby="local-heading" className="mt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="local-heading"
                className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
              >
                Local Roots in Central New York
              </h2>
              <p className="mt-4 leading-relaxed text-steel-700">{about.localRoots}</p>
            </div>
            <ServiceAreaMap className="mx-auto w-full max-w-sm" />
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading" className="mt-20">
          <h2
            id="team-heading"
            className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            Our Team
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <li
                key={member.initials}
                className="flex items-center gap-5 rounded-lg border border-steel-200 bg-white p-6 shadow-sm"
              >
                <MonogramAvatar label={member.initials} className="h-16 w-16 shrink-0" />
                <div>
                  <p className="break-words font-heading text-base font-semibold text-navy-900">
                    {member.name}
                  </p>
                  <p className="mt-1 break-words text-sm text-steel-600">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <QuoteCTA />
    </>
  );
}
