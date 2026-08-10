# About Page Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic and partly incorrect About page with a concise, first-person, source-bounded author page.

**Architecture:** Keep the existing `AUTHOR_PROFILE` as the single source for stable author copy and the existing `AboutViewModel` for selected public evidence. Simplify `AboutPageContent` by replacing responsibility and position collections with three narrative fields, while preserving the editorial shell, source-driven evidence rows, Telegram links, structured data, and static export compatibility.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Vitest, static export.

---

### Task 1: Lock the corrected author contract with focused tests

**Files:**
- Modify: `tests/content-v3/evidence.test.ts`
- Modify: `tests/pages/v31-personal-page-rendering.test.ts`

- [ ] **Step 1: Replace the obsolete profile assertions**

Update `tests/content-v3/evidence.test.ts` so the public author contract expects these exact fields and values:

```ts
expect(AUTHOR_PROFILE.aboutIntro).toBe(
  "Я руковожу направлением AI Platform и командой в Битрикс24. Мы делаем платформу для AI-сценариев продуктов компании и поддерживаем её в работе."
);
expect(AUTHOR_PROFILE.currentWork).toBe(
  "Мы занимаемся инфраструктурой инференса, маршрутизацией и очередями, качеством, наблюдаемостью, мощностями и стоимостью. Я отвечаю за технические решения и работу команды."
);
expect(AUTHOR_PROFILE.career).toBe(
  "В 2024 году я работал продакт-менеджером и AI-евангелистом Битрикс24. В 2025-м перешёл в разработку CoPilot. Сейчас руковожу AI Platform. Путь получился не самым прямым, зато я успел посмотреть на AI-продукты с разных сторон: от пользовательского сценария до эксплуатации."
);
expect(AUTHOR_PROFILE.sitePurpose).toEqual([
  "Здесь я разбираю задачи, с которыми сталкиваюсь в работе: локальный инференс, устройство control plane, качество моделей и агентов, capacity, стоимость и кэширование.",
  "Одни темы становятся статьями или докладами. Другие превращаются в код: так появился audit-prompt-caching. Большие разборы постепенно складываются в раздел AI Platform."
]);
```

Remove assertions for `responsibilities` and `positions`. Preserve the stable identity, `sameAs`, Telegram, freeze, and confidential-scale checks. Add negative assertions against the exact phrases `внешних API`, `внешним моделям`, `За что отвечаю`, `На чём я стою`, `выбираю, адаптирую` and `Исключений нет` across the serialized author profile.

- [ ] **Step 2: Replace the rendered About contract**

Update the About test in `tests/pages/v31-personal-page-rendering.test.ts` to assert:

```ts
expect(html).toContain(AUTHOR_PROFILE.aboutIntro);
expect(html).toContain(AUTHOR_PROFILE.currentWork);
expect(html).toContain("Как я пришёл к AI Platform");
expect(html).toContain(AUTHOR_PROFILE.career);
expect(html).toContain("Что я здесь собираю");
for (const paragraph of AUTHOR_PROFILE.sitePurpose) {
  expect(html).toContain(paragraph);
}
expect(count(html, /data-about-evidence=/g)).toBe(aboutModel.evidence.length);
expect(html).not.toContain("За что отвечаю");
expect(html).not.toContain("На чём я стою");
expect(html).not.toContain("внешних API");
expect(html).not.toContain("внешним моделям");
expect(count(html, /Написать в Telegram/g)).toBe(1);
expect(html).toContain('href="/materials"');
```

Preserve the external-link assertion and the absence of the old editorial-principles and third-person speaker-bio blocks.

- [ ] **Step 3: Run the focused tests and confirm RED**

Run:

```bash
corepack pnpm vitest run tests/content-v3/evidence.test.ts tests/pages/v31-personal-page-rendering.test.ts
```

Expected: failures because `currentWork`, `career`, and `sitePurpose` do not exist and the old sections still render.

### Task 2: Simplify the author profile and About composition

