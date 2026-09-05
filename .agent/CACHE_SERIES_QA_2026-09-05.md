# Cache series: connected explanations and first audit

5 September 2026. Completed locally; independent reviews, required checks and responsive acceptance passed. No deployment or external publication.

## Delivered scope

- Three standalone native Russian articles: session affinity versus prefix locality; what standalone vllm-router and Dynamo know; returning offloaded KV versus recomputing it. Existing author material informed the voice. Versions and applicability are explicit; no claimed GPU benchmark winner or production savings.
- Prefix Cache keeps its nine sections, compiled contents, diagram and client-side experiment. Five task routes connect request layout, provider usage, replica selection, event recovery and offload to actual material.
- The project page offers a local first-audit action, contents, a pinned reproducible example and a direct continuation to the reader's own project. The routing section links back to checkout setup. Stable release v0.1.15 is distinct from the draft walkthrough.
- The existing livestream keeps its identity, publication date, recording and thumbnail; event date is corrected to 4 June 2026, upload date remains unknown. Takeaway links include 4684, 6565 and 6911 seconds. Unknown upload dates retain breadcrumbs and the visible player, without fabricating VideoObject uploadDate.
- Three keep routes, canonicals, authorship, article metadata, sitemap and RSS are integrated. The 35 aliases and 54 archives are unchanged. No backend, dependency, tracking or global skill installation.

## Reproducible evidence

GitHub PR 21 was rechecked in this turn: open, draft, unmerged, head `54f333fd06fafc7a8428aab7242682548c5891af` on `codex/cache-first-audit`. The local walkthrough pins this SHA. Stable v0.1.15 was independently checked against GitHub release evidence; the new fixtures and routing helper are not claimed to ship in that release.

In an isolated checkout of that commit, Python 3.14.3 reproduced 43 and 254 common UTF-8 prefix bytes, both with expected exit 1. A second independent calculation confirmed the byte counts and that both pairs preserve the same lines. This is an input-layout result, not token reuse or savings. All three normalized routing fixtures returned valid reports with exit 0; an invalid threshold returned JSON error/exit 2. Missing outcome remains `ttft_assessment: unknown` and joint result `null`. No provider, model or GPU was called.

Full receipts and source versions: `.superpowers/sdd/2026-09-05-cache-series-integration/project-report.md`, `articles-report.md`, `connections-report.md`.

## Review and integration checks

- Independent content review has no remaining blockers. Corrected the inference from merely present usage fields to positive documented cache reads, distinguished creation/write, and corrected JSON null versus unknown. Also implemented its optional setup link for direct routing entry.
- Independent integration review has no actionable findings. Exact before/current manifest comparison confirms only three additions. Reports: `content-review.md` and `integration-review.md` in the milestone directory.
- TDD covered unknown upload date, the project action/compiled contents, and canonical route registration before implementation. New export checks validate actual cross-page fragments, entry paths, native article author/canonical/feed/sitemap identity.
- Lint and typecheck passed. Full suite: 24 files, 408 passed and 8 production-only skips. Build: 117 pages; 35 aliases and 54 archives materialized. Production export suite: all 46 passed. Reference audit: 6 files / 16 transitions. Export audit: 112 routes / 23 sitemap URLs. Selected JSON-LD matrix: 31 scripts, including BreadcrumbList-only for the corrected livestream; this is not a whole-site script count.
- Export QA caught the lost visible repository URL after the primary action moved to the local audit; the project introduction now links the repository. The author assertion was aligned with the existing trailing-slash materialization. Final export checks passed after rebuilding.
- Existing pnpm workspace and multiple-lockfile warnings remain. Commands use process-local `pnpm_config_verify_deps_before_run=warn` to avoid automatic dependency reinstallation. Protected hybrid-article/workspace hashes and `git diff --check` passed.

## Browser acceptance

The static preview serves the final 117-page export on 127.0.0.1:4173. All six changed/new detail pages were inspected at 390, 768 and 1280 px: one main/h1 per page, no horizontal page overflow. Article tables fit 350 px on mobile and 688 px on tablet; code blocks scroll inside their containers. The offload diagram stacks its three steps on mobile. Desktop and tablet article contents remain readable in two columns. Screenshots were visually inspected for the desktop sticky article, tablet router article, mobile offload article/diagram, mobile talk and project, chapter task table and desktop blog.

Actual paths exercised with pointer and keyboard:

