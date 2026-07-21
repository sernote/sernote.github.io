# notevskii.tech v2 — Goal

Status: **converged draft**  
Owner: Сергей Нотевский  
Scope: product, content, UX and technical redesign of `notevskii.tech`

Depends on: [`PUBLICATION_MODEL.md`](./PUBLICATION_MODEL.md)

## 1. Goal statement

Build an authoritative, useful and maintainable **author-led engineering publication and public workbench** about production AI systems.

The publication must:

1. give Сергей Нотевский one durable home for original articles, talks, open-source projects and the Production AI Platform Handbook;
2. make his current AI Platform Lead specialization and career trajectory legible through verifiable work rather than generic self-description;
3. help experienced engineers and technical leaders reach a useful article, talk, project, Handbook chapter, playbook or tool within two navigation decisions;
4. turn production practice into a compounding public knowledge system rather than disconnected posts across external platforms;
5. preserve the option to create paid implementation products later without weakening the public foundation;
6. remain cheap, private by default, statically deployable and practical for one primary author to maintain.

The site is not only a personal portfolio and not only the home of one Handbook. It is the author's engineering publication, with four durable surfaces:

- **Articles** — developed technical reasoning;
- **Talks** — recordings, summaries and communication evidence;
- **Projects** — executable public work;
- **Production AI Platform Handbook** — maintained synthesis and reference model.

The Handbook is the flagship structured knowledge product. It does not erase the other surfaces or define the entire site hierarchy.

## 2. Core promise

Site-level promise:

> Практика, статьи, проекты и систематизированные материалы о том, как ИИ доезжает от демо до надёжной платформы в продакшене.

Author positioning:

> Сергей Нотевский — AI Platform Lead. Работает на стыке платформенной архитектуры, инференса, маршрутизации, кеша, оценки качества, наблюдаемости, стоимости и ответственности.

Handbook positioning:

> Production AI Platform Handbook — живой практический хэндбук для команд, которые решают, нужна ли им собственная ИИ-платформа, определяют её границы и развивают её как внутренний продукт.

## 3. Product surfaces

### 3.1 Articles

Original engineering writing under the author's own domain:

- deep dives;
- field notes;
- architecture decisions;
- experiment and benchmark analysis;
- project release notes;
- post-talk expansions.

Articles develop arguments and preserve the history of reasoning. They are not required to be timeless.

### 3.2 Talks and media

Durable pages for:

- conference talks;
- webinars;
- podcasts and interviews;
- public recordings;
- slides and concise takeaways.

A talk page must add structured value beyond an embedded external video.

### 3.3 Projects

Maintained executable work, beginning with `audit-prompt-caching`.

Project pages connect:

- problem and users;
- installation and examples;
- release state;
- repository;
- related articles;
- relevant Handbook chapters and playbooks.

### 3.4 Production AI Platform Handbook

The reviewed synthesis layer:

- platform map and maturity model;
- chapters;
- playbooks;
- templates and decision records;
- explainable tools;
- review dates and applicability boundaries.

The canonical format is open, web-first and living. A free versioned starter PDF/poster may be generated. A future paid implementation edition may package editable artifacts, offline editions and team workflows, but the core public Handbook is not paywalled at launch.

## 4. Knowledge lifecycle

The product succeeds when one topic can move through several forms without becoming duplicated content:

```text
Production practice / observation
  → Telegram note or field note
  → article or talk
  → project, tool or template where applicable
  → reviewed Handbook synthesis
  → new questions and practice
```

Roles:

- Telegram distributes and tests early observations;
- articles develop reasoning;
- talks compress and communicate;
- projects prove execution;
- the Handbook preserves reviewed conclusions.

The website owns the canonical archive and relationship graph. It does not attempt to replace Habr, Telegram, GitHub, YouTube or event platforms as distribution channels.

## 5. Primary audience

### Primary

- AI Platform Leads;
- Staff / Principal engineers responsible for production AI architecture;
- MLOps / inference engineers moving from model serving to platform ownership;
- engineering managers and heads responsible for AI reliability, cost and operating model;
- backend engineers integrating AI into production systems;
- teams whose AI use cases are multiplying and beginning to require shared capabilities.

### Secondary

- CTOs evaluating platform strategy, MaaS, self-hosted and hybrid approaches;
- conference program committees, podcast hosts and technical media;
- open-source users and contributors;
- potential collaborators and employers evaluating the author's depth.

### Explicit non-audience

The publication is not optimized for:

- beginners learning what an LLM is;
- prompt collections and consumer AI tips;
- AI news aggregation;
- generic personal branding;
- vendor-neutrality theatre: technologies may be named when they materially affect decisions.

## 6. Primary jobs to be done

