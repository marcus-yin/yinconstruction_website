/**
 * Isometric line illustration of a layered wall assembly:
 * stud framing → insulation → drywall → finish. Navy/steel palette,
 * code-native (no photography).
 */
export default function IsometricHero({ className = "" }: { className?: string }) {
  // Each layer is a vertical panel drawn in a simple isometric projection.
  // Panel i's front face: (x, top) -> (x+W, top-RISE) -> (x+W, bottom-RISE) -> (x, bottom)
  const W = 86;
  const RISE = 44;
  const TOP = 128;
  const BOTTOM = 330;
  const X0 = 30;
  const GAP = 112;

  const panel = (i: number) => {
    const x = X0 + i * GAP;
    return `M${x} ${TOP} L${x + W} ${TOP - RISE} L${x + W} ${BOTTOM - RISE} L${x} ${BOTTOM} Z`;
  };
  // top edge (thickness) of each panel
  const topEdge = (i: number) => {
    const x = X0 + i * GAP;
    return `M${x} ${TOP} L${x + 14} ${TOP - 8} L${x + W + 14} ${TOP - RISE - 8} L${x + W} ${TOP - RISE}`;
  };

  const labels = ["Stud framing", "Insulation", "Drywall", "Finish coat"];

  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="Isometric illustration of a wall assembly built up in four layers: stud framing, insulation, drywall, and finish coat"
      className={className}
    >
      {/* ground shadow */}
      <ellipse cx="250" cy="348" rx="230" ry="18" fill="#DEE5EC" opacity="0.6" />

      {[0, 1, 2, 3].map((i) => {
        const x = X0 + i * GAP;
        return (
          <g key={i} stroke="#1F3A5F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            {/* top thickness edge */}
            <path d={topEdge(i)} fill="#D9E2EE" />
            {/* front face */}
            <path d={panel(i)} fill={i === 3 ? "#FFFFFF" : "#EEF2F6"} />

            {/* layer-specific interior detail */}
            {i === 0 && (
              <g stroke="#5B6B7C" strokeWidth="1.75">
                {/* plates */}
                <path d={`M${x} ${TOP + 12} L${x + W} ${TOP + 12 - RISE}`} />
                <path d={`M${x} ${BOTTOM - 12} L${x + W} ${BOTTOM - 12 - RISE}`} />
                {/* studs */}
                <path d={`M${x + 22} ${TOP + 12 - RISE * (22 / W)} V${BOTTOM - 12 - RISE * (22 / W)}`} />
                <path d={`M${x + 43} ${TOP + 12 - RISE * (43 / W)} V${BOTTOM - 12 - RISE * (43 / W)}`} />
                <path d={`M${x + 64} ${TOP + 12 - RISE * (64 / W)} V${BOTTOM - 12 - RISE * (64 / W)}`} />
              </g>
            )}
            {i === 1 && (
              <g stroke="#5B6B7C" strokeWidth="1.5" fill="none">
                {/* insulation batt squiggles */}
                {[20, 43, 66].map((off) => {
                  const cx = x + off;
                  const cTop = TOP + 18 - RISE * (off / W);
                  const cBot = BOTTOM - 18 - RISE * (off / W);
                  const h = cBot - cTop;
                  const seg = h / 6;
                  let d = `M${cx} ${cTop}`;
                  for (let s = 0; s < 6; s++) {
                    const dir = s % 2 === 0 ? 7 : -7;
                    d += ` q${dir} ${seg / 2} 0 ${seg}`;
                  }
                  return <path key={off} d={d} />;
                })}
              </g>
            )}
            {i === 2 && (
              <g>
                {/* center seam */}
                <path
                  d={`M${x + 43} ${TOP - RISE * (43 / W) + 4} V${BOTTOM - RISE * (43 / W) - 4}`}
                  stroke="#5B6B7C"
                  strokeWidth="1.5"
                />
                {/* fasteners */}
                {[0.22, 0.5, 0.78].map((fy) =>
                  [16, 70].map((fx) => {
                    const px = x + fx;
                    const py = TOP + (BOTTOM - TOP) * fy - RISE * (fx / W);
                    return <circle key={`${fx}-${fy}`} cx={px} cy={py} r="2" fill="#5B6B7C" stroke="none" />;
                  })
                )}
              </g>
            )}
            {i === 3 && (
              <g stroke="#C6D0DA" strokeWidth="1.75">
                {/* sheen lines on the finished surface */}
                <path d={`M${x + 16} ${TOP + 38 - RISE * (16 / W)} l34 ${-RISE * (34 / W)}`} />
                <path d={`M${x + 16} ${TOP + 58 - RISE * (16 / W)} l54 ${-RISE * (54 / W)}`} />
              </g>
            )}
          </g>
        );
      })}

      {/* labels with leader ticks */}
      {labels.map((label, i) => {
        const x = X0 + i * GAP + W / 2;
        return (
          <g key={label}>
            <path d={`M${x} ${BOTTOM - RISE / 2 + 4} V${366}`} stroke="#8A99A8" strokeWidth="1" strokeDasharray="3 3" />
            <text
              x={x}
              y="384"
              textAnchor="middle"
              fontSize="14"
              fill="#495766"
              fontFamily="inherit"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
