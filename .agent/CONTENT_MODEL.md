# Content Model

> **Superseded (historical context):** The product direction in this file is superseded by the accepted v3 spec (`docs/superpowers/specs/2026-07-22-notevskii-tech-v3-design.md`) and implementation plan (`docs/superpowers/plans/2026-07-22-notevskii-tech-v3-implementation.md`). It is kept for historical context; the current content model is the typed v3 registry in `lib/content-v3/schema.ts` and `content/v3`.

## Handbook frontmatter schema

Every handbook MDX page must include:

```yaml
---
title: ""
description: ""
section: ""
type: "chapter"
level: "intermediate"
status: "draft"
audience: []
tags: []
related: []
published: "2026-05-18"
updated: "2026-05-18"
---
```

## Allowed values

### `section`

- `start`
- `manifesto`
- `platform`
- `strategy`
- `gateway`
- `inference`
- `economics`
- `caching`
- `evals`
- `observability`
- `guardrails`
- `operating-model`
- `tools`

### `type`

- `chapter`
- `checklist`
- `template`
- `tool`
- `case-study`
- `glossary`

### `level`

- `beginner`
- `intermediate`
- `advanced`
- `expert`

### `status`

- `draft`
- `published`
- `evergreen`
- `deprecated`

### `audience`

- `ai-platform-lead`
- `staff-engineer`
- `principal-engineer`
- `ml-platform-engineer`
- `mlops-engineer`
- `backend-engineer`
- `engineering-manager`
- `cto`
- `product-engineer`

## Chapter structure

Each chapter should include:

```md
# Title

## Problem

## Symptoms

## Mental model

## Architecture

## Metrics

## Trade-offs

## Anti-patterns

## Checklist

## Related chapters
```

## Initial chapters

Create placeholder-but-useful content for:

1. Start Here
2. Manifesto
3. Production AI Platform Map
4. AI Platform Maturity Model
5. MaaS vs Self-hosted
6. AI Gateway
7. Inference Runtime
8. Inference Economics
9. Prefix Cache
10. AI Quality Gate
11. LLM Observability Checklist
12. Ownership and Operating Model

## Initial content tree

```txt
content/
  handbook/
    index.mdx
    start-here.mdx
    manifesto.mdx
    platform-map.mdx
    maturity-model.mdx
    strategy/
      maas-vs-self-hosted.mdx
    gateway/
      ai-gateway.mdx
    inference/
      inference-runtime.mdx
    economics/
      inference-economics.mdx
    caching/
      prefix-cache.mdx
    evals/
      ai-quality-gate.mdx
    observability/
      llm-observability-checklist.mdx
    operating-model/
      ownership.mdx
```

## Tone

- Practical.
- Senior.
- Engineering-focused.
- No hype.
- No generic AI marketing.
- No confidential internal details.

## Example chapter frontmatter

```yaml
---
title: "AI Gateway"
description: "Why an AI Gateway is the control plane of a production AI platform."
section: "gateway"
type: "chapter"
level: "intermediate"
status: "draft"
audience:
  - ai-platform-lead
  - staff-engineer
  - ml-platform-engineer
tags:
  - ai-gateway
  - routing
  - quotas
  - model-lifecycle
related:
  - model-routing
  - inference-economics
  - observability
published: "2026-05-18"
updated: "2026-05-18"
---
```

