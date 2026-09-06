# notevskii.tech v2 — Converged Design Direction

Status: **normative visual direction**  
Depends on: [`GOAL.md`](./GOAL.md), [`PUBLICATION_MODEL.md`](./PUBLICATION_MODEL.md), [`SPEC.md`](./SPEC.md)

## 1. Decision

The visual direction is **Dark Engineering Publication**.

`notevskii.tech` must look like a serious author-led engineering publication, maintained Handbook and public workbench—not:

- an AI startup landing page;
- a SaaS dashboard;
- a portfolio template;
- a cyberpunk visualization demo;
- a marketplace of cards;
- a consultancy funnel decorated with technical vocabulary;
- a generic documentation theme.

The closest mental model is the editorial directness of strong author publications such as Lenny's Newsletter and The Pragmatic Engineer, combined with the precision of an engineering handbook, RFC library, open-source project page and architecture review workspace.

Borrow the product behavior, not the exact appearance or subscription model.

The dark theme is retained, but darkness is not used as a substitute for technical credibility.

## 2. Design thesis

> Content creates authority. Relationships create a body of work. Diagrams make systems legible. Interface chrome stays quiet.

The design should communicate:

- one identifiable author;
- one coherent engineering practice;
- four distinct public surfaces;
- editorial judgement;
- technical depth;
- active software maintenance;
- explicit models, assumptions and states;
- usefulness before conversion.

The author must not disappear behind the Handbook brand. The Handbook must not disappear inside a generic blog.

## 3. Reference behavior

### From author-led publications

Borrow:

- immediate clarity about who writes and what the publication covers;
- strong title/deck hierarchy;
- a small number of current and foundational selections;
- simple chronological archives;
- predictable article templates;
- quiet search and navigation;
- credibility created by the work itself.

Do not borrow by default:

- subscription-first homepage funnels;
- social-proof counters as the first argument;
- popup capture;
- community sales blocks;
- a Substack-like single-feed limitation.

### From engineering documentation and RFC systems

Borrow:

- explicit status and dates;
- clear contents navigation;
- architecture figures and tables;
- stable links;
- code/equation readability;
- reference and change history;
- print-friendly artifacts.

Do not borrow:

- anonymous institutional tone;
- visually heavy docs chrome;
- a sidebar that dominates every page;
- identical treatment of articles, projects, talks and Handbook chapters.

## 4. Explicit rejection of the first generated mockup

The first generated mockup is useful as a block inventory but not as the target visual system.

Remove or substantially redesign:

- large glowing isometric AI-platform illustration;
- dashboard-like right rail with boxed widgets;
- bright gradient primary CTA;
- decorative radar chart;
- white SaaS-style tool-card strip;
- vanity counts without direct evidentiary purpose;
- repeated rounded cards for every content type;
- neon radial maps;
- simultaneous presentation of too many destinations above the fold;
- labels that make the page resemble a B2B product-marketing site.

The platform map remains important, but it must resemble an architecture artifact rather than a promotional illustration.

## 5. Page archetypes

The design system must deliberately support seven archetypes.

### 5.1 Publication front page

The homepage is an editorial index of the author's current practice.

Required order:

1. author identity and concise publication premise;
2. current featured work;
3. four-surface index;
4. Handbook flagship block;
5. flagship project;
6. selected talk and recent articles;
7. compact author/contact footer.

The page is shorter and calmer than the first mockup. It is not a complete catalogue.

### 5.2 Article / engineering essay

A technical article resembles a carefully edited engineering deep dive.

Required:

- narrow readable column;
- title, deck and concise metadata;
- published/updated state;
- diagrams at the point of explanation;
- code, equations, tables and semantic callouts;
- references;
- related Handbook/project/talk links;
- visible external edition when relevant;
- print-friendly rendering.

The article body is dominant. Sharing and navigation remain secondary.

### 5.3 Handbook contents and chapter

The landing behaves like a book contents page plus diagnostic index.

Primary elements:

- Handbook premise;
- maturity/boundary path;
- platform map;
- coherent reviewed spine;
- problem index;
- playbooks/templates/tools;
- revision state.

