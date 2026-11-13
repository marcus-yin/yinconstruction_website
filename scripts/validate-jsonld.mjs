/**
 * Post-build JSON-LD validation (wired as `postbuild`).
 *
 * Scans every prerendered HTML page in .next/server/app for
 * <script type="application/ld+json"> blocks and fails the build if any:
 *   - is not valid JSON,
 *   - is missing @context / @type,
 *   - is missing the fields Google requires for that type, or
 *   - leaks an unfinished {{TODO}} content token into structured data.
 *
 * This keeps the schema trustworthy: content edits in content/site.ts can
 * never ship malformed or placeholder structured data unnoticed.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const APP_DIR = path.resolve(import.meta.dirname, "..", ".next", "server", "app");
const SCRIPT_RE =
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

/** Required top-level fields per schema type we emit. */
const REQUIRED_FIELDS = {
  GeneralContractor: ["name", "url", "telephone", "address", "areaServed"],
  Service: ["name", "serviceType", "provider", "areaServed", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
};

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const errors = [];
let blocks = 0;

for (const file of await htmlFiles(APP_DIR)) {
  const html = await readFile(file, "utf8");
  const rel = path.relative(APP_DIR, file);
  for (const match of html.matchAll(SCRIPT_RE)) {
    blocks += 1;
    let data;
    try {
      data = JSON.parse(match[1]);
    } catch (err) {
      errors.push(`${rel}: invalid JSON in ld+json block (${err.message})`);
      continue;
    }
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const type = item["@type"];
      if (!item["@context"] || !type) {
        errors.push(`${rel}: ld+json missing @context/@type`);
        continue;
      }
      for (const field of REQUIRED_FIELDS[type] ?? []) {
        const value = item[field];
        const missing =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0);
        if (missing) errors.push(`${rel}: ${type} missing required "${field}"`);
      }
      if (JSON.stringify(item).includes("{{TODO")) {
        errors.push(`${rel}: ${type} leaks a {{TODO}} token into schema`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`JSON-LD validation FAILED (${errors.length} problem(s)):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`JSON-LD validation passed: ${blocks} block(s) checked across prerendered pages.`);
