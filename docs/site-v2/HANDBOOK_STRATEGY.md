# Production AI Platform Handbook — Product and Format Strategy

Status: **normative, converged**  
Depends on: [`PUBLICATION_MODEL.md`](./PUBLICATION_MODEL.md), [`GOAL.md`](./GOAL.md)

## 1. Role inside notevskii.tech

`Production AI Platform Handbook` is the flagship structured knowledge product of Сергей Нотевский's engineering publication.

It is not:

- the entire site;
- a chronological blog;
- a renamed collection of every article;
- a static one-time ebook;
- a teaser built only to collect leads;
- a documentation shell around unrelated tools.

The publication relationship is:

```text
Articles develop ideas.
Talks compress and communicate them.
Projects make parts of the practice executable.
The Handbook preserves reviewed synthesis.
```

The Handbook should become the canonical reference layer for Production AI Platform concepts while the broader site continues to show the author's current work, communication and software artifacts.

## 2. Strategic thesis

The number of companies that need shared AI-platform capabilities is likely to grow faster than the number of teams that already know how to design, operate and govern them.

The gap is not mainly model selection. It is the work of turning changing models, runtimes, gateways, caches, eval systems, observability, security controls, costs and ownership boundaries into a reliable internal product.

The Handbook helps teams answer:

- do we need an AI platform at all;
- what belongs inside its boundary;
- what should remain with product teams;
- which capability should be centralized next;
- which capability is premature;
- how to choose MaaS, self-hosted or hybrid execution;
- how to measure quality, latency, capacity, cost and risk;
- how to structure release control, lifecycle, incidents and ownership.

## 3. Category boundary

The Handbook defines an **AI Platform** as an organizational and technical capability that gives product teams a controlled way to build and operate AI scenarios.

It is broader than model serving and narrower than the whole AI organization.

The reference boundary may include:

1. scenario intake and platform contracts;
2. model/provider access;
3. gateway, policy and quotas;
4. execution routing;
5. inference runtimes for LLM, STT, embeddings and multimodal models;
6. prefix/KV caching and request-shape control;
7. model lifecycle and compatibility;
8. evals, release gates and regression control;
9. traces, metrics, logs and incident diagnostics;
10. cost attribution, capacity and unit economics;
11. security, guardrails and audit;
12. operating model, ownership and support.

## 4. Canonical format decision

The canonical Handbook is:

> **Open, web-first, linked and continuously maintained.**

The web version is the source of truth because it supports:

- incremental publication;
- stable links;
- cross-linking to articles, talks and projects;
- search and SEO;
- corrections and review dates;
- multiple artifact types;
- selective English translation;
- generated PDF/EPUB/print editions from one source.

The Handbook is not required to wait for “book completion.” It may launch with a coherent reviewed spine and expand in public.

## 5. Product primitives

The Handbook is a linked system of six artifact types.

### 5.1 Map

A stable model of platform responsibilities, dependencies and ownership.

Purpose:

- define the category;
- orient teams;
- expose missing capabilities;
- connect symptoms to artifacts;
- support talks, PDF, print and workshops.

### 5.2 Chapters

Durable explanations of a platform capability or decision.

A reviewed chapter normally contains:

- executive summary;
- applicability boundary;
- symptoms;
- mental/decision model;
- reference architecture;
- metrics and telemetry;
- trade-offs;
- failure modes;
- ownership boundary;
- implementation sequence;
- review checklist;
- references and last-reviewed date.

### 5.3 Playbooks

Operational sequences for recurring work.

Examples:

- introduce a gateway;
- migrate a scenario to self-hosted inference;
- investigate low prefix-cache reuse;
- establish an eval release gate;
- plan GPU capacity;
- onboard a new scenario;
- respond to an AI-platform incident.

Chapters explain. Playbooks direct action.

### 5.4 Templates and decision records

Reusable working artifacts:

- MaaS vs self-hosted ADR;
- scenario intake form;
- model onboarding checklist;
- telemetry contract;
- quota request;
- eval plan;
- incident review;
- ownership matrix;
- capability scorecard.

### 5.5 Tools

Local explainable diagnostics tied to a real decision.

Examples:

- AI Platform Maturity Assessment;
- Cost and Capacity Model;
- Release Readiness Review;
- Cacheability Review.

A tool must disclose assumptions and never replace the chapter explaining its model.

### 5.6 Editions

Versioned snapshots generated from the same source:

- free starter guide;
- print/PDF map;
- future curated practitioner edition;
- future team operating kit.

Edition files do not become a separate manually maintained content source.

## 6. Entry modes

The Handbook supports two primary entry paths.

### Maturity and boundary

- direct model integrations;
- shared access/gateway;
- self-hosted or hybrid execution;
- routing, quotas and model lifecycle;
- evals and observability;
- cost/capacity and operating model;
- productized internal platform.

Core questions:

- do we already have a platform problem;
- what should become shared next;
- what should remain decentralized;
- what should not be built yet.

### Production symptom

- cost;
- quality;
- latency;
- GPU capacity;
- routing and agent loops;
- cache;
- observability;
- security;
- ownership.

Both entry paths resolve into the same content graph.

## 7. Launch spine

The launch should feel coherent even while the Handbook remains intentionally incomplete.

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

This may be implemented as 6–8 substantial reviewed artifacts plus compact bridge artifacts. Equal depth is not required; narrative continuity is.