A chapter is visually more reference-like than an article:

- applicability and review state are prominent;
- decision path, metrics and checklist have stable patterns;
- related Articles/Talks/Projects are clearly separated from normative Handbook content.

Avoid a promotional hero inside the Handbook.

### 5.4 Project page

A project page resembles a maintained open-source product README edited for the web.

Required visual sections:

- problem and target user;
- current status/release;
- installation/quick start;
- workflow diagram;
- example output;
- evidence/privacy boundaries;
- repository, releases and contribution actions;
- related writing and Handbook model.

Avoid startup-style feature blocks, pricing-like cards and decorative GitHub vanity counters.

### 5.5 Talk/media page

A talk page behaves like a durable conference artifact.

Required:

- event/date/format;
- title and abstract;
- recording/source;
- key takeaways shown as an editorial list;
- slides when available;
- related work.

The video is important but not the only content. Do not place a giant empty media frame above all context when a recording is unavailable.

### 5.6 Tool workbench

Tools look like small internal engineering utilities.

Visual language:

- labelled inputs;
- assumptions before results;
- strong validation;
- plain tables/charts;
- no gamified score as primary output;
- result explanations tied to Handbook sections;
- local/privacy statement;
- export and reset;
- minimal decorative framing.

### 5.7 Architecture map / print artifact

The map is a technical model, not a hero illustration.

Visual language:

- orthogonal relationships, layers or capability matrix;
- restrained line weights;
- labelled boundaries;
- ownership and telemetry annotations;
- monochrome/off-white base with one active accent;
- no glow required for comprehension;
- printable in light mode;
- keyboard and no-JS fallback;
- slide- and poster-ready composition.

## 6. Homepage block specification

### Block A — Author masthead

Left-aligned, text-first.

Content:

- `Сергей Нотевский`;
- `AI Platform Lead`;
- one concise publication line;
- one current editorial thesis;
- at most two actions.

Example hierarchy:

```text
Сергей Нотевский
AI Platform Lead

Пишу и строю про то, что начинается после первого успешного вызова модели:
инференс, маршрутизация, кеш, качество, наблюдаемость, стоимость и ответственность.

[Последняя статья]  [Production AI Platform Handbook]
```

No large illustration is required in the first viewport.

### Block B — Current featured work

One strong editorial selection, not a carousel.

Possible type:

- article;
- project release;
- Handbook update;
- talk.

Show:

- type;
- title;
- one-line purpose;
- date;
- direct open action.

### Block C — Four-surface index

Use a calm typographic list or columns:

- Articles — developed technical arguments;
- Handbook — reviewed platform reference;
- Projects — executable public work;
- Talks — recordings and distilled takeaways.

Avoid equal marketing feature cards. The block explains the publication model, not product benefits.

### Block D — Handbook flagship

A wide editorial figure or structured text block:

- Handbook name;
- one-paragraph purpose;
- compact map excerpt;
- current reviewed spine;
- start/map actions.

The map should be publishable inside an article or slide deck.

### Block E — Flagship project

`audit-prompt-caching` receives a project-specific block:

- problem;
- current release/status;
- quick usage example;
- related article/Handbook link;
- project and repository actions.

Do not render it as a generic portfolio tile.

### Block F — Selected talk and recent articles

Talk:

- title;
- event/date;
- one sentence;
- recording and takeaways links.

Articles:

- simple chronological list;
- type/topic;
- title;
- date and reading time.

No thumbnails unless content-bearing.

### Block G — Author/contact

Compact closing section:

- small portrait optional;
- current focus;
- public evidence links;
- one contact action.

No testimonials, logos or service-package cards.

## 7. Navigation

Desktop header:

- author/site name;
- Articles;
- Handbook;
- Projects;
- Talks;
- About;
- search;
- locale;
- compact contact/Telegram utility.

Rules:

- no oversized CTA button dominating the header;
- active state is visible and uses `aria-current`;
- header can become non-sticky on long reading pages if testing shows less distraction;
- mobile navigation uses one clear menu and no duplicated destinations.

Handbook may have secondary local navigation that does not replace global publication navigation.

