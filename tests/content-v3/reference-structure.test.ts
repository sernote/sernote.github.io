import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { validateReferenceStructure } from "../../lib/content-v3/reference-structure";

const exemplars = [
  {
    entityId: "inference-plane",
    contentType: "platform-area",
    path: "content/v3/ai-platform/areas/inference-plane.mdx"
  },
  {
    entityId: "prefix-cache",
    contentType: "platform-component",
    path: "content/v3/ai-platform/components/prefix-cache.mdx"
  },
  {
    entityId: "agent-session-cache-reuse",
    contentType: "case",
    path: "content/v3/ai-platform/cases/agent-session-cache-reuse.mdx"
  }
] as const;

function observe(path: string) {
  const sourceText = readFileSync(join(process.cwd(), path), "utf8");
  return {
    headings: [...sourceText.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
    markers: sourceText.includes("> **Синтетический кейс.**")
      ? ["synthetic-disclosure"]
      : []
  };
}

describe("AI Platform exemplar build-time structure gate", () => {
  it("exposes one source-observation validator instead of DTO self-validation", () => {
    expect(validateReferenceStructure).toBeTypeOf("function");
  });

  it.each(exemplars)(
    "accepts the actual $contentType exemplar only when its planned structure is present",
    ({ entityId, contentType, path }) => {
      expect(() =>
        validateReferenceStructure({ entityId, contentType, ...observe(path) })
      ).not.toThrow();
    }
  );

  it("fails closed when an actual exemplar observation loses a required section", () => {
    const observed = observe(exemplars[1].path);

    expect(() =>
      validateReferenceStructure({
        entityId: exemplars[1].entityId,
        contentType: exemplars[1].contentType,
        headings: observed.headings.slice(1),
        markers: observed.markers
      })
    ).toThrow(/missing.*Проблема/i);
  });

  it("fails closed when the synthetic case disclosure is missing", () => {
    const observed = observe(exemplars[2].path);

    expect(() =>
      validateReferenceStructure({
        entityId: exemplars[2].entityId,
        contentType: exemplars[2].contentType,
        headings: observed.headings,
        markers: []
      })
    ).toThrow(/missing.*synthetic-disclosure/i);
  });
});
