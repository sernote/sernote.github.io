import { describe, expect, it } from "vitest";

import { compareCacheRoutes } from "../../lib/experiments/cache-routing";

const baseInput = {
  coldQueueMs: 100,
  coldPrefillMs: 600,
  warmPrefillMs: 80,
  prefixAvailable: true
};

describe("compareCacheRoutes", () => {
  it("chooses the warm replica while its queue stays below break-even", () => {
    const result = compareCacheRoutes({ ...baseInput, warmQueueMs: 100 });

    expect(result.candidateA).toEqual({ queueMs: 100, prefillMs: 80, totalMs: 180 });
    expect(result.candidateB).toEqual({ queueMs: 100, prefillMs: 600, totalMs: 700 });
    expect(result.winner).toBe("A");
    expect(result.warmQueueBreakEvenMs).toBe(620);
  });

  it("chooses the cold replica when the warm queue exceeds break-even", () => {
    const result = compareCacheRoutes({ ...baseInput, warmQueueMs: 900 });

    expect(result.candidateA.totalMs).toBe(980);
    expect(result.candidateB.totalMs).toBe(700);
    expect(result.winner).toBe("B");
  });

  it("reports an exact tie explicitly", () => {
    expect(compareCacheRoutes({ ...baseInput, warmQueueMs: 620 }).winner).toBe("tie");
  });

  it("uses cold prefill for A when the prefix is absent", () => {
    const result = compareCacheRoutes({
      ...baseInput,
      warmQueueMs: 100,
      prefixAvailable: false
    });

    expect(result.candidateA.prefillMs).toBe(600);
    expect(result.candidateA.totalMs).toBe(700);
    expect(result.winner).toBe("tie");
    expect(result.warmQueueBreakEvenMs).toBe(100);
  });

  it.each([
    ["negative", { ...baseInput, warmQueueMs: -1 }],
    ["not finite", { ...baseInput, warmQueueMs: Number.POSITIVE_INFINITY }],
    ["warm prefill above cold prefill", { ...baseInput, warmQueueMs: 0, warmPrefillMs: 601 }]
  ])("rejects %s model input", (_label, input) => {
    expect(() => compareCacheRoutes(input)).toThrow(/invalid cache routing input/i);
  });
});
