// Generates placeholder SVG images into public/images/.
// Replace these with real photos before launch; keep the same filenames
// (or update lib/content.ts) and prefer appropriately sized JPG/WebP files.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(import.meta.dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

function escapeXml(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function svg(name, width, height, label, from, to) {
  label = escapeXml(label);
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <text x="50%" y="48%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width / 32)}" font-weight="bold" fill="rgba(255,255,255,0.85)">${label}</text>
  <text x="50%" y="56%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width / 56)}" fill="rgba(255,255,255,0.6)">Placeholder image — replace with a real photo</text>
</svg>
`;
  writeFileSync(join(outDir, name), content);
  console.log("wrote", name);
}

svg("hero.svg", 1920, 1080, "Hero Image", "#0f172a", "#334155");
svg("about.svg", 1200, 900, "Team / Jobsite Photo", "#1e293b", "#475569");

const services = [
  ["service-residential.svg", "Residential Construction"],
  ["service-commercial.svg", "Commercial Construction"],
  ["service-renovation.svg", "Renovation & Remodeling"],
  ["service-roofing.svg", "Roofing & Exteriors"],
  ["service-concrete.svg", "Concrete & Masonry"],
  ["service-management.svg", "Project Management"],
];
for (const [name, label] of services) {
  svg(name, 1280, 720, label, "#1e293b", "#64748b");
}

for (let i = 1; i <= 6; i++) {
  svg(`project-${i}.svg`, 1200, 900, `Project Photo ${i}`, "#292524", "#57534e");
}
