# Status

## Current milestone

MVP implemented, bilingual EN/RU version validated, and GitHub Pages launch preparation complete locally.

## Completed

- Created durable project instructions:
  - `AGENTS.md`
  - `.agent/PROJECT_SPEC.md`
  - `.agent/DESIGN_SPEC.md`
  - `.agent/CONTENT_MODEL.md`
  - `.agent/IMPLEMENTATION_PLAN.md`
  - `.agent/STATUS.md`
  - `.agent/CODE_REVIEW.md`
- Bootstrapped a Next.js App Router + TypeScript project.
- Configured pnpm, Tailwind CSS, Fumadocs MDX, static export and shadcn/ui-style local components.
- Implemented personal site routes:
  - `/`
  - `/about`
  - `/projects`
  - `/talks`
  - `/writing`
  - `/contact`
- Implemented handbook routes through `app/handbook/[[...slug]]/page.tsx`.
- Added initial MDX handbook content:
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
- Implemented reusable marketing, handbook and tool components.
- Implemented client-side tools:
  - Prefix Cache Auditor
  - LLM Cost Calculator
  - AI Quality Gate Checklist
- Added pure logic tests for the tool calculation modules.
- Added `README.md` with local development, validation, content workflow and deployment notes.
- Verified a local dev server starts successfully.
- Verified the static export renders through a simple static server.
- Verified desktop and mobile screenshots for the home page; fixed mobile hero clipping.
- Added bilingual routing:
  - English default routes remain at `/...`.
  - Russian routes are available at `/ru/...`.
- Added a language switcher for marketing pages, tool pages and handbook pages.
- Added Russian UI copy for navigation, marketing pages, tools and reusable handbook components.
- Added a separate Russian Fumadocs source under `content/handbook-ru`.
- Added Russian MDX versions of all initial handbook chapters.
- Added locale routing tests.
- Added GitHub Pages deployment workflow under `.github/workflows/pages.yml`.
- Added `public/.nojekyll` so GitHub Pages serves Next.js `_next` assets correctly.
- Added `.gitignore` and `.env.example`.
- Moved English routes into an `(en)` route group and made `/ru` use its own root layout with `lang="ru"`.
- Removed unverified LinkedIn, Instagram and generic GitHub public links from runtime site config.
- Switched the no-custom-domain deployment target to a user Pages repo at `https://sernote.github.io`.

## Validation results

- `CI=true pnpm install` passed in the non-interactive shell.
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm test` passed: 1 test file, 4 tests.
- `pnpm build` passed and generated static output in `out/`.
- `pnpm dev` started successfully on `http://localhost:3000`.
- Static export smoke test:
  - served `out/` on `http://127.0.0.1:4173`
  - verified `/handbook/`
  - verified `/tools/prefix-cache-auditor/`
- Browser automation note: the Browser plugin tool was unavailable in this environment; Playwright wrapper was present but failed to launch because `playwright-cli` was missing, so static rendered smoke checks used local headless Chrome.
- Bilingual implementation intermediate check:
  - `pnpm typecheck` passed after adding the Russian Fumadocs source.
- Final bilingual validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 46 static/SSG pages.
  - Static smoke checks passed for `/ru/`, `/ru/handbook/`, `/ru/handbook/platform-map/` and `/ru/tools/prefix-cache-auditor/`.
  - Desktop and mobile screenshots of `/ru/` were captured with local headless Chrome and reviewed.
- GitHub Pages launch prep validation after deployment/config changes:
  - `pnpm typecheck` passed after regenerating Next route types.
  - `pnpm lint` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 46 static/SSG pages.
  - Static export includes `out/.nojekyll`.
  - Static export emits `lang="en"` for `/` and `lang="ru"` for `/ru/`.

## Decisions

- Used one Next.js app for the personal site, handbook and tools to keep design, routing and deployment simple for v0.
- Used `output: "export"` and `trailingSlash: true` for static host compatibility, including GitHub Pages-style directory index resolution.
- Used `next build --webpack` for `pnpm build` because the default build path stalled locally; static export remains enabled.
- Kept all tools client-side with deterministic local calculations and no external calls.
- Used verified public author links only:
  - Telegram: `https://t.me/s/sergeinotevskii`
  - Habr: `https://habr.com/ru/users/Ser_no/articles/`
- Treated public Habr topics on prefix cache and effective cost as content anchors.
- Kept examples synthetic and sanitized.
- Chose route-prefix i18n (`/ru/...`) instead of localStorage/client-only toggling to preserve static hosting and direct links.
- Kept English as the default route set to avoid breaking existing URLs.
- Created a second Fumadocs source for Russian MDX instead of trying to translate handbook content at runtime.
- Targeted GitHub Pages deployment via GitHub Actions rather than committing `out/` to the repository.
- Kept root-relative asset paths; without a custom domain, the target must be a user Pages repo named `sernote.github.io` instead of project Pages under `/<repo>/`.

## Known issues

- Content is intentionally v0 placeholder-but-useful; it needs editorial expansion before a full public launch.
- Russian content is translated for the v0 surface, but still needs human editorial polishing before public launch.
- Browser plugin / Playwright MCP verification was not available from this environment; rendered smoke checks were performed with local headless Chrome instead.
- No analytics, newsletter, comments, search index or backend integrations are included by design.
- GitHub CLI authentication is currently invalid for account `sernote`; remote repository creation/push is blocked until re-authentication.
- The first local git commit exists on `main`: `81277ed`.

## Follow-ups

- Expand the strongest chapters first:
  - Production AI Platform Map
  - AI Platform Maturity Model
  - MaaS vs self-hosted
  - Prefix Cache
  - AI Quality Gate
  - LLM Observability Checklist
- Add Model Lifecycle, Guardrails, RAG/Agents and Platform DevEx sections in later versions.
- Add `docs/CODEX_SETUP.md` for optional shadcn MCP setup if this repo will be shared with other agents.
- Add richer visual diagrams or downloadable maps after content stabilizes.
- Add `public/CNAME` only if a custom domain is added later.

## Blockers

Remote repository creation is blocked by invalid local GitHub CLI authentication. Run `gh auth login -h github.com` or provide another authenticated GitHub path.
