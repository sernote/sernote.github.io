import { describe, expect, it } from "vitest";

import { estimatePrefixCacheability } from "../lib/tools/prefix-cache";
import { calculateLlmCost } from "../lib/tools/cost";
import { summarizeQualityGate } from "../lib/tools/quality-gate";
import { alternateLocalePath, localizedPath } from "../lib/i18n";

describe("Prefix Cache Auditor calculations", () => {
  it("penalizes dynamic prefixes and schema volatility", () => {
    const result = estimatePrefixCacheability({
      systemPrompt: "You are stable. Date: {{today}}. User: {{user_id}}.",
      toolSchemaJson: "{\"name\":\"route\",\"properties\":{\"trace_id\":{\"type\":\"string\"}}}",
      exampleRequestOne: "Summarize account 123 with timestamp 2026-05-18T10:10:00Z",
      exampleRequestTwo: "Summarize account 987 with timestamp 2026-05-18T10:11:00Z"
    });

    expect(result.score).toBeLessThan(70);
    expect(result.unstableSegments).toContain("{{today}}");
    expect(result.dynamicFieldWarnings).toEqual(
      expect.arrayContaining(["{{user_id}}", "timestamp"])
    );
    expect(result.toolSchemaVolatilityWarnings.length).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(1);
  });

  it("rewards a stable prompt and matching request prefix", () => {
    const result = estimatePrefixCacheability({
      systemPrompt: "You classify support tickets using the fixed taxonomy below.",
      toolSchemaJson: "{\"name\":\"classify\",\"properties\":{\"label\":{\"enum\":[\"billing\",\"technical\"]}}}",
      exampleRequestOne: "Classify this ticket: cannot access billing page",
      exampleRequestTwo: "Classify this ticket: invoice is missing"
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.unstableSegments).toEqual([]);
  });
});

describe("LLM Cost Calculator", () => {
  it("computes cost with and without cache", () => {
    const result = calculateLlmCost({
      inputTokens: 10_000,
      outputTokens: 2_000,
      cachedInputTokens: 6_000,
      inputPricePerMillion: 3,
      cachedInputPricePerMillion: 0.3,
      outputPricePerMillion: 15,
      requestCount: 100
    });

    expect(result.costWithoutCache).toBeCloseTo(6);
    expect(result.costWithCache).toBeCloseTo(4.38);
    expect(result.savings).toBeCloseTo(1.62);
    expect(result.savingsPercent).toBeCloseTo(27);
  });
});

describe("AI Quality Gate checklist", () => {
  it("summarizes readiness from checked items", () => {
    const result = summarizeQualityGate({
      items: [
        { id: "evals", label: "Offline evals exist", checked: true },
        { id: "rollback", label: "Rollback path exists", checked: true },
        { id: "observability", label: "Observability exists", checked: false }
      ]
    });

    expect(result.completed).toBe(2);
    expect(result.total).toBe(3);
    expect(result.percent).toBe(67);
    expect(result.status).toBe("needs-work");
  });
});

describe("locale routing", () => {
  it("maps default routes to Russian static routes and back", () => {
    expect(localizedPath("/handbook/platform-map", "ru")).toBe("/ru/handbook/platform-map");
    expect(localizedPath("/ru/handbook/platform-map", "en")).toBe("/handbook/platform-map");
    expect(alternateLocalePath("/tools/prefix-cache-auditor", "en")).toBe("/ru/tools/prefix-cache-auditor");
    expect(alternateLocalePath("/ru/tools/prefix-cache-auditor", "ru")).toBe("/tools/prefix-cache-auditor");
  });
});
