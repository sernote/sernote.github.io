# Two Video Materials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Mad Brains interview and Ural Digital Weekend talk as source-driven local video materials.

**Architecture:** Reuse the existing `talk` MDX contract, dynamic talk route and Materials view model. Add two records, two local thumbnails and two route-manifest entries; do not add components or change RSS behavior.

**Tech Stack:** MDX frontmatter, TypeScript, Vitest, Next.js static export.

---

### Task 1: Lock the Mad Brains interview contract

**Files:**
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/build/v31-export-contract.test.ts`
- Modify: `tests/seo/structured-data.test.ts`
- Modify: `tests/build/static-export-contract.test.ts`

- [ ] Add a failing source test for `choosing-ai-model-bitrix24`: interview format, 21 March 2025, canonical YouTube URL, local thumbnail and entry timestamp `1992`.
- [ ] Add the route and Materials-order expectations.
- [ ] Run the focused tests and confirm RED because the record and route do not exist.

### Task 2: Add the Mad Brains interview

**Files:**
- Create: `content/v3/talks/choosing-ai-model-bitrix24.mdx`
- Create: `public/media/talks/choosing-ai-model-bitrix24.jpg`
- Modify: `config/v3-route-manifest.json`

- [ ] Add the MDX record with three source-backed takeaways. Only the first takeaway uses `timestampSeconds: 1992`; the other two use `null`.
- [ ] Add `/talks/choosing-ai-model-bitrix24` as a `keep` route.
- [ ] Download the verified YouTube thumbnail and normalize it to 1280×720 JPEG.
- [ ] Run the focused tests and confirm GREEN.

### Task 3: Lock the Ural Digital Weekend contract

**Files:**
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/build/v31-export-contract.test.ts`
- Modify: `tests/seo/structured-data.test.ts`
- Modify: `tests/build/static-export-contract.test.ts`

- [ ] Add a failing source test for `llm-selection-ural-digital-weekend`: talk format, 1 August 2025, canonical YouTube URL, local thumbnail and start timestamp `11102`.
- [ ] Extend the route counts and expected Materials order for the second page.
- [ ] Run the focused tests and confirm RED because the second record and route do not exist.

### Task 4: Add the Ural Digital Weekend talk

**Files:**
- Create: `content/v3/talks/llm-selection-ural-digital-weekend.mdx`
- Create: `public/media/talks/llm-selection-ural-digital-weekend.jpg`
- Modify: `config/v3-route-manifest.json`

- [ ] Add the MDX record from the official program. Only the first takeaway uses `timestampSeconds: 11102`; the remaining points use `null`.
- [ ] Add `/talks/llm-selection-ural-digital-weekend` as a `keep` route.
- [ ] Download the verified YouTube thumbnail and normalize it to 1280×720 JPEG.
- [ ] Run the focused tests and confirm GREEN.

### Task 5: Verify and publish

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] Record both materials and final validation counts in `STATUS.md`.
- [ ] Run `pnpm verify` and `git diff --check`.
- [ ] Inspect both exported pages, the Materials index, sitemap and `VideoObject` data.
- [ ] Commit the scoped files, push `main`, wait for GitHub Pages and verify both live pages through CLI requests.
