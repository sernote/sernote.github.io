# Cache public-copy correction — 6 September 2026

The reader found editorial commentary in the published router article, including the sentence about absent comparative GPU results. This correction addresses the same pattern across the linked cache materials.

## Merge diagnosis

- Site PR 12 merged at `2026-09-06T11:41:13Z`, merge `7accf8853139b6fbf8c643df7fb3b8b5cb635b41`.
- The old PR 2 merged at `2026-09-06T11:41:54Z`, merge `6689152b737f197e9eb2252a840152e5e1ab3c32`; its first parent is the PR 12 merge.
- Comparing reviewed reader-path commit `f7076def66d2f353d56c8d4a612f17f148f9d3e5` with `6689152` shows exactly nine added `docs/site-v2` files. Application, components, public content, tests, dependencies, active `.agent` documents and workflow are unchanged.
- Pages [run 34030989806](https://github.com/sernote/sernote.github.io/actions/runs/34030989806) completed successfully. A fresh browser read of the live router article confirmed the complained-of sentence. Its presence predates the old PR merge.
- The v2 README now identifies the directory as a historical proposal and points to the accepted v3.1 direction and active work documents.

## Scope

Edited the four cache articles, audit-prompt-caching project page, Prefix Cache chapter and tool-order example. Removed process commentary, repeated statements of absent research and mixed-language audit-report prose. Conditional numbers, pinned implementation scope, request-versus-cache semantics and the test HTTP server's simulated responses remain explicit where they explain the example.

The case keeps its URL, JSON fixtures, saved results and pinned analyzer commands. Its title and five sections now follow the reader from the reordered tools to reproduction, an application change and cache verification. The structure validator and existing copy/provenance tests reflect this format; the synthetic disclosure gate and its placement before the title remain tested. No new dependency, backend, tracking or model call.

README authoring guidance now covers this editorial failure across a whole linked series and its UI copy.

## Verification

From the isolated worktree, using the repository's pnpm 10.19 wrapper:

```bash
PATH=/private/tmp/notevskii-site-pr-bin:$PATH corepack pnpm verify
git diff --check
```

- Lint and typecheck passed.
- 24 test files: 408 passed, 8 intentional production-only skips.
- Static build: 117 pages.
- Production export contract: 46 passed.
- Reference path audit: 6 files, 16 transitions.
- Export audit: 112 routes, 35 aliases, 54 archives, 23 sitemap URLs.
- Log: `/private/tmp/notevskii-cache-public-copy-verify.log`.

Independent native review found no blockers or required corrections. The reviewer read the seven documents and changed UI/contract files, checked local fixtures/evidence and linked destinations, and confirmed all five project anchors remain present. No new text was sent to an external model service.

Browser checks used the actual static export at `127.0.0.1:4174`:

- Revised router introduction visible with the absent-results sentence removed.
- At 390 px, the case's version disclosure expands and displays all three checks; page width remains 390 px.
- The interactive calculation still changes from A = 180 / B = 700 ms to A = 980 / B = 700 ms when selecting the long-queue preset.
- The chapter's own-project link reaches `/projects/audit-prompt-caching/#your-project`; the target is visible at 112 px and page width is 390 px.
- The temporary viewport override was reset. The corrected router article remains available as a local preview.

## Handoff

Base: `6689152`. Branch: `codex/cache-public-copy`. Original-checkout user drafts and local settings are not part of this correction. Publication follows the correction PR's merge.
