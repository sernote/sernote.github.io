# notevskii.tech v2 — Product and Technical Specification

Status: **ready for content inventory and visual prototyping**  
Depends on:

- [`GOAL.md`](./GOAL.md)
- [`PUBLICATION_MODEL.md`](./PUBLICATION_MODEL.md)
- [`HANDBOOK_STRATEGY.md`](./HANDBOOK_STRATEGY.md)
- [`DECISIONS.md`](./DECISIONS.md)
- [`DESIGN_DIRECTION.md`](./DESIGN_DIRECTION.md)

## 1. Product definition

`notevskii.tech` is the author-led engineering publication and public workbench of Сергей Нотевский.

The publication covers production AI systems and makes four kinds of public work durable:

1. **Articles** — original technical reasoning and field notes.
2. **Production AI Platform Handbook** — maintained synthesis, maps, chapters, playbooks, templates and tools.
3. **Projects** — executable public work, beginning with `audit-prompt-caching`.
4. **Talks and media** — recordings, slides, abstracts and concise takeaways.

The Handbook is the flagship structured knowledge product. It is not the whole website and not an incidental blog category.

The site-level author brand and the named Handbook product must reinforce rather than compete with each other.

## 2. Brand architecture

### Site-level identity

Russian: `Сергей Нотевский`  
English: `Sergei Notevskii`

Role:

- `AI Platform Lead`.

Site descriptor:

> Статьи, проекты, выступления и практический хэндбук о том, как ИИ доезжает от демо до надёжной платформы в продакшене.

### Flagship knowledge product

`Production AI Platform Handbook`

Russian descriptor:

> Практический хэндбук по созданию и развитию ИИ-платформы в продакшене.

### Flagship software project

`audit-prompt-caching`

Descriptor:

> Open-source agent skill and local audit workflow for diagnosing prompt, prefix and KV-cache reuse failures.

## 3. Information architecture

### Global navigation

Desktop and mobile:

1. `Статьи` / `Articles`
2. `Хэндбук` / `Handbook`
3. `Проекты` / `Projects`
4. `Выступления` / `Talks`
5. `Обо мне` / `About`

Utilities:

- search;
- locale switch where an equivalent exists;
- Telegram/contact.

The logo/name links to the homepage. There is no separate Home item.

### Canonical route tree

```text
/
├── articles/
│   └── [slug]/
├── handbook/
│   ├── map/
│   ├── start/
│   ├── [section]/[slug]/
│   ├── playbooks/[slug]/
│   └── templates/[slug]/
├── projects/
│   └── audit-prompt-caching/
├── talks/
│   └── [slug]/
├── tools/
│   └── [slug]/
├── about/
├── contact/
└── en/
    └── selective equivalent routes
```

`/tools` is a valid product route but does not require top-level navigation at launch. Tools are reached from the Handbook, Articles and Projects.

### Legacy migration

A versioned redirect manifest must map every current public route to a v2 decision:

- keep;
- rename and redirect;
- merge;
- archive;
- remove with documented reason.

Required behavior:

- Russian canonical routes remain at root;
- `/en/...` remains the English prefix;
- `/ru/...` application duplicates are removed only after redirects are proven;
- no indexed current route returns an unexplained 404 at cutover.

## 4. Homepage specification

### Purpose

The homepage is the front page of an engineering publication.

The first viewport must answer:

1. who Сергей is;
2. what professional domain he works in;
3. which current piece of work is most important;
4. where a visitor can browse the four product surfaces.

### H1 — Publication masthead

Required:

- author name;
- role;
- one-sentence publication promise;
- one current featured item or editorial statement;
- at most two actions.

Suggested actions:

- `Читать статьи` or a current featured article;
- `Открыть хэндбук`.

Prohibited:

- three or more equal CTA buttons;
- generic “AI expert” claims;
- unverifiable employer scale claims;
- decorative dashboard mockups;
- glowing 3D platform illustrations;
- a subscription or consulting funnel as the dominant first action.

### H2 — Current featured work

One editorially selected item:

- recent article;
- major project release;
- reviewed Handbook update;
- new talk recording.

It includes:

- type;
- title;
- one-sentence purpose;
- publication/review date;
- direct open action.

### H3 — Four-surface orientation

Show the four surfaces with unequal but clear hierarchy:

- Articles;
- Handbook;
- Projects;
- Talks.

This may be a typographic index or compact list. It must not become a four-card SaaS feature grid.

### H4 — Handbook flagship block

