import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectsGrid from "@/components/ProjectsGrid";
import QuoteCTA from "@/components/QuoteCTA";
import { company, visibleProjects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Residential, commercial, and renovation projects by ${company.name} across Central New York: drywall, interiors, and finishing work.`,
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  const projects = visibleProjects();

  return (
    <>
      <PageHeader
        title="Our Projects"
        description="A look at the kind of work we do, from single-room repairs to full commercial fit-outs."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects/" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsGrid projects={projects} />
      </div>

      <QuoteCTA />
    </>
  );
}
