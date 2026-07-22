import { createHash } from "node:crypto";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];

const ORIGIN = "https://notevskii.tech";

// Keep destinations, each with its own self-canonical.
const KEEPS: Array<{ route: string; file: string }> = [
  { route: "/", file: "index.html" },
  { route: "/blog", file: "blog/index.html" },
  { route: "/about", file: "about/index.html" },
  { route: "/ai-platform", file: "ai-platform/index.html" },
  { route: "/handbook/start-here", file: "handbook/start-here/index.html" }
];

const ALIASES: Array<{ source: string; destination: string }> = [
  { source: "/ru", destination: "/" },
  { source: "/ru/about", destination: "/about" },
  { source: "/ru/handbook", destination: "/ai-platform" },
  { source: "/writing", destination: "/blog" }
];

const AUXILIARY = ["404.html", "404/index.html", "_not-found/index.html"];

function keepHtml(route: string): string {
  const canonical = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}/`;
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>keep ${route}</title><link rel="canonical" href="${canonical}"></head><body><a href="#main-content" class="skip-link">skip</a><main id="main-content">keep ${route}</main></body></html>`;
}

function aliasSourceFile(source: string): string {
  return `${source.slice(1)}/index.html`;
}

function writeFixtureFiles(root: string, records: Array<Record<string, unknown>>) {
  const outDir = join(root, "out");
  for (const keep of KEEPS) {
    const abs = join(outDir, keep.file);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, keepHtml(keep.route));
  }
  for (const alias of ALIASES) {
    const abs = join(outDir, aliasSourceFile(alias.source));
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, `<!doctype html><html lang="ru"><body>stale legacy body for ${alias.source}</body></html>`);
  }
  for (const aux of AUXILIARY) {
    const abs = join(outDir, aux);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, "<!doctype html><html><body>aux</body></html>");
  }
  const manifestPath = join(root, "manifest.json");
  writeFileSync(manifestPath, `${JSON.stringify(records, null, 2)}\n`);
  const auxPath = join(root, "aux.json");
  writeFileSync(auxPath, `${JSON.stringify(AUXILIARY, null, 2)}\n`);
  return { outDir, manifestPath, auxPath };
}

function defaultRecords(): Array<Record<string, unknown>> {
  const keepRecords = KEEPS.map((k) => ({
    source: k.route,
    destination: null,
    behavior: "keep",
    locale: "ru"
  }));
  const aliasRecords = ALIASES.map((a) => ({
    source: a.source,
    destination: a.destination,
    behavior: "static-alias",
    locale: "ru"
  }));
  return [...keepRecords, ...aliasRecords];
}

function makeFixture(records = defaultRecords()) {
  const root = mkdtempSync(join(tmpdir(), "v3-apply-alias-"));
  roots.push(root);
  return writeFixtureFiles(root, records);
}

function run(
  fixture: { outDir: string; manifestPath: string; auxPath: string },
  env: Record<string, string> = {}
) {
  return spawnSync(
    process.execPath,
    [
      join(process.cwd(), "scripts/apply-static-aliases.mjs"),
      fixture.outDir,
      fixture.manifestPath,
      fixture.auxPath
    ],
    { encoding: "utf8", env: { ...process.env, ...env } }
  );
}

function read(outDir: string, file: string): string {
  return readFileSync(join(outDir, file), "utf8");
}

function hashFile(outDir: string, file: string): string {
  return createHash("sha256").update(readFileSync(join(outDir, file))).digest("hex");
}

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

