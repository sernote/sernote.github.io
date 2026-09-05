export type CacheRoutingInput = {
  warmQueueMs: number;
  coldQueueMs: number;
  coldPrefillMs: number;
  warmPrefillMs: number;
  prefixAvailable: boolean;
};

export type CacheRouteCandidate = {
  queueMs: number;
  prefillMs: number;
  totalMs: number;
};

export type CacheRoutingComparison = {
  candidateA: CacheRouteCandidate;
  candidateB: CacheRouteCandidate;
  winner: "A" | "B" | "tie";
  warmQueueBreakEvenMs: number;
};

export function compareCacheRoutes(input: CacheRoutingInput): CacheRoutingComparison {
  validateInput(input);

  const warmRemainingPrefillMs = input.prefixAvailable
    ? input.warmPrefillMs
    : input.coldPrefillMs;
  const candidateA = candidate(input.warmQueueMs, warmRemainingPrefillMs);
  const candidateB = candidate(input.coldQueueMs, input.coldPrefillMs);

  return {
    candidateA,
    candidateB,
    winner:
      candidateA.totalMs < candidateB.totalMs
        ? "A"
        : candidateB.totalMs < candidateA.totalMs
          ? "B"
          : "tie",
    warmQueueBreakEvenMs: candidateB.totalMs - warmRemainingPrefillMs
  };
}

function candidate(queueMs: number, prefillMs: number): CacheRouteCandidate {
  return { queueMs, prefillMs, totalMs: queueMs + prefillMs };
}

function validateInput(input: CacheRoutingInput): void {
  const values = [
    input.warmQueueMs,
    input.coldQueueMs,
    input.coldPrefillMs,
    input.warmPrefillMs
  ];

  if (
    values.some((value) => !Number.isFinite(value) || value < 0) ||
    input.warmPrefillMs > input.coldPrefillMs ||
    typeof input.prefixAvailable !== "boolean"
  ) {
    throw new Error("Invalid cache routing input");
  }
}
