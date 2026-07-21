# notevskii.tech v2 — Specification Review

Review mode: goal-driven self-review until no material contradiction or unbounded implementation choice remains.

Documents reviewed:

- `GOAL.md`
- `PUBLICATION_MODEL.md`
- `SPEC.md`
- `DECISIONS.md`
- `HANDBOOK_STRATEGY.md`
- `HANDBOOK_CONVERGENCE_REVIEW.md`
- `DESIGN_DIRECTION.md`

## Review rubric

The specification is converged when it is:

1. aligned with one product model;
2. internally consistent;
3. testable;
4. bounded enough to estimate and implement;
5. explicit about non-goals;
6. safe regarding privacy, employer boundaries and confidential information;
7. maintainable by one primary author with a full-time leadership role;
8. resilient to implementation agents making locally reasonable but globally wrong choices;
9. clear about the present open/public boundary and future paid-product gates.

## Pass 1 — Public-work inventory and product coherence

### Findings

- The current public track is not only a Handbook: it includes articles, talks, Telegram distribution, open-source work and career evidence.
- Treating the entire site as the Handbook would hide important professional signals.
- A generic personal site would fail to compound the work into a coherent body.

### Corrections

- Defined an author-led engineering publication with four durable surfaces: Articles, Handbook, Projects and Talks.
- Kept the Handbook as the flagship structured synthesis.
- Defined the author as site-level identity and accountable editor.

### Result

Accepted. The site now represents the whole public practice without becoming a miscellaneous portfolio.

## Pass 2 — Surface boundaries

### Findings

- Consolidating Writing, Talks and Projects into one Materials library erased distinct user jobs.
- Separate surfaces could still become disconnected mini-sites.

### Corrections

- Restored Articles, Projects and Talks as first-class destinations.
- Added shared problem/layer/topic metadata and cross-surface relationships.
- Defined each surface's distinct job.

### Result

Accepted. Clear navigation and one knowledge graph coexist.

## Pass 3 — Articles vs Handbook duplication

### Findings

- The same topic may appear in Telegram, Habr, a talk, a project and the Handbook.
- Without a lifecycle, maintenance would become duplicate editing.

### Corrections

- Defined:
  - Telegram = observations/distribution;
  - Articles = developed reasoning;
  - Talks = compressed communication;
  - Projects = executable evidence;
  - Handbook = reviewed synthesis.
- Prohibited byte-for-byte duplication as the default strategy.

### Result

Accepted. Related artifacts can coexist with distinct purpose.

## Pass 4 — Handbook format and monetization

### Findings

- The choice between fully free and fully paid was falsely binary.
- A paywalled full Handbook would weaken current category, career and open-source goals.
- A forever-open position would close useful future product options unnecessarily.

### Corrections

- Chose open, web-first, living Handbook as the canonical source.
- Added a free versioned map/starter PDF/poster.
- Deferred paid membership/community.
- Defined future Practitioner Edition / Operating Kit as packaging, editable artifacts, offline edition and team workflows.
- Added commercial decision gates.

### Result

Accepted. Public authority and future revenue option are compatible.

## Pass 5 — Career and author fit

### Findings

- The author is a current AI Platform Lead with limited maintenance time, not a full-time publisher.
- A recurring paid newsletter/community would create a cadence and customer-operation burden.
- The site should support several future paths without forcing a near-term independent-creator strategy.

### Corrections

- Made no paid recurring cadence a launch requirement.
- Optimized the public model for technical depth, systems thinking, execution and communication.
- Kept selective team/advisory work optional and secondary.
- Required employer/side-project/IP review before paid launch.

### Result

Accepted. The product compounds career capital and commercial optionality.

## Pass 6 — Information architecture and migration

### Findings

- Previous navigation optimized for the Handbook only.
- Legacy routes and current pages could break silently.
- Browser tools could compete with Projects and Handbook.

### Corrections

- Selected global navigation: Articles, Handbook, Projects, Talks, About.
- Kept tools under direct routes but not necessarily top-level navigation.
- Required a route-by-route migration manifest and tested redirects.

### Result

Accepted. Global user intent and legacy safety are explicit.

## Pass 7 — Content architecture and publication operations

### Findings

- Different artifact kinds require different lifecycle fields.
- A single flat status model would either overburden articles/talks or weaken Handbook governance.
- PDF editions could become a second source of truth.

### Corrections

- Added per-kind validated metadata.
- Kept reviewed/maintained governance specific to normative Handbook artifacts.
- Derived indexes, relationships, SEO, RSS and PDF/print sources from one pipeline.
- Prohibited agents from self-promoting Handbook content to reviewed.

### Result

