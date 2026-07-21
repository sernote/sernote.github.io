# notevskii.tech v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the handbook-first site with a personal engineering publication that has three clear entrances—Blog, Materials, and AI Platform—and ship one complete, evidence-safe Prefix Cache vertical before expanding the catalog.

**Architecture:** Keep the existing Next.js static-export stack and all legacy handbook/tool routes intact while adding a parallel, typed v3 content collection. A small registry owns identity, publication state, relations, URLs, locale pairs, and list/detail queries; routes and SEO read only through that registry. The UI reuses the current graphite/cyan design tokens but separates an editorial personal-site mode from a denser AI Platform reference mode.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Fumadocs MDX, Zod, Tailwind CSS, shadcn/ui, Vitest, pnpm, GitHub Pages static export.

**Normative source:** `docs/superpowers/specs/2026-07-22-notevskii-tech-v3-design.md` (accepted and converged).

---

## Delivery boundary

This plan ships the complete top-level product and exactly one representative detail page for every repeatable content type.

**Complete top-level routes:** `/`, `/blog`, `/work`, `/talks`, `/projects`, `/ai-platform`, `/ai-platform/map`, `/about`, `/contact`.

**Representative detail routes:**

- `/blog/ai-platform-before-gpu`
- `/talks/maas-vs-self-hosted`
- `/projects/audit-prompt-caching`
- `/ai-platform/areas/inference-plane`
- `/ai-platform/components/prefix-cache`
- `/ai-platform/cases/agent-session-cache-reuse`

**External content without a local detail route:** the Habr note “Короткий промпт не значит дешёвый”.

**Frozen during the pilot:** the 40 legacy handbook MDX files, existing `/en/**` pages, client-side tools, backend/auth/analytics, a full handbook migration, search, graph navigation, PDF, paywall, course, and English v3 parity.

## Locked implementation decisions

1. Use one parallel `v3Content` Fumadocs collection under `content/v3/`; do not fork six loaders for seven records.
2. Keep `publicationStatus` and `reviewStatus` independent.
3. Treat `entityId + locale` as document identity; local slug and URL are locale-specific delivery fields.
4. External notes have `slug: null`, a required `sourceUrl`, and no generated detail route.
5. Published local article/talk/project records generate route params. AI Platform records generate routes only as `published + reviewed` or `published + stale`; stale pages remain reachable with a warning but are excluded from featured blocks. Draft records may appear on the AI Platform map only as explicit non-clickable “Планируется” areas.
6. Frontmatter relations use the normative typed buckets `articleIds`, `talkIds`, `projectIds`, and `platformEntityIds`, with four cross-links maximum in total; the registry normalizes them to internal typed references and derives backlinks.
7. Do not claim internal Bitrix24 scale, topology, capacity, cost, vendor terms, or production outcomes. Public role wording is limited to “Сергей Нотевский — AI Platform Lead в Битрикс24”.
8. GitHub Pages compatibility uses static alias pages with target canonical, `noindex,follow`, optional immediate meta refresh, and a visible target link—not a claimed HTTP redirect.
9. RSS includes every published Russian blog record: a native item links to its local page and an external note links directly to `sourceUrl`. Sitemap includes only canonical, indexable local pages.
10. Avoid a new parser dependency for the export audit. The pilot audit uses Node built-ins and narrowly checks generated markers that we control.

## Author-time budget

The pilot has a hard ceiling of 40 author-hours. Plan 32 hours and keep 8 hours unallocated for review fixes:

| Work | Planned author-hours |
|---|---:|
| Public fact/source freeze and synthetic evidence | 4 |
| Seven exemplar drafts and top-level Russian copy | 12 |
| Editorial + subject/security review and corrections | 6 |
| Information design and responsive inspection | 4 |
| Migration, release evidence, and handoff | 3 |
| Six-reader recruitment, test, synthesis, and corrections | 3 |
| Reserve; consumed only by P0/P1 or acceptance failures | 8 |

Content caps keep this budget real: native article 1,200–1,600 words; talk 600–900; project 700–1,000; area 1,000–1,400; component 1,400–2,000; synthetic case 800–1,200; each top-level intro 200–500. If planned work reaches 32 hours, remove optional legacy references and polish before consuming reserve; do not cut the seven exemplars, the three product entrances, claim safety, accessibility, or validation. Stop expansion if projected maintenance exceeds one author-hour per week.

Initialize `.agent/V3_TIME_BUDGET.md` at the start of Task 1. At the end of every task, update its milestone row before the task commit and include the ledger in that commit. Record actual user attention only—agent runtime is a separate field and never counts as author-hours.

## File map

### Create

- `content/v3/blog/ai-platform-before-gpu.mdx` — native pilot article.
- `content/v3/blog/short-prompt-not-cheap.mdx` — external-note metadata and original annotation only.
- `content/v3/talks/maas-vs-self-hosted.mdx` — one local talk page.
- `content/v3/projects/audit-prompt-caching.mdx` — one local OSS project page.
- `content/v3/ai-platform/areas/*.mdx` — seven area records; only Inference Plane is published.
- `content/v3/ai-platform/components/prefix-cache.mdx` — one reviewed component.
- `content/v3/ai-platform/cases/agent-session-cache-reuse.mdx` — one explicitly synthetic case.
- `evidence/v3/agent-session-cache-reuse/step-stable.json`, `step-drift.json`, and `layout-linter-output.json` — pinned synthetic inputs and reproduced analyzer evidence.
- `.agent/V3_TIME_BUDGET.md` — planned/consumed author attention and remaining reserve by milestone.
- `lib/content-v3/schema.ts` — discriminated Zod schema and shared types.
- `lib/content-v3/registry.ts` — identity, URL, lifecycle, relation, backlink, and locale validation.
- `lib/content-v3/source-core.ts` — pure injected-entry adapter and public query API.
- `lib/content-v3/source.ts` — server-only singleton that imports the generated Fumadocs collection.
- `lib/content-v3/view-models.ts` — pure page-view builders that accept an injected `V3Source`.
- `lib/site-routes.ts` — canonical route inventory and real locale-pair lookup.
- `lib/seo/urls.ts` — URL normalization and absolute URL helpers.
- `lib/seo/structured-data.ts` — JSON-LD builders and safe serializer.
- `lib/seo/rss.ts` — deterministic RSS renderer.
- `lib/migration/manifest.ts` — parsed exact-route inventory and alias lookup.
- `config/v3-route-manifest.json` — one resolved decision for every exported HTML route.
- `config/v3-export-auxiliary-paths.json` — shared exact exclusion set for framework-generated error artifacts.
- `scripts/snapshot-route-manifest.mjs` — generate the exact inventory from an export and four normative overrides.
- `scripts/apply-static-aliases.mjs` — materialize all exact static-alias decisions after export.
- `components/marketing/content-list-item.tsx` — editorial list row.
- `components/marketing/page-intro.tsx` — shared page heading without card chrome.
- `components/pages/v3-marketing-pages.tsx` — home, indexes, about, and contact compositions.
- `components/pages/ai-platform-pages.tsx` — AI Platform landing and map compositions.
- `components/pages/content-detail-page.tsx` — article/talk/project detail shell.
- `components/pages/reference-detail-page.tsx` — area/component/case reference shell.
- `components/ai-platform/platform-map.tsx` — seven-area responsibility map.
- `components/handbook/docs-main-container.tsx` — Fumadocs `DocsPage` container slot rendered as the page main landmark.
- `components/seo/json-ld.tsx` — safe JSON-LD script component.
- `components/routing/static-alias-page.tsx` — landmark-neutral alias body plus explicit marketing/docs compositions.
- `app/(en)/blog/page.tsx` and `app/(en)/blog/[slug]/page.tsx`.
- `app/(en)/work/page.tsx`.
- `app/(en)/talks/[slug]/page.tsx`.
- `app/(en)/projects/[slug]/page.tsx`.
- `app/(en)/ai-platform/page.tsx`, `map/page.tsx`, and three detail route files.
- `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`.
- `public/media/talks/maas-vs-self-hosted.jpg` — real thumbnail captured from the verified public recording.
- `scripts/check-static-export.mjs` — post-build contract audit.
- `docs/superpowers/templates/2026-v3-private-evidence-log-template.md` — blank schema and expand/no-expand checklist; filled log stays outside the public repository.
- `tests/content-v3/schema.test.ts`, `registry.test.ts`, `source.test.ts`.
- `tests/migration/manifest.test.ts`, `tests/migration/static-aliases.test.ts`.
- `tests/seo/rss.test.ts`, `structured-data.test.ts`, `site-routes.test.ts`.
- `tests/build/static-export-contract.test.ts`.

### Modify

