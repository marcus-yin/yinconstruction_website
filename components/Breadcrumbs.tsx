import Link from "next/link";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

/**
 * Breadcrumb trail for inner pages (rendered on the navy page headers),
 * with matching BreadcrumbList JSON-LD. The last item is the current page
 * and is not linked.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-navy-200">
        <ol className="flex flex-wrap gap-1.5">
          {items.map((item, index) =>
            index < items.length - 1 ? (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.name}
                </Link>
                <span aria-hidden="true" className="ml-1.5">
                  /
                </span>
              </li>
            ) : (
              <li key={item.href} aria-current="page" className="text-white">
                {item.name}
              </li>
            )
          )}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
      />
    </>
  );
}
