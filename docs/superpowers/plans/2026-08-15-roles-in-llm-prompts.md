# Roles in LLM Prompts Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Sergey's corrected and expanded 14 December 2025 post as a native Blog article.

**Architecture:** Add one source-owned native MDX record and one keep route. Existing registry, Blog, RSS, sitemap, structured-data and static-export code will consume it without new UI or runtime logic.

**Tech Stack:** MDX, TypeScript, Vitest, Next.js static export, pnpm.

---

### Task 1: Lock the article and route contract in RED

**Files:**
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/seo/rss.test.ts`
- Modify: `tests/seo/structured-data.test.ts`
- Modify: `tests/build/v31-export-contract.test.ts`
- Modify: `tests/build/static-export-contract.test.ts`

- [ ] Add an exact real-MDX contract for `roles-in-llm-prompts`: native article, slug `roles-in-llm-prompts`, publication date `2025-12-14`, update date `2026-08-15`, source links, topics and body.
- [ ] Add the article to the Blog fixture after the two newer native records and to the RSS fixture; change the expected feed size from 12 to 13.
- [ ] Add `/blog/roles-in-llm-prompts` to the accepted keep set, sitemap expectation, export route matrix and JSON-LD matrix. Change expected route decisions from 106 to 107, keeps from 17 to 18, sitemap URLs from 17 to 18 and JSON-LD scripts from 18 to 20.
- [ ] Run the focused Vitest files and confirm failures describe the missing source record and route.

### Task 2: Add the minimal native article

**Files:**
- Create: `content/v3/blog/roles-in-llm-prompts.mdx`
- Modify: `config/v3-route-manifest.json`

- [ ] Create the MDX record with this metadata contract:

```yaml
entityId: roles-in-llm-prompts
type: article
locale: ru
kind: native
slug: roles-in-llm-prompts
editorialFormat: article
title: "Роли больше не нужны. Но это не точно"
description: "Что именно показало исследование Wharton об экспертных ролях в промптах и почему из него рано делать вывод, что роли бесполезны."
publicationStatus: published
reviewStatus: unreviewed
publishedAt: "2025-12-14"
updatedAt: "2026-08-15"
reviewedAt: null
reviewCycleDays: null
topics:
  - prompt-engineering
  - personas
  - llm-evaluation
  - benchmarks
relations: {}
excerpt: "Экспертная роль не повысила точность ответов на двух наборах тестовых вопросов. Это хороший результат, но он не отменяет роли как способ задать контекст, перспективу и форму ответа."
externalType: null
sourceName: null
sourceUrl: null
sourceAuthorProfileUrl: null
participationLabel: null
supersedes: null
supersededBy: null
```

- [ ] Write the article in first person with four substantive sections: the overreaction, the experiment, the limits of its conclusion and the author's current practice. Preserve the final line `Так что давайте там это. Без крайностей.` and link both primary sources.
- [ ] Add `{ "source": "/blog/roles-in-llm-prompts", "destination": null, "behavior": "keep", "locale": "ru" }` after the existing native Blog routes.
- [ ] Run the focused test set and confirm it is green.

### Task 3: Review, verify and publish

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] Review the final Russian text against the source post: first-person voice, no generic marketing language, no claim beyond the Wharton methodology, no repeated conclusion and no long list masquerading as an article.
- [ ] Record the article, accuracy corrections, RED/GREEN evidence and final validation counts in `.agent/STATUS.md`.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false verify` and `git diff --check`.
- [ ] Inspect the export for the article page, Blog chronology, 13 RSS items, 18 sitemap URLs and the two JSON-LD records on the new route.
- [ ] Commit the scoped files, push `main`, wait for the matching GitHub Pages workflow, then check the live article, Blog, RSS and sitemap with cache-busting query parameters.
