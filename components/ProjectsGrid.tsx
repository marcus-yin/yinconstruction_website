"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/content/site";
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
