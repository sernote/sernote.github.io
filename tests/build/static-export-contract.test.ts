import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const ORIGIN = "https://notevskii.tech";
const roots: string[] = [];

type PageSpec = {
  lang?: string | null;
  title?: string | null;
  description?: string | null;
  canonical?: string | string[] | null;
  robots?: string | null;
  head?: string;
  skipLinks?: number;
  mains?: number;
  body?: string;
};

function page(spec: PageSpec): string {
  const {
    lang = "ru",
    title = "Заголовок",
    description = "Описание страницы.",
    canonical = null,
    robots = null,
    head = "",
    skipLinks = 1,
    mains = 1,
    body = ""
  } = spec;
  const canonicals = canonical === null ? [] : Array.isArray(canonical) ? canonical : [canonical];
  const langAttr = lang === null ? "" : ` lang="${lang}"`;
  const titleTag = title === null ? "" : `<title>${title}</title>`;
  const descTag =
    description === null ? "" : `<meta name="description" content="${description}">`;
  const robotsTag = robots === null ? "" : `<meta name="robots" content="${robots}">`;
  const canonicalTags = canonicals.map((c) => `<link rel="canonical" href="${c}">`).join("");
  const skip = Array.from({ length: skipLinks }, () => `<a href="#main-content" class="skip-link">skip</a>`).join("");
  const mainOpen = Array.from({ length: mains }, () => `<main id="main-content" tabindex="-1">`).join("");
  const mainClose = Array.from({ length: mains }, () => `</main>`).join("");
  return `<!doctype html><html${langAttr}><head><meta charset="utf-8">${titleTag}${descTag}${robotsTag}${canonicalTags}${head}</head><body>${skip}${mainOpen}${body}${mainClose}</body></html>`;
}

