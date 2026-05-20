# AGENTS.md

This repository contains a personal website and the Production AI Platform Handbook.

## Product intent

Build a premium technical knowledge product for engineers and technical leaders who build production AI platforms.

Core message:

> Production AI is not a model. It is a platform.

The site must feel like a serious engineering field manual, not a generic AI SaaS landing page, not a blog, and not a prompt engineering guide.

## Tech stack

- Next.js App Router
- TypeScript
- Fumadocs
- MDX
- Tailwind CSS
- shadcn/ui
- pnpm
- Static-export-compatible architecture
- Node.js >= 22

## Repository layout

- `app/` - Next.js routes
- `content/handbook/` - MDX handbook content
- `components/ui/` - shadcn/ui components
- `components/marketing/` - personal site and landing components
- `components/handbook/` - handbook-specific components
- `components/tools/` - client-side tools
- `lib/` - shared utilities and metadata
- `.agent/` - specs, plans, status, and review docs

## Non-negotiable constraints

- Do not add backend dependencies unless explicitly requested.
- Do not add auth, database, server actions, or API routes in v0.
- Do not add analytics or tracking.
- Do not invent confidential company details.
- Do not expose internal Bitrix24 architecture, numbers, costs, or vendor contracts.
- Use sanitized, generic, production-like examples.
- Keep all tools client-side in v0.
- Keep the design premium, minimal, technical, and calm.
- Avoid generic AI startup visuals, robots, glowing brains, cyberpunk neon, and playful SaaS gradients.
- Preserve static export compatibility.

## Content rules

All handbook chapters must use frontmatter:

- `title`
- `description`
- `section`
- `type`
- `level`
- `status`
- `audience`
- `tags`
- `related`
- `published`
- `updated`

All chapter pages should follow this structure:

1. Problem
2. Symptoms
3. Mental model
4. Architecture
5. Metrics
6. Trade-offs
7. Anti-patterns
8. Checklist
9. Related chapters

Use placeholders only when necessary, and mark them clearly as TODO.

## Design rules

Visual direction:

- Premium technical field manual
- Dark-mode-first
- Large editorial typography
- Restrained cyan/blue accent
- Subtle grid or blueprint-like background
- Thin borders
- Strong whitespace
- Architecture-inspired cards and diagrams
- Precise, calm, trustworthy

## Validation commands

Before considering work complete, run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

If a command fails, fix the failure before moving on.

## Working style for Codex

For complex features or significant refactors:

1. Read `.agent/PROJECT_SPEC.md`.
2. Read `.agent/DESIGN_SPEC.md`.
3. Read `.agent/CONTENT_MODEL.md`.
4. Read `.agent/IMPLEMENTATION_PLAN.md`.
5. Work milestone by milestone.
6. Keep diffs scoped.
7. Update `.agent/STATUS.md` after each milestone.
8. Run validation after each milestone.
9. Do not ask for next steps if the plan already defines them.
10. If blocked, document the blocker, attempted paths, evidence, and exact input needed.

## Done means

A task is done only when:

- Implementation matches the spec.
- Validation commands pass.
- Status file is updated.
- No known critical issue remains undocumented.

