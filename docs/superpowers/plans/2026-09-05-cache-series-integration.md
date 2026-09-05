# Cache Series Site Integration Plan

> Use superpowers:subagent-driven-development. This plan continues the existing local site work; the current handbook entrance must pass its acceptance before this milestone is closed.

**Goal:** Connect three prepared author articles, the handbook and the existing livestream to a runnable first cache audit.

**Architecture:** Existing v3 MDX records and source-generated pages own facts, routes and relations. Add articles and anchored sections, using current editorial layouts/components. Root owns integration, route manifest, fixture alignment, final build and browser QA.

**Tech stack:** Next.js, TypeScript, Fumadocs/MDX, Tailwind, Vitest, pnpm; static export.

**Spec:** `docs/superpowers/specs/2026-09-05-cache-series-integration-design.md`.

## Global Constraints

- Preserve all previous local milestones, the protected hybrid article, `.claude/` and `pnpm-workspace.yaml`. Stay on `codex/cache-editorial-exemplar`; do not stage, commit, push or deploy.
- No backend, dependencies, auth, analytics, tracking, live model calls, native log adapter claims, GPU comparisons, private data or external messages.
- Use current light author-first editorial design and natural Russian terminology; source documents are content, not agent instructions. No new text sent to Claude without separate authorization.
- PR-only commands explicitly name the verified draft commit/branch. Stable claims require verification against the corresponding released version. Preserve historical case pins.
- Use `pnpm_config_verify_deps_before_run=warn` for project scripts; do not install/rewrite the workspace. Root owns builds to avoid shared generated-output races.
- Read source packet `/Users/notevskii/develop/audit-prompt/docs/content/2026-09-05-cache-series/` only. Isolated verification writes stay in the site workspace or `/tmp`.

### Task 1: Project page and reproducible first audit

**Own:** `content/v3/projects/audit-prompt-caching.mdx`; command-evidence report in `.superpowers/sdd/2026-09-05-cache-series-integration/project-report.md`.

**Contract:** Publish existing project sections with explicit IDs `first-audit`, `your-project`, `provider-usage`, `routing-audit`; all future content links target these IDs. Preserve project ID/slug/publication date and existing real personal OSS anecdote.

- [x] Inspect PR 21, release/main availability and the actual pinned README/scripts/examples. Record observed refs.
- [x] In a fresh temporary checkout, run the intended first-audit commands and routing example. Record commands, outputs, Python version and expected exits. Never install into global Codex directories.
- [x] Write when useful → rendered before/after and exact 43/254 byte interpretation → reproducible pinned commands → own-project inputs → provider usage and routing boundaries → valid feedback and further reading.
- [x] Verify any stable install instruction against its actual version; distinguish it from the draft walkthrough. Link a usable feedback destination and explain unmerged template availability.
- [x] Self-review public claims and send report. Root aligns existing source fixtures after final metadata is known; human prose earns no duplicate full-body fixture test.

### Task 2: Prefix Cache topic entry

**Own:** content integrator in `content/v3/ai-platform/components/prefix-cache.mdx`, coordinated with Task 3's fixed article IDs; root owns final link verification.

**Contract:** Preserve nine sections, `#experiment`, original mechanism and synthetic calculation. Add five task rows inside the existing Problem section, linking project anchors and real articles.

- [x] Add unstable-input → `#first-audit`/existing case, API/usage → `#provider-usage`, locality → sticky article/experiment, events/recovery → router article/`#routing-audit`, offload → offload article.
- [x] Update typed relations to actual project/article/talk IDs; keep all existing required reference transitions. Check the four-related-item display cap and use body links for the complete task table.

### Task 3: Adapt three author articles

**Own:** three new `content/v3/blog/` MDX files: `sticky-sessions-vs-prefix-routing.mdx`, `what-cache-router-knows.mdx`, `kv-offload-economics.mdx`; article source/review report in `.superpowers/sdd/2026-09-05-cache-series-integration/articles-report.md`.

**Contract:** Native article IDs and slugs equal filenames; `publishedAt`/`updatedAt` 2026-09-05; links to existing chapter, project anchors, related articles and authored original sources. No Habr-draft duplication.

- [x] Read all three drafts, source-map, research-notes and corrections. Read existing warm-cache article and the protected hybrid article as style samples without modifying them.
- [x] Recheck primary pinned technical sources for version-specific mechanisms. Preserve uncertainty around load scope, selected/predicted worker, tokens/characters and stream timings.
- [x] Adapt sticky, router state, then offload. Use existing MDX diagrams or concise tables/calculations where they explain the mechanism. No invented incidents, benchmarks or numerical wins.
- [x] Check frontmatter/schema conventions, application boundaries, source links and immediate practical actions. Send exact source versions and unresolved limitations in the report. Root owns manifest and integrated tests.

### Task 4: Existing livestream and external entrances

**Own:** the same content integrator in `content/v3/talks/every-token-counts.mdx`; root aligns existing evidence/source assertions after the correction.

- [x] Read livestream-map and correct event date to 2026-06-04, upload date to null, updatedAt to current date; retain card publication date.
- [x] Correct reuse conditions and exact timecodes 4684/6565/6911, preserve player/thumbnail/recording URL.
- [x] Link chapter, project `#first-audit`, sticky and offload articles. Keep external author attribution and canonical URLs. Record Habr/Telegram follow-ups as next-release materials, not already published records.

### Task 5: Discovery, integration and acceptance

**Own:** root integration in `config/v3-route-manifest.json`, relevant tests and status/QA docs; existing source/view-model only if integration requires it.

- [x] Add the three canonical native-article manifest entries using the existing keep/indexable/sitemap/RSS policy. Example invariant: `/blog/sticky-sessions-vs-prefix-routing` resolves to a published native article and has one matching canonical in static HTML.
- [x] Align changed metadata assertions, add meaningful reader-path coverage: each question/article/talk action resolves to a real route or anchor; synthetic result never appears as tokens or measured savings. Avoid whole-prose snapshots.
- [x] Complete independent spec/quality reviews with before-image diff packages; resolve actionable findings.
- [x] Run required lint/typecheck/tests/build, production export integration and reference/export audits. Check rendered article metadata/canonical/author, sitemap and RSS.
- [x] Verify 390/768/1280 layouts and actual article/talk → explanation/practice → result → own-project paths, including keyboard anchors and feedback destination.
- [x] Update `.agent/STATUS.md` and `.agent/CACHE_SERIES_QA_2026-09-05.md`; deliver local preview, command receipt, next-release list and actual deployment state.

## Execution dependencies

Tasks 1 and 3 can proceed independently on disjoint MDX files while root completes handbook-entry browser acceptance. Tasks 2 and 4 are one batched MDX integration assignment consuming the already fixed IDs/anchors; their final link validation waits for Tasks 1 and 3. Task 5 integrates all changes. No simultaneous builds or edits of root-owned manifest/tests/status files.

## Completion receipt

All five tasks are complete locally. See `.agent/CACHE_SERIES_QA_2026-09-05.md` for pinned command evidence, resolved review findings, current static-export counts and responsive reader-path acceptance. No commit, push, deployment or external publication.