### Publication and author jobs

1. “What has Сергей written recently, and is it relevant to my work?”
2. “Where can I find the recording, slides and conclusions from a talk?”
3. “What does `audit-prompt-caching` do, and how do I use or evaluate it?”
4. “Is this person credible enough for a role, technical discussion, collaboration, interview or talk?”

### Handbook maturity and boundary jobs

5. “Do we already have an AI-platform problem, or only several isolated AI features?”
6. “Which capabilities should remain inside product teams and which should become shared?”
7. “What stage are we at, what should we build next and what should we avoid building too early?”

### Production-problem jobs

8. **Cost:** “Our AI scenario is becoming expensive. What should we inspect and how should we calculate unit economics?”
9. **Quality:** “A model, prompt or route changed. How do we decide whether rollout is safe?”
10. **Latency and capacity:** “TTFT, throughput or GPU utilization is unstable. What architecture and telemetry are required?”
11. **Routing and agents:** “Requests take the wrong execution path or agent loops consume excessive tokens.”
12. **MaaS vs self-hosted:** “Which execution boundary is appropriate for this scenario?”
13. **Cache:** “Why is prefix/KV reuse low and what in the request shape breaks it?”
14. **Observability:** “We cannot explain failures, fallbacks, cost or quality regressions.”
15. **Ownership:** “It is unclear who owns quality, cost, incidents, policies and lifecycle.”

## 7. Required outcomes

### Reader outcomes

A visitor can:

- find current and foundational articles;
- understand the key points of a talk without watching the entire recording first;
- evaluate and open a project quickly;
- enter the Handbook by maturity state, platform capability or production symptom;
- reach a decision model, diagram, checklist, playbook, template or tool;
- follow relationships between an article, talk, project and Handbook synthesis.

### Author outcomes

The site must:

- make the author's production-AI specialization obvious within the first viewport;
- expose technical depth, systems thinking, execution and communication as separate professional signals;
- provide canonical pages suitable for Habr, Telegram, talks, interviews, LinkedIn and GitHub;
- support qualified contact without becoming a consultancy funnel;
- make publishing one new artifact predictable and low-risk;
- preserve optionality for leadership, authorship, speaking, open-source and future paid products;
- accumulate a recognizable public reference model of Production AI Platform capabilities.

## 8. Success criteria

### Comprehension

In an unmoderated five-second test, a target user can answer:

- who the author is;
- what professional domain the publication covers;
- which four kinds of work are available;
- where to start for their current intent.

Target: at least 4 of 5 representative users answer correctly.

### Task completion

Representative users can complete these tasks in no more than two navigation decisions and 120 seconds:

- find the latest or a foundational article;
- find a talk recording and its key takeaways;
- understand and open `audit-prompt-caching`;
- find the first relevant Handbook artifact for a platform problem.

Target: at least 80% successful completion across tested tasks.

### Content quality

At launch:

- articles, talks, projects and Handbook artifacts have distinct content models;
- every talk page has an abstract and useful summary;
- the flagship project page has installation, evidence boundaries, release state and related work;
- the Russian Handbook launch spine is coherent from platform need and boundary through architecture, quality, operations, economics and ownership;
- 6–8 core Russian Handbook artifacts have `reviewed` status, with compact reviewed bridge artifacts permitted where continuity requires them;
- no reviewed artifact contains placeholder copy;
- planned and available content are visually and semantically distinct.

### Product quality

- one `<main>` landmark per page;
- keyboard-complete navigation and tools;
- no known critical or serious automated accessibility violations on core routes;
- no broken internal links;
- canonical, hreflang, sitemap, robots, RSS and structured data are valid;
- core pages pass agreed mobile performance budgets;
- user-entered tool data is never transmitted;
- the site cannot be mistaken for a generic AI SaaS or consultancy landing page by changing only its copy.

### Optional commercial readiness

A paid Handbook derivative is not a launch gate. It becomes eligible for product work only when:

- the public reviewed spine exists;
- readers repeatedly ask for PDF, print, offline, editable or team formats;
- named templates or checklists are used in real work;
- update, support, payment and refund obligations are acceptable;
- employer and side-project/IP boundaries have been checked.

## 9. Non-goals for v2 launch

- paid membership or community;
- paywalling the core web Handbook;
- paid newsletter infrastructure;
- accounts;
- cross-device bookmarks or reading progress;
- comments or forum;
- AI chat over the publication;
- backend persistence;
- broad automated translation;
- publishing every current draft;
- replacing Telegram, Habr, GitHub or YouTube as distribution channels;
- changing framework solely for novelty or marginal bundle reduction;
- decorative AI-platform visualizations that do not answer an engineering question;
- forcing all public work into the Handbook taxonomy.

