import type { Metadata } from "next";
import PathwayPage from "@/components/PathwayPage";
import { company, pathways } from "@/content/site";

const pathway = pathways.find((p) => p.slug === "homeowners")!;

export const metadata: Metadata = {
  title: "For Homeowners: Drywall & Interior Work",
  description: `Residential drywall installation, repair, basement finishing, renovations, and painting from ${company.name}, with free written estimates across Syracuse and Central New York.`,
  alternates: { canonical: "/homeowners/" },
};

export default function HomeownersPage() {
  return <PathwayPage pathway={pathway} />;
}
