# notevskii.tech v3 — visual target

Status: superseded by `2026-07-27-notevskii-tech-v3-1-correction-design.md`
Date: 22 July 2026
Applies first to: Home, Materials, About, Contact

## Direction: Author index

The personal surface is an author-led technical publication with editorial hierarchy and the information discipline of a reference product. It is not an AI-product landing page, a documentation shell, or a visual clone of System Design Space.

The first viewport must answer two questions without scrolling:

1. Who is Sergei and what does he work on?
2. Should I enter through Blog, Materials, or AI Platform?

## Grounding

The direction keeps the current graphite/cyan family, large author name, restrained borders, Inter/SF Mono pairing, and the v3 global shell.

System Design Space contributes only its clear subject navigation model — area, material, relation. Its light palette, pill-heavy panels, catalogue metrics, rounded containers, and graph-first framing are not copied.

The old homepage is the negative baseline: it overemphasizes the handbook, uses a pseudo-dashboard in the hero, and gives several calls to action equal weight.

Visual sources used:

- `site-strategy-audit/01-home.png` — previous homepage baseline;
- `site-strategy-audit/09-v3-shell-about.png` — accepted v3 shell and tokens;
- `site-strategy-audit/11-v3-shell-about-mobile.png` — accepted mobile shell;
- `site-strategy-audit/07-system-design-space-reference.png` — reference-product information architecture;
- `site-strategy-audit/08-system-design-space-graph-reference.png` — map/sidebar organization reference.

## Layout and typography

- Global shell remains `max-w-7xl`; page content uses roughly 1152–1216 px.
- Long-form copy stays within 704–720 px, approximately 60–68 characters per line.
- Desktop home hero uses a 7/5 split with a 64–72 px gap.
- Internal pages start with a narrow editorial intro, then widen only for lists.
- Home H1: 44/48 at 390 px, 56/60 at 768 px, 72–76/78 at 1440 px.
- Internal H1: 40/44, 48/52, then 56/60.
- Lead: 18–20 px with 29–32 px line height; body: 16/27.
- SF Mono is limited to overlines, indices, dates, and source metadata.
- Section rhythm: 64 px mobile, 80 px tablet, 112 px desktop.

## Home composition

Hero order:

1. `AI PLATFORM LEAD` overline;
2. `Сергей Нотевский`;
3. one concise production AI-platform scope statement;
4. a single ruled index containing Blog, Materials, and AI Platform.

The three entrances are rows, not cards or competing CTA buttons. On desktop they form the right hero column. On tablet they may become three equal ruled columns below the intro. On mobile they return to one vertical list.

Below the hero:

1. one selected artifact from each surface;
2. compact professional context expressed as text and ruled rows;
3. one calm contact band.

## Internal page composition

Materials contains one selected talk, one OSS project, and one external article in three consecutive groups. Talks and Projects link to their full indexes. No fake media thumbnails are introduced.

About contains the current public role and focus, three areas of work as ruled rows, one editorial-principles block, and a compact row of public channels. It is not a competency-card grid.

Contact uses a 704–720 px column. Telegram DM is the only primary action. Architecture, strategy session, speaking, and public collaboration appear as four numbered context rows. There is no form, availability badge, or backend.

## Default list primitive

`ContentListItem` is the default presentation for artifacts and entrances:

- one continuous ruled surface, not a set of detached cards;
- desktop metadata rail around 160–200 px, main copy, then a 40–48 px action rail;
- 28–32 px vertical padding desktop, 22–24 px mobile;
- internal links use `ArrowRight`; external links use `ArrowUpRight`;
- hover may add only a subtle surface tint and at most 4 px arrow movement;
- the entire linked row remains focusable with the shared visible focus treatment.

## Responsive and accessibility constraints

- 390 px: one column, natural name wrap, minimum 44 px interactive targets, no horizontal overflow.
- 768 px: vertical hero; compact metadata rail or three-column entrance deck where it remains readable.
- 1440 px: split hero; author, scope, and all three entrances visible in the first viewport.
- Preserve one main landmark, skip link, current-page navigation, keyboard order, and reduced-motion behavior.
- Content and navigation must remain readable without client-side JavaScript.

## Exclusions

- no hero platform diagram or pseudo-dashboard;
- no handbook-first CTA;
- no card wall, nested cards, fake metrics, testimonials, logos, availability, or photo placeholder;
- no pill cloud, decorative badges, redundant icons, glass, glow, or AI visual cliché;
- no large cyan fill, second palette, or third font;
- no oversized empty hero used to simulate premium positioning.

The visual acceptance test is simple: the first viewport belongs to the author and offers three obvious routes; the rest reads like a calm engineering publication rather than a collection of product cards.
