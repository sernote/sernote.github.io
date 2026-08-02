import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { parseManifest, validateManifest } from "@/lib/migration/manifest";

const manifest = validateManifest(
  parseManifest(JSON.parse(readFileSync("config/v3-route-manifest.json", "utf8")))
);

const keep = new Set([
  "/",
  "/about",
  "/ai-platform",
  "/ai-platform/areas/inference-plane",
  "/ai-platform/cases/agent-session-cache-reuse",
  "/ai-platform/components/prefix-cache",
  "/ai-platform/map",
  "/blog",
  "/blog/ai-platform-before-gpu",
  "/blog/workload-shape-over-model-name",
  "/materials",
  "/projects/audit-prompt-caching",
  "/talks/maas-vs-self-hosted"
]);

const aliases = new Map<string, string>([
  ["/contact", "/about"],
  ["/handbook", "/ai-platform"],
  ["/handbook/caching/prefix-cache", "/ai-platform/components/prefix-cache"],
  ["/handbook/inference/embeddings-serving", "/ai-platform/areas/inference-plane"],
  ["/handbook/inference/inference-runtime", "/ai-platform/areas/inference-plane"],
  ["/handbook/inference/stt-serving", "/ai-platform/areas/inference-plane"],
  ["/handbook/manifesto", "/ai-platform"],
  ["/handbook/maturity-model", "/ai-platform"],
  ["/handbook/platform-map", "/ai-platform/map"],
  ["/handbook/start-here", "/ai-platform"],
  ["/handbook/strategy/maas-vs-self-hosted", "/ai-platform"],
  ["/projects", "/materials"],
  ["/talks", "/materials"],
  ["/tools", "/materials"],
  ["/tools/prefix-cache-auditor", "/projects/audit-prompt-caching"],
  ["/work", "/materials"],
  ["/writing", "/blog"],
  ["/ru", "/"],
  ["/ru/about", "/about"],
  ["/ru/contact", "/about"],
  ["/ru/handbook", "/ai-platform"],
  ["/ru/handbook/caching/prefix-cache", "/ai-platform/components/prefix-cache"],
  ["/ru/handbook/inference/embeddings-serving", "/ai-platform/areas/inference-plane"],
  ["/ru/handbook/inference/inference-runtime", "/ai-platform/areas/inference-plane"],
  ["/ru/handbook/inference/stt-serving", "/ai-platform/areas/inference-plane"],
  ["/ru/handbook/manifesto", "/ai-platform"],
  ["/ru/handbook/maturity-model", "/ai-platform"],
  ["/ru/handbook/platform-map", "/ai-platform/map"],
  ["/ru/handbook/start-here", "/ai-platform"],
  ["/ru/handbook/strategy/maas-vs-self-hosted", "/ai-platform"],
  ["/ru/projects", "/materials"],
  ["/ru/talks", "/materials"],
  ["/ru/tools", "/materials"],
  ["/ru/tools/prefix-cache-auditor", "/projects/audit-prompt-caching"],
  ["/ru/writing", "/blog"]
]);

describe("v3.1 route decision set", () => {
  it("contains exactly 102 non-service route decisions", () => {
    expect(manifest).toHaveLength(102);
    expect(new Set(manifest.map((record) => record.source)).size).toBe(102);
  });

  it("matches the accepted keep and direct-alias sets", () => {
    const actualKeeps = new Set(
      manifest.filter((record) => record.behavior === "keep").map((record) => record.source)
    );
    const actualAliases = new Map(
      manifest
        .filter((record) => record.behavior === "static-alias")
        .map((record) => [record.source, record.destination as string])
    );
    expect(actualKeeps).toEqual(keep);
    expect(actualAliases).toEqual(aliases);
  });

  it("contains exactly 54 explicit archives with direct keep targets", () => {
    const archives = manifest.filter((record) => record.behavior === "archive");
    expect(archives).toHaveLength(54);
    for (const record of archives) {
      expect(record.destination).toBeNull();
      expect(record.archivedAt).toBe("2026-08-02");
      expect(record.archiveTarget).not.toBe(record.source);
      expect(keep.has(record.archiveTarget)).toBe(true);
    }
  });
});
