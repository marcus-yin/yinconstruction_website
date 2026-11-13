import { localBusinessSchema } from "@/lib/schema";

/**
 * Site-wide LocalBusiness (GeneralContractor) structured data, rendered in
 * the root layout. Built from content/site.ts via lib/schema.ts; fields
 * still carrying {{TODO}} tokens are omitted until real values exist.
 */
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
    />
  );
}
