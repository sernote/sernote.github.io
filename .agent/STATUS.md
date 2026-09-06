# Status

Completed site review, 6 September 2026, on `codex/site-review-2026-09-06`, based on merged main `415396d`. The user confirmed practical handbook usefulness and project development as the six-month priority. Reviewed 11 live pages with desktop and mobile screenshots, reading/navigation paths, public copy, RSS and social previews. Independent Claude Fable 5.1 review used public material only. The resulting proposal prioritizes a complete cache-diagnosis-to-tool path, clearer reading layouts, consistent author voice and meaningful handbook/project updates. Findings and recommended stages: `.agent/SITE_REVIEW_2026-09-06.md`; independent opinion: `.agent/reviews/SITE_REVIEW_FABLE_2026-09-06.md`. Fresh `pnpm lint`, `pnpm typecheck` and `pnpm build` passed. No site implementation or publication was performed; the original-checkout user draft remains untouched. The recommendation is ready for discussion and does not automatically replace the accepted design specification.

Completed correction, 6 September 2026, on `codex/cache-public-copy`: verified the late merge of site PR 2 added only `docs/site-v2` proposal documents and did not change the released site content. GitHub Pages run 34030989806 completed successfully at `6689152`. Removed editorial process commentary from four cache articles, the project, Prefix Cache, the tool-order case and example captions. Replaced the case's audit-report structure with five reader questions while preserving synthetic provenance, pinned commands and source artifacts. Marked the old v2 proposal as historical. Full `pnpm verify` passed (408 tests, 117 pages, 46 export checks); independent review found no blockers. Browser inspection confirmed the revised copy, mobile disclosure expansion, interactive calculation and the chapter-to-project anchor. Original-checkout user edits remain outside this correction. Receipt: `.agent/CACHE_PUBLIC_COPY_QA_2026-09-06.md`. Hand off through a feature PR; publication follows its merge.

## Current milestone

Completed reader-path follow-up, 6 September 2026, on `codex/cache-audit-reader-path`: the project, four cache articles and Prefix Cache chapter now lead with «Проверить кэш в своём проекте». The short guide and optional routing material use immutable public source links; optional feedback uses the existing main-branch issue form. The routing analyzer is labeled experimental, without an ordinary-log adapter. The laboratory section leads with its two bounded findings and saved artifacts; building it is optional. No pilot recruitment or numerical participation/publication conditions appear in these pages. The baseline includes merged site PR 11. Full verification, independent review and the mobile CTA/anchor check passed. Receipt: `.agent/CACHE_AUDIT_READER_PATH_QA_2026-09-06.md`.

Completed editorial correction, 6 September 2026, on `codex/project-page-editorial-fix`: the audit-prompt-caching project page now starts with the reader's task and installation, explains one compact before/after example, and links detailed router evidence separately. Removed PR/branch history, visible commit checkout instructions, mixed-language process terms and repeated caveat tables. The router article's practical outro received the same correction. All five incoming practice anchors remain valid. A fresh isolated install and full `pnpm verify` passed: 408 tests, 117-page build, 46 production export checks and both audits. The simplified public-main example reproduced 43/254 bytes with the documented exit codes. Independent editorial/integration review and desktop/mobile browser inspection are complete. The original checkout and its separate user draft remain untouched. See `.agent/PROJECT_EDITORIAL_QA_2026-09-06.md`; publication follows the correction PR's merge.

