# v3 Implementation Review — Convergence (Task 14)

Scope: the v3 implementation, with emphasis on the newly added Task 11 (reversible
route migration), Task 12 (static-export contract audit), and Task 13 (docs / brand /
content-safety). Tasks 1–10 were reviewed and validated in prior milestones.

## Method

Three independent, non-overlapping reviewers were dispatched in parallel:

1. **Spec / product / content** — traced the final checklist, claim safety, honest
   statuses, route scope, vertical coherence.
2. **UI / accessibility** — landmarks, skip-link/main semantics, keyboard/focus,
   reduced motion, responsive/overflow, alias a11y.
3. **Code / SEO / static-export** — registry/manifest invariants, materializer
   safety, audit correctness, metadata/aliases, sitemap/RSS/JSON-LD, legacy
   preservation, test gaps.

All three returned **CONVERGED (no P0/P1)**. Aggregate: P0 0, P1 0, P2 4, P3 10.

## Findings and resolution

| ID | Sev | Finding | Resolution |
| --- | --- | --- | --- |
| SPEC-1 | P2 | README "Routes"/"Localization" still described the legacy handbook-first structure and advertised removed switcher pairs | Fixed — README now documents the v3 routes, the four selected aliases, the `/ru` flattening, and the real locale allowlist |
| UI-1 | P2 | `404.html`/`_not-found` ship without `lang`, single `main`, skip link, or dark theme (framework default) | Deferred — pre-existing, off the pilot path, and a fix needs a multi-root-layout `not-found.tsx`. Tracked as a post-RC follow-up in STATUS "Known issues" |
| UI-2 | P2 | Header/mobile shell navs had no `aria-label`, leaving ambiguous navigation landmarks | Fixed — both shell navs now carry localized `aria-label`s (`lib/i18n.ts`, `components/marketing/site-shell.tsx`) |
| CODE-1 | P2 | `manifest.ts` comment implied the four selected aliases keep a Next-rendered shell, but the materializer overwrites all 34 uniformly | Fixed — corrected the comment (uniform materialization is intended per plan Task 11 Step 7) and added a production assertion locking the selected-alias final form |
| SPEC-2 | P3 | README omitted `reviewCycleDays` (with `reviewedAt`) and `sourceName` (external notes) | Fixed in README |
| SPEC-3 | P3 | STATUS summary line said Task 12/13/14 remained | Fixed — only Task 14 remains open |
| UI-3 | P3 | Materialized alias shipped an unstyled (visible) skip link | Fixed — `buildAliasHtml` now inlines visually-hidden `.skip-link` CSS (the required skip link is kept per the alias contract) |
| CODE-2 | P3 | Dead `routeToFile` (lint warning) and no-op `void fileURLToPath` in the audit | Fixed — both removed; lint is clean |
| CODE-3 | P3 | Audit `@context`/`sameAs` assumed string shape (would false-positive on arrays) | Fixed — both are now array-tolerant, with fixtures |
| CODE-4 | P3 | Narrow prepare-phase temp-file leak window in the materializer | Fixed — original bytes are read before the temp sibling is written |
| SPEC-4 | P3 | OG tagline localized (`Блог · Материалы · AI Platform`) vs the plan's literal English | Accepted as-is (better for a RU-first site; reviewer recommended accept) |
| CODE-5 | P3 | Manifest-contract validation duplicated across the TS lib and the `.mjs` scripts | Accepted — the TS lib never touches the filesystem; `assertSafeRoute` in the materializer is the FS-facing authority |
| CODE-6 | P3 | `check-v3-reference-path` containment guard is a no-op on its hardcoded inputs | Accepted — defense-in-depth added per the Task 12 cross-platform requirement |
| DEBT | P2/P3 | Pre-existing `site-routes.test.ts` `.render`-shape assertion and Task 6–7 string assertions are brittle | Explicitly accepted for the pilot RC (no browser-component harness ships); reframed in STATUS from a conditional IOU to an accepted limitation |

## Automated gate (clean build)

```
eslint: exit 0
fumadocs-mdx + next typegen + tsc: exit 0
vitest: 17 files, 314 tests passed
next build --webpack + apply-static-aliases: 34 aliases materialized
check-v3-reference-path (verify:reference): passed — 6 files, 16 transitions
check-static-export (verify:export): passed — 100 routes, 34 aliases, 15 sitemap URLs
```

Negative proof retained from Task 12: a tampered `out/` copy with a broken Home link
exits non-zero with `[broken-link] / (/missing-contract-target/)` while the repository
export stays untouched.

## Representative user journey

Verified in a browser against the materialized static export:

- `/` reads name, public role, and the three entrances immediately; the hero copy is the
  plain responsibility line (not the prior marketing pitch).
- `/ai-platform` → `/ai-platform/map`: the seven areas render as one ordered system; six
  are honest `ПЛАНИРУЕТСЯ` non-links and only Inference Plane opens a detail.
- The full `map → area → component → case → project → article` vertical connects with no
  dead ends (16 transitions verified by the reference-path audit).
- `/writing` (a selected alias) renders the honest "Страница переехала" page and redirects
  to `/blog`, which shows the native article and the external Habr note (link-only).

## Status

**Technical release candidate.** All technical and content items are satisfied and
gate-enforced. Per the plan, `pilot accepted` / `launch-ready` additionally requires the
human six-reader usability gate (at least 5 of 6 target readers complete the AI Platform
map → Prefix Cache task). That gate cannot be run without real participants and remains the
single **open launch blocker**.
