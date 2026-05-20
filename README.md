# Production AI Platform Site

Personal executive site and Production AI Platform Handbook.

Core thesis:

> Production AI is not a model. It is a platform.

The project packages the author as an AI Platform Lead and provides a practical field guide for production-grade LLM, STT, embeddings and agent platforms: inference, routing, cache, evals, guardrails, observability, cost and ownership.

## Stack

- Next.js App Router
- TypeScript
- Fumadocs MDX
- Tailwind CSS
- shadcn/ui-style local components
- pnpm
- Static export via `next build`

Node.js 22 or newer is recommended.

## Routes

- `/` - personal executive landing
- `/ru` - Russian personal executive landing
- `/about` - bio and positioning
- `/projects` - flagship projects and tools
- `/talks` - conference and webinar topics
- `/writing` - Habr, Telegram and essays
- `/contact` - public contact links
- `/handbook` - Production AI Platform Handbook landing
- `/handbook/...` - MDX handbook chapters
- `/ru/handbook` - Russian handbook landing
- `/ru/handbook/...` - Russian MDX handbook chapters
- `/tools/prefix-cache-auditor` - client-side prefix cache audit
- `/tools/llm-cost-calculator` - client-side LLM cost model
- `/tools/ai-quality-gate-checklist` - client-side quality gate checklist
- `/ru/tools/...` - Russian tool pages

## Localization

English is the default route set. Russian pages are served under `/ru`.

The language switcher maps equivalent static routes:

- `/handbook/platform-map` -> `/ru/handbook/platform-map`
- `/tools/prefix-cache-auditor` -> `/ru/tools/prefix-cache-auditor`
- `/writing` -> `/ru/writing`

Marketing and tool UI copy lives in `lib/i18n.ts`. English handbook content lives in `content/handbook`, and Russian handbook content lives in `content/handbook-ru`.

## Local Development

Install dependencies:

```bash
pnpm install
```

In non-interactive CI-like shells, pnpm may prompt before recreating `node_modules`. Use:

```bash
CI=true pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Run validation:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build` uses `next build --webpack` intentionally. Static export is enabled through `output: "export"` in `next.config.mjs`, and the exported site is written to `out/`.

## Content Workflow

Handbook chapters live in `content/handbook` and `content/handbook-ru`.

Every MDX page must include frontmatter with:

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

Chapter pages should follow the handbook pattern:

1. Problem
2. Symptoms
3. Mental model
4. Architecture
5. Metrics
6. Trade-offs
7. Anti-patterns
8. Checklist
9. Example
10. Decision template
11. Related chapters

Use public, sanitized, production-like examples only. Do not include confidential company architecture, internal numbers, vendor contracts or security-sensitive details.

## Tools

All v0 tools are client-side only:

- Prefix Cache Auditor estimates cacheability, unstable prefix segments, dynamic field warnings, tool-schema volatility and recommendations.
- LLM Cost Calculator compares cost with and without cached input tokens.
- AI Quality Gate Checklist tracks local readiness state across datasets, evals, regression, canary and observability.

There are no API routes, server actions, auth, database, analytics or live AI calls in v0.

## Deployment

Primary target:

- GitHub Pages with a custom domain

Secondary targets:

- Cloudflare Pages
- Vercel

For any static host, deploy the generated `out/` directory:

```bash
pnpm build
```

The project uses `trailingSlash: true` so clean static URLs resolve as directory `index.html` files on simple static servers.

### GitHub Pages

The repository includes `.github/workflows/pages.yml`. On every push to `main`, GitHub Actions will:

1. install dependencies with pnpm
2. run `pnpm lint`
3. run `pnpm typecheck`
4. run `pnpm test`
5. run `pnpm build`
6. deploy `out/` to GitHub Pages

In GitHub repository settings:

1. Open **Settings -> Pages**.
2. Set **Source** to **GitHub Actions**.
3. Add a repository variable `SITE_URL` with the production URL, for example `https://example.com`.
4. If using a custom domain, add a `public/CNAME` file containing only the domain name, for example `example.com`.
5. Configure DNS at the domain provider:
   - apex domain: GitHub Pages `A` records
   - subdomain: `CNAME` to `<github-user>.github.io`
6. Enable **Enforce HTTPS** after DNS is verified.

This project is optimized for a custom domain. Without a custom domain, GitHub project pages serve under `/<repo>/`, while the static export is built for root-relative asset paths.

## Public Content Sources

The site references only verified public surfaces:

- Telegram: `https://t.me/s/sergeinotevskii`
- Habr articles: `https://habr.com/ru/users/Ser_no/articles/`

The initial handbook and writing pages use public themes around prefix cache, effective cost with cache, MaaS vs self-hosted, AI quality gates and production AI platform engineering.

## Agent Notes

Durable implementation rules live in `AGENTS.md` and `.agent/*`.

Before changing the project, read:

- `AGENTS.md`
- `.agent/PROJECT_SPEC.md`
- `.agent/DESIGN_SPEC.md`
- `.agent/CONTENT_MODEL.md`
- `.agent/IMPLEMENTATION_PLAN.md`
- `.agent/STATUS.md`

After meaningful work, update `.agent/STATUS.md` with progress, validation results, decisions, known issues and blockers.
