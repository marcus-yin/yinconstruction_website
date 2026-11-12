/**
 * Subtle blueprint-style grid background. Absolutely positioned — place
 * inside a `relative` container. Decorative only (aria-hidden).
 */
type BlueprintGridProps = {
  /** "light" for pale backgrounds (navy lines), "dark" for navy backgrounds (white lines) */
  tone?: "light" | "dark";
  className?: string;
};

export default function BlueprintGrid({
  tone = "light",
  className = "",
}: BlueprintGridProps) {
  const minor = tone === "light" ? "rgba(31,58,95,0.07)" : "rgba(255,255,255,0.06)";
  const major = tone === "light" ? "rgba(31,58,95,0.12)" : "rgba(255,255,255,0.1)";
  const id = `bp-grid-${tone}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          {/* minor grid */}
          <path
            d="M24 0V96M48 0V96M72 0V96M0 24H96M0 48H96M0 72H96"
            stroke={minor}
            strokeWidth="1"
          />
          {/* major grid */}
          <path d="M96 0V96M0 96H96" stroke={major} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
