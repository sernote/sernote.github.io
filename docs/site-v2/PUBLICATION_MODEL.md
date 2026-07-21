# notevskii.tech v2 — Publication Model and Handbook Format

Status: **normative, converged product model**  
Owner: Сергей Нотевский  
Supersedes: any interpretation of v2 as either a generic personal portfolio or a site whose only meaningful product is the Handbook.

## 1. Strategic correction

`notevskii.tech` is an **author-led engineering publication and public workbench** about production AI systems.

It has four durable product surfaces:

1. **Articles** — original engineering writing and developing arguments.
2. **Talks and media** — recordings, slides, abstracts and concise takeaways.
3. **Projects** — executable public work, beginning with `audit-prompt-caching`.
4. **Production AI Platform Handbook** — the maintained, structured synthesis of the author's platform practice.

The Handbook is the flagship knowledge product, but it is not the entire identity or information architecture of the site.

The site-level relationship is:

```text
Сергей Нотевский / notevskii.tech
  ├── Articles: thinking and investigation
  ├── Talks: compressed explanation and public communication
  ├── Projects: executable evidence
  └── Handbook: maintained synthesis and reference model
```

This hierarchy matches the author's real career asset: not only one handbook, but the combination of leadership practice, public reasoning, communication and software artifacts.

## 2. Why this model fits the author

The author is currently positioned publicly as an AI Platform Lead and team lead working on production AI-platform concerns rather than as a full-time independent publisher.

The public track already contains four distinct kinds of evidence:

- long-form technical articles;
- a recurring Telegram voice and distribution channel;
- conference talks, recordings and podcast appearances;
- an open-source agent skill with real adoption signals;
- an emerging Production AI Platform Handbook.

The near-term strategic value of the site is therefore broader than direct content revenue. It should compound:

- category authority in Production AI Platform engineering;
- credibility for Staff+/leadership career opportunities;
- conference and media demand;
- adoption of open-source work;
- qualified architecture and collaboration requests;
- the option to create paid products later without rebuilding the public foundation.

A premature content paywall would reduce several of these benefits at the point when they are still compounding.

## 3. The four surfaces

### 3.1 Articles

Purpose:

- publish original engineering arguments under the author's own domain;
- preserve a durable archive independent of external platforms;
- develop ideas that may later become Handbook chapters, tools or talks;
- establish depth through concrete reasoning, examples, equations and references.

Article types:

- deep dive;
- field note;
- architecture decision;
- experiment or benchmark analysis;
- opinion with explicit assumptions;
- project release note;
- post-talk expansion.

Article pages include:

- title and deck;
- publication and update dates;
- reading time;
- topic and related platform layers;
- clear author line;
- references;
- related Handbook chapter, project or talk where relevant;
- a visible note when a Habr or other external edition exists.

The site should publish canonical original or expanded editions. Habr remains a high-value distribution channel, but selected Habr publications should be adapted editions rather than automatic byte-for-byte mirrors.

### 3.2 Talks and media

Purpose:

- make conference, webinar and podcast work durable after the event;
- expose communication ability as part of the author's professional evidence;
- turn recordings into searchable and reusable artifacts;
- connect each talk to the deeper body of work.

Every talk/media page should contain:

- title;
- event, date and format;
- video or external recording link;
- abstract;
- 5–10 concise takeaways;
- slides when publicly available;
- referenced tools and sources;
- related articles and Handbook chapters;
- optional transcript or edited notes when the source permits it.

A page with only an embedded video is not sufficient. The summary is part of the public value.

### 3.3 Projects

Purpose:

- show executable proof of the author's engineering perspective;
- provide a stable product page above the underlying repository;
- connect code, documentation, examples, releases and related writing.

Initial flagship project:

- `audit-prompt-caching`.

Its site page should include:

- problem statement;
- target users;
- installation and quick start;
- audit workflow;
- supported providers/runtimes;
- example report;
- release status and changelog link;
- privacy and evidence boundaries;
- GitHub repository link;
- related cache/economics articles;
- related Handbook chapter and playbook;
- public adoption signals only when fetched or reviewed accurately.

Projects remain distinct from small browser tools. A repository/agent skill is a maintained software artifact; a calculator embedded in the site is a tool surface.

### 3.4 Production AI Platform Handbook

Purpose:

- define the Production AI Platform category and boundary;
- preserve reviewed conclusions rather than the full history of exploration;
- provide a coherent platform map, decision models, chapters, playbooks, templates and tools;
- become the reference layer that articles, talks and projects point back to.

The Handbook is not a chronological blog and should not duplicate articles verbatim.

Its canonical web structure is problem- and capability-oriented:

- platform boundary and maturity;
- strategy and execution boundary;
- gateway and contracts;
- routing;
- inference and capacity;
- cache;
- evals and release control;
- observability and incidents;
- economics;
- security;
- ownership and operating model.

## 4. Knowledge lifecycle

The four surfaces are not silos. They are different states of one knowledge system.

```text
Production practice / observation
  → Telegram note or short field note
  → article or talk
  → reusable project/tool/template where applicable
  → reviewed Handbook synthesis
  → new questions from readers and users
  → next practice cycle
```

