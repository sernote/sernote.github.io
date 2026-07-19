# Production AI Platform Handbook — Product Strategy

Status: **normative, converged**  
Supersedes any interpretation of v2 as a personal site with a handbook section.

## 1. Strategic thesis

The primary product is **Production AI Platform Handbook**.

The site exists because the number of companies that need an internal AI platform will grow faster than the number of teams that already know how to design, operate and govern one. The gap is not mainly about choosing a model. It is about turning a changing set of models, runtimes, gateways, caches, evaluation systems, observability, security controls and ownership boundaries into a reliable production capability.

The Handbook is a living engineering system for that gap.

It should help a team answer:

- do we need an AI platform at all;
- what belongs inside the platform boundary;
- which capabilities should be centralized and which should remain with product teams;
- how to move from direct model calls to a managed production architecture;
- how to measure quality, latency, capacity, cost and risk;
- how to choose MaaS, self-hosted or hybrid execution;
- how to structure ownership, lifecycle and release control;
- what to build next at the team's current maturity level.

## 2. Brand architecture

### Product brand

**Production AI Platform Handbook**

Russian descriptor:

> Практический хэндбук по созданию и развитию AI-платформы в продакшене.

Core promise:

> От запроса на свою AI-платформу — к работающей архитектуре, эксплуатационной модели и последовательному плану развития.

Problem-level promise:

> От симптома в продакшене — к инженерному решению.

### Author brand

**Сергей Нотевский — автор и практик.**

The author is not a parallel product and not a decorative byline. He is the Handbook's trust layer:

- real platform-building experience;
- public technical reasoning;
- talks, articles and open-source artifacts;
- explicit editorial judgment;
- accountability for what is marked reviewed.

Preferred hierarchy in product surfaces:

```text
Production AI Platform Handbook
by Сергей Нотевский
```

The domain may remain `notevskii.tech`; the visible product brand is the Handbook.

## 3. Category definition

The Handbook defines **AI Platform** as an organizational and technical capability that gives product teams a controlled way to build and operate AI scenarios.

It is broader than inference serving and narrower than the entire AI organization.

The platform boundary may include:

1. scenario intake and platform contracts;
2. model and provider access;
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

The Handbook must make this boundary explicit because “we need our own AI platform” is otherwise too vague to guide investment.

## 4. Primary audience and maturity states

The product serves teams at four maturity states.

### M0 — Direct integration

Product teams call external or local models directly. There is no unified telemetry, quality gate, quota model or owner.

Primary question:

> Do we already have a platform problem?

### M1 — Shared access layer

A gateway or shared inference service exists, but it is mainly a transport and credential layer.

Primary question:

> What should become a real platform capability next?

### M2 — Managed platform

Routing, observability, evals, quotas, model lifecycle and operating responsibilities are becoming explicit.

Primary question:

> How do we make the platform predictable and scalable?

### M3 — Productized platform

The platform has internal customers, contracts, lifecycle, cost allocation, release control, SLOs and a roadmap.

Primary question:

> How do we optimize the platform as a business-critical internal product?

The site must support both entry modes:

- **maturity-first:** “where are we and what is next?”;
- **symptom-first:** “we have a concrete production problem.”

## 5. Product model

The Handbook is not one long book and not a flat documentation portal. It is a linked system of six artifact types.

### 5.1 Map

A stable map of platform responsibilities and relationships.

Purpose:

- define the category;
- provide orientation;
- act as the canonical navigation model;
- expose gaps and ownership boundaries.

### 5.2 Chapters

Durable explanations of one platform capability or decision.

A reviewed chapter should normally contain:

- executive summary;
- when this problem appears;
- decision model;
- reference architecture;
- metrics and telemetry;
- failure modes;
- ownership boundary;
- implementation sequence;
- review checklist;
- references and last-reviewed date.

### 5.3 Playbooks

Operational sequences for recurring work.

Examples:

- introduce a gateway without breaking product teams;
- migrate traffic to self-hosted inference;
- investigate low prefix-cache reuse;
- establish an eval release gate;
- plan GPU capacity;
- onboard a new product scenario;
- respond to an AI-platform incident.

### 5.4 Decision records and templates

Reusable working documents rather than explanatory prose.

