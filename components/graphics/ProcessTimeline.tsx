import type { ProcessStep } from "@/content/site";

/**
 * Numbered process timeline: vertical on mobile, horizontal on desktop.
 * Pure CSS/HTML — no images.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-5 lg:block">
            {/* connector: vertical (mobile) / horizontal (desktop) */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-12 -bottom-10 w-px bg-steel-200 lg:left-12 lg:right-[-0.75rem] lg:top-5 lg:bottom-auto lg:h-px lg:w-auto"
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-700 font-heading text-base font-semibold text-white lg:mb-4"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="font-heading text-base font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-steel-600">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
