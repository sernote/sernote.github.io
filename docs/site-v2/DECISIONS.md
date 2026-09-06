# notevskii.tech v2 — Decision Register

This file resolves implementation choices that could otherwise remain ambiguous. These decisions are normative and take precedence over illustrative examples in other specification files.

Depends on: [`PUBLICATION_MODEL.md`](./PUBLICATION_MODEL.md)

## D-001 — Site-level product model

**Decision:** `notevskii.tech` is the author-led engineering publication and public workbench of Сергей Нотевский.

It has four durable surfaces:

- Articles;
- Production AI Platform Handbook;
- Projects;
- Talks and media.

**Rejected:**

- equal prominence for a generic portfolio, blog, docs and tools with no relationship model;
- treating the Handbook as the only meaningful product on the domain;
- treating the Handbook as an incidental menu item.

**Consequence:** the site expresses one professional practice through four distinct formats.

## D-002 — Brand hierarchy

**Decision:** the site-level identity is `Сергей Нотевский` / `Sergei Notevskii` on `notevskii.tech`.

`Production AI Platform Handbook` is the named flagship knowledge product.

`audit-prompt-caching` and future repositories are named projects.

**Consequence:** global header, metadata and homepage make the author explicit; Handbook pages foreground the Handbook product name and author line.

## D-003 — Global navigation

**Decision:** default top-level destinations:

1. `Статьи`;
2. `Хэндбук`;
3. `Проекты`;
4. `Выступления`;
5. `Обо мне`.

Utilities:

- search;
- locale switch where available;
- Telegram/contact.

The logo is the homepage link.

**Change rule:** another top-level destination requires a distinct durable user job and enough launch content to justify it.

Small browser tools may live under `/tools/` but do not require a top-level navigation item at launch.

## D-004 — Knowledge relationship model

**Decision:** Articles, Talks, Projects and Handbook are connected by shared topic, problem and platform-layer metadata.

Roles:

- Articles develop arguments;
- Talks compress and communicate;
- Projects provide executable evidence;
- Handbook preserves reviewed synthesis.

**Prohibited:** copying one artifact verbatim into several surfaces and treating duplication as a content strategy.

## D-005 — Handbook role and discovery

**Decision:** the Handbook is the flagship structured reference product inside the publication.

Within the Handbook, primary discovery is by:

- platform maturity/boundary;
- engineering problem;
- platform capability.

Format and audience role are secondary metadata.

**Rejected:** organizing the Handbook primarily as a chronological blog, flat format catalogue or role-card wall.

## D-006 — Handbook format and public boundary

**Decision:** the canonical Handbook is open, web-first and living.

At launch:

- reviewed core chapters and map are public;
- no registration is required to read them;
- a free versioned map/starter PDF or poster may be generated;
- the content pipeline must support future PDF/EPUB generation from the same source.

**Rejected at launch:** a free teaser whose purpose is to hide the useful Handbook behind a paywall.

## D-007 — Future paid Handbook derivative

**Decision:** the preferred future commercial format is an implementation edition, not a paywall over basic conclusions.

Eligible paid value:

- curated PDF/EPUB edition;
- editable ADR/RFC templates;
- assessment workbooks;
- cost/capacity models;
- workshop deck and facilitation notes;
- print-ready map bundle;
- defined update entitlement;
- team-use license.

The public web Handbook remains genuinely useful.

A paid product begins only after the gates in D-025 are met.

## D-008 — Articles

**Decision:** the site hosts original or expanded author editions of technical articles.

Habr and other external publications remain selected distribution surfaces. They are not automatically byte-for-byte mirrored into the site.

Every article may link to related Handbook chapters, projects and talks. It is valid for an article to represent evolving or time-bound reasoning; its relationship to a later Handbook synthesis must be clear.

## D-009 — Talks and media

**Decision:** every listed talk, webinar, podcast or interview gets a useful site page, not only an external link or embed.

Required minimum:

