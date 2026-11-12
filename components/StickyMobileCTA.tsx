import Link from "next/link";
import { Phone } from "lucide-react";
import { company } from "@/content/site";

/**
 * Sticky bottom bar on mobile: click-to-call + quote CTA.
 * Hidden on desktop. The footer reserves bottom padding so content
 * is never obscured.
 */
export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-steel-200 bg-white shadow-[0_-2px_8px_rgba(15,28,44,0.08)] lg:hidden">
      <a
        href={`tel:${company.phone.e164}`}
        className="flex items-center justify-center gap-2 py-3.5 font-heading text-sm font-semibold text-navy-900"
      >
        <Phone aria-hidden="true" className="h-4 w-4" />
        Call Us
      </a>
      <Link
        href="/contact/"
        className="flex items-center justify-center bg-accent-600 py-3.5 font-heading text-sm font-semibold text-white"
      >
        Get a Quote
      </Link>
    </div>
  );
}
