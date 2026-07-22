# Design QA — v3 personal publishing checkpoint

Date: 22 July 2026

Scope: Home, Materials, About, Contact, Blog, Talks, Projects, their pilot detail pages, and the shared responsive shell

Reviewed revision: `c7ad951`

## Source visual truth

- Accepted direction: `docs/superpowers/specs/2026-07-22-notevskii-tech-v3-visual-target.md`.
- Previous-home negative baseline: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/01-home.png`.
- Supporting shell and information-architecture references are listed in the accepted visual-target document. The implementation is an intentional redesign, not a pixel clone of the previous homepage or System Design Space.

## Rendered evidence

- Final Home, 1280 × 720: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/44-v3-home-1280-converged.png`.
- Final Home, 1440 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/43-v3-home-1440-converged.png`.
- Final Home, 768 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/38-v3-home-768-final.png`.
- Final Home, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/45-v3-home-390-converged.png`.
- Final mobile menu: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/46-v3-home-menu-390-converged.png`.
- Final four-page mobile grid: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/48-v3-mobile-pages-grid.png`.
- Final Blog index, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/49-v3-blog-index-390.png`.
- Final native Blog article, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/50-v3-blog-article-390.png`.
- Final Blog index and article, 768 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/51-v3-blog-index-768.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/52-v3-blog-article-768.png`.
- Final Blog index and article, 1440 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/55-v3-blog-index-1440-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/56-v3-blog-article-1440-final.png`.
- Final native-article ending, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/58-v3-blog-article-bottom-390-final.png`.
- Final Talks and Projects indexes, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/73-v3-talks-index-390-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/75-v3-projects-index-390-final.png`.
- Final Talk and Project details, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/74-v3-talk-detail-390-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/76-v3-project-detail-390-final.png`.
- Final Talk and Project continuation endings, 390 × 844: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/86-v3-talk-detail-ending-390-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/93-v3-project-detail-ending-390-final.png`.
- Final Talks and Projects indexes, 1440 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/83-v3-talks-index-1440-stable-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/79-v3-projects-index-1440-final.png`.
- Final Talk and Project details, 1440 × 900: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/78-v3-talk-detail-1440-final.png` and `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/80-v3-project-detail-1440-final.png`.

All captures use the production static export, Russian locale, dark theme, top-of-page state, no authentication, CSS pixels equal to image pixels, and `devicePixelRatio = 1`. No density normalization was required.

| Evidence | Source pixels | Implementation pixels | CSS viewport | Density |
| --- | ---: | ---: | ---: | ---: |
| Full Home comparison | 1280 × 720 | 1280 × 720 | 1280 × 720 | 1× |
| Mobile Home | n/a | 390 × 844 | 390 × 844 | 1× |
| Tablet Home | n/a | 768 × 900 | 768 × 900 | 1× |
| Desktop Home | n/a | 1440 × 900 | 1440 × 900 | 1× |
| Mobile Blog | n/a | 390 × 844 | 390 × 844 | 1× |
| Tablet Blog | n/a | 768 × 900 | 768 × 900 | 1× |
| Desktop Blog | n/a | 1440 × 900 | 1440 × 900 | 1× |
| Mobile Talks and Projects | n/a | 390 × 844 | 390 × 844 | 1× |
| Tablet Talks and Projects | n/a | 768 × 900 | 768 × 900 | 1× |
| Desktop Talks and Projects | n/a | 1440 × 900 | 1440 × 900 | 1× |

## Full-view comparison

Combined same-input evidence: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/47-home-before-after-converged.png`.

The previous state makes the handbook and a pseudo-dashboard the dominant product, presents three competing calls to action, and delays the author's public surfaces. The converged state gives the author the dominant type scale, keeps the public role and scope concise, and exposes Blog, Materials, and AI Platform as one ruled index in the first viewport. The selected-content section begins at the bottom of the same desktop viewport, so the page does not use empty space to simulate a premium position.

No actionable P0, P1, or P2 visual mismatch remains against the accepted author-index direction.

