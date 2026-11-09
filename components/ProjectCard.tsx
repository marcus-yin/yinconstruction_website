import Image from "next/image";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={project.image}
          alt={`${project.title} (placeholder image)`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-800">
            {project.category}
          </span>
          <span className="text-slate-500">{project.location}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>
      </div>
    </article>
  );
}
