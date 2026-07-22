# Design QA — v3 personal-page checkpoint

Date: 22 July 2026

Scope: Home, Materials, About, Contact, and the shared responsive shell

Reviewed revision: `95ed270`

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

All captures use the production static export, Russian locale, dark theme, top-of-page state, no authentication, CSS pixels equal to image pixels, and `devicePixelRatio = 1`. No density normalization was required.

| Evidence | Source pixels | Implementation pixels | CSS viewport | Density |
| --- | ---: | ---: | ---: | ---: |
| Full Home comparison | 1280 × 720 | 1280 × 720 | 1280 × 720 | 1× |
| Mobile Home | n/a | 390 × 844 | 390 × 844 | 1× |
| Tablet Home | n/a | 768 × 900 | 768 × 900 | 1× |
| Desktop Home | n/a | 1440 × 900 | 1440 × 900 | 1× |

## Full-view comparison

Combined same-input evidence: `/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/47-home-before-after-converged.png`.

The previous state makes the handbook and a pseudo-dashboard the dominant product, presents three competing calls to action, and delays the author's public surfaces. The converged state gives the author the dominant type scale, keeps the public role and scope concise, and exposes Blog, Materials, and AI Platform as one ruled index in the first viewport. The selected-content section begins at the bottom of the same desktop viewport, so the page does not use empty space to simulate a premium position.

No actionable P0, P1, or P2 visual mismatch remains against the accepted author-index direction.

## Focused-region evidence

The four-page mobile grid is the focused copy, typography, row, and responsive-layout review. It makes the relevant details readable without a separate crop: Home's three entrances, Materials' grouped artifact row, About's work-area rows, and Contact's single primary action and numbered contexts. The menu capture separately covers the interactive overlay, labels, spacing, and backdrop.

No additional desktop crop was needed because the 1280 × 720 comparison keeps the hero typography, shell, all three entrance rows, dividers, icons, and the next-section heading readable at native density.

## Required fidelity surfaces

- Fonts and typography: the established Inter/SF Mono system is preserved. Home H1 measures 44/48 at 390 px, 56/60 at 768 px, and 72/78 at desktop. Mono remains limited to roles, indices, and metadata. The Russian editorial pass reduced mixed-language density and removed artificial product wording.
- Spacing and layout rhythm: the desktop hero uses the accepted 7/5 split; the author and all three entrances remain visible above the fold. Internal long-form columns remain 720 px or narrower. No horizontal overflow was present at 390, 768, 1280, or 1440 px.
- Colors and tokens: the existing graphite, muted foreground, thin-border, subtle-grid, and restrained cyan system is unchanged. No gradient, glow, glass surface, or second palette was introduced.
- Image quality and asset fidelity: these four pages intentionally require no photography or illustration. No placeholder image, CSS drawing, handcrafted SVG, or fake product asset was introduced.
- Copy and content: the public role is consistently `AI Platform Lead в Битрикс24`; page and metadata copy passed the independent Russian editorial and public-boundary review. No confidential scale, internal topology, price, testimonial, availability, or unsupported result is present.
- Icons: only the existing Lucide menu, close, internal-arrow, and external-arrow icons are used. Stroke, sizing, and alignment remain consistent across the shell and ruled rows.
- Responsiveness: at 390 px the H1 stays on one line and all three Home entrances end by y=801 in an 844 px viewport. At 768 px all entrances end by y=713 in a 900 px viewport. At 1440 px the split composition and next-section heading are both visible.

## Accessibility, interactions, and console

- Every checked route has one skip link and one `main#main-content`; the production landmark audit passes all five representative surfaces.
- Materials, About, and Contact expose the exact active navigation item. Home intentionally has no current primary-nav item.
- The mobile menu opens as one dialog, locks body scrolling, exposes the six expected links, has a localized title, a real `aria-describedby` target, and a localized close name.
- Keyboard behavior was verified in the open menu: initial focus is on Close, Tab moves to Blog, Escape closes the dialog, unlocks the body, and returns focus to the menu trigger.
- The primary Contact route contains one Telegram action, four contexts, and no form.
- A fresh production-static browser tab reported no console warnings or errors after the final mobile-menu interaction (`[]`).
- The root-level browser driver did not reliably inject the very first Tab from browser chrome, so activation of the skip link remains part of the final Task 14 keyboard sweep; its DOM order, target, focus styles, and landmark destination are covered by source and export checks.

## Comparison history

1. Initial author-index comparison (`83f2b10`) found no structural visual blocker, but runtime QA found a P2 accessibility defect: Radix warned that the mobile dialog lacked a description. Independent review also found an untranslated close name and overly dense Russian product wording.
2. `1675db5` added the localized hidden dialog description and close name, improved external-link guidance, simplified the page and metadata copy, and retained the visual composition. Post-fix mobile evidence is the menu capture above; a fresh browser log is empty.
3. The final editorial convergence pass found one P2 content-consistency issue: decorative Home source copy did not use the exact public role formulation. `95ed270` aligned the role without changing the uppercase visual treatment. The 1280 comparison, 1440 Home, and 390 Home captures above are the post-fix evidence. Independent spec and editorial rereviews both passed.

## Findings

No open P0, P1, or P2 finding.

Non-blocking P3 engineering note: `tests/seo/site-routes.test.ts` currently inspects React `forwardRef`'s internal `.render` shape to prove `closeLabel` is not leaked. Replace that assertion with a hydrated DOM test when the repository adds a browser-component test harness.

## Implementation checklist

- [x] Author and three primary entrances dominate the first viewport.
- [x] Home, Materials, About, and Contact use the accepted ruled editorial system.
- [x] Mobile, tablet, and desktop widths have no horizontal overflow.
- [x] Mobile navigation labels, focus movement, Escape behavior, and scroll lock work.
- [x] Public copy and metadata passed independent editorial review.
- [x] Browser console is clean after the previously failing interaction.

final result: passed