The Blog checkpoint uses the converged Home as the visual-system reference. The same-input Home → Blog index → native article comparison is `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/57-v3-home-blog-system-comparison.png`. It confirms that Blog keeps the same shell, grid, type scale, dividers, muted/cyan hierarchy, and ruled-row language while moving long-form reading into a calm 720 px column. Blog is not a visual copy of System Design Space; only the accepted information-architecture lesson is carried forward.

The Task 7 comparison places Blog, Talks, and Projects indexes above their three detail types at the same viewport. Mobile evidence is `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/81-v3-blog-talks-projects-comparison-390-final.png`; stable desktop evidence is `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/84-v3-blog-talks-projects-comparison-1440-stable-final.png`. The indexes remain one publication system rather than three product microsites, while article, talk, and project evidence use the same 720 px detail grammar without erasing their different facts and actions. No actionable layout, type, spacing, border, or responsive mismatch remains in the combined inputs.

## Focused-region evidence

The four-page mobile grid is the focused copy, typography, row, and responsive-layout review. It makes the relevant details readable without a separate crop: Home's three entrances, Materials' grouped artifact row, About's work-area rows, and Contact's single primary action and numbered contexts. The menu capture separately covers the interactive overlay, labels, spacing, and backdrop. The Talk and Project ending captures separately prove that their AI Platform continuation and quiet Contact action remain readable without competing with the primary recording or GitHub action.

No additional desktop crop was needed because the 1280 × 720 comparison keeps the hero typography, shell, all three entrance rows, dividers, icons, and the next-section heading readable at native density.

## Required fidelity surfaces

- Fonts and typography: the established Inter/SF Mono system is preserved. Home H1 measures 44/48 at 390 px, 56/60 at 768 px, and 72/78 at desktop. Mono remains limited to roles, indices, and metadata. The Russian editorial pass reduced mixed-language density and removed artificial product wording.
- Spacing and layout rhythm: the desktop hero uses the accepted 7/5 split; the author and all three entrances remain visible above the fold. Internal long-form columns remain 720 px or narrower. No horizontal overflow was present at 390, 768, 1280, or 1440 px.
- Colors and tokens: the existing graphite, muted foreground, thin-border, subtle-grid, and restrained cyan system is unchanged. No gradient, glow, glass surface, or second palette was introduced.
- Image quality and asset fidelity: the personal and Blog pages intentionally require no photography or illustration. The Talk uses the verified 1280 × 720 recording frame at its natural 16:9 ratio with `object-fit: contain`; the preview is linked to the same public recording as the primary CTA. No placeholder image, CSS drawing, handcrafted SVG, or fake product asset was introduced.
- Copy and content: the public role is consistently `AI Platform Lead в Битрикс24`; page and metadata copy passed the independent Russian editorial and public-boundary review. Task 7 keeps the official `ROИИ` spelling, separates event and upload dates, labels `v0.1.3` as a verified release, and states the project's runtime and data boundaries without a cache-hit or savings promise. No confidential scale, internal topology, price, testimonial, availability, or unsupported result is present.
- Icons: only the existing Lucide menu, close, internal-arrow, and external-arrow icons are used. Stroke, sizing, and alignment remain consistent across the shell and ruled rows.
- Responsiveness: at 390 px the H1 stays on one line and all three Home entrances end by y=801 in an 844 px viewport. At 768 px all entrances end by y=713 in a 900 px viewport. At 1440 px the split composition and next-section heading are both visible.
- Blog reading surfaces: the index has exactly two continuous ruled rows, including one direct Habr row. The native article uses a 720 px outer column and 688 px prose column at 768 and 1440 px. The index and article remain exactly viewport-wide without horizontal overflow at 390, 768, and 1440 px; the article CTA and Contact path remain visible and usable at its mobile ending.
- Talks and Projects surfaces: both indexes contain one continuous ruled row. At 768 and 1440 px each row is 736 and 1248 px wide respectively; both details retain a 720 px article and 688 px prose column. At 390 px the Talk thumbnail measures 356 × 200.25 px, Project code blocks scroll internally, and the immutable release SHA ends within the viewport. All four routes remain exactly viewport-wide at every checked width.

## Accessibility, interactions, and console

