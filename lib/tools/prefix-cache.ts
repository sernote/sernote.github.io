export type PrefixCacheInput = {
  systemPrompt: string;
  toolSchemaJson: string;
  exampleRequestOne: string;
  exampleRequestTwo: string;
};

export type PrefixCacheResult = {
  score: number;
  unstableSegments: string[];
  dynamicFieldWarnings: string[];
  toolSchemaVolatilityWarnings: string[];
  recommendations: string[];
};

const TEMPLATE_PATTERN = /\{\{[^}]+\}\}/g;
const ISO_TIMESTAMP_PATTERN = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z\b/;
const VOLATILE_KEYS = [
  "trace_id",
  "request_id",
  "user_id",
  "session_id",
  "timestamp",
  "created_at",
  "updated_at",
  "now",
  "date"
];

export function estimatePrefixCacheability(input: PrefixCacheInput): PrefixCacheResult {
  const unstableSegments = Array.from(
    new Set(input.systemPrompt.match(TEMPLATE_PATTERN) ?? [])
  );
  const dynamicFieldWarnings = detectDynamicFields(input);
  const toolSchemaVolatilityWarnings = detectToolSchemaVolatility(input.toolSchemaJson);
  const sharedPrefixRatio = commonPrefixRatio(
    input.exampleRequestOne,
    input.exampleRequestTwo
  );

  let score = 92;
  score -= unstableSegments.length * 12;
  score -= dynamicFieldWarnings.length * 7;
  score -= toolSchemaVolatilityWarnings.length * 10;
  score += Math.round(sharedPrefixRatio * 12);

  const recommendations = buildRecommendations({
    unstableSegments,
    dynamicFieldWarnings,
    toolSchemaVolatilityWarnings,
    sharedPrefixRatio
  });

  return {
    score: clamp(Math.round(score), 0, 100),
    unstableSegments,
    dynamicFieldWarnings,
    toolSchemaVolatilityWarnings,
    recommendations
  };
}

function detectDynamicFields(input: PrefixCacheInput): string[] {
  const values = new Set<string>();
  const combined = [
    input.systemPrompt,
    input.toolSchemaJson,
    input.exampleRequestOne,
    input.exampleRequestTwo
  ].join("\n");

  for (const segment of combined.match(TEMPLATE_PATTERN) ?? []) {
    values.add(segment);
  }

  for (const key of VOLATILE_KEYS) {
    if (combined.toLowerCase().includes(key)) {
      values.add(key);
    }
  }

  if (
    ISO_TIMESTAMP_PATTERN.test(input.exampleRequestOne) ||
    ISO_TIMESTAMP_PATTERN.test(input.exampleRequestTwo)
  ) {
    values.add("timestamp");
  }

  return Array.from(values);
}

function detectToolSchemaVolatility(toolSchemaJson: string): string[] {
  const warnings: string[] = [];
  const lower = toolSchemaJson.toLowerCase();

  for (const key of VOLATILE_KEYS) {
    if (lower.includes(key)) {
      warnings.push(`Tool schema includes volatile field: ${key}`);
    }
  }

  try {
    JSON.parse(toolSchemaJson);
  } catch {
    warnings.push("Tool schema is not valid JSON, which makes cache behavior harder to reason about.");
  }

  return Array.from(new Set(warnings));
}

function commonPrefixRatio(left: string, right: string): number {
  const maxLength = Math.max(left.length, right.length, 1);
  let prefixLength = 0;

  while (
    prefixLength < left.length &&
    prefixLength < right.length &&
    left[prefixLength] === right[prefixLength]
  ) {
    prefixLength += 1;
  }

  return prefixLength / maxLength;
}

function buildRecommendations(input: {
  unstableSegments: string[];
  dynamicFieldWarnings: string[];
  toolSchemaVolatilityWarnings: string[];
  sharedPrefixRatio: number;
}): string[] {
  const recommendations: string[] = [];

  if (input.unstableSegments.length > 0) {
    recommendations.push("Move dates, user identifiers, and per-request values after the stable prompt prefix.");
  }

  if (input.toolSchemaVolatilityWarnings.length > 0) {
    recommendations.push("Keep tool schemas stable and avoid embedding trace/session/request fields in the cached prefix.");
  }

  if (input.dynamicFieldWarnings.length > 0) {
    recommendations.push("Normalize dynamic fields into late request payloads instead of early system instructions.");
  }

  if (input.sharedPrefixRatio < 0.6) {
    recommendations.push("Make the first tokens of similar requests identical so provider prefix caches can match them.");
  }

  if (recommendations.length === 0) {
    recommendations.push("The prompt shape is cache-friendly; keep stable instructions and schemas before dynamic payloads.");
  }

  return recommendations;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

