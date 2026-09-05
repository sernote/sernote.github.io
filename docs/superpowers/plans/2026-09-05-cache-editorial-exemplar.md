# Cache Editorial Exemplar Implementation Plan

**Goal:** Ship the first linked article, cache/routing handbook chapter and reproducible interactive decision experiment with improved editorial discovery.
**Architecture:** Existing Next.js static-export v3 content; pure TypeScript decision function shared by browser and Node experiment; MDX embeds a client component. Curated discovery derives from verified published entities.
**Tech Stack:** Next.js, TypeScript, React, MDX/Fumadocs, Tailwind, Vitest, Node >=22, pnpm. No new dependencies.
**Spec:** docs/superpowers/specs/2026-09-05-cache-editorial-exemplar-design.md

## Global Constraints

Preserve user edits and all canonical URLs. All experiment numbers are synthetic assumptions, not GPU measurements. No internal company figures or copied source files in public output. Static export, no backend/network/tracking. Apply clear Russian terminology; include limits next to the experiment. Use pnpm_config_verify_deps_before_run=warn for verification to avoid installed pnpm's automatic dependency reinstall; do not modify the user's workspace file. No push or deployment.

### Task 1: Build the deterministic cache routing experiment

Files: create lib/experiments/cache-routing.ts, components/tools/cache-routing-lab.tsx, tests/tools/cache-routing.test.ts, scripts/cache-routing-experiment.ts, evidence/v3/cache-routing/README.md and result.json. Do not edit MDX registration or page templates in this task.

- [x] Start with failing behavior tests. Export compareCacheRoutes(input) from the pure module. Input fields: warmQueueMs, coldQueueMs, coldPrefillMs, warmPrefillMs, prefixAvailable. Return both candidates' queue/prefill/total values, a winner A/B/tie, and warmQueueBreakEvenMs. All numeric inputs finite and nonnegative; warmPrefillMs <= coldPrefillMs. Throw on invalid model input.
- [x] With coldQueue=100, coldPrefill=600, warmPrefill=80, prefixAvailable=true: warmQueue=100 gives A (180 vs 700); warmQueue=900 gives B (980 vs 700); warmQueue=620 ties. Prefix absent makes A's prefill 600; inputs unchanged otherwise. Formula is queue + remaining prefill only, not full end-to-end latency, decode, network or GPU prediction.
- [x] Build an accessible self-contained client component exporting CacheRoutingLab. Calm existing theme tokens, visible labels/units, native sliders and checkbox, two bar/number comparisons with text winner and reset/preset buttons. Use useId for distinct labels; meaningful output accessible without color. Scope interactive state locally. Main variable warmQueue 0–1500 step20 plus two prescribed presets; keep remaining inputs explicit on screen. Explain break-even condition and prefix-absent case. No hydration date/random state.
- [x] Run the same pure function from Node via strip-types script, output synthetic=true and the four cases as JSON. Document the exact command and reproducible scope in evidence README. Produce result.json by running it. Verify tests and self-review the result. Report files and commands to the controller; do not commit unrelated changes or spawn subagents.

### Task 2: Integrate the authored cache path and editorial reader

Files: content/v3/blog/cache-locality-is-a-routing-problem.mdx, content/v3/ai-platform/components/prefix-cache.mdx, components/mdx.tsx, lib/content-v3/{schema,reference-structure,view-models}.ts, components/pages/v31-{personal-pages,ai-platform-pages,content-detail-page}.tsx, components/site/editorial-shell.tsx and relevant page/content/build tests. Controller writes the article/chapter and source notes while Task 1 runs; implementer receives the concrete content and only changes agreed integration files.

- [x] Register CacheRoutingLab; implement handbook chapter metadata and the nine ordered Russian headings: Проблема; Симптомы; Ментальная модель; Архитектура; Метрики; Компромиссы; Антипаттерны; Чеклист; Связанные главы. Preserve other content types' structure contracts.
- [x] Use existing compiled MDX TOC for a compact reference navigation; render at readable width and avoid duplicating applicability/limitations around body text. Keep source verification visible once.
- [x] Homepage: add verified author introduction; foreground the new article and a linked three-step cache path (article, reference #experiment, existing linter/project); keep links to blog/materials/handbook with distinct descriptions. Keep chronology and materials featured from the model.
- [x] Blog: show an explicit recommended entry/path before all posts, sourced from published records; preserve format/date semantics and canonical links. Materials: add real anchors watching/reading/projects, wired to actual sections. Expose RSS in footer.
- [x] AI Platform homepage: add a direct cache chapter entry with reader outcome, retain honest coverage. Do not point a claimed completed scenario to an empty map.
- [x] Write focused failing tests for new discovery and TOC behavior first; update old homepage/heading tests only where product contract intentionally changed. Preserve alias/metadata/SEO contracts and no accidental exported drafts. Run focused tests and required commands; report files and validation.

### Task 3: Validate and review the whole exemplar

Files: .agent/STATUS.md and this plan; fix implementation files only in response to observed issues.

- [x] Run lint, typecheck, tests, build, integration export test, verify:reference and verify:export sequentially. Check git diff --check and protect unrelated baseline files.
- [x] View homepage, blog, chapter and experiment in local browser on desktop and phone. Exercise preset, range, checkbox, TOC and navigation; inspect overflow/accessibility semantics.
- [x] Obtain an independent whole-diff review against the approved spec, address substantive findings and rerun affected checks. Record actual limitations: no production benchmark or reader-study result.
- [x] Update STATUS, mark task outcomes, leave the result in the working branch and provide reviewable local links. No deployment.

## Completion

Completed locally on 2026-09-05. Required checks and responsive browser QA passed; details in `.agent/CACHE_EXEMPLAR_QA_2026-09-05.md` and `.agent/STATUS.md`. Source evidence is in `.agent/CACHE_EDITORIAL_SOURCES_2026-09-05.md`. No deployment or production benchmark is implied.