- Every checked route has one skip link and one `main#main-content`; the production landmark audit passes all five representative surfaces.
- Materials, About, and Contact expose the exact active navigation item. Home intentionally has no current primary-nav item.
- The mobile menu opens as one dialog, locks body scrolling, exposes the six expected links, has a localized title, a real `aria-describedby` target, and a localized close name.
- Keyboard behavior was verified in the open menu: initial focus is on Close, Tab moves to Blog, Escape closes the dialog, unlocks the body, and returns focus to the menu trigger.
- The primary Contact route contains one Telegram action, four contexts, and no form.
- A fresh production-static browser tab reported no console warnings or errors after the final mobile-menu interaction (`[]`).
- Blog runtime QA confirmed one main and one H1 on both routes, active Blog navigation, no false language switch, a direct Habr target, safe external-link attributes, visible Lucide external cues with assistive text, a localized mobile dialog, body-scroll lock, and an empty console (`[]`).
- Task 7 runtime QA confirmed one main and one H1 on all four routes, active Materials navigation in the desktop and mobile surfaces, no false language switch, canonical-only metadata with unique titles, five keyboard-visible timestamp links, 44 px primary and continuation actions, safe external targets, mobile-dialog scroll lock and Escape focus return, and an empty final console (`[]`). The responsive checks ran against the production export at 390 × 844, 768 × 900, and 1440 × 900.
- The root-level browser driver did not reliably inject the very first Tab from browser chrome, so activation of the skip link remains part of the final Task 14 keyboard sweep; its DOM order, target, focus styles, and landmark destination are covered by source and export checks.

## Comparison history

1. Initial author-index comparison (`83f2b10`) found no structural visual blocker, but runtime QA found a P2 accessibility defect: Radix warned that the mobile dialog lacked a description. Independent review also found an untranslated close name and overly dense Russian product wording.
2. `1675db5` added the localized hidden dialog description and close name, improved external-link guidance, simplified the page and metadata copy, and retained the visual composition. Post-fix mobile evidence is the menu capture above; a fresh browser log is empty.
3. The final editorial convergence pass found one P2 content-consistency issue: decorative Home source copy did not use the exact public role formulation. `95ed270` aligned the role without changing the uppercase visual treatment. The 1280 comparison, 1440 Home, and 390 Home captures above are the post-fix evidence. Independent spec and editorial rereviews both passed.
4. Blog spec review found one P1 visual-contract issue: an external MDX link used the text glyph `↗`. `62afd51` replaced it with the shared Lucide `ArrowUpRight` and a regression test. Quality review then found duplicated author branding in the final Blog title; `e1120f2` switched v3 marketing titles to Next.js absolute titles without changing article metadata. Final spec, editorial, and quality rereviews returned `SPEC COMPLIANT`, `PASS`, and `READY`.
5. Task 7 spec review found one Important evidence issue: the implementation had converted the organizer's official mixed-script `ROИИ` name to Cyrillic `РОИИ`. Quality review also identified a Minor invalid-props state in the reusable date contract. `c7ad951` restored the official spelling across content and tests and made article publication dates a compile-time both-or-neither pair while preserving the runtime guard. Final spec, editorial, and quality rereviews returned `SPEC COMPLIANT`, `PASS`, and `READY`.

## Findings

No open P0, P1, or P2 finding.

Non-blocking P3 engineering notes: `tests/seo/site-routes.test.ts` currently inspects React `forwardRef`'s internal `.render` shape to prove `closeLabel` is not leaked, and the Task 6–7 route contracts still include source-text assertions. Replace both patterns with hydrated/runtime coverage when the Task 14 browser-component harness is available.

## Implementation checklist

- [x] Author and three primary entrances dominate the first viewport.
- [x] Home, Materials, About, and Contact use the accepted ruled editorial system.
- [x] Mobile, tablet, and desktop widths have no horizontal overflow.
- [x] Mobile navigation labels, focus movement, Escape behavior, and scroll lock work.
- [x] Public copy and metadata passed independent editorial review.
- [x] Browser console is clean after the previously failing interaction.
- [x] Blog index and native article passed responsive, semantic, external-link, metadata, review, and static-export QA.
- [x] Talks and Projects indexes plus both detail exemplars passed evidence, responsive, semantic, keyboard-target, metadata, review, and static-export QA.

final result: passed
