import type { Metadata } from "next";
import PathwayPage from "@/components/PathwayPage";
import { company, pathways } from "@/content/site";

const pathway = pathways.find((p) => p.slug === "general-contractors")!;

export const metadata: Metadata = {
  title: "For General Contractors: Drywall Subcontracting",
  description: `Drywall installation, taping and finishing, metal stud framing, and acoustical ceilings for general contractors and commercial clients in Central New York. Request a subcontractor bid from ${company.name}.`,
  alternates: { canonical: "/general-contractors/" },
};

export default function GeneralContractorsPage() {
  return <PathwayPage pathway={pathway} />;
}
