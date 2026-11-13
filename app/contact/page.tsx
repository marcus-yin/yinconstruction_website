import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/ui/Accordion";
import { company, faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Free Drywall Estimates in Syracuse, NY",
  description: `Request a free drywall estimate or subcontractor bid from ${company.name} in Syracuse, NY. Written estimates for residential and commercial work.`,
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Request a free quote or ask a question. We'll get back to you promptly."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <section aria-labelledby="form-heading" className="lg:col-span-2">
            <h2
              id="form-heading"
              className="font-heading text-2xl font-bold tracking-tight text-navy-900"
            >
              Request an Estimate or Subcontractor Bid
            </h2>
            <p className="mt-2 text-steel-600">
              Homeowner or general contractor, tell us about the project and
              we&apos;ll follow up to schedule a free site visit and written
              estimate.
            </p>
            <div className="mt-8">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </section>

          <aside aria-labelledby="info-heading">
            <h2
              id="info-heading"
              className="font-heading text-2xl font-bold tracking-tight text-navy-900"
            >
              Get in Touch
            </h2>

            {/* Click-to-call, prominent on mobile */}
            <a
              href={`tel:${company.phone.e164}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-md bg-navy-700 px-5 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-navy-800 lg:hidden"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              Call {company.phone.display}
            </a>

            <address className="mt-6 space-y-6 not-italic">
              <div className="flex gap-3">
                <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-navy-700" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-steel-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${company.phone.e164}`}
                    className="mt-0.5 block break-words font-medium text-navy-900 hover:text-navy-700"
                  >
                    {company.phone.display}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-navy-700" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-steel-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-0.5 block break-words font-medium text-navy-900 hover:text-navy-700"
                  >
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-navy-700" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-steel-500">
                    Hours
                  </p>
                  <p className="mt-0.5 break-words font-medium text-navy-900">{company.hours}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-navy-700" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-steel-500">
                    Service Area
                  </p>
                  <p className="mt-0.5 text-steel-700">{company.serviceAreaStatement}</p>
                </div>
              </div>
            </address>
          </aside>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-20">
          <h2
            id="faq-heading"
            className="font-heading text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-8 max-w-3xl">
            <Accordion items={faqs} idPrefix="faq" />
          </div>
        </section>
      </div>
    </>
  );
}
