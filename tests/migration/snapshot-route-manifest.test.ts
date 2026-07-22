import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

import { parseManifest, validateManifest, type RouteRecord } from "@/lib/migration/manifest";

const roots: string[] = [];

/** Routes present in a realistic slice of the v3 export. */
const ROUTE_FILES = [
  // root v3 canonical destinations
  "index.html",
  "blog/index.html",
  "work/index.html",
  "ai-platform/index.html",
  "ai-platform/map/index.html",
  "ai-platform/components/prefix-cache/index.html",
  "about/index.html",
  "contact/index.html",
  // legacy root routes that become the four selected aliases
  "writing/index.html",
  "handbook/index.html",
  "handbook/platform-map/index.html",
  "handbook/caching/prefix-cache/index.html",
  "handbook/start-here/index.html",
  // english set (kept)
  "en/index.html",
  "en/about/index.html",
  "en/handbook/index.html",
  // russian compatibility set (flattened aliases)
  "ru/index.html",
  "ru/about/index.html",
  "ru/writing/index.html",
  "ru/handbook/index.html",
  "ru/handbook/platform-map/index.html",
  "ru/handbook/caching/prefix-cache/index.html",
  "ru/handbook/start-here/index.html"
];

const AUXILIARY_FILES = ["404.html", "404/index.html", "_not-found/index.html"];

function createFixture(): string {
  const root = mkdtempSync(join(tmpdir(), "v3-snapshot-"));
  roots.push(root);
  for (const relative of [...ROUTE_FILES, ...AUXILIARY_FILES]) {
    const absolute = join(root, "out", relative);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, "<html><body>fixture</body></html>");
  }
  return root;
}

function expectedRoutes(): string[] {
  return ROUTE_FILES.map((file) =>
    file === "index.html" ? "/" : `/${file.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`
  );
}

function run(root: string, manifestPath: string) {
  return spawnSync(
    process.execPath,
    [
      join(process.cwd(), "scripts/snapshot-route-manifest.mjs"),
      join(root, "out"),
      manifestPath,
      join(process.cwd(), "config/v3-export-auxiliary-paths.json")
    ],
    { encoding: "utf8" }
  );
}

function generate(): { records: RouteRecord[]; raw: string } {
  const root = createFixture();
  const manifestPath = join(root, "manifest.json");
  const result = run(root, manifestPath);
  expect(result.status, result.stderr).toBe(0);
  const raw = readFileSync(manifestPath, "utf8");
  return { records: parseManifest(JSON.parse(raw)), raw };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("snapshot-route-manifest.mjs", () => {
  it("produces a manifest that passes validation against the exported route set", () => {
    const { records } = generate();
    expect(() => validateManifest(records, expectedRoutes())).not.toThrow();
  });

  it("omits every auxiliary artifact, including duplicate 404 files", () => {
    const { records } = generate();
    const sources = records.map((r) => r.source);
    expect(sources).not.toContain("/404");
    expect(sources).not.toContain("/_not-found");
    expect(records).toHaveLength(ROUTE_FILES.length);
  });

  it("keeps root and english routes and infers their locale from the public path", () => {
    const { records } = generate();
    const bySource = new Map(records.map((r) => [r.source, r]));
    expect(bySource.get("/about")).toMatchObject({ behavior: "keep", locale: "ru" });
    expect(bySource.get("/en/about")).toMatchObject({ behavior: "keep", locale: "en" });
    expect(bySource.get("/en")).toMatchObject({ behavior: "keep", locale: "en" });
  });

  it("applies the four selected legacy aliases to their v3 destinations", () => {
    const { records } = generate();
    const bySource = new Map(records.map((r) => [r.source, r]));
    expect(bySource.get("/writing")).toMatchObject({ behavior: "static-alias", destination: "/blog" });
    expect(bySource.get("/handbook")).toMatchObject({ destination: "/ai-platform" });
    expect(bySource.get("/handbook/platform-map")).toMatchObject({ destination: "/ai-platform/map" });
    expect(bySource.get("/handbook/caching/prefix-cache")).toMatchObject({
      destination: "/ai-platform/components/prefix-cache"
    });
  });

  it("flattens the /ru compatibility set directly to root canonicals", () => {
    const { records } = generate();
    const bySource = new Map(records.map((r) => [r.source, r]));
    expect(bySource.get("/ru")).toMatchObject({ behavior: "static-alias", destination: "/" });
    expect(bySource.get("/ru/about")).toMatchObject({ destination: "/about" });
    expect(bySource.get("/ru/handbook/start-here")).toMatchObject({
      destination: "/handbook/start-here"
    });
  });

  it("flattens legacy /ru aliases straight to their final v3 destinations without chains", () => {
    const { records } = generate();
    const bySource = new Map(records.map((r) => [r.source, r]));
    expect(bySource.get("/ru/writing")).toMatchObject({ destination: "/blog" });
    expect(bySource.get("/ru/handbook")).toMatchObject({ destination: "/ai-platform" });
    expect(bySource.get("/ru/handbook/platform-map")).toMatchObject({ destination: "/ai-platform/map" });
    expect(bySource.get("/ru/handbook/caching/prefix-cache")).toMatchObject({
      destination: "/ai-platform/components/prefix-cache"
    });
  });

  it("writes a sorted, deterministic manifest", () => {
    const first = generate();
    const second = generate();
    expect(first.raw).toBe(second.raw);
    const sources = first.records.map((r) => r.source);
    expect(sources).toEqual([...sources].sort());
  });
});
