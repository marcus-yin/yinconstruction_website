import Link from "next/link";
import { visibleNavLinks as navLinks, services, company, pathways } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold text-white">{company.name}</p>
            <p className="mt-2 text-sm leading-relaxed">{company.serviceAreaStatement}</p>
          </div>

          <nav aria-label="Footer services">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </p>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-sm hover:text-white hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer navigation">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Pages
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              {pathways.map((pathway) => (
                <li key={pathway.slug}>
                  <Link
                    href={`/${pathway.slug}/`}
                    className="text-sm hover:text-white hover:underline"
                  >
                    For {pathway.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </p>
            <address className="mt-3 space-y-2 text-sm not-italic">
              <p>
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </p>
              <p>
                <a href={`tel:${company.phone.e164}`} className="hover:text-white hover:underline">
                  {company.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-white hover:underline">
                  {company.email}
                </a>
              </p>
              <p className="text-steel-300">{company.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6 text-center text-xs text-steel-300">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