Required:

- short Handbook promise;
- map excerpt or capability outline;
- maturity/problem entry explanation;
- link to Handbook start and map.

The block is substantial but does not consume the entire homepage.

### H5 — Flagship project

Show `audit-prompt-caching` as executable evidence.

Required:

- problem solved;
- current release state;
- one example use case;
- repository/project-page actions;
- related article/Handbook connection.

### H6 — Selected talks and recent articles

Use simple editorial lists:

- selected/latest talk with takeaways;
- chronological recent article list;
- links to full indexes.

Avoid thumbnail walls unless an image is content-bearing.

### H7 — Author and contact

Compact closing block:

- current focus;
- restrained portrait optional;
- selected public evidence links;
- one contact action.

No testimonial carousel.

## 5. Articles specification

### `/articles`

Purpose:

- browse current, foundational and topical writing;
- expose one coherent archive under the author's domain.

Required views:

- Featured/current;
- Foundational;
- Recent;
- Topics/platform layers;
- all articles.

Filters are secondary and visually quiet.

### Article page

Required:

- title;
- deck/summary;
- author;
- published and updated dates;
- reading time;
- topics/platform layers;
- article body;
- references where factual claims require them;
- related Handbook chapter/project/talk;
- external edition link where relevant;
- superseded/updated note when applicable.

Article kinds:

- deep-dive;
- field-note;
- architecture-decision;
- experiment;
- opinion;
- release-note;
- talk-expansion.

An article may be time-bound. It is not forced into the Handbook's reviewed evergreen standard.

### External publishing

Habr remains a selected distribution channel.

The site version should normally be:

- the canonical original;
- an expanded author edition;
- or a related article with a distinct job.

Do not automatically import byte-for-byte duplicates as the publication workflow.

## 6. Talks and media specification

### `/talks`

Purpose:

- preserve public speaking work;
- help a visitor evaluate a talk without watching every recording;
- connect talks to the publication's knowledge graph.

Kinds:

- conference talk;
- webinar;
- podcast/interview;
- panel;
- workshop recording.

### Talk/media page

Required:

- title;
- event/source;
- date;
- format;
- language;
- recording/source link;
- abstract;
- 5–10 concise takeaways;
- related articles, projects and Handbook artifacts.

Optional:

- embedded video;
- slides;
- transcript;
- edited notes;
- cited references.

A page containing only a video embed fails the requirement.

## 7. Projects specification

### `/projects`

Purpose:

- show maintained executable public work;
- distinguish software artifacts from browser tools and content.

Project index fields:

- name;
- short problem statement;
- status;
- latest release/date;
- repository;
- related topic/layer.

### `audit-prompt-caching` project page

Required:

- project purpose;
- who it is for;
- why cache reuse fails silently;
- installation and quick start;
- supported provider/runtime areas;
- primary audit workflow;
- example input/report;
- evidence and privacy boundaries;
- latest release state;
- GitHub repository;
- releases/changelog;
- related articles;
- related Handbook chapter/playbook;
- contribution route.

Optional accurately sourced adoption signals:

- stars;
- forks;
- releases;
- contributors;
- usage examples.

Signals must not be stale hardcoded vanity metrics without a review date or build-time source.

## 8. Handbook specification

### `/handbook`

Purpose:

- orient a visitor;
- explain the platform boundary;
- route by maturity state, production symptom or capability;
- expose a coherent reviewed spine.

Required sequence:

1. concise Handbook premise;
2. maturity/boundary entry;
3. platform map;
4. problem entry;
5. reviewed core spine;
6. playbooks/templates/tools;
7. review/update state;
8. all-artifacts link.

Excluded from the landing page:

- reading progress;
- bookmarks;
- role-filter wall;
- planned items mixed with reviewed items;
- repeated full layer lists;
- marketing subscription pressure.

### Handbook artifact types

- map;
- chapter;
- playbook;
- checklist;
- template/decision record;
- tool guide.

### Handbook statuses

- `draft`;
- `reviewed`;
- `maintained`;
- `archived`.

Behavior:

- draft: direct URL or explicitly labelled preview;
- reviewed: normal public discovery;
- maintained: reviewed and within review interval;
- archived: historical, not normally recommended.

### Reviewed chapter structure

1. Executive summary
2. Applicability boundary
3. Symptoms
4. Mental model
5. Decision path
6. Reference architecture/diagram
7. Metrics and telemetry contract
8. Trade-offs
9. Failure modes/anti-patterns
10. Ownership boundary
11. Implementation sequence
12. Review checklist
13. Example/sanitized case
14. Related tool/template/playbook
15. Related Articles/Talks/Projects
16. References
17. Last reviewed

