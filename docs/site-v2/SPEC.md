# notevskii.tech v2 — Product and Technical Specification

Status: **ready for visual exploration and implementation planning**  
Depends on: [`GOAL.md`](./GOAL.md)

## 1. Product definition

`notevskii.tech` is an author-led field guide for production AI platforms.

The hierarchy is:

1. **Field guide** — maps, reviewed chapters, tools and templates.
2. **Author** — identity, practice and verifiable evidence that make the guide credible.
3. **Materials** — articles, talks, podcasts and repositories that extend or support the guide.
4. **Contact** — architecture review, collaboration, interview, podcast and conference requests.

The site must never present these four layers as equally competing products.

## 2. Brand architecture

### Master brand

Russian: `Сергей Нотевский`  
English: `Sergei Notevskii`

### Product name

Russian: `Production AI Platform Field Guide` is allowed as a product mark, but descriptive Russian copy is primary: `Практический хэндбук по ИИ-платформам в продакшене`.

English: `Production AI Platform Field Guide`.

### Core line

Russian:

> От симптома в продакшене — к инженерному решению.

English:

> From a production symptom to an engineering decision.

### Supporting thesis

> Модель заменяема. Платформа накапливает эффект.

The existing thesis “Production AI is not a model. It is a platform.” remains valid inside the field guide but is not the only homepage message.

## 3. Information architecture

### Primary navigation

Desktop and mobile:

1. `Хэндбук` / `Field guide`
2. `Инструменты` / `Tools`
3. `Материалы` / `Materials`
4. `Обо мне` / `About`

Persistent secondary actions:

- locale switch;
- primary CTA: `Обсудить задачу` / `Discuss a problem`.

The logo links to the homepage. There is no separate “Главная” item.

### Canonical route tree

```text
/
├── handbook/
│   ├── map/
│   ├── start/
│   ├── strategy/
│   │   └── maas-vs-self-hosted/
│   ├── routing/
│   │   └── execution-routing/
│   ├── inference/
│   │   ├── runtime/
│   │   ├── stt/
│   │   └── embeddings/
│   ├── cache/
│   │   └── prefix-cache/
│   ├── quality/
│   │   └── release-gate/
│   ├── observability/
│   │   └── telemetry-contract/
│   ├── economics/
│   │   └── cost-per-accepted-outcome/
│   ├── security/
│   │   └── guardrails/
│   └── ownership/
│       └── operating-model/
├── tools/
│   ├── cacheability-review/
│   ├── cost-model/
│   └── release-readiness-review/
├── materials/
│   ├── articles/
│   ├── talks/
│   ├── podcasts/
│   └── open-source/
├── about/
├── contact/
└── en/
    └── selective equivalent routes
```

### Legacy migration

A versioned redirect manifest must map every current public route to a v2 route. The manifest is testable data, not ad hoc configuration.

Required behavior:

- current Russian root routes redirect or remain canonical;
- `/en/...` remains the English prefix;
- `/ru/...` aliases are removed from the application tree and redirected permanently;
- renamed handbook paths redirect permanently;
- no current indexed route returns an unexplained 404 at cutover.

## 4. Homepage specification

### Purpose

The homepage must answer in the first viewport:

1. who Сергей is;
2. which problem domain he owns;
3. what useful action the visitor can take.

### Section H1 — Hero

Required content:

- author name;
- role: `AI Platform Lead`;
- one-sentence product promise;
- primary CTA: `Открыть карту ИИ-платформы`;
- secondary CTA: `Обсудить задачу`;
- one compact authority signal row.

Prohibited:

- three or more equal CTA buttons;
- a long list of platform layers;
- generic claims such as “эксперт в AI”;
- unverifiable employer metrics;
- decorative dashboard mockups.

### Section H2 — Evidence

Show 3–5 verified evidence items. Each item must link to a public artifact or explain its source.

Eligible evidence:

- authored field guide;
- selected technical articles;
- conference recordings;
- open-source diagnostics;
- current role and public speaker profile.

Ineligible evidence:

- topic labels presented as proof;
- anonymous testimonials;
- invented counts;
- internal confidential scale.

### Section H3 — Signature platform map

The map is the main visual and navigational object.

It shows 12 platform responsibilities:

