# Implementation Plan

> **Superseded (historical context):** The product direction in this file is superseded by the accepted v3 spec (`docs/superpowers/specs/2026-07-22-notevskii-tech-v3-design.md`) and implementation plan (`docs/superpowers/plans/2026-07-22-notevskii-tech-v3-implementation.md`). It is kept for historical context; the current milestones are Tasks 1–14 in the v3 implementation plan.

## Milestone 0: Bootstrap

### Tasks

- Create Next.js App Router project with TypeScript.
- Configure pnpm.
- Configure Tailwind CSS.
- Configure shadcn/ui.
- Configure Fumadocs.
- Add base layout and global styles.
- Add README.
- Add AGENTS.md and `.agent` files.

### Acceptance criteria

- `pnpm install` works.
- `pnpm dev` starts.
- `pnpm lint` works.
- `pnpm typecheck` works.
- `pnpm build` works.

## Milestone 1: Design system foundation

### Tasks

- Add shadcn/ui base components:
  - `button`
  - `card`
  - `badge`
  - `tabs`
  - `accordion`
  - `dialog`
  - `sheet`
  - `tooltip`
  - `separator`
  - `table`
  - `input`
  - `textarea`
  - `command`
  - `progress`
- Create marketing components.
- Create handbook components.
- Implement dark-mode-first design tokens.
- Implement typography, spacing, borders, and accent color.
- Add reusable card, callout, checklist, and decision matrix components.

### Acceptance criteria

- Components compile.
- Components are used on at least one route.
- Visual direction matches `.agent/DESIGN_SPEC.md`.
- shadcn/ui is configured with `components.json`.

## Milestone 2: Personal site

### Tasks

- Implement `/`.
- Implement `/about`.
- Implement `/projects`.
- Implement `/talks`.
- Implement `/writing`.
- Implement `/contact`.

### Acceptance criteria

- All routes render.
- Home page has strong executive/author landing.
- Handbook is presented as flagship project.
- No placeholder text looks broken.

## Milestone 3: Handbook routing and MDX

### Tasks

- Configure Fumadocs source.
- Configure `/handbook/[[...slug]]` route.
- Add handbook layout with sidebar and table of contents.
- Add initial MDX pages.
- Validate frontmatter.

### Acceptance criteria

- `/handbook` renders.
- All initial chapters render.
- Sidebar navigation works.
- MDX components render.
- Frontmatter uses the schema from `.agent/CONTENT_MODEL.md`.

## Milestone 4: Handbook landing and platform map

### Tasks

- Implement handbook landing.
- Implement PlatformMap component.
- Implement MaturityModel component.
- Add platform layer cards.

### Acceptance criteria

- Handbook landing clearly communicates: "Production AI is not a model. It is a platform."
- Platform layers are visually clear.
- Page does not look like a generic docs template.

## Milestone 5: Tools v0

### Tasks

- Implement Prefix Cache Auditor v0.
- Implement LLM Cost Calculator v0.
- Implement AI Quality Gate Checklist v0.
- Keep all tools client-side.

### Acceptance criteria

- Tools render.
- Inputs work.
- Outputs update client-side.
- No external calls.
- No backend.

## Milestone 6: SEO, metadata, docs, and deployment readiness

### Tasks

- Add metadata.
- Add Open Graph basics.
- Add sitemap if compatible with static export.
- Add README instructions.
- Add deployment notes.
- Add static export compatibility if feasible.
- Update `.agent/STATUS.md`.

### Acceptance criteria

- `pnpm lint` passes.
- `pnpm typecheck` passes.
- `pnpm build` passes.
- README explains local dev and deployment.
- `.agent/STATUS.md` includes validation results and known follow-ups.

## Validation loop

After each milestone:

1. Run the relevant validation commands.
2. Fix failures before continuing.
3. Update `.agent/STATUS.md` with progress, decisions, validation results, and known follow-ups.
4. Review the diff against `.agent/CODE_REVIEW.md`.

## Stop-and-fix rule

If validation fails after any milestone, fix the failure before moving to the next milestone.

## Scope control

Do not add any of the following unless explicitly requested in a later milestone:

- Backend
- Auth
- Database
- Analytics
- Newsletter
- Comments
- Payments
- Server actions
- API routes
- Live AI calls
- Graph/tracks/bookmarks

