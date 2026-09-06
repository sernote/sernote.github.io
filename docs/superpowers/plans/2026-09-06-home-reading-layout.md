# Readable Home implementation plan

**Goal:** implement the Home composition the user approved in Visualize, with real source-backed links and readable text at desktop and mobile widths.

**Architecture:** preserve the static server-rendered personal site shell. Scope markup to Home in `components/pages/v31-personal-pages.tsx`; scope its styles locally. Extend the pure Home view model only as needed for eligible sidebar chapters and Home-only teasers. Leave Blog and other routes unchanged.

**Design:** `docs/superpowers/specs/2026-09-06-home-reading-layout-design.md`.

## 1. Implement the approved composition

Update Home, its view model and the existing relevant tests. Preserve lead fallback, duplicate suppression, publication lifecycle eligibility and external link semantics. Use readable typography and a one-column article flow with a sidebar; replace the oversized hero and numbered entrances. Run focused page/view-model tests and self-review.

## 2. Review and verify

Perform independent spec and code reviews. Run the complete `pnpm verify` chain. Inspect the exported Home at 1,440, 768 and 390 px, follow its article, chapter, project and external links, and verify keyboard navigation. Resolve discovered defects before completion. Record evidence in `.agent/HOME_READING_LAYOUT_QA_2026-09-06.md` and update `.agent/STATUS.md`.

## 3. Deliver

Keep the original checkout and its user drafts untouched. Commit the isolated branch and deliver a reviewable Home preview; accurately report whether it has been published. The prior A/B/C release is already merged and deployed and must not be republished as new work.
