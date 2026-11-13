/**
 * Generates the site's brand assets at build time (wired as `prebuild`):
 *
 *   public/og-image.png        1200x630 Open Graph / Twitter card image
 *   public/favicon.svg         vector favicon (geometric "Y" monogram)
 *   public/favicon-32.png      32px favicon
 *   public/apple-touch-icon.png  180px iOS home-screen icon
 *   public/icon-192.png        192px manifest icon
 *   public/icon-512.png        512px manifest icon
 *
 * Uses satori (SVG layout with real Poppins font files from
 * @fontsource/poppins) + sharp (SVG -> PNG). No network access needed.
 * Palette matches app/globals.css: navy #16293f, steel #b9c5d1,
 * safety-orange accent #d3671f, mist #eef2f6.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

const require = createRequire(import.meta.url);

const NAVY = "#16293f";
const STEEL = "#b9c5d1";
const ORANGE = "#d3671f";
const WHITE = "#ffffff";

const COMPANY = "YIN Construction";
const TAGLINE = "Drywall & interior construction for Central New York";
const DOMAIN = "yinconstruction.com";

const publicDir = path.resolve(import.meta.dirname, "..", "public");

/** Geometric "Y" monogram on a navy rounded square - no text rendering. */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${NAVY}"/>
  <path d="M19 15 L32 34 L45 15" fill="none" stroke="${WHITE}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 34 L32 50" fill="none" stroke="${ORANGE}" stroke-width="7" stroke-linecap="round"/>
</svg>
`;

async function loadFont(file) {
  return readFile(require.resolve(`@fontsource/poppins/files/${file}`));
}

async function generateOgImage() {
  const [semibold, bold] = await Promise.all([
    loadFont("poppins-latin-600-normal.woff"),
    loadFont("poppins-latin-700-normal.woff"),
  ]);

  // satori element tree (object JSX): navy canvas, blueprint-style rules,
  // monogram mark, company name, tagline, domain with orange accent.
  const el = (type, style, children = undefined) => ({
    type,
    props: { style, children },
  });

  const svg = await satori(
    el(
      "div",
      {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: NAVY,
        padding: "80px",
        fontFamily: "Poppins",
        position: "relative",
      },
      [
        // Blueprint grid accents
        el("div", {
          position: "absolute",
          left: "0px",
          top: "140px",
          width: "1200px",
          height: "1px",
          backgroundColor: "rgba(185,197,209,0.18)",
        }),
        el("div", {
          position: "absolute",
          left: "0px",
          top: "490px",
          width: "1200px",
          height: "1px",
          backgroundColor: "rgba(185,197,209,0.18)",
        }),
        el("div", {
          position: "absolute",
          left: "1040px",
          top: "0px",
          width: "1px",
          height: "630px",
          backgroundColor: "rgba(185,197,209,0.18)",
        }),
        // Orange accent bar
        el("div", {
          width: "96px",
          height: "10px",
          backgroundColor: ORANGE,
          marginBottom: "36px",
        }),
        el(
          "div",
          {
            display: "flex",
            fontSize: "76px",
            fontWeight: 700,
            color: WHITE,
            lineHeight: 1.1,
          },
          COMPANY
        ),
        el(
          "div",
          {
            display: "flex",
            marginTop: "24px",
            fontSize: "34px",
            fontWeight: 600,
            color: STEEL,
            lineHeight: 1.35,
            maxWidth: "900px",
          },
          TAGLINE
        ),
        el(
          "div",
          {
            display: "flex",
            marginTop: "56px",
            fontSize: "26px",
            fontWeight: 600,
            color: ORANGE,
          },
          DOMAIN
        ),
      ]
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
      ],
    }
  );

  await sharp(Buffer.from(svg)).png().toFile(path.join(publicDir, "og-image.png"));
}

async function generateIcons() {
  await writeFile(path.join(publicDir, "favicon.svg"), faviconSvg);
  const svgBuffer = Buffer.from(faviconSvg);
  const sizes = [
    [32, "favicon-32.png"],
    [180, "apple-touch-icon.png"],
    [192, "icon-192.png"],
    [512, "icon-512.png"],
  ];
  for (const [size, file] of sizes) {
    await sharp(svgBuffer, { density: Math.ceil((size / 64) * 72) })
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, file));
  }
}

await mkdir(publicDir, { recursive: true });
await generateOgImage();
await generateIcons();
console.log("Brand assets generated in public/.");
