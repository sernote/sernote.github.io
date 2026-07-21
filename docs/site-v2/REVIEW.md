# notevskii.tech v2 — Specification Review

Review mode: goal-driven self-review until no material contradiction or unbounded implementation choice remains.

Documents reviewed:

- `GOAL.md`
- `SPEC.md`
- `DECISIONS.md`
- `HANDBOOK_STRATEGY.md`
- `DESIGN_DIRECTION.md`

## Review rubric

The specification is considered converged when it is:

1. aligned with one product goal;
2. internally consistent;
3. testable;
4. bounded enough to estimate and implement;
5. explicit about non-goals;
6. safe regarding privacy and confidential information;
7. maintainable by one primary author;
8. resilient to implementation agents making locally reasonable but globally wrong choices.

## Pass 1 — Product coherence

### Findings

- The existing product could still be interpreted as four equal products: personal site, handbook, materials and tools.
- Navigation by content format would reproduce the current problem.
- The role of the author relative to the handbook required an explicit hierarchy.
- Contact could become a generic “services” product without enough evidence.

### Corrections

- Defined the field guide as the primary product and the author as the trust layer.
- Made engineering problems and platform layers the primary discovery model.
- Reduced navigation to four content destinations plus a contact action.
- Deferred separate service pages until demand justifies them.

### Result

Pass accepted. One dominant product and two primary outcomes are now explicit.

## Pass 2 — Scope and launch feasibility

### Findings

- A complete rewrite of all current RU/EN content would make the project unbounded.
- Full language parity would double ongoing editorial cost.
- Bookmarks, reading progress and accounts did not support a proven launch requirement.
- Visual implementation could begin before the content quality bar was defined.

### Corrections

- Limited launch to 6–8 reviewed Russian core artifacts.
- Defined a selective evergreen English subset.
- Deferred accounts, sync, progress and newsletter infrastructure.
- Added a reviewed-content standard and publication lifecycle.
- Added a three-direction visual exploration gate.

### Result

Pass accepted. Launch scope can be planned without pretending that every existing page is production-ready.

## Pass 3 — Information architecture and migration

### Findings

- The route examples could be implemented while silently breaking existing URLs.
- Removing `/ru` duplicates is desirable but GitHub Pages redirect behavior must be verified.
- Consolidating all content could accidentally merge interactive tools into a generic library.

### Corrections

- Required a versioned, testable migration manifest for every current public route.
- Separated the decision to remove the duplicate route tree from the exact redirect implementation.
- Kept tools and handbook as distinct surfaces; consolidated only articles, talks, podcasts and repositories into Materials.

### Result

Pass accepted. The target IA is clear and cutover risk is explicitly controlled.

## Pass 4 — Content architecture

### Findings

- The current repository duplicates content metadata in MDX and a hand-maintained catalogue.
- Related content, featured selections, translation pairs and status could drift.
- Draft status was previously obscured in public presentation.

### Corrections

- Made validated content metadata the single source of truth.
- Required generated catalogues, SEO, relationships, featured selections and translation links.
- Defined draft, reviewed, maintained and archived behavior.
- Required review dates, review cycles and reference checks.
- Prohibited agents from self-promoting content to reviewed status.

### Result

Pass accepted. The authoring and publication model is maintainable and auditable.

## Pass 5 — Tool semantics

### Findings

- The current cost calculator conflates reusable token share and cache hit rate.
- The current quality checklist creates false precision through equal weights and default checked items.
- The current cache auditor can over-emphasize an opaque score.
- Free-text inputs create a privacy risk if analytics or session replay is later added.

### Corrections

- Defined separate cost-model variables and validation rules.
- Replaced naive readiness percentage logic with blockers, evidence and decision states.
- Made explainable dimensions primary in cacheability review.
- Prohibited transmission and replay of free-text tool data.
- Required local export and privacy-safe analytics contracts.

### Result

Pass accepted. Tool results no longer imply unsupported measurement precision.

## Pass 6 — UX, accessibility and visual system

### Findings

- “Interactive map” was under-specified and could become hover-only decoration.
- The existing repeated-card visual grammar could survive a nominal redesign.
- Accessibility requirements needed release-level checks rather than general intentions.

### Corrections

- Defined one structured map model and four renderer contexts.
- Required generated HTML content, keyboard operation, mobile disclosure and print fallback.
- Defined separate marketing, reading, tool and print surface modes.
- Added explicit accessibility gates and representative manual tests.
- Required materially different visual concepts rather than styling variants.

### Result

Pass accepted. Visual exploration has a bounded brief and the signature map has testable behavior.

## Pass 7 — Technical feasibility and operations

### Findings

- A rebuild could trigger an unnecessary framework migration.
- Analytics could become either an undeclared privacy risk or a launch blocker.
- The specification needed stronger boundaries for what implementation agents may change locally.

### Corrections