- `source.config.ts` — add the parallel v3 collection; do not alter legacy schemas.
- `lib/i18n.ts` — personal master brand, compact RU v3 nav, and frozen EN legacy nav.
- `lib/metadata.ts` — optional real alternates, page type, aliases, and new OG language.
- `components/marketing/site-shell.tsx` — one main landmark, skip link, active nav, optional language switch.
- `components/i18n-language-switcher.tsx` and three handbook page routes — hide migrated/non-equivalent locale counterparts.
- `components/pages/marketing-pages.tsx` — remove its five nested `<main>` landmarks while retaining EN/legacy compositions.
- `components/pages/tool-pages.tsx` — remove nested `<main>` landmarks inside `MarketingPage`.
- `components/pages/handbook-landing.tsx` — retain one direct grid-area main landmark for the landing page.
- `app/(en)/handbook/layout.tsx`, `app/(english)/en/handbook/layout.tsx`, `app/ru/handbook/layout.tsx` — add the shared skip link without wrapping Fumadocs grid children.
- `app/(en)/handbook/[[...slug]]/page.tsx`, `app/(english)/en/handbook/[[...slug]]/page.tsx`, `app/ru/handbook/[[...slug]]/page.tsx` — use the custom `DocsPage` main-container slot; exact aliases render their own direct grid-area main.
- `app/(en)/page.tsx`, existing RU index/about/contact route files — point to v3 compositions and exact metadata.
- `app/(en)/writing/page.tsx` — compatibility alias to `/blog`.
- `app/(en)/handbook/[[...slug]]/page.tsx` — exact aliases for root, platform map, and Prefix Cache; all other handbook pages remain untouched.
- `app/globals.css` — editorial/reference layout, focus, skip-link, and responsive map utilities using existing tokens.
- `public/og-image.svg` — replace handbook-first wording with the personal master brand; preserve dimensions and visual treatment.
- `package.json` — add focused content/export verification scripts.
- `.github/workflows/pages.yml` — run the export contract audit after the static build.
- `.agent/STATUS.md` — milestone evidence and validation state.
- `.agent/PROJECT_SPEC.md`, `.agent/DESIGN_SPEC.md`, `.agent/CONTENT_MODEL.md`, `.agent/IMPLEMENTATION_PLAN.md` — add a short pointer that v3 normative documents supersede their product direction without deleting history.
- `README.md` — document v3 content and verification commands.

---

### Task 1: Establish the typed v3 content contract

**Files:**

- Create: `lib/content-v3/schema.ts`
- Create: `tests/content-v3/schema.test.ts`
- Create: `.agent/V3_TIME_BUDGET.md`
- Modify: `source.config.ts`

- [ ] **Step 0: Initialize the author-time ledger**

Copy the 32+8 allocation into `.agent/V3_TIME_BUDGET.md`, add one row per task, and set consumed author attention to 0 until the user actually spends time. Record agent runtime separately. This file is updated before every milestone commit.

- [ ] **Step 1: Write schema tests for all record shapes and invalid lifecycle combinations**

Create fixtures inline for `article`, `talk`, `project`, `platform-area`, `platform-component`, and `case`. Assert these exact invariants:

```ts
expect(parseV3Frontmatter(nativeArticle).kind).toBe("native");
expect(() => parseV3Frontmatter({ ...externalNote, sourceUrl: undefined })).toThrow();
expect(() => parseV3Frontmatter({ ...reviewedComponent, reviewedAt: undefined })).toThrow();
expect(() => parseV3Frontmatter({
  ...nativeArticle,
  relations: { articleIds: ["a", "b", "c"], projectIds: ["d", "e"] }
})).toThrow();
expect(() => parseV3Frontmatter({ ...syntheticCase, caseKind: undefined })).toThrow();
for (const slug of ["a/b", ".", "..", "%2f", "Prefix_Cache"]) {
  expect(() => parseV3Frontmatter({ ...nativeArticle, slug })).toThrow();
}
for (const sourceUrl of ["javascript:alert(1)", "http://example.com", "/relative"]) {
  expect(() => parseV3Frontmatter({ ...externalNote, sourceUrl })).toThrow();
}
expect(() => parseV3Frontmatter({
  ...talk,
  thumbnail: { ...talk.thumbnail, path: "/media/../secret.jpg" }
})).toThrow();
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `pnpm vitest run tests/content-v3/schema.test.ts`

Expected: FAIL because `@/lib/content-v3/schema` does not exist.

- [ ] **Step 3: Implement the discriminated schema**

Define shared fields exactly once:

```ts
const base = z.object({
  entityId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  locale: z.enum(["ru", "en"]),
  title: z.string().min(3),
  description: z.string().min(20),
  publicationStatus: z.enum(["draft", "published", "archived"]),
  reviewStatus: z.enum(["unreviewed", "reviewed", "stale"]),
  publishedAt: z.string().date().nullable(),
  updatedAt: z.string().date(),
  reviewedAt: z.string().date().nullable(),
  reviewCycleDays: z.number().int().positive().nullable(),
  topics: z.array(z.string().min(1)).max(8),
  relations: relationBucketsSchema
});
```

Use a discriminated union on `type`. `relationBucketsSchema` has optional arrays `articleIds`, `talkIds`, `projectIds`, and `platformEntityIds`; a refinement caps the sum of all ids at four. Add the type-specific fields from spec §9: article kind/excerpt/source/supersession; talk venue/event date/format/recording/upload date/abstract/3–7 takeaway objects with timestamps/nullable slides and nullable `thumbnail`; project repository/release/audience/quick-start/privacy/evidence/support; area order/signals/boundaries; component area ids/decision questions/metrics/failure modes; case kind/component ids/evidence. A non-null talk thumbnail is `{ path, sourceUrl, capturedAt, alt }`: `path` must be a traversal-safe root-relative `/media/...` JPG/PNG/WebP path, `sourceUrl` an absolute HTTPS URL, `capturedAt` a date, and `alt` non-empty. Validate each local slug as one kebab-case route segment—no slash, dot segment, `%`, or `..`. Validate every navigated external field (`sourceUrl`, recording, repository, slides, release URL, thumbnail source, and reference source URL) as an absolute `https:` URL. For reviewed or stale reference records, require non-empty `sources`, `applicability`, `limitations`, `reviewedAt`, and `reviewCycleDays`. Refine `published` and `archived` to require `publishedAt`, external notes to require `sourceUrl` and `slug: null`, local records to require a slug, and cases to require `caseKind: "synthetic" | "composite" | "public"`.

- [ ] **Step 4: Add the parallel Fumadocs collection**

Keep `docs` and `docsRu` byte-for-byte equivalent. Add `defineCollections` and export:

```ts
export const v3Content = defineCollections({
  type: "doc",
  dir: "content/v3",
  schema: v3FrontmatterSchema
});
```

- [ ] **Step 5: Run schema tests and content generation**

Run: `pnpm vitest run tests/content-v3/schema.test.ts && pnpm exec fumadocs-mdx`

Expected: schema tests PASS; Fumadocs generation exits 0 and still sees both legacy collections.

- [ ] **Step 6: Commit the contract**

```bash
git add source.config.ts lib/content-v3/schema.ts tests/content-v3/schema.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: add typed v3 content contract"
```

### Task 2: Build the validated registry before routes consume content

**Files:**

- Create: `lib/content-v3/registry.ts`
- Create: `tests/content-v3/registry.test.ts`

- [ ] **Step 1: Write registry identity, URL, relation, and stale-state tests**

Assert:

```ts
expect(() => createRegistry([ruArticle, ruArticle])).toThrow(/duplicate document/i);
expect(() => createRegistry([ruArticle, { ...enArticle, type: "talk" }])).toThrow(/type conflict/i);
expect(() => createRegistry([localA, { ...localB, locale: localA.locale, type: localA.type, slug: localA.slug }])).toThrow(/canonical/i);
expect(() => createRegistry([publishedComponent, draftArea])).toThrow(/published.*draft/i);
expect(registry.getBacklinks({ type: "platform-component", entityId: "prefix-cache" })).toHaveLength(2);
expect(registry.getAlternate(ruArticle)).toEqual(enArticle);
expect(registry.getAlternate(ruOnlyArticle)).toBeNull();
```

Use a fixed `now: "2026-07-22"` in lifecycle tests. Reject `reviewStatus: reviewed` when `reviewedAt + reviewCycleDays` is expired, and reject `reviewStatus: stale` when the deadline has not expired. Stored status and deadline must agree; the registry does not silently rewrite editorial state.

Feed the same fixtures in normal and reversed input order. Assert `all()` is sorted by `type`, `locale`, then `entityId`; public non-area lists are sorted by `publishedAt` descending, then `updatedAt` descending, then `entityId`; platform areas are always sorted by their explicit numeric `order`. Generated collection/glob order must never control UI, map, related lists, sitemap, or RSS.

- [ ] **Step 2: Run the registry test and confirm RED**

Run: `pnpm vitest run tests/content-v3/registry.test.ts`

Expected: FAIL because `createRegistry` is missing.

- [ ] **Step 3: Implement normalized identity and URL derivation**

Expose these stable methods:

```ts
type V3Registry = {
  all(): V3Record[];
  listPublic(type?: V3Type, locale?: Locale): V3Record[];
  listLocalCanonical(type?: V3Type, locale?: Locale): V3Record[];
  listFeatured(type?: V3Type, locale?: Locale): V3Record[];
  getBySlug(type: V3Type, slug: string, locale: Locale): V3Record | null;
  getByIdentity(ref: RelationRef, locale: Locale): V3Record | null;
  getRelated(record: V3Record): V3Record[];
  getRelatedForPage(record: V3Record, limit?: number): V3Record[];
  getBacklinks(ref: RelationRef, locale?: Locale): V3Record[];
  getAlternate(record: V3Record): V3Record | null;
  assertLifecycle(now?: string): void;
};
```

Derive the type/slug base path with one exhaustive function, then keep RU at root and prefix EN with `/en`. Canonical uniqueness applies only to derived local output URLs; external-note `sourceUrl` values are validated as final external links but do not enter the local collision set.

```ts
article -> /blog/{slug}
talk -> /talks/{slug}
project -> /projects/{slug}
platform-area -> /ai-platform/areas/{slug}
platform-component -> /ai-platform/components/{slug}
case -> /ai-platform/cases/{slug}
external-note -> sourceUrl
locale=en local record -> /en{basePath}
```

- [ ] **Step 4: Validate graph safety**

Normalize relation buckets to internal `RelationRef` values, then reject duplicate relations, self-relations, missing targets, wrong target type, published-to-draft relations, a component without a published reviewed-or-stale `primaryAreaId`, and a case without at least one published reviewed-or-stale component. Build backlinks and structural adjacency from `primaryAreaId`/`relatedAreaIds`/`componentIds`; do not store either a second time. `getRelatedForPage` removes non-public records, deduplicates editorial links, structural adjacency, and backlinks, preserves that priority order, and caps the visible result at four. Validate that reviewed deadlines are current and stale deadlines are expired at build time. `listPublic` includes editorial records only when `publicationStatus === "published"` (including external notes), and reference records only when `publicationStatus === "published" && reviewStatus in { "reviewed", "stale" }`. `listLocalCanonical` filters that set to records with local slugs for routes/sitemap; `listFeatured` removes stale records. None includes draft or archived records.

Apply the deterministic ordering contract from Step 1 after filtering, with `entityId` as the final tie-breaker. Structural priority remains first for `getRelatedForPage`, but records inside each priority bucket use the same stable ordering.

- [ ] **Step 5: Run tests and the full existing suite**

Run: `pnpm vitest run tests/content-v3/registry.test.ts && pnpm test`

Expected: all registry cases and the five legacy tool tests PASS.

- [ ] **Step 6: Commit the registry**

```bash
git add lib/content-v3/registry.ts tests/content-v3/registry.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: validate v3 content registry"
```

### Task 3: Add and review the pilot content set

**Files:**

- Create: `lib/content-v3/source-core.ts`
- Create: `lib/content-v3/source.ts`
- Create: `tests/content-v3/source.test.ts`
- Create: the 13 MDX files listed in the file map (seven content exemplars plus six planned area records)
- Create: `public/media/talks/maas-vs-self-hosted.jpg`
- Create: `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-content-review.md`

- [ ] **Step 1: Write source-adapter tests**

Test pure mapping first with injected generated-entry fixtures:

```ts
expect(source.listPublic("article", "ru").map((item) => item.entityId))
  .toEqual(["ai-platform-before-gpu", "short-prompt-not-cheap"]);
