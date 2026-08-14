# Context Window Habr Material Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Sergey's long-context Habr article to Materials as a metadata-only external publication related to Prefix Cache.

**Architecture:** Reuse the existing `external-note` content contract and Materials view model. Add no route or UI component; the content registry supplies the card and the existing relation resolver exposes the article from Prefix Cache.

**Tech Stack:** MDX frontmatter, TypeScript, Vitest, Next.js static export.

---

### Task 1: Lock the publication contract

**Files:**
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/content-v3/evidence.test.ts`

- [ ] **Step 1: Write the failing source test**

Add `context-window-habr` to the exact external publication contract with:

```ts
{
  entityId: "context-window-habr",
  title: "Синдром бесконечного окна: почему 1 миллион токенов в LLM не решает ваши проблемы (пока)",
  publishedAt: "2025-12-15",
  sourceUrl: "https://habr.com/ru/companies/bitrix/articles/976528/",
  relations: { platformEntityIds: ["prefix-cache"] },
  externalType: "authored-article"
}
```

Add the ID to the Materials fixture between `agent-skills-habr` and `prompt-engineering-vc`, and include the sixth publication file in the evidence inventory.

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
./node_modules/.bin/vitest run tests/content-v3/source.test.ts tests/pages/v31-personal-pages.test.ts tests/content-v3/evidence.test.ts
```

Expected: failures report the missing `context-window-habr` source record and Materials entry.

### Task 2: Add the external publication

**Files:**
- Create: `content/v3/publications/context-window-habr.mdx`
- Modify: `lib/content-v3/view-models.ts`

- [ ] **Step 1: Create the MDX record**

Use `kind: external-note`, `slug: null`, `publishedAt: "2025-12-15"`, `updatedAt: "2026-08-14"`, the verified Habr URL and author profile, and `platformEntityIds: [prefix-cache]`. Keep the body to an original two-sentence annotation and a link to Habr.

- [ ] **Step 2: Add the record to the required Materials inventory**

Insert `context-window-habr` in `MATERIALS_EXTERNAL_IDS`. Do not add a route, route-manifest record, RSS item or new component.

- [ ] **Step 3: Run focused tests and verify GREEN**

Run:

```bash
./node_modules/.bin/vitest run tests/content-v3/source.test.ts tests/pages/v31-personal-pages.test.ts tests/content-v3/evidence.test.ts
```

Expected: all focused tests pass.

### Task 3: Verify, document and publish

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] **Step 1: Record the completed material and exact validation counts**

Add one top-level Completed entry with the source date, placement, relation and final verification results.

- [ ] **Step 2: Run the full validation gate**

Run:

```bash
pnpm verify
git diff --check
```

Expected: lint, TypeScript, Vitest, static build, integration export tests, reference audit and export audit all exit 0.

- [ ] **Step 3: Inspect the static export**

Confirm `out/materials/index.html` contains the title, `15 декабря 2025 года`, the Habr URL and author contribution. Confirm the source registry resolves the Prefix Cache relation and `out/rss.xml` does not contain the external publication.

- [ ] **Step 4: Commit, push and monitor Pages**

Commit only the article-related files, push `main`, wait for the Pages workflow triggered by the pushed SHA, then verify the live Materials and Prefix Cache HTML through CLI requests.
