# notevskii.tech v2 — Goal

Status: **converged draft**  
Owner: Сергей Нотевский  
Scope: product, content, UX and technical redesign of `notevskii.tech`

## 1. Goal statement

Build the public home of **Production AI Platform Handbook**: a maintained, author-led engineering product that:

1. helps an experienced engineer or technical leader decide whether a shared AI-platform capability is needed, define its boundary and identify the next justified platform investment;
2. helps teams diagnose a concrete production-AI platform problem and reach a useful artifact within two minutes;
3. establishes Сергей Нотевский as a credible AI Platform Lead through verifiable work rather than generic self-description;
4. converts relevant visitors into one of two outcomes:
   - sustained use of the handbook, map, playbooks, tools and templates;
   - a qualified contact for an architecture review, technical collaboration, interview, podcast or conference talk;
5. remains cheap, private by default, statically deployable and practical for one primary author to maintain.

The product is not primarily a portfolio, blog, documentation portal, newsletter funnel or tool collection. It is a **living Production AI Platform Handbook**. Personal authority explains why the handbook is worth using; the handbook is the main product.

## 2. Core promise

> From an emerging platform need or production AI symptom to a concrete engineering decision, architecture model, playbook, review checklist, template or diagnostic tool.

Russian positioning:

> Практический хэндбук для команд, которые решают, нужна ли им собственная ИИ-платформа, определяют её границы и превращают её в надёжный внутренний продукт.

Author positioning:

> Сергей Нотевский — AI Platform Lead, автор и редактор Production AI Platform Handbook.

## 3. Primary audience

### Primary

- AI Platform Leads;
- Staff / Principal engineers responsible for production AI architecture;
- MLOps / inference engineers moving from model serving to platform ownership;
- engineering managers and heads responsible for AI reliability, cost and operating model;
- teams whose AI use cases are multiplying and beginning to require shared capabilities.

### Secondary

- backend engineers integrating production AI;
- CTOs evaluating platform strategy, MaaS, self-hosted and hybrid approaches;
- conference program committees, podcast hosts and technical media;
- potential collaborators and employers evaluating the author’s depth.

### Explicit non-audience

The product is not optimized for:

- beginners learning what an LLM is;
- prompt collections and consumer AI tips;
- AI news aggregation;
- generic personal branding;
- vendor-neutrality theatre: technologies may be named where they materially affect decisions.

## 4. Primary jobs to be done

A visitor enters through either organizational maturity or a real production problem.

### Platform maturity and boundary

1. “Do we already have an AI-platform problem, or only several isolated AI features?”
2. “Which capabilities should remain inside product teams and which should become shared?”
3. “What stage are we at and what should we build next?”
4. “What should we explicitly avoid building too early?”

### Production symptoms

5. **Cost:** “Our AI scenario is becoming expensive. What should we inspect and how should we calculate unit economics?”
6. **Quality:** “A model, prompt or route changed. How do we decide whether rollout is safe?”
7. **Latency and capacity:** “TTFT, throughput or GPU utilization is unstable. What architecture and telemetry are required?”
8. **Routing and agents:** “Requests take the wrong execution path or agent loops consume excessive tokens.”
9. **MaaS vs self-hosted:** “Which execution boundary is appropriate for this scenario?”
10. **Cache:** “Why is prefix/KV reuse low and what in the request shape breaks it?”
11. **Observability:** “We cannot explain failures, fallbacks, cost or quality regressions.”
12. **Ownership:** “It is unclear who owns quality, cost, incidents, policies and lifecycle.”
13. **Authority evaluation:** “Is this person credible enough for a role, review, interview or talk?”

## 5. Required outcomes

### User outcomes

For each supported maturity state or problem, the user can reach:

- a concise mental model;
- an explicit capability or platform boundary;
- a decision path;
- a reference diagram or architecture pattern;
- the minimum metrics and telemetry contract;
- common failure modes;
- a review checklist or playbook;
- a reusable tool or downloadable template where appropriate;
- the next related artifact.

### Author outcomes

The site must:

- make the author and Production AI Platform specialization obvious within the first viewport;
- expose verifiable public work: handbook artifacts, articles, talks, recordings and open-source projects;
- support direct qualified contact;
- provide canonical pages that can be referenced from talks, Telegram, Habr and interviews;
- make adding or updating one artifact predictable and low-risk;
- accumulate a recognizable public reference model of Production AI Platform capabilities.

## 6. Success criteria

The first release is successful when all conditions below are true.

### Comprehension

In an unmoderated five-second test, a target user can answer:

- what the product is;
- who writes it;
- what problem domain it covers;
- where they can start.

Target: at least 4 of 5 representative users answer all four correctly.

### Task completion

Representative target users can find an appropriate first artifact for one of the primary jobs in no more than:

- 2 navigation decisions;
- 120 seconds;
- without using browser search.

Target: at least 80% successful completion across tested tasks.

### Content quality

At launch:

- the Russian launch spine is coherent from platform need and boundary through architecture, quality, operations, economics and ownership;
- 6–8 core Russian artifacts have `reviewed` status, with compact reviewed bridge artifacts permitted where the spine requires continuity;
- every reviewed artifact includes an executive summary, decision guidance, metrics, failure modes, checklist and references where factual claims require them;
- no reviewed artifact contains placeholder copy;
- planned artifacts are visually and semantically separate from available artifacts.