- Sticky article → first audit; rendered 43/254 result and byte/exit interpretation inspected → own-project link. At rest, project anchors land at about 112 px and headings near 140 px on desktop/mobile.
- Mobile livestream → Prefix Cache → first audit. Correct event date is visible; all three corrected YouTube offsets are present. The chapter's nine-item compiled contents and two-column task table remain usable at 390 px.
- Router article → routing audit → pinned checkout setup. Direct routing anchor lands near 112 px on tablet. The setup backlink and unknown/null output explanation are present.
- Offload contents → versioned three-stage diagram. Its caption keeps the connector/version boundary and the calculation remains labeled illustrative.
- All three new articles are discoverable in the actual Blog chronology. Each canonical/author/feed/sitemap entry and all local cross-page fragments in the six-page reader graph pass the actual-export tests.
- Feedback link was opened in a separate hidden browser tab. GitHub returns its sign-in page with return_to set to this repository's new-issue URL and the intended title. Nothing was submitted; the unmerged template is not presented as an installed form. The web fetcher had a cache miss, so browser observation supplies this final navigation evidence.

The browser viewport override is reset for delivery. Prior handbook-entry acceptance is preserved in `.agent/HANDBOOK_ENTRY_QA_2026-09-05.md`. The final build and both export/reference audits were repeated after the two small screenshot-led copy fixes: the historical case changes tool order, and the prose commit label is shortened while the command and URL retain the full SHA. No unresolved critical issue remains.

## Boundaries and next release

The Habr cache-router draft and Batch/cache Telegram draft remain in the supplied editorial packet for the next release. No external messages/posts, production deployment, native raw-log adapter, comparative GPU/offload run or reader-adoption research was performed. Six planned platform areas remain visibly planned. Source packet in the separate audit-prompt checkout was read only. No new text was sent to Claude in this milestone; the earlier approved two-draft style consultation remains separate.

## Follow-up: endpoint input and public router observation

Completed locally on 5 September after two user-authorized handoffs. Four existing MDX pages were corrected: router-state article, sticky/prefix article, Prefix Cache chapter and project page. The pinned ordinary HTTP chat path uses a nonblank string session_params.session_id or an empty string, not messages; the completion path delegates to prompt extraction. Source inspection separately establishes that the circuit-breaker outcome is HTTP-status-based and does not certify intended client SSE completion. Router representation/units, engine reuse and client observations remain distinct.

The later handoff supplied public draft PR 22 at `b53cd3f3fc69f044952d99cd6046f274a80f1ee2`, stacked on PR 21. Its run and first-pilot links are now integrated in the router article and project section `#router-observation`. GitHub metadata confirms draft/open/unmerged, with successful CI for that head. All five published artifact SHA-256 hashes match. Independent parsing of client SSE events confirms `[true,true,false]`, all HTTP 200, three empty-input policy records and circuit-breaker success=3. This checks published artifacts; no live router/GPU run was repeated. The synthetic worker has no model/KV, and no attempt mapping or normalized analyzer export is fabricated.

Independent review found and then cleared one launch-path issue: PR 21's checkout lacks the new probe. The project gives a separate clone and detached PR 22 checkout before the build/run link. That clone/cd/switch sequence was verified in an isolated temporary directory, with exact HEAD and probe presence. The prior PR 21 walkthrough and pilot guide's separate installed-skill pin remain unchanged. No skill installation or participant outreach occurred.

Final validation: lint, typecheck, 24 test files / 408 passed / 8 intentional skips, build 117 pages, 46 export tests, reference audit 6 files / 16 transitions, export audit 112 routes / 23 sitemap URLs, protected-file hashes and git diff --check all passed. No routes, aliases, archives, runtime features or dependencies changed in this follow-up.

Final browser acceptance at measured 390/1280 px passed for the endpoint explanation, recorded-run section and project launch path. A cramped endpoint table was replaced with two readable bullets. At 390 px every endpoint/code identifier in that list stays on one line, the list fits 350 px, and the page has no horizontal overflow. Actual article-to-project keyboard navigation lands around 112 px; run/capture/pilot links retain their immutable destinations. The checkout code remains contained inside its horizontal-overflow block. The viewport override is reset and the preview retained.

Full evidence, initial/final scoped diffs and both resolved reviews: `.superpowers/sdd/2026-09-05-cache-endpoint-correction/`. Site changes remain local and uncommitted; no production deployment or new external-model consultation.
