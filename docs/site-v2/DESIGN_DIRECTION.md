# notevskii.tech v2 — Converged Design Direction

Status: **normative visual direction**  
Depends on: [`GOAL.md`](./GOAL.md), [`SPEC.md`](./SPEC.md), [`HANDBOOK_STRATEGY.md`](./HANDBOOK_STRATEGY.md)

## 1. Decision

The visual direction is **Dark Engineering Publication**.

`notevskii.tech` must look like a serious author-led engineering publication and working handbook, not:

- an AI startup landing page;
- a SaaS dashboard;
- a portfolio template;
- a cyberpunk visualization demo;
- a marketplace of cards;
- a marketing funnel decorated with technical vocabulary.

The closest mental model is the editorial directness of high-quality author publications such as Lenny's Newsletter and The Pragmatic Engineer, combined with the information density and precision of an engineering handbook, RFC library and architecture review workspace.

The dark theme is retained, but darkness is not used as a substitute for technical credibility.

## 2. Design thesis

> Content creates authority. Structure makes it usable. Diagrams make the system legible. Interface chrome stays quiet.

The design should communicate:

- one identifiable author;
- one coherent body of work;
- strong editorial judgement;
- engineering depth;
- long-term maintenance;
- explicit models, assumptions and states;
- usefulness before conversion.

## 3. What to borrow from the reference publications

Borrow the underlying product behaviours, not their exact styling.

### Author-led clarity

- publication name and author are immediately clear;
- the author's point of view is visible without a long biography;
- credibility comes from the archive and quality of work;
- the interface does not compete with the writing.

### Editorial hierarchy

- strong title and deck;
- visible publication date, update date and content type;
- clear distinction between current, foundational and recent work;
- simple lists of important pieces instead of equal card walls;
- archive and search are first-class but visually quiet.

### Repeatable publication rhythm

- recognizable chapter and material templates;
- predictable metadata;
- stable URLs;
- clear series and topic relationships;
- obvious next reading step.

### Restraint

- few accents;
- limited button hierarchy;
- no decorative metrics;
- no invented social proof;
- no oversized product screenshots without explanatory value;
- no gratuitous animations.

## 4. Explicit rejection of the first visual mockup

The first generated mockup is useful as an inventory of possible blocks, but it is not the target visual system.

Remove or substantially redesign:

- the large glowing isometric AI-platform illustration;
- dashboard-like right rail with many boxed widgets;
- bright gradient primary CTA;
- radar chart used as decoration;
- white SaaS-style tool-card strip;
- vanity counts such as years, material counts or platform scale without a direct evidentiary purpose;
- repeated rounded cards for every content type;
- neon system-map styling;
- labels that make the page resemble a product-marketing site;
- simultaneous presentation of too many destinations above the fold.

The signature map remains important, but it must resemble an architecture artifact rather than a promotional illustration.

## 5. Page archetypes

The site has five deliberate page archetypes.

### 5.1 Publication front page

The homepage behaves like the front page of an engineering publication.

Required order:

1. publication identity and concise premise;
2. author line;
3. two practical entry routes;
4. signature map excerpt;
5. current recommended reading;
6. latest reviewed updates;
7. tools and working artifacts;
8. compact author/contact footer.

The page should be shorter and calmer than the first mockup. It is an editorial index, not a complete product catalogue.

### 5.2 Handbook contents

The handbook landing behaves like a book contents page plus a diagnostic index.

Primary elements:

- handbook premise;
- maturity path;
- platform map;
- coherent chapter spine;
- problem index;
- playbooks and templates;
- revision state.

Avoid large promotional hero blocks inside the handbook.

### 5.3 Chapter / engineering essay

A chapter resembles a carefully edited engineering deep dive or RFC.

Required visual features:

- narrow readable column;
- title, deck and concise executive summary;
- visible reviewed/updated state;
- restrained contents navigation;
- diagrams embedded at the point of explanation;
- code, equations, tables and callouts with distinct semantics;
- references and related work at the end;
- print-friendly rendering.

The article body is the dominant surface. Navigation and sharing controls remain secondary.

### 5.4 Architecture map

The map is a technical model, not a hero illustration.

Visual language:

- orthogonal relationships, layers or dependency graph;
- restrained line weights;
- labelled boundaries;
- explicit ownership and telemetry annotations;
- monochrome/off-white base with one active accent;
- no glow required for comprehension;
- printable in light mode;
- keyboard and no-JS fallback.

The map can support interaction, but every interaction must expose useful engineering information.

### 5.5 Tool workbench

Tools look like small internal engineering utilities.

Visual language:

- labelled inputs;
- assumptions visible before results;
- strong validation;
- plain tables and charts;
- no gamified scores as primary output;
- result explanations tied to handbook sections;
- local/privacy statement;
- export and reset actions;
- minimal decorative framing.

## 6. Homepage block specification

### Block A — Publication masthead

Left-aligned, text-first.

Content:

- `Production AI Platform Handbook`;
- Russian explanatory line;
- `Сергей Нотевский · AI Platform Lead`;
- one short thesis;
- at most two actions.

No illustration is required in the first viewport. A small map fragment or typographic diagram may appear only if it adds orientation.