Roles:

- **Telegram**: immediacy, voice, observations, distribution.
- **Articles**: developed arguments and experiments.
- **Talks**: compressed narrative and public communication.
- **Projects**: executable proof and adoption.
- **Handbook**: maintained synthesis and canonical reference.

A single topic may exist in all four site surfaces, but each artifact must have a distinct job.

Example — prompt/prefix caching:

- Telegram: an observed anti-pattern or new provider behavior;
- article: a detailed cost or cache experiment;
- talk: the narrative of why shorter prompts may cost more;
- project: `audit-prompt-caching`;
- Handbook: stable request-shape model, metrics, decision path and review checklist.

## 5. Distribution model

The site is the owned index and canonical relationship graph. It does not attempt to replace every external channel.

### Website

- canonical archive;
- structured relationships;
- SEO and stable links;
- full project and Handbook surfaces;
- direct author identity.

### Telegram

- frequent distribution;
- short notes;
- early ideas;
- conversation and audience relationship.

### Habr

- selected high-quality long-form distribution;
- access to the existing Russian engineering audience;
- adapted or standalone editions connected to the site.

### GitHub

- code, releases, issues and technical collaboration;
- source of truth for open-source projects.

### YouTube / event platforms / podcasts

- recording distribution;
- site pages preserve the abstract, takeaways and relationships.

### LinkedIn and other professional networks

- selective career and publication distribution;
- not the primary content archive.

## 6. Handbook format options

### Option A — Fully open living web Handbook

Description:

- all reviewed chapters are public on the site;
- updates are continuous;
- the web version is canonical;
- optional generated PDF snapshots are also free.

Strengths:

- maximum reach, searchability and citation;
- strongest career and category-authority effect;
- easiest connection to articles, talks and projects;
- lowest reader friction;
- supports open-source adoption and conference use.

Weaknesses:

- little direct content revenue;
- maintenance remains an author responsibility;
- readers may not perceive a clear edition or completion point.

Fit now: **high**.

### Option B — Free overview/PDF, full Handbook behind a paywall

Description:

- a short free artifact introduces the map and category;
- the complete web or PDF Handbook is paid.

Strengths:

- simple commercial story;
- direct revenue if demand is already proven;
- encourages a bounded book-like edition.

Weaknesses:

- hides the strongest category-building content;
- reduces search, linking and professional evaluation value;
- requires payment, access, invoices/refunds, support and update expectations;
- creates pressure to claim completeness;
- may monetize too early relative to the current audience and content maturity;
- makes employer/IP boundaries more consequential.

Fit now: **low**. Reconsider only after demand is observed.

### Option C — Open living Handbook plus paid implementation edition

Description:

- core web chapters, map and essential decisions remain public;
- a versioned paid product packages implementation value.

Possible paid components:

- curated PDF/EPUB edition;
- editable ADR and RFC templates;
- maturity assessment workbook;
- platform map poster and workshop deck;
- telemetry contract;
- ownership matrix;
- cost/capacity workbook;
- release-readiness pack;
- implementation sequences and facilitation notes;
- versioned update entitlement;
- individual and team usage terms.

Strengths:

- preserves authority and public usefulness;
- charges for compression, packaging, editable artifacts and operationalization rather than access to basic ideas;
- naturally supports individual and team buyers;
- creates a commercial product that is more defensible than “the same articles in a PDF.”

Weaknesses:

- requires a coherent artifact pack and strong editorial packaging;
- paid updates and licensing need explicit support boundaries;
- more production work than a plain PDF.

Fit after the public foundation: **highest**.

### Option D — Paid newsletter or membership

Description:

- recurring subscription unlocks full deep dives, archive, community or frequent updates.

Strengths:

- recurring revenue;
- direct reader relationship;
- supports continuous publishing.

Weaknesses:

- requires a reliable publication cadence;
- creates ongoing customer and community obligations;
- competes with the author's full-time leadership role;
- places new articles behind a wall while the public category is still being established;
- does not naturally monetize the existing project/tool strength.

Fit now: **low**. A free email update feed may be useful later, but paid membership is not a launch requirement.

### Option E — Open publication plus team/advisory products

Description:

- public content remains open;
- companies pay for a maturity review, workshop, architecture review or internal implementation pack.

Strengths:

- high value per engagement;
- directly aligned with AI Platform Lead experience;
- uses the Handbook as shared language and evidence.

Weaknesses:

- high-touch and not scalable;
- time-constrained alongside a leadership role;
- requires explicit employer, IP and conflict-of-interest boundaries;
- may accidentally turn the site into a consultancy funnel.

Fit: **selective optional path**, not the organizing business model of the site.

## 7. Converged Handbook decision

The canonical Handbook format is:

> **Open, web-first and living, with versioned downloadable editions and a future paid implementation layer.**

Launch model:

1. Public web Handbook with reviewed chapters, map and playbooks.
2. Free, versioned `Production AI Platform Map & Starter Guide` PDF/poster suitable for sharing with technical leaders and teams.
3. No paywall on the core web Handbook at launch.
4. No paid newsletter or community requirement.
5. Prepare content metadata and build tooling so a future PDF/EPUB edition can be generated without maintaining a second source.

