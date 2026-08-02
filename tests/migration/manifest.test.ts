import { describe, expect, it } from "vitest";

import {
  ROUTE_BEHAVIORS,
  SELECTED_STATIC_ALIASES,
  createRouteManifest,
  getSelectedAliasDestination,
  normalizeRoutePath,
  parseManifest,
  validateManifest,
  type RouteRecord
} from "@/lib/migration/manifest";

function keep(source: string, locale: "en" | "ru" = "ru"): RouteRecord {
  return { source, destination: null, behavior: "keep", locale };
}

function alias(source: string, destination: string, locale: "en" | "ru" = "ru"): RouteRecord {
  return { source, destination, behavior: "static-alias", locale };
}

function archive(
  source: string,
  archiveTarget: string,
  locale: "en" | "ru" = "ru"
): RouteRecord {
  return {
    source,
    destination: null,
    behavior: "archive",
    locale,
    archivedAt: "2026-08-02",
    archiveTarget
  };
}

/**
 * A minimal but internally consistent manifest: two keep destinations plus two
 * aliases that both resolve to a distinct keep record.
 */
function validRecords(): RouteRecord[] {
  return [
    keep("/"),
    keep("/blog"),
    keep("/ai-platform"),
    alias("/writing", "/blog"),
    alias("/handbook", "/ai-platform"),
    alias("/ru/writing", "/blog"),
    alias("/ru", "/")
  ];
}

describe("normalizeRoutePath", () => {
  it("keeps root as a single slash", () => {
    expect(normalizeRoutePath("/")).toBe("/");
  });

  it("strips a single trailing slash from a nested path", () => {
    expect(normalizeRoutePath("/blog/")).toBe("/blog");
  });

  it("leaves an unslashed nested path unchanged", () => {
    expect(normalizeRoutePath("/blog")).toBe("/blog");
  });

  it("drops query and fragment", () => {
    expect(normalizeRoutePath("/blog/?utm=1#top")).toBe("/blog");
  });

  it("adds a leading slash when missing", () => {
    expect(normalizeRoutePath("blog")).toBe("/blog");
  });
});

describe("parseManifest", () => {
  it("accepts a valid record array and returns typed records", () => {
    const records = parseManifest(validRecords());
    expect(records).toHaveLength(7);
    expect(records[0]).toEqual({ source: "/", destination: null, behavior: "keep", locale: "ru" });
  });

  it("rejects a non-array payload", () => {
    expect(() => parseManifest({ source: "/" })).toThrow(/array/i);
  });

  it("rejects an unknown behavior value", () => {
    expect(() =>
      parseManifest([{ source: "/x", destination: null, behavior: "redirect", locale: "ru" }])
    ).toThrow(/behavior/i);
  });

  it("rejects an unknown locale value", () => {
    expect(() =>
      parseManifest([{ source: "/x", destination: null, behavior: "keep", locale: "de" }])
    ).toThrow(/locale/i);
  });

  it("rejects a missing source", () => {
    expect(() =>
      parseManifest([{ destination: null, behavior: "keep", locale: "ru" }])
    ).toThrow(/source/i);
  });

  it("exposes the normative behavior enum", () => {
    expect([...ROUTE_BEHAVIORS]).toEqual([
      "keep",
      "static-alias",
      "archive"
    ]);
  });
});

