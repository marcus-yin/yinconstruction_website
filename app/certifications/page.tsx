import type { Metadata } from "next";
import { FileCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import CertBadge from "@/components/graphics/CertBadge";
import { company, certifications, certificationsNote } from "@/content/site";

export const metadata: Metadata = {
  title: "Certifications & Insurance",
  description: `Licensing, insurance, and safety training for ${company.name}. Certificate of insurance available on request.`,
  alternates: { canonical: "/certifications/" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        title="Certifications & Insurance"
        description="The credentials behind the work: licensing, coverage, and safety training."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <li
              key={cert.title}
              className="flex flex-col items-start rounded-lg border border-steel-200 bg-white p-6 shadow-sm"
            >
              <CertBadge type={cert.badge} className="h-16 w-16" />
              <h2 className="mt-5 font-heading text-lg font-semibold text-navy-900">
                {cert.title}
              </h2>
              <p className="mt-2 break-words text-sm leading-relaxed text-steel-600">
                {cert.description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center justify-center gap-2.5 rounded-lg bg-mist px-6 py-5 text-center font-medium text-navy-900">
          <FileCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-navy-700" />
          {certificationsNote}
        </p>
      </div>

      <QuoteCTA />
    </>
  );
}
