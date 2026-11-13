import type { Metadata } from "next";
import PathwayPage from "@/components/PathwayPage";
import { company, pathways } from "@/content/site";

const pathway = pathways.find((p) => p.slug === "homeowners")!;

export const metadata: Metadata = {
  title: "Residential Drywall in Syracuse, NY",
  description:
    "Residential drywall installation, repair, basement finishing, and painting in Syracuse and Central New York, with free written estimates.",
  alternates: { canonical: "/homeowners/" },
  openGraph: { url: "/homeowners/" },
};

export default function HomeownersPage() {
  return <PathwayPage pathway={pathway} />;
}
