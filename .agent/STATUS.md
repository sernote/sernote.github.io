# Status

## Current milestone

MVP implemented, bilingual EN/RU version validated, GitHub Pages launch preparation complete, review-driven editorial pass complete, and product-onboarding improvements complete.

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
- Refactored `/` and `/ru` into personal executive landing pages for Sergei Notevskii.
- Refactored `/handbook` and `/ru/handbook` into dedicated Production AI Platform Handbook landing pages.
- Added proof rows, unified top navigation, a top-level map link, and friendly public chapter metadata.
- Reworked `/ru/handbook/start-here` as a reader-first entry page.
- Rewrote manifesto pages as manifesto-style position pieces rather than regular template chapters.
- Expanded the platform map to 12 layers and split Observability from Economics / FinOps.
- Added initial Guardrails, STT and Embeddings chapters in both English and Russian.
- Performed a Russian editorial pass to reduce unnecessary English wording and replace raw phrases such as `feature` and `data control` with concise Russian wording.
- Added a static handbook catalog for maps, chapters, checklists, tools and planned templates.
- Added handbook landing counters, format filters and role-track filters.
- Added local progress and bookmark controls for handbook items and individual chapters.
- Added `/tools` and `/ru/tools` index pages.
- Updated the global navigation so `Инструменты` / `Tools` points to the tools index instead of a single tool.
- Added personal landing engagement formats:
  - architecture review
  - executive workshop / working session
  - talk or podcast
  - handbook collaboration
- Reduced the personal landing platform-map section to a concise preview and kept the full 12-layer map inside the handbook.
- Performed an additional Russian wording pass after review feedback to remove visible `feature`, `data control`, `fallback`, `guardrails` and similar avoidable English calques from Russian chapter text.
- Added `public/CNAME` for `notevskii.tech` and updated README deployment notes for the custom domain.

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
- Review-driven landing/content/editorial validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 52 static/SSG pages.
  - Static output spot-check confirmed the removed phrases `feature` and `data control` are no longer present in the Russian source/output surfaces checked.
- Review-driven product-onboarding validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 54 static/SSG pages.
  - Static smoke checks passed for `/ru/`, `/ru/handbook/` and `/ru/tools/` through the generated `out/` directory.
- Custom-domain and final editorial validation:
  - `pnpm lint` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed: 1 test file, 5 tests.
  - `pnpm build` passed and generated 54 static/SSG pages.
  - Static export includes `out/CNAME` with `notevskii.tech`.
  - GitHub Pages is configured with `cname: notevskii.tech`, `build_type: workflow` and `https_enforced: true`.
  - `curl -I https://notevskii.tech` returned `HTTP/2 200`.
  - `curl -I https://www.notevskii.tech` returned `HTTP/2 301` to `https://notevskii.tech/`.

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
- Kept root-relative asset paths; the target is a user Pages repo named `sernote.github.io`, now served through the custom domain `notevskii.tech`.
- Added `public/CNAME` with `notevskii.tech` for GitHub Pages custom-domain publishing.
- Kept established technical terms in the Russian version where they are useful for the target audience, but replaced avoidable English wording with Russian wording.
- Treated `feature` as `фича` or `возможность` by context; treated `data control` as `контроль данных`.
- Implemented progress and bookmarks with browser `localStorage` only, preserving static export and avoiding accounts, backend storage, analytics or tracking.
- Kept tracks and filters as static product navigation for v0 instead of adding a full learning platform, graph database or user accounts.

## Known issues

- Content is intentionally v0 placeholder-but-useful; it needs editorial expansion before a full public launch.
- Russian content is much cleaner after the editorial pass, but should still get a final human read before a broad public launch.
- Browser plugin / Playwright MCP verification was not available from this environment; rendered smoke checks were performed with local headless Chrome instead.
- No analytics, newsletter, comments, search index or backend integrations are included by design.
- GitHub repository exists at `https://github.com/sernote/sernote.github.io`; pushes to `main` have worked in this environment.
- DNS for `notevskii.tech` was configured by the user in REG.RU with GitHub Pages apex records and `www` CNAME; GitHub Pages now resolves the apex domain over HTTPS and redirects `www` to the apex.
- Progress and bookmarks are intentionally local to one browser/device and do not sync across devices.

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
- Watch the first few GitHub Pages deploys after future content pushes to ensure the workflow remains green.

## Blockers

None.