## 10. Product principles

1. **Four surfaces, one practice.** Articles, talks, projects and Handbook have different jobs but share one relationship graph.
2. **Author first at site level; Handbook first inside the reference product.** The publication belongs to Сергей Нотевский; the Handbook remains the flagship synthesis.
3. **Evidence before assertion.** Writing, recordings, code, diagrams and maintained artifacts establish authority.
4. **Synthesis is not duplication.** Handbook chapters preserve reviewed conclusions rather than copying articles.
5. **Open core, paid implementation later.** Public ideas create authority; future paid value comes from packaging, editable artifacts, offline editions and operationalization.
6. **Static and private by default.** The product works without accounts, server-side state or transmission of user inputs.
7. **One source of truth.** Content metadata drives catalogues, relationships, SEO, status and translations.
8. **Transparent maturity.** Draft, reviewed, maintained and archived states are explicit.
9. **Diagrams are content.** Maps and decision trees are first-class engineering artifacts, not decoration.
10. **Russian first, English selective.** Maintain full depth where the author publishes actively; translate evergreen core selectively.
11. **Engineering publication, not AI marketing.** Typography, editorial structure, useful diagrams and working artifacts create authority; SaaS/dashboard chrome does not.
12. **External channels distribute; the site accumulates.** The website owns durable context and relationships.

## 11. Constraints

- primary author and maintainer: one person with agent assistance;
- the author has a full-time AI-platform leadership role;
- deployment remains static and inexpensive;
- public examples are sanitized and do not disclose confidential employer information;
- paid side products require explicit employer/IP and conflict-boundary review;
- existing public URLs either remain valid or have a documented permanent redirect;
- all current production content is inventoried before deletion;
- current tools may be migrated only after their domain models, priority and semantics are reviewed;
- content remains readable and useful without JavaScript;
- the dark visual identity must retain reading contrast and print-safe output.

## 12. Release boundary

The v2 launch includes:

- redesigned Russian publication homepage;
- top-level surfaces for Articles, Handbook, Projects and Talks;
- About and contact;
- import or editorial migration of selected existing articles;
- structured talk/media pages with summaries;
- a flagship `audit-prompt-caching` project page;
- platform map and maturity/problem-oriented Handbook entry;
- coherent Handbook launch spine;
- 6–8 reviewed core Handbook artifacts plus necessary compact bridge artifacts;
- reviewed client-side diagnostics where they support a real decision;
- selective English evergreen subset;
- migration and redirect map;
- generated SEO, RSS and content catalogues;
- accessibility, link, content and visual-regression checks;
- `Dark Engineering Publication` design system;
- build-time capability to generate future PDF/print Handbook artifacts from the same source.

Everything else requires evidence after launch.

## 13. Kill criteria

The redesign is not ready to implement if any of the following remains unresolved:

- articles, talks, projects and Handbook are presented as disconnected mini-sites;
- the homepage hides the author behind a product brand or reduces the site to a portfolio bio;
- the Handbook is either the entire site or an unstructured dump of articles;
- the project page is only an outbound GitHub link;
- talk pages contain no useful summary beyond an embed;
- content relationships require manual duplicate catalogues;
- available and planned content look equivalent;
- tool results imply precision unsupported by their model;
- Russian and English scope requires full manual duplication without prioritization;
- the Handbook launch artifacts do not form a coherent platform narrative;
- the design can be mistaken for an AI SaaS, consultancy or cyberpunk dashboard;
- long-form reading is visually secondary to interface chrome;
- monetization hides the strongest public category-building content before demand is proven;
- release criteria cannot be tested.

## 14. Goal convergence test

The goal is converged because it resolves the key tensions:

- **personal site vs Handbook:** the site is the author's engineering publication; the Handbook is its flagship maintained synthesis;
- **articles vs Handbook:** articles develop ideas, Handbook chapters preserve reviewed conclusions;
- **external channels vs owned site:** Habr, Telegram, GitHub and video platforms distribute; the site owns durable context and relationships;
- **open authority vs paid product:** core web content remains public; paid implementation formats are deferred until demand and operations are proven;
- **career capital vs content business:** the publication compounds both without forcing an early choice;
- **breadth vs depth:** four clear surfaces, with fewer reviewed Handbook artifacts at launch;
- **static simplicity vs product utility:** static architecture and local tools remain; accounts and membership are deferred;
- **Russian vs English:** Russian full-depth, English selective evergreen subset;
- **authority vs confidentiality:** use public artifacts and sanitized reasoning, not confidential scale claims;
- **dark technical design vs AI marketing:** use editorial hierarchy, diagrams and workbench utility; reject SaaS/dashboard decoration.