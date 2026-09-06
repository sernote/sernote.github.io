# Readable Home — verification

Base: deployed `origin/main` at `0aea3799e03bcbe6d032510a21177fbd8cc559aa`. Working branch: `codex/home-reading-layout` in `/private/tmp/notevskii-site-editorial-fix`. The user approved the Visualize composition; the governing design and plan are in `docs/superpowers/` with the `2026-09-06-home-reading-layout` prefix.

## Baseline

The current exported Home was inspected in the browser at 1,440 px. Its author heading was 60 px and lead heading 56 px. The lead was followed by a numbered continuation strip, then three selected-reading columns, then three numbered section entrances. Baseline screenshot: `/private/tmp/notevskii-home-before-desktop.png`.

Public text and anchor destinations for all 115 exported HTML files were recorded in `/private/tmp/notevskii-home-before.json`, excluding script/style contents. The same comparison after the new build will distinguish the intended Home changes from accidental changes to other routes. This checks public text/link preservation, not CSS appearance.

The original checkout is on `codex/cache-editorial-exemplar` and retains its existing two modified files (`hybrid-reasoners-in-production.mdx` and `source.test.ts`) and untracked `.claude/` and `pnpm-workspace.yaml`.

## Implementation and verification

Home now uses the approved 1,024 px frame, compact author introduction and single article column beside the handbook, project and materials entrances. Existing shell, navigation, other page templates and canonical content are unchanged. Home-only display titles and teasers are separate from canonical metadata. Optional chapter/project records must remain public, published, featured and not stale; fallback articles retain their own copy and are omitted from the remaining reading choices.

Both independent reviews passed: `home_reading_spec_review` checked the actual code against the accepted composition and content contract; `home_reading_quality_review` checked the diff, shared helpers, publication lifecycle and tests. Neither reported a required fix. The implementation agent's focused run passed 36 tests and scoped ESLint; root's `git diff --check` passed.

Full `pnpm verify` completed with exit 0: lint, typecheck, 419 tests, 117 generated pages, all 46 production export checks, reference audit (6 files / 16 transitions) and static export audit (112 routes / 35 aliases / 54 archives / 23 sitemap URLs). Eight production-only tests were skipped in the ordinary test pass and covered by the separate export integration pass. Log: `/private/tmp/notevskii-home-reading-verify.log`.

The exported text/link comparison changed only `index.html`; the other 114 HTML files retain identical public text and link destinations. No route was added or removed. This is additional preservation evidence, not a visual check of every page.

## Browser review

The actual export was served at `http://localhost:4176/` and inspected in the browser at 1,440, 768 and 390 px. Document width matched viewport width in all three checks. Desktop columns measured approximately 573 / 333 px; tablet columns 385 / 265 px. Main descriptions remained 18 px. Lead headings were 30 px on desktop/tablet and 27 px on mobile; the author heading was 35 / 30 px. At 390 px, the article section ended at approximately 1,211 px and the full-width sidebar began at 1,242 px. Headlines, chapter labels and descriptions remain readable without clipping.

Screenshots: `/private/tmp/notevskii-home-after-desktop.png`, `/private/tmp/notevskii-home-after-tablet.png`, `/private/tmp/notevskii-home-after-mobile.png`, `/private/tmp/notevskii-home-aside-mobile.png`. Geometry and navigation receipt: `/private/tmp/notevskii-home-browser-qa.json`.

Keyboard Enter opened the mobile menu, Escape closed it and returned focus to its trigger. Tab reached the chapter link with a visible 2 px focus outline; Enter opened Inference Plane. The lead article and platform map opened their canonical routes. The project action opened `#your-project` with its anchor approximately 112 px below the viewport top. The external article retains its exact Habr destination, `target="_blank"`, `rel="noreferrer"` and accessible new-tab disclosure; the in-app browser did not expose a new tab after activation, so the target attributes are the evidence for the new-tab contract.

Implementation and local verification are complete. Delivery is tracked by the pull request for `codex/home-reading-layout` and the Pages workflow on `main`; a successful live deployment must be verified separately.