1. product scenarios;
2. AI gateway;
3. provider strategy;
4. execution routing;
5. inference runtime;
6. caching;
7. model lifecycle;
8. quality and release control;
9. observability;
10. economics / FinOps;
11. security and guardrails;
12. operations and ownership.

Each layer exposes on interaction:

- purpose;
- typical symptom;
- primary metric;
- expected owner;
- link to the relevant artifact.

Requirements:

- usable by keyboard;
- meaningful without hover;
- static fallback for no-JS and print;
- supports deep-linking to a layer using a URL fragment;
- used consistently in homepage, handbook and OG assets.

### Section H4 — Start from a problem

Show no more than six problem routes. Launch set:

- cost;
- quality;
- latency and capacity;
- routing and agents;
- cache;
- ownership.

Each route has:

- symptom in user language;
- one-sentence diagnosis frame;
- primary artifact;
- optional tool.

### Section H5 — Selected artifacts

Show exactly three editorially selected items:

- foundation;
- practical tool/template;
- recently updated artifact.

Selection is controlled by frontmatter, not hardcoded in the page component.

### Section H6 — Author and contact

Compact author statement with one restrained portrait or speaker image.

Actions:

- architecture review / technical collaboration;
- talk, podcast or interview.

## 5. Field guide specification

### `/handbook`

Purpose: orient a visitor and route them to the correct artifact.

Required sequence:

1. concise promise;
2. platform map;
3. problem routes;
4. reviewed core artifacts;
5. tools and templates;
6. all-materials link.

Excluded from the landing page:

- reading progress;
- bookmarks;
- role filter wall;
- planned items mixed with available items;
- repeated full platform-layer lists;
- more than one search control.

### Catalogue

A catalogue may exist below the fold or on a dedicated route.

Filters:

- problem;
- platform layer;
- format;
- maturity status.

Role is metadata and a secondary filter, not the primary entry model.

Search operates over generated static content metadata. A local client-side index is acceptable. A backend search service is not required for launch.

### Artifact content model

Every artifact has frontmatter validated at build time.

```yaml
title: string
shortTitle: string
description: string
locale: ru | en
translationKey: string
kind: map | chapter | checklist | template | tool-guide | case-note
status: draft | reviewed | maintained | archived
platformLayers: string[]
problems: string[]
audiences: string[]
tags: string[]
publishedAt: YYYY-MM-DD
reviewedAt: YYYY-MM-DD | null
updatedAt: YYYY-MM-DD
reviewCycleDays: number | null
featured: none | foundation | practical | recent
related: string[]
references: boolean
```

Derived values such as URL, locale counterpart, stale status, catalogue membership and related cards must not be duplicated manually.

### Artifact status behavior

- `draft`: accessible by direct URL only unless explicitly featured for review; clearly labelled;
- `reviewed`: publicly discoverable;
- `maintained`: reviewed and inside its review interval;
- `archived`: retained for history, excluded from normal recommendations.

A stale maintained artifact automatically receives a “review due” indicator in author checks; it does not silently become current.

### Standard reviewed chapter structure

1. Executive summary
2. When this applies
3. Symptoms
4. Mental model
5. Decision path
6. Reference architecture or diagram
7. Metrics and telemetry contract
8. Trade-offs
9. Failure modes and anti-patterns
10. Review checklist
11. Example or sanitized case
12. Reusable template/tool
13. Related artifacts
14. References
15. Last reviewed

Not every draft must implement every section, but a `reviewed` chapter must either contain them or explicitly mark a section as not applicable.

### Launch core artifacts

Required reviewed Russian launch set:

1. Production AI Platform Map
2. Start from the problem
3. MaaS vs self-hosted
4. Cost per accepted outcome
5. Prefix cache and request shape
6. AI release quality gate
7. LLM observability telemetry contract
8. Ownership and operating model

Optional launch additions only if they meet the same review bar:

- inference runtime;
- execution routing;
- guardrails.

## 6. Tools specification

All tools:

- run locally in the browser;
- make no network request containing entered data;
- disclose their assumptions;
- distinguish measurements from heuristics;
- validate values and impossible combinations;
- provide a reset action;
- provide named examples;
- provide links to explanatory artifacts;
- expose results accessibly;
- support copying or exporting a sanitized report;
- emit only privacy-safe analytics events such as `tool_started` and `tool_completed`.

