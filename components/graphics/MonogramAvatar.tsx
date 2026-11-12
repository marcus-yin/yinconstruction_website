/**
 * SVG monogram circle used instead of headshots. Decorative - the member's
 * name is rendered as adjacent text by the caller.
 */
export default function MonogramAvatar({
  label,
  className = "h-20 w-20",
}: {
  label: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="30.5" fill="#D9E2EE" stroke="#8BA3C2" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#B7C7DB" strokeWidth="1" strokeDasharray="3 3" />
      <text
        x="32"
        y="32"
        dy="0.36em"
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="#1B3250"
        fontFamily="inherit"
      >
        {label}
      </text>
    </svg>
  );
}