Examples:

- MaaS vs self-hosted decision record;
- model onboarding checklist;
- telemetry contract;
- quota request template;
- eval plan;
- incident review;
- ownership/RACI template;
- platform capability scorecard.

### 5.5 Tools

Local, explainable diagnostics and calculators tied to chapters.

Tools are not a separate unrelated mini-product. Every tool must have:

- a clearly named decision it supports;
- linked Handbook concepts;
- explicit assumptions;
- explainable output;
- a next action;
- local-only handling of user data where possible.

### 5.6 Evidence and extensions

Articles, talks, podcasts, repositories and sanitized cases extend or substantiate the Handbook.

They do not define the primary information architecture.

## 6. Canonical product journey

The preferred journey is:

```text
Need / symptom
  → maturity or platform layer
  → decision model
  → chapter or playbook
  → template / tool
  → implementation action
  → related capability
```

The product fails when the visitor ends on “interesting content” without knowing what to inspect, decide or do next.

## 7. Homepage role

The homepage is the Handbook cover, orientation layer and main entry point.

First viewport:

- product name;
- concise category definition;
- author attribution;
- primary CTA: `Понять, нужна ли вам AI-платформа`;
- secondary CTA: `Открыть карту платформы`;
- compact, verifiable author evidence.

The first major interactive choice should be:

### “Где вы сейчас?”

- модели вызываются напрямую;
- появился общий gateway;
- разворачиваем локальные модели;
- строим evals и release control;
- не понимаем стоимость и GPU capacity;
- платформа уже есть, но плохо управляется.

The second entry should be:

### “Что болит?”

- стоимость;
- качество;
- задержка;
- GPU capacity;
- routing and agents;
- cache;
- observability;
- security;
- ownership.

The platform map follows these entry points and becomes the long-term signature visual.

## 8. Top-level information architecture

Recommended global navigation:

1. **Карта**
2. **Хэндбук**
3. **Плейбуки**
4. **Инструменты**
5. **Материалы**

Persistent utility:

- search;
- locale switch;
- `Об авторе`;
- CTA `Обсудить AI-платформу`.

Rationale:

- the map deserves top-level status because it defines the category and is a primary entry point;
- chapters and playbooks solve different jobs: understanding vs execution;
- tools are retained as explicit product surfaces;
- materials remain secondary evidence/distribution;
- author information is always reachable but does not consume a primary product slot.

## 9. Launch product, not launch archive

The initial release should feel complete even if the full knowledge base is not.

### Required launch spine

1. What an AI platform is and when a company needs one.
2. Platform map and capability boundaries.
3. MaaS vs self-hosted vs hybrid.
4. Gateway, contracts, quotas and routing.
5. Inference and capacity fundamentals.
6. Evals and release control.
7. Observability and incident diagnosis.
8. Cost attribution and unit economics.
9. Ownership and operating model.

This is the minimum coherent narrative.

A narrower set of high-quality supporting artifacts is acceptable. A launch without this spine is not.

### Required launch tools/templates

- AI Platform Maturity Assessment;
- Cost and capacity model;
- Release readiness review;
- MaaS/self-hosted decision template;
- telemetry contract template;
- platform ownership checklist.

The current cacheability tool may launch as an advanced companion if its semantics are corrected, but it is less central to the category-entry journey than the maturity assessment.

## 10. Growth loops

The Handbook grows through four reinforcing loops.

### Practice loop

Real platform work produces sanitized patterns, failures, metrics and decisions. These become reviewed Handbook artifacts.

### Content loop

A chapter produces:

- a Telegram post;
- a Habr article;
- a conference segment;
- a diagram;
- a checklist or tool;
- links back to the canonical Handbook page.

External channels distribute; the Handbook accumulates.

### Search loop

Evergreen problem pages answer specific high-intent queries and lead into the broader platform model.

Examples:

- when do you need an AI platform;
- LLM gateway architecture;
- MaaS vs self-hosted LLM;
- LLM cost attribution;
- AI platform maturity model;
- production LLM evals;
- prefix cache hit rate;
- GPU capacity planning for LLM inference.

### Authority loop

The growing Handbook makes talks, interviews, advisory discussions and career opportunities more credible. Those interactions generate new questions and evidence for the Handbook.