function keep(route: string, body = ""): string {
  const canonical = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}/`;
  return page({ canonical, body });
}

function alias(destination: string, body?: string): string {
  const canonical = destination === "/" ? `${ORIGIN}/` : `${ORIGIN}${destination}/`;
  const local = destination === "/" ? "/" : `${destination}/`;
  return page({
    canonical,
    robots: "noindex, follow",
    head: `<meta http-equiv="refresh" content="0; url=${local}">`,
    body: body ?? `<a href="${local}">go</a>`
  });
}

function archivePage(source: string, archiveTarget: string): string {
  return page({
    canonical: `${ORIGIN}${source}/`,
    robots: "noindex, follow",
    body: `<div data-archive="true"><strong>Архив</strong><time datetime="2026-08-02">2026-08-02</time><a href="${archiveTarget}/">Актуальный раздел</a></div>`
  });
}

const AUXILIARY = ["404.html", "404/index.html", "_not-found/index.html"];

const jsonLdScript = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

/** Files for a complete, internally consistent minimal export. */
function validFiles(): Record<string, string> {
  const websiteLd = jsonLdScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${ORIGIN}/`,
    name: "Сергей Нотевский"
  });
  return {
    "index.html": page({
      canonical: `${ORIGIN}/`,
      head: websiteLd,
      body: `<a href="/blog/">Блог</a><a href="/work/">Материалы</a>`
    }),
    "blog/index.html": keep("/blog", `<a href="https://habr.com/x">Habr</a><a href="/about/">Обо мне</a>`),
    "work/index.html": keep("/work", `<a href="https://habr.com/x">Habr</a>`),
    "about/index.html": keep("/about", `<h2 id="about-heading">Обо мне</h2><a href="#about-heading">К заголовку</a><a href="/blog/">Блог</a>`),
    "writing/index.html": alias("/blog"),
    "old/index.html": archivePage("/old", "/blog"),
    "ru/index.html": alias("/"),
    "sitemap.xml": sitemap(["/", "/blog", "/work", "/about"]),
    "rss.xml": rss(),
    "robots.txt": `User-Agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
    ...Object.fromEntries(AUXILIARY.map((a) => [a, page({ canonical: null, skipLinks: 0, mains: 0, body: "404" })]))
  };
}

function sitemap(routes: string[]): string {
  const urls = routes
    .map((r) => (r === "/" ? `${ORIGIN}/` : `${ORIGIN}${r}/`))
    .map((u) => `<url><loc>${u}</loc></url>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function rss(): string {
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Блог</title><link>${ORIGIN}/</link><description>d</description><item><title>Native</title><link>${ORIGIN}/blog/</link><guid isPermaLink="true">${ORIGIN}/blog/</guid></item><item><title>Habr</title><link>https://habr.com/x</link><guid isPermaLink="true">https://habr.com/x</guid></item></channel></rss>`;
}

function manifestRecords(): Array<Record<string, unknown>> {
  return [
    { source: "/", destination: null, behavior: "keep", locale: "ru" },
    { source: "/blog", destination: null, behavior: "keep", locale: "ru" },
    { source: "/work", destination: null, behavior: "keep", locale: "ru" },
    { source: "/about", destination: null, behavior: "keep", locale: "ru" },
    { source: "/writing", destination: "/blog", behavior: "static-alias", locale: "ru" },
    { source: "/old", destination: null, behavior: "archive", locale: "ru", archivedAt: "2026-08-02", archiveTarget: "/blog" },
    { source: "/ru", destination: "/", behavior: "static-alias", locale: "ru" }
  ];
}

function buildExport(
  files: Record<string, string> = validFiles(),
  records: Array<Record<string, unknown>> = manifestRecords()
) {
  const root = mkdtempSync(join(tmpdir(), "v3-export-audit-"));
  roots.push(root);
  const outDir = join(root, "out");
  for (const [relative, content] of Object.entries(files)) {
    const abs = join(outDir, relative);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
  }
  const manifestPath = join(root, "manifest.json");
  writeFileSync(manifestPath, `${JSON.stringify(records, null, 2)}\n`);
  const auxPath = join(root, "aux.json");
  writeFileSync(auxPath, `${JSON.stringify(AUXILIARY, null, 2)}\n`);
  return { outDir, manifestPath, auxPath };
}

function run(fixture: { outDir: string; manifestPath: string; auxPath: string }) {
  return spawnSync(
    process.execPath,
    [
      join(process.cwd(), "scripts/check-static-export.mjs"),
      fixture.outDir,
      fixture.manifestPath,
      fixture.auxPath
    ],
    { encoding: "utf8" }
  );
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("static export audit — valid baseline", () => {
  it("passes a complete, internally consistent export", () => {
    const result = run(buildExport());
    expect(result.status, result.stderr).toBe(0);
  });
});

describe("static export audit — canonical rules", () => {
  it("flags a keep page with no canonical", () => {
    const files = validFiles();
    files["blog/index.html"] = page({ canonical: null, body: "" });
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/canonical/i);
    expect(result.stderr).toMatch(/\/blog\b/);
  });

  it("flags a keep page with a duplicate canonical", () => {
    const files = validFiles();
    files["blog/index.html"] = page({ canonical: [`${ORIGIN}/blog/`, `${ORIGIN}/blog/`] });
    expect(run(buildExport(files)).stderr).toMatch(/canonical/i);
  });

  it("flags a keep page whose canonical is not self", () => {
    const files = validFiles();
    files["blog/index.html"] = page({ canonical: `${ORIGIN}/work/` });
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/canonical/i);
  });
});