### T1 — Cacheability Review

Inputs:

- system/developer prompt;
- tool schema;
- two or more representative request prefixes;
- optional normalized agent-step trace containing hashes and field names.

Outputs:

- stable-prefix similarity;
- dynamic-field placement findings;
- schema volatility findings;
- agent-step hash drift;
- risk categories;
- recommendations tied to exact detected input regions;
- explicit statement that actual cache hit rate cannot be inferred without runtime telemetry.

The tool must not present one opaque score as the primary result. A score may exist only as a secondary summary with documented weights.

### T2 — Cost Model

The domain model must distinguish:

- total input tokens;
- reusable prefix tokens;
- cache hit rate across requests;
- uncached input price;
- cached input price;
- output tokens and price;
- request volume;
- agent steps distribution;
- retry rate;
- fallback route and fallback cost;
- accepted-result rate;
- optional self-hosted fixed and non-production capacity costs.

Outputs:

- cost per request;
- cost per session;
- cost per accepted result;
- cache savings;
- retry overhead;
- fallback overhead;
- scenario comparison;
- sensitivity to cache hit rate and accepted-result rate;
- assumptions summary.

Validation:

- no negative quantities or prices;
- percentages are 0–100;
- reusable prefix tokens cannot exceed input tokens;
- accepted-result rate zero produces “undefined / no accepted results”, not a misleading zero cost;
- missing values do not silently convert to zero;
- all formulas have unit tests and documented equations.

### T3 — Release Readiness Review

Assessment dimensions:

- dataset and coverage;
- error taxonomy;
- offline evaluation;
- regression thresholds;
- routing evaluation;
- long-context evaluation;
- canary plan;
- rollback/fallback;
- observability;
- ownership and approval.

Each item records:

- state: not assessed / missing / partial / ready / not applicable;
- evidence note;
- owner;
- criticality.

Decision states:

- Blocked;
- Conditional rollout;
- Canary ready;
- Production ready.

Rules:

- critical blockers override percentage summaries;
- no item is pre-completed;
- the recommendation explains which blockers caused the state;
- export includes evidence and owner fields.

## 7. Materials specification

Replace separate top-level Writing, Talks and Projects products with one Materials surface.

Kinds:

- article;
- talk;
- podcast/interview;
- open-source project;
- case note.

Each material includes:

- title;
- summary written for the site;
- publication date;
- external source;
- format;
- related platform layers and problems;
- language;
- optional recording/slides/repository links;
- verification status.

The materials page supports format and topic filters. It must not duplicate the full field-guide catalogue.

## 8. About and contact

### About

Must answer:

- current professional focus;
- path into production AI platform work;
- concrete areas of practice;
- principles and point of view;
- selected evidence;
- speaker/author information.

Avoid:

- generic biography chronology;
- self-assigned superlatives;
- confidential internal claims;
- duplicate homepage copy.

### Contact

Primary request types:

- architecture review;
- technical collaboration;
- conference talk;
- podcast/interview;
- editorial contribution.

The page explains what context to include:

- problem or audience;
- expected format;
- desired outcome;
- time horizon;
- relevant links.

Primary channel at launch: Telegram direct message. Email may be added only if a public address is intentionally provided.

## 9. Visual and interaction system

### Direction

`Editorial control plane`: a restrained technical publication with system diagrams, explicit hierarchy and operational states.

### Preserve

- dark technical identity;
- thin structural lines;
- monospace metadata;
- restrained cyan accent;
- low-animation character;
- strong diagram orientation.

### Change

- reduce repeated card grids;
- use typography, spacing and diagrams as primary hierarchy;
- differentiate marketing, reading and tool workspaces;
- reserve cyan for actions, links and active system relationships;
- introduce a semantic warning/risk token;
- create a real wordmark or platform-map mark instead of relying only on `SN`;
- use one restrained author portrait where trust benefits.

### Surface modes

1. **Marketing:** wider layout, large positioning and signature map.
2. **Reading:** 680–760px prose column, persistent but non-invasive outline, references and artifact metadata.
3. **Tool workspace:** wide two-panel layout with input, assumptions, results and export.
4. **Print/export:** light or print-safe mode with no navigation chrome.

### Responsive behavior