## 11. Commercial boundary

The public Handbook should remain genuinely useful and not degrade into a lead-generation shell.

Possible qualified outcomes:

- architecture review;
- platform maturity assessment;
- workshop or internal lecture;
- conference or podcast request;
- collaboration on an engineering artifact;
- relevant leadership opportunity.

The public product must not hide basic decision value behind contact forms.

A commercial service is introduced only when its scope, inputs, output and evidence are concrete enough to deserve a dedicated surface.

## 12. Editorial governance

The product is author-led, not anonymously community-edited.

Every reviewed artifact has:

- an explicit author/editor;
- reviewed date;
- maturity status;
- evidence and references;
- applicability boundaries;
- known uncertainty where appropriate.

External contributions may be accepted later, but the Handbook must preserve a coherent editorial position rather than becoming a link wiki.

## 13. Visual identity

The desired identity is a **living engineering handbook and control-plane atlas**.

It should feel:

- authoritative but not institutional;
- technical but readable;
- dense where useful, not card-heavy everywhere;
- diagram-led;
- maintained and versioned;
- clearly authored.

Avoid:

- generic AI gradients and glowing brains;
- fake dashboards;
- portfolio hero patterns;
- visual imitation of vendor documentation;
- an “online course” aesthetic;
- excessive terminal cosplay.

The signature visual system should derive from:

- the platform map;
- system boundaries;
- flows and dependencies;
- maturity states;
- operational signals;
- editorial annotations.

## 14. Naming decisions

### Selected

**Production AI Platform Handbook**

Reasons:

- “Production” sets the quality and operational boundary;
- “AI Platform” defines the emerging category;
- “Handbook” supports chapters, playbooks, tools, templates and continuous updates;
- the name is understandable internationally;
- it can outgrow a personal portfolio without severing the author connection.

### Rejected as master product names

- `Field Guide` — useful tone, but sounds narrower and less canonical;
- `Playbook` — too execution-only for architecture and conceptual material;
- `Manual` — implies product documentation;
- `Knowledge Base` — generic and weakly authored;
- `AI Platform Engineering` — category name, not product identity;
- Russian-only translated master name — reduces international continuity.

“Field guide” and “playbook” remain valid artifact labels inside the Handbook.

## 15. Revised product hierarchy

```text
Production AI Platform Handbook
│
├── Platform Map
├── Handbook Chapters
├── Playbooks
├── Templates and Decision Records
├── Tools
├── Cases and Evidence
└── Materials

Authored and edited by Сергей Нотевский
```

The personal site is therefore not removed. It is absorbed into a stronger authored product.

## 16. Convergence review

### Tension: product brand vs personal authority

Resolution: the Handbook is the visible product; Сергей is the named author, editor and trust layer. Neither is hidden.

### Tension: broad category vs practical usefulness

Resolution: the map and maturity model define the broad system; every chapter must terminate in a decision, checklist, template or next action.

### Tension: book structure vs problem-oriented navigation

Resolution: canonical chapters provide durable structure; maturity and symptom routes provide entry paths into the same content graph.

### Tension: launch completeness vs author capacity

Resolution: launch a coherent nine-part spine with a small reviewed artifact set; retain explicit maturity states for everything else.

### Tension: Russian depth vs international name

Resolution: keep the master product name in English; Russian explanatory copy and content remain primary; English is a selective maintained subset.

### Tension: public utility vs conversion

Resolution: public artifacts deliver real value without registration; qualified contact appears after or alongside useful work, not instead of it.

### Tension: living resource vs content decay

Resolution: reviewed status, last-reviewed dates, review cycles, archived states and generated stale-content reports are part of the product model.

## 17. Final normative statement

`notevskii.tech` v2 must be designed and implemented as the home of **Production AI Platform Handbook**, authored by Сергей Нотевский.

It must not regress into:

- a generic personal portfolio;
- a chronological technical blog;
- a flat collection of unrelated tools;
- a huge unfinished documentation tree;
- a sales landing page disguised as a knowledge product.

The product wins when a team that has started asking “do we need our own AI platform, and what exactly should it be?” can use the Handbook to understand its current state, choose the next capability and act with less architectural uncertainty.