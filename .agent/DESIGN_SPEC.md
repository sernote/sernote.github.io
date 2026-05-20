# Design Spec

## Design thesis

This site is a premium technical field manual for production AI platform engineering.

It should feel serious, calm, precise, and architectural.

It should not feel like a generic AI startup landing page.

## Visual principles

- Dark-mode-first.
- Graphite/black background.
- Off-white text.
- Restrained cyan/blue accent.
- Thin borders.
- Subtle grid or blueprint-like background.
- Strong typography.
- Monospace uppercase labels.
- Spacious layout.
- Diagram-like cards.
- Minimal animation.

## Avoid

- Robots.
- Glowing brains.
- Cyberpunk neon.
- Excessive gradients.
- Playful SaaS illustrations.
- Cartoon icons.
- Cluttered dashboards.
- Blog-like layout.

## Home page

The home page should combine personal positioning and project identity.

Required content:

- Author positioning as AI Platform Lead.
- Link to Production AI Platform Handbook.
- Expertise areas.
- Featured projects.
- Featured writing.
- Featured talks.
- Contact CTA.

Suggested hero copy:

```txt
AI Platform Lead building production-grade LLM, STT, embeddings and agent platforms.
```

Secondary copy:

```txt
I write and speak about turning AI demos into production platforms: inference, routing, caching, evals, guardrails, observability, cost and ownership.
```

## Handbook landing

Required core copy:

```txt
Production AI Platform Handbook
From API key to platform.
Production AI is not a model. It is a platform.
```

Supporting copy:

```txt
A practical field guide for building LLM, STT, embeddings and agent platforms in production: inference, routing, cache, evals, guardrails, observability, cost and ownership.
```

## Main site sections

The root route `/` is the executive/author landing and should include:

- Hero: name, role, positioning, and CTA.
- Expertise: AI Platform, Inference, Evals, Observability, Cost, Guardrails.
- Projects: Production AI Platform Handbook, Prefix Cache Auditor.
- Writing: Habr, Telegram, and essays.
- Talks: conferences, webinars, and podcasts.
- Contact.

The handbook landing `/handbook` should include:

- Problem after the demo.
- Platform layers.
- Featured handbook chapters.
- Featured tools.
- About the author.
- Final CTA.

## Platform layers

Represent these layers visually:

- Strategy
- AI Gateway
- Model Routing
- Inference Runtime
- Inference Economics
- Prompt / Prefix / KV Cache
- Evals & Quality Gate
- Observability
- Guardrails
- Operating Model

## Components

Build reusable components:

- Hero
- MetricGrid
- SectionCard
- PlatformLayerCard
- ChapterCard
- FeaturedToolCard
- Callout
- Checklist
- DecisionMatrix
- RelatedChapters
- PlatformMap
- MaturityModel
- ChapterMeta

## Design quality bar

The site should look intentional even with placeholder content.

It should be credible enough to show publicly as v0.1.