Future commercial model:

- `Production AI Platform Practitioner Edition` or `Production AI Platform Operating Kit`;
- one-time/versioned purchase before considering recurring subscription;
- public Handbook remains genuinely useful;
- paid value is implementation compression, editable artifacts, packaging, offline edition and maintained releases.

The product should never charge merely for hiding the conclusion of a public chapter.

## 8. Free and paid boundary

### Always public by default

- articles;
- talk summaries and public recording links;
- open-source project pages and repositories;
- Handbook platform map;
- core reviewed Handbook chapters;
- essential decision models;
- basic checklists;
- project documentation;
- public errata and update history.

### Suitable for a future paid self-serve product

- polished versioned PDF/EPUB edition;
- editable templates and working files;
- facilitation guides;
- complete assessment workbook;
- team workshop deck;
- implementation sequence packs;
- print-ready map/poster bundle;
- advanced cost/capacity scenarios;
- update bundle for a defined edition period;
- team-use license and invoice-ready purchase.

### Suitable for optional paid team work

- facilitated maturity assessment;
- architecture review;
- internal workshop;
- customized operating model or implementation plan.

### Not suitable as the first paid boundary

- the second half of every public article;
- basic Handbook chapter access;
- a vanity maturity score;
- mandatory registration to read core material;
- access to `audit-prompt-caching` documentation required to use the open-source project.

## 9. Decision gates for monetization

Do not build a paid full-Handbook product merely because payment infrastructure is technically possible.

Revisit the commercial layer when several signals exist:

- the public Handbook has a coherent reviewed spine;
- readers repeatedly ask for a PDF, print, offline or team version;
- people use named templates/checklists in real work;
- inbound team requests reference specific Handbook artifacts;
- the author can commit to an edition/update policy;
- employer and side-project/IP boundaries are explicitly checked;
- payment, invoice, refund, access and support operations are acceptable.

The initial analytics baseline should be collected before assigning hard numeric thresholds.

## 10. Information architecture

Recommended global navigation:

1. `Статьи`
2. `Хэндбук`
3. `Проекты`
4. `Выступления`
5. `Обо мне`

Utilities:

- search;
- RU/EN where an equivalent exists;
- Telegram;
- contact.

Canonical route outline:

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
├── about/
├── contact/
└── en/
    └── selective equivalents
```

Small browser tools may live under `/tools/` when they are substantial enough to deserve direct routes. They are linked from the Handbook and relevant project/article pages, but do not need a top-level navigation item at launch.

## 11. Homepage role

The homepage is the front page of the author's engineering publication, not only the Handbook cover.

It should include:

1. author identity and Production AI Platform positioning;
2. one current featured article;
3. a compact flagship Handbook block;
4. the flagship `audit-prompt-caching` project;
5. a latest or selected talk;
6. recent articles and field notes;
7. concise author/contact footer.

The page should make all four surfaces visible without giving them identical visual weight.

Recommended hierarchy:

- author/practice first;
- latest high-value work second;
- Handbook as flagship structured body;
- project as executable proof;
- talks as communication evidence.

## 12. Career and public-capital objective

The publication should make four professional capabilities legible:

1. **Technical depth** — articles, projects and detailed Handbook chapters.
2. **Systems and platform thinking** — map, maturity model and operating model.
3. **Execution** — maintained software, playbooks and templates.
4. **Leadership and communication** — talks, editorial judgement and clear ownership models.

This portfolio supports several future paths without choosing one prematurely:

- deeper AI Platform leadership;
- Staff/Principal-level public authority;
- conference and media work;
- author/product business;
- selective advisory or education;
- future independent platform engineering products.

The site should maximize this option value before optimizing for short-term content revenue.

## 13. Risks and controls

### Risk: four disconnected mini-sites

Control: shared topic/layer metadata and explicit related-artifact links.

### Risk: duplicated content

Control: each surface has a distinct job; Handbook synthesizes rather than copies.

### Risk: Handbook never feels complete

Control: versioned reviewed spine and downloadable edition snapshots.

### Risk: monetization reduces trust

Control: public core remains useful; paid value is implementation and packaging.

### Risk: author maintenance overload

Control: one content source, generated relationships, selective translation and no membership/community obligation at launch.

### Risk: conflict with employer or confidential work

Control: sanitized examples, public-source references, explicit side-project/IP review before paid launch and no confidential scale claims.

## 14. Convergence result

The stable product model is:

> `notevskii.tech` is the author-led engineering publication of Сергей Нотевский. Articles develop ideas, talks communicate them, projects make them executable, and Production AI Platform Handbook maintains the structured reference model.

The stable Handbook format is:

> Open and web-first as the canonical living reference; versioned free starter artifacts for distribution; future paid implementation editions and team artifacts only after demand and operational readiness are demonstrated.

This resolves the previous false choice between “everything is the Handbook” and “the Handbook is only another menu item.” It is the flagship synthesis inside a broader, coherent public practice.