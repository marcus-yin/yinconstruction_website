/**
 * Angled SVG divider between section bands. Takes the color of the section
 * it points INTO via `currentColor` — wrap in a text-{color} container or
 * pass a text color class. Decorative only.
 */
type SectionDividerProps = {
  /** Flip the angle direction */
  flip?: boolean;
  className?: string;
};

export default function SectionDivider({ flip = false, className = "" }: SectionDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`block h-8 w-full sm:h-12 ${className}`}
    >
      <polygon
        points={flip ? "0,0 1440,48 0,48" : "1440,0 1440,48 0,48"}
        fill="currentColor"
      />
    </svg>
  );
}
