# Ural Digital Weekend Photo Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Ural Digital Weekend poster with a cache-busted 16:9 crop of Sergey's supplied event photograph.

**Architecture:** Keep the existing talk and image rendering paths. Change only the source-owned thumbnail metadata and binary asset, then let the existing static export and structured-data builders consume the new public path.

**Tech Stack:** MDX, JPEG, macOS `sips`, Vitest, Next.js static export, pnpm.

---

### Task 1: Lock the new preview contract in RED

**Files:**
- Modify: `tests/content-v3/source.test.ts`

- [ ] Change the exact Ural talk expectation to require:

```ts
updatedAt: "2026-08-15",
thumbnail: {
  path: "/media/talks/llm-selection-ural-digital-weekend-speaker.jpg",
  sourceUrl: "https://notevskii.tech/media/talks/llm-selection-ural-digital-weekend-speaker.jpg",
  capturedAt: "2026-08-15",
  alt: "Сергей Нотевский выступает на Ural Digital Weekend 2025 рядом со слайдом о выборе LLM"
}
```

- [ ] Run `corepack pnpm --config.verify-deps-before-run=false vitest run tests/content-v3/source.test.ts`.
- [ ] Confirm RED reports the old date, poster path, YouTube thumbnail URL and missing speaker alt text.

### Task 2: Produce and wire the approved photograph

**Files:**
- Create: `public/media/talks/llm-selection-ural-digital-weekend-speaker.jpg`
- Delete: `public/media/talks/llm-selection-ural-digital-weekend.jpg`
- Modify: `content/v3/talks/llm-selection-ural-digital-weekend.mdx`

- [ ] Generate the exact 16:9 crop from the supplied attachment. Keep crop and resize as separate `sips` invocations because a combined invocation applies the operations in an unsuitable order:

```bash
preview_tmp=$(mktemp -d /tmp/ural-talk-photo.XXXXXX)
sips --cropToHeightWidth 480 853 --cropOffset 260 0 \
  "/tmp/codex-remote-attachments/019f8688-86f0-7411-b38d-77491051182f/EC0BEEB9-1BB5-4AD1-8153-1A0AE4429EB0/1-Фото-1.jpg" \
  --out "$preview_tmp/crop.jpg"
sips --resampleHeightWidth 720 1280 "$preview_tmp/crop.jpg" \
  --out "public/media/talks/llm-selection-ural-digital-weekend-speaker.jpg"
```

- [ ] Update `updatedAt`, `thumbnail.path`, `thumbnail.sourceUrl`, `thumbnail.capturedAt` and `thumbnail.alt` to the RED contract.
- [ ] Remove the old poster JPEG after the MDX path points to the new file.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false vitest run tests/content-v3/source.test.ts` and confirm GREEN.
- [ ] Inspect the generated JPEG and confirm 1280 × 720, recognisable face, readable event context and no generated or added content.

### Task 3: Verify and publish

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] Record the cache-busted image replacement, deterministic crop and RED/GREEN evidence in `.agent/STATUS.md`.
- [ ] Run `corepack pnpm --config.verify-deps-before-run=false verify` and `git diff --check`.
- [ ] Inspect the exported Materials and talk HTML for the new path and absence of the old path.
- [ ] Commit the scoped files, merge to `main`, push, wait for the matching Pages workflow and check the live JPEG, Materials page and talk page with cache-busting query parameters.