Pushed for review, 5 September 2026: the completed editorial discovery, handbook entrance and cache-series work is committed as `f71261bd84a7bee356a9b5350a933844906a8fb9` on `codex/cache-editorial-exemplar`, with [draft PR 10](https://github.com/sernote/sernote.github.io/pull/10) open against `main`. A fresh source tree based on `c763c7a3885eef67530d5a4e14cc1bf8c9066e81`, containing only the intended PR changes, passed a frozen-lockfile install and the full `pnpm verify`: lint, typecheck, 408 tests, a 117-page build, 46 production export tests and both export audits. The independent cumulative review found no actionable blocker. The prior local hybrid-reasoners draft and local settings remain outside the release scope; the release test contract uses the existing published article. The current workflow deploys only on a `main` push or manual dispatch, so this feature push and draft PR do not publish the site or run that workflow. No merge or deployment was performed. See `.agent/SITE_RELEASE_QA_2026-09-05.md`. Earlier local/uncommitted notes below record milestone-time state.

Completed locally, 5 September 2026 follow-up: four existing cache-series pages now distinguish the pinned HTTP endpoint's actual policy input from engine tokens/KV and router HTTP outcomes from client stream completion. The router article and project page connect to the newly public draft PR 22 at `b53cd3f3fc69f044952d99cd6046f274a80f1ee2`, its recorded synthetic-worker observation, a separately checked checkout and first-pilot guide. Published artifact hashes and event counts were independently verified; no router/GPU experiment was rerun here. Both scoped reviews, required checks, all 408 tests / 46 export checks and 390/1280 browser acceptance passed. Receipt: `.superpowers/sdd/2026-09-05-cache-endpoint-correction/evidence.md`; follow-up QA: `.agent/CACHE_SERIES_QA_2026-09-05.md`. Site changes remain local and uncommitted, without deployment.

Completed locally, 5 September 2026: the user-authorized cache-series handoff is integrated. Three native author articles connect to the Prefix Cache task table, corrected livestream and a reproducible first audit. The project distinguishes stable v0.1.15 from open/draft/unmerged PR 21 at `54f333fd06fafc7a8428aab7242682548c5891af`; commands reproduce 43 → 254 common UTF-8 bytes, not measured cache reuse or savings. Independent reviews, required checks and 390/768/1280 browser acceptance passed. Plan: `docs/superpowers/plans/2026-09-05-cache-series-integration.md`; receipt: `.agent/CACHE_SERIES_QA_2026-09-05.md`. Work remains local and uncommitted, without deployment or external publication.

Completed locally, 5 September 2026: the AI Platform entrance now opens with four source-backed working questions, followed by a useful reading sequence and then the full map. All questions resolve directly to the actual article, metrics, experiment or synthetic case. Review/synthetic/planned labels remain visible. Required checks, independent source review and 390/768/1280 browser acceptance passed. See `.agent/HANDBOOK_ENTRY_QA_2026-09-05.md`.

Completed locally, 5 September 2026: author/editorial discovery across Blog, Materials and About, continuing the user-approved audit after the cache exemplar. Three source-backed reading choices, a workload-to-cost sequence, a compact recording catalog with direct playback links, grouped external publications, and an existing real author photo. The first journey note now has a Russian title and edited terminology, with its URL and publication date preserved. Required checks, independent reviews and final responsive browser acceptance passed; the tablet CSS cascade regression found during QA is fixed and verified. See `.agent/AUTHOR_DISCOVERY_QA_2026-09-05.md`. The prior milestone and protected user edits remain intact; all new work is local and uncommitted.

Completed locally, 5 September 2026: first cache/routing editorial exemplar on `codex/cache-editorial-exemplar`, based on the user-approved site audit and supplied HighLoad 2026 material. Includes the authored article, rewritten Prefix Cache chapter, interactive/reproducible decision model, stronger Home/Blog discovery, reference/article contents and Materials shortcuts. Claude Fable 5.1 reviewed the approved text packet; final prose incorporates selected feedback. All required checks and responsive browser acceptance passed. The production site is unchanged; the new reference is an educational model, not a GPU benchmark. See `.agent/CACHE_EXEMPLAR_QA_2026-09-05.md`.

V3.1 was released to GitHub Pages on 2 August 2026. The live site now uses the accepted author-first editorial direction across Home, Blog, Materials, AI Platform, About, and the required detail exemplars. The production export, route lifecycle, discovery metadata, responsive layouts, and mobile navigation passed the final integrated check. Live smoke confirmed the canonical pages, social image, sitemap, RSS, robots, aliases, and archives; no P0 or P1 issue remains.

## Completed

- Completed the 5 September cache-series integration milestone. Added sticky/session locality, router-state and KV-offload articles with primary-source boundaries, five task paths in Prefix Cache, a pinned first-use project walkthrough and direct own-project/feedback continuation. Corrected the existing livestream event date to 4 June 2026 and timestamps 4684/6565/6911; unknown upload date omits VideoObject while preserving the player and breadcrumbs. Project CTA/TOC, 3 canonical keep routes, author metadata, RSS and sitemap are integrated.
  - Validation: lint, typecheck, 24 test files / 408 passed / 8 intentional production-only skips; final build 117 pages; all 46 production export checks; reference audit 6 files / 16 transitions; export audit 112 routes / 23 sitemap URLs, with 35 aliases and 54 archives unchanged. Protected file hashes and diff whitespace pass.
  - Independent content and integration review reports are under `.superpowers/sdd/2026-09-05-cache-series-integration/`. Resolved positive cache-read versus mere usage-field presence and exact null/unknown semantics; restored the visible repository link discovered by export QA. Six detail pages and reader paths passed mobile/tablet/desktop acceptance. Feedback reaches GitHub sign-in with the intended new-issue return path; nothing was submitted.
  - Habr/Batch Telegram drafts, reader-adoption measurement, a native raw-log adapter and GPU comparisons remain next-release/separate work. New content uses no private metrics and makes no measured production-performance claim.

- Completed the 5 September author/editorial discovery milestone. Blog opens with three selected authored texts (including the original external Habr canonical), a four-step reading sequence, native-only chronology and Telegram/RSS links. Materials keeps all five recordings, ten external publications and the project, with one featured recording, compact remaining records, direct playback links, authorship groups and matching watch/read/try anchor order. About uses the existing Ural event photograph and source-derived caption alongside the verified profile. The workload note was edited into natural Russian without changing its technical thesis, identity, URL or publication date; it links onward to the hybrid-reasoner article. Home behavior and the protected user files were preserved.
  - Final checks: lint; typecheck; 24 test files, 401 passed and 6 intentional skips; build (114 pages); 44 export integration checks; reference audit (6 files, 16 transitions); export audit (109 routes, 35 aliases, 54 archives, 20 sitemap URLs); protected hashes and `git diff --check`.
  - Browser acceptance across Blog/Materials/About at 390, 768 and 1280 px passed, plus actual reading/anchor/photo transitions. Fixed narrow mobile descriptions and a Fumadocs `contents` cascade conflict found only during tablet rendering; final computed text widths are 350/524/380 px. The recording section is about 28% shorter at 1280 px with all records preserved. This is a layout measurement, not reader research.
  - Independent spec and code reviews are recorded under `.superpowers/sdd/2026-09-05-author-editorial-discovery/`. Prior Claude Fable 5.1 style feedback informed the editorial pass; no new files or text were transmitted externally in this milestone. No deployment, dependency installation, backend or analytics.

- Completed the 5 September cache/routing exemplar. The article «Тёплый кэш — ещё не быстрый ответ» develops the distinction between scenario selection, admission and replica routing from the supplied talk. The Prefix Cache chapter now has nine clear Russian sections, compiled contents, a mechanism diagram, metrics/trade-offs/checklist, sources and a locally computed decision experiment. A shared pure function powers browser controls and four reproducible Node cases; numeric inputs are explicitly synthetic. Homepage and Blog offer a source-derived reading path, Materials has working watch/read/try anchors, AI Platform links directly to the chapter and footer exposes RSS. Removed the duplicated lead from Home's current selections. Existing user edits to the hybrid article and pnpm workspace file are byte-preserved; its stale source-test expectations were aligned with that already-present draft. No external deployment, analytics or backend added.
  - Final checks after editorial and UI corrections: lint; typecheck; 24 test files, 386 tests passed and 6 intentional skips; build (114 generated pages); 44 production export checks; reference audit (6 files, 16 transitions); static export audit (109 route records, 35 aliases, 54 archives, 20 sitemap URLs); `git diff --check` and protected-file hashes.
  - Commands used the process-local `pnpm_config_verify_deps_before_run=warn` to prevent automatic dependency reinstall. Existing pnpm configuration and multiple-lockfile warnings remain; dependencies/configuration were not rewritten.
  - Full implementation review plus scoped follow-up found no remaining actionable regression. Browser QA covered 390, 768 and 1280 px, keyboard controls, absent-prefix behavior, contents links and mobile menu. The independent Claude Fable 5.1 editorial call completed after explicit permission to transmit only the two drafts and two style samples; source slides/internal metrics were not transmitted. Reader testing and a real runtime benchmark remain unperformed and are explicitly outside claims of this milestone.

- Recorded the 5 September 2026 product/editorial audit in `.agent/SITE_PRODUCT_AUDIT_2026-09-05.md`. The audit checks the live Home, Blog, Materials, About, AI Platform entrance and Prefix Cache chapter against the current source/spec, inventories the active corpus, and proposes priorities for the blog, author presence and handbook. This is a discussion draft, not an approved replacement specification or an implementation milestone. Application code and the live site are unchanged. `git diff --check`, lint, typecheck and the 113-page static build passed; the pnpm scripts used the process-local `pnpm_config_verify_deps_before_run=warn` setting to avoid automatic dependency reinstall. The existing environment and build warnings are recorded in the audit.

- Reframed the 21 August 2026 native Blog article as «Ловушка гибридных резонеров». The rewrite keeps Sergey's first-person production thesis but now treats one universal inference instance as the trap, not hybrid training itself. A compact verified history covers Qwen3, the split Qwen3-2507 checkpoints, the return of per-request switching in Qwen3.5 and the asymmetric Qwen3.8 family: 27B is default-on hybrid while the open 2.4T checkpoint is thinking-only and hosted Max adds non-thinking. The serving argument now distinguishes model mode, reasoning controls and pool topology; explains scheduler, KV-cache and latency interference; adds current `reasoning_effort` / vLLM `thinking_token_budget` controls; and ends with concrete conditions where one shared instance is cheaper and simpler than two underused pools. No internal company details were introduced. TDD RED reproduced the stale metadata contract; focused GREEN passed 50/50 tests. Claude Opus completed both a concept review and a two-pass diff review; the only diff finding was a low-severity mismatch between two source labels and their FP8 URLs, fixed by linking the named base checkpoints. Final validation passed ESLint, TypeScript, 22 Vitest files / 373 tests with 6 intentional skips, the 113-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (108 routes, 35 aliases, 54 archives, 19 sitemap URLs). Export inspection confirmed the new title on Home, Blog and the detail page, plus both Qwen3.8 variants, the vLLM budget control and the single-instance section in production HTML.

- Replaced the generic Ural Digital Weekend stream poster with Sergey's supplied event photograph. The new cache-busted 1280 × 720 JPEG is a deterministic 853 × 480 crop resized in a separate second `sips` pass; no generated content, retouching, text or decorative treatment was added. Updated the talk date, public thumbnail path, provenance URL and factual speaker alt text, then removed the superseded poster asset. TDD RED reproduced the old metadata contract; focused GREEN passed 49/49 tests. Visual inspection confirmed the face, event context and both visible slide statements remain in frame. Final validation passed ESLint, TypeScript, 22 Vitest files / 372 tests with 6 intentional skips, the 112-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (107 routes, 35 aliases, 54 archives, 18 sitemap URLs). Export inspection confirmed the new image and alt text on Materials and the talk page, with no remaining old poster asset.

- Added the native Blog article «Роли больше не нужны. Но это не точно», adapted from Sergey's 14 December 2025 post and updated on 15 August 2026. The article keeps the first-person argument and corrects the study boundary against the Wharton report and arXiv record: six named models, GPQA Diamond plus MMLU-Pro, 12 prompt conditions and 25 trials per question, with no claim beyond factual multiple-choice accuracy. TDD RED produced four expected missing-article/route failures; focused GREEN passed 119 tests with 6 intentional skips. Full verification passed ESLint, TypeScript, 22 Vitest files / 372 tests with 6 intentional skips, the static build and production export audit. The manifest now has 107 records split 18 keep / 35 aliases / 54 archives; discovery exports 18 sitemap URLs, 13 RSS items and two JSON-LD records on the new article page.

- Added four verified external publications to Materials and RSS without creating local routes or copying source text. The Habr article «От улыбки рейтинг наш светлей» is labelled as authored work; the RB.RU GPT-5 article, the Snob Grok 3 explainer and the RBC Trends AI-employee article are labelled as expert comments with source-backed contribution boundaries. TDD RED produced three expected missing-record failures / 57 passes; focused GREEN passed 60/60. Final validation passed: ESLint, TypeScript, 22 Vitest files / 371 tests with 6 intentional skips, the 111-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (106 routes, 35 aliases, 54 archives, 17 sitemap URLs). Export inspection confirmed all four chronological Materials cards, source links, exactly 12 RSS items and no external URLs in the sitemap.

- Added two older public videos to Materials as concise local pages. The Mad Brains interview «Как выбрать нейросеть: опыт Битрикс24» uses the verified 21 March 2025 YouTube RSS date and the provided 33:12 entry point. The Ural Digital Weekend talk uses the official 1 August 2025 program title, its five published themes and the provided 3:05:02 start in the section stream. Both pages have verified local 1280×720 covers, canonical routes, VideoObject metadata and no invented per-topic timestamps. Separate TDD cycles produced four expected RED failures each; focused GREEN passed 73/73 tests. Final validation passed: ESLint, TypeScript, 22 Vitest files / 371 tests with 6 intentional skips, the 111-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (106 routes, 35 aliases, 54 archives, 17 sitemap URLs). Export inspection confirmed chronological Materials order, one main/H1 per page, two JSON-LD records per page, both thumbnails and the unchanged eight-item RSS.

- Added the authored Habr article «Синдром бесконечного окна: почему 1 миллион токенов в LLM не решает ваши проблемы (пока)» to Materials with its verified 15 December 2025 publication date, source URL and author profile. The site keeps an original compact annotation instead of copying the article, registers a semantic relation to Prefix Cache and creates no local route. TDD RED produced four expected missing-record failures; focused GREEN passed 65/65 tests. The production export includes the card in chronological order and the eighth RSS item links directly to Habr. Final validation passed: ESLint, TypeScript, 22 Vitest files / 369 tests with 6 intentional skips, the 109-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (104 routes, 35 aliases, 54 archives, 15 sitemap URLs).

- Added the stream «Каждый токен на счету» to Materials as a source-driven local page dated 27 May 2026. The page identifies Sergey's block at 59:10 and the AI Platform section at 1:00:14, includes six timestamped takeaways, a verified local 1280×720 cover, the related prefix-cache project/component, stream-specific labels, canonical route and VideoObject metadata. TDD caught the missing format, route, sitemap and export snapshots before implementation. Final validation passed: ESLint, TypeScript, 22 Vitest files / 368 tests with 6 intentional skips, the 109-page static build, 44 production export tests, the 6-file/16-transition reference audit and the static export audit (104 routes, 35 aliases, 54 archives, 15 sitemap URLs). Export inspection confirmed the page, Materials card, image, timestamps and sitemap entry; RSS correctly remains article-only.

- Replaced the hardcoded Home «Сейчас» selection with the latest published item from each top-level surface: Blog, Materials and AI Platform. Ranking uses `publishedAt`, ignores stale records and does not promote minor edits by `updatedAt`; the mixed-section header no longer links only to Materials. Corrected the publication date of the native `workload-shape-over-model-name` note to its 2 August 2026 release.

- Added a short personal Claude for Open Source note to `audit-prompt-caching`: the August 2026 acceptance, six months of Claude Max 20x, and the Codex-first framing, without presenting the grant as an Anthropic endorsement.

- Added the local podcast «Зачем Битрикс24 своя AI-платформа?» to Materials: a concise first-person page with seven timestamped takeaways, five listening platforms, a verified local cover, related talk/project/component, canonical route and VideoObject metadata. Materials now labels entries by format and no longer shows a hardcoded duration. Focused and full Vitest, ESLint, TypeScript, the 108-page static export, and manifest/sitemap/JSON-LD audits passed.

- Corrected the `/about/` career paragraph to establish technical product work before the 2024 product role, AI development and implementation after ChatGPT appeared, and the confirmed 2024 → 2025 → current AI Platform sequence, without an exact earlier title or confidential details. Focused Vitest passed (2 files / 13 tests); two independent reviews approved; lint, typecheck, and the 107-page static build passed.

- Simplified the `audit-prompt-caching` public surface: removed the duplicated generated «Как работает» block, service-style release dates and snapshot section, repeated SLA/fixture/billing caveats, and the technical evidence line from the Materials card. The project body now answers when the skill is useful, what it checks, how to run it, what it returns, and what data is needed. The last project row no longer adds a second line before the next section; separators remain only between multiple project rows.

- Applied the post-release copy polish from the live-site review: the Home AI Platform entrance now says «Карта и практический справочник по production AI-платформам», and the desktop/mobile contact action is explicitly labelled «Написать в Telegram». TDD RED reproduced both stale contracts before the change; focused GREEN passed, then full Vitest passed (21 files, 360 tests, 6 skipped), ESLint, MDX generation, route typegen, TypeScript, the 107-page static build, the 47-test export contracts, the 6-file/16-transition reference audit, and the static export audit (102 routes, 35 aliases, 54 archives, 13 sitemap URLs).

- Corrected `/about/`: removed the incorrect external-API claim, responsibility catalogue, and position manifesto; replaced them with the first-person current-role, career-path, and site-purpose narrative while retaining the source-driven evidence list and Telegram contact. Focused Vitest passed (2 files, 12 tests), along with `pnpm lint`, `pnpm typecheck`, `git diff --check`, the 107-page static production build, and exported About-copy inspection.

- Completed the scoped v3.1 visible-polish pass without changing routes, content architecture, or the accepted visual direction. Fixed the Fumadocs cascade collision for both desktop navigation and the mobile trigger; simplified the Home hero without a replacement slogan; differentiated Home, About, AI Platform, and the capability map through editorial rhythm instead of extra cards; kept About on the frozen source-backed author profile; and moved the three-column execution-mode detail to large screens. Focused verification passed with 3 files / 17 tests, ESLint, TypeScript, Fumadocs generation, Next route generation, the 107-page static production build, 35 aliases plus 54 archive pages, and `git diff --check`. In-app browser QA passed at 1440, 768, and 390 px: the correct navigation state is visible at each breakpoint and all four target pages have `scrollWidth === clientWidth`.

- Completed the v3.1 release candidate: rebuilt all top-level surfaces, added the native Blog article and note, consolidated talks/projects/external publications under Materials, replaced the handbook-first product with the AI Platform landing/map/exemplars, retired the old v3 interface, finalized author/discovery metadata and the light social image, and materialized the accepted route lifecycle. Final same-input visual QA passed across 13 desktop/tablet/mobile reference comparisons; the five mobile routes have no horizontal overflow, the mobile dialog works, and browser logs are clean. The release verification covers lint, TypeScript, the static production build, keep/alias/archive output, sitemap, RSS, robots, and structured metadata.

- Completed v3.1 Task 3: replaced the public `work` entrance with `/materials`; made Home select the leading native article plus the compact talk and project; restricted Blog to every public native article with deterministic article-before-note tie ordering; added complete source-driven Materials groups for talks, projects, and external publications; and resolved the five accepted About evidence items from public entities. Mandatory Home, Materials, and About selections fail closed when missing, draft, stale, wrong-type, or wrong article kind. TDD RED produced five expected failures before implementation. Focused GREEN passed: 6 files / 148 tests and TypeScript.
- Closed the Task 2 code-quality follow-up without changing product scope: local `pnpm verify` and Pages CI now rerun the full 42-test static-export contract after build, with a lifecycle regression test locking that order while clean pre-build runs retain six intentional `runIf` skips. Exact real-MDX external contracts now cover every source-owned frontmatter field and short body; independent schema-valid mutations to description, relations, and body each produced the expected RED before restoration. `AUTHOR_PROFILE` evidence now uses exact direct-import and nested freeze assertions instead of raw source substrings. Final verification passed through the full `pnpm verify` chain, 5 content-v3 files / 143 tests, and `git diff --check`; the build still generates 106 pages and materializes 34 aliases. The latest build retains only the pre-existing multiple-lockfile warning; an earlier verification also emitted non-failing Fumadocs dynamic-import cache warnings.
- Completed v3.1 Task 2: added the frozen source-backed `AUTHOR_PROFILE`, the exact compact native note `workload-shape-over-model-name`, and five verified metadata-only external publication records; removed `short-prompt-not-cheap`; migrated its case relation and Materials selector to `prefix-cache-habr`; and added the new native route as one `keep` record without changing the 34-alias policy. All ten source/about URLs returned HTTP 200 on their final URLs; title, platform, date, authorship, and role evidence plus the honest The Code/vc.ru limitations are recorded in `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-content-inventory-review.md`. Strict TDD RED first produced 6 expected failures / 40 passes; follow-up fail-closed REDs caught the dangling legacy relation, stale selector, published-to-draft relations, and missing manifest record. The spec-review follow-up removed the duplicated v3.1 fixtures: tests now read the real MDX inventory through the production schema/source path, lock the complete native-note contract and exact body, assert exact external metadata, and allow future external additions while preserving non-increasing chronology. A real-MDX mutation produced the expected 1 failed / 41 skipped before restoration. Final verification passed: `pnpm lint`; `pnpm typecheck`; 5 content-v3 files / 143 tests; the 41-test static-export contract; `git diff --check`; and the static production build with 106 generated pages plus 34 materialized aliases. The manifest has 101 records split 67 `keep` / 34 `static-alias`; discovery has 16 sitemap URLs and 7 RSS items. The build retains only the pre-existing multiple-lockfile workspace-root warning.
- Started v3.1 implementation and completed Task 1 (`0e9925a`): extended the article contract with `editorialFormat`, `externalType`, `sourceAuthorProfileUrl`, and `participationLabel`; enforced native/external invariants; and migrated the two v3 article records plus content and SEO fixtures without changing public routes. TDD RED produced 28 expected missing-contract failures, and the native external-field mutation check produced four expected failures. Final validation passed: 5 content-v3 files / 129 tests, 3 affected SEO files / 55 tests, TypeScript, ESLint, `git diff --check`, and the static production build with 105 generated pages.
- Converged the v3.1 implementation plan after three independent review tracks: spec/content, visual/accessibility, and route/discovery/static export. The final plan fixes the source-backed About trajectory, a complete compact note, dynamic pilot-subset contracts, native/external article discrimination, dev/static mobile-navigation gates, five-surface visual comparison boundary, build ordering, 102 typed route decisions, explicit archive metadata, non-hydrated archive output, deterministic sitemap/RSS, and preservation of compile-time legacy dependencies. The normative plan is `docs/superpowers/plans/2026-08-02-notevskii-tech-v3-1-implementation.md`; Tasks 1–2 are now complete, and Task 3 is the next action.
- Closed the v3.1 visual package gate. The fifth «Редакционный атлас» package is the implementation target for Home at 1,440/768/390, Blog at 1,440/390, Materials at 1,440/768/390, AI Platform at 1,440/768/390, and About at 1,440/390. Independent product/content and visual reviews converged with no P0/P1/P2 after aligning the map as an implementation-derived exemplar, removing duplicate social-link requirements, making exemplar review unconditional before expansion, and defining the accessible mobile-menu contract. Stitch HTML is explicitly excluded from implementation.
- Diagnosed the live `/blog/` collision to the legacy Pages resource in `sernote/blog` (`main` root, Jekyll, project path `/blog/`) and disabled only that Pages resource. The repository and its files remain intact and Pages can be re-enabled if needed. The main `sernote/sernote.github.io` Pages deployment remains built with `notevskii.tech`, workflow publishing, and HTTPS enforcement. External smoke after cache expiry returned HTTP 200, `last-modified: Wed, 22 Jul 2026 22:23:54 GMT`, and title `Блог — Сергей Нотевский` from the main site.

- Converged the v3 implementation review and reached a technical release candidate (Task 14). Three independent reviewers (spec/content, UI/accessibility, code/SEO/static-export) each returned CONVERGED with no P0/P1 (aggregate P2 4, P3 10). Fixed the accepted findings: the stale README Routes/Localization sections now describe the real v3 routes/aliases/locale allowlist; the README authoring rules add `reviewCycleDays`/`sourceName`; both shell navs carry localized `aria-label`s; the misleading `manifest.ts` selected-alias comment is corrected (materialization is uniform) and a production assertion locks the selected-alias final form; the materialized alias now ships visually-hidden skip-link CSS; the audit dropped dead code (`routeToFile`, `void fileURLToPath`) and is array-tolerant for JSON-LD `@context`/`sameAs`; and the materializer reads original bytes before writing the temp sibling. Deferred with recorded reasons: the framework-default `404`/`_not-found` pages (pre-existing, off the pilot path, needs a multi-root-layout `not-found.tsx`; tracked as a follow-up) and the pre-existing brittle `site-routes` test-debt (explicitly accepted for the pilot RC). The clean-build gate passes: lint 0, typecheck 0, 314 tests, 34 aliases materialized, `verify:reference` (6 files/16 transitions) and `verify:export` (100 routes/34 aliases/15 sitemap URLs) both 0. The representative browser journey (home identity + three entrances, honest seven-area map, full Prefix Cache vertical with no dead ends, honest `/writing`→`/blog` alias) passed. The review artifact is `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-implementation-review.md`. Remaining launch blocker: the human six-reader usability gate.
- Finished the brand asset, documentation, and content-safety pass (Task 13). Re-pointed the existing `public/og-image.svg` source (same dimensions, background, grid, and typographic construction) from the handbook to the person: `Сергей Нотевский` / `AI Platform Lead` title, `Блог · Материалы · AI Platform` subtitle, a `NOTEVSKII.TECH` badge, and a `production AI platforms` tagline; verified the render lays out without overflow. The forbidden-claim scan over `content/v3` and `components/pages` returns no internal scale/topology/outcome claims, and the placeholder scan (`TODO|TBD|placeholder|lorem`) is clean, including the README. Documented the authoritative v3 authoring path in the README: how to add one typed record, the `draft|published|archived` and `unreviewed|reviewed|stale` status rules, the four-relation `relations` syntax, why external notes carry `sourceUrl` and never get a local route, running `pnpm verify`, the pilot review gate for reference expansion, and the operating ceiling (≤1 substantial artifact/month, quarterly map review, ≤1 support hour/week, selective translation). Added the private, off-repo evidence-log template at `docs/superpowers/templates/2026-v3-private-evidence-log-template.md` with the exact expand thresholds and `expand|improve|no-expand|stop` decision, and marked the four legacy `.agent` spec/plan docs as superseded-but-historical. Validation: lint, typecheck, and 310 tests still pass.
- Added a focused static-export contract audit (Task 12). `scripts/check-static-export.mjs` inspects only the deterministic tags this app emits and reports sorted diagnostics for: missing/duplicate/non-self canonicals and `noindex` on keep pages; alias pages lacking one skip link, exactly one `main#main-content`, tokenized `noindex`+`follow`, or the exact manifest-target canonical; missing `lang`/`<title>`/description or a second `<main>`; broken internal links and same-page fragments; manifest coverage drift, unsupported pilot behaviors, and alias chains; sitemap URLs that miss a file or resolve to an alias/auxiliary; RSS items whose native link is not a sitemap-listed keep or whose external link is not HTTPS-and-visible on a canonical page; robots that are not `User-agent: *` + `Allow: /` + the exact sitemap URL with no `Disallow`; and JSON-LD whose `@context` is not `https://schema.org`, whose local URL has no file, whose external URL is not a visible anchor/media source (with a narrow YouTube `embedUrl`↔`sameAs` allowance), or whose payload is truncated by a raw closing-script sequence. Auxiliary artifacts (`404.html`, `404/index.html`, `_not-found/index.html`) are excluded from page-level checks but still rejected in the sitemap/RSS/manifest/JSON-LD surfaces. The reference-path script now uses cross-platform `path.relative`/`isAbsolute` containment with a portability regression. Added `pnpm verify:reference`, `pnpm verify:export`, and the aggregate `pnpm verify`, and wired both gates into Pages CI immediately after the build. Validation: 17 test files / 310 tests pass; a negative proof (a tampered `out/` copy with a broken Home link) exits non-zero with `[broken-link] / (/missing-contract-target/)` while the repository export stays untouched; the positive `verify:reference` (6 files, 16 transitions) and `verify:export` (100 routes, 34 aliases, 15 sitemap URLs) both pass.
- Made route migration explicit and reversible (Task 11). The observed post-SEO export is 103 HTML files; excluding the exact shared auxiliary set (`404.html`, `404/index.html`, `_not-found/index.html`) leaves 100 route records split 66 `keep` / 34 `static-alias` (the four selected legacy routes plus `/ru` and its 29 descendants). A typed manifest parser (`lib/migration/manifest.ts`) rejects duplicate sources, `/` as an alias source, missing/extra destinations, non-keep destinations, and alias chains, and enforces exact source-set equality with the export. `scripts/snapshot-route-manifest.mjs` regenerates `config/v3-route-manifest.json` deterministically from `out/` (flattening every `/ru/...` directly to its final root canonical with no chains); rerunning it against the materialized export is byte-identical. Next renders the four selected aliases as honest landmark-neutral bodies (`/writing` in the marketing shell, three handbook paths in a docs main), and `scripts/apply-static-aliases.mjs` materializes all 34 aliases after export with a fail-closed preflight (lexical + realpath containment, symlink rejection, sole-canonical extraction), temporary-sibling preparation, and full atomic rollback on any commit failure. Every materialized alias carries the target canonical, `noindex, follow`, a meta refresh, one skip link, and exactly one `main#main-content`; all `keep` files stay byte-identical. `pnpm build` now runs `build:raw` then the materializer. Validation: `pnpm lint`, `pnpm typecheck`, and `pnpm test` (16 files, 272 tests) pass; `build:raw` + materializer produced the 34-alias export; the reference-path and shell-landmark audits still pass.
- Added one canonical trailing-slash URL policy across page metadata and discovery output; validated JSON-LD now covers the home identity plus every native v3 detail shape, with the talk using the verified recording upload date and captured local thumbnail without an invented duration.
- Added a published-local-only sitemap, permissive robots metadata, and a deterministic escaped RSS feed that keeps native articles on local canonicals and external notes on their source URLs. All three discovery artifacts are statically exported at `/sitemap.xml`, `/robots.txt`, and `/rss.xml`.
- Established the typed v3 content contract as a parallel Fumadocs collection without changing the legacy `docs` or `docsRu` collection behavior; review evidence fields are scoped to reference records, external notes identify their source, and talk formats use a closed vocabulary.
- Added a pure v3 content registry that validates identities, canonical URLs, editorial and structural relations, public visibility, bilingual alternates, and reference review deadlines before route code consumes deeply frozen records; visible related results use deterministic per-bucket ordering and a hard four-item cap.
- Completed the reviewed v3 pilot vertical as 13 Russian MDX records: seven public records, including three reviewed reference exemplars, plus six draft map-only areas. Both mandatory content reviewers passed after correction rounds; the auditable review record is `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-content-review.md`.
- Added a body-preserving v3 source adapter over the generated Fumadocs collection, deterministic draft-area planning, a verified public talk thumbnail, and synthetic stable/drift prompt-cache evidence produced with the tagged public `audit-prompt-caching` linter.
- Replaced the handbook-first global identity with the Сергей Нотевский personal master brand, an exact four-item Russian primary navigation, allowlisted locale equivalence, canonical-only metadata by default, and a shared accessible shell with one skip link and one main landmark across marketing, tools, handbook pages, and `/ru` compatibility pages.
- Built the v3 Russian Home, Materials, About, and Contact compositions around the accepted author-index direction. Explicit content selections are resolved through a pure injected view model, Materials links its external article directly to Habr, and the four pages use final direct metadata rather than the frozen legacy copy.
- Hardened the reviewed v3 personal pages with a real localized description and close name for the mobile navigation dialog, explicit new-tab guidance for assistive technology, and the converged Russian page and metadata copy.
- Built the v3 Blog as a two-row editorial index: one native article and one metadata-only external Habr note. Added the source-backed native detail route, reusable author-led detail shell, semantic publication metadata, safe MDX link treatment, and the reviewed Russian article corrections without creating a local route for the external note.
- Built the v3 Talks and Projects as complete one-row editorial indexes with one source-backed detail exemplar each. The talk separates event and recording dates, uses the verified recording thumbnail and CTA, and links into the AI Platform map; the project exposes its quick start, privacy boundary, limitations, license, verified release snapshot, GitHub CTA, and related Prefix Cache component without live popularity metrics.
- Built the v3 AI Platform landing as a concise reference entrance and the complete seven-area map as one ordered responsibility system. Six planned areas remain honest non-links; Inference Plane alone opens the reviewed pilot vertical.
- Built the full Inference Plane → Prefix Cache → synthetic agent-session cache case path with canonical routes, accurate breadcrumbs, responsibility boundaries, lifecycle-aware labels, related-content continuation, structural MDX validation, and a fail-closed six-file export-path audit.
- Corrected the Task 11–12 release plan against the actual post-SEO export: 103 HTML files, three exact auxiliaries, 100 route records, 66 `keep`, and 34 direct aliases. Three independent plan rereviews converged to PASS after hardening raw-build recovery, alias rollback, symlink containment, non-vacuous discovery checks, exact JSON-LD coverage, and the preserved reference-path gate; the review artifact is `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-release-plan-correction-review.md`.
- Created durable project instructions:
  - `AGENTS.md`
  - `.agent/PROJECT_SPEC.md`
  - `.agent/DESIGN_SPEC.md`
  - `.agent/CONTENT_MODEL.md`
  - `.agent/IMPLEMENTATION_PLAN.md`
  - `.agent/STATUS.md`
  - `.agent/CODE_REVIEW.md`
- Bootstrapped a Next.js App Router + TypeScript project.
- Configured pnpm, Tailwind CSS, Fumadocs MDX, static export and shadcn/ui-style local components.
- Implemented personal site routes:
  - `/`
  - `/about`
  - `/projects`
  - `/talks`
  - `/writing`
  - `/contact`
- Implemented handbook routes through `app/handbook/[[...slug]]/page.tsx`.
- Added initial MDX handbook content:
  - `/handbook`
  - `/handbook/start-here`
  - `/handbook/manifesto`
  - `/handbook/platform-map`
  - `/handbook/maturity-model`
  - `/handbook/strategy/maas-vs-self-hosted`
  - `/handbook/gateway/ai-gateway`
  - `/handbook/inference/inference-runtime`
  - `/handbook/economics/inference-economics`
  - `/handbook/caching/prefix-cache`
  - `/handbook/evals/ai-quality-gate`
  - `/handbook/observability/llm-observability-checklist`
  - `/handbook/operating-model/ownership`
- Implemented reusable marketing, handbook and tool components.
- Implemented client-side tools:
  - Prefix Cache Auditor
  - LLM Cost Calculator
  - AI Quality Gate Checklist
- Added pure logic tests for the tool calculation modules.
- Added `README.md` with local development, validation, content workflow and deployment notes.
- Verified a local dev server starts successfully.
- Verified the static export renders through a simple static server.
- Verified desktop and mobile screenshots for the home page; fixed mobile hero clipping.
- Added bilingual routing:
  - English default routes remain at `/...`.
  - Russian routes are available at `/ru/...`.
- Added a language switcher for marketing pages, tool pages and handbook pages.
- Added Russian UI copy for navigation, marketing pages, tools and reusable handbook components.
- Added a separate Russian Fumadocs source under `content/handbook-ru`.
- Added Russian MDX versions of all initial handbook chapters.
- Added locale routing tests.
- Added GitHub Pages deployment workflow under `.github/workflows/pages.yml`.
- Added `public/.nojekyll` so GitHub Pages serves Next.js `_next` assets correctly.
- Added `.gitignore` and `.env.example`.
- Moved English routes into an `(en)` route group and made `/ru` use its own root layout with `lang="ru"`.
- Removed unverified LinkedIn, Instagram and generic GitHub public links from runtime site config.
- Switched the no-custom-domain deployment target to a user Pages repo at `https://sernote.github.io`.
- Refactored `/` and `/ru` into personal executive landing pages for Sergei Notevskii.
- Refactored `/handbook` and `/ru/handbook` into dedicated Production AI Platform Handbook landing pages.
- Added proof rows, unified top navigation, a top-level map link, and friendly public chapter metadata.
- Reworked `/ru/handbook/start-here` as a reader-first entry page.
- Rewrote manifesto pages as manifesto-style position pieces rather than regular template chapters.
- Expanded the platform map to 12 layers and split Observability from Economics / FinOps.
- Added initial Guardrails, STT and Embeddings chapters in both English and Russian.
- Performed a Russian editorial pass to reduce unnecessary English wording and replace raw phrases such as `feature` and `data control` with concise Russian wording.
- Added a static handbook catalog for maps, chapters, checklists, tools and planned templates.
- Added handbook landing counters, format filters and role-track filters.
- Added local progress and bookmark controls for handbook items and individual chapters.
- Added `/tools` and `/ru/tools` index pages.
- Updated the global navigation so `Инструменты` / `Tools` points to the tools index instead of a single tool.
- Added personal landing engagement formats:
  - architecture review
  - executive workshop / working session
  - talk or podcast
  - handbook collaboration
- Reduced the personal landing platform-map section to a concise preview and kept the full 12-layer map inside the handbook.
- Performed an additional Russian wording pass after review feedback to remove visible `feature`, `data control`, `fallback`, `guardrails` and similar avoidable English calques from Russian chapter text.
- Added `public/CNAME` for `notevskii.tech` and updated README deployment notes for the custom domain.
- Switched the primary public route set to Russian at the root:
  - `/`
  - `/handbook`
  - `/tools`
  - `/writing`
  - `/talks`
  - `/contact`
- Moved the English public route set under `/en/...`.
- Kept `/ru/...` as legacy compatibility routes while making public navigation point to the unprefixed Russian routes.
- Removed the public "product boundary" note from the handbook landing.
- Fixed handbook landing section hierarchy so section headings are short labels and explanatory text remains body copy.
- Updated the handbook tools CTA to point to `/tools` instead of the Prefix Cache Auditor.
- Replaced the awkward Russian public labels around "ворота качества" with "контроль качества" / "проверка качества" wording.
- Replaced the chapter metadata chip `Практика` with clear level labels such as `Средний уровень`.
- Translated Russian chapter audience metadata badges instead of showing raw English role labels.

## Validation results

- v3 discovery and structured-metadata milestone:
  - TDD RED confirmed the new SEO modules were absent; a separate route-wiring RED confirmed the metadata routes and JSON-LD page integration were absent. The static-build regression was reproduced and covered before adding the Next 16 `force-static` metadata-route requirement.
  - Spec-review regression RED reproduced six failures: incomplete reference breadcrumb hierarchies, unvalidated breadcrumb context, a YouTube watch page mislabeled as media content, unsupported recording URLs accepted, and editorial page dates leaking into software metadata and route wiring.
  - Review-correction GREEN passed: focused SEO validation 2 files, 18 tests; full Vitest 12 files, 204 tests.
  - Code-quality regression RED reproduced four failures: valid reference slugs differing from entity IDs were rejected, the case context omitted its parent component area relation, an unrelated valid case area was accepted, and RSS retained XML 1.0-invalid control characters.
  - Quality-hardening GREEN passed: source/model/SEO focus 3 files, 58 tests; focused SEO 2 files, 20 tests; full Vitest 12 files, 207 tests. The RSS parser regression is self-contained and has no host-tool dependency.
  - Fumadocs generation, Next route type generation, direct TypeScript, full ESLint, and the direct webpack static build passed; the build generated 105 static/SSG pages.
  - The export produced valid `out/sitemap.xml`, `out/robots.txt`, and `out/rss.xml`. Sitemap inspection confirmed trailing-slash local canonicals with no Habr URL, `/ru/` alias, `/writing/` route, or draft area; robots allows `/` and has no `Disallow`; RSS contains both the native article canonical and the external Habr source link/guid in descending date order.
  - Emitted HTML inspection confirmed exact area, component, and case breadcrumb hierarchies from the validated reference view model; the VideoObject uses the verified watch URL as `sameAs`, a derived YouTube `embedUrl`, the verified upload date, and the production local thumbnail without `contentUrl` or duration; SoftwareSourceCode uses release date `2026-07-20` and version `v0.1.3` without editorial `dateModified`. XML parsing, `git diff --check`, and the absence of `pnpm-workspace.yaml` were also checked.
  - Reference breadcrumb context now carries source slugs plus the case parent component's source-backed `primaryAreaId`, so canonical paths do not assume `entityId === slug` and unrelated areas fail closed. RSS removes XML 1.0-invalid code points before escaping while retaining TAB, LF, CR, and supplementary Unicode; the exported feed also passed local `xmllint` verification.
  - The Next.js build retains the pre-existing multiple-lockfile workspace-root warning; it does not prevent a successful static export.
- v3 content contract milestone:
  - TDD RED confirmed the schema module was absent before implementation.
  - Focused schema suite passed: 46 tests.
  - Full suite passed: 2 files, 51 tests.
  - Fumadocs generation, ESLint, TypeScript, static production build, and `git diff --check` passed.
- v3 validated registry milestone:
  - TDD RED confirmed the registry module was absent before implementation.
  - Review hardening RED confirmed mutable records, an unbounded caller limit, non-finite limit fail-open behavior, and relation-array ordering leakage before the fixes.
  - Focused registry suite passed: 18 tests.
  - Full suite passed: 3 files, 69 tests.
  - Targeted ESLint, direct TypeScript validation with `tsc --noEmit`, and `git diff --check` passed.
- v3 pilot content milestone:
  - TDD RED confirmed the source adapter module was absent; a second RED confirmed that an early adapter discarded MDX bodies and inferred planned areas too narrowly.
  - Focused source-adapter suite passed: 1 file, 6 tests. Full suite passed: 4 files, 75 tests.
  - Fumadocs generation, full direct ESLint, direct TypeScript validation, targeted ESLint, `git diff --check`, and a direct `next build --webpack` passed; the build generated 92 static/SSG pages.
  - The pre-review checkpoint confirmed 13/13 records were `draft`, `unreviewed`, and without `publishedAt` before any lifecycle promotion.
  - `pnpm lint` and `pnpm typecheck` could not reach their scripts because this environment's pnpm wrapper tried to recreate `node_modules`; equivalent repository binaries were run successfully, and the wrapper's generated `pnpm-workspace.yaml` side effect was removed.
  - The first independent content reviews returned no critical finding and requested corrections. The draft-only pass clarified the talk's source date and organizer role, simplified Russian descriptions, removed translated fragments, made the synthetic evidence recipe portable, and changed the CI statement from current enforcement to a prospective guardrail.
  - Portable evidence commands were reproduced from an isolated checkout at tag `v0.1.3` / commit `cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23`: the stable fixture returned exit `0`, while the drift fixture returned the expected AP-2 finding and exit `1`. The machine snapshot keeps the originally observed commands separate from the portable reproduction recipe.
  - Correction-pass validation passed: the review checklist and lifecycle invariants, Fumadocs generation, focused source suite (6 tests), full suite (4 files, 75 tests), direct TypeScript, targeted and full ESLint, `git diff --check`, and a direct static build (92 pages).
  - After atomic promotion, spec review found stale `draft + unreviewed` prose in the Inference Plane and Prefix Cache bodies. Commit `044b5f7` aligned both paragraphs with the reviewed lifecycle and scanned all 13 bodies; `afbd6ac` replaced the remaining public `applicability` with `применимости`. These fixes did not change lifecycle/frontmatter, dates, or relations.
  - Both mandatory content reviewers converged to `PASS` on the final promoted revision `afbd6ac`; the review rounds, findings, dispositions, source checks, and evidence semantics are recorded in `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-content-review.md`.
  - Final content freeze validation passed: 13 total records, 7 published, 6 draft, 3 reviewed, 10 unreviewed, 7 populated `publishedAt`, 3 populated `reviewedAt`, and six planned areas in canonical order. Fumadocs generation, focused source tests (6), full Vitest (75), direct TypeScript, full ESLint, `git diff --check`, and a direct static build (92 pages) passed.
  - Quality hardening RED reproduced the real flattened Fumadocs runtime shape leaking `toc`, `structuredData`, `_exports`, `extractedReferences`, `getText`, and `getMDAST` into strict frontmatter validation. The source adapter now strips all known runtime keys explicitly, preserves `body` as `MDXContent` plus a safe `sourcePath`, and still rejects unknown generated fields.
  - A separate evidence-recipe RED confirmed that the machine snapshot lacked fail-closed pin verification. The portable recipe now refuses an existing clone target and checks the exact origin, tag on HEAD, and hardcoded commit before either linter run; `.evidence-tools/` is ignored. Historical `runs[].command` values remain unchanged.
  - The pinned evidence recipe was replayed from an isolated temporary checkout: origin, `v0.1.3`, and `cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23` matched; stable returned exit `0`, drift returned exit `1` with AP-2, and both JSON outputs matched the stored snapshot exactly.
  - Quality-hardening validation passed: Fumadocs generation, focused source/evidence tests (2 files, 10 tests), full Vitest (5 files, 79 tests), direct TypeScript, full ESLint, `git diff --check`, and a direct static build (92 pages). Lifecycle/frontmatter, dates, and relations were not changed.
  - Because `119446f` changed public evidence instructions, both mandatory reviews were rerun on that exact revision. AI Platform subject review and editorial/security review both returned `PASS`; the final findings and dispositions are recorded in the content-review artifact.
  - Final Task 3 spec review returned `SPEC COMPLIANT`; independent code/data quality rereview returned no Critical, Important, or Minor findings and `Ready to proceed: Yes` on `abf00cf`.
- v3 personal master-brand shell milestone:
  - TDD RED confirmed `lib/site-routes.ts` was absent. After the route module alone was added, the focused suite remained RED on the old seven-item RU navigation, handbook master brand, and fabricated language alternates.
  - The pre-change export audit also failed all five representative surfaces: marketing and tool pages had two main landmarks, handbook chapters had none, and none had a skip link.
  - A self-review regression RED showed that Contact, although a utility action, lacked `aria-current="page"`; both desktop and mobile Contact links now share the same tested active-state decision.
  - Spec-review regression RED showed that the localized `/en` home target was also active on `/en/about`, producing two current-page links. Localized home targets are now exact-only while `/ru/**` compatibility normalization still feeds the canonical RU navigation.
  - The metadata invariant is hardened: an explicitly supplied locale alternate must exactly match the authoritative allowlist, while `null`/`undefined` remain canonical-only and never auto-add an alternate.
  - Focused route/metadata/shell tests passed: 1 file, 17 tests. The full suite passed: 6 files, 96 tests.
  - Direct Fumadocs generation, TypeScript, full ESLint, `git diff --check`, and the direct webpack static build passed; the build generated 92 static/SSG pages.
  - The post-build shell audit passed for a marketing page, tool page, handbook landing, handbook chapter, and `/ru` compatibility chapter; every sample has exactly one skip link and one `main#main-content`.
  - The production static mobile menu was manually verified separately by the root task; the automated shell tests do not claim mobile-menu runtime coverage.
- v3 personal-page implementation checkpoint:
  - TDD RED confirmed that `lib/content-v3/view-models.ts`, `v3MarketingMetadata`, and the new editorial page components did not exist before production code was added.
  - Explicit Home and Materials selections fail closed on missing, draft, stale, or wrong-kind records; permutation tests confirm that generated-entry order cannot change the result, and normalized list items omit MDX bodies and source paths.
  - Focused content, metadata, and page-composition validation passed: 3 files, 41 tests. The full suite passed: 7 files, 112 tests.
  - Fumadocs generation, direct TypeScript validation, full ESLint, `git diff --check`, and the direct webpack static build passed; the build generated 93 static/SSG pages including `/work`.
  - The post-build shell audit again passed for all five representative exports. Browser hierarchy, responsive, focus-order, and same-viewport screenshot comparison are intentionally pending the root design checkpoint and are not claimed here.
  - Review-hardening RED reproduced nine concrete regressions: missing localized dialog semantics, a leaked close-label prop, incomplete external-link guidance, and stale Russian page/metadata copy.
  - Focused GREEN passed: 2 files, 28 tests. Full Vitest passed: 7 files, 116 tests.
  - Fumadocs generation, direct TypeScript validation, full ESLint, `git diff --check`, the five-surface landmark audit, and the direct webpack static build passed; the build generated 93 static/SSG pages.
  - A final editorial RED caught the decorative hero source text diverging from the public role formulation. The source now reads `AI Platform Lead в Битрикс24`; CSS retains the uppercase visual treatment.
  - Final independent spec and Russian editorial rereviews passed on `95ed270`; the code-quality rereview found no Critical or Important issue and marked the milestone ready to proceed.
  - Production-static browser QA passed at 390 × 844, 768 × 900, 1280 × 720, and 1440 × 900. Home keeps the author and all three entrances in the first viewport; Home, Materials, About, and Contact have no horizontal overflow and retain one main landmark.
  - Mobile-menu runtime QA confirmed a localized description and close name, initial focus on Close, Tab movement to Blog, Escape close with focus return, body-scroll lock, exact navigation links, and an empty final browser console log.
  - The same-input before/after comparison, responsive captures, finding history, and final `passed` result are recorded in `design-qa.md`.
  - The Next.js build still reports the pre-existing multiple-lockfile workspace-root warning. No `pnpm-workspace.yaml` side effect was created.
- v3 Blog implementation checkpoint:
  - TDD RED produced 12 expected failures for the missing Blog view model and date formatter, missing Blog/detail compositions and routes, missing article metadata, and unapplied editorial corrections.
  - Focused GREEN passed: 3 files, 57 tests. Full Vitest passed: 7 files, 128 tests.
  - Direct Fumadocs generation, TypeScript validation, full ESLint, `git diff --check`, and the direct webpack static build passed; the build generated 95 static/SSG pages.
  - Static export checks confirmed `/blog/` and `/blog/ai-platform-before-gpu/`, one main landmark on both pages, the native author/body/AI Platform/Contact content, article Open Graph timestamps, and the direct Habr link. No `/blog/short-prompt-not-cheap/` export or local link exists.
  - The five-surface shell landmark audit passed.
  - Spec review found one P1 visual-contract issue in the text-glyph external cue; `62afd51` replaced it with the shared Lucide icon under a focused regression test. Quality review then found duplicated author branding in the final v3 marketing titles; `e1120f2` made those titles absolute while keeping native article metadata on the layout template.
  - Final independent rereviews returned `SPEC COMPLIANT`, editorial `PASS`, and quality `READY`. The remaining source-text route-test debt is recorded for Task 14 and does not block the Blog milestone.
  - Production-static browser QA passed at 390 × 844, 768 × 900, and 1440 × 900. Both Blog routes keep one main and one H1, no horizontal overflow, active Blog navigation, no false language switch, safe external-link cues, and a clean console. The native article keeps a 720 px long-form column, and its AI Platform and Contact ending remains usable on mobile.
  - The Home/Blog same-input visual-system comparison, responsive captures, and final `passed` result are recorded in `design-qa.md`.
  - Final root verification on `e1120f2` passed Fumadocs generation, 7 Vitest files / 133 tests, TypeScript, ESLint, `git diff --check`, the 95-page webpack static build, the five-surface landmark audit, and a 20-check Blog export audit.
  - The Next.js build retains the pre-existing multiple-lockfile workspace-root warning. No `pnpm-workspace.yaml` side effect was created.
- v3 Talks and Projects implementation checkpoint:
  - TDD RED produced 14 expected failures for the missing Talks/Projects view models and compositions, detail routes and type-specific facts, canonical metadata, route policy, and final content safeguards.
  - Focused GREEN passed: 3 files, 75 tests. Full Vitest passed: 7 files, 146 tests.
  - Direct Fumadocs generation, TypeScript validation, full ESLint, `git diff --check`, and the direct webpack static build passed; the build generated 97 static/SSG pages.
  - The five-surface shell landmark audit passed. A separate export audit confirmed all four new routes, exactly one main and one H1 per route, one index row per index, canonical-only metadata, the recording preview and two recording links, separate event/upload dates, the visible quick-start command, pinned release commit, and MIT license.
  - No local route was created for unavailable content, and no Talks/Projects RU/EN locale pair is advertised. The project copy remains diagnostic rather than promissory, and the self-hosted talk keeps workload, runtime, ownership, and data-boundary caveats explicit.
  - Review-hardening RED reproduced two contract defects: Task 7 had replaced the organizer's official mixed-script `ROИИ` spelling with Cyrillic `РОИИ`, and the reusable detail-page type allowed only one publication date even though runtime rejected it. The public talk surfaces and fixtures now retain `ROИИ`, while `ContentDetailPageProps` exposes an explicit dates-present/dates-absent union and preserves the runtime guard.
  - Review-hardening focused GREEN passed: 3 files, 76 tests, plus direct TypeScript validation of both rejected single-date states. Full Vitest passed: 7 files, 147 tests. Fumadocs generation, TypeScript, ESLint, `git diff --check`, the 97-page webpack build, five-surface landmark audit, and 24-check Talks/Projects export audit passed.
  - Final independent rereviews returned `SPEC COMPLIANT`, editorial `PASS`, and quality `READY`. The only remaining P3 debt is the shared source-text route-contract pattern already assigned to Task 14.
  - Production-static browser QA passed all four routes at 390 × 844, 768 × 900, and 1440 × 900. Each route keeps one main and one H1, active Materials navigation, no false language switch, and no horizontal overflow. The Talk thumbnail remains exactly 16:9; the Project code blocks scroll internally and the immutable SHA stays within the viewport.
  - Keyboard and interaction QA confirmed the five timestamp links, 44 px primary/continuation actions, mobile-dialog scroll lock, Escape close with focus return, and an empty final console. The Talk and Project AI Platform/Contact endings remain usable on mobile.
  - Final root verification on `c7ad951` passed Fumadocs generation, 7 Vitest files / 147 tests, TypeScript, ESLint, `git diff --check`, the 97-page webpack static build, the five-surface landmark audit, and a 32-check Talks/Projects export audit. The same-viewport mobile and desktop comparisons and final `passed` design result are recorded in `design-qa.md`.
  - The Next.js build retains the pre-existing multiple-lockfile workspace-root warning. No `pnpm-workspace.yaml` side effect was created.
- v3 AI Platform map and reference-vertical checkpoint (`c787e9d`):
  - TDD and correction-pass coverage validates the seven exact area identities, order, purpose, responsibility boundary, lifecycle state, unavailable-area non-interactivity, two real landing entrances, exact detail structures, breadcrumb targets, stale related labels, and the complete six-route graph.
  - Independent spec/design, AI Platform subject/content, and code-quality rereviews converged with no open P0, P1, or in-scope P2 finding.
  - Production-static browser QA passed the landing and map at 390 × 844, 768 × 900, 1280 × 720, and 1440 × 900, plus area, component, and case details at 390 × 844 and 1440 × 900. Every checked route has one main, one H1, no page-level horizontal overflow, an accurate active navigation state, and a clean console.
  - The map is one continuous ordered list; all six planned rows have no anchors, while Inference Plane is the only available area. The synthetic case disclosure appears before the title, and its code samples scroll inside the detail column.
  - Final direct validation passed: Fumadocs generation, 10 Vitest files / 186 tests, TypeScript, ESLint, `git diff --check`, the five-surface landmark audit, the six-file / 16-transition reference-path audit, and a 102-page webpack static build.
  - The same-input old-handbook/new-reference comparison, mobile/desktop system comparisons, exact screenshots, and keyboard-driver limitation are recorded in `design-qa.md`.
  - The Next.js build retains the pre-existing multiple-lockfile workspace-root warning. No `pnpm-workspace.yaml` side effect was created.
- `CI=true pnpm install` passed in the non-interactive shell.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 1 test file, 4 tests.
- `pnpm build` passed and generated static output in `out/`.
- `pnpm dev` started successfully on `http://localhost:3000`.
- Static export smoke test:
  - served `out/` on `http://127.0.0.1:4173`
  - verified `/handbook/`
  - verified `/tools/prefix-cache-auditor/`
- Browser automation note: the Browser plugin tool was unavailable in this environment; Playwright wrapper was present but failed to launch because `playwright-cli` was missing, so static rendered smoke checks used local headless Chrome.
- Bilingual implementation intermediate check:
  - `pnpm typecheck` passed after adding the Russian Fumadocs source.
- Final bilingual validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 46 static/SSG pages.
  - Static smoke checks passed for `/ru/`, `/ru/handbook/`, `/ru/handbook/platform-map/` and `/ru/tools/prefix-cache-auditor/`.
  - Desktop and mobile screenshots of `/ru/` were captured with local headless Chrome and reviewed.
- GitHub Pages launch prep validation after deployment/config changes:
  - `pnpm typecheck` passed after regenerating Next route types.
  - `pnpm lint` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 46 static/SSG pages.
  - Static export includes `out/.nojekyll`.
  - Static export emits `lang="en"` for `/` and `lang="ru"` for `/ru/`.
- Review-driven landing/content/editorial validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 52 static/SSG pages.
  - Static output spot-check confirmed the removed phrases `feature` and `data control` are no longer present in the Russian source/output surfaces checked.
- Review-driven product-onboarding validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 54 static/SSG pages.
  - Static smoke checks passed for `/ru/`, `/ru/handbook/` and `/ru/tools/` through the generated `out/` directory.
- Custom-domain and final editorial validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 54 static/SSG pages.
  - Static export includes `out/CNAME` with `notevskii.tech`.
  - GitHub Pages is configured with `cname: notevskii.tech`, `build_type: workflow` and `https_enforced: true`.
  - `curl -I https://notevskii.tech` returned `HTTP/2 200`.
  - `curl -I https://www.notevskii.tech` returned `HTTP/2 301` to `https://notevskii.tech/`.
- Default-root Russian routing and handbook landing validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 80 static/SSG pages.
  - Static smoke checks confirmed `/` renders `lang="ru"` and `/en/` renders `lang="en"`.
  - Static smoke checks confirmed `/tools/` is the tools index and links to `/tools/llm-cost-calculator/`.
  - Static smoke checks confirmed `/en/tools/` links to `/en/tools/llm-cost-calculator/`.
  - Static smoke checks confirmed `/handbook/` no longer contains the removed "Граница продуктов" block or the old `Практика` / `Ворота качества` labels.
  - Desktop screenshots for `/handbook/` and `/tools/` were captured with local headless Chrome from the static export.
- Writing, talks and public artifacts validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 80 static/SSG pages.
  - Reworked `/writing/` from a raw source-link list into a public writing page with cleaner Russian copy, topic chips, source cards and all verified Habr articles.
  - Added public video/podcast links to `/talks/`.
  - Added `sernote/audit-prompt-caching` as a public project artifact.
  - Local static server smoke checks returned 200 for `/writing/` and `/talks/`.
  - Captured a desktop screenshot for `/writing/` with local headless Chrome from the static export.
- Start-here cleanup validation:
  - Removed the public "What is still missing" / "Чего пока нет" block from the start-here chapter in both languages.
- Homepage composition cleanup validation:
  - Reworked the root homepage from repeated large card sections into a shorter sequence: hero, proof strip, after-demo problems, handbook map, recommended links, useful formats and public work.
  - Removed old homepage phrasing from the built static HTML: "Почему мне можно доверять", "production-контекст", "Публичные, очищенные", "Форматы взаимодействия", "Демо работает. Потом начинается production", "Хэндбук - главный проект", "Публичные статьи становятся", and "Доклады становятся".
  - Reduced avoidable English in the Russian root page: `AI-платформы для production` became `ИИ-платформы для продакшена`, and `production-вкус` became wording about real operational experience.
  - Fixed the desktop header so the author name, navigation, language switch and read button render in the static export.
  - Shortened the root hero height so the first viewport hints at the next section instead of leaving a large empty top area.
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 80 static/SSG pages.
  - Captured a full-page desktop screenshot for `/` with Playwright from the local static export.
- Productization pass validation:
  - Added route-specific metadata helpers and applied page-level titles/descriptions to personal pages, tools and handbook pages.
  - Added `canonical` and `hreflang` alternates for Russian root routes and English `/en/...` routes.
  - Reworked the handbook landing with role-based entry points, a searchable/filterable materials catalog, local progress and bookmarks.
  - Added updated-date and tag metadata to chapter headers while keeping raw `draft` out of public chapter badges.
  - Added direct top-level navigation for projects and about, while keeping contact as the primary header action.
  - Expanded the contact page with clear interaction formats and the context to provide before a talk, review or collaboration.
  - Forced Fumadocs to the dark theme so the handbook sidebar matches the dark technical field-manual direction.
  - Cleaned additional Russian UI/content wording: `AI-платформа` / `AI-сценарий` became `ИИ-платформа` / `ИИ-сценарий` where the English term was not needed.
  - Local static smoke checks confirmed distinct metadata for `/about/`, `/contact/`, `/tools/llm-cost-calculator/`, updated chapter metadata on `/handbook/gateway/ai-gateway/`, and role/search/catalog content on `/handbook/`.
  - Captured desktop screenshots for `/handbook/`, `/contact/` and `/tools/` from the local static export.
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 80 static/SSG pages.
- Handbook production-pattern and personal-landing polish:
  - Added reusable handbook diagram components for flow, block and stack schematics inside MDX chapters.
  - Added a dedicated Semantic Router chapter in both Russian and English.
  - Added practical self-hosted migration, route policy, context-budget, non-prod economics, SLO-pool, long-context, router-eval and observability-field inserts across the relevant handbook chapters.
  - Added initial template pages for scenario migration RFC, execution-boundary matrix and non-prod cost sheet.
  - Expanded Prefix Cache Auditor with agent-session diff checks.
  - Expanded LLM Cost Calculator with agent mode, retries, fallback rate and cost per accepted result.
  - Expanded the AI Quality Gate checklist with router and long-context readiness checks.
  - Polished the personal landing page around `Сергей Нотевский`, `Практика за хэндбуком`, `Флагманский проект`, a tighter after-demo block and a merged "Где я полезен" section.
  - Updated Russian root metadata and handbook sidebar branding to use `Сергей Нотевский`.
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 92 static/SSG pages.
  - Static export smoke checks confirmed `/` contains the updated Russian personal title and landing sections.
  - Static export smoke checks confirmed `/handbook/gateway/semantic-router/`, `/handbook/templates/scenario-migration-rfc/` and `/tools/llm-cost-calculator/`.
- Mobile homepage and handbook cleanup:
  - Fixed the mobile Fumadocs handbook layout so the header and main content use the full viewport width instead of leaving a clipped right-side column.
  - Reworked the root proof area into a compact facts strip instead of raw-looking uppercase cards.
  - Simplified the root "Публичные материалы", "Где я полезен" and "Об авторе" sections so explanatory copy no longer appears as oversized headings or duplicate link blocks.
  - Cleaned additional Russian homepage and handbook landing wording: `guardrails`, `evals`, `production:` and similar avoidable English wording were replaced where they were not needed.
  - Made the handbook landing counters two-column on mobile instead of a long one-card-per-row stack.
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 92 static/SSG pages.
  - Mobile Playwright screenshots were captured for `/` and `/handbook/`.
  - Mobile layout check confirmed `scrollWidth=390`, `innerWidth=390`, `#nd-subnav.width=390`, and handbook main content width `390` at a 390px viewport.

## Decisions

- Used one Next.js app for the personal site, handbook and tools to keep design, routing and deployment simple for v0.
- Used `output: "export"` and `trailingSlash: true` for static host compatibility, including GitHub Pages-style directory index resolution.
- Used `next build --webpack` for `pnpm build` because the default build path stalled locally; static export remains enabled.
- Kept all tools client-side with deterministic local calculations and no external calls.
- Used verified public author links only:
  - Telegram: `https://t.me/s/sergeinotevskii`
  - Habr: `https://habr.com/ru/users/Ser_no/articles/`
- Added verified public media/artifact links supplied by the author:
  - `https://www.youtube.com/live/2RvzgMYrX0o?si=TrgfDk2wVLht-I6k&t=11102`
  - `https://youtu.be/RHbbeHKGh6I`
  - `https://www.youtube.com/watch?v=NrvGciRm8Ps&t=1992s`
  - `https://github.com/sernote/audit-prompt-caching`
- Treated public Habr topics on prefix cache and effective cost as content anchors.
- Kept examples synthetic and sanitized.
- Chose route-prefix i18n for the secondary language instead of localStorage/client-only toggling to preserve static hosting and direct links.
- Chose Russian as the root language for `notevskii.tech`; English is available under `/en/...`.
- Kept `/ru/...` routes as compatibility aliases for previously shared links.
- Kept English as the default route set to avoid breaking existing URLs.
- Created a second Fumadocs source for Russian MDX instead of trying to translate handbook content at runtime.
- Targeted GitHub Pages deployment via GitHub Actions rather than committing `out/` to the repository.
- Kept root-relative asset paths; the target is a user Pages repo named `sernote.github.io`, served through the custom domain `notevskii.tech`.
- Added `public/CNAME` with `notevskii.tech` for GitHub Pages custom-domain publishing.
- Kept established technical terms in the Russian version where they are useful for the target audience, but replaced avoidable English wording with Russian wording.
- Treated `feature` as `фича` or `возможность` by context; treated `data control` as `контроль данных`.
- Implemented progress and bookmarks with browser `localStorage` only, preserving static export and avoiding accounts, backend storage, analytics or tracking.
- Kept tracks and filters as static product navigation for v0 instead of adding a full learning platform, graph database or user accounts.

## Known issues

- Release gate for v3 evidence: before launch, check the three canonical `main` URLs. If all resolve, they may replace the truthful source-tree paths in the case; otherwise keep the code paths. Do not claim current URL availability while any link returns 404.
- Human usability remains a launch gate: at least 5 of 6 target readers must complete the acceptance task. Content freeze and technical validation do not by themselves make the pilot launch-ready.
- The MaaS vs self-hosted recording uses the source calendar date from YouTube metadata, 2026-02-22; the event date remains 2026-02-19.
- Content is intentionally v0 placeholder-but-useful; it needs editorial expansion before a full public launch.
- `tests/seo/site-routes.test.ts` inspects React `forwardRef`'s internal `.render` shape for one close-label leakage assertion. This is brittle but accepted for the pilot release candidate: the pilot ships no hydrated browser-component test harness, and the assertion is outside the Task 11/12 static-export/migration surface. Revisit if a DOM test harness is ever added; do not treat it as a blocking IOU.
- Accepted test-debt: the Task 6–7 route source-text assertions remain string-based rather than imported/runtime route-contract coverage. Accepted for the pilot RC for the same reason (no browser-component harness); not a launch blocker.
- The GitHub Pages `404.html` (and `_not-found`/`404/index.html`) are the framework-default error artifacts: they ship without `<html lang>`, the single `main#main-content`, the skip link, or the dark theme. This is pre-existing (not introduced by the v3 route-migration work) and off the pilot happy path, so it is deferred rather than fixed during release convergence — a custom `app/not-found.tsx` would require restructuring the multi-root-layout (route-group) app. Tracked as a post-RC follow-up; the static-export audit correctly excludes these auxiliary artifacts from page-level checks.
- Russian content is much cleaner after the editorial pass, but should still get a final human read before a broad public launch.
- The legacy MVP smoke checks used local headless Chrome; current v3 checkpoints use the in-app browser and production static export at explicit responsive viewports.
- No analytics, newsletter, comments, search index or backend integrations are included by design.
- GitHub repository exists at `https://github.com/sernote/sernote.github.io`; pushes to `main` have worked in this environment.
- DNS for `notevskii.tech` was configured by the user in REG.RU with GitHub Pages apex records and `www` CNAME; GitHub Pages now resolves the apex domain over HTTPS and redirects `www` to the apex.
- Progress and bookmarks are intentionally local to one browser/device and do not sync across devices.

## Follow-ups

- Expand the strongest chapters first:
  - Production AI Platform Map
  - AI Platform Maturity Model
  - MaaS vs self-hosted
  - Prefix Cache
  - AI Quality Gate
  - LLM Observability Checklist
- Add Model Lifecycle, Guardrails, RAG/Agents and Platform DevEx sections in later versions.
- Add `docs/CODEX_SETUP.md` for optional shadcn MCP setup if this repo will be shared with other agents.
- Add richer visual diagrams or downloadable maps after content stabilizes.
- Watch the first few GitHub Pages deploys after future content pushes to ensure the workflow remains green.

## Blockers

None.
