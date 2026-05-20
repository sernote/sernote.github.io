export type CostInput = {
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  inputPricePerMillion: number;
  cachedInputPricePerMillion: number;
  outputPricePerMillion: number;
  requestCount: number;
};

export type CostResult = {
  costWithoutCache: number;
  costWithCache: number;
  savings: number;
  savingsPercent: number;
};

export function calculateLlmCost(input: CostInput): CostResult {
  const requestCount = Math.max(input.requestCount, 0);
  const inputTokens = Math.max(input.inputTokens, 0);
  const cachedInputTokens = Math.min(
    Math.max(input.cachedInputTokens, 0),
    inputTokens
  );
  const uncachedInputTokens = inputTokens - cachedInputTokens;
  const outputTokens = Math.max(input.outputTokens, 0);

  const costWithoutCache =
    requestCount *
    ((inputTokens / 1_000_000) * input.inputPricePerMillion +
      (outputTokens / 1_000_000) * input.outputPricePerMillion);

  const costWithCache =
    requestCount *
    ((uncachedInputTokens / 1_000_000) * input.inputPricePerMillion +
      (cachedInputTokens / 1_000_000) * input.cachedInputPricePerMillion +
      (outputTokens / 1_000_000) * input.outputPricePerMillion);

  const savings = Math.max(costWithoutCache - costWithCache, 0);
  const savingsPercent =
    costWithoutCache === 0 ? 0 : Math.round((savings / costWithoutCache) * 100);

  return {
    costWithoutCache: roundCurrency(costWithoutCache),
    costWithCache: roundCurrency(costWithCache),
    savings: roundCurrency(savings),
    savingsPercent
  };
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