expect(source.generateParams("article", "ru")).toEqual([{ slug: "ai-platform-before-gpu" }]);
expect(source.getBySlug("article", "short-prompt-not-cheap", "ru")).toBeNull();
expect(source.getPlannedAreas("ru")).toHaveLength(6);
```

Repeat the adapter fixture in reverse order and require identical list/param output; `generateParams()` follows the registry's deterministic ordering and never the collection's import order.

- [ ] **Step 2: Run the source test and confirm RED**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: FAIL because the source adapter is absent.

- [ ] **Step 3: Implement one generated-entry adapter**

Implement `createV3Source(entries)` in `source-core.ts` without importing generated files. Fumadocs doc collection entries are flattened: frontmatter fields and `body` are top-level, while the source path is `info.path`; normalize that real shape and pass metadata through `createRegistry`. Export the `V3Source` contract with `listPublic`, `listLocalCanonical`, `listFeatured`, `getBySlug`, `getPlannedAreas`, `generateParams`, and `getRelatedForPage`; all ordering/filtering delegates to the registry. `getBySlug` and `generateParams` expose only public local records, while `getPlannedAreas` is the one explicit draft-map query. Tests import only `source-core.ts` and injected fixtures because Vitest has no Fumadocs MDX transform. `source.ts` is the thin server-only module that imports `v3Content` from `collections/server` and exports `createV3Source(v3Content)`. App routes/components import only that server singleton; no test imports `collections/server`.

- [ ] **Step 4: Add exact pilot frontmatter**

Start every newly local page as `publicationStatus: draft`, `publishedAt: null`, and every reference page as `reviewStatus: unreviewed`. The already-public Habr external note remains `published` with its verified source date. Use `reviewCycleDays: 90` for reference pages after review. Use these exact identities and slugs:

```text
ai-platform-before-gpu -> article/native -> ai-platform-before-gpu
short-prompt-not-cheap -> article/external-note -> slug null
maas-vs-self-hosted-roii -> talk -> maas-vs-self-hosted
audit-prompt-caching -> project -> audit-prompt-caching
inference-plane -> platform-area -> inference-plane
prefix-cache -> platform-component -> prefix-cache
agent-session-cache-reuse -> case/synthetic -> agent-session-cache-reuse
```

Freeze public facts against explicit sources before prose: organizer page `https://ai-pnl.com/` for the 19 February 2026 event date and public role; recording `https://youtu.be/RHbbeHKGh6I` for title/upload/timestamps; Habr canonical `https://habr.com/ru/companies/bitrix/articles/1033822/`; project repository `https://github.com/sernote/audit-prompt-caching`; and the official GitHub latest-release API for mutable release metadata. Record `verifiedAt` on source/release evidence and do not infer slides, duration, scale, or production results.

The pilot talk has a non-null validated thumbnail object: local path `/media/talks/maas-vs-self-hosted.jpg`, exact verified YouTube thumbnail source URL, actual capture date, and Russian alt text. Fetch that real source asset during this fact-freeze step, inspect it, and save it at the declared path before content review or promotion; metadata and binary must agree. Do not synthesize, redraw, or defer the asset to route implementation.

Create the other six area records as `publicationStatus: draft`, `reviewStatus: unreviewed`, with no relations and descriptions shown only on the map: Strategy & Boundaries, Control Plane, Context & Agent Runtime, Quality & Lifecycle, Operations & Economics, Security & Ownership.

Use the normative one-way relation data:

```text
short-prompt-not-cheap: platformEntityIds=[prefix-cache], projectIds=[audit-prompt-caching]
audit-prompt-caching: platformEntityIds=[prefix-cache]
agent-session-cache-reuse: articleIds=[short-prompt-not-cheap], projectIds=[audit-prompt-caching]
```

Do not duplicate structural membership in editorial relations: the area’s component list derives from `primaryAreaId: inference-plane`, and component/case linkage derives from `componentIds: [prefix-cache]`. The native article and talk use route CTAs (`/ai-platform` and `/ai-platform/map`) rather than fake relations to route-only entities. At content freeze, query the official GitHub latest-release API, record the returned version/date/release URL and `verifiedAt`, and pin the case reproduction to that tag or commit. The plan-review snapshot is `v0.1.3`, published 20 July 2026; do not assume it remains latest and do not store stars or forks.

- [ ] **Step 5: Write evidence-safe Russian bodies**

Write complete prose, not outlines:

- Native article: scenario → data/security → quality/SLO → ownership → execution/model/GPU; close with the AI Platform map.
- External note: 100–160-word original annotation and Habr canonical only; do not copy the article.
- Talk: recording, venue, why to watch, 5 takeaways supported by timestamped links into the recording; use the organizer-verified event date `2026-02-19`, the separate recording upload date `2026-02-22`, and omit slides unless a public URL is verified.
- Project: problem, audience, audit surfaces, quick start, local/privacy boundary, limitations, MIT, and “без заявленного support SLA”.
- Inference Plane: why the area exists; included/excluded decisions; derived components; signals; trade-offs; dependencies/intersections with other areas; related artifacts; sources; applicability; limitations; and next verification action.
- Prefix Cache: definition; problem/context; responsibility/boundary; contracts and request flows; implementation variants; metrics/signals; failure modes; trade-offs/anti-patterns; checklist; products/OSS with role rather than ranking; related artifacts; review date; sources; applicability; and limitations. Cite current official vLLM APC documentation for implementation-specific behavior.
- Synthetic case: the two source-controlled synthetic inputs, pinned analyzer command, captured output, observed tool-order warning, and visible “Что этот кейс доказывает / чего не доказывает” sections. It must not imply measured production hit rate, latency, cost, or outcome.

