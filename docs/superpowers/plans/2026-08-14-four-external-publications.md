# Four External Publications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four verified external publications to Materials and RSS with accurate authorship labels.

**Architecture:** Follow the existing source-driven `external-note` path. Four MDX records feed the registry, Materials view model and static RSS without adding local routes.

**Tech Stack:** MDX, TypeScript, Vitest, Next.js static export, pnpm.

---

### Task 1: Lock the content contract in RED

**Files:**
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/seo/rss.test.ts`
- Modify: `tests/build/static-export-contract.test.ts`

- [ ] Add exact source contracts for `gpt5-rb-expert-comment`, `llm-style-ranking-habr`, `grok3-snob-expert-comment` and `ai-employee-rbc-trends`, including dates, source URLs, external types, participation labels and original MDX bodies.
- [ ] Add all four records to the Materials fixture in descending date order.
- [ ] Add all four records to the RSS fixture and change the expected total from 8 to 12.
- [ ] Change the production export RSS expectation from 8 to 12.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false vitest run tests/content-v3/source.test.ts tests/pages/v31-personal-pages.test.ts tests/seo/rss.test.ts` and confirm failures report the four missing source records.

### Task 2: Add the minimal source records

**Files:**
- Create: `content/v3/publications/gpt5-rb-expert-comment.mdx`
- Create: `content/v3/publications/llm-style-ranking-habr.mdx`
- Create: `content/v3/publications/grok3-snob-expert-comment.mdx`
- Create: `content/v3/publications/ai-employee-rbc-trends.mdx`

- [ ] Create four `external-note` documents matching the RED contracts. Use `authored-article` only for Habr and `expert-comment` for the three editorial materials.
- [ ] Keep `slug` and `editorialFormat` null, use source URLs as canonicals, and give only Habr the `Ser_no` author profile.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false vitest run tests/content-v3/source.test.ts tests/pages/v31-personal-pages.test.ts tests/seo/rss.test.ts` and confirm all focused tests pass.

### Task 3: Verify and publish

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] Record the four-source batch, classification boundary, RED/GREEN evidence and final validation counts in `.agent/STATUS.md`.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false verify` and `git diff --check`.
- [ ] Inspect `out/materials/index.html` and `out/rss.xml` for all four titles, links, chronological order and exactly 12 RSS items.
- [ ] Commit the scoped files, push `main`, wait for the matching GitHub Pages workflow, then repeat the Materials/RSS checks against `https://notevskii.tech` with cache-busting query parameters.