describe("static export audit — page metadata and landmarks", () => {
  it("flags a missing lang", () => {
    const files = validFiles();
    files["about/index.html"] = page({ lang: null, canonical: `${ORIGIN}/about/` });
    expect(run(buildExport(files)).stderr).toMatch(/lang/i);
  });

  it("flags a missing title", () => {
    const files = validFiles();
    files["about/index.html"] = page({ title: null, canonical: `${ORIGIN}/about/` });
    expect(run(buildExport(files)).stderr).toMatch(/title/i);
  });

  it("flags a missing description", () => {
    const files = validFiles();
    files["about/index.html"] = page({ description: null, canonical: `${ORIGIN}/about/` });
    expect(run(buildExport(files)).stderr).toMatch(/description/i);
  });

  it("flags more than one main", () => {
    const files = validFiles();
    files["about/index.html"] = page({ canonical: `${ORIGIN}/about/`, mains: 2 });
    expect(run(buildExport(files)).stderr).toMatch(/main/i);
  });

  it("flags a page whose sole skip link does not target its main", () => {
    const files = validFiles();
    files["about/index.html"] = page({ canonical: `${ORIGIN}/about/`, skipLinks: 0 });
    expect(run(buildExport(files)).stderr).toMatch(/skip|main/i);
  });
});

describe("static export audit — internal links", () => {
  it("flags a broken internal href", () => {
    const files = validFiles();
    files["about/index.html"] = keep("/about", `<a href="/does-not-exist/">x</a>`);
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/does-not-exist|broken|link/i);
  });

  it("flags an internal fragment with no matching id", () => {
    const files = validFiles();
    files["about/index.html"] = keep("/about", `<a href="#missing-anchor">x</a>`);
    expect(run(buildExport(files)).stderr).toMatch(/missing-anchor|fragment/i);
  });
});

describe("static export audit — alias contract", () => {
  it("flags an alias without noindex", () => {
    const files = validFiles();
    files["writing/index.html"] = page({
      canonical: `${ORIGIN}/blog/`,
      body: `<a href="/blog/">go</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/noindex|robots/i);
  });

  it("flags an alias marked index", () => {
    const files = validFiles();
    files["writing/index.html"] = page({
      canonical: `${ORIGIN}/blog/`,
      robots: "index, follow",
      body: `<a href="/blog/">go</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/index|robots/i);
  });

  it("flags an alias whose canonical is not the manifest target", () => {
    const files = validFiles();
    files["writing/index.html"] = alias("/work"); // manifest says destination /blog
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/canonical|target/i);
  });
});

describe("static export audit — archive contract", () => {
  it("accepts a self-canonical non-hydrated archive outside sitemap", () => {
    const result = run(buildExport());
    expect(result.status, result.stderr).toBe(0);
  });

  it("flags alias semantics, hydration assets and a missing explicit target", () => {
    const files = validFiles();
    files["old/index.html"] = page({
      canonical: `${ORIGIN}/blog/`,
      robots: "noindex, follow",
      head: '<meta http-equiv="refresh" content="0; url=/blog/"><script src="/_next/static/x.js"></script>',
      body: '<div data-archive="true"><strong>Архив</strong><time>2026-08-02</time></div>'
    });
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/archive/i);
    expect(result.stderr).toMatch(/canonical|refresh|hydration|target/i);
  });
});

describe("static export audit — manifest coverage", () => {
  it("flags an exported route missing from the manifest", () => {
    const files = validFiles();
    files["contact/index.html"] = keep("/contact");
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/contact|manifest/i);
  });

  it("flags a manifest source with no exported file", () => {
    const records = manifestRecords();
    records.push({ source: "/ghost", destination: null, behavior: "keep", locale: "ru" });
    expect(run(buildExport(validFiles(), records)).stderr).toMatch(/ghost|manifest|missing/i);
  });

  it("flags an unsupported behavior", () => {
    const records = manifestRecords().map((r) =>
      r.source === "/work" ? { ...r, behavior: "merge" } : r
    );
    expect(run(buildExport(validFiles(), records)).stderr).toMatch(/behavior|merge/i);
  });

  it("flags an alias whose destination is not a keep (chain)", () => {
    const records = manifestRecords().map((r) =>
      r.source === "/writing" ? { ...r, destination: "/ru" } : r
    );
    expect(run(buildExport(validFiles(), records)).stderr).toMatch(/keep|chain/i);
  });
});