### Product quality

- no duplicate primary navigation destinations;
- one `<main>` landmark per page;
- keyboard-complete navigation and tools;
- no known critical or serious automated accessibility violations on core routes;
- no broken internal links;
- canonical, hreflang, sitemap, robots and structured data are valid;
- core pages pass agreed performance budgets on mobile;
- user-entered tool data is never transmitted;
- the site cannot be mistaken for a generic AI SaaS or consultancy landing page by changing only its copy.

### Conversion

The site supports and measures, privacy-consciously:

- opening the map or a core handbook artifact;
- completing a maturity assessment or tool interaction without capturing entered content;
- opening a contact action;
- opening an article, talk or repository.

Initial targets are directional, not release gates:

- >= 25% of engaged homepage visitors open a maturity, problem or map route;
- >= 10% of tool visitors complete a meaningful interaction;
- qualified inbound contacts can state what service or public format they are requesting.

## 7. Non-goals for v2 launch

- accounts;
- cross-device bookmarks or reading progress;
- comments;
- community forum;
- full learning-management system;
- newsletter infrastructure or subscription-first funnel;
- AI chat over the handbook;
- backend persistence;
- broad automated translation;
- publishing every current draft;
- replacing Telegram, Habr or YouTube as distribution channels;
- changing framework solely for novelty or marginal bundle reduction;
- producing decorative AI-platform visualizations that do not answer an engineering question.

## 8. Product principles

1. **Maturity or problem before format.** Navigation starts with organizational state, engineering problems and platform capabilities—not “article”, “talk” or “project”.
2. **Evidence before assertion.** Public artifacts, diagrams, recordings and concrete reasoning establish authority.
3. **Decision utility over completeness.** A smaller reviewed handbook is better than a large draft encyclopedia.
4. **Progressive disclosure.** The first screen gives orientation; depth appears only after intent is clear.
5. **Static and private by default.** The product works without accounts, server-side state or transmission of user inputs.
6. **One source of truth.** Content metadata drives catalogues, relationships, SEO, status and translations.
7. **Transparent maturity.** Draft, reviewed, maintained and archived states are explicit.
8. **Diagrams are content.** Maps and decision trees are first-class engineering artifacts, not decoration.
9. **Russian first, English selective.** Maintain full depth where the author publishes actively; translate evergreen core selectively.
10. **Engineering publication, not AI marketing.** Typography, editorial structure, useful diagrams and working artifacts create authority; SaaS/dashboard chrome does not.
11. **Author-led, product-first.** The author is explicit on every core surface, while the Handbook remains the organizing product.
12. **Living handbook.** Reviewed dates, applicability and review cycles are visible and enforceable.

## 9. Constraints

- primary author and maintainer: one person with agent assistance;
- deployment remains static and inexpensive;
- public examples are sanitized and do not disclose confidential employer information;
- existing public URLs either remain valid or have a documented permanent redirect;
- all current production content is inventoried before deletion;
- current tools may be migrated only after their domain models, priority and semantics are reviewed;
- content remains readable and useful without JavaScript; interactive enhancements may require it;
- the dark visual identity must retain sufficient reading contrast and print-safe output.

## 10. Release boundary

The v2 launch includes:

- redesigned Russian publication homepage;
- reduced product navigation;
- platform map as the signature category artifact;
- maturity/boundary and problem-oriented handbook entry;
- coherent launch spine;
- consolidated materials library;
- author and contact surfaces;
- 6–8 reviewed core artifacts plus necessary compact spine bridges;
- reviewed client-side diagnostics led by AI Platform Maturity Assessment;
- selective English evergreen subset;
- migration and redirect map;
- generated SEO and content catalogues;
- accessibility, link, content and visual-regression checks;
- `Dark Engineering Publication` design system.

Everything else requires explicit evidence after launch.

## 11. Kill criteria

The redesign is not ready to implement if any of the following remains unresolved:

- the homepage has more than one competing primary product;
- top-level discovery is organized primarily by content format;
- platform map, handbook and author have no clear hierarchy;
- content catalogue duplicates MDX metadata manually;
- available and planned content look equivalent;
- tool results imply precision unsupported by their model;
- Russian and English scope requires full manual duplication without prioritization;
- the launch artifacts do not form a coherent platform narrative;
- the design can be mistaken for an AI SaaS, consultancy or cyberpunk dashboard;
- long-form reading is visually secondary to interface chrome;
- release criteria cannot be tested.

## 12. Goal convergence test

The goal is considered converged because it resolves the key tensions:

- **personal site vs handbook:** handbook is the product; author authority is the visible trust layer;
- **existing AI teams vs emerging company demand:** users enter through maturity/boundary or production symptom;
- **breadth vs depth:** launch with a coherent spine and fewer reviewed artifacts;
- **navigation by format vs problem:** primary discovery is maturity/problem-oriented; format is secondary metadata;
- **static simplicity vs product utility:** keep static architecture and client-side tools; defer accounts and sync;
- **Russian vs English:** Russian full-depth, English selective evergreen subset;
- **redesign vs rewrite:** preserve validated content and logic, replace product hierarchy and implementation structure;
- **authority vs confidentiality:** use verifiable public artifacts and sanitized examples, not confidential scale claims;
- **dark technical design vs AI marketing:** use editorial hierarchy, diagrams and workbench utility; reject SaaS/dashboard decoration.
