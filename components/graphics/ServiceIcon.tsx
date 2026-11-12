/**
 * Consistent line-style service icons: 24x24, stroke 1.75, rounded caps.
 * Decorative by default (aria-hidden); pass a `title` to expose a label.
 */
export type ServiceIconName =
  | "drywall-sheet"
  | "taping-knife"
  | "patch"
  | "commercial"
  | "renovation"
  | "paint-roller"
  | "framing"
  | "ceiling"
  | "clipboard";

const PATHS: Record<ServiceIconName, React.ReactNode> = {
  /* Drywall sheet with center seam and fasteners */
  "drywall-sheet": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M12 4v16" />
      <path d="M7 8h.01M7 16h.01M17 8h.01M17 16h.01" strokeWidth="2.2" />
    </>
  ),
  /* Taping knife: wide blade, short handle */
  "taping-knife": (
    <>
      <path d="M5 14h14l-2.5-5h-9L5 14z" />
      <path d="M12 9V7" />
      <rect x="10.25" y="3" width="3.5" height="4" rx="1" />
      <path d="M5 14c2.5 1.2 4.5 1.8 7 1.8s4.5-.6 7-1.8" />
    </>
  ),
  /* Wall patch: crack repaired with a patch square */
  patch: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M8 3l1.5 4L7 10l2 3" />
      <rect x="11" y="12" width="7" height="6" rx="0.5" strokeDasharray="2.4 1.8" />
    </>
  ),
  /* Commercial building with window grid */
  commercial: (
    <>
      <path d="M3 21h18" />
      <rect x="5" y="3" width="14" height="18" />
      <path d="M5 8h14M5 13h14M12 3v10" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  /* Renovation: hammer */
  renovation: (
    <>
      <path d="M3 21l7-7" />
      <path d="M14.5 4.5l5 5-2.3 2.3a1.6 1.6 0 01-2.3 0l-2.7-2.7a1.6 1.6 0 010-2.3l2.3-2.3z" />
      <path d="M13 6l-2-2 1.5-1.5c1.5-.5 3 0 4 1" />
    </>
  ),
  /* Paint roller */
  "paint-roller": (
    <>
      <rect x="2.75" y="4" width="13" height="5.5" rx="1.5" />
      <path d="M15.75 6.75h3a2 2 0 012 2v1.5a2 2 0 01-2 2h-6.25v3.25" />
      <rect x="11.5" y="15.5" width="2" height="5.5" rx="1" />
    </>
  ),
  /* Stud framing: plates and studs */
  framing: (
    <>
      <path d="M3 5h18M3 19h18" />
      <path d="M6 5v14M12 5v14M18 5v14" />
    </>
  ),
  /* Suspended ceiling grid tile */
  ceiling: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 12h18M9 5v14M15 5v14" />
    </>
  ),
  /* Project clipboard with check */
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4a3 3 0 016 0" />
      <path d="M9 13l2 2 4-4.5" />
    </>
  ),
};

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
  /** Provide to expose an accessible name; otherwise the icon is decorative. */
  title?: string;
};

export default function ServiceIcon({ name, className = "h-6 w-6", title }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}