A reviewed chapter must contain these sections or mark non-applicable items explicitly.

### Launch Handbook spine

Required narrative:

1. What an AI platform is and when a company needs one.
2. Platform boundary and capability map.
3. MaaS vs self-hosted vs hybrid.
4. Gateway, contracts, quotas and routing.
5. Inference and capacity fundamentals.
6. Evals and release control.
7. Observability and incident diagnosis.
8. Cost attribution and unit economics.
9. Ownership and operating model.

Implementation target:

- 6–8 substantial reviewed Russian artifacts;
- compact reviewed bridge artifacts where narrative continuity requires them;
- optional deeper cache/routing/inference material only when it meets the same review bar.

### Handbook format and commercial boundary

Launch:

- open web Handbook is canonical;
- free versioned map/starter guide PDF/poster;
- no core chapter paywall;
- no membership requirement;
- PDF/EPUB generation capability from the same content source.

Future paid derivative:

- Practitioner Edition / Operating Kit;
- curated PDF/EPUB;
- editable templates;
- assessment and cost/capacity workbooks;
- workshop/facilitation assets;
- team-use terms;
- defined update period.

Paid work begins only after the demand and operational gates in `DECISIONS.md` are met.

## 9. Browser tools specification

All tools:

- run locally in the browser;
- make no network request containing entered data;
- disclose assumptions;
- distinguish measurements from heuristics;
- validate impossible combinations;
- provide reset and named examples;
- link to explanatory Handbook artifacts;
- expose dynamic results accessibly;
- support local copy/export of a sanitized report;
- emit only privacy-safe analytics events if analytics is enabled.

Priority tools:

1. AI Platform Maturity Assessment;
2. Cost and Capacity Model;
3. Release Readiness Review;
4. Cacheability Review as an advanced companion.

### Maturity Assessment

Output:

- current capability state;
- missing evidence;
- blockers;
- next justified shared capabilities;
- capabilities likely premature;
- related Handbook path.

No vanity percentage as the primary result.

### Cost and Capacity Model

The domain model separates:

- total input tokens;
- reusable prefix tokens;
- cross-request cache hit rate;
- uncached/cached/output prices;
- request volume;
- agent steps distribution;
- retry and fallback rates/cost;
- accepted-result rate;
- optional self-hosted fixed, reserve and non-production capacity.

Outputs:

- cost per request/session/accepted result;
- cache savings;
- retry/fallback overhead;
- scenario comparison;
- sensitivity analysis;
- assumptions summary.

### Release Readiness Review

Dimensions:

- dataset and coverage;
- error taxonomy;
- offline eval;
- regression thresholds;
- routing/long-context eval;
- canary;
- rollback/fallback;
- observability;
- ownership and approval.

Decision states:

- Blocked;
- Conditional rollout;
- Canary ready;
- Production ready.

Critical blockers override percentage summaries. No item is pre-completed.

### Cacheability Review

Outputs:

- stable-prefix similarity;
- dynamic-field placement;
- tool/schema volatility;
- agent-step hash drift;
- risk categories;
- exact recommendations;
- statement that runtime hit rate requires real telemetry.

One opaque score cannot be the primary result.

## 10. About and contact

### About

Must answer:

- current professional focus;
- path into production AI platform work;
- areas of practice;
- engineering principles and point of view;
- selected evidence across Articles, Talks, Projects and Handbook;
- speaker/author information.

Avoid:

- generic biography chronology;
- self-assigned superlatives;
- confidential internal claims;
- duplicate homepage copy.

### Contact

Request types:

- architecture discussion/review;
- technical collaboration;
- conference talk;
- podcast/interview;
- editorial contribution.

Explain useful context:

- problem or audience;
- expected format;
- desired outcome;
- time horizon;
- relevant links.

Primary launch channel: Telegram direct message.

## 11. Content model

All artifacts use validated build-time metadata.

### Shared fields

```yaml
id: string
title: string
shortTitle: string
description: string
locale: ru | en
translationKey: string | null
kind: article | talk | project | map | chapter | playbook | checklist | template | tool-guide
status: draft | published | reviewed | maintained | archived
platformLayers: string[]
problems: string[]
tags: string[]
publishedAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD
related: string[]
featured: none | primary | foundational | recent
```

### Article extensions