describe("static export audit — sitemap", () => {
  it("flags a sitemap URL with no exported file", () => {
    const files = validFiles();
    files["sitemap.xml"] = sitemap(["/", "/blog", "/work", "/about", "/nope"]);
    expect(run(buildExport(files)).stderr).toMatch(/sitemap/i);
  });

  it("flags a sitemap URL that resolves to an alias, not a keep", () => {
    const files = validFiles();
    files["sitemap.xml"] = sitemap(["/", "/blog", "/work", "/about", "/writing"]);
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/sitemap/i);
  });
});

describe("static export audit — rss", () => {
  it("flags an external RSS item not visible on any canonical page", () => {
    const files = validFiles();
    // Remove the visible Habr anchors so the external item is unbacked.
    files["blog/index.html"] = keep("/blog", `<a href="/about/">Обо мне</a>`);
    files["work/index.html"] = keep("/work");
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/rss|habr/i);
  });

  it("flags a native RSS item that does not resolve to a keep", () => {
    const files = validFiles();
    files["rss.xml"] = files["rss.xml"].replace(`${ORIGIN}/blog/`, `${ORIGIN}/writing/`);
    expect(run(buildExport(files)).stderr).toMatch(/rss/i);
  });
});

describe("static export audit — robots", () => {
  it("flags robots with a Disallow", () => {
    const files = validFiles();
    files["robots.txt"] = `User-Agent: *\nAllow: /\nDisallow: /secret\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
    expect(run(buildExport(files)).stderr).toMatch(/robots|disallow/i);
  });

  it("flags robots without the sitemap URL", () => {
    const files = validFiles();
    files["robots.txt"] = `User-Agent: *\nAllow: /\n`;
    expect(run(buildExport(files)).stderr).toMatch(/robots|sitemap/i);
  });
});

describe("static export audit — JSON-LD", () => {
  it("flags a wrong @context", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({ "@context": "http://schema.org", "@type": "WebSite", url: `${ORIGIN}/` }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/context|json/i);
  });

  it("flags a local JSON-LD URL without an exported file", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({ "@context": "https://schema.org", "@type": "WebSite", url: `${ORIGIN}/missing-page/` }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/missing-page|json/i);
  });

  it("flags an external JSON-LD URL not visible on the page", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({
        "@context": "https://schema.org",
        "@type": "Person",
        url: `${ORIGIN}/`,
        sameAs: "https://example.com/not-linked"
      }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/example\.com|json|visible/i);
  });

  it("accepts a YouTube embed URL backed by a visible watch link with matching id", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        url: `${ORIGIN}/`,
        embedUrl: "https://www.youtube.com/embed/RHbbeHKGh6I",
        sameAs: "https://www.youtube.com/watch?v=RHbbeHKGh6I"
      }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a><a href="https://www.youtube.com/watch?v=RHbbeHKGh6I">watch</a>`
    });
    expect(run(buildExport(files)).status).toBe(0);
  });

  it("accepts an array @context that contains schema.org", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({ "@context": ["https://schema.org"], "@type": "WebSite", url: `${ORIGIN}/` }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a>`
    });
    expect(run(buildExport(files)).status).toBe(0);
  });

  it("flags an array @context missing schema.org", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({ "@context": ["http://schema.org"], "@type": "WebSite", url: `${ORIGIN}/` }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a>`
    });
    expect(run(buildExport(files)).stderr).toMatch(/context/i);
  });

  it("accepts an array sameAs backing a YouTube embed", () => {
    const files = validFiles();
    files["index.html"] = page({
      canonical: `${ORIGIN}/`,
      head: jsonLdScript({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        url: `${ORIGIN}/`,
        embedUrl: "https://www.youtube.com/embed/RHbbeHKGh6I",
        sameAs: ["https://www.youtube.com/watch?v=RHbbeHKGh6I", "https://example.com/profile"]
      }),
      body: `<a href="/blog/">b</a><a href="/work/">w</a><a href="https://www.youtube.com/watch?v=RHbbeHKGh6I">watch</a><a href="https://example.com/profile">p</a>`
    });
    expect(run(buildExport(files)).status).toBe(0);
  });

  it("flags a raw closing script sequence inside a JSON-LD payload", () => {
    const files = validFiles();
    files["index.html"] =
      `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>t</title><meta name="description" content="d"><link rel="canonical" href="${ORIGIN}/"><script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","x":"</script><script>alert(1)"}</script></head><body><a href="#main-content" class="skip-link">s</a><main id="main-content"><a href="/blog/">b</a><a href="/work/">w</a></main></body></html>`;
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/json|script|truncat/i);
  });
});

