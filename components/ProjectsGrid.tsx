"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { projectsCapabilities, type Project, type ProjectCategory } from "@/content/site";
import ProjectCard from "@/components/ProjectCard";

const FILTERS = ["All", "Residential", "Commercial", "Renovation"] as const;
type Filter = (typeof FILTERS)[number];

/**
 * Filterable project grid. Accessible: the filter bar is a group of toggle
 * buttons with aria-pressed, and the result count is announced politely.
 */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === (filter as ProjectCategory));

  // No published projects at all: show an honest capabilities statement
  // instead of an empty gallery (no invented work).
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-steel-200 bg-mist p-8 lg:p-10">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900">
          {projectsCapabilities.heading}
        </h2>
        {projectsCapabilities.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 max-w-3xl leading-relaxed text-steel-700">
            {paragraph}
          </p>
        ))}
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {projectsCapabilities.capabilities.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-steel-800">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-navy-700" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/contact/"
          className="mt-8 inline-block rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Request an Estimate
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors ${
              filter === f
                ? "bg-navy-700 text-white"
                : "border border-steel-300 bg-white text-steel-700 hover:border-navy-700 hover:text-navy-900"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-steel-500">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-lg border border-dashed border-steel-300 bg-mist p-8 text-center text-steel-600">
          No projects published in this category yet.{" "}
          <Link href="/contact/" className="font-semibold text-navy-700 underline">
            Ask us about recent work
          </Link>
          .
        </p>
      )}
    </div>
  );
}
