# Graphite visual refresh — 30 September 2026

## Scope and design decisions

The user requested a better visual design using Porch, `claude-b`, Opus 5.5 high, then a pull request. Their follow-up specifically rejects the oversized author name. This refresh uses the supplied AGENTS.md direction: calm graphite surfaces, off-white text, restrained blue accents, thin rules and subtle architectural detail.

The first local implementation was based on an older checkout. The review branch is instead based on `origin/main` at `beba14d`, preserving the subsequently published articles and practical-first reader experience. The Home composition from PR #15 remains: a compact author introduction, an article column, and the handbook/project sidebar. The author name is 34 px on phones and 44 px on larger screens, also capped at 44 px on About. This replaces the rejected 52–120 px treatment.

Shared tokens, navigation, contents panels, reading cards, Materials and About styling, and the AI Platform schematic receive the refresh. Current content, URLs, article series, bylines, channel destinations, eligibility rules, and the reference page's responsive contents navigation remain intact. No dependency, backend, tracking or content-body change is intended.

## Implementation notes

- Force one coherent dark theme in the root layout, including Fumadocs and portaled controls.
- Put global border defaults in Tailwind's base layer so explicit border utilities work; put visual primitives in the components layer.
- Keep the mobile dialog's fixed positioning independent of the blueprint background primitive.
- Move the full desktop navigation to 1024 px to avoid crowded tablet navigation.
- Preserve main's public status wording (including “Читать”), synthetic-example notices, and source/application sections.

Implementation used Porch `run_fresh-hazel-a5a4`; reconciliation with current main and the smaller name used `run_fresh-fern-dc39`. Both use the requested `claude-b` executable, `claude-opus-5-5`, high effort. Parent review and acceptance are recorded below.

## Validation

Final branch verification: `corepack pnpm verify` exited 0, covering lint, typecheck, 25 test files / 419 passing tests (8 export-only skips), a 118-page production build, 46 production export integration checks, the 6-file / 16-transition reference audit, and the static-export audit (113 routes, 35 aliases, 54 archives, 24 sitemap URLs). `git diff --check` also passed. Existing Next.js workspace-root and webpack cache warnings remain non-fatal.

Production-browser layout checks covered 11 routes at 390, 768, 1024 and 1440 px: all 44 checks have no document overflow, one main landmark and one H1. Computed Home and About name sizes are 34 px at 390 and 44 px at the other tested widths. Visually inspected phone/desktop Home, tablet Home, and the desktop AI Platform entrance. Viewport screenshots and measurements are in `.agent/visual-refresh-2026-09-30/`.

Removed the unused reading-journey rail CSS after retaining current main's compact Home. No content, model, lockfile or dependency changes entered the branch. The original checkout's protected article, source test and pnpm workspace file remain byte-identical to the initial hashes.

## Interactive QA — verified

The earlier in-app-browser limitation did not recur on this final production export. Verified at 390 px:

- Click opens the mobile dialog; initial focus is on Close.
- Escape closes it and restores visible focus to Menu.
- Enter on Menu reopens it; selecting About navigates and closes the dialog.
- The reference contents disclosure opens; its Architecture link reaches the matching anchor.
- The cache example's long-queue preset changes the winner to B (A 980 ms / B 700 ms); Reset restores A (180 ms / B 700 ms).

The earlier interaction limitation is therefore closed for these checks. These are local production-export results, not a deployment claim.

## Delivery boundary

Prepared for pull-request review. No merge or deployment is part of this request. Unrelated drafts remain in the original checkout and are excluded from this branch.