describe("validateManifest", () => {
  it("accepts an internally consistent manifest", () => {
    expect(() => validateManifest(validRecords())).not.toThrow();
  });

  it("rejects duplicate normalized sources", () => {
    const records = [...validRecords(), keep("/blog/")];
    expect(() => validateManifest(records)).toThrow(/duplicate/i);
  });

  it("rejects '/' as an alias source", () => {
    const records = [keep("/blog"), alias("/", "/blog")];
    expect(() => validateManifest(records)).toThrow(/root|"\/"/i);
  });

  it("allows '/' as an alias destination", () => {
    const records = [keep("/"), alias("/ru", "/")];
    expect(() => validateManifest(records)).not.toThrow();
  });

  it("rejects a static-alias with no destination", () => {
    const records = [keep("/blog"), { source: "/writing", destination: null, behavior: "static-alias", locale: "ru" } as unknown as RouteRecord];
    expect(() => validateManifest(records)).toThrow(/destination/i);
  });

  it("rejects a keep record with a non-null destination", () => {
    const records = [{ source: "/blog", destination: "/x", behavior: "keep", locale: "ru" } as unknown as RouteRecord];
    expect(() => validateManifest(records)).toThrow(/keep/i);
  });

  it("requires archive destination, date and direct keep target", () => {
    expect(() => validateManifest([keep("/blog"), archive("/old", "/blog")])).not.toThrow();
    expect(() =>
      validateManifest([
        keep("/blog"),
        { ...archive("/old", "/blog"), destination: "/blog" } as RouteRecord
      ])
    ).toThrow(/archive|destination/i);
    expect(() =>
      validateManifest([
        keep("/blog"),
        { ...archive("/old", "/blog"), archivedAt: undefined } as unknown as RouteRecord
      ])
    ).toThrow(/archivedAt|date/i);
    expect(() => validateManifest([keep("/blog"), archive("/old", "/missing")])).toThrow(
      /archiveTarget|keep/i
    );
  });

  it("rejects archive fields on keep and alias records", () => {
    expect(() =>
      validateManifest([
        { ...keep("/blog"), archivedAt: "2026-08-02", archiveTarget: "/" } as RouteRecord
      ])
    ).toThrow(/archive/i);
    expect(() =>
      validateManifest([
        keep("/blog"),
        { ...alias("/writing", "/blog"), archivedAt: "2026-08-02" } as RouteRecord
      ])
    ).toThrow(/archive/i);
  });

  it("rejects an alias whose destination is not a keep record (chain)", () => {
    const records = [keep("/blog"), alias("/writing", "/blog"), alias("/legacy", "/writing")];
    expect(() => validateManifest(records)).toThrow(/keep|chain/i);
  });

  it("rejects an alias whose destination is missing from the manifest", () => {
    const records = [keep("/blog"), alias("/writing", "/nowhere")];
    expect(() => validateManifest(records)).toThrow(/destination|keep/i);
  });

  it("accepts two aliases sharing one keep destination", () => {
    const records = [keep("/blog"), alias("/writing", "/blog"), alias("/ru/writing", "/blog")];
    expect(() => validateManifest(records)).not.toThrow();
  });

  it("requires the source set to equal the exported route set when provided", () => {
    const records = validRecords();
    const exported = records.map((r) => r.source);
    expect(() => validateManifest(records, exported)).not.toThrow();
  });

  it("rejects a manifest that is missing an exported route", () => {
    const records = validRecords();
    const exported = [...records.map((r) => r.source), "/contact"];
    expect(() => validateManifest(records, exported)).toThrow(/contact|missing|differ/i);
  });

  it("rejects a manifest source not present in the export", () => {
    const records = [...validRecords(), keep("/ghost")];
    const exported = validRecords().map((r) => r.source);
    expect(() => validateManifest(records, exported)).toThrow(/ghost|extra|differ/i);
  });
});

describe("createRouteManifest lookups", () => {
  const manifest = createRouteManifest(validRecords());

  it("returns the exact decision for a known path", () => {
    expect(manifest.getDecisionByPath("/blog")?.behavior).toBe("keep");
    expect(manifest.getDecisionByPath("/writing")?.behavior).toBe("static-alias");
  });

  it("normalizes a trailing slash on lookup", () => {
    expect(manifest.getDecisionByPath("/blog/")?.source).toBe("/blog");
  });

  it("returns null decision for an unknown path", () => {
    expect(manifest.getDecisionByPath("/unknown")).toBeNull();
  });

  it("returns an alias only for alias sources", () => {
    expect(manifest.getAliasByPath("/writing")?.destination).toBe("/blog");
    expect(manifest.getAliasByPath("/blog")).toBeNull();
  });

  it("resolves an alias source to its canonical keep destination", () => {
    expect(manifest.resolveCanonicalDestination("/writing")).toBe("/blog");
    expect(manifest.resolveCanonicalDestination("/ru")).toBe("/");
  });

  it("resolves a keep source to itself", () => {
    expect(manifest.resolveCanonicalDestination("/blog")).toBe("/blog");
  });

  it("refuses to resolve an archive as a canonical relation target", () => {
    const withArchive = createRouteManifest([
      keep("/blog"),
      archive("/old", "/blog")
    ]);
    expect(() => withArchive.resolveCanonicalDestination("/old")).toThrow(/archive/i);
  });

  it("returns every decision", () => {
    expect(manifest.getAllRouteDecisions()).toHaveLength(7);
  });
});

describe("SELECTED_STATIC_ALIASES", () => {
  it("declares exactly the four selected legacy-to-v3 aliases", () => {
    expect(SELECTED_STATIC_ALIASES.map((a) => [a.source, a.destination])).toEqual([
      ["/writing", "/blog"],
      ["/handbook", "/ai-platform"],
      ["/handbook/platform-map", "/ai-platform/map"],
      ["/handbook/caching/prefix-cache", "/ai-platform/components/prefix-cache"]
    ]);
  });
});

describe("getSelectedAliasDestination", () => {
  it("returns the destination for each selected legacy source", () => {
    expect(getSelectedAliasDestination("/writing")).toBe("/blog");
    expect(getSelectedAliasDestination("/handbook")).toBe("/ai-platform");
    expect(getSelectedAliasDestination("/handbook/platform-map")).toBe("/ai-platform/map");
    expect(getSelectedAliasDestination("/handbook/caching/prefix-cache")).toBe(
      "/ai-platform/components/prefix-cache"
    );
  });

  it("normalizes a trailing slash before lookup", () => {
    expect(getSelectedAliasDestination("/handbook/platform-map/")).toBe("/ai-platform/map");
  });

  it("returns null for a route that is not a selected alias", () => {
    expect(getSelectedAliasDestination("/handbook/start-here")).toBeNull();
    expect(getSelectedAliasDestination("/handbook")).not.toBeNull();
    expect(getSelectedAliasDestination("/about")).toBeNull();
  });
});
