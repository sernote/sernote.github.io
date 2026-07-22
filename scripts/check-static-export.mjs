import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Focused static-export contract audit.
 *
 * Usage: node scripts/check-static-export.mjs <outDir> [manifestJson] [auxiliaryJson]
 *
 * Inspects only the deterministic tags and attributes this app emits — it is not
 * a general HTML parser. Every violation becomes one diagnostic; diagnostics are
 * printed sorted by (route, rule, url) and the process exits non-zero if any
 * survive.
 */

const outDirArg = process.argv[2] ?? "out";
const manifestArg = process.argv[3] ?? "config/v3-route-manifest.json";
const auxiliaryArg = process.argv[4] ?? "config/v3-export-auxiliary-paths.json";

const outDir = path.resolve(outDirArg);
const diagnostics = [];

function report(route, rule, url, message) {
  diagnostics.push({ route, rule, url: url ?? "", message });
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function loadJson(file, label) {
  try {
    return JSON.parse(readFileSync(path.resolve(file), "utf8"));
  } catch (error) {
    report("-", "input", file, `unable to read ${label}: ${error.message}`);
    return null;
  }
}

function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.replace(/\/+$/, "");
}

function pathToLocalFile(pathname) {
  if (pathname === "/") return "index.html";
  const trimmed = pathname.replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(trimmed)) return trimmed.slice(1);
  return `${trimmed.slice(1)}/index.html`;
}

function isContained(fileRelative) {
  const resolved = path.resolve(outDir, fileRelative);
  const rel = path.relative(outDir, resolved);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function localFileExists(pathname) {
  const file = pathToLocalFile(pathname);
  if (!isContained(file)) return false;
  return existsSync(path.join(outDir, file));
}

// ---- Load manifest + auxiliary ------------------------------------------

const auxiliaryList = loadJson(auxiliaryArg, "auxiliary paths") ?? [];
const auxiliary = new Set((Array.isArray(auxiliaryList) ? auxiliaryList : []).map((entry) => toPosix(entry)));

const manifest = loadJson(manifestArg, "route manifest") ?? [];
const manifestBySource = new Map();
const keepSources = new Set();
const aliasBySource = new Map();

if (Array.isArray(manifest)) {
  for (const record of manifest) {
    if (!record || typeof record.source !== "string") {
      report("-", "manifest", "", "manifest record missing a string source");
      continue;
    }
    const source = normalizeRoute(record.source);
    if (manifestBySource.has(source)) {
      report(source, "manifest", "", "duplicate manifest source");
      continue;
    }
    manifestBySource.set(source, record);
    if (record.behavior === "keep") {
      if (record.destination !== null) report(source, "manifest", "", "keep must not declare a destination");
      keepSources.add(source);
    } else if (record.behavior === "static-alias") {
      if (typeof record.destination !== "string") {
        report(source, "manifest", "", "static-alias requires a destination");
      } else {
        aliasBySource.set(source, normalizeRoute(record.destination));
      }
    } else {
      report(source, "manifest", "", `unsupported pilot behavior ${JSON.stringify(record.behavior)}`);
    }
  }
  for (const [source, destination] of aliasBySource) {
    if (source === destination) report(source, "manifest", "", "alias must not point at itself");
    else if (!keepSources.has(destination)) {
      report(source, "manifest", destination, "alias destination must be a distinct keep record (no chains)");
    }
  }
} else {
  report("-", "manifest", "", "manifest must be an array");
}

// ---- Enumerate exported routes ------------------------------------------

const exportedRoutes = new Map(); // route -> relative file
function enumerate(absoluteDir) {
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolute = path.join(absoluteDir, entry.name);
    if (entry.isDirectory()) {
      enumerate(absolute);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const relative = toPosix(path.relative(outDir, absolute));
      const isTopLevel = !relative.includes("/");
      if ((entry.name === "index.html" || isTopLevel) && !auxiliary.has(relative)) {
        const route =
          relative === "index.html"
            ? "/"
            : relative.endsWith("/index.html")
              ? `/${relative.slice(0, -"/index.html".length)}`
              : `/${relative.slice(0, -".html".length)}`;
        exportedRoutes.set(route, relative);
      }
    }
  }
}
if (existsSync(outDir)) enumerate(outDir);

// Coverage: manifest source set must equal exported non-auxiliary route set.
for (const route of exportedRoutes.keys()) {
  if (!manifestBySource.has(route)) report(route, "manifest-coverage", "", "exported route absent from manifest");
}
for (const source of manifestBySource.keys()) {
  if (!exportedRoutes.has(source)) report(source, "manifest-coverage", "", "manifest source has no exported file");
}