Run one `ru-text` pass after the technical draft. Use `humanizer-ru` only on fragments that remain visibly templated, then repeat the factual check for every changed claim; preserve technical accuracy over stylistic smoothness.

- [ ] **Step 6: Produce reproducible synthetic evidence from a pinned public release**

At fact freeze, pin `audit-prompt-caching` to the exact latest verified tag/commit. For the plan-review snapshot run:

`git clone --depth 1 --branch v0.1.3 https://github.com/sernote/audit-prompt-caching.git /private/tmp/notevskii-v3-audit-v0.1.3`

Expected: checkout HEAD `cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23`. If the official latest-release API changed, update the tag, path, expected commit, and content metadata together before proceeding.

The checkout step must be idempotent and fail closed: clone only when the directory is absent; when it already exists, verify its `origin`, tag, and HEAD before reuse. Never silently reuse or delete an unverified directory.

Create one stable request and one otherwise-equivalent request with intentionally unstable tool order. Run the pinned `layout_linter.py` against both. The stable input must have no AP-1/AP-2 finding; the drift input must produce AP-2 with the observed tool order. Save the exact inputs, command metadata, pinned commit, and inspected JSON outputs under `evidence/v3/agent-session-cache-reuse/` using `apply_patch`; the case MDX quotes only observations present in those outputs.

Run stable: `python3 /private/tmp/notevskii-v3-audit-v0.1.3/scripts/layout_linter.py evidence/v3/agent-session-cache-reuse/step-stable.json`

Expected: exit 0 with JSON status `ok` and AP-1/AP-2 in `clean_checks`.

Run drift: `python3 /private/tmp/notevskii-v3-audit-v0.1.3/scripts/layout_linter.py evidence/v3/agent-session-cache-reuse/step-drift.json`

Expected: exit 1 with JSON status `findings`, `rule_id: "AP-2"`, and category `tool-schema-stability`. Exit 1 is the expected evidence result, not a test failure.

- [ ] **Step 7: Run the two mandatory content reviews before changing statuses**

Dispatch two independent reviewers over the draft MDX:

1. AI Platform subject reviewer checks domain boundaries, technical claims, official sources, applicability, limitations, and synthetic evidence.
2. Editorial/security reviewer checks Russian language, claim strength, confidential-data risk, public-source provenance, and unmistakable synthetic labeling.

Record role, every finding, disposition, and final result in `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-content-review.md`. Fix findings and repeat each reviewer until both say PASS. `ru-text` and `humanizer-ru` are editorial tools, not substitutes for these independent gates.

- [ ] **Step 8: Promote only reviewed records at content freeze**

After both reviews converge, capture the content-freeze date once with `date +%F`. Set the native article, talk, and project to `published + unreviewed`; set Inference Plane, Prefix Cache, and the synthetic case to `published + reviewed`, with the same `reviewedAt` and `publishedAt`, complete sources/applicability/limitations, and a 90-day cycle. Leave six planned areas draft. If public deployment happens on a later date, the release step updates `publishedAt` and starts the private evidence-log baseline on that actual deployment date.

- [ ] **Step 9: Generate and validate real content**

Run: `pnpm exec fumadocs-mdx && pnpm vitest run tests/content-v3/source.test.ts && pnpm typecheck`

Expected: generation, source tests, and TypeScript all PASS; six draft areas produce no detail params.

- [ ] **Step 10: Commit the pilot content layer**

```bash
git add content/v3 evidence/v3/agent-session-cache-reuse public/media/talks/maas-vs-self-hosted.jpg lib/content-v3/source-core.ts lib/content-v3/source.ts tests/content-v3/source.test.ts docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-content-review.md .agent/V3_TIME_BUDGET.md
git commit -m "content: add v3 pilot vertical"
```

### Task 4: Replace the handbook-first shell with the personal master brand

**Files:**