Accepted. One author can maintain the system without manual catalogue drift.

## Pass 8 — Visual system

### Findings

- The first mockup resembled an AI SaaS/dashboard.
- A Handbook-cover homepage no longer represented the four-surface model.
- Article, talk and project pages needed distinct archetypes.

### Corrections

- Retained Dark Engineering Publication.
- Made the homepage an author-publication front page.
- Added seven page archetypes: homepage, article, Handbook, project, talk, tool and map.
- Rejected decorative 3D, neon diagrams, vanity counters and repeated card walls.

### Result

Accepted. The design supports the publication rather than simulating product marketing.

## Pass 9 — Tools, privacy and precision

### Findings

- Existing calculator/checklist semantics can imply unsupported precision.
- Free-text tools become a privacy risk when analytics or replay is introduced.

### Corrections

- Separated cacheable token share and runtime hit rate.
- Replaced naive readiness percentage with blockers/evidence.
- Made maturity outputs capability-based rather than a vanity score.
- Prohibited transmission/replay of tool inputs.
- Required local export and assumptions.

### Result

Accepted. Tools support decisions honestly.

## Pass 10 — Technical feasibility and release scope

### Findings

- A redesign could trigger an unnecessary framework migration.
- The full current archive and language parity would make the launch unbounded.
- Paid infrastructure could distract from product proof.

### Corrections

- Kept static Next.js/MDX architecture.
- Selected narrow article/talk/project migration and 6–8 reviewed Handbook artifacts.
- Kept Russian full-depth and English selective.
- Deferred payment/account/membership systems.

### Result

Accepted. The release is bounded and compatible with current hosting.

## Cross-document consistency check

| Concern | Goal | Spec | Decision | Strategy | Status |
|---|---|---|---|---|---|
| Site model | Four-surface author publication | Four page/product surfaces | D-001 | Publication model | Consistent |
| Author/Handbook hierarchy | Author site, flagship Handbook | Brand architecture | D-002/D-005 | Handbook role | Consistent |
| Navigation | Articles/Handbook/Projects/Talks/About | Route tree | D-003 | Publication model | Consistent |
| Surface relationships | One practice | Shared metadata/content model | D-004/D-017 | Knowledge lifecycle | Consistent |
| Handbook access | Public web core | Open launch boundary | D-006 | Canonical format | Consistent |
| Future paid product | Optional implementation layer | Commercial readiness | D-007/D-025 | Practitioner/Operating Kit | Consistent |
| Articles | Owned editions, external distribution | Article spec | D-008 | Distribution model | Consistent |
| Talks | Recording + summary | Talk spec | D-009 | Four surfaces | Consistent |
| Project | First-class project page | Project spec | D-010 | audit-prompt-caching role | Consistent |
| Launch breadth | Complete surfaces + narrow reviewed spine | Implementation sequence | D-013 | Launch spine | Consistent |
| English | Selective | Selective routes | D-014 | Russian-first | Consistent |
| Static boundary | Required | No backend at launch | D-016 | Open web model | Consistent |
| Metadata | One source | Generated pipeline | D-017 | Editions from same source | Consistent |
| Privacy | Local tools | Analytics restrictions | D-020/D-021 | Commercial/public boundary | Consistent |
| Visual | Dark engineering publication | Seven archetypes | D-023 | Design direction | Consistent |
| Publication governance | Per-kind lifecycle | Content checks | D-024 | Editorial governance | Consistent |

## Remaining hypotheses

These are prototype or inventory inputs, not product blockers:

- final `Статьи` vs `Блог` navigation label;
- exact homepage featured-item hierarchy;
- selected launch articles and talks;
- final free PDF name;
- final future paid product name;
- voluntary email update feed timing;
- exact payment implementation if commercial gates are met;
- GitHub Pages-compatible permanent redirect implementation;
- exact portrait and public evidence items.

## Convergence verdict

**Converged for content inventory, migration planning and visual prototypes.**

Stable product definition:

> `notevskii.tech` is the author-led engineering publication of Сергей Нотевский. Articles develop arguments, talks communicate them, projects make the practice executable, and Production AI Platform Handbook maintains the reviewed reference model.

Stable Handbook/commercial definition:

> The Handbook is open, living and web-first. A free versioned starter artifact supports distribution. Future paid value comes from curated editions, editable implementation assets and team workflows after demand and operational readiness are demonstrated.

The specification should be reopened before implementation only if a stakeholder proposes changing:

- the four-surface publication model;
- author/Handbook brand hierarchy;
- open core Handbook boundary;
- future paid implementation boundary;
- global navigation;
- static/private tool boundary;
- reviewed Handbook quality bar;
- selective English strategy;
- bounded launch breadth.