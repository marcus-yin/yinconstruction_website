import type { Metadata } from "next";
import { Phone, Mail, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ApplyForm from "@/components/ApplyForm";
import { company, applyPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Drywall & Construction Jobs in Syracuse, NY",
  description: `Apply to work with ${company.name}, a drywall and interior construction contractor in Syracuse, NY. Tell us about your trade experience.`,
  alternates: { canonical: "/apply/" },
  openGraph: { url: "/apply/" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader title={applyPage.title} description={applyPage.intro} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <section aria-labelledby="apply-form-heading" className="lg:col-span-2">
            <h2
              id="apply-form-heading"
              className="font-heading text-2xl font-bold tracking-tight text-navy-900"
            >
              {applyPage.formHeading}
            </h2>
            <p className="mt-2 text-steel-600">{applyPage.formIntro}</p>
            <div className="mt-8">
              <ApplyForm />
            </div>
          </section>

          <aside aria-labelledby="hiring-info-heading">
            <h2
              id="hiring-info-heading"
              className="font-heading text-2xl font-bold tracking-tight text-navy-900"
            >
              What to Expect
            </h2>

            <ul className="mt-6 space-y-4">
              {applyPage.whatToExpect.map((item) => (
                <li key={item.slice(0, 40)} className="flex gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-navy-700"
                  />
                  <p className="text-steel-700">{item}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-lg border border-steel-200 bg-mist p-6">
              <h3 className="font-heading text-base font-semibold text-navy-900">
                Prefer to reach out directly?
              </h3>
              <address className="mt-4 space-y-3 text-sm not-italic">
                <p className="flex items-center gap-2">
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-navy-700" />
                  <a
                    href={`tel:${company.phone.e164}`}
                    className="font-medium text-navy-900 hover:text-navy-700"
                  >
                    {company.phone.display}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-navy-700" />
                  <a
                    href={`mailto:${company.email}`}
                    className="font-medium text-navy-900 hover:text-navy-700"
                  >
                    {company.email}
                  </a>
                </p>
              </address>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