### Block B — Two entry paths

Two text-led columns, not oversized marketing cards.

1. **Нужна ли нам AI-платформа?**
   - maturity and boundary route;
   - starts with an assessment or chapter.
2. **У нас уже есть проблема в продакшене**
   - symptom route;
   - starts with a compact problem index.

Each column has one clear link and 3–5 example prompts.

### Block C — Platform map excerpt

A wide editorial figure with caption, legend and link to the full map.

The figure should look publishable inside a technical article or conference deck.

### Block D — Start with these

Three editorial selections shown as a ranked list:

- foundational chapter;
- practical playbook/tool;
- recently reviewed update.

Each row includes:

- type;
- title;
- one-line purpose;
- reviewed date;
- reading/use time where meaningful.

### Block E — Latest reviewed updates

Simple chronological list, similar to a strong publication archive.

Do not use image thumbnails unless the image is content-bearing.

### Block F — Tools and templates

Compact table or list:

- name;
- decision supported;
- maturity/status;
- input privacy;
- open action.

Avoid a pricing-card visual pattern.

### Block G — Author and contact

Compact closing block:

- small portrait optional;
- current focus;
- selected public evidence links;
- one contact action.

No testimonial carousel.

## 7. Navigation

Desktop header should feel like a publication header.

Recommended structure:

- wordmark/publication title;
- `Карта`;
- `Хэндбук`;
- `Плейбуки` when launch volume justifies it;
- `Инструменты`;
- `Материалы`;
- search;
- locale;
- quiet contact link/button.

Rules:

- no oversized CTA in the header;
- no pill around every item;
- active state is typographic or underline-based;
- mobile navigation is a plain, fast contents menu;
- author/about is available but does not dominate the header.

## 8. Visual tokens

### Palette

Dark is the default publication mode.

- background: near-black with a slight cool tone;
- primary text: warm off-white, not pure white;
- secondary text: neutral grey with AA contrast;
- structural lines: low-contrast neutral;
- active accent: one restrained cyan/teal;
- warning: muted amber;
- critical: muted red;
- success: restrained green used only for state.

Avoid multi-colour gradients and decorative neon.

### Typography

- editorial sans or highly legible grotesk for navigation and body;
- optional serif only if it improves long-form editorial character and Cyrillic quality;
- monospace reserved for metadata, identifiers, code and diagram labels;
- no uppercase monospace label before every section;
- headline scale is strong but not startup-landing oversized;
- body line-height and measure take precedence over visual compression.

### Shape and depth

- square or lightly rounded corners;
- minimal shadows;
- borders used for structure, not to turn every item into a card;
- sections separated primarily by spacing, rules and headings;
- content-bearing figures may use framed surfaces;
- buttons look like controls, not promotional objects.

### Motion

- near-zero by default;
- map selection and disclosure only;
- no scroll spectacle;
- no pulsing/glowing system nodes;
- respect reduced-motion preferences.

## 9. Content density rules

- above the fold: one promise, one author line, two entry actions;
- no more than three editorial priorities in one block;
- default to lists over grids when items are comparable;
- default to a table when the comparison dimension matters;
- default to a diagram only when relationships matter;
- use cards only for truly independent interactive objects;
- never use a metric solely to fill visual space;
- each icon must communicate type or state, not decorate a title.

## 10. Engineering credibility checks

A screen fails the direction if:

- it could be mistaken for an AI SaaS homepage after replacing the copy;
- diagrams are decorative and cannot answer an engineering question;
- visual hierarchy depends on many boxed cards;
- marketing language is stronger than the evidence below it;
- an assessment implies unsupported numerical precision;
- the author is hidden behind an anonymous product brand;
- the interface makes long-form reading feel secondary;
- a screenshot looks impressive but the page is slower to scan than a plain document.

## 11. Revised visual exploration gate

The previous three-direction exploration is narrowed by this decision.

Do not explore generic SaaS, cyberpunk or dashboard directions.

Produce three variants inside the same engineering-publication family:

1. **Dark Editorial Journal**
   - strongest publication/newsletter influence;
   - typography and lists dominate;
   - map appears as an editorial figure.
2. **Technical Handbook**
   - strongest book/manual influence;
   - contents, annotations and diagrams dominate;
   - denser but highly structured.
3. **Engineering Notebook**
   - strongest RFC/research-notebook influence;
   - marginalia, decision records and working artifacts dominate;
   - most utilitarian tool treatment.

Each variant must render the same five screens:

- desktop homepage;
- mobile homepage;
- handbook contents;
- chapter;
- tool workbench;
- full platform map.

Differences must be structural and typographic, not merely colour changes.

## 12. Current recommendation

The leading direction is a combination of:

- **Dark Editorial Journal** for the homepage and materials;
- **Technical Handbook** for handbook contents and chapters;
- **Engineering Notebook** for tools, templates and decision records.

They share one token system and publication identity. They are page modes, not separate brands.

## 13. Acceptance sentence

The final design should make a senior engineer think:

> This is a maintained body of engineering work I can read, cite and use.

It should not primarily make them think:

> This is a polished landing page for an AI consultancy or software product.
