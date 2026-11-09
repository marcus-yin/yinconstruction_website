import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & Quote Request",
  description: `Request a free quote from ${siteConfig.name}. ${siteConfig.serviceArea}. Call ${siteConfig.phone} or send us your project details.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Request a free quote or ask a question — we'll get back to you promptly."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <section aria-labelledby="form-heading" className="lg:col-span-2">
            <h2
              id="form-heading"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Request a Quote
            </h2>
            <p className="mt-2 text-slate-600">
              Fill out the form below and we&apos;ll follow up to discuss your
              project.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <aside aria-labelledby="info-heading">
            <h2
              id="info-heading"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Get in Touch
            </h2>
            <address className="mt-6 space-y-6 not-italic">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Phone
                </p>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-1 block text-lg font-medium text-slate-900 hover:text-amber-600"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-lg font-medium text-slate-900 hover:text-amber-600"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Office
                </p>
                <p className="mt-1 text-lg text-slate-900">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{" "}
                  {siteConfig.address.zip}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Hours
                </p>
                <p className="mt-1 text-lg text-slate-900">
                  {siteConfig.hours}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Service Area
                </p>
                <p className="mt-1 text-slate-700">{siteConfig.serviceArea}</p>
              </div>
            </address>
          </aside>
        </div>
      </div>
    </>
  );
}
