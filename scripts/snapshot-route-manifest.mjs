import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Snapshot the exported static site into an explicit, reversible route manifest.
 *
 * Usage: node scripts/snapshot-route-manifest.mjs <outDir> <manifestOut> [auxiliaryJson]
 *
 * Every non-auxiliary exported route becomes exactly one record. Root and /en
 * routes are `keep`; the four selected legacy routes plus the whole /ru
 * compatibility set become `static-alias` records that point directly at a
 * distinct `keep` destination (no chains).
 */

const outDir = path.resolve(process.argv[2] ?? "out");
const manifestOut = path.resolve(process.argv[3] ?? "config/v3-route-manifest.json");
const auxiliaryJson = path.resolve(
  process.argv[4] ?? "config/v3-export-auxiliary-paths.json"
);

const SELECTED_ALIASES = {
  "/writing": "/blog",
  "/handbook": "/ai-platform",
  "/handbook/platform-map": "/ai-platform/map",
  "/handbook/caching/prefix-cache": "/ai-platform/components/prefix-cache"
};

function fail(message) {
  console.error(`snapshot-route-manifest: ${message}`);
  process.exit(1);
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function loadAuxiliarySet() {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(auxiliaryJson, "utf8"));
  } catch (error) {
    fail(`unable to read auxiliary paths from ${auxiliaryJson}: ${error.message}`);
  }
  if (!Array.isArray(parsed) || parsed.some((entry) => typeof entry !== "string")) {
    fail("auxiliary paths file must be an array of strings");
  }
  return new Set(parsed.map((entry) => toPosix(entry)));
}

function enumerateHtmlFiles(root) {
  const files = [];
  const walk = (absoluteDir) => {
    for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
      const absolute = path.join(absoluteDir, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        const relative = toPosix(path.relative(root, absolute));
        const isTopLevel = !relative.includes("/");
        if (entry.name === "index.html" || isTopLevel) {
          files.push(relative);
        }
      }
    }
  };
  walk(root);
  return files;
}

function fileToRoute(relativeFile) {
  if (relativeFile === "index.html") return "/";
  if (relativeFile.endsWith("/index.html")) {
    return `/${relativeFile.slice(0, -"/index.html".length)}`;
  }
  // Top-level non-index HTML file, e.g. 404.html -> /404
  return `/${relativeFile.slice(0, -".html".length)}`;
}

function inferLocale(route) {
  return route === "/en" || route.startsWith("/en/") ? "en" : "ru";
}

function flattenRu(route) {
  if (route === "/ru") return "/";
  const rest = route.slice("/ru".length);
  return SELECTED_ALIASES[rest] ?? rest;
}

function decide(route) {
  if (route === "/ru" || route.startsWith("/ru/")) {
    return { source: route, destination: flattenRu(route), behavior: "static-alias", locale: "ru" };
  }
  if (Object.prototype.hasOwnProperty.call(SELECTED_ALIASES, route)) {
    return {
      source: route,
      destination: SELECTED_ALIASES[route],
      behavior: "static-alias",
      locale: "ru"
    };
  }
  return { source: route, destination: null, behavior: "keep", locale: inferLocale(route) };
}

const auxiliary = loadAuxiliarySet();
const htmlFiles = enumerateHtmlFiles(outDir);

const routes = new Map();
for (const file of htmlFiles) {
  if (auxiliary.has(file)) continue;
  const route = fileToRoute(file);
  if (routes.has(route)) {
    fail(`duplicate route ${route} from files ${routes.get(route)} and ${file}`);
  }
  routes.set(route, file);
}

const records = [...routes.keys()].map(decide);
records.sort((a, b) => (a.source < b.source ? -1 : a.source > b.source ? 1 : 0));

// Internal consistency: every alias destination must be a distinct keep record.
const keepSources = new Set(records.filter((r) => r.behavior === "keep").map((r) => r.source));
for (const record of records) {
  if (record.behavior === "static-alias" && !keepSources.has(record.destination)) {
    fail(
      `alias ${record.source} -> ${record.destination} does not resolve to a keep route in the export`
    );
  }
}

const serialized = records.map((record) => ({
  source: record.source,
  destination: record.destination,
  behavior: record.behavior,
  locale: record.locale
}));

writeFileSync(manifestOut, `${JSON.stringify(serialized, null, 2)}\n`, "utf8");

const keepCount = records.filter((r) => r.behavior === "keep").length;
const aliasCount = records.filter((r) => r.behavior === "static-alias").length;
console.log(
  `Route manifest written to ${manifestOut}: ${records.length} records, ${keepCount} keep, ${aliasCount} static-alias.`
);