- Kept the current static Next.js architecture unless a measured blocker appears.
- Made analytics optional for launch but mandatory to specify and privacy-review if enabled.
- Added decision-change control for product hierarchy, navigation, privacy, tools, language scope and backend boundary.
- Added unit, content, integration, E2E, accessibility, visual and performance checks.

### Result

Pass accepted. The design can be implemented within the current deployment model.

## Pass 8 — Handbook category strategy

### Findings

- `Field Guide` understated the original handbook concept.
- The product needed to serve teams before and after the decision to build an internal AI platform.
- Migrating existing tools by default could prioritize implementation history over product need.

### Corrections

- Restored `Production AI Platform Handbook` as the master product name.
- Defined the handbook as a living engineering system rather than a static electronic book.
- Added two main entry routes: platform maturity/boundary and concrete production symptom.
- Added the coherent launch spine from platform need through architecture, quality, operations, economics and ownership.
- Prioritized an AI Platform Maturity Assessment as the category-entry diagnostic.
- Separated explanatory chapters, execution playbooks, templates/decision records, tools and evidence.

### Result

Pass accepted. The handbook now occupies a clear emerging category and supports the expected increase in company AI-platform demand.

## Pass 9 — Reference-led visual convergence

### Findings

The stated preference for Lenny's Newsletter and The Pragmatic Engineer was initially compatible with several misleading interpretations:

- copying a light Substack layout;
- treating the product as a newsletter subscription funnel;
- keeping the first generated AI-dashboard visual because it was dark and polished.

The valuable reference qualities are instead:

- author-led identity;
- editorial hierarchy;
- authority established by an archive of useful work;
- simple lists and predictable templates;
- restrained interface chrome;
- content as the dominant surface.

The first generated mockup failed this test through its glowing 3D hero, dashboard rail, gradient CTA, decorative metrics and SaaS-style card system.

### Corrections

- Defined `Dark Engineering Publication` as the normative visual family.
- Added `DESIGN_DIRECTION.md`.
- Explicitly rejected generic AI SaaS, consultancy, cyberpunk and dashboard patterns.
- Reframed the homepage as a publication front page.
- Reframed handbook contents as a book/diagnostic index.
- Reframed chapters as engineering deep dives and RFC-like artifacts.
- Reframed tools as utilitarian workbenches.
- Narrowed visual exploration to three structural variants inside one family:
  - Dark Editorial Journal;
  - Technical Handbook;
  - Engineering Notebook.

### Result

Pass accepted. The leading system combines an editorial homepage, technical handbook and engineering workbench under one token and publication system.

## Cross-document consistency check

| Concern | Goal | Spec | Decision | Status |
|---|---|---|---|---|
| Primary product | Handbook | Handbook first | D-001 | Consistent |
| Author role | Author/editor and trust layer | Visible author identity | D-002 | Consistent |
| Navigation | Maturity/problem-oriented | Bounded destinations | D-003/D-004 | Consistent |
| Launch breadth | Coherent core spine | Explicit launch set | D-007 | Consistent |
| English | Selective | Selective routes | D-008 | Consistent |
| Static boundary | Required | No backend at launch | D-010 | Consistent |
| Content metadata | One source | Generated catalogue | D-011 | Consistent |
| Privacy | Local tools | No input transmission | D-014 | Consistent |
| Tool precision | No unsupported claims | Revised models | D-013 | Consistent |
| Visual identity | Engineering publication | Editorial/reading/tool modes | D-018/D-021 | Consistent |
| Publication status | Transparent | Lifecycle defined | D-006/D-019 | Consistent |
| Migration | Preserve URLs | Manifest and tests | D-009 | Consistent |

## Remaining unknowns

These are prototype or implementation inputs, not specification blockers:

- exact platform-map geometry;
- exact portrait/photo asset;
- exact public evidence items used on launch homepage;
- selected privacy-conscious analytics provider, or decision to launch without analytics;
- GitHub Pages-compatible implementation of permanent legacy redirects;
- final editorial readiness of optional inference/routing/guardrails chapters;
- whether the first homepage CTA is the maturity assessment or full map;
- whether `Плейбуки` has enough launch volume for a top-level navigation item;
- English product mark versus Russian descriptive masthead order;
- sans-only versus restrained serif/sans long-form typography.

They have explicit resolution points in the implementation sequence.

## Convergence verdict

**Converged for the next stage.**

There are no unresolved product contradictions, privacy ambiguities, marketing-versus-engineering visual ambiguities or unbounded launch requirements that should block content inventory, revised visual prototyping and implementation planning.

The specification must be reopened before implementation only if a stakeholder proposes changing:

- the handbook-first hierarchy;
- maturity/problem discovery;
- static/private tool boundary;
- reviewed-content quality bar;
- selective English strategy;
- coherent launch spine;
- engineering-publication visual identity.
