# Project Spec: Production AI Platform Site

## Objective

Build the first working version of a combined personal website and Production AI Platform Handbook.

The site should position the author as an AI Platform Lead and provide a structured technical handbook for building production-grade AI platforms.

## Core message

Production AI is not a model. It is a platform.

## Product surfaces

### 1. Personal site

Routes:

- `/`
- `/about`
- `/projects`
- `/talks`
- `/writing`
- `/contact`

Purpose:

- Present the author as an AI Platform Lead.
- Link to the handbook as the flagship project.
- Show expertise areas, writing, talks, and projects.
- Provide clear contact and social CTAs.

Core positioning:

> AI Platform Lead building production-grade LLM, STT, embeddings and agent platforms.

The personal site should emphasize production AI platforms, not generic AI/ML, prompt engineering, or generic developer branding.

### 2. Handbook

Routes:

- `/handbook`
- `/handbook/start-here`
- `/handbook/manifesto`
- `/handbook/platform-map`
- `/handbook/maturity-model`
- `/handbook/strategy/maas-vs-self-hosted`
- `/handbook/gateway/ai-gateway`
- `/handbook/inference/inference-runtime`
- `/handbook/economics/inference-economics`
- `/handbook/caching/prefix-cache`
- `/handbook/evals/ai-quality-gate`
- `/handbook/observability/llm-observability-checklist`
- `/handbook/operating-model/ownership`

Purpose:

- Explain the production AI platform landscape.
- Provide structured, practical chapters.
- Use MDX and reusable components.
- Support future graph, tracks, bookmarks, and tools.

### 3. Tools

Routes:

- `/tools/prefix-cache-auditor`
- `/tools/llm-cost-calculator`
- `/tools/ai-quality-gate-checklist`

Purpose:

- Provide practical client-side tools.
- Keep tools self-contained in the browser.
- Avoid backend dependencies in v0.

## Target audience

- AI Platform Leads
- Staff / Principal Engineers
- ML Platform / MLOps Engineers
- Backend Engineers moving into AI infrastructure
- Engineering Managers
- CTO-level technical leaders
- Product Engineers integrating AI into real products

## Goals

- Create a premium first impression.
- Make the platform thesis obvious.
- Establish a reusable design system.
- Set up scalable content architecture.
- Make the project easy to extend through new MDX chapters.
- Make the project suitable for future public release.

## Non-goals for v0

- No user accounts.
- No backend.
- No database.
- No paid product.
- No newsletter integration.
- No comments.
- No live AI calls.
- No analytics.
- No full graph/tracks system yet.
- No disclosure of internal company-specific architecture.

## Required commands

The project must support:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Static deployment compatibility

The implementation must remain compatible with static export so the site can be hosted on GitHub Pages, Cloudflare Pages, Vercel static output, or another static host.

Do not introduce features that require a long-running server in v0:

- Server actions
- API routes
- Database access
- Auth/session state
- Backend-dependent tools
- Runtime-only server data fetching

## Completion criteria

The MVP is complete when:

- All required routes render.
- The design follows `.agent/DESIGN_SPEC.md`.
- Handbook pages render from MDX.
- Initial chapters exist with valid frontmatter.
- Tools pages exist and are client-side only.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.
- README and STATUS are updated.