describe("static export audit — auxiliary artifacts", () => {
  it("passes with both duplicate 404 artifacts present", () => {
    // validFiles already includes 404.html and 404/index.html
    expect(run(buildExport()).status).toBe(0);
  });

  it("flags an auxiliary file that appears in the sitemap", () => {
    const files = validFiles();
    files["sitemap.xml"] = files["sitemap.xml"].replace(
      "</urlset>",
      `<url><loc>${ORIGIN}/404/</loc></url></urlset>`
    );
    expect(run(buildExport(files)).stderr).toMatch(/404|sitemap|auxiliary/i);
  });
});

describe("static export audit — deterministic ordering", () => {
  it("sorts diagnostics by route then rule", () => {
    const files = validFiles();
    files["about/index.html"] = page({ title: null, canonical: `${ORIGIN}/about/` });
    files["blog/index.html"] = page({ canonical: null, body: "" });
    const result = run(buildExport(files));
    expect(result.status).not.toBe(0);
    const aboutIndex = result.stderr.indexOf("/about");
    const blogIndex = result.stderr.indexOf("/blog");
    expect(aboutIndex).toBeGreaterThanOrEqual(0);
    expect(blogIndex).toBeGreaterThan(aboutIndex);
  });
});

describe("static export audit — verification lifecycle", () => {
  it("runs the real-export integration suite after build locally and in Pages CI", () => {
    const postBuildTest =
      "pnpm vitest run tests/build/static-export-contract.test.ts";
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf8")
    ) as { scripts?: Record<string, string> };
    const verifyScript = packageJson.scripts?.verify ?? "";
    expect(verifyScript).toContain(
      `pnpm build && ${postBuildTest} && pnpm verify:reference && pnpm verify:export`
    );

    const workflow = readFileSync(
      join(process.cwd(), ".github/workflows/pages.yml"),
      "utf8"
    );
    const buildIndex = workflow.indexOf("run: pnpm build");
    const integrationIndex = workflow.indexOf(`run: ${postBuildTest}`);
    const referenceIndex = workflow.indexOf("run: pnpm verify:reference");
    const exportIndex = workflow.indexOf("run: pnpm verify:export");
    const uploadIndex = workflow.indexOf("uses: actions/upload-pages-artifact@v3");

    expect(buildIndex).toBeGreaterThanOrEqual(0);
    expect(integrationIndex).toBeGreaterThan(buildIndex);
    expect(referenceIndex).toBeGreaterThan(integrationIndex);
    expect(exportIndex).toBeGreaterThan(referenceIndex);
    expect(uploadIndex).toBeGreaterThan(exportIndex);
  });
});

