import { serviceAreas } from "@/content/site";

/**
 * Stylized SVG map of Central New York, data-driven from content/site.ts.
 * Towns are plotted on a simplified regional shape with a dashed service
 * radius ring around the hub (Syracuse). Not to scale — illustrative only.
 */
export default function ServiceAreaMap({ className = "" }: { className?: string }) {
  const hub = serviceAreas.find((a) => a.hub);
  const names = serviceAreas.map((a) => a.name).join(", ");

  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Stylized map of Central New York showing our service area: ${names}`}
      className={className}
    >
      {/* Lake Ontario hint, top-left */}
      <g stroke="#A8B6C4" strokeWidth="0.8" fill="none" opacity="0.9">
        <path d="M2 12 q6 -3 12 0 t12 0" />
        <path d="M4 18 q6 -3 12 0 t12 0" />
      </g>
      <text x="16" y="7" textAnchor="middle" fontSize="3.4" fill="#8A99A8" fontStyle="italic">
        Lake Ontario
      </text>

      {/* stylized regional shape */}
      <path
        d="M30 22
           Q42 12 58 16 Q78 14 88 26 Q96 38 92 54
           Q90 72 74 84 Q56 96 38 92 Q20 88 12 72
           Q6 56 12 42 Q18 28 30 22 Z"
        fill="#EEF2F6"
        stroke="#C6D0DA"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* service radius ring around the hub */}
      {hub && (
        <>
          <circle
            cx={hub.mapX}
            cy={hub.mapY}
            r="27"
            fill="none"
            stroke="#8BA3C2"
            strokeWidth="0.9"
            strokeDasharray="2.6 2"
          />
          <text
            x={hub.mapX}
            y={hub.mapY - 29.5}
            textAnchor="middle"
            fontSize="3"
            fill="#6E7E8F"
          >
            service radius
          </text>
        </>
      )}

      {/* town markers and labels */}
      {serviceAreas.map((area) => (
        <g key={area.name}>
          {area.hub && (
            <circle cx={area.mapX} cy={area.mapY} r="4" fill="none" stroke="#1F3A5F" strokeWidth="0.8" />
          )}
          <circle
            cx={area.mapX}
            cy={area.mapY}
            r={area.hub ? 2.4 : 1.7}
            fill={area.hub ? "#16293F" : "#1F3A5F"}
          />
          <text
            x={area.mapX}
            y={area.mapY + (area.hub ? 8.4 : 5.6)}
            textAnchor="middle"
            fontSize={area.hub ? 4 : 3.4}
            fontWeight={area.hub ? 700 : 400}
            fill="#38434F"
          >
            {area.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
