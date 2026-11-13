import type { Metadata } from "next";
import PathwayPage from "@/components/PathwayPage";
import { company, pathways } from "@/content/site";

const pathway = pathways.find((p) => p.slug === "general-contractors")!;

export const metadata: Metadata = {
  title: "Drywall Subcontractor in Syracuse, NY",
  description:
    "Drywall, taping, metal stud framing, and acoustical ceilings for general contractors in Central New York. Request a subcontractor bid.",
  alternates: { canonical: "/general-contractors/" },
  openGraph: { url: "/general-contractors/" },
};

export default function GeneralContractorsPage() {
  return <PathwayPage pathway={pathway} />;
}
