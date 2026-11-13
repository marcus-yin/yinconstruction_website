import BlueprintGrid from "@/components/graphics/BlueprintGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/schema";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** Breadcrumb trail ending with the current page (adds BreadcrumbList schema). */
  breadcrumbs?: BreadcrumbItem[];
};

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative bg-navy-900">
      <BlueprintGrid tone="dark" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy-100">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
