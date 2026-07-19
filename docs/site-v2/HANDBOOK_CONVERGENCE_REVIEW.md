# Handbook-first strategy — convergence review

Status: **passed after corrections**

This review checks the new Handbook-first strategy against the earlier goal, specification and decision register.

## 1. Findings that required correction

### F-01 — “Field guide” was too weak as the master product model

The earlier specification correctly made knowledge the primary product, but `author-led field guide` left too much room for the implementation to remain a personal site with a strong content section.

**Correction:** the master product is now explicitly `Production AI Platform Handbook`.

### F-02 — Author brand was previously defined as the site-level master brand

That decision conflicted with the strategic opportunity to build an enduring category product.

**Correction:**

- visible product brand: `Production AI Platform Handbook`;
- author/editor/trust layer: `Сергей Нотевский`;
- domain remains personal and preserves accumulated authority;
- author identity remains explicit on every core surface.

### F-03 — Previous navigation underweighted the platform map

The map was described as the signature artifact but remained nested inside the Handbook.

**Correction:** `Карта` becomes a top-level destination and the primary category-defining surface.

### F-04 — Chapters and operational playbooks were mixed

An explanatory chapter and a step-by-step operational sequence have different reading and maintenance models.

**Correction:** `Хэндбук` and `Плейбуки` become distinct product surfaces backed by the same content graph.

### F-05 — Launch scope over-prioritized existing tools

Migrating three current tools would optimize for sunk cost rather than the new primary journey.

**Correction:** the launch tool priority becomes:

1. AI Platform Maturity Assessment;
2. Cost and Capacity Model;
3. Release Readiness Review.

Cacheability Review remains valuable but becomes an advanced artifact rather than a category-entry requirement.

### F-06 — The earlier goal started from production symptoms but not from organizational demand

The emerging demand is broader: companies will ask whether they need their own AI platform before they can name a cache, routing or observability problem.

**Correction:** add two canonical entry paths:

- `Нужна ли нам AI-платформа и что в неё должно входить?`;
- `У нас уже есть конкретный production symptom.`

### F-07 — Launch artifacts did not form a sufficiently explicit narrative spine

A set of individually strong articles could still feel fragmented.

**Correction:** require a coherent launch spine from platform need and boundary through architecture, quality, operations, economics and ownership.

## 2. Decisions retained unchanged

The following earlier decisions remain valid:

- keep Next.js, TypeScript, MDX and static export;
- Russian-first, selective English;
- static and private by default;
- no accounts, comments or backend persistence at launch;
- content metadata is the source of truth;
- reviewed/draft/archived states are explicit;
- tools must be explainable and must not imply unsupported precision;
- materials consolidate articles, talks, podcasts and repositories;
- production implementation follows comparison of materially different visual directions;
- existing URLs require an explicit migration manifest;
- agent-produced content cannot self-promote to reviewed.

## 3. Updated normative decisions

### H-001 — Master product

The site is the home of `Production AI Platform Handbook`.

### H-002 — Author relationship

`Сергей Нотевский` is the named author, editor and trust layer. The author is not a separate competing product.

### H-003 — Category boundary

The Handbook covers the organizational and technical capability between product AI scenarios and underlying models/providers. It does not claim to describe the whole AI organization.

### H-004 — Dual entry model

Users enter by maturity state or production symptom. Both resolve into the same canonical content graph.

### H-005 — Product primitives

The canonical artifact types are:

- map;
- chapter;
- playbook;
- template/decision record;
- tool;
- evidence/extension.

### H-006 — Navigation

Default top-level product navigation:

- Карта;
- Хэндбук;
- Плейбуки;
- Инструменты;
- Материалы.

Author, search, locale and contact are persistent utilities.

### H-007 — Launch narrative

The launch must explain, as one coherent sequence:

- when an AI platform becomes necessary;
- what belongs inside it;
- which execution strategy to choose;
- how gateway/routing/inference fit together;
- how quality and release control work;
- how the system is observed and operated;
- how cost and capacity are attributed;
- who owns each responsibility.

### H-008 — First diagnostic product

The first broad-audience tool is an AI Platform Maturity Assessment. It gives an explainable state, gaps and next capabilities; it must not return a vanity score without evidence.

### H-009 — Public value boundary

The Handbook delivers complete basic decision value without registration or mandatory contact. Contact is a qualified next step, not the withheld answer.

### H-010 — Living handbook model

Every reviewed artifact has a review date, applicability boundary and maintenance state. Staleness is visible and reportable.

## 4. Consistency checks

### Brand consistency

Passed. The product and author now reinforce rather than compete with each other.

### Audience consistency

Passed. The maturity model supports both teams just discovering a platform need and experienced platform engineers diagnosing a subsystem.

### Content consistency

Passed. The launch spine, map, chapters, playbooks, templates and tools form one content graph rather than parallel libraries.

### Conversion consistency

Passed. The product can produce authority and qualified inbound without weakening public usefulness.

### Maintenance consistency

Passed. The design remains compatible with a single primary author, agent assistance, static deployment and selective translation.

### Technical consistency

Passed. No new strategy requirement forces authentication, server persistence or a framework migration.

### Scope consistency

Passed with correction. Not every listed launch-spine topic requires a full long chapter; some may be a compact reviewed chapter plus template. Coherence is mandatory, equal depth is not.

## 5. Remaining hypotheses, not blockers

These should be tested during visual/content prototyping rather than debated abstractly:

1. Whether the visible master title should always be English or use a Russian short label in navigation.
2. Whether `Плейбуки` deserves a top-level item at launch or can initially be a Handbook view while content count is low.
3. Whether the first CTA converts better as `Понять, нужна ли вам AI-платформа` or `Оценить зрелость AI-платформы`.
4. Whether the 12-layer map is best rendered as a control-plane topology, layered system, capability matrix or annotated operating model.
5. Whether `notevskii.tech` should later gain a product-specific alias domain. This is explicitly deferred and does not block v2.

These hypotheses have bounded alternatives and test methods. They do not reopen the product hierarchy.

## 6. Final convergence result

The strategy is converged at the product level.

The stable core is:

> Production AI Platform Handbook is a living, authored engineering product for teams deciding whether they need their own AI platform, defining its boundary and developing it into a reliable internal product.

Further work should now change evidence, copy, visual expression and implementation details—not the primary product definition.