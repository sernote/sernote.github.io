# Handbook entry: working questions and reading sequence

Date: 5 September 2026. Status: completed locally; integrated checks, independent review and browser acceptance passed.

## Scope and acceptance

This bounded milestone continues the user-approved product audit and the user's request to keep moving after the author-discovery milestone. It changes the existing AI Platform entrance, its injected view model and focused tests. The light author-first editorial direction remains the accepted visual baseline. No new chapters, routes, dependencies or publication are included.

The entrance should make the available material immediately useful:

- Four working questions open a source-derived native article, the Prefix Cache metrics section, its interactive calculation and the synthetic tool-order case. Distinct questions must not all resolve to the map.
- Questions are editorial recommendations: omit unavailable, hidden, stale or inappropriate records. Preserve the existing complete public reference sequence and show its actual review labels.
- The reading sequence appears before the seven-area overview. Each step explains what the reader can do with it. Preserve `#current-vertical`, canonical URLs, the map, all seven areas and six planned non-links.
- The introductory article uses its actual title and canonical URL; omit it if unavailable.
- Keep the educational calculation and static synthetic case distinct from runtime measurements. All chapter/article content and source dates are preserved.
- Maintain a single main landmark and heading, keyboard navigation, readable mobile/tablet/desktop layouts and static export.

The long landing-page introduction, maturity list and deployment comparison are replaced by direct material discovery. The existing introductory article remains available for platform boundaries. This is the audit's proposed shift from a broad promise to published answers; it is not a claim of comprehensive handbook coverage or reader research.

## Content grounding

- `content/v3/blog/hybrid-reasoners-in-production.mdx`: common and separated pools; protected user text unchanged.
- `content/v3/ai-platform/components/prefix-cache.mdx`: metrics, `#experiment`, applicability and limitations from the completed cache milestone.
- `content/v3/ai-platform/cases/agent-session-cache-reuse.mdx`: static input comparison with a pinned linter; no model/cache execution.
- `content/v3/ai-platform/areas/inference-plane.mdx`: execution responsibilities.
- `content/v3/projects/audit-prompt-caching.mdx`: local diagnostic workflow.
- `content/v3/blog/ai-platform-before-gpu.mdx`: platform boundaries, quality and responsibility.

No source documents, new text or private metrics were sent to an external model in this milestone. Existing editorial guidance and published material informed the interface copy.

## Verification receipt

- TDD RED: 6 expected failures in 66 focused tests, caused by absent question selection and the previous landing composition.
- Focused GREEN: 66 tests passed. Integrated lint/typecheck passed; full suite: 24 files, 406 passed and 6 intentional skips. Build: 114 generated pages, 35 aliases and 54 archive pages. Production export: 44 checks; reference audit: 6 files/16 transitions; export audit: 109 routes/20 sitemap URLs.
- Independent code review: no blocking findings. Report `.superpowers/sdd/2026-09-05-handbook-entry/code-review.md`. The reviewer noted a minor fixture gap for reading-step explanations; all four actual explanations were inspected in production DOM and mobile/tablet/desktop layouts.
- Browser acceptance: 390/768/1280 px, no horizontal page overflow, one main/h1. Question widths 349/343.5/567.5 px; reading explanations 310/345 px on phone/tablet. All four direct questions navigated to the intended article/chapter fragment/case; three exercised with Enter. Metrics anchor arrived at visible heading (top 111.75 px). Mobile reading-sequence anchor worked. Screenshots inspected on all three widths.
- Protected user hashes passed. A temporary static server was restarted for browser QA after the previous turn's process had stopped. No production deployment.

Scoped before-images for review are stored in `.superpowers/sdd/2026-09-05-handbook-entry/before/`. Earlier uncommitted milestones and user edits remain separate from this milestone's comparison.