```yaml
articleType: deep-dive | field-note | architecture-decision | experiment | opinion | release-note | talk-expansion
externalEditions: url[]
supersedes: string | null
```

### Talk extensions

```yaml
event: string
eventDate: YYYY-MM-DD
mediaType: conference | webinar | podcast | interview | panel | workshop
recordingUrl: url | null
slidesUrl: url | null
takeaways: string[]
```

### Project extensions

```yaml
repositoryUrl: url
projectStatus: experimental | active | maintained | archived
latestRelease: string | null
releaseDate: YYYY-MM-DD | null
```

### Handbook extensions

```yaml
reviewedAt: YYYY-MM-DD | null
reviewCycleDays: number | null
applicability: string
referencesRequired: boolean
```

Derived values such as URL, stale state, catalogue membership, translation counterpart and related cards are never duplicated manually.

## 12. Visual and interaction system

Direction: `Dark Engineering Publication`.

Preserve:

- dark technical identity;
- thin structural lines;
- restrained accent;
- strong diagrams;
- low-motion character;
- monospace for metadata/code only.

Change:

- reduce repeated card grids;
- use typography, lists, spacing and diagrams as primary hierarchy;
- differentiate Article, Handbook, Project, Talk and Tool page archetypes;
- reserve cyan/teal for actions and active relationships;
- introduce semantic warning/risk/blocker tokens;
- use a restrained author portrait where useful;
- support print-safe light output.

Page archetypes:

1. publication homepage;
2. article/deep dive;
3. Handbook contents/chapter;
4. project page;
5. talk/media page;
6. tool workbench;
7. map/print artifact.

Responsive requirements:

- no horizontal overflow at 320px;
- target touch size >= 44×44 CSS px;
- map has meaningful mobile disclosure mode;
- tables receive deliberate mobile transformations;
- tool results follow inputs on mobile;
- content remains useful without JavaScript.

## 13. Accessibility

Release gates:

- exactly one `<main>`;
- skip link;
- labelled navigation;
- current page uses `aria-current`;
- all inputs have programmatic labels/descriptions;
- filter/toggle state is exposed semantically;
- dynamic tool results use appropriate status/live semantics;
- interactive diagrams are keyboard operable;
- information is not encoded by colour alone;
- visible focus meets contrast requirements;
- reduced motion is respected;
- heading hierarchy is valid;
- automated checks on all page archetypes;
- manual keyboard and screen-reader smoke tests on homepage, article, chapter, project, talk and each tool.

Target: WCAG 2.2 AA for launch surfaces.

## 14. SEO and distribution

Generated:

- sitemap;
- robots;
- RSS/Atom for articles, reviewed Handbook updates, project releases and talk/media updates;
- canonical URL;
- hreflang for actual translation pairs only;
- Open Graph image per page type;
- JSON-LD where valid:
  - Person;
  - WebSite;
  - BlogPosting/TechArticle/Article;
  - BreadcrumbList;
  - SoftwareSourceCode/SoftwareApplication;
  - VideoObject/PodcastEpisode where source data supports it.

Rules:

- site identity is the author publication;
- Handbook and Projects are named products inside it;
- drafts are excluded from sitemap unless explicitly public;
- structured data matches visible content;
- stable fragments support diagrams and chapter sections;
- pages are print/share friendly.

## 15. Analytics and privacy

Analytics is optional but useful for validating navigation and commercial demand.

Allowed event examples:

- article opened;
- related artifact opened;
- Handbook map/problem route opened;
- project repository/install/release opened;
- talk recording/slides opened;
- tool started/completed;
- starter PDF downloaded;
- contact opened.

Forbidden:

- prompt, schema, trace, evidence note or free-text tool input;
- session replay over tool workspaces;
- private query payloads;
- fingerprinting;
- advertising identifiers.

The privacy statement must describe the deployed implementation accurately.

## 16. Technical architecture

Keep:

- Next.js App Router;
- TypeScript;
- React;
- Tailwind;
- MDX/content collections;
- static export;
- GitHub Actions and GitHub Pages unless a demonstrated requirement changes hosting.

Target structure:

