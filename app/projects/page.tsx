import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import QuoteCTA from "@/components/QuoteCTA";
import { projects, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: `Browse projects by ${siteConfig.name}, serving Central New York. Residential, commercial, renovation, roofing, and concrete work.`,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Our Projects"
        description="The entries below are placeholder samples, not real completed projects. Replace them with your own work — with photos and client permission — before launch."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}
