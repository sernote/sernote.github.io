# notevskii.tech v2 — Goal

Status: **converged draft**  
Owner: Сергей Нотевский  
Scope: product, content, UX and technical redesign of `notevskii.tech`

## 1. Goal statement

Build an authoritative, useful and maintainable public platform about production AI engineering that:

1. helps an experienced engineer or technical leader diagnose a concrete production-AI platform problem and reach a useful artifact within two minutes;
2. establishes Сергей Нотевский as a credible AI Platform Lead through verifiable work rather than generic self-description;
3. converts relevant visitors into one of two outcomes:
   - sustained use of the handbook, maps, tools and templates;
   - a qualified contact for an architecture review, technical collaboration, interview, podcast or conference talk;
4. remains cheap, private by default, statically deployable and practical for one primary author to maintain.

The product is not primarily a portfolio, blog, documentation portal or tool collection. It is an **author-led field guide for production AI platforms**. Personal authority explains why the field guide is worth using; the field guide is the main product.

## 2. Core promise

> From a production AI symptom to a concrete engineering decision, review checklist, map, template or diagnostic tool.

Russian positioning:

> Практическая система для команд, которые переводят ИИ из демо в эксплуатацию: архитектура, инференс, маршрутизация, кеш, качество, наблюдаемость, стоимость, безопасность и ответственность.

Author positioning:

> Сергей Нотевский — AI Platform Lead. Строит и описывает production-grade платформы для LLM, STT, embeddings и agentic-сценариев.

## 3. Primary audience

### Primary

- AI Platform Leads;
- Staff / Principal engineers responsible for production AI architecture;
- MLOps / inference engineers moving from model serving to platform ownership;
- engineering managers and heads responsible for AI reliability, cost and operating model.

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

A visitor should be able to enter through a real problem, not through an internal content format.

1. **Cost:** “Our AI scenario is becoming expensive. What should we inspect and how should we calculate unit economics?”
2. **Quality:** “A model, prompt or route changed. How do we decide whether rollout is safe?”
3. **Latency and capacity:** “TTFT, throughput or GPU utilization is unstable. What architecture and telemetry are required?”
4. **Routing and agents:** “Requests take the wrong execution path or agent loops consume excessive tokens.”
5. **MaaS vs self-hosted:** “Which execution boundary is appropriate for this scenario?”
6. **Cache:** “Why is prefix/KV reuse low and what in the request shape breaks it?”
7. **Observability:** “We cannot explain failures, fallbacks, cost or quality regressions.”
8. **Ownership:** “It is unclear who owns quality, cost, incidents, policies and lifecycle.”
9. **Authority evaluation:** “Is this person credible enough for a role, review, interview or talk?”

## 5. Required outcomes

### User outcomes

For each supported problem, the user can reach:

- a concise mental model;
- a decision path;
- a reference diagram or architecture pattern;
- the minimum metrics and telemetry contract;
- common failure modes;
- a review checklist;
- a reusable tool or downloadable template where appropriate;
- the next related artifact.

### Author outcomes

The site must:

- make the author’s production-AI specialization obvious within the first viewport;
- expose verifiable public work: handbook artifacts, articles, talks, recordings and open-source projects;
- support direct qualified contact;
- provide canonical pages that can be referenced from talks, Telegram, Habr and interviews;
- make adding or updating one artifact predictable and low-risk.

## 6. Success criteria

The first release is successful when all conditions below are true.

### Comprehension

In an unmoderated five-second test, a target user can answer:

- who the author is;
- what the site is about;
- what they can do next.

Target: at least 4 of 5 representative users answer all three correctly.

### Task completion

Representative target users can find an appropriate first artifact for one of the primary jobs in no more than:

- 2 navigation decisions;
- 120 seconds;
- without using browser search.

Target: at least 80% successful completion across tested tasks.

### Content quality

At launch:

- 6–8 core Russian artifacts have `reviewed` status;
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
- user-entered tool data is never transmitted.