- Create: `lib/site-routes.ts`
- Create: `tests/seo/site-routes.test.ts`
- Modify: `lib/i18n.ts`
- Modify: `components/marketing/site-shell.tsx`
- Modify: `components/i18n-language-switcher.tsx`
- Modify: `app/(en)/handbook/[[...slug]]/page.tsx`
- Modify: `app/(english)/en/handbook/[[...slug]]/page.tsx`
- Modify: `app/ru/handbook/[[...slug]]/page.tsx`
- Modify: `components/pages/marketing-pages.tsx`
- Modify: `components/pages/tool-pages.tsx`
- Modify: `components/pages/handbook-landing.tsx`
- Create: `components/handbook/docs-main-container.tsx`
- Modify: `app/(en)/handbook/layout.tsx`
- Modify: `app/(english)/en/handbook/layout.tsx`
- Modify: `app/ru/handbook/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Test the exact v3 navigation and locale-pair policy**

Assert the Russian primary nav is exactly Blog, Materials, AI Platform, About; Contact is a utility action. Assert `/blog` and all v3 detail paths have no English alternate. Assert `/en/writing` and the three migrated `/en/handbook...` counterparts have no RU alternate because their route meanings diverged. Assert an explicitly registered pair such as `/en/about` retains its Russian counterpart.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `pnpm vitest run tests/seo/site-routes.test.ts`

Expected: FAIL because `site-routes.ts` is absent and current nav has seven items.

- [ ] **Step 3: Implement canonical route inventory**

Export `RU_PRIMARY_NAV`, `getCanonicalStaticRoutes()`, `getActualAlternate(path, locale)`, and `isActiveNavItem(currentPath, href)`. `getActualAlternate` is allowlist-based: default is `null`; route pages or the content registry register only real equivalent pairs. It explicitly excludes `/en/writing` and migrated handbook counterparts. `getCanonicalStaticRoutes()` contains only literal top-level/tool/legacy routes and never imports content or hard-codes dynamic slugs; registry-derived local canonical paths are combined by callers that need the full set. Match `/blog/*` to Blog and `/ai-platform/*` to AI Platform; match `/work`, `/talks/*`, and `/projects/*` to Materials.

- [ ] **Step 4: Update brand copy without deleting legacy dictionaries**

Set `siteConfig.name` to `Сергей Нотевский` for RU and `Sergei Notevskii` for EN. RU description must describe a personal engineering publication about production AI platforms. Keep legacy EN route labels available, but do not synthesize new EN v3 URLs.

- [ ] **Step 5: Fix shell semantics and keyboard access**

Add an `href="#main-content"` skip link, one `<main id="main-content">`, `aria-current="page"` on the active desktop and mobile item, visible focus styles, and render the language switch only when `getActualAlternate()` returns a path. Make `createPageMetadata` default to no alternate; callers pass an explicitly resolved pair. Update the standalone handbook `LanguageSwitcher` and all three handbook route variants to use the same authoritative lookup and render nothing for migrated/non-equivalent pairs. Ensure the mobile menu contains the same four RU destinations and Contact.

- [ ] **Step 6: Add restrained editorial/reference utilities**

Use existing background, border, foreground, muted, and cyan tokens. Add only classes needed for an editorial measure, ruled list rows, reference metadata, map grid, status label, and mobile horizontal-overflow prevention. Under `@media (prefers-reduced-motion: reduce)`, disable smooth scrolling and non-essential animation/transition duration. Do not add gradients, fake terminal surfaces, new icon art, or a second color system.

- [ ] **Step 7: Normalize landmarks without breaking the Fumadocs grid**

Replace all inner `<main>` elements in `marketing-pages.tsx` and `tool-pages.tsx` with neutral wrappers because `MarketingPage` owns `<main id="main-content">`. Keep `HandbookLanding` as the one direct `<main id="main-content">` child in the Fumadocs grid and give it `[grid-area:main]`-compatible sizing. Each handbook layout adds the shared skip link but leaves `DocsLayout` children as direct grid items.

Create a client `DocsMainContainer` and pass it as `DocsPage`'s `slots.container` in all three handbook chapter routes. It mirrors the installed Fumadocs container classes but renders `<main id="main-content">`; the TOC remains a sibling grid item. Exact handbook aliases render their own direct grid-area `<main id="main-content">`. Do not wrap the whole `DocsPage` or `DocsLayout` children in a main. The focused DOM/export fixture covers a marketing page, tool page, handbook landing, handbook chapter, and exact alias and asserts one skip link plus exactly one `main#main-content` on each.

- [ ] **Step 8: Run tests, lint, and typecheck**

Run: `pnpm vitest run tests/seo/site-routes.test.ts && pnpm lint && pnpm typecheck`

Expected: PASS; no nested-main lint/type errors.

- [ ] **Step 9: Commit the shell**

```bash
git add lib/site-routes.ts lib/i18n.ts lib/metadata.ts components/marketing/site-shell.tsx components/i18n-language-switcher.tsx components/pages/marketing-pages.tsx components/pages/tool-pages.tsx components/pages/handbook-landing.tsx components/handbook/docs-main-container.tsx app/'(en)'/handbook app/'(english)'/en/handbook app/ru/handbook app/globals.css tests/seo/site-routes.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: establish personal site shell"
```

### Task 5: Build the home, Materials, About, and Contact routes

**Files:**

- Create: `components/marketing/page-intro.tsx`
- Create: `components/marketing/content-list-item.tsx`
- Create: `components/pages/v3-marketing-pages.tsx`
- Create: `lib/content-v3/view-models.ts`
- Modify: `app/(en)/page.tsx`
- Create: `app/(en)/work/page.tsx`
- Modify: `app/(en)/about/page.tsx`
- Modify: `app/(en)/contact/page.tsx`
- Modify: `lib/metadata.ts`

- [ ] **Step 1: Extract testable page-view models behind dependency injection**

Put route-independent builders for home, Materials, Blog, AI Platform map, and reference-page structure in `lib/content-v3/view-models.ts`. Every builder accepts an injected `V3Source`; this pure module may import only `source-core` types and pure helpers, never `source.ts` or `collections/server`. Server page compositions import the singleton and pass it to the builders. Test only the pure module in `tests/content-v3/source.test.ts`:

```ts
expect(getHomeViewModel(source).entrances.map((item) => item.href))
  .toEqual(["/blog", "/work", "/ai-platform"]);
expect(getWorkViewModel(source).groups.map((group) => group.id))
  .toEqual(["talks", "projects", "writing"]);
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: FAIL for the new view-model assertions.

- [ ] **Step 3: Build the four complete page compositions**

Home order:

1. Name, public role, and one-sentence scope.
2. Three plain entrances: Blog, Materials, AI Platform.
3. One selected artifact from each surface.
4. Compact professional context.
5. Contact CTA.

Materials order: intro, selected talk, selected OSS project, selected external article, then links to the full Talks and Projects indexes. About: current public role, areas of work, editorial principles, public channels. Contact: Telegram DM and four useful contexts—architecture, strategy session, speaking, public collaboration.

Do not use unverifiable scale numbers, testimonials, fake client logos, fake availability, or a photo placeholder.

The new root RU route files import directly from `v3-marketing-pages.tsx`; do not route them through the frozen legacy compositions.

- [ ] **Step 4: Use the authoritative metadata contract on each new route**

Pass exact canonical path, page kind, and `alternatePath: null` on new v3-only routes. For About/Contact, pass an alternate only if the explicit route-pair allowlist declares equivalent EN content. Never rely on path synthesis.

- [ ] **Step 5: Run focused tests and static type checks**

Run: `pnpm vitest run tests/content-v3/source.test.ts tests/seo/site-routes.test.ts && pnpm typecheck`

Expected: PASS.

- [ ] **Step 6: Run the first autonomous design/accessibility checkpoint**

Start the site in the existing in-app browser and inspect the new root and shell at 390, 768, and 1440 px. Check hierarchy, spacing, focus order, keyboard navigation, mobile menu, overflow, one-main semantics, and reduced motion. For visible design judgment, compare same-viewport screenshots of the prototype together with the captured current-site home reference (`/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/01-home.png`) in one review input; screenshots supplement, not replace, DOM/keyboard checks. Fix every P0/P1 and in-scope P2 finding before propagating the editorial primitives.

- [ ] **Step 7: Commit the personal-site pages**

```bash
git add components/marketing components/pages/v3-marketing-pages.tsx lib/content-v3/view-models.ts app/'(en)'/page.tsx app/'(en)'/work app/'(en)'/about app/'(en)'/contact lib/metadata.ts tests/content-v3/source.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: build v3 personal site pages"
```

### Task 6: Build Blog with one native article and one external note

**Files:**

- Create: `components/pages/content-detail-page.tsx`
- Create: `app/(en)/blog/page.tsx`
- Create: `app/(en)/blog/[slug]/page.tsx`

- [ ] **Step 1: Add route-param and external-note assertions**

Extend `source.test.ts` so `generateParams("article", "ru")` contains only `ai-platform-before-gpu`, while the Blog index contains both records and marks the Habr record external.
Build the Blog list through `getBlogViewModel(source)` from the pure view-model module; the page composition is the server-only boundary that imports the singleton.

- [ ] **Step 2: Run the test and confirm RED for the final view model**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: FAIL until the Blog view model and external marker exist.

- [ ] **Step 3: Build the Blog index**

Render a dated editorial row for the native article and an external-source row for Habr. External links must announce the source in visible text and use `target="_blank" rel="noreferrer"`; do not create `/blog/short-prompt-not-cheap`.

- [ ] **Step 4: Build the static native article route**

Set `dynamicParams = false`; `generateStaticParams()` must read the source adapter. `generateMetadata()` must use `type: "article"`, canonical local URL, published/updated dates, and no EN alternate. Render MDX within one editorial column, include author and dates, and link to `/ai-platform` at the end.

`ContentDetailPage` keeps `Сергей Нотевский` visible as author and includes the shared quiet Contact path; the same contract is reused by talk and project detail pages.

- [ ] **Step 5: Run typecheck and a production build**

Run: `pnpm typecheck && pnpm build`

Expected: both `/blog/` and `/blog/ai-platform-before-gpu/` are generated; no external-note route appears.

- [ ] **Step 6: Commit Blog**

```bash
git add app/'(en)'/blog components/pages/content-detail-page.tsx tests/content-v3/source.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: add v3 blog and native article"
```

### Task 7: Build Talks and Projects with one detail example each

**Files:**

- Modify: `app/(en)/talks/page.tsx`
- Create: `app/(en)/talks/[slug]/page.tsx`
- Modify: `app/(en)/projects/page.tsx`
- Create: `app/(en)/projects/[slug]/page.tsx`
- Modify: `components/pages/v3-marketing-pages.tsx`
- Modify: `components/pages/content-detail-page.tsx`

- [ ] **Step 1: Add source queries for local talk and project params**

Assert exact params:

```ts
expect(source.generateParams("talk", "ru")).toEqual([{ slug: "maas-vs-self-hosted" }]);
expect(source.generateParams("project", "ru")).toEqual([{ slug: "audit-prompt-caching" }]);
```

- [ ] **Step 2: Run the source test and confirm RED if a query is missing**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: RED until both typed queries are exposed, then GREEN.

- [ ] **Step 3: Build complete indexes**

Talks shows the one complete ROИИ exemplar plus a quiet link to the author’s public channel; it does not copy two additional recordings from the old manual catalog. Projects shows only `audit-prompt-caching` and its current public purpose; do not display live star/fork counts.

- [ ] **Step 4: Build detail pages with type-specific evidence**

Talk page: venue, organizer-verified event date, recording CTA, separately labeled upload date, five concise timestamped takeaways, and links to the map. Render the already-reviewed local thumbnail as the visible recording preview with its validated alt text and source-backed recording link. Project page: problem, fit, quick start, output, privacy boundary, limitations, license, verified release snapshot, GitHub CTA, related Prefix Cache component.

- [ ] **Step 5: Verify all four routes**

Run: `pnpm typecheck && pnpm build`

Expected: `/talks/`, `/talks/maas-vs-self-hosted/`, `/projects/`, and `/projects/audit-prompt-caching/` exist in `out/`.

- [ ] **Step 6: Commit Talks and Projects**

```bash
git add app/'(en)'/talks app/'(en)'/projects components/pages tests/content-v3/source.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: add v3 talks and projects"
```

### Task 8: Build the AI Platform landing and seven-area map

**Files:**

- Create: `components/ai-platform/platform-map.tsx`
- Create: `components/pages/ai-platform-pages.tsx`
- Create: `app/(en)/ai-platform/page.tsx`
- Create: `app/(en)/ai-platform/map/page.tsx`

- [ ] **Step 1: Test the map state**

Add a view-model assertion:

```ts
const map = getPlatformMapViewModel(source);
expect(map.areas).toHaveLength(7);
expect(map.areas.filter((area) => area.href)).toEqual([
  expect.objectContaining({ entityId: "inference-plane", statusLabel: "Доступно" })
]);
expect(map.areas.filter((area) => !area.href)).toHaveLength(6);
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: FAIL until the map view model is implemented.

- [ ] **Step 3: Build the AI Platform landing**

Explain that the product is a responsibility-and-decision reference, not a deployed topology and not one company’s architecture. Show the two entry modes: map and current vertical. Render the complete path `Inference Plane → Prefix Cache → synthetic case → audit-prompt-caching`.

- [ ] **Step 4: Build the map as semantic HTML**

Use a responsive ordered list/grid of seven real sections, not a handmade SVG or CSS diagram. Each cell contains purpose, responsibility boundary, and status. Follow the grid with a short semantic “Как области связаны” list covering Control Plane → Inference Plane, Context/Agent Runtime → Quality/Lifecycle, and Operations/Economics + Security/Ownership as cross-cutting responsibilities; present these as intersections, not strict topology. Only Inference Plane is a link. Keyboard order must follow reading order; at 390 px the map becomes a single column without horizontal scrolling.

- [ ] **Step 5: Run the reference-mode design/accessibility checkpoint**

Inspect `/ai-platform` and `/ai-platform/map` in the existing in-app browser at 390, 768, and 1440 px. Compare the prototype and the captured handbook/reference screenshot (`/Users/notevskii/.codex/visualizations/2026/07/21/019f8688-86f0-7411-b38d-77491051182f/site-strategy-audit/05-handbook.png`) together at the same viewport. Verify the map remains semantic, single-column on mobile, calm and legible rather than dashboard-dense, with working focus and no horizontal scroll. Fix every P0/P1 and in-scope P2 finding before using this reference system on detail pages.

- [ ] **Step 6: Verify build and link integrity manually**

Run: `pnpm typecheck && pnpm build`

Expected: `/ai-platform/` and `/ai-platform/map/` generate and every enabled map link resolves.

- [ ] **Step 7: Commit the reference entry points**

```bash
git add components/ai-platform components/pages/ai-platform-pages.tsx app/'(en)'/ai-platform tests/content-v3/source.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: add AI Platform landing and map"
```

### Task 9: Build one area, component, and synthetic case page

**Files:**

- Create: `components/pages/reference-detail-page.tsx`
- Create: `app/(en)/ai-platform/areas/[area]/page.tsx`
- Create: `app/(en)/ai-platform/components/[component]/page.tsx`
- Create: `app/(en)/ai-platform/cases/[case]/page.tsx`

- [ ] **Step 1: Test exact static params and missing-record behavior**

Assert one param for each reference type and no param for six draft areas. Exercise the pure getter with an unknown slug and expect `null`.

- [ ] **Step 2: Run focused tests and confirm RED for missing route helpers**

Run: `pnpm vitest run tests/content-v3/source.test.ts`

Expected: FAIL until all three query helpers exist.

- [ ] **Step 3: Build a common reference shell with type-specific sections**

Common header: breadcrumb, primary area where applicable, visible author `Сергей Нотевский`, type, review state/date, purpose, and boundary. A stale record renders a visible “Нужна повторная проверка” warning and never appears in featured blocks. Common footer: one deduplicated related list capped at four plus the shared quiet Contact path. Every reference page visibly renders sources, applicability, limitations, and last review date. Required middle sections:

- Area: purpose; included/excluded decisions; derived component inventory; workload distinctions; signals; trade-offs; dependencies and area intersections; related artifacts; next verification.
- Component: definition; problem/context; responsibility boundary; contracts and flows; implementation variants; observable signals; failure modes/degradation; trade-offs and anti-patterns; checklist; products/OSS roles; related cases and authored materials.
- Case: prominent “Синтетический кейс” label; context; observed symptom/decision; constraints and available data; hypotheses; chosen change; reproduced validation output; what the case proves; what it does not prove; related component/project/materials.

Add a pure structure test that passes each exemplar view model through `validateReferenceSections()` and fails when any required section key is absent. This protects the normative page shape without snapshotting prose.

- [ ] **Step 4: Build all three static routes**

Use `dynamicParams = false`, source-generated params, `notFound()` for unknown slugs, and canonical metadata. Prepare pure, typed inputs for future `TechArticle` and `BreadcrumbList` builders, but do not import or render the Task 10 JSON-LD code before it exists. The case title and description must include “синтетический” so it cannot be mistaken for a production outcome.

- [ ] **Step 5: Verify the full vertical**

Run: `pnpm typecheck && pnpm build`

Expected files:

```text
out/ai-platform/areas/inference-plane/index.html
out/ai-platform/components/prefix-cache/index.html
out/ai-platform/cases/agent-session-cache-reuse/index.html
```

- [ ] **Step 6: Commit reference detail pages**

```bash
git add components/pages/reference-detail-page.tsx app/'(en)'/ai-platform tests/content-v3/source.test.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: complete Prefix Cache reference vertical"
```

### Task 10: Add canonical metadata, JSON-LD, sitemap, robots, and RSS

**Files:**

- Create: `lib/seo/urls.ts`
- Create: `lib/seo/structured-data.ts`
- Create: `lib/seo/rss.ts`
- Create: `components/seo/json-ld.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/rss.xml/route.ts`
- Create: `tests/seo/structured-data.test.ts`
- Create: `tests/seo/rss.test.ts`

- [ ] **Step 1: Write URL, structured-data, and RSS tests**

Assert canonical trailing slashes, no alias/draft/external URLs in sitemap, native and external-note RSS behavior, deterministic descending date order, escaped XML, valid schema types, breadcrumbs, and safe JSON serialization:

```ts
expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>");
expect(rss).toContain("/blog/ai-platform-before-gpu/");
expect(rss).toContain("https://habr.com/ru/companies/bitrix/articles/1033822/");
```

- [ ] **Step 2: Run SEO tests and confirm RED**

Run: `pnpm vitest run tests/seo/structured-data.test.ts tests/seo/rss.test.ts`

Expected: FAIL because builders do not exist.

- [ ] **Step 3: Implement pure builders**

Build `Person` + `WebSite` for home, `BlogPosting` for the native article, `VideoObject` for the talk, `SoftwareSourceCode` for the project, `TechArticle` for reference pages, and `BreadcrumbList` for every detail page. The talk `VideoObject` uses the verified YouTube recording URL, upload date, and the production URL of the captured local thumbnail; it does not invent duration. Keep the organizer-verified event date in visible content rather than substituting it for `uploadDate`. Replace `<` with `\u003c` in serialized JSON. Use `https://notevskii.tech` as the production origin unless `NEXT_PUBLIC_SITE_URL` is set.

- [ ] **Step 4: Add static metadata routes**

`sitemap.ts` returns canonical top-level pages and published local content only. `robots.ts` allows `/`, points to `/sitemap.xml`, and does not block aliases because they carry page-level `noindex`. `rss.xml/route.ts` returns a build-time `Response` with `Content-Type: application/rss+xml; charset=utf-8` and `export const dynamic = "force-static"`; native items use the local canonical, while the external note uses its Habr `sourceUrl` as both link and guid.

- [ ] **Step 5: Wire JSON-LD into applicable pages**

The component accepts a validated object, calls the safe serializer, and sets `dangerouslySetInnerHTML` only on `<script type="application/ld+json">`. Never pass raw MDX or user input directly.

- [ ] **Step 6: Run SEO tests and build**

Run: `pnpm vitest run tests/seo && pnpm typecheck && pnpm build`

Expected: tests PASS and `out/sitemap.xml`, `out/robots.txt`, and `out/rss.xml` exist.

- [ ] **Step 7: Commit SEO surfaces**

```bash
git add lib/seo components/seo app/sitemap.ts app/robots.ts app/rss.xml tests/seo lib/metadata.ts .agent/V3_TIME_BUDGET.md
git commit -m "feat: add v3 discovery and structured metadata"
```

### Task 11: Make route migration explicit and reversible

**Files:**

- Create: `config/v3-route-manifest.json`
- Create: `config/v3-export-auxiliary-paths.json`
- Create: `lib/migration/manifest.ts`
- Create: `components/routing/static-alias-page.tsx`
- Create: `tests/migration/manifest.test.ts`
- Create: `tests/migration/static-aliases.test.ts`
- Create: `scripts/snapshot-route-manifest.mjs`
- Create: `scripts/apply-static-aliases.mjs`
- Modify: `app/(en)/writing/page.tsx`
- Modify: `app/(en)/handbook/[[...slug]]/page.tsx`
- Modify: `package.json`

- [ ] **Step 1: Write manifest parser and alias tests**

Every exported HTML route receives one exact record using `source`, `destination`, `behavior`, and `locale`. The parser accepts the normative behavior enum `keep | static-alias | merge | archive | remove-after-verification`. The four selected v3 mappings are exact `static-alias` records:

```json
[
  { "source": "/writing", "destination": "/blog", "behavior": "static-alias", "locale": "ru" },
  { "source": "/handbook", "destination": "/ai-platform", "behavior": "static-alias", "locale": "ru" },
  { "source": "/handbook/platform-map", "destination": "/ai-platform/map", "behavior": "static-alias", "locale": "ru" },
  { "source": "/handbook/caching/prefix-cache", "destination": "/ai-platform/components/prefix-cache", "behavior": "static-alias", "locale": "ru" }
]
```

All other exported routes receive their own exact `keep` or exact `/ru/...` `static-alias` decision. Reject duplicate sources, root aliases, missing destinations for `static-alias`, non-null destinations for `keep`, cycles/chains, and any manifest whose exact source set differs from the export’s HTML route set. `validateManifest(records, knownCanonicalPaths)` receives an injected set combining `getCanonicalStaticRoutes()` with registry-derived published local paths; `site-routes.ts` never imports the MDX source.

- [ ] **Step 2: Run migration tests and confirm RED**

Run: `pnpm vitest run tests/migration/manifest.test.ts`

Expected: FAIL because the parser and manifest do not exist.

- [ ] **Step 3: Implement exact lookup and destination flattening**

Expose `getDecisionByPath(path): RouteDecision | null`, `getAliasByPath(path): RouteAlias | null`, `resolveCanonicalDestination(path): string`, and `getAllRouteDecisions()`. Normalize one trailing slash for comparison; keep output paths slash-safe. A destination resolver follows exact records until a `keep` canonical and rejects chains in the persisted final manifest.

- [ ] **Step 4: Generate and review the full exact route inventory**

Create `config/v3-export-auxiliary-paths.json` with the exact relative files `404.html`, `404/index.html`, and `_not-found/index.html`. These are framework-generated non-indexable artifacts, not canonical routes. Both snapshot and audit load this one shared set.

Write `snapshot-route-manifest.mjs` with Node built-ins. It enumerates every `out/**/index.html` plus top-level `.html` route, omits only the shared auxiliary-export files before converting files to routes, assigns `keep`, applies the four selected v3 overrides, maps `/ru` directly to `/`, and converts every legacy `/ru/...` route to a direct root canonical destination. It flattens `/ru/writing`, `/ru/handbook`, `/ru/handbook/platform-map`, and `/ru/handbook/caching/prefix-cache` directly to the final v3 destination. Sort records by source and write `config/v3-route-manifest.json` deterministically. Exercise this `.mjs` CLI from Vitest as a black box with `node:child_process` `spawnSync` and temporary fixture trees—including simultaneous `404.html` and `404/index.html`—and prove neither duplicate route enters the manifest; do not import untyped `.mjs` code into TypeScript while `allowJs` is false.

Run: `pnpm build && node scripts/snapshot-route-manifest.mjs out config/v3-route-manifest.json`

Expected: one exact manifest record per exported HTML route, no wildcard source, and explicit records for all 40 legacy handbook documents, all `/ru/**`, all `/en/**`, and all tool routes.

- [ ] **Step 5: Implement honest alias bodies with explicit landmark ownership**

Create a landmark-neutral `StaticAliasBody` that renders only the concise explanation and normal target link. `/writing` composes it inside `MarketingPage`, so the marketing shell owns the skip link and the sole `main#main-content`. Handbook aliases compose the same body inside a docs-specific direct grid-area `<main id="main-content">`, while the handbook layout owns the skip link. Never put a second main inside either composition. Metadata must set target canonical and `robots: { index: false, follow: true }`. Do not force a framework-level redirect or depend on JavaScript; meta refresh is optional and omitted from these Next-rendered exact aliases. Do not claim HTTP 301/308.

- [ ] **Step 6: Wire the four selected exact aliases without disturbing other legacy handbook pages**

`/writing` always renders the marketing-shell alias composition. In the optional handbook catchall, resolve the requested path first; render the docs alias composition for the three exact manifest entries, otherwise execute the existing landing/MDX behavior unchanged. Add focused rendered-markup tests for both forms before post-build rewriting: each has one skip link and exactly one `main#main-content`, with no nested main.

- [ ] **Step 7: Materialize every exact static alias after export**

Write `apply-static-aliases.mjs` with Node built-ins. Iterate manifest records with `behavior: static-alias`, verify each source file and final canonical target file exist, and replace only the exported source with self-contained alias HTML containing `lang`, title, description, a skip link, exactly one `<main id="main-content">`, target canonical, `noindex,follow`, visible link, and meta refresh. Refuse to write outside `out/`; reject duplicate sources, traversal, missing targets, alias chains, and any alias source that collides with a `keep` canonical path. Multiple alias sources may intentionally share one final canonical destination—for example `/writing` and `/ru/writing` both target `/blog`. Never rewrite a `keep` file.

Add `tests/migration/static-aliases.test.ts` with `spawnSync` black-box fixtures covering `/ru` → `/`, `/ru/about`, `/ru/handbook`, a missing target, path traversal rejection, one skip link, and exactly one `main#main-content` in every rewritten alias.

- [ ] **Step 8: Make `pnpm build` produce the final alias state**

Set:

```json
"build": "next build --webpack && node scripts/apply-static-aliases.mjs out"
```

The script is idempotent so repeated local and CI builds produce the same output.

- [ ] **Step 9: Run migration tests and production build**

Run: `pnpm vitest run tests/migration && pnpm typecheck && pnpm build`

Expected: manifest coverage equals the exported pre-alias route inventory; every exact alias has final target canonical + `noindex`; all `keep` handbook, `/en/**`, and tool pages still build.

- [ ] **Step 10: Commit migration**

```bash
git add config/v3-route-manifest.json config/v3-export-auxiliary-paths.json lib/migration components/routing scripts/snapshot-route-manifest.mjs scripts/apply-static-aliases.mjs app/'(en)'/writing app/'(en)'/handbook tests/migration package.json .agent/V3_TIME_BUDGET.md
git commit -m "feat: add static v3 route aliases"
```

### Task 12: Add a focused static-export contract audit

**Files:**

- Create: `scripts/check-static-export.mjs`
- Create: `tests/build/static-export-contract.test.ts`
- Modify: `package.json`
- Modify: `.github/workflows/pages.yml`

- [ ] **Step 1: Write fixture-based audit tests**

Create temporary HTML fixtures with controlled tags. Verify the audit reports:

- missing or duplicate canonical on indexable v3 pages;
- a broken internal `href`;
- an internal fragment whose target `id` is absent;
- missing `lang`, `<title>`, description, or exactly one `<main>`;
- alias without one skip link, exactly one `<main id="main-content">`, `noindex`, or target canonical;
- a manifest source file or final destination file missing from `out/`;
- sitemap URL without an exported file;
- RSS item URL that is neither an exported local file nor an HTTPS external URL already rendered as a visible link in canonical HTML;
- a local URL in JSON-LD without an exported file, or an external URL not already rendered as a visible link/source asset on its canonical v3 page;
- raw `</script>` inside a JSON-LD payload.

The landmark/canonical/description checks apply to indexable canonical pages and static aliases. Load the shared auxiliary-export set and exclude `out/404.html`, `out/404/index.html`, and `out/_not-found/index.html` from page-level assertions because they are non-indexable error artifacts with no page main/canonical. Still reject any of them if it appears in sitemap, RSS, the manifest source/destination set, or a JSON-LD URL. Include a fixture with both duplicate 404 artifacts.

- [ ] **Step 2: Run the audit test and confirm RED**

Run: `pnpm vitest run tests/build/static-export-contract.test.ts`

Expected: FAIL because the audit module/CLI does not exist.

- [ ] **Step 3: Implement a bounded Node-built-in audit**

Use `node:fs`, `node:path`, and `node:url`. Inspect only deterministic tags/attributes emitted by this app; do not attempt to build a general HTML parser. Resolve internal links and fragments relative to their exporting page and read the exact alias manifest. Build the permitted external URL set from HTTPS `href`/`src` values already emitted by canonical v3 pages, so the audit does not duplicate content metadata, inherit arbitrary legacy links, or import MDX in Node. The talk thumbnail is a local exported asset, so its JSON-LD URL is validated as a local file rather than allowlisted as an external exception. Return route-scoped diagnostics and exit 1 when any contract fails.

Exercise `scripts/check-static-export.mjs` as a CLI through `spawnSync` against temporary fixture trees; do not import the untyped `.mjs` module into TypeScript.

- [ ] **Step 4: Add scripts and CI gate**

Add:

```json
"verify:export": "node scripts/check-static-export.mjs out",
"verify": "pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm verify:export"
```

Keep the Task 11 `build` pipeline (`next build --webpack` followed by exact-alias materialization). Add `pnpm verify:export` immediately after `pnpm build` in Pages CI.

- [ ] **Step 5: Prove the gate catches a real failure**

Run `pnpm build`, temporarily change one fixture-generated internal link in `out/` to `/missing-contract-target/`, run `pnpm verify:export`, and confirm non-zero exit with that URL. Re-run `pnpm build` to restore `out/`, then confirm `pnpm verify:export` exits 0. Do not commit `out/`.

- [ ] **Step 6: Commit the gate**

```bash
git add scripts/check-static-export.mjs tests/build/static-export-contract.test.ts package.json .github/workflows/pages.yml .agent/V3_TIME_BUDGET.md
git commit -m "test: audit static export contracts"
```

### Task 13: Finish brand asset, documentation, and content safety

**Files:**

- Modify: `public/og-image.svg`
- Modify: `README.md`
- Modify: `.agent/STATUS.md`
- Modify: `.agent/PROJECT_SPEC.md`
- Modify: `.agent/DESIGN_SPEC.md`
- Modify: `.agent/CONTENT_MODEL.md`
- Modify: `.agent/IMPLEMENTATION_PLAN.md`
- Modify: `.agent/V3_TIME_BUDGET.md`
- Create: `docs/superpowers/templates/2026-v3-private-evidence-log-template.md`

- [ ] **Step 1: Update the existing OG source asset**

Keep the existing SVG dimensions, background, grid, and typographic construction. Change visible wording to `Сергей Нотевский`, `AI Platform Lead`, and `Blog · Materials · AI Platform`. This is an edit of an existing source asset, not a new approximation.

- [ ] **Step 2: Run the final forbidden-claim scan**

Search the v3 content for forbidden or risky claims:

Run: `rg -n "10M|100\+ GPU|в нашей платформе|в Битрикс24 мы|для нашего клиента|эконом(ия|ический эффект) состав|гарантированный SLA поддержки" content/v3 components/pages`

Expected: no matches and therefore no internal scale/topology/outcome claims. Review contextual technical uses of “GPU” separately: they are allowed only when they explain a decision, not a company fact. Do not repeat the completed style pass here; re-open the Task 3 review artifact and verify that later UI edits did not change approved claims, metric names, or commands.

- [ ] **Step 3: Document the new authoring path**

README must explain how to add one v3 record, permitted statuses, relation syntax, why external notes have no local route, how to run `pnpm verify`, and that expansion requires the pilot review gate. Document the operating ceiling: at most one substantial new or revised artifact per month, quarterly review of the map/reviewed records, small metadata/link fixes as needed, and no more than one support hour per week; translation is selective, never assumed parity.

- [ ] **Step 4: Create the private measurement handoff and time ledger**

The blank evidence-log template contains: actual public deployment date/baseline; date; source; named artifact; signal type; whether the contact meets the qualified-opportunity definition; next agreed step; deduplication key; weekly authoring hours; weekly support hours; and notes. It repeats the exact expand thresholds (3 independent applications, 2 qualified inbound requests naming an artifact, 2 organic citations/recommendations; at least two of the three signal classes) and `expand | improve | no-expand | stop` decisions. State prominently that a filled log may contain personal data and must remain private/off-repo.

Reconcile `.agent/V3_TIME_BUDGET.md` against all milestone updates and the 32+8 allocation above. Record consumed author attention separately from agent runtime; if the user did not spend time on a milestone, record 0 rather than inventing effort. Stop and de-scope optional polish before projected author attention exceeds 40 hours.

- [ ] **Step 5: Mark old agent docs as superseded, not deleted**

Add the same short note at the top of each old `.agent` spec/plan: product direction is superseded by the accepted v3 spec and implementation plan, while the file remains historical context. Update `.agent/STATUS.md` with completed milestones, commits, tests, and any remaining non-critical limitation.

- [ ] **Step 6: Run documentation and content checks**

Run: `rg -n "TODO|TBD|placeholder|lorem" content/v3 components/pages/v3-marketing-pages.tsx components/pages/ai-platform-pages.tsx components/pages/content-detail-page.tsx components/pages/reference-detail-page.tsx README.md`

Expected: no unresolved implementation placeholders; occurrences inside historical quotations are explained or removed.

- [ ] **Step 7: Commit documentation and brand asset**

```bash
git add public/og-image.svg README.md .agent/V3_TIME_BUDGET.md .agent/STATUS.md .agent/PROJECT_SPEC.md .agent/DESIGN_SPEC.md .agent/CONTENT_MODEL.md .agent/IMPLEMENTATION_PLAN.md docs/superpowers/templates/2026-v3-private-evidence-log-template.md content/v3 components/pages
git commit -m "docs: finalize v3 product handoff"
```

### Task 14: Review the implementation to convergence and verify the release candidate

**Files:**

- Create: `docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-implementation-review.md`
- Modify: any file implicated by a review finding
- Modify: `.agent/STATUS.md`

- [ ] **Step 1: Run three independent reviews**

Dispatch separate reviewers with non-overlapping jobs:

1. Spec/product/content reviewer: trace every normative requirement and check claim safety, honest statuses, route scope, and vertical coherence.
2. UI/accessibility reviewer: inspect 390, 768, and 1440 px; check visual hierarchy, spacing, focus, keyboard order, mobile menu, overflow, one-main semantics, and reduced-motion behavior.
3. Code/SEO/static-export reviewer: inspect registry invariants, route generation, metadata, aliases, sitemap/RSS/JSON-LD, legacy preservation, and test gaps.

Record each finding with `P0`–`P3`, evidence, affected file, and proposed correction.

- [ ] **Step 2: Fix every P0/P1 and justified P2 finding**

For each accepted finding, write or extend a failing test where behavior is testable, observe RED, make the smallest correction, and observe GREEN. Immediately stage only the exact test/implementation paths changed for that finding and commit them with `fix: address <finding-id>` before moving to the next finding. Reject suggestions that expand the frozen scope and record the reason.

- [ ] **Step 3: Repeat review until converged**

Convergence means: no P0/P1 open; no unaddressed P2 that affects the pilot task; all rejected findings have an explicit scope/evidence reason; no regression in legacy tools/handbook build.

- [ ] **Step 4: Run the complete automated gate from a clean build**

Run: `pnpm verify`

Expected:

```text
eslint: exit 0
fumadocs-mdx + next typegen + tsc: exit 0
vitest: all tests pass
next build --webpack: exit 0
static export audit: exit 0
```

- [ ] **Step 5: Run the representative user journey**

Start: `pnpm dev`

Verify with the existing in-app browser, using the same source/reference screenshots and viewports:

```text
/ -> /ai-platform -> /ai-platform/map
-> /ai-platform/areas/inference-plane
-> /ai-platform/components/prefix-cache
-> /ai-platform/cases/agent-session-cache-reuse
-> /projects/audit-prompt-caching
```

Also verify `/blog`, the native article, the external Habr link, the talk page, Contact, skip link, mobile navigation, and all four alias pages. Capture final desktop and mobile screenshots for review evidence; do not treat screenshots alone as QA.

- [ ] **Step 6: Pass the six-reader usability gate before launch acceptance**

Ask six real target readers, without explanation, to start at the AI Platform map and within three minutes reach Prefix Cache, identify its responsibility, name one observable signal, and choose one next verification action. At least five of six must complete the whole task. Record only anonymized aggregate outcomes and corrections, never invented participants. If the check is unavailable or scores below 5/6, the implementation may be labeled only `technical release candidate`; mark human validation as an open launch blocker and do not call the pilot accepted or launch-ready.

- [ ] **Step 7: Update status and commit review fixes**

```bash
git add docs/superpowers/reviews/2026-07-22-notevskii-tech-v3-implementation-review.md .agent/STATUS.md .agent/V3_TIME_BUDGET.md
git commit -m "fix: converge v3 implementation review"
```

## Final implementation and launch checklist

All technical/content items may produce a `technical release candidate`. The final human-validation item is additionally required before `pilot accepted` or `launch-ready` status.

- [ ] A visitor can identify Sergey, his public role, and the three entrances within ten seconds.
- [ ] Blog, Materials, Talks, Projects, About, Contact, AI Platform, and map are complete—not empty catalogs.
- [ ] Exactly one native article, talk, project, area, component, and case detail is exported.
- [ ] The external Habr note never receives a local detail route.
- [ ] Six planned areas are honest non-links; Inference Plane is the only available area detail.
- [ ] The Prefix Cache vertical connects map, area, component, synthetic case, project, and article without dead ends.
- [ ] No confidential company detail or unsupported outcome claim is published.
- [ ] New RU routes do not advertise nonexistent EN alternates.
- [ ] Aliases are visibly honest, `noindex,follow`, and target-canonical.
- [ ] Sitemap, robots, RSS, JSON-LD, and canonical URLs pass the static audit.
- [ ] Keyboard, focus, mobile navigation, landmarks, and 390/768/1440 layouts pass review.
- [ ] Legacy `/en/**`, non-aliased handbook pages, and client-side tools still build.
- [ ] `pnpm verify` exits 0.
- [ ] Human six-reader validation passes at least 5/6 before the status is `pilot accepted` or `launch-ready`; otherwise status remains `technical release candidate` with an open launch blocker.

## Post-launch gate (not part of this implementation)

Run the pilot for 6–8 weeks and keep a private, manual evidence log. Expand by at most two reviewed materials or one next vertical only after the review finds repeat use or concrete demand. By 31 December 2026, evaluate the strategy against at least three new qualified professional opportunities and at least five independent application/citation/recommendation signals generated after launch; do not substitute page views or social impressions for those outcomes.
