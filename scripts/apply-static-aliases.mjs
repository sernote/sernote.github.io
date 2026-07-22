import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Materialize every `static-alias` route in the manifest into a self-contained,
 * target-canonical alias page inside the exported site.
 *
 * Usage: node scripts/apply-static-aliases.mjs <outDir> [manifestJson] [auxiliaryJson]
 *
 * The run is fail-closed and atomic: a complete preflight validates the manifest
 * and every path before anything is written, replacements are prepared in
 * temporary siblings, and if any commit-phase rename fails, every already-written
 * source is restored to its original bytes. `keep` files are never touched.
 */

const outDirArg = process.argv[2] ?? "out";
const manifestArg = process.argv[3] ?? "config/v3-route-manifest.json";
const auxiliaryArg = process.argv[4] ?? "config/v3-export-auxiliary-paths.json";
// Fault-injection hook used only by the atomic-rollback reliability test.
const fault = process.env.APPLY_STATIC_ALIASES_FAULT ?? "";

function fail(message) {
  console.error(`apply-static-aliases: ${message}`);
  process.exit(1);
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

let realExportRoot;
try {
  realExportRoot = realpathSync(path.resolve(outDirArg));
} catch {
  fail(`export directory not found: ${outDirArg}`);
}

function isContained(absoluteRealPath) {
  const rel = path.relative(realExportRoot, absoluteRealPath);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.replace(/\/+$/, "");
}

function assertSafeRoute(route, label) {
  if (typeof route !== "string" || !route.startsWith("/")) {
    fail(`${label} route must start with "/": ${JSON.stringify(route)}`);
  }
  if (/[\\?#]/.test(route)) {
    fail(`${label} route has an invalid character (backslash/query/fragment): ${JSON.stringify(route)}`);
  }
  if (route.includes("..")) {
    fail(`${label} route contains a traversal segment: ${JSON.stringify(route)}`);
  }
  if (/%2e|%2f|%5c/i.test(route)) {
    fail(`${label} route contains encoded traversal: ${JSON.stringify(route)}`);
  }
  if (route.includes("//")) {
    fail(`${label} route contains an empty segment: ${JSON.stringify(route)}`);
  }
}

function routeToFile(route) {
  if (route === "/") return "index.html";
  return `${route.slice(1)}/index.html`;
}

function assertRegularContainedFile(absPath, label) {
  let real;
  try {
    if (lstatSync(absPath).isSymbolicLink()) {
      fail(`${label} is a symlink, which is not allowed inside the export`);
    }
    real = realpathSync(absPath);
  } catch {
    fail(`${label} file is missing: ${toPosix(path.relative(realExportRoot, absPath))}`);
  }
  if (!isContained(real)) {
    fail(`${label} escapes the export root`);
  }
  if (!statSync(real).isFile()) {
    fail(`${label} is not a regular file`);
  }
}

function loadJson(file, label) {
  try {
    return JSON.parse(readFileSync(path.resolve(file), "utf8"));
  } catch (error) {
    fail(`unable to read ${label} from ${file}: ${error.message}`);
  }
}

function enumerateRoutes(auxiliary) {
  const routes = new Set();
  const walk = (absoluteDir) => {
    for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
      const absolute = path.join(absoluteDir, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        const relative = toPosix(path.relative(realExportRoot, absolute));
        const isTopLevel = !relative.includes("/");
        if ((entry.name === "index.html" || isTopLevel) && !auxiliary.has(relative)) {
          const route =
            relative === "index.html"
              ? "/"
              : relative.endsWith("/index.html")
                ? `/${relative.slice(0, -"/index.html".length)}`
                : `/${relative.slice(0, -".html".length)}`;
          routes.add(route);
        }
      }
    }
  };
  walk(realExportRoot);
  return routes;
}

function extractCanonical(html, label) {
  const links = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)]
    .map((match) => /\bhref=["']([^"']+)["']/i.exec(match[0]))
    .filter(Boolean)
    .map((match) => match[1]);
  if (links.length !== 1) {
    fail(`${label} must declare exactly one canonical, found ${links.length}`);
  }
  return links[0];
}

const ALIAS_COPY = {
  ru: {
    title: "Страница переехала",
    description: "Этот адрес сохранён для старых ссылок; актуальная версия доступна по канонической ссылке.",
    skip: "Перейти к содержанию",
    heading: "Страница переехала",
    body: "Этот адрес сохранён для старых ссылок. Актуальная версия материала теперь находится здесь.",
    cta: "Перейти к актуальной странице"
  },
  en: {
    title: "This page has moved",
    description: "This address is kept for older links; the current version is at the canonical URL.",
    skip: "Skip to content",
    heading: "This page has moved",
    body: "This address is kept for older links. The current version of the material now lives here.",
    cta: "Go to the current page"
  }
};

function buildAliasHtml(plan) {
  const lang = plan.locale === "en" ? "en" : "ru";
  const copy = ALIAS_COPY[lang];
  return [
    "<!doctype html>",
    `<html lang="${lang}">`,
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${copy.title}</title>`,
    `<meta name="description" content="${copy.description}">`,
    `<link rel="canonical" href="${plan.canonical}">`,
    '<meta name="robots" content="noindex, follow">',
    `<meta http-equiv="refresh" content="0; url=${plan.localPath}">`,
    "</head>",
    "<body>",
    `<a href="#main-content" class="skip-link">${copy.skip}</a>`,
    '<main id="main-content">',
    `<h1>${copy.heading}</h1>`,
    `<p>${copy.body}</p>`,
    `<p><a href="${plan.localPath}">${copy.cta}</a></p>`,
    "</main>",
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function assertAliasStructure(html, label) {
  const skipLinks = html.match(/<a\b[^>]*href=["']#main-content["'][^>]*>/gi) ?? [];
  const mains = html.match(/<main\b[^>]*\bid=["']main-content["'][^>]*>/gi) ?? [];
  const allMains = html.match(/<main\b/gi) ?? [];
  if (skipLinks.length !== 1 || mains.length !== 1 || allMains.length !== 1) {
    fail(`${label} must have exactly one skip link and one main#main-content`);
  }
  if (!/name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(html)) {
    fail(`${label} must declare noindex, follow`);
  }
}

