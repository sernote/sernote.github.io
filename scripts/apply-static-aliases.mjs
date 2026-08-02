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
    "<style>.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden}.skip-link:focus{position:fixed;left:1rem;top:1rem;width:auto;height:auto;padding:.5rem 1rem;background:#050608;color:#f4f7f8;z-index:50}</style>",
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

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textContent(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractDescription(html) {
  const tag = /<meta\b[^>]*\bname=["']description["'][^>]*>/i.exec(html)?.[0];
  return tag ? /\bcontent=["']([^"']*)["']/i.exec(tag)?.[1] ?? "" : "";
}

function cleanArchiveMain(html, label) {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);
  if (!main) fail(`${label} must contain a main element before archiving`);
  let content = main[1];
  content = content.replace(/<!--[\s\S]*?-->/g, "");
  content = content.replace(
    /<(script|style|noscript|template|header|footer|nav|aside|form|button|dialog|iframe|object|canvas|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    ""
  );
  content = content.replace(/<(?:input|select|textarea)\b[^>]*>(?:[\s\S]*?<\/(?:select|textarea)\s*>)?/gi, "");
  content = content.replace(
    /<([a-z][\w-]*)\b[^>]*(?:class|id)=["'][^"']*(?:featured|related|sidebar|cta|client-control)[^"']*["'][^>]*>[\s\S]*?<\/\1\s*>/gi,
    ""
  );
  content = content.replace(/<a\b[^>]*>([\s\S]*?)<\/a\s*>/gi, "$1");
  content = content.replace(/\s(?:on[a-z]+|href|action|formaction|data-nextjs[^=\s]*)=(?:["'][^"']*["']|[^\s>]+)/gi, "");
  return content.trim();
}

function buildArchiveHtml(plan) {
  if (/\bdata-archive=["']true["']/i.test(plan.originalText)) return plan.originalText;
  const rawTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(plan.originalText)?.[1] ?? "Архивный материал";
  const title = textContent(rawTitle) || "Архивный материал";
  const description = extractDescription(plan.originalText) || "Архивная версия материала.";
  const content = cleanArchiveMain(plan.originalText, `archive ${plan.source}`);
  const archiveTargetHref = plan.archiveTarget === "/" ? "/" : `${plan.archiveTarget}/`;
  const lang = plan.locale === "en" ? "en" : "ru";
  const copy =
    lang === "en"
      ? { status: "Archive", note: "This material is kept for reference and is no longer maintained.", link: "Current section" }
      : { status: "Архив", note: "Материал сохранён для справки и больше не поддерживается.", link: "Актуальный раздел" };
  return [
    "<!doctype html>",
    `<html lang="${lang}" data-archive="true">`,
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtml(title)} — ${copy.status}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${plan.canonical}">`,
    '<meta name="robots" content="noindex, follow">',
    '<style>:root{font-family:system-ui,sans-serif;color:#17191d;background:#f7f8fa}body{margin:0}.skip-link{position:absolute;left:-9999px}.skip-link:focus{left:1rem;top:1rem}main{max-width:760px;margin:auto;padding:48px 24px 80px}article{line-height:1.65}.archive-state{border-bottom:1px solid #d9dde5;margin-bottom:32px;padding-bottom:24px}.archive-state strong{display:block;color:#2457d6;font-size:.875rem;text-transform:uppercase;letter-spacing:.08em}.archive-link{border-top:1px solid #d9dde5;margin-top:40px;padding-top:24px}a{color:#2457d6}</style>',
    "</head>",
    "<body>",
    `<a class="skip-link" href="#main-content">${lang === "en" ? "Skip to content" : "Перейти к содержанию"}</a>`,
    '<main id="main-content" tabindex="-1">',
    `<header class="archive-state"><strong>${copy.status}</strong><p>${copy.note}</p><time datetime="${plan.archivedAt}">${plan.archivedAt}</time></header>`,
    `<article>${content}</article>`,
    `<p class="archive-link"><a href="${archiveTargetHref}">${copy.link}</a></p>`,
    "</main>",
    "</body>",
    "</html>",
    ""
  ].join("\n");
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
const archives = [];

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
  } else if (record.behavior === "archive") {
    if (record.destination !== null) {
      fail(`archive route ${JSON.stringify(source)} destination must be null`);
    }
    if (record.archivedAt !== "2026-08-02") {
      fail(`archive route ${JSON.stringify(source)} archivedAt must be 2026-08-02`);
    }
    if (typeof record.archiveTarget !== "string") {
      fail(`archive route ${JSON.stringify(source)} requires archiveTarget`);
    }
    assertSafeRoute(record.archiveTarget, "archive target");
    archives.push({
      source,
      archiveTarget: normalizeRoute(record.archiveTarget),
      archivedAt: record.archivedAt,
      locale: record.locale === "en" ? "en" : "ru"
    });
  } else {
    fail(`unsupported behavior ${JSON.stringify(record.behavior)} for ${JSON.stringify(source)}`);
  }
}

for (const archive of archives) {
  if (archive.source === archive.archiveTarget) {
    fail(`archive target for ${JSON.stringify(archive.source)} must be distinct`);
  }
  if (!keepSources.has(archive.archiveTarget)) {
    fail(`archive target ${JSON.stringify(archive.archiveTarget)} for ${JSON.stringify(archive.source)} must be a direct keep record`);
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

for (const archive of archives) {
  const srcAbs = path.join(realExportRoot, routeToFile(archive.source));
  if (!isContained(path.resolve(srcAbs))) fail(`archive source ${JSON.stringify(archive.source)} escapes the export root`);
  assertRegularContainedFile(srcAbs, `archive source ${archive.source}`);
  const targetAbs = path.join(realExportRoot, routeToFile(archive.archiveTarget));
  assertRegularContainedFile(targetAbs, `archive target ${archive.archiveTarget}`);
  const originalText = readFileSync(srcAbs, "utf8");
  const sourceCanonical = extractCanonical(originalText, `archive source ${archive.source}`);
  let origin;
  try {
    origin = new URL(sourceCanonical).origin;
  } catch {
    fail(`archive source ${archive.source} canonical is not an absolute URL: ${sourceCanonical}`);
  }
  const canonical = `${origin}${archive.source === "/" ? "/" : `${archive.source}/`}`;
  plans.push({ ...archive, srcAbs, canonical, originalText, archiveTarget: archive.archiveTarget });
}

// ---- Prepare (temporary siblings) ---------------------------------------

const staged = [];
try {
  for (const plan of plans) {
    const isArchive = Object.prototype.hasOwnProperty.call(plan, "archivedAt");
    const html = isArchive ? buildArchiveHtml(plan) : buildAliasHtml(plan);
    if (!isArchive) assertAliasStructure(html, `alias ${plan.source}`);
    // Read the original bytes before writing the temp sibling so a failed read
    // cannot leave an orphaned temp file behind.
    const original = readFileSync(plan.srcAbs);
    const tmp = `${plan.srcAbs}.alias-tmp`;
    writeFileSync(tmp, html);
    staged.push({ ...plan, tmp, original });
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

console.log(`Materialized ${aliases.length} alias page(s) and ${archives.length} archive page(s) in ${outDirArg}.`);