describe("static export audit — production integration", () => {
  const outDir = join(process.cwd(), "out");
  const manifestPath = join(process.cwd(), "config/v3-route-manifest.json");
  const auxPath = join(process.cwd(), "config/v3-export-auxiliary-paths.json");
  const hasExport = (() => {
    try {
      readFileSync(join(outDir, "index.html"));
      readFileSync(join(outDir, "materials/index.html"));
      return true;
    } catch {
      return false;
    }
  })();

  it.runIf(hasExport)("passes the audit against the real export", () => {
    const result = spawnSync(
      process.execPath,
      [join(process.cwd(), "scripts/check-static-export.mjs"), outDir, manifestPath, auxPath],
      { encoding: "utf8" }
    );
    expect(result.status, result.stderr).toBe(0);
  });

  it.runIf(hasExport)("has exactly 102 records split 13 keep / 35 alias / 54 archive", () => {
    const records = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(records).toHaveLength(102);
    expect(records.filter((r: { behavior: string }) => r.behavior === "keep")).toHaveLength(13);
    expect(records.filter((r: { behavior: string }) => r.behavior === "static-alias")).toHaveLength(35);
    expect(records.filter((r: { behavior: string }) => r.behavior === "archive")).toHaveLength(54);
    expect(records).toContainEqual({
      source: "/blog/workload-shape-over-model-name",
      destination: null,
      behavior: "keep",
      locale: "ru"
    });
  });

  it.runIf(hasExport)("lists only keep records in the sitemap", () => {
    const sitemapXml = readFileSync(join(outDir, "sitemap.xml"), "utf8");
    const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const records = JSON.parse(readFileSync(manifestPath, "utf8"));
    const keeps = new Set(
      records.filter((r: { behavior: string }) => r.behavior === "keep").map((r: { source: string }) => r.source)
    );
    for (const loc of locs) {
      const path = new URL(loc).pathname.replace(/\/$/, "") || "/";
      expect(keeps.has(path), `${path} should be a keep`).toBe(true);
    }
  });

  it.runIf(hasExport)("materializes a selected legacy alias to the uniform self-contained contract", () => {
    // Locks the intended behavior: the four selected aliases ship the same
    // materialized self-contained page as the /ru set, not a nav shell.
    const html = readFileSync(join(outDir, "writing/index.html"), "utf8");
    expect((html.match(/<a\b[^>]*href=["']#main-content["']/gi) ?? []).length).toBe(1);
    expect((html.match(/<main\b[^>]*id=["']main-content["']/gi) ?? []).length).toBe(1);
    expect(html).toContain('<link rel="canonical" href="https://notevskii.tech/blog/">');
    expect(html).toMatch(/name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i);
    expect(html).toMatch(/http-equiv=["']refresh["'][^>]*url=\/blog\//i);
    expect(html).not.toContain("_next"); // self-contained: no site shell / chunks
  });

  it.runIf(hasExport)("has exactly seven RSS items", () => {
    const rssXml = readFileSync(join(outDir, "rss.xml"), "utf8");
    expect((rssXml.match(/<item>/g) ?? []).length).toBe(7);
  });

  it.runIf(hasExport)("emits exactly 16 JSON-LD scripts matching the schema matrix", () => {
    const matrix: Record<string, string[]> = {
      "index.html": ["WebSite"],
      "about/index.html": ["ProfilePage"],
      "blog/ai-platform-before-gpu/index.html": ["BlogPosting", "BreadcrumbList"],
      "blog/workload-shape-over-model-name/index.html": ["BlogPosting", "BreadcrumbList"],
      "talks/maas-vs-self-hosted/index.html": ["VideoObject", "BreadcrumbList"],
      "projects/audit-prompt-caching/index.html": ["SoftwareSourceCode", "BreadcrumbList"],
      "ai-platform/areas/inference-plane/index.html": ["TechArticle", "BreadcrumbList"],
      "ai-platform/components/prefix-cache/index.html": ["TechArticle", "BreadcrumbList"],
      "ai-platform/cases/agent-session-cache-reuse/index.html": ["TechArticle", "BreadcrumbList"]
    };
    let total = 0;
    for (const [file, expectedTypes] of Object.entries(matrix)) {
      const html = readFileSync(join(outDir, file), "utf8");
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      expect(scripts.length, file).toBe(2);
      total += scripts.length;
      const topTypes = scripts.map((m) => JSON.parse(m[1])["@type"]).sort();
      expect(topTypes, file).toEqual([...expectedTypes].sort());
    }
    expect(total).toBe(16);
  });
});
