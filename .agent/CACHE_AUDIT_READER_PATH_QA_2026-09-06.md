# Cache audit reader path — 6 September 2026

The approved follow-up makes «Проверить кэш в своём проекте» the primary action on the project page, four cache articles and the relevant handbook task. The action opens the local own-project instructions. The prefix example and feedback remain optional, and the technical articles retain their explanations independently of the tool.

## Source checks

- Site base: `6245eac3a672514e3a23d60ae060c002a32da63e`, including merged PR 11.
- New upstream guide and routing material: public PR 23 at `0914f211bc7ecedb0fdffae579acdafc05e06d18`, verified open and unmerged. New document links use this immutable revision, without advertising them as files already in main or adding PR bookkeeping to public prose.
- Read `docs/first-audit.md`, `docs/routing-capture.md` and the updated laboratory README at that revision. The laboratory begins with two findings and saved artifacts; reproduction is optional.
- Verified `.github/ISSUE_TEMPLATE/audit-result.md` exists on the upstream default branch. Feedback links use `issues/new?template=audit-result.md`.
- The experimental analyzer requires normalized JSONL; the pages do not promise an adapter for ordinary logs. The synthetic server has no model or KV cache. Its input-character and stream-completion findings remain scoped to the recorded version and HTTP path.
- Inspected the project and four cache articles: no draft-PR narrative, pilot recruitment, participant quotas or numerical publication conditions.

## Validation

Final `corepack pnpm verify`, with the pinned pnpm 10.19.0 available to nested commands, passed: lint, TypeScript, 408 tests (8 intentional production-only skips), the 117-page build, 46 production export checks, the 6-file/16-transition reference audit and the 112-route/23-sitemap-URL export audit. Existing 35 aliases and 54 archives are unchanged.

Existing tests now cover the own-project primary action, actual article modification dates and the working feedback form. Independent source/editorial/integration review returned no actionable findings.

Browser verification confirmed the primary link and its `#your-project` destination. At 390 pixels, the complete action fits, the destination heading is visible after clicking, and document width remains 390 pixels. The preview was refreshed after the final build and the temporary viewport override was reset.

The change adds no routes, dependencies or publication workflow. The original checkout and its user drafts remain outside this branch. New source documents are readable through their revision links; the feature push itself does not deploy the site.