**Files:**
- Modify: `lib/author-profile.ts`
- Modify: `components/pages/v31-personal-pages.tsx`

- [ ] **Step 1: Replace the obsolete profile copy**

In `lib/author-profile.ts`:

- replace `aboutIntro` with the exact text from the design spec;
- add `currentWork`, `career`, and frozen `sitePurpose` with the exact text from the design spec;
- remove `responsibilities` and `positions` entirely;
- replace `channelPitch` and `organizerNote` with the exact text from the design spec;
- keep `id`, `name`, `role`, `company`, `url`, `sameAs`, and `channelName` unchanged.

Do not add external-model access, external APIs, internal scale, topology, costs, team size, new links, or new profile fields.

- [ ] **Step 2: Replace the two generic grid sections**

In `AboutPageContent`:

- render `AUTHOR_PROFILE.aboutIntro` and `AUTHOR_PROFILE.currentWork` as two paragraphs in the right column of the existing header;
- replace «За что отвечаю» with «Как я пришёл к AI Platform» and one paragraph from `AUTHOR_PROFILE.career`;
- replace «На чём я стою» with «Что я здесь собираю» and the two `AUTHOR_PROFILE.sitePurpose` paragraphs;
- preserve «Что почитать и посмотреть», `AboutEvidenceRow`, «Все материалы», the Telegram block, and both links;
- do not introduce a new component, timeline, card grid, icon, image, or client-side behavior.

Use existing spacing and `aboutSectionClassName`. Narrative paragraphs should use the current `text-base leading-7 text-muted-foreground` treatment, with no more than `max-w-3xl`.

- [ ] **Step 3: Run focused tests and confirm GREEN**

Run:

```bash
corepack pnpm vitest run tests/content-v3/evidence.test.ts tests/pages/v31-personal-page-rendering.test.ts
```

Expected: both files pass.

- [ ] **Step 4: Run static checks**

Run:

```bash
corepack pnpm lint
corepack pnpm typecheck
git diff --check
```

Expected: all commands exit 0.

### Task 3: Record the milestone and verify the static page

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] **Step 1: Update project status**

Add one concise completed item at the top of `.agent/STATUS.md` describing:

- the removal of the incorrect external-API claim, responsibility catalogue, and position manifesto;
- the first-person current role, career path, site-purpose narrative, evidence list, and contact;
- the focused and full verification actually run.

Do not rewrite historical status entries.

- [ ] **Step 2: Run the production build**

Run:

```bash
corepack pnpm build
```

Expected: exit 0 and a static `/about/` export.

- [ ] **Step 3: Inspect the exported About contract**

Run:

```bash
test -f out/about/index.html
rg -n "Как я пришёл к AI Platform|Что я здесь собираю|Что почитать и посмотреть" out/about/index.html
! rg -n "внешних API|внешним моделям|За что отвечаю|На чём я стою|Короткая биография для организаторов" out/about/index.html
```

Expected: the three current headings are found and the obsolete or false copy is absent.

- [ ] **Step 4: Run final focused verification**

Run:

```bash
corepack pnpm vitest run tests/content-v3/evidence.test.ts tests/pages/v31-personal-page-rendering.test.ts
corepack pnpm lint
corepack pnpm typecheck
git diff --check
git status --short
```

Expected: checks pass; only the intended About files, this spec/plan, `.agent/STATUS.md`, and the pre-existing untracked `.claude/` are present.

## Self-review

- Spec coverage: every factual, editorial, structural, visual, and validation requirement maps to Tasks 1–3.
- YAGNI: no schema, route, view-model, structured-data, navigation, or visual-system change is planned.
- Type consistency: `currentWork` and `career` are strings; `sitePurpose` is a frozen two-string collection used by both tests and rendering.
- Privacy: no internal numbers, topology, costs, team size, or external-model access are introduced.
- User constraints: implementation and both review stages must run through fresh `gpt-5.6-luna` subagents at `xhigh`; the root agent only coordinates, updates the plan if evidence requires it, and runs final verification.
