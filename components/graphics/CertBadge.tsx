/**
 * Badge-style SVG graphics for the Certifications page. No third-party
 * logos - generic rosette badges with a line icon. Decorative.
 */
export type CertBadgeType = "document" | "shield" | "hardhat" | "ribbon";

const ICONS: Record<CertBadgeType, React.ReactNode> = {
  document: (
    <>
      <rect x="22" y="18" width="20" height="28" rx="2" />
      <path d="M27 26h10M27 31h10M27 36h6" />
    </>
  ),
  shield: (
    <>
      <path d="M32 16l11 4.5V30c0 7.5-4.6 12.5-11 15-6.4-2.5-11-7.5-11-15v-9.5L32 16z" />
      <path d="M26.5 30.5l4 4 7-8" />
    </>
  ),
  hardhat: (
    <>
      <path d="M19 38a13 13 0 0126 0" />
      <path d="M16 38h32" />
      <path d="M28 27v-6h8v6" />
    </>
  ),
  ribbon: (
    <>
      <circle cx="32" cy="27" r="10" />
      <path d="M26.5 35.5L23 47l9-5 9 5-3.5-11.5" />
    </>
  ),
};

export default function CertBadge({
  type,
  className = "h-16 w-16",
}: {
  type: CertBadgeType;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="30" fill="#EEF2F6" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#1F3A5F" strokeWidth="2" />
      <circle
        cx="32"
        cy="32"
        r="25.5"
        fill="none"
        stroke="#8BA3C2"
        strokeWidth="1"
        strokeDasharray="3.5 3"
      />
      <g fill="none" stroke="#1F3A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[type]}
      </g>
    </svg>
  );
}