- no horizontal overflow at 320px;
- platform map has an accessible mobile list/accordion mode;
- all actions remain reachable with one thumb column;
- tables receive deliberate mobile transformations, not blind horizontal clipping;
- tool results follow inputs on mobile;
- target touch size >= 44×44 CSS px.

## 10. Accessibility requirements

Release gates:

- exactly one `<main>` landmark;
- skip link;
- labelled navigation;
- current page uses `aria-current`;
- filter controls expose state via native radio/checkbox semantics or `aria-pressed`;
- all inputs have programmatic labels and descriptions;
- dynamic results use appropriate live/status semantics without excessive announcements;
- all interactive diagrams are keyboard operable;
- information is not encoded by colour alone;
- visible focus meets contrast requirements;
- reduced-motion preference is respected;
- heading hierarchy has no unexplained jumps;
- automated accessibility checks on all core templates;
- manual keyboard and VoiceOver/NVDA smoke tests on homepage, chapter and each tool.

Target: WCAG 2.2 AA for launch surfaces.

## 11. SEO and distribution

Required generated artifacts:

- sitemap;
- robots;
- RSS/Atom for reviewed updates and materials;
- canonical URL;
- hreflang for actual translation pairs only;
- Open Graph image per page type;
- JSON-LD:
  - Person;
  - WebSite;
  - TechArticle/Article;
  - BreadcrumbList;
  - SoftwareApplication for tools where valid.

Rules:

- master site name is the author brand;
- field guide is a named product inside the site;
- draft content is excluded from sitemap unless explicitly public;
- archived content remains indexable only when still useful and clearly marked;
- structured data must match visible page content;
- pages use meaningful Russian titles rather than unnecessary mixed-language branding.

Distribution support:

- stable fragment links to diagram layers and chapter sections;
- copy-link action;
- share image designed for Telegram and social previews;
- print/PDF-friendly artifact views;
- canonical links suitable for talks and articles.

## 12. Analytics and privacy

Analytics is optional but recommended for validating the goal.

Allowed event examples:

- `home_map_opened` with layer id;
- `problem_route_opened` with problem id;
- `artifact_opened` with artifact id;
- `tool_started` and `tool_completed` with tool id;
- `contact_opened` with request type;
- `external_material_opened` with material id.

Forbidden:

- prompt, schema, trace, evidence note or any free-text tool input;
- full URLs containing private query data;
- fingerprinting;
- cross-site advertising identifiers.

The privacy statement must accurately describe the deployed analytics implementation.

## 13. Technical architecture

### Stack decision

Keep:

- Next.js App Router;
- TypeScript;
- React;
- Tailwind;
- MDX/content collections;
- static export;
- GitHub Actions and GitHub Pages unless deployment needs change for a demonstrated requirement.

Do not migrate frameworks as part of v2 without a measured blocking problem.

### Target structure

```text
app/
  (ru-site)/
  en/
content/
  handbook/
    ru/
    en/
  materials/
    ru/
    en/
features/
  home/
  platform-map/
  handbook/
  tools/
  materials/
  about/
  contact/
components/
  shell/
  editorial/
  diagrams/
  forms/
  ui/
lib/
  content/
  i18n/
  seo/
  redirects/
  analytics/
  tools/
tests/
  unit/
  content/
  integration/
  e2e/
  accessibility/
  visual/
```

### Rendering

- pages and content render statically;
- JavaScript is limited to map interaction, filters, search and tools;
- essential content and navigation remain usable without client hydration;
- no server actions, API routes, auth or database at launch.

### Content derivation

One content pipeline generates:

- catalogue entries;
- routes;
- related items;
- featured selections;
- translation relationships;
- sitemap entries;
- RSS entries;
- structured data;
- stale-review reports.

Manual duplicate catalogues are prohibited.

### Localization

- Russian is canonical at root;
- English is under `/en`;
- only actual translations receive hreflang counterparts;
- `translationKey` joins pairs;
- missing English translation is valid and does not block Russian publication;
- navigation and common UI copy are typed locale modules;
- long content stays in MDX/data files, not one monolithic dictionary.

## 14. Quality and test plan

### Unit tests

- tool formulas;
- validation rules;
- status derivation;
- URL localization;
- redirect manifest;
- content relationship derivation.

### Content tests