- event and date;
- abstract;
- recording/source link;
- concise takeaways;
- related articles, projects or Handbook artifacts.

Slides and transcript/edited notes are optional when publicly permitted.

## D-010 — Projects

**Decision:** Projects are first-class software/public-work surfaces distinct from browser tools and content materials.

Initial flagship: `audit-prompt-caching`.

Its site page must explain:

- the problem;
- target users;
- installation and workflow;
- supported environments;
- evidence/privacy limits;
- release status;
- repository;
- related writing and Handbook guidance.

A project page that only redirects to GitHub fails this decision.

## D-011 — Signature platform map

**Decision:** the Production AI Platform map is one reusable domain model rendered in several contexts, not separate manually maintained drawings.

The model includes for each layer:

- stable id;
- localized name and description;
- typical symptoms;
- primary metrics;
- owner archetype;
- related artifact ids;
- ordering and relationships.

Renderers:

- homepage excerpt;
- Handbook full map;
- mobile ordered disclosure list;
- print/PDF/OG renderer.

No-JS acceptance: all layer names, descriptions and links are present in generated HTML. JavaScript enhances selection and highlighting only.

## D-012 — Content maturity

**Decision:** `reviewed` is the minimum status for normal Handbook discovery. `draft` may be public by direct link but is not promoted by default.

A reviewed Handbook artifact requires:

- human author review;
- resolved placeholders;
- valid references for factual external claims;
- explicit last-reviewed date;
- applicability boundary;
- required decision-useful sections or justified not-applicable markers.

Articles, talks and project releases use their own lifecycle fields and are not forced into the Handbook review state.

## D-013 — Launch breadth

**Decision:** v2 launches a complete publication structure and a deliberately narrow reviewed Handbook spine.

Required:

- usable Articles, Talks, Projects and Handbook index surfaces;
- a flagship `audit-prompt-caching` project page;
- selected existing article migration;
- selected talk pages with summaries;
- 6–8 reviewed Russian core Handbook artifacts plus compact bridge artifacts where needed.

**Rejected:** superficial migration of every current page to claim completeness.

## D-014 — English scope

**Decision:** Russian has full launch depth. English contains a curated evergreen subset and project documentation where it serves adoption.

Initial English candidates:

- homepage/about;
- platform map;
- MaaS vs self-hosted;
- cost per accepted outcome;
- prefix cache;
- `audit-prompt-caching` project page;
- contact.

A Russian page without an English equivalent is valid and must not emit invalid hreflang.

## D-015 — Existing `/ru` routes

**Decision:** remove the duplicate `/ru` application tree after a tested migration manifest exists.

Preserve public compatibility using generated static redirect pages or the deployment-supported equivalent.

The exact redirect implementation must be tested against GitHub Pages before route deletion.

## D-016 — Framework and hosting

**Decision:** keep Next.js, TypeScript, MDX/content collections and static export for v2.

A framework migration requires a blocking capability, measurable reliability issue or unsustainable authoring cost. Aesthetic redesign and code cleanup are not sufficient reasons.

No server actions, auth, database or backend persistence at launch.

## D-017 — Content source of truth

**Decision:** validated content metadata is authoritative.

One content pipeline derives:

- catalogues;
- relationships across Articles, Talks, Projects and Handbook;
- featured selections;
- translation pairs;
- SEO, sitemap and RSS;
- stale-review reports;
- future PDF/print editions.

**Prohibited:** a second manual catalogue duplicating title, URL, description, status or relationships.

The platform map remains structured domain data; its artifact references use stable content ids.

## D-018 — Localization implementation

**Decision:** typed small UI dictionaries plus localized content files.

**Rejected:** one monolithic localization file containing site config, all marketing copy, article copy, tool copy and domain data.

## D-019 — Tool precision

**Decision:** browser tools report explainable dimensions and assumptions. An aggregate score is secondary and optional.

