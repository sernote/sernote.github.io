# Cache routing experiment

This evidence is synthetic and reproducible. It exercises the same pure
`compareCacheRoutes` function used by the interactive chapter component. The
calculation is limited to queue time plus remaining prefill time; it is not a
benchmark, production telemetry, a GPU prediction, or end-to-end latency.

From the repository root, regenerate the checked-in result with Node.js 22:

```bash
node --experimental-strip-types scripts/cache-routing-experiment.ts > evidence/v3/cache-routing/result.json
```

The four fixed cases cover a warm-replica win, a cold-replica win, the exact
break-even tie, and an absent prefix. No network access, clock, random value, or
external data is used.
