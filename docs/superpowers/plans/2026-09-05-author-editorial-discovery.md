# Author Editorial Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сделать существующий авторский корпус удобным для первого знакомства, последовательного чтения и выбора записи.

**Architecture:** Источник MDX остаётся владельцем фактов и адресов. Инъецируемые view models вычисляют доступные редакционные подборки; серверные компоненты отображают их. Новых страниц, клиентского состояния и зависимостей нет.

**Tech Stack:** Existing Next.js App Router, TypeScript, React, Fumadocs MDX, Tailwind, Vitest, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-05-author-editorial-discovery-design.md`.

## Global Constraints

- Static export; no backend, analytics, dependencies, publishing or external messages.
- Preserve existing user edits and the completed cache exemplar; stay on `codex/cache-editorial-exemplar`.
- Source-derived links, photo, dates and participation; no invented biography or results.
- Native-only chronology; authored external links allowed only in editorial selection, original canonical preserved.
- Use `pnpm_config_verify_deps_before_run=warn` for scripts; no install or workspace config edits.
- Keep work local and uncommitted for a coherent user review; do not stage unrelated files.

### Task 1: Source-backed selections and personal page composition

**Files:**
- Modify `lib/content-v3/view-models.ts`: selection model/builders, optional Blog selected/journey, Materials featuredTalk and recordingUrl, About photo.
- Modify `components/pages/v31-personal-pages.tsx`: Blog, Materials and About compositions only; preserve Home.
- Create `components/editorial/selected-reading.tsx`: shared small component for three curated reading choices if extracting helps keep the page file clear.
- Modify `lib/author-profile.ts`: only translate the existing sitePurpose terminology.
- Modify `tests/pages/v31-personal-pages.test.ts` and `tests/pages/v31-personal-page-rendering.test.ts`: meaningful eligibility/links/completeness/fallback coverage.

**Interfaces:**
- `SelectedReading = V3ListItemViewModel & Readonly<{ reason: string; label: string; sourceName: string | null }>`.
- `BlogViewModel.selected?: readonly SelectedReading[]` and `journey?: readonly SelectedReading[]`; keep existing items and readingPath APIs intact.
- `TalkSummaryViewModel.recordingUrl?: string | null`; `MaterialsViewModel.featuredTalk?: TalkSummaryViewModel | null`.
- `AboutViewModel.photo?: Readonly<{ path: string; alt: string; caption: string; href: string }> | null`.

- [x] Add meaningful tests before implementation. Example invariants:

```ts
const model = getBlogViewModel(source);
expect(model.selected?.map(x => x.entityId)).toEqual([
  'hybrid-reasoners-in-production', 'cache-locality-is-a-routing-problem', 'effective-cost-habr'
]);
expect(model.selected?.at(-1)?.href).toBe(externalCost.sourceUrl);
expect(model.items.every(x => x.articleKind === 'native')).toBe(true);
// Replacing effective-cost-habr by expert-comment/draft/stale or removing it
// must remove it from both curated arrays while leaving native chronology intact.
```

- [x] Run the two targeted page test files; confirm new tests fail for the missing behavior.
- [x] Implement selection against both public/featured records, exact type/kind/status and authored-article eligibility. Missing selections omit gracefully. Return frozen arrays/objects following existing conventions.
- [x] Build Blog's three selection cards, four-item reading journey, native chronology, Telegram/RSS follow block. Exact reasons/order are in the spec. Number visible steps after omissions. Hide journey with fewer than two items.
- [x] Build Materials with one featured recording and compact remaining records, direct external recording links, publication groups and watch/read/try section order. Use the selected ID to exclude it from the remaining list. Preserve dates, attribution, all records and project separator behavior.
- [x] Build About's photo/text header; photo uses the eligible talk record, real caption and internal link. Preserve profile, evidence and contacts. Translate only existing purpose terms.
- [x] Run targeted tests, self-review, report changed files and checks. No commit and no build from the implementer; root owns integrated build/QA.

### Integration and acceptance (root)

- [x] Polish the existing first journey note (`content/v3/blog/workload-shape-over-model-name.mdx`) in Russian, preserving ID/URL/publication date and technical meaning. Align its existing source metadata fixture in `tests/content-v3/source.test.ts`; remove the brittle duplicate of its entire prose from the test. Source suite: 53 passed. The protected hybrid article remains unchanged.
- [x] Review copy against the approved audit, public source content and prior Claude style feedback; no new external transmission.
- [x] Independent spec compliance review, then code quality review; resolve actionable findings.
- [x] Run required lint/typecheck/test/build, production export integration and reference/export audits.
- [x] Inspect local static preview at 390/768/1280 px; test the Blog journey, Materials anchors, internal recording contents and About photo/context. Preserve clear external-link cues without opening private services.
- [x] Verify protected hashes and `git diff --check`; write `.agent/AUTHOR_DISCOVERY_QA_2026-09-05.md`, update `.agent/STATUS.md`, and deliver direct local preview links.