- cacheability tooling cannot claim actual runtime hit rate without telemetry;
- cost models separate reusable token share from cross-request hit rate;
- readiness tooling uses blockers and evidence, not a naive equal-weight percentage;
- maturity assessment returns capability state, gaps and next justified investments, not a vanity score.

## D-020 — Tool privacy

**Decision:** free-text input never leaves the browser.

Analytics events contain only predefined ids and coarse completion state. Export is generated locally.

No third-party script may capture tool input values, DOM text from tool workspaces or session replay.

## D-021 — Analytics

**Decision:** analytics is optional for launch but recommended for validating navigation and future commercial demand.

If enabled, an event contract and privacy review are required.

Allowed event classes:

- artifact opened;
- related-artifact navigation;
- tool started/completed;
- project repository/install opened;
- talk recording opened;
- PDF/starter artifact downloaded;
- contact opened.

Free-text, prompt, trace, schema and evidence fields are forbidden.

## D-022 — Contact model

**Decision:** one contact surface supports:

- architecture discussion;
- technical collaboration;
- conference talk;
- podcast/interview;
- editorial contribution.

Telegram direct message is the launch channel.

Separate service pages are deferred until there is evidence of distinct demand and enough detail to describe inputs and outputs honestly.

## D-023 — Visual identity

**Decision:** the visual family is `Dark Engineering Publication`, defined in [`DESIGN_DIRECTION.md`](./DESIGN_DIRECTION.md).

The site combines:

- an editorial author-publication front page;
- long-form engineering article templates;
- a technical Handbook reading system;
- RFC/notebook-like working artifacts and tools;
- architecture diagrams that answer engineering questions;
- restrained project and media pages.

**Rejected:** generic AI SaaS landing patterns, dashboard chrome, cyberpunk neon, decorative 3D platform illustrations, gradient CTA buttons, vanity metric strips, testimonial carousels and repeated card walls.

Lenny's Newsletter and The Pragmatic Engineer are references for author-led clarity, archive depth, editorial hierarchy and interface restraint—not templates to clone or reasons to adopt a subscription funnel.

## D-024 — Publication workflow

Each artifact kind has a predictable lifecycle.

### Article

1. draft;
2. editorial/factual review;
3. publish site edition;
4. optionally adapt for Habr/Telegram/other distribution;
5. connect related work;
6. update or mark superseded when needed.

### Talk/media

1. create event page;
2. add abstract and links;
3. after event, add recording, takeaways and related work;
4. update if slides/transcript become available.

### Project

1. project page and repository relationship;
2. release metadata;
3. public examples/evidence;
4. release notes and related content updates.

### Handbook

1. draft MDX/data;
2. schema and content checks;
3. factual/reference review;
4. author editorial review;
5. set `reviewed` and `reviewedAt`;
6. preview and visual check;
7. publish;
8. review-due reporting based on `reviewCycleDays`.

Agent-created content cannot self-promote to reviewed status without explicit human author review.

## D-025 — Commercial decision gates

**Decision:** no paid full-Handbook implementation work begins merely because payment infrastructure is available.

Revisit a paid self-serve edition when several signals exist:

- coherent public reviewed Handbook spine;
- repeated requests for PDF, print, offline, editable or team versions;
- named templates/checklists used in real work;
- inbound team requests that reference specific public artifacts;
- ability to define an edition and update policy;
- acceptable payment, invoice, refund, access and support operations;
- explicit employer/side-project/IP boundary review.

A free email update feed may be added before a paid product. Paid membership/community is not the default monetization path.

## D-026 — Specification change control

Implementation may clarify component details without changing the product model.

Changes to any of the following require an explicit decision-register update:

- four-surface site model;
- brand hierarchy;
- top-level navigation;
- open core Handbook boundary;
- paid-product boundary;
- project and talk content requirements;
- privacy boundary;
- tool domain semantics;
- Russian/English scope;
- static/backend boundary;
- reviewed-Handbook standard.
