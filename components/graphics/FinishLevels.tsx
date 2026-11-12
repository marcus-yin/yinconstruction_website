export type FinishLevel = {
  level: number;
  name: string;
  blurb: string;
};

/**
 * Small SVG diagram illustrating drywall finish levels 0–5: each panel
 * shows progressively fewer visible joints/fasteners until Level 5 (smooth).
 * Level data comes from content/site.ts.
 */
export default function FinishLevels({ levels }: { levels: FinishLevel[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {levels.map(({ level, name, blurb }) => {
        // Visual roughness decreases as the level rises
        const showSeam = level <= 2;
        const showFasteners = level <= 1;
        const speckles = Math.max(0, 4 - level);
        return (
          <li key={level} className="flex flex-col">
            <svg
              viewBox="0 0 80 56"
              aria-hidden="true"
              className="w-full rounded-md border border-steel-200 bg-white"
            >
              <rect x="0" y="0" width="80" height="56" fill={level === 5 ? "#FFFFFF" : "#F7F9FB"} />
              {showSeam && (
                <path d="M40 4 V52" stroke="#A8B6C4" strokeWidth={level === 0 ? 2.5 : 1.5} />
              )}
              {level >= 1 && level <= 3 && (
                <path d="M40 4 V52" stroke="#DEE5EC" strokeWidth={14 - level * 3} opacity="0.8" />
              )}
              {showFasteners &&
                [14, 28, 42].map((y) => (
                  <g key={y} fill="#8A99A8">
                    <circle cx="14" cy={y} r="1.6" />
                    <circle cx="66" cy={y} r="1.6" />
                  </g>
                ))}
              {Array.from({ length: speckles * 5 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i * 37) % 76 + 2}
                  cy={(i * 23) % 48 + 4}
                  r="0.9"
                  fill="#C6D0DA"
                />
              ))}
              {level === 5 && (
                <path d="M10 44 L34 20 M22 48 L54 16" stroke="#EEF2F6" strokeWidth="3" strokeLinecap="round" />
              )}
            </svg>
            <div className="mt-2">
              <div className="font-heading text-sm font-semibold text-navy-900">
                Level {level}
              </div>
              <div className="text-xs font-medium text-steel-600">{name}</div>
              <p className="mt-1 text-xs leading-relaxed text-steel-500">{blurb}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