// ---- Per-page scan -------------------------------------------------------

const pageVisibleExternals = new Map(); // route -> Set of external URLs (anchors + media)
const pageVisibleYouTubeIds = new Map(); // route -> Set of youtube ids from visible watch anchors

function youtubeId(url) {
  const embed = /youtube\.com\/embed\/([\w-]+)/i.exec(url);
  if (embed) return embed[1];
  const watch = /[?&]v=([\w-]+)/i.exec(url);
  if (watch) return watch[1];
  return null;
}

function extractCanonicals(html) {
  return [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)]
    .map((m) => /\bhref=["']([^"']+)["']/i.exec(m[0]))
    .filter(Boolean)
    .map((m) => decodeEntities(m[1]));
}

function extractRobotsMeta(html) {
  const match = /<meta\b[^>]*\bname=["']robots["'][^>]*>/i.exec(html);
  if (!match) return null;
  const content = /\bcontent=["']([^"']*)["']/i.exec(match[0]);
  return content ? content[1] : "";
}

function robotsTokens(content) {
  return content
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

let siteOrigin = null;

for (const [route, relative] of exportedRoutes) {
  const html = readFileSync(path.join(outDir, relative), "utf8");
  const isAlias = aliasBySource.has(route);

  // Metadata
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) report(route, "metadata", "", "missing html lang");
  if (!/<title\b[^>]*>[^<]*<\/title>/i.test(html) && !/<title>[^<]*<\/title>/i.test(html)) {
    report(route, "metadata", "", "missing <title>");
  }
  if (!/<meta\b[^>]*\bname=["']description["'][^>]*>/i.test(html)) report(route, "metadata", "", "missing description");

  // Landmarks
  const mains = html.match(/<main\b[^>]*>/gi) ?? [];
  const identifiedMains = mains.filter((tag) => /\bid=["']main-content["']/i.test(tag));
  const skipLinks = html.match(/<a\b[^>]*\bhref=["']#main-content["'][^>]*>/gi) ?? [];
  if (mains.length !== 1 || identifiedMains.length !== 1) {
    report(route, "landmark", "", `expected exactly one main#main-content, found main=${mains.length} identified=${identifiedMains.length}`);
  }
  if (skipLinks.length !== 1) {
    report(route, "landmark", "", `expected exactly one skip link to #main-content, found ${skipLinks.length}`);
  }

  // Canonical + robots
  const canonicals = extractCanonicals(html);
  const robots = extractRobotsMeta(html);
  const selfCanonicalPath = route === "/" ? "/" : `${route}/`;

  if (isAlias) {
    const destination = aliasBySource.get(route);
    const targetPath = destination === "/" ? "/" : `${destination}/`;
    if (canonicals.length !== 1) {
      report(route, "alias", "", `alias must have exactly one canonical, found ${canonicals.length}`);
    } else {
      let canonicalPath = null;
      try {
        canonicalPath = new URL(canonicals[0]).pathname;
      } catch {
        report(route, "alias", canonicals[0], "alias canonical is not an absolute URL");
      }
      if (canonicalPath !== null && canonicalPath !== targetPath) {
        report(route, "alias", canonicals[0], `alias canonical must target ${targetPath}`);
      }
    }
    if (robots === null) {
      report(route, "alias", "", "alias must declare robots noindex, follow");
    } else {
      const tokens = robotsTokens(robots);
      if (!tokens.includes("noindex")) report(route, "alias", "", "alias robots must include noindex");
      if (!tokens.includes("follow")) report(route, "alias", "", "alias robots must include follow");
      if (tokens.includes("index")) report(route, "alias", "", "alias robots must not include index");
      if (tokens.includes("nofollow")) report(route, "alias", "", "alias robots must not include nofollow");
    }
  } else {
    if (canonicals.length !== 1) {
      report(route, "canonical", "", `keep must have exactly one canonical, found ${canonicals.length}`);
    } else {
      let canonicalPath = null;
      try {
        canonicalPath = new URL(canonicals[0]).pathname;
        siteOrigin = siteOrigin ?? new URL(canonicals[0]).origin;
      } catch {
        report(route, "canonical", canonicals[0], "canonical is not an absolute URL");
      }
      if (canonicalPath !== null && canonicalPath !== selfCanonicalPath) {
        report(route, "canonical", canonicals[0], `keep canonical must be self (${selfCanonicalPath})`);
      }
    }
    if (robots !== null && robotsTokens(robots).includes("noindex")) {
      report(route, "canonical", "", "keep page must not be noindex");
    }
  }

  // Internal links + fragments
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']*)["']/gi)].map((m) => decodeEntities(m[1]));
  const visibleExternals = new Set();
  const visibleYouTube = new Set();
  for (const rawHref of anchors) {
    const href = rawHref.trim();
    if (href.startsWith("#")) {
      const id = decodeURIComponent(href.slice(1));
      if (id && !ids.has(id)) report(route, "fragment", href, "internal fragment has no matching id");
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const pathname = href.split(/[?#]/, 1)[0];
      if (!localFileExists(pathname)) report(route, "broken-link", href, "internal link has no exported file");
    } else if (/^https?:\/\//i.test(href)) {
      visibleExternals.add(href);
      const id = youtubeId(href);
      if (id && /youtube\.com\/watch/i.test(href)) visibleYouTube.add(id);
    }
  }
  for (const m of html.matchAll(/<(?:img|source)\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    const src = decodeEntities(m[1]);
    if (/^https?:\/\//i.test(src)) visibleExternals.add(src);
  }
  pageVisibleExternals.set(route, visibleExternals);
  pageVisibleYouTubeIds.set(route, visibleYouTube);

  // JSON-LD
  const scripts = [...html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const script of scripts) {
    const payload = script[1];
    let data;
    try {
      data = JSON.parse(payload);
    } catch (error) {
      report(route, "jsonld", "", `invalid or truncated JSON-LD payload: ${error.message}`);
      continue;
    }
    validateJsonLd(route, data, visibleExternals, visibleYouTube);
  }
}

function validateJsonLd(route, node, visibleExternals, visibleYouTube) {
  if (Array.isArray(node)) {
    for (const item of node) validateJsonLd(route, item, visibleExternals, visibleYouTube);
    return;
  }
  if (!node || typeof node !== "object") return;

  if (Object.prototype.hasOwnProperty.call(node, "@context")) {
    // @context may be a string or an array of contexts (both valid JSON-LD).
    const contexts = Array.isArray(node["@context"]) ? node["@context"] : [node["@context"]];
    if (!contexts.every((context) => context === "https://schema.org")) {
      report(route, "jsonld", String(node["@context"]), "@context must be https://schema.org");
    }
  }

  // sameAs may be a string or an array; collect its YouTube ids for the embed allowance.
  const sameAsIds = new Set(
    (Array.isArray(node.sameAs) ? node.sameAs : [node.sameAs])
      .filter((value) => typeof value === "string")
      .map((value) => youtubeId(value))
      .filter((id) => id !== null)
  );

  for (const [key, value] of Object.entries(node)) {
    if (key === "@context") continue;
    if (typeof value === "string" && /^https?:\/\//i.test(value)) {
      const base = value.split("#", 1)[0];
      if (siteOrigin && base.startsWith(siteOrigin)) {
        const pathname = new URL(base).pathname;
        if (!localFileExists(pathname)) {
          report(route, "jsonld", value, "local JSON-LD URL has no exported file");
        }
      } else {
        // External URL: must be visible on the page (anchor or media source),
        // with a narrow allowance for a YouTube embedUrl backed by its sameAs.
        if (!visibleExternals.has(value)) {
          const id = youtubeId(value);
          const embedAllowed =
            key === "embedUrl" && id !== null && sameAsIds.has(id) && visibleYouTube.has(id);
          if (!embedAllowed) {
            report(route, "jsonld", value, "external JSON-LD URL is not visible on the page");
          }
        }
      }
    } else if (value && typeof value === "object") {
      validateJsonLd(route, value, visibleExternals, visibleYouTube);
    }
  }
}

// ---- Sitemap -------------------------------------------------------------

const sitemapRoutes = new Set();
const sitemapFile = path.join(outDir, "sitemap.xml");
if (!existsSync(sitemapFile)) {
  report("/sitemap.xml", "sitemap", "", "sitemap.xml is missing");
} else {
  const sitemapXml = readFileSync(sitemapFile, "utf8");
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeEntities(m[1].trim()));
  const seenLoc = new Set();
  for (const loc of locs) {
    if (seenLoc.has(loc)) report("/sitemap.xml", "sitemap", loc, "duplicate sitemap URL");
    seenLoc.add(loc);
    let pathname;
    try {
      pathname = new URL(loc).pathname;
      siteOrigin = siteOrigin ?? new URL(loc).origin;
    } catch {
      report("/sitemap.xml", "sitemap", loc, "sitemap URL is not absolute");
      continue;
    }
    const route = normalizeRoute(pathname);
    const relative = pathname === "/" ? "index.html" : pathToLocalFile(pathname);
    if (auxiliary.has(relative)) report("/sitemap.xml", "sitemap", loc, "sitemap lists an auxiliary artifact");
    else if (!localFileExists(pathname)) report("/sitemap.xml", "sitemap", loc, "sitemap URL has no exported file");
    else if (!keepSources.has(route)) report("/sitemap.xml", "sitemap", loc, "sitemap URL does not resolve to a keep record");
    else sitemapRoutes.add(route);
  }
}

// ---- RSS -----------------------------------------------------------------

const rssFile = path.join(outDir, "rss.xml");
if (!existsSync(rssFile)) {
  report("/rss.xml", "rss", "", "rss.xml is missing");
} else {
  const rssXml = readFileSync(rssFile, "utf8");
  const items = [...rssXml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  for (const item of items) {
    const linkMatch = /<link>([^<]+)<\/link>/.exec(item);
    if (!linkMatch) {
      report("/rss.xml", "rss", "", "RSS item has no link");
      continue;
    }
    const link = decodeEntities(linkMatch[1].trim());
    let url;
    try {
      url = new URL(link);
    } catch {
      report("/rss.xml", "rss", link, "RSS item link is not absolute");
      continue;
    }
    if (siteOrigin && link.startsWith(siteOrigin)) {
      const route = normalizeRoute(url.pathname);
      if (!localFileExists(url.pathname)) report("/rss.xml", "rss", link, "native RSS item has no exported file");
      else if (!sitemapRoutes.has(route)) report("/rss.xml", "rss", link, "native RSS item does not resolve to a sitemap-listed keep");
    } else {
      if (url.protocol !== "https:") report("/rss.xml", "rss", link, "external RSS item must be HTTPS");
      const visibleSomewhere = [...sitemapRoutes].some((route) =>
        (pageVisibleExternals.get(route) ?? new Set()).has(link)
      );
      if (!visibleSomewhere) {
        report("/rss.xml", "rss", link, "external RSS item is not a visible link on any sitemap-listed page");
      }
    }
  }
}

// ---- robots --------------------------------------------------------------

const robotsFile = path.join(outDir, "robots.txt");
if (!existsSync(robotsFile)) {
  report("/robots.txt", "robots", "", "robots.txt is missing");
} else {
  const robotsTxt = readFileSync(robotsFile, "utf8");
  if (!/^\s*user-agent:\s*\*\s*$/im.test(robotsTxt)) report("/robots.txt", "robots", "", "robots must allow all user agents");
  if (!/^\s*allow:\s*\/\s*$/im.test(robotsTxt)) report("/robots.txt", "robots", "", "robots must Allow: /");
  if (/^\s*disallow:/im.test(robotsTxt)) report("/robots.txt", "robots", "", "robots must not contain Disallow");
  const sitemapDirective = /^\s*sitemap:\s*(\S+)\s*$/im.exec(robotsTxt);
  const expectedSitemap = siteOrigin ? `${siteOrigin}/sitemap.xml` : null;
  if (!sitemapDirective) report("/robots.txt", "robots", "", "robots must declare the sitemap URL");
  else if (expectedSitemap && sitemapDirective[1] !== expectedSitemap) {
    report("/robots.txt", "robots", sitemapDirective[1], `robots sitemap must be ${expectedSitemap}`);
  }
}

// ---- Output --------------------------------------------------------------

diagnostics.sort((a, b) =>
  a.route !== b.route
    ? a.route < b.route
      ? -1
      : 1
    : a.rule !== b.rule
      ? a.rule < b.rule
        ? -1
        : 1
      : a.url < b.url
        ? -1
        : a.url > b.url
          ? 1
          : 0
);

if (diagnostics.length > 0) {
  for (const d of diagnostics) {
    const location = d.url ? `${d.route} (${d.url})` : d.route;
    console.error(`static-export audit [${d.rule}] ${location} — ${d.message}`);
  }
  console.error(`Static export audit failed with ${diagnostics.length} diagnostic(s).`);
  process.exit(1);
} else {
  console.log(
    `Static export audit passed: ${exportedRoutes.size} routes, ${aliasBySource.size} aliases, ${sitemapRoutes.size} sitemap URLs.`
  );
}
