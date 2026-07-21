# notevskii.tech v2 — Decision Register

This file resolves implementation choices that could otherwise remain ambiguous in `SPEC.md`. These decisions are normative and take precedence over illustrative examples.

## D-001 — Product hierarchy

**Decision:** the field guide is the primary product. The author is the trust and distribution layer.

**Rejected:** equal prominence for portfolio, blog, handbook, tools and talks.

**Consequence:** homepage and navigation optimize for entering the field guide through an engineering problem. Author evidence and contact remain clearly available but secondary.

## D-002 — Master brand

**Decision:** the site-level brand is `Сергей Нотевский` / `Sergei Notevskii`. The field guide is a named product.

**Consequence:** global metadata, header and organization of the site use the author brand. Product pages may use the English product mark `Production AI Platform Field Guide`, while visible Russian descriptive copy remains Russian-first.

## D-003 — Navigation

**Decision:** four top-level content destinations:

- Хэндбук;
- Инструменты;
- Материалы;
- Обо мне.

Contact is a primary action, not a fifth content category. The logo is the homepage link.

**Change rule:** adding another top-level item requires evidence that users cannot complete a primary job through the existing structure.

## D-004 — Discovery model

**Decision:** primary discovery is by engineering problem and platform layer. Format and audience role are secondary metadata and filters.

**Rejected:** starting with article/talk/project or role-track grids.

## D-005 — Signature map

**Decision:** the 12-layer platform map is one reusable domain model rendered in several contexts, not separate manually maintained drawings.

The model includes for each layer:

- stable id;
- localized name and description;
- typical symptoms;
- primary metrics;
- owner archetype;
- related artifact ids;
- ordering and relationships.

Renderers:

- homepage compact map;
- handbook full map;
- mobile ordered disclosure list;
- print/OG renderer.

No-JS acceptance: all layer names, descriptions and links are present in generated HTML. JavaScript enhances selection and highlighting only.

## D-006 — Content maturity

**Decision:** `reviewed` is the minimum status for normal public catalogue discovery. `draft` may be public by direct link but is not promoted by default.

A reviewed artifact requires:

- human author review;
- resolved placeholders;
- valid references for factual external claims;
- explicit last-reviewed date;
- required decision-useful sections or justified not-applicable markers.

## D-007 — Launch breadth

**Decision:** v2 does not wait for the full existing handbook to be rewritten. Launch requires 6–8 reviewed Russian core artifacts. Other content is retained as draft, archived or migrated later.

**Rejected:** superficial migration of all pages to claim completeness.

## D-008 — English scope

**Decision:** Russian has full launch depth. English contains a curated evergreen subset.

Initial English candidates:

- homepage;
- platform map;
- MaaS vs self-hosted;
- cost per accepted outcome;
- prefix cache;
- about;
- contact.

A Russian page without English equivalent is valid. It must not emit an invalid English hreflang.

## D-009 — Existing `/ru` routes

**Decision:** remove the duplicate `/ru` application tree. Preserve public compatibility using generated static redirect pages or the deployment-supported equivalent.

The exact redirect implementation is selected during the foundation phase and must be tested against GitHub Pages behavior before route deletion.

## D-010 — Framework

**Decision:** keep Next.js, TypeScript, MDX and static export for v2.

A framework migration requires a blocking capability, measurable reliability issue or unsustainable authoring cost. Aesthetic redesign and code cleanup are not sufficient reasons.

## D-011 — Content source of truth

**Decision:** validated content metadata is authoritative. Catalogues, relationships, featured items, status views, SEO, sitemap, RSS and translations are derived.

**Prohibited:** a second manual catalogue duplicating title, URL, description, status or relationships.

The platform map is structured domain data because it is not an article catalogue; artifact references from the map still use stable content ids.

## D-012 — Localization implementation

**Decision:** typed small UI dictionaries plus localized content files.

**Rejected:** one monolithic localization file containing site config, all marketing copy, tool copy and domain data.

## D-013 — Tool precision

**Decision:** tools report explainable dimensions and assumptions. An aggregate score is secondary and optional.

- cacheability tool cannot claim actual runtime hit rate;
- cost model separates reusable token share from cross-request hit rate;
- readiness tool uses blockers and evidence, not a naive equal-weight percentage.

## D-014 — Tool privacy

**Decision:** free-text input never leaves the browser. Analytics events contain only predefined ids and coarse completion state.

Export is generated locally. No third-party script may capture input values, DOM text from tool workspaces or form replay.

## D-015 — Analytics

**Decision:** analytics is not a blocker for visual prototype work, but an event contract and privacy review are required before production launch if analytics is enabled.

Absence of analytics must not delay launch when all functional release gates pass. In that case, conversion targets remain unmeasured hypotheses and this limitation is documented.

## D-016 — Materials consolidation

**Decision:** Writing, Talks and Projects become one Materials library with type filters.

Tools remain separate because they are interactive product surfaces. Handbook remains separate because it is the core structured knowledge product.

## D-017 — Contact model

**Decision:** one contact surface supports multiple qualified request types. Telegram direct message is the launch channel.

Separate service landing pages are deferred until there is evidence of distinct demand and enough service detail to justify them.

## D-018 — Visual exploration gate

**Decision:** production UI implementation starts only after three materially different visual directions are compared using the same required screens and one direction is selected.

Shared screens:

- desktop homepage;
- mobile homepage;
- chapter;
- tool workspace;
- platform map.

A direction is not materially different if it only changes colour, font or card radius.

## D-019 — Publication workflow

Artifact lifecycle:

1. draft MDX/data;
2. schema and content checks;
3. factual/reference review;
4. author editorial review;
5. set `reviewed` and `reviewedAt`;
6. preview deployment and visual check;
7. merge;
8. review-due reporting based on `reviewCycleDays`.

Agent-created content cannot self-promote to `reviewed` without explicit human author review.

## D-020 — Specification change control

Implementation may clarify component-level details without changing the goal. Changes to any of the following require an explicit decision-register update:

- product hierarchy;
- top-level navigation;
- launch artifact count;
- privacy boundary;
- tool domain semantics;
- Russian/English scope;
- static/backend boundary;
- reviewed-content standard.

## D-021 — Visual identity: engineering publication, not SaaS

**Decision:** the converged visual family is `Dark Engineering Publication`, defined normatively in [`DESIGN_DIRECTION.md`](./DESIGN_DIRECTION.md).

The site combines:

- an editorial publication front page;
- a technical handbook reading system;
- RFC/notebook-like working artifacts and tools;
- architecture diagrams that answer engineering questions.

**Preserve:** dark identity, restrained accent, strong type hierarchy, diagrams and low-motion behavior.

**Rejected:** generic AI SaaS landing patterns, dashboard chrome, cyberpunk neon, decorative 3D platform illustrations, gradient CTA buttons, vanity metric strips, testimonial carousels and repeated card walls.

**Reference interpretation:** Lenny's Newsletter and The Pragmatic Engineer are references for author-led clarity, archive depth, editorial hierarchy and interface restraint. They are not templates to clone and do not imply adopting their exact light palette, subscription funnel or Substack structure.

**Consequence:** the three visual explorations remain structurally different, but all stay inside the engineering-publication family:

1. Dark Editorial Journal;
2. Technical Handbook;
3. Engineering Notebook.

A proposed screen fails this decision when it could be rebranded as an AI startup or consultancy landing page by changing only its text.