## 8. Typography

### Roles

- sans-serif: interface, headings and most prose;
- monospace: code, identifiers, equations, dates/status metadata and diagram labels;
- optional serif experiment: long-form prose only, provided Cyrillic quality and code/table integration remain strong.

### Principles

- prose is comfortable at 680–760px;
- headings are strong but not landing-page oversized;
- metadata is smaller but not low-contrast;
- uppercase monospace is used sparingly;
- line height supports long technical reading;
- bold is reserved for argument hierarchy, not every label.

Initial type candidates:

- Geist / Inter / IBM Plex Sans;
- Geist Mono / IBM Plex Mono.

Final selection requires Cyrillic, equation, code and long-reading tests.

## 9. Colour

Base:

- near-black cool background;
- warm off-white primary text;
- neutral secondary text;
- subtle structural borders.

Accent:

- one restrained cyan/teal for links, active states and system relationships.

Semantic:

- muted amber for warning/risk;
- muted red for blocker/error;
- muted green for verified/ready;
- neutral blue/grey for informational state.

Rules:

- no broad gradients;
- no information encoded only by colour;
- cyan is not applied to every label;
- text contrast meets WCAG 2.2 AA;
- print mode uses a white background and dark ink without losing semantics.

## 10. Geometry and surfaces

- low or moderate corner radius;
- minimal shadows;
- separation through rules, whitespace and typography;
- cards only when objects are genuinely independent;
- lists for archives and related work;
- tables for comparisons and tools;
- diagrams for relationships;
- callouts have semantic types, not decorative colour variants;
- avoid nested containers that create dashboard density.

## 11. Motion

Allowed:

- restrained focus/hover transitions;
- map selection/highlighting;
- small disclosure transitions;
- progress feedback for explicit tool operations.

Rejected:

- autoplay background motion;
- floating particles;
- scroll spectacle;
- glowing pulses;
- animated counters;
- motion used to simulate technical depth.

Respect `prefers-reduced-motion`.

## 12. Responsive behavior

- no horizontal overflow at 320px;
- target touch size >= 44×44 CSS px;
- one-thumb action column where needed;
- map becomes a meaningful ordered disclosure/list on mobile;
- tables get deliberate responsive transformations;
- article/chapter outline becomes a popover or collapsible index;
- project quick start and talk takeaways remain above secondary metadata;
- tool results follow inputs on mobile;
- no desktop right rail is required to understand the page.

## 13. Visual exploration variants

Production implementation still requires comparison of three structurally different variants inside this family.

### A — Dark Editorial Journal

- strongest article/archive orientation;
- large typography and restrained rules;
- minimal permanent sidebar;
- Handbook appears as a flagship publication series.

### B — Technical Handbook

- stronger map and reference navigation;
- more visible metadata and chapter structure;
- homepage still author-led, not documentation-led.

### C — Engineering Notebook

- RFC, diagrams, code and working artifacts more prominent;
- project and tool surfaces especially strong;
- handwritten/sketch cues only if restrained and reproducible.

A direction is not materially different if it only changes colour, font or radius.

Each variant must show:

- desktop and mobile homepage;
- article;
- Handbook landing/chapter/map;
- `audit-prompt-caching` project page;
- talk page;
- tool workbench.

## 14. Acceptance criteria

A visual direction passes when:

- a target reader identifies the author and domain in five seconds;
- Articles, Handbook, Projects and Talks look distinct but related;
- the page cannot be rebranded as an AI startup merely by replacing text;
- long-form reading remains the dominant chapter/article experience;
- the map communicates without glow or hover;
- project quick start is immediately usable;
- talk takeaways are visible before secondary chrome;
- mobile retains the same content hierarchy;
- print/PDF output remains credible;
- accessibility requirements are met;
- no section exists only to make the page look more “premium.”

## 15. Converged visual definition

> `notevskii.tech` is a dark author-led engineering publication: editorial when presenting articles and talks, reference-like inside the Handbook, README/RFC-like for projects, and utilitarian inside tools. Technical credibility comes from content, structure, diagrams, evidence and maintenance—not from marketing chrome.