// ---- Preflight -----------------------------------------------------------

const auxiliaryList = loadJson(auxiliaryArg, "auxiliary paths");
if (!Array.isArray(auxiliaryList) || auxiliaryList.some((entry) => typeof entry !== "string")) {
  fail("auxiliary paths file must be an array of strings");
}
const auxiliary = new Set(auxiliaryList.map((entry) => toPosix(entry)));

const manifest = loadJson(manifestArg, "route manifest");
if (!Array.isArray(manifest)) {
  fail("route manifest must be an array of records");
}

const seen = new Set();
const keepSources = new Set();
const aliases = [];

for (const record of manifest) {
  if (typeof record !== "object" || record === null || typeof record.source !== "string") {
    fail("every manifest record must be an object with a string source");
  }
  assertSafeRoute(record.source, "manifest source");
  const source = normalizeRoute(record.source);
  if (seen.has(source)) {
    fail(`duplicate manifest source ${JSON.stringify(source)}`);
  }
  seen.add(source);

  if (record.behavior === "keep") {
    if (record.destination !== null) {
      fail(`keep route ${JSON.stringify(source)} must not declare a destination`);
    }
    keepSources.add(source);
  } else if (record.behavior === "static-alias") {
    if (source === "/") {
      fail(`the root "/" may not be an alias source`);
    }
    if (typeof record.destination !== "string") {
      fail(`static-alias route ${JSON.stringify(source)} requires a destination`);
    }
    assertSafeRoute(record.destination, "manifest destination");
    aliases.push({
      source,
      destination: normalizeRoute(record.destination),
      locale: record.locale === "en" ? "en" : "ru"
    });
  } else {
    fail(`unsupported pilot behavior ${JSON.stringify(record.behavior)} for ${JSON.stringify(source)}`);
  }
}

for (const alias of aliases) {
  if (alias.source === alias.destination) {
    fail(`alias ${JSON.stringify(alias.source)} must not point at itself`);
  }
  if (!keepSources.has(alias.destination)) {
    fail(
      `alias destination ${JSON.stringify(alias.destination)} for ${JSON.stringify(alias.source)} must be a distinct keep record (no chains)`
    );
  }
}

const exported = enumerateRoutes(auxiliary);
const missing = [...exported].filter((route) => !seen.has(route)).sort();
const extra = [...seen].filter((route) => !exported.has(route)).sort();
if (missing.length > 0 || extra.length > 0) {
  fail(
    `manifest source set differs from export: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`
  );
}

const plans = [];
for (const alias of aliases) {
  const srcFile = routeToFile(alias.source);
  const srcAbs = path.join(realExportRoot, srcFile);
  if (!isContained(path.resolve(srcAbs))) {
    fail(`alias source ${JSON.stringify(alias.source)} escapes the export root`);
  }
  assertRegularContainedFile(srcAbs, `alias source ${alias.source}`);

  const dstAbs = path.join(realExportRoot, routeToFile(alias.destination));
  assertRegularContainedFile(dstAbs, `alias target ${alias.destination}`);

  const canonical = extractCanonical(readFileSync(dstAbs, "utf8"), `alias target ${alias.destination}`);
  let localPath;
  try {
    localPath = new URL(canonical).pathname;
  } catch {
    fail(`alias target ${alias.destination} canonical is not an absolute URL: ${canonical}`);
  }

  plans.push({ source: alias.source, srcAbs, canonical, localPath, locale: alias.locale });
}

// ---- Prepare (temporary siblings) ---------------------------------------

const staged = [];
try {
  for (const plan of plans) {
    const html = buildAliasHtml(plan);
    assertAliasStructure(html, `alias ${plan.source}`);
    const tmp = `${plan.srcAbs}.alias-tmp`;
    writeFileSync(tmp, html);
    staged.push({ ...plan, tmp, original: readFileSync(plan.srcAbs) });
  }
} catch (error) {
  for (const item of staged) {
    if (existsSync(item.tmp)) rmSync(item.tmp, { force: true });
  }
  fail(`failed to prepare alias replacements: ${error.message}`);
}

// ---- Commit (atomic, with rollback) -------------------------------------

const committed = [];
try {
  for (let index = 0; index < staged.length; index += 1) {
    const item = staged[index];
    renameSync(item.tmp, item.srcAbs);
    committed.push(item);
    if (fault === "commit-after-first" && index === 0) {
      throw new Error("injected commit fault after first replacement");
    }
  }
} catch (error) {
  for (const item of committed) {
    try {
      writeFileSync(item.srcAbs, item.original);
    } catch {
      /* best effort restore */
    }
  }
  for (const item of staged) {
    if (existsSync(item.tmp)) {
      try {
        rmSync(item.tmp, { force: true });
      } catch {
        /* ignore */
      }
    }
  }
  fail(`commit failed after ${committed.length} replacement(s); rolled back to original export: ${error.message}`);
}

console.log(`Materialized ${committed.length} static alias page(s) in ${outDirArg}.`);