## 8. Relationship to the other publication surfaces

### Articles

An article may:

- explore one experiment or anti-pattern deeply;
- express a time-bound view;
- compare vendors or current behavior;
- show the reasoning history that led to a Handbook conclusion.

The Handbook links to the article as evidence or further reading. It does not copy it verbatim.

### Talks

A talk may synthesize several Handbook capabilities into one narrative.

The talk page links to relevant Handbook sections; the Handbook may link to the talk as an accessible explanation or public evidence.

### Projects

A project implements or audits one part of the Handbook model.

`audit-prompt-caching` connects to:

- cache/request-shape chapter;
- cache audit playbook;
- inference economics;
- observability fields;
- provider/runtime references.

The project remains independently usable and open source.

## 9. Free distribution artifacts

### Production AI Platform Map

Formats:

- interactive web;
- static SVG/PNG;
- print-safe PDF/poster;
- slide-ready version.

### Production AI Platform Map & Starter Guide

A free versioned artifact, approximately one concise managerial/technical reading session rather than a superficial advertisement.

Suggested contents:

1. category definition;
2. 12-capability map;
3. maturity path;
4. signs that a platform is needed;
5. what to centralize and what not to centralize;
6. first decision checklist;
7. links into the public web Handbook.

It should be directly useful and easy to forward internally.

No email gate is required at launch. A voluntary update subscription may be added later.

## 10. Commercial format options

### Rejected launch option — free summary, paid useful Handbook

Reasons:

- reduces category reach and search visibility;
- hides the strongest career and authority evidence;
- makes the open-source and talk ecosystem less connected;
- creates payment/support obligations before demand is proven;
- creates pressure to imply completeness;
- increases employer/IP and conflict-boundary complexity.

### Preferred future option — Practitioner Edition / Operating Kit

The future paid product should reduce implementation work, not merely reveal more paragraphs.

Possible components:

- curated PDF/EPUB edition;
- editable ADR/RFC templates;
- maturity assessment workbook;
- cost/capacity workbook;
- telemetry contract;
- ownership matrix;
- release-readiness pack;
- workshop deck and facilitation notes;
- implementation sequences;
- print-ready map bundle;
- defined edition update period;
- individual and team terms.

Working names:

- `Production AI Platform Practitioner Edition`;
- `Production AI Platform Operating Kit`.

The paid bundle may contain denser packaging and advanced working artifacts while the public web Handbook remains complete enough to support real decisions.

### Optional high-touch layer

Possible later offerings:

- facilitated maturity assessment;
- architecture review;
- internal workshop;
- implementation planning session.

These remain selective and must not turn the public site into a consultancy funnel.

## 11. Monetization sequence

### Phase 1 — public authority and product proof

- public web Handbook;
- free map/starter guide;
- reviewed launch spine;
- connection to articles, talks and `audit-prompt-caching`;
- privacy-conscious analytics if enabled;
- collect qualitative demand signals.

### Phase 2 — paid self-serve artifact

Only after demand signals:

- release a one-time/versioned Practitioner Edition or Operating Kit;
- define exactly what purchasers receive;
- define update duration;
- support invoices/receipts/refunds/access appropriately;
- keep the web Handbook public.

### Phase 3 — team formats

Only after real team usage:

- team license;
- workshop pack;
- facilitated assessment;
- corporate learning or implementation edition.

### Not the default path

- recurring paid newsletter;
- paid community;
- frequent members-only publishing;
- mandatory account system.

These require a reliable editorial cadence and customer/community operations that may conflict with a full-time leadership role.

## 12. Commercial decision gates

Do not build a paid Handbook product until several signals exist:

- coherent reviewed public spine;
- repeated requests for PDF, print, offline, editable or team formats;
- named templates/checklists used in real work;
- inbound team requests referencing specific public artifacts;
- ability to commit to an edition and update policy;
- acceptable payment, invoice, refund, access and support operations;
- explicit review of employer/side-project/IP boundaries.

Analytics should first establish a baseline before hard numeric thresholds are adopted.

## 13. Editorial governance

Every reviewed Handbook artifact has:

- explicit author/editor;
- reviewed date;
- applicability boundary;
- references/evidence;
- known uncertainty where appropriate;
- review cycle;
- relationships to relevant articles, talks, projects and other Handbook artifacts.

Agent-created content cannot self-promote to reviewed status without explicit author review.

The Handbook remains author-led rather than becoming an uncurated link wiki.

## 14. Visual identity

The Handbook should feel like:

- a maintained engineering book;
- an architecture atlas;
- an RFC/playbook library;
- a calm technical publication.

Avoid:

- AI SaaS marketing;
- fake dashboards;
- cyberpunk neon;
- course-platform visuals;
- excessive terminal cosplay;
- identical rounded cards for every artifact;
- hiding prose behind interface chrome.

The map should look usable in an architecture review, technical article, conference slide and printout.

## 15. Converged decision

The stable Handbook strategy is:

> Production AI Platform Handbook is the open, living and reviewed synthesis layer of Сергей Нотевский's engineering publication. The web version remains canonical and public; a free versioned map/starter artifact supports distribution; future paid value comes from curated editions, editable implementation assets and team workflows rather than withholding the basic reference model.

This format maximizes present career and category authority while preserving a credible path to a paid product when demand and operational readiness are real.