### Conversion

The site supports and measures, privacy-consciously:

- opening a core handbook artifact;
- completing a tool interaction without capturing entered content;
- opening a contact action;
- opening an article, talk or repository.

Initial targets are directional, not release gates:

- >= 25% of engaged homepage visitors open a handbook problem route or map;
- >= 10% of tool visitors complete a meaningful interaction;
- qualified inbound contacts can state what service or public format they are requesting.

## 7. Non-goals for v2 launch

- accounts;
- cross-device bookmarks or reading progress;
- comments;
- community forum;
- full learning-management system;
- newsletter infrastructure;
- AI chat over the handbook;
- backend persistence;
- broad automated translation;
- publishing every current draft;
- replacing Telegram, Habr or YouTube as distribution channels;
- changing framework solely for novelty or marginal bundle reduction.

## 8. Product principles

1. **Problem before format.** Navigation starts with engineering problems and decisions, not “article”, “talk” or “project”.
2. **Evidence before assertion.** Public artifacts, diagrams, recordings and concrete reasoning establish authority.
3. **Decision utility over completeness.** A smaller reviewed field guide is better than a large draft encyclopedia.
4. **Progressive disclosure.** The first screen gives orientation; depth appears only after intent is clear.
5. **Static and private by default.** The product must work without accounts, server-side state or transmission of user inputs.
6. **One source of truth.** Content metadata drives catalogues, relationships, SEO, status and translations.
7. **Transparent maturity.** Draft, reviewed, maintained and archived states are explicit.
8. **Diagrams are content.** Maps and decision trees are first-class artifacts, not decoration.
9. **Russian first, English selective.** Maintain full depth where the author publishes actively; translate evergreen core selectively.
10. **No generic AI aesthetics.** The visual language should communicate engineering control, systems thinking and operational depth.

## 9. Constraints

- primary author and maintainer: one person with agent assistance;
- deployment should remain static and inexpensive;
- public examples must be sanitized and must not disclose confidential employer information;
- existing public URLs should either remain valid or have a documented permanent redirect;
- all current production content must be inventoried before deletion;
- current tools may be migrated only after their domain models and semantics are reviewed;
- content must remain readable and useful without JavaScript; interactive enhancements may require it.

## 10. Release boundary

The v2 launch includes:

- redesigned Russian homepage;
- reduced top-level navigation;
- platform map as the signature artifact;
- problem-oriented handbook landing;
- consolidated materials library;
- about and contact surfaces;
- 6–8 reviewed core artifacts;
- three reviewed client-side tools;
- selective English evergreen subset;
- migration and redirect map;
- generated SEO and content catalogues;
- accessibility, link, content and visual-regression checks.

Everything else requires explicit evidence after launch.

## 11. Kill criteria

The redesign is not ready to implement if any of the following remains unresolved:

- the homepage has more than one competing primary product;
- top-level navigation is organized primarily by content format;
- platform-map, handbook and personal site have no clear hierarchy;
- content catalogue duplicates MDX metadata manually;
- available and planned content look equivalent;
- tool results imply precision unsupported by their model;
- Russian and English scope requires full manual duplication without prioritization;
- release criteria cannot be tested.

## 12. Goal convergence test

The goal is considered converged because it resolves the key tensions:

- **personal site vs handbook:** handbook is the product; author authority is the trust layer;
- **breadth vs depth:** launch with fewer reviewed artifacts;
- **navigation by format vs problem:** primary discovery is problem-oriented; format is a secondary filter;
- **static simplicity vs product utility:** keep static architecture and client-side tools; defer accounts and sync;
- **Russian vs English:** Russian full-depth, English selective evergreen subset;
- **redesign vs rewrite:** preserve validated content and logic, replace product hierarchy and implementation structure;
- **authority vs confidentiality:** use verifiable public artifacts and sanitized examples, not confidential scale claims.
