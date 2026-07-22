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
- `/about` - bio and positioning
- `/projects` - flagship projects and tools
- `/talks` - conference and webinar topics
- `/writing` - Habr, Telegram and essays
- `/contact` - public contact links
- `/handbook` - Production AI Platform Handbook landing
- `/handbook/...` - MDX handbook chapters
- `/en` - English personal executive landing
- `/en/handbook` - English handbook landing
- `/en/handbook/...` - English MDX handbook chapters
- `/tools/prefix-cache-auditor` - client-side prefix cache audit
- `/tools/llm-cost-calculator` - client-side LLM cost model
- `/tools/ai-quality-gate-checklist` - client-side rollout quality checklist
- `/en/tools/...` - English tool pages
- `/ru/...` - legacy Russian routes kept for compatibility

## Localization

Russian is the default route set and is served from the root. English pages are served under `/en`.

The language switcher maps equivalent static routes:

- `/handbook/platform-map` -> `/en/handbook/platform-map`
- `/tools/prefix-cache-auditor` -> `/en/tools/prefix-cache-auditor`
- `/writing` -> `/en/writing`

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

## v3 Content Model and Authoring

The v3 personal surfaces (Blog, Materials, Talks, Projects, AI Platform) are driven by the typed content registry in `content/v3` (schema in `lib/content-v3/schema.ts`). This is the authoritative content path; the legacy handbook workflow above remains only for the kept `/handbook` chapters.

### Add one v3 record

1. Create one `.mdx` file under the matching directory: `content/v3/blog`, `content/v3/talks`, `content/v3/projects`, or `content/v3/ai-platform/{areas,components,cases}`.
2. Fill the frontmatter required by the record `type`. Shared fields: `entityId` (kebab-case), `locale` (`ru`/`en`), `title`, `description`, `publicationStatus`, `reviewStatus`, `publishedAt`, `updatedAt`, `reviewedAt`, `reviewCycleDays`, `topics` (max 8), and `relations`.
3. Run `pnpm verify` and fix any registry, route, or export-contract failure before committing.

### Permitted statuses

- `publicationStatus`: `draft`, `published`, `archived`. A non-draft record must set `publishedAt`.
- `reviewStatus`: `unreviewed`, `reviewed`, `stale`. Any non-`unreviewed` status must set `reviewedAt`. Reference records (`platform-area`, `platform-component`, `case`) are only publicly discoverable while `reviewed` or `stale`.

### Relation syntax

`relations` is an object of id arrays — `articleIds`, `talkIds`, `projectIds`, `platformEntityIds` — referencing other records by `entityId`. A record may reference **at most four** related entities in total. Use `{}` for none.

```yaml
relations:
  projectIds:
    - audit-prompt-caching
  platformEntityIds:
    - prefix-cache
```

### External notes have no local route

An article with `kind: external-note` must set `sourceUrl` (HTTPS) and must not set a `slug`. External notes are surfaced in the Blog/Materials indexes as links straight to their source and never receive a local detail page — the canonical location of that content is the external site, so minting a local URL would duplicate it and split its authority.

### Validation and the review gate

Run the full gate before shipping any content or code change:

```bash
pnpm verify
```

`pnpm verify` runs lint, typecheck, tests, the aliased static build, the reference-path audit, and the static-export contract audit. Expanding the reviewed reference vertical (new area, component, or case) additionally requires passing the pilot content-review gate recorded under `docs/superpowers/reviews/`; do not publish a reference record as `reviewed` without that artifact.

### Operating ceiling

This is a maintained pilot, not a content factory. Hold to:

- at most one substantial new or revised artifact per month;
- a quarterly review of the AI Platform map and every `reviewed` reference record (refresh or mark `stale`);
- small metadata and link fixes as needed;
- no more than one support hour per week.

Translation is selective and intentional: a Russian record does not imply an English one, and no locale parity is assumed or advertised.

## Tools

All v0 tools are client-side only:

- Prefix Cache Auditor estimates cacheability, unstable prefix segments, dynamic field warnings, tool-schema volatility and recommendations.
- LLM Cost Calculator compares cost with and without cached input tokens.
- AI Quality Gate Checklist tracks local readiness state across datasets, evals, regression, canary and observability.

There are no API routes, server actions, auth, database, analytics or live AI calls in v0.

## Deployment

Primary target:

- GitHub Pages

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

The current custom domain is `notevskii.tech`, configured through `public/CNAME`. The repository is still published as the user Pages repository `sernote.github.io`, which lets GitHub Pages serve the custom domain from the root of the static export.

Project Pages URLs like `https://<github-user>.github.io/<repo>/` require a separate `basePath`/asset-prefix setup and are not enabled in v0.

In GitHub repository settings:

1. Open **Settings -> Pages**.
2. Set **Source** to **GitHub Actions**.
3. Add repository variable `SITE_URL=https://notevskii.tech` if Open Graph metadata needs to be forced outside the workflow default.
4. Keep `public/CNAME` containing only `notevskii.tech`.
5. Configure DNS at the domain provider:
   - apex domain: GitHub Pages `A` records
   - `www`: `CNAME` to `sernote.github.io`
6. Enable **Enforce HTTPS** after DNS is verified.

## Public Content Sources

The site references only verified public surfaces:

- Telegram: `https://t.me/s/sergeinotevskii`
- Habr articles: `https://habr.com/ru/users/Ser_no/articles/`

The initial handbook and writing pages use public themes around prefix cache, effective cost with cache, MaaS vs self-hosted, AI quality review and production AI platform engineering.

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