- frontmatter schema;
- unique translation keys per locale;
- valid related ids;
- no reviewed placeholder content;
- references required for reviewed factual material;
- featured-slot constraints;
- review dates;
- no orphan reviewed content.

### Integration tests

- generated catalogue matches MDX;
- route metadata;
- canonical and hreflang pairs;
- sitemap and RSS;
- draft/archived discovery rules;
- redirect coverage.

### End-to-end tests

Core flows:

1. homepage → problem route → chapter → tool;
2. homepage → map layer → artifact;
3. materials filter → external source;
4. chapter locale counterpart where available;
5. each tool input → result → reset → export;
6. contact request action;
7. mobile navigation.

### Visual regression

Required viewports:

- 390×844;
- 768×1024;
- 1440×900.

Templates:

- homepage;
- handbook landing;
- chapter;
- catalogue/materials;
- each tool;
- about/contact.

### Performance budgets

Measured on production-like static output, mobile profile:

- LCP <= 2.5s at p75 target;
- CLS <= 0.1;
- INP <= 200ms target;
- no unbounded layout shift from fonts or diagrams;
- homepage initial client JS budget defined after the first prototype and enforced thereafter;
- non-interactive chapter pages should not ship tool code.

## 15. Content migration

Create `MIGRATION_MANIFEST.md` with every current route and one decision:

- keep unchanged;
- rename and redirect;
- merge;
- archive;
- remove with documented reason.

For every current artifact capture:

- route;
- locale;
- content owner;
- current status;
- target v2 status;
- target route;
- editorial work needed;
- factual verification needed;
- associated external links.

No content is deleted merely because it is not in the v2 launch navigation.

## 16. Implementation sequence

### Phase A — Product and content foundation

- approve this specification;
- inventory routes and content;
- define redirect manifest;
- implement content schema and generated catalogue;
- select launch core artifacts;
- create editorial review checklist.

### Phase B — Visual exploration

Produce exactly three materially different directions:

1. Technical Field Manual;
2. Platform Control Plane;
3. Executive Engineering Publication.

Each direction must show:

- desktop homepage;
- mobile homepage;
- chapter page;
- tool workspace;
- platform-map treatment.

Select one before production implementation.

### Phase C — Application foundation

- new route tree;
- shell and accessibility foundation;
- visual tokens;
- SEO generation;
- content pipeline;
- redirect tests;
- analytics abstraction.

### Phase D — Core surfaces

- homepage;
- handbook landing;
- platform map;
- chapter template;
- materials;
- about/contact.

### Phase E — Tools

- revise domain models;
- implement validation and export;
- connect explanations;
- test accessibility and privacy.

### Phase F — Editorial migration

- rewrite/review launch artifacts;
- add references and diagrams;
- prepare selective English subset;
- validate all external links.

### Phase G — Cutover

- final visual/accessibility/performance checks;
- production redirect verification;
- metadata and previews;
- domain smoke test;
- analytics verification;
- launch note and changelog.

## 17. Acceptance criteria

The v2 release is accepted only if:

1. all launch scope in `GOAL.md` is present;
2. primary navigation has four content destinations plus contact and locale actions;
3. a target user can enter via a problem and reach a useful artifact in two decisions;
4. the signature map supports pointer, keyboard, mobile and no-JS access;
5. 6–8 core Russian artifacts are reviewed, not merely migrated;
6. all three tools satisfy their revised domain specifications;
7. content metadata has one source of truth;
8. `/ru` is no longer a duplicate application tree;
9. every previous public route is accounted for;
10. automated link, content, metadata, accessibility and E2E suites pass;
11. manual keyboard and screen-reader smoke tests pass;
12. user-entered tool data is not transmitted;
13. core pages meet agreed performance budgets;
14. the live domain and `www` behavior are verified after deployment;
15. the README and architecture decision records describe the actual system.

## 18. Deferred decision triggers

Add an account system only when users demonstrate a cross-device persistence need.

Add a newsletter only when there is a stable editorial cadence and a clear subscriber value proposition.

Add AI search/chat only when static search and problem routes demonstrably fail to answer common navigation needs, and when citation and privacy behavior can be guaranteed.

Migrate hosting only when GitHub Pages blocks a required feature, reliability target or deployment workflow.

Expand full English parity only when English traffic, invitations or backlinks justify the ongoing editorial cost.