```text
app/
  (ru-site)/
    articles/
    handbook/
    projects/
    talks/
    tools/
    about/
    contact/
  en/
content/
  articles/{ru,en}/
  handbook/{ru,en}/
  talks/{ru,en}/
  projects/{ru,en}/
features/
  home/
  articles/
  handbook/
  platform-map/
  projects/
  talks/
  tools/
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

Rendering:

- pages/content render statically;
- JavaScript is limited to map interaction, filters/search and tools;
- non-interactive article/chapter pages do not ship tool code;
- no server actions, API routes, auth or database at launch.

One content pipeline generates:

- per-kind indexes;
- cross-kind relationships;
- featured selections;
- translation pairs;
- sitemap/RSS;
- structured data;
- stale Handbook review reports;
- PDF/print source bundles.

## 17. Quality and tests

### Unit

- tool formulas/validation;
- status derivation;
- URL localization;
- redirect manifest;
- relationship derivation.

### Content

- frontmatter schema;
- unique ids and translation keys;
- valid related ids;
- no reviewed Handbook placeholders;
- references required where configured;
- talk takeaways required;
- project repository/release validation;
- no orphan featured artifacts;
- review dates and staleness.

### Integration

- generated indexes match content;
- route metadata;
- canonical/hreflang;
- sitemap/RSS;
- draft/archived discovery;
- cross-kind relationships;
- redirect coverage;
- PDF source generation.

### End-to-end

1. homepage → article;
2. homepage → Handbook → chapter → related tool;
3. homepage → project → repository/install;
4. homepage → talk → recording/related article;
5. article → related Handbook/project/talk;
6. project → related article/Handbook;
7. each tool: input → result → reset → export;
8. mobile navigation;
9. locale counterpart where available;
10. contact action.

### Visual regression

Viewports:

- 390×844;
- 768×1024;
- 1440×900.

Templates:

- homepage;
- article index/article;
- Handbook landing/chapter/map;
- project index/page;
- talk index/page;
- each tool;
- about/contact.

### Performance

Production-like static output, mobile profile:

- LCP <= 2.5s p75 target;
- CLS <= 0.1;
- INP <= 200ms target;
- no unbounded font/diagram layout shift;
- homepage client JS budget set after first prototype and then enforced;
- articles and chapters do not ship unrelated project/tool code.

## 18. Content migration

Create `MIGRATION_MANIFEST.md` with every current route and:

- route;
- locale;
- artifact kind;
- current status;
- target status;
- target route;
- keep/rename/merge/archive/remove decision;
- editorial work;
- factual verification;
- external links;
- related target artifacts.

No content is deleted merely because it is not in launch navigation.

Migration priorities:

1. selected strongest articles;
2. known talks/podcasts with public recordings;
3. `audit-prompt-caching` project page;
4. coherent reviewed Handbook spine;
5. legacy route redirects;
6. optional older materials.

## 19. Commercial readiness

The launch remains open and useful.

Before a paid self-serve Handbook derivative:

- public reviewed spine exists;
- users request PDF/offline/editable/team formats;
- working artifacts demonstrate use;
- edition/update/support boundaries are defined;
- payment, invoice, refund and access operations are acceptable;
- employer/side-project/IP boundaries are reviewed.

Preferred first paid format:

- one-time/versioned Practitioner Edition or Operating Kit;
- not a recurring community subscription;
- not a paywall over core chapters.

## 20. Implementation sequence

### Phase A — Inventory and content model

- approve product model;
- inventory current routes/content/public links;
- build migration manifest;
- define per-kind schema;
- implement generated relationships and indexes;
- select launch article/talk/project/Handbook content.

### Phase B — Visual prototypes

Create three structurally different variants inside the Dark Engineering Publication family:

1. Dark Editorial Journal;
2. Technical Handbook;
3. Engineering Notebook.

Each must show:

- desktop/mobile homepage;
- article;
- Handbook chapter/map;
- project page;
- talk page;
- tool workspace.

Select one system before production UI implementation.

### Phase C — Foundation

- route tree;
- shell/accessibility;
- tokens/components;
- content pipeline;
- SEO/RSS;
- redirects;
- optional analytics abstraction;
- PDF/print source path.

### Phase D — Core surfaces

- homepage;
- Articles;
- Talks;
- Projects and `audit-prompt-caching`;
- About/contact.

### Phase E — Handbook

- landing/map;
- reviewed spine;
- chapter/playbook/template templates;
- related artifact graph;
- starter guide generation.

### Phase F — Tools

- maturity assessment;
- cost/capacity model;
- release readiness;
- corrected cacheability companion;
- privacy/accessibility/export tests.

### Phase G — Cutover

- editorial/factual review;
- visual/accessibility/performance checks;
- redirects and DNS validation;
- production smoke tests;
- launch and baseline measurement.
