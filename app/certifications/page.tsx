import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuoteCTA from "@/components/QuoteCTA";
import { certificationSlots, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications & Licensing",
  description: `Certifications, licensing, and insurance information for ${siteConfig.name}, serving Central New York.`,
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        title="Certifications & Licensing"
        description="[PLACEHOLDER] Summarize your company's licensing, insurance, and professional credentials here."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Placeholder notice — remove once real credentials are in place */}
        <div
          role="note"
          className="mb-10 rounded-lg border border-amber-300 bg-amber-50 p-5"
        >
          <p className="font-semibold text-amber-900">
            Placeholder content — do not publish as-is
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">
            The entries below are empty slots, not real credentials. Replace
            each one with certifications, licenses, insurance, and memberships
            your company actually holds — verified and current — before this
            page goes live.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {certificationSlots.map((cert, index) => (
            <div
              key={index}
              className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {cert.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {cert.issuer}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}