const SKIP_LINK = /<a\b[^>]*href=["']#main-content["'][^>]*>/gi;
const MAIN_CONTENT = /<main\b[^>]*\bid=["']main-content["'][^>]*>/gi;

afterEach(() => {
  for (const root of roots.splice(0)) {
    try {
      // Restore write permission so cleanup can remove read-only fixtures.
      chmodSync(root, 0o755);
    } catch {
      /* ignore */
    }
    rmSync(root, { recursive: true, force: true });
  }
});

describe("apply-static-aliases.mjs — materialization", () => {
  it("rewrites every alias to a self-contained, target-canonical alias page", () => {
    const fixture = makeFixture();
    const result = run(fixture);
    expect(result.status, result.stderr).toBe(0);

    for (const alias of ALIASES) {
      const html = read(fixture.outDir, aliasSourceFile(alias.source));
      const canonical = alias.destination === "/" ? `${ORIGIN}/` : `${ORIGIN}${alias.destination}/`;
      const localPath = alias.destination === "/" ? "/" : `${alias.destination}/`;

      expect(countMatches(html, SKIP_LINK), `skip link for ${alias.source}`).toBe(1);
      // The self-contained alias ships its own visually-hidden skip-link CSS.
      expect(html, `skip-link CSS for ${alias.source}`).toMatch(
        /\.skip-link\s*\{[^}]*position\s*:\s*absolute/i
      );
      expect(countMatches(html, MAIN_CONTENT), `main for ${alias.source}`).toBe(1);
      expect(html).toContain(`<link rel="canonical" href="${canonical}">`);
      expect(html).toMatch(/name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i);
      expect(html).toMatch(new RegExp(`http-equiv=["']refresh["'][^>]*url=${localPath.replace(/\//g, "\\/")}`, "i"));
      expect(html).toMatch(new RegExp(`<a\\b[^>]*href=["']${localPath.replace(/\//g, "\\/")}["']`, "i"));
      expect(html).toMatch(/<html\b[^>]*lang=["']ru["']/i);
      expect(html).not.toContain("stale legacy body");
    }
  });

  it("leaves every keep file byte-identical", () => {
    const fixture = makeFixture();
    const before = KEEPS.map((k) => hashFile(fixture.outDir, k.file));
    expect(run(fixture).status).toBe(0);
    const after = KEEPS.map((k) => hashFile(fixture.outDir, k.file));
    expect(after).toEqual(before);
  });

  it("is idempotent: a second run produces byte-identical output", () => {
    const fixture = makeFixture();
    expect(run(fixture).status).toBe(0);
    const first = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    expect(run(fixture).status).toBe(0);
    const second = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    expect(second).toEqual(first);
  });
});

describe("apply-static-aliases.mjs — fail-closed preflight", () => {
  it("rejects a manifest whose alias target is missing from the export", () => {
    const records = defaultRecords();
    records.push({ source: "/gone", destination: "/missing", behavior: "static-alias", locale: "ru" });
    const fixture = makeFixture(records);
    const before = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    const result = run(fixture);
    expect(result.status).not.toBe(0);
    // No source was rewritten.
    const after = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    expect(after).toEqual(before);
  });

  it("rejects a traversal source before writing anything", () => {
    const records = defaultRecords();
    records.push({ source: "/../evil", destination: "/blog", behavior: "static-alias", locale: "ru" });
    const fixture = makeFixture(records);
    const before = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    const result = run(fixture);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/traversal|invalid|source/i);
    const after = ALIASES.map((a) => read(fixture.outDir, aliasSourceFile(a.source)));
    expect(after).toEqual(before);
  });

  it("rejects an alias chain (destination is itself an alias)", () => {
    const records = defaultRecords().filter(
      (r) => r.source !== "/writing"
    );
    records.push({ source: "/writing", destination: "/ru", behavior: "static-alias", locale: "ru" });
    const fixture = makeFixture(records);
    const result = run(fixture);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/keep|chain/i);
  });

  it("rejects when a source escapes the export root via a parent symlink", () => {
    const fixture = makeFixture();
    // Replace /writing source dir with a symlink pointing outside the export.
    const outsideDir = mkdtempSync(join(tmpdir(), "v3-outside-"));
    roots.push(outsideDir);
    mkdirSync(join(outsideDir, "index-holder"), { recursive: true });
    writeFileSync(join(outsideDir, "writing.html"), "<html><body>outside</body></html>");
    const writingDir = join(fixture.outDir, "writing");
    rmSync(writingDir, { recursive: true, force: true });
    symlinkSync(outsideDir, writingDir);
    const result = run(fixture);
    expect(result.status).not.toBe(0);
    // The real keep files must remain untouched.
    const aboutBefore = keepHtml("/about");
    expect(read(fixture.outDir, "about/index.html")).toBe(aboutBefore);
  });
});

describe("apply-static-aliases.mjs — atomic rollback", () => {
  it("restores every already-written source when a commit-phase failure is injected", () => {
    const fixture = makeFixture();
    const originals = new Map(
      ALIASES.map((a) => [a.source, read(fixture.outDir, aliasSourceFile(a.source))])
    );
    const result = run(fixture, { APPLY_STATIC_ALIASES_FAULT: "commit-after-first" });
    expect(result.status).not.toBe(0);
    // Full rollback: all alias sources back to their original stale bytes.
    for (const alias of ALIASES) {
      expect(read(fixture.outDir, aliasSourceFile(alias.source))).toBe(originals.get(alias.source));
    }
    // No leftover temp siblings.
    const leftovers = readdirSync(join(fixture.outDir, "ru"))
      .filter((name) => name.includes("alias-tmp"));
    expect(leftovers).toEqual([]);
  });

  it("succeeds on a clean retry after a rolled-back run", () => {
    const fixture = makeFixture();
    expect(run(fixture, { APPLY_STATIC_ALIASES_FAULT: "commit-after-first" }).status).not.toBe(0);
    const retry = run(fixture);
    expect(retry.status, retry.stderr).toBe(0);
    expect(read(fixture.outDir, aliasSourceFile("/writing"))).toContain('rel="canonical"');
  });
});
