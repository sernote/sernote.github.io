// @ts-expect-error Node's type-stripping loader requires the explicit .ts extension.
import { compareCacheRoutes, type CacheRoutingInput } from "../lib/experiments/cache-routing.ts";

const baseline = {
  coldQueueMs: 100,
  coldPrefillMs: 600,
  warmPrefillMs: 80,
  prefixAvailable: true
} satisfies Omit<CacheRoutingInput, "warmQueueMs">;

const cases: Array<{ name: string; input: CacheRoutingInput }> = [
  { name: "warm-replica-wins", input: { ...baseline, warmQueueMs: 100 } },
  { name: "cold-replica-wins", input: { ...baseline, warmQueueMs: 900 } },
  { name: "break-even-tie", input: { ...baseline, warmQueueMs: 620 } },
  { name: "prefix-absent", input: { ...baseline, warmQueueMs: 100, prefixAvailable: false } }
];

const output = {
  synthetic: true,
  formula: "queueMs + remainingPrefillMs",
  excludes: ["decode", "network", "GPU prediction", "end-to-end latency"],
  cases: cases.map(({ name, input }) => ({ name, input, result: compareCacheRoutes(input) }))
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
