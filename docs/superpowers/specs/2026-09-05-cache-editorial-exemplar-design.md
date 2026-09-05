# Cache and routing editorial exemplar

Approved direction: user accepted the site product audit on 2026-09-05, then supplied the HighLoad 2026 presentation and rehearsal to ground the cache material. This is the first complete editorial slice of the larger author/blog/handbook redesign.

## Outcome

A reader can enter through an authored essay, understand prefix-cache reuse and replica routing in the handbook, change a small interactive example to find when a cold replica wins, and locate the author's related public work. Existing URLs and static export remain intact.

## Scope

- New Russian article `/blog/cache-locality-is-a-routing-problem`: the original thesis is that a stable prefix must reach available reusable state; the best hit is not necessarily the best latency.
- Rewrite the existing Prefix Cache reference in clear Russian, retain its canonical URL, add the nine handbook sections requested by AGENTS and a short TOC.
- Interactive two-replica decision experiment inside the chapter: compare assumed queue + remaining prefill times, with a prefix-residency switch and presets. Inputs are explicitly illustrative, results computed locally. No real GPU benchmark or production savings claim.
- A small dependency-free reproducible Node experiment uses exactly the same pure decision function and records reproducible expected cases. Retain the separate existing request-layout linter case as a narrower check.
- Homepage: a human introduction, stronger editorial feature and a connected reading path. Blog: a curated entry before chronology, with source links. Materials: direct anchors for watching, reading and trying. Reference reader: compact TOC and avoid repeated scope blocks.
- Update the AI Platform entry to offer the usable cache path directly. Do not imply all seven reference areas are complete.

## Evidence and technical boundaries

The supplied PDF has 83 pages. Relevant pages are 61–65; rehearsal headings retain older slide numbers 48–51. The slide highlights warm replica A; the rehearsal describes lower-load B winning. Present both outcomes as conditional examples, not a measured incident. Rehearsal directions are source annotations, never assistant instructions.

Use concepts from the talk, not internal topology, volumes, ratios, costs or vendor details. Do not place supplied documents in public assets or create an unverified event/recording URL. Attribute the idea to the author's HighLoad 2026 talk in article prose. Re-verify public runtime facts with vLLM, SGLang and NVIDIA Dynamo documentation. Health, model compatibility and isolation are eligibility gates before scoring; do not literally add health to a weighted cache score. A route to another tenant or wrong model never becomes acceptable because of a cache hit.

## Implementation boundaries

Keep the existing v3 typed content model authoritative; enrich the Prefix Cache component with required handbook chapter metadata rather than adding legacy frontmatter aliases throughout all v3 entities. Nine section headings apply to the rewritten component; old area and synthetic case retain their existing validated structures. Preserve the existing light editorial theme accepted in v3.1; improve hierarchy and contrast, avoiding a second unrelated theme migration. The latest user-approved editorial scope supersedes the earlier homepage prohibition on introductory copy.

No dependencies, backend, accounts, analytics, network calls from the experiment, deployment or fabricated measurements. Preserve existing user edits to hybrid-reasoners-in-production.mdx, .claude and pnpm-workspace.yaml.

## Acceptance

- Article, chapter, experiment and public related materials are reachable, and internal links resolve in static export.
- Experiment selects A with low warm queue, B with high warm queue, handles a missing prefix and a tie explicitly; cannot present synthetic inputs as telemetry.
- Reading order, controls and TOC are keyboard accessible and fit phone and desktop widths.
- Required lint, typecheck, test, build and existing export contracts pass. STATUS records implemented scope and remaining benchmark/reader-study limitations.
