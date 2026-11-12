import Image from "next/image";
import type { Project, ProjectCategory } from "@/content/site";
import BlueprintGrid from "@/components/graphics/BlueprintGrid";
import ServiceIcon, { type ServiceIconName } from "@/components/graphics/ServiceIcon";

/** Category → generated header graphic styling */
const CATEGORY_STYLE: Record<
  ProjectCategory,
  { bg: string; chip: string; icon: ServiceIconName }
> = {
  Residential: { bg: "bg-navy-700", chip: "bg-navy-100 text-navy-900", icon: "drywall-sheet" },
  Commercial: { bg: "bg-steel-700", chip: "bg-steel-100 text-steel-800", icon: "commercial" },
  Renovation: { bg: "bg-navy-900", chip: "bg-navy-100 text-navy-900", icon: "renovation" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const style = CATEGORY_STYLE[project.category];

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-steel-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Header: optional photo slot, otherwise a generated graphic */}
      <div className={`relative aspect-[16/9] w-full ${style.bg}`}>
        {project.photo ? (
          <Image
            src={project.photo.src}
            alt={project.photo.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <BlueprintGrid tone="dark" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ServiceIcon name={style.icon} className="h-14 w-14 text-white/85" />
            </div>
          </>
        )}
        {project.sample && (
          <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-steel-700">
            Sample
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className={`rounded-full px-2.5 py-0.5 ${style.chip}`}>{project.category}</span>
          <span className="text-steel-500">{project.location}</span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold text-navy-900">{project.title}</h3>
        <ul className="mt-3 flex-1 space-y-1.5">
          {project.scope.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-steel-700">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-steel-400" />
              {item}
            </li>
          ))}
        </ul>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-steel-100 pt-4 text-sm">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-steel-500">Size</dt>
            <dd className="mt-0.5 break-words text-steel-800">{project.sqft}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-steel-500">Duration</dt>
            <dd className="mt-0.5 break-words text-steel-800">{project.duration}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
