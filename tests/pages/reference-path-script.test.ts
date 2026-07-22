import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];

const files = {
  "ai-platform/index.html": [
    "/ai-platform/map",
    "#current-vertical",
    "/ai-platform/areas/inference-plane",
    "/ai-platform/components/prefix-cache",
    "/ai-platform/cases/agent-session-cache-reuse",
    "/projects/audit-prompt-caching"
  ],
  "ai-platform/map/index.html": ["/ai-platform", "/ai-platform/areas/inference-plane"],
  "ai-platform/areas/inference-plane/index.html": [
    "/ai-platform/map",
    "/ai-platform/components/prefix-cache"
  ],
  "ai-platform/components/prefix-cache/index.html": [
    "/ai-platform/areas/inference-plane",
    "/ai-platform/cases/agent-session-cache-reuse",
    "/projects/audit-prompt-caching"
  ],
  "ai-platform/cases/agent-session-cache-reuse/index.html": [
    "/ai-platform/components/prefix-cache",
    "/projects/audit-prompt-caching"
  ],
  "projects/audit-prompt-caching/index.html": [
    "/ai-platform/components/prefix-cache"
  ]
} as const;

function createFixture(): string {
  const root = mkdtempSync(join(tmpdir(), "v3-reference-path-"));
  roots.push(root);
  for (const [relativePath, hrefs] of Object.entries(files)) {
    const absolutePath = join(root, relativePath);
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(
      absolutePath,
      `<html><body>${hrefs.map((href) => `<a href="${href}">${href}</a>`).join("")}</body></html>`
    );
  }
  return root;
}

function run(root: string) {
  return spawnSync(
    process.execPath,
    [join(process.cwd(), "scripts/check-v3-reference-path.mjs"), root],
    { encoding: "utf8" }
  );
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("v3 static reference-path audit", () => {
  it("passes only when all six exact files and transitions exist", () => {
    const result = run(createFixture());

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("6 files");
    expect(result.stdout).toContain("16 transitions");
  });

  it("fails closed when one exact export file is missing", () => {
    const root = createFixture();
    rmSync(join(root, "ai-platform/cases/agent-session-cache-reuse/index.html"));
    const result = run(root);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/missing export file.*agent-session-cache-reuse/i);
  });

  it("fails closed when an expected transition is missing", () => {
    const root = createFixture();
    writeFileSync(
      join(root, "projects/audit-prompt-caching/index.html"),
      "<html><body>Project without a component link</body></html>"
    );
    const result = run(root);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/missing transition.*prefix-cache/i);
  });

  it("rejects deceptive href text that is not an anchor", () => {
    const root = createFixture();
    writeFileSync(
      join(root, "projects/audit-prompt-caching/index.html"),
      '<html><body><div href="/ai-platform/components/prefix-cache">Not a link</div></body></html>'
    );
    const result = run(root);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/missing transition.*prefix-cache/i);
  });
});
