# Project page editorial correction — 6 September 2026

## Problem and change

The published audit-prompt-caching page mixed reader instructions with PR status, branch history and repeated validation caveats. Technical correctness and passing tests had not caught the editorial problem.

The page now presents installation and a Russian Codex task first, a compact request-layout example, result interpretation, routing analysis and a separately linked HTTP observation. Detailed formats and recorded evidence remain in the repository. PR history, detached checkouts, long duplicated prompts, mixed-language input tables and repeated lists of unsupported claims were removed. The router article's practical outro received the same edit. The author's Claude for Open Source note is preserved.

README authoring guidance now explicitly separates reader-facing explanations from release-process documentation. The existing test that required a draft PR link was updated to check a working quick start and all five stable practice anchors.

## Sources and example

- Site base: `7ba770adfecd15b59790a28de2ea5175f798727d`, the merge of PR 10.
- Public audit repository default branch checked at `622677ae476c64d875663faf53a93353ab17a5e7`. Its first-audit example, routing analyzer and linked provider references exist.
- A fresh clone followed the page's Python commands: `before` gives `stable_prefix_bytes: 43`; `after` gives `254`. Both return `stable: false` and exit `1`, as documented. These are UTF-8 byte comparisons, not measured cache hits.
- The separate router observation remains linked to `b53cd3f3fc69f044952d99cd6046f274a80f1ee2`. It is not advertised as a default-branch or stable-release feature. Its synthetic server omits application completion events in one response; no transport failure or GPU measurement is claimed.

## Verification

Used an isolated worktree and a frozen-lockfile, offline install with pnpm 10.19.0. No local workspace settings or dependencies from the original checkout were reused.

Final `corepack pnpm verify` passed with the pinned pnpm available to nested commands:

- ESLint and TypeScript.
- 24 test files: 408 passed, 8 intentional production-only skips.
- 117-page static build; 35 aliases and 54 archives materialized.
- 46 production export checks.
- Reference audit: 6 files, 16 transitions.
- Export audit: 112 routes, 23 sitemap URLs.

During verification, corrected a whitespace-sensitive milestone assertion, the router article's updated modification date in export expectations, and the useful link from the example back to the own-project instructions. Independent review also tightened the description of the deliberately missing completion events. All findings were addressed before the final successful run.

Browser inspection covered the final page at 1280 and 390 pixels, the contents-to-installation link and the primary example link. All five practice anchors exist; the mobile document width equals its 390-pixel viewport, with long commands contained in scrollable code blocks. The technical body was also read as rendered text to confirm the release-process narrative is absent.

Only editorial copy, existing test expectations and development documentation changed. No route, dependency or deployment-workflow change. Original-checkout user edits remain separate. This branch is prepared for PR review; no production deployment is performed by the feature push.
