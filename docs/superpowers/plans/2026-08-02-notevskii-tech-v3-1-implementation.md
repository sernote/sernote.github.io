# notevskii.tech v3.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать текущую v3 в принципиально новый личный инженерный продукт с тремя входами — «Блог», «Материалы» и «AI Platform» — и выпустить один полный, проверенный вертикальный срез без наследования старого AI-slop интерфейса.

**Architecture:** Сохранить Next.js 16, App Router, MDX, типизированный registry, relation graph и static export, но заменить весь пользовательский слой. Новый светлый editorial shell и верхнеуровневые страницы строятся по принятому пятому visual target; detail/reference-страницы выводятся из той же системы на одном эталоне каждого типа и проходят отдельный gate до расширения. Legacy URL обслуживаются после сборки явными `static-alias` или `archive` решениями из route manifest.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Fumadocs MDX, Zod 4, Tailwind CSS 4, `@fontsource-variable/onest` 5.3.0, Lucide, Vitest 4, pnpm 10, GitHub Pages static export.

---

## Нормативные источники

1. Продуктовая спецификация: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-correction-design.md`.
2. Решения по URL: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-route-decisions.md`.
3. Финальный visual review: `/Users/notevskii/.codex/visualizations/2026/07/27/019fa511-09f2-7601-b324-8af2fc3c3b19/notevskii-tech-v3-1-fifth-iteration-review/notevskii-tech-v3-1-fifth-iteration-review.md`.
4. Visual evidence: `/Users/notevskii/.codex/visualizations/2026/07/27/019fa511-09f2-7601-b324-8af2fc3c3b19/notevskii-tech-v3-1-fifth-iteration-review/evidence`.
5. Архив Stitch: `/Users/notevskii/Downloads/Редакционный атлас трёх экранов5.zip`.

Скриншоты — visual target. HTML, CSS и `support.js` из Stitch-архива не копируются. Если скриншот и текстовый контракт расходятся, поведение и контент берутся из спецификации, композиция — из принятого evidence.

## Граница релиза

Полностью реализовать:

- `/`;
- `/blog`;
- `/materials`;
- `/ai-platform`;
- `/ai-platform/map`;
- `/about`.

Реализовать по одному эталону:

- `/blog/ai-platform-before-gpu` и короткую заметку `/blog/workload-shape-over-model-name`;
- `/talks/maas-vs-self-hosted`;
- `/projects/audit-prompt-caching`;
- `/ai-platform/areas/inference-plane`;
- `/ai-platform/components/prefix-cache`;
- `/ai-platform/cases/agent-session-cache-reuse`.

Не добавлять поиск, фильтры, подписку, аналитику, backend, формы, веб-аудитор cache, новые каталоги или заполнение остальных областей AI Platform.

## Файловая карта

### Создать

- `components/site/editorial-shell.tsx` — server shell, header, footer, skip link и landmarks.
- `components/site/mobile-navigation.tsx` — единственный client-компонент оболочки: открытие, закрытие, focus return и body scroll lock.
- `components/editorial/section-heading.tsx` — общий заголовок секции и необязательная буквальная ссылка «Все материалы».
- `components/editorial/editorial-link.tsx` — внутренние и внешние текстовые действия с доступным cue.
- `components/pages/v31-personal-pages.tsx` — Home, Blog, Materials и About.
- `components/pages/v31-content-detail-page.tsx` — статья, заметка, выступление и проект.
- `components/pages/v31-ai-platform-pages.tsx` — landing, карта и reference shell.
- `app/(en)/materials/page.tsx` — новый канонический `/materials`.
- `content/v3/blog/workload-shape-over-model-name.mdx` — локальная короткая заметка.
- `content/v3/publications/prefix-cache-the-code.mdx`.
- `content/v3/publications/prefix-cache-habr.mdx`.
- `content/v3/publications/effective-cost-habr.mdx`.
- `content/v3/publications/agent-skills-habr.mdx`.
- `content/v3/publications/prompt-engineering-vc.mdx`.
- `lib/author-profile.ts` — единая подтверждённая авторская сущность и публичные ссылки.
- `tests/pages/v31-personal-pages.test.ts`.
- `tests/pages/v31-ai-platform-pages.test.ts`.
- `tests/build/v31-export-contract.test.ts`.
- `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-mobile-navigation-qa.md` после реального browser-check.

### Изменить

- `package.json`, `pnpm-lock.yaml` — self-hosted Onest.
- `app/globals.css`, `app/(en)/layout.tsx` — светлые токены и Onest.
- `lib/content-v3/schema.ts`, `registry.ts`, `source-core.ts`, `view-models.ts` — новая редакционная выдача.
- `lib/site-routes.ts`, `lib/i18n.ts` — `/materials`, русская навигация и полный footer.
- `components/ai-platform/platform-map.tsx` — implementation-derived карта.
- `app/(en)/**/page.tsx` для канонических v3.1 страниц — новые page components без изменения route contract.
- `lib/metadata.ts`, `lib/seo/structured-data.ts`, `lib/seo/rss.ts`, `lib/seo/urls.ts` — единый author `@id`, ProfilePage и корректные discovery surfaces.
- `lib/migration/manifest.ts`, `config/v3-route-manifest.json`, `scripts/apply-static-aliases.mjs` — поддержка `archive` и 102 маршрутов.
- `scripts/check-static-export.mjs` — поддержка archive contract в v3.1 export gate. Текущие `check-shell-landmarks` и `check-v3-reference-path` сохраняются без изменения.
- существующие тесты `tests/content-v3/**`, `tests/pages/**`, `tests/migration/**`, `tests/seo/**` — новые контракты без ослабления fail-closed проверок.
- `.agent/IMPLEMENTATION_PLAN.md`, `.agent/STATUS.md`, `README.md` — нормативная ссылка и реальный статус.

### Удалить после переключения импортов

- `components/pages/ai-platform-pages.tsx`.
- `components/pages/content-detail-page.tsx`.
- `components/pages/reference-detail-page.tsx`.
- `content/v3/blog/short-prompt-not-cheap.mdx` после переноса подтверждённой записи в `content/v3/publications/prefix-cache-habr.mdx`.
- `tests/pages/ai-platform-pages.test.ts` после переноса контрактов в v3.1 suites. `tests/pages/v3-marketing-pages.test.ts` остаётся рядом с legacy-only компонентом, пока тот нужен сборке.

Старые `components/marketing/*`, `components/pages/marketing-pages.tsx` и `components/pages/v3-marketing-pages.tsx`, которые нужны или могут понадобиться route builders до постпроцессинга, остаются legacy-only до отдельного удаления архивной поверхности. Они не импортируются каноническими v3.1 routes и не считаются целевой дизайн-системой.

## Task 1: Расширить контентный контракт без изменения публичных маршрутов

**Files:**

- Modify: `lib/content-v3/schema.ts`
- Modify: `content/v3/blog/ai-platform-before-gpu.mdx`
- Modify: `content/v3/blog/short-prompt-not-cheap.mdx`
- Modify: `tests/content-v3/schema.test.ts`
- Modify: `tests/content-v3/registry.test.ts`

- [ ] **Step 1: Добавить RED-тесты article subtype**

Проверить четыре инварианта:

```ts
expect(() => parseV3Frontmatter(nativeArticle({ editorialFormat: "note" }))).not.toThrow();
expect(() => parseV3Frontmatter(nativeArticle({ editorialFormat: null }))).toThrow(/editorialFormat/);
expect(() => parseV3Frontmatter(externalArticle({ editorialFormat: "article" }))).toThrow(/external/i);
expect(() => parseV3Frontmatter(externalArticle({ externalType: null }))).toThrow(/externalType/);
expect(() => parseV3Frontmatter(externalArticle({ participationLabel: null }))).toThrow(/participationLabel/);
expect(() => parseV3Frontmatter(nativeArticle({ externalType: "authored-article" }))).toThrow(/native/i);
```

Также проверить, что `article + native` требует `editorialFormat: article | note`, а `article + external-note` требует `editorialFormat: null`, `publishedAt`, `sourceName`, `sourceUrl`, `externalType`, `participationLabel`; `sourceAuthorProfileUrl` остаётся nullable.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/content-v3/schema.test.ts tests/content-v3/registry.test.ts`

Expected: FAIL на отсутствующих `editorialFormat`, `externalType`, `sourceAuthorProfileUrl` и `participationLabel`.

- [ ] **Step 3: Расширить `articleSchema`**

Добавить поля:

```ts
editorialFormat: z.enum(["article", "note"]).nullable(),
externalType: z
  .enum(["authored-article", "expert-comment", "interview", "media-mention"])
  .nullable(),
sourceAuthorProfileUrl: httpsUrl.nullable(),
participationLabel: nonEmptyText.nullable(),
```

В `superRefine`:

- для `external-note` требовать `editorialFormat === null` и все внешние поля, кроме `sourceAuthorProfileUrl`;
- для `native` требовать `editorialFormat !== null`, `slug` и `externalType/sourceName/sourceUrl/sourceAuthorProfileUrl/participationLabel === null`;
- не выводить тип участия из названия площадки;
- не менять relation limit и lifecycle правила.

- [ ] **Step 4: Минимально мигрировать существующие article records**

До коммита схемы добавить `editorialFormat: article` и нулевые внешние поля в `ai-platform-before-gpu.mdx`. Для временно существующего `short-prompt-not-cheap.mdx` добавить `editorialFormat: null`, `externalType: authored-article`, `sourceAuthorProfileUrl: https://habr.com/ru/users/Ser_no/` и фактологичный `participationLabel`. Task 2 заменит эту временную запись финальным publication record.

- [ ] **Step 5: Запустить GREEN и полный content suite**

Run: `corepack pnpm vitest run tests/content-v3`

Run: `corepack pnpm typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/content-v3/schema.ts content/v3/blog tests/content-v3/schema.test.ts tests/content-v3/registry.test.ts
git commit -m "feat: extend v3.1 publication contract"
```

## Task 2: Собрать подтверждённый content inventory и авторскую сущность

**Files:**

- Create: `lib/author-profile.ts`
- Create: `content/v3/blog/workload-shape-over-model-name.mdx`
- Create: `content/v3/publications/*.mdx` — пять файлов из файловой карты
- Delete: `content/v3/blog/short-prompt-not-cheap.mdx`
- Modify: `content/v3/blog/ai-platform-before-gpu.mdx`
- Modify: `tests/content-v3/source.test.ts`
- Modify: `tests/content-v3/evidence.test.ts`

- [ ] **Step 1: Проверить внешние источники до изменения frontmatter**

Для каждого URL подтвердить HTTP 200, финальный URL, заголовок, площадку и дату. Не публиковать запись, если хотя бы одно поле не подтверждено.

```text
https://thecode.media/prefix-cache-promt-ai-agenty/
https://habr.com/ru/companies/bitrix/articles/1033822/
https://habr.com/ru/companies/bitrix/articles/1008320/
https://habr.com/ru/companies/bitrix/articles/980654/
https://vc.ru/ai/1952426-promt-inzhiniring-v-2024-godu
```

Отдельно подтвердить source records для About:

```text
https://webinars.bitrix24.by/ai-2024/
https://webinars.bitrix24.by/aishnitsa3-0/
https://habr.com/ru/users/Ser_no/
https://tatarstan2026.mergeconf.ru/speakers/development/aiml/notevskiy
```

Они должны буквально подтверждать переход публичных ролей `продакт-менеджер, AI-евангелист` → `разработчик команды CoPilot` → `AI Platform Lead` и текущий публичный класс ответственности. Результат проверки сохранить в content-review artifact. Не добавлять новое frontmatter-поле, которого нет в утверждённой схеме.

- [ ] **Step 2: Добавить RED-тест content inventory**

Тест должен ожидать:

```ts
const publicArticles = source.listPublic("article", "ru");
const nativeIds = publicArticles.filter((item) => item.type === "article" && item.kind === "native").map((item) => item.entityId);
const externalIds = publicArticles.filter((item) => item.type === "article" && item.kind === "external-note").map((item) => item.entityId);

expect(nativeIds).toEqual(expect.arrayContaining(["ai-platform-before-gpu", "workload-shape-over-model-name"]));
expect(externalIds).toEqual(expect.arrayContaining([
  "prefix-cache-the-code",
  "prefix-cache-habr",
  "effective-cost-habr",
  "agent-skills-habr",
  "prompt-engineering-vc"
]));
expect(externalIds.length).toBeGreaterThanOrEqual(5);
```

Проверить обратную хронологию внешних материалов, точные `externalType`, `participationLabel`, отсутствие local slug и отсутствие внешних записей в `listLocalCanonical("article")`.

- [ ] **Step 3: Запустить RED**

Run: `corepack pnpm vitest run tests/content-v3/source.test.ts tests/content-v3/evidence.test.ts`

Expected: FAIL, потому что есть одна старая external note и нет короткой локальной заметки.

- [ ] **Step 4: Добавить шесть content records**

Внешние записи используют точные данные из visual target:

| entityId | externalType | Площадка | publishedAt |
|---|---|---|---|
| `prefix-cache-the-code` | `authored-article` | Журнал «Код» / Яндекс Практикум | `2026-06-18` |
| `prefix-cache-habr` | `authored-article` | Хабр · блог Битрикс24 | `2026-05-12` |
| `effective-cost-habr` | `authored-article` | Хабр · блог Битрикс24 | `2026-03-10` |
| `agent-skills-habr` | `authored-article` | Хабр · блог Битрикс24 | `2025-12-26` |
| `prompt-engineering-vc` | `expert-comment` | vc.ru · Битрикс24 | `2025-04-28` |

Каждая запись содержит оригинальную аннотацию и буквальную строку вклада из принятого visual brief. Текст источника не копируется.

Заметка `workload-shape-over-model-name` не копирует reference-страницу Inference Plane. Реализовать следующий самостоятельный compact MDX без расширения текста на этапе кода:

```mdx
---
entityId: workload-shape-over-model-name
type: article
locale: ru
kind: native
slug: workload-shape-over-model-name
editorialFormat: note
title: "Workload shape важнее названия модели"
description: "Почему модель и GPU нельзя выбирать по среднему RPS без распределения контекста, ответа, concurrency и cache reuse."
publicationStatus: published
reviewStatus: unreviewed
publishedAt: "2026-07-22"
updatedAt: "2026-07-22"
reviewedAt: null
reviewCycleDays: null
topics:
  - inference
  - workload-shape
  - capacity
relations:
  platformEntityIds:
    - inference-plane
excerpt: "Одинаковая модель ведёт себя по-разному на коротких чатах, длинном prefill и агентных циклах. Решение начинается с профиля запросов, а не с названия модели."
sourceName: null
sourceUrl: null
externalType: null
sourceAuthorProfileUrl: null
participationLabel: null
supersedes: null
supersededBy: null
---

Название модели почти ничего не говорит о том, как будет работать конкретный сервис. Одна и та же модель может уверенно обслуживать поток коротких чатов и упереться в очередь на длинных документах: prefill, decode, длина ответа и повторное использование KV cache нагружают runtime по-разному.

Поэтому среднего RPS недостаточно. До выбора модели, GPU и схемы serving нужны хотя бы распределения входных и выходных токенов, concurrency, характер прихода запросов, latency-класс, возможность batching и фактический cache reuse. Для агента к этому добавляются число шагов и стабильность префикса между ними.

Сравнивать варианты стоит на replay или синтетическом профиле, который сохраняет эту форму нагрузки. Название модели и спецификация ускорителя остаются входными данными, но решение подтверждает только измерение на целевом workload. Подробнее границы этого решения разобраны в [Inference Plane](/ai-platform/areas/inference-plane).
```

- [ ] **Step 5: Создать единую авторскую сущность**

`lib/author-profile.ts` экспортирует frozen object:

```ts
export const AUTHOR_PROFILE = Object.freeze({
  id: "https://notevskii.tech/about/#person",
  name: "Сергей Нотевский",
  role: "AI Platform Lead",
  company: "Битрикс24",
  url: "https://notevskii.tech/about/",
  sameAs: Object.freeze([
    "https://habr.com/ru/users/Ser_no/",
    "https://github.com/sernote",
    "https://t.me/sergeinotevskii"
  ]),
  aboutIntro: "В 2024 году я выступал как продакт-менеджер и AI-евангелист Битрикс24, в 2025-м — как AI-евангелист и разработчик команды CoPilot. Сейчас моя публичная роль — AI Platform Lead. Я отвечаю за направление LLM-моделей: поиск, анализ, адаптацию и тестирование на сценариях Битрикс24."
});
```

Не добавлять публикации, конференции и непроверенные страницы в `sameAs`. `aboutIntro` разрешён только после literal source check из Step 1 и не расширяется годами опыта, внутренними масштабами или переходами, которых нет в этих источниках.

- [ ] **Step 6: Запустить GREEN и контентную проверку**

Run: `corepack pnpm typecheck`

Run: `corepack pnpm vitest run tests/content-v3`

Expected: PASS.

- [ ] **Step 7: Провести ru-text и public-safety review**

Проверить точность заголовков, даты, тире/кавычки, отсутствие внутренних масштабов, топологии, стоимости, vendor contracts и самооценки. Отдельный reviewer должен подтвердить все шесть новых MDX records.

- [ ] **Step 8: Commit**

```bash
git add content/v3 lib/author-profile.ts tests/content-v3
git commit -m "content: add v3.1 public inventory"
```

## Task 3: Пересобрать view models под три продукта

**Files:**

- Modify: `lib/content-v3/view-models.ts`
- Create: `tests/pages/v31-personal-pages.test.ts`

- [ ] **Step 1: Написать RED-тесты новой выдачи**

Зафиксировать:

- Home entrances: `/blog`, `/materials`, `/ai-platform`;
- «Сейчас»: ведущая статья, компактное выступление, компактный проект;
- Blog: все public native records; обязательный pilot subset содержит статью и заметку, `article` идёт раньше `note` при одинаковой дате;
- Materials: три группы; обязательный pilot subset содержит 1 talk, 1 project и пять проверенных external publications, а выдача не теряет последующие записи;
- About: 5 выбранных evidence items, каждый разрешается в публичную сущность;
- external publications отсортированы по `publishedAt` и не получают local href.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts`

Expected: FAIL на отсутствующих `MaterialsViewModel`, `AboutViewModel` и маршруте `/materials`.

- [ ] **Step 3: Ввести точные view-model types**

Добавить:

```ts
export type ExternalPublicationViewModel = Readonly<{
  entityId: string;
  externalTypeLabel: "Авторская статья" | "Экспертный комментарий" | "Интервью" | "Упоминание";
  sourceName: string;
  publishedLabel: string;
  title: string;
  excerpt: string;
  participationLabel: string;
  href: string;
}>;

export type TalkSummaryViewModel = Readonly<{
  entityId: string;
  title: string;
  venue: string;
  eventDateLabel: string;
  formatLabel: string;
  description: string;
  recordingLabel: string | null;
  thumbnail: { path: string; alt: string } | null;
  href: string;
}>;

export type ProjectSummaryViewModel = Readonly<{
  entityId: string;
  title: string;
  typeLabel: string;
  releaseLabel: string | null;
  description: string;
  evidenceBoundary: string;
  href: string;
  repositoryUrl: string;
}>;

export type MaterialsViewModel = Readonly<{
  talks: readonly TalkSummaryViewModel[];
  projects: readonly ProjectSummaryViewModel[];
  publications: readonly ExternalPublicationViewModel[];
}>;

export type AboutViewModel = Readonly<{
  evidence: readonly V3ListItemViewModel[];
}>;
```

Переименовать `work` surface в `materials`; не оставлять `/work` в публичных view models.

- [ ] **Step 4: Реализовать fail-closed selectors**

`getHomeViewModel`, `getMaterialsViewModel` и `getAboutViewModel` получают только `V3Source`, не читают ручные дублирующие каталоги и бросают ошибку, если обязательная сущность draft/stale, имеет неверный тип или отсутствует.

- [ ] **Step 5: Запустить GREEN и полный test suite**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts tests/content-v3`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/content-v3/view-models.ts tests/pages
git commit -m "refactor: model v3.1 editorial surfaces"
```

## Task 4: Заменить глобальный shell и визуальные токены

**Files:**

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `app/(en)/layout.tsx`
- Modify: `app/globals.css`
- Modify: `lib/site-routes.ts`
- Modify: `lib/i18n.ts`
- Create: `components/site/editorial-shell.tsx`
- Create: `components/site/mobile-navigation.tsx`
- Create: `components/editorial/section-heading.tsx`
- Create: `components/editorial/editorial-link.tsx`
- Create: `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-mobile-navigation-qa.md` после реального browser-check
- Modify: `tests/seo/site-routes.test.ts`

- [ ] **Step 1: Установить self-hosted Onest**

Run: `corepack pnpm add @fontsource-variable/onest@5.3.0`

Expected: `package.json` и lockfile фиксируют 5.3.0; build не зависит от Google Fonts.

В `app/(en)/layout.tsx` импортировать `@fontsource-variable/onest` и убрать принудительные `dark` class/theme. Fumadocs provider не должен возвращать публичный контур в dark mode.

- [ ] **Step 2: Написать RED-контракты shell**

Проверить server render:

```ts
expect(RU_PRIMARY_NAV).toEqual([
  { label: "Блог", href: "/blog" },
  { label: "Материалы", href: "/materials" },
  { label: "AI Platform", href: "/ai-platform" },
  { label: "Обо мне", href: "/about" }
]);
expect(html).toContain("Telegram");
expect(html).toContain("Хабр");
expect(html).toContain("GitHub");
expect(html).toContain("© 2026 Сергей Нотевский");
expect(html).not.toContain(">SN<");
```

Проверить один `main#main-content`, skip link, active route и отсутствие language switch в новом shell.

- [ ] **Step 3: Запустить RED**

Run: `corepack pnpm vitest run tests/seo/site-routes.test.ts tests/pages/v31-personal-pages.test.ts`

Expected: FAIL на старом `/work`, dark shell и старом `SN` badge.

- [ ] **Step 4: Задать светлые токены**

В `app/globals.css` зафиксировать:

```css
:root {
  color-scheme: light;
  --background: #ffffff;
  --surface-subtle: #fafbfc;
  --foreground: #101214;
  --muted-foreground: #5b6166;
  --primary: #2f5c9e;
  --border: rgba(16, 18, 20, 0.12);
  --ring: #2f5c9e;
  --font-sans: "Onest Variable", "Onest", ui-sans-serif, system-ui, sans-serif;
}
```

Убрать `color-scheme: dark`, cyan/grid/radial background, global pills и старые manual-surface эффекты с публичного контура. Оставить focus-visible и reduced-motion.

- [ ] **Step 5: Реализовать editorial shell**

Header:

- имя слева;
- `Блог`, `Материалы`, `AI Platform`, `Обо мне`, `Написать` справа;
- активный маршрут — цвет или нижняя линия;
- 40 px targets desktop/tablet.

Footer:

- Telegram, Хабр, GitHub;
- `© 2026 Сергей Нотевский`;
- без дополнительного self-promo текста.

Mobile navigation:

- `Меню` и явная `Закрыть`;
- 44 × 44 px targets;
- порядок глобальной навигации;
- active route;
- close on navigation и `Escape`;
- focus return;
- scroll lock;
- `aria-modal`, title и description.

- [ ] **Step 6: Запустить GREEN**

Run: `corepack pnpm vitest run tests/seo/site-routes.test.ts tests/pages/v31-personal-pages.test.ts`

Run: `corepack pnpm lint`

Expected: PASS.

- [ ] **Step 7: Провести обязательный browser-check мобильного меню**

На 390 px проверить одну полную последовательность на локальном Next dev server:

1. открыть меню и подтвердить initial focus на `Закрыть`;
2. пройти `Tab` и `Shift+Tab` по всему диалогу без выхода фокуса за его границы;
3. подтвердить active route на текущей странице;
4. закрыть явной кнопкой и проверить возврат фокуса на `Меню`;
5. открыть снова, перейти в другой раздел и подтвердить закрытие после navigation;
6. открыть на новом маршруте, закрыть по `Escape` и подтвердить возврат фокуса;
7. во всех открытых состояниях подтвердить body scroll lock, а после закрытия — его снятие;
8. подтвердить зоны нажатия не меньше 44 × 44 px и пустую browser console.

Сохранить dev-server state, фактические результаты и исправления в `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-mobile-navigation-qa.md`. В Task 14 повторить тот же контракт на готовом static export и дописать второй результат в этот же QA-артефакт.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml app components/site components/editorial lib/i18n.ts lib/site-routes.ts tests docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-mobile-navigation-qa.md
git commit -m "feat: add v3.1 editorial shell"
```

## Task 5: Реализовать Home по принятому target

**Files:**

- Create: `components/pages/v31-personal-pages.tsx`
- Modify: `app/(en)/page.tsx`
- Modify: `tests/pages/v31-personal-pages.test.ts`

- [ ] **Step 1: Добавить RED-тест Home**

Тест должен подтвердить:

- имя и `AI Platform Lead в Битрикс24`;
- ровно три product entrances;
- отсутствие объясняющего hero paragraph и hero media;
- «Сейчас» с одним ведущим `ai-platform-before-gpu` и двумя компактными `maas-vs-self-hosted-roii`, `audit-prompt-caching`;
- отсутствие `professionalContext`, отдельного contact module и нескольких CTA.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts -t "Home"`

Expected: FAIL на старом marketing page.

- [ ] **Step 3: Реализовать Home**

Композиция строго по `01-home-desktop-1440-top.jpg`, `02-home-tablet-768-top.jpg`, `03-home-mobile-390-top.jpg`:

1. имя и роль;
2. три равноправных прямоугольных входа;
3. section header «Сейчас» / «Все материалы»;
4. ведущая статья слева, два компактных ряда справа на desktop;
5. линейный поток на 390 px;
6. сразу footer.

Не добавлять текст или модуль, которых нет в контракте.

- [ ] **Step 4: Запустить GREEN**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts -t "Home"`

Expected: PASS.

- [ ] **Step 5: Visual QA Home**

Сравнить reference и render side by side в одинаковых 1 440 × 900, 768 × 900 и 390 × 800. Исправить typography, spacing, dividers, line length и reflow до отсутствия P0/P1. Не менять принятый стиль.

- [ ] **Step 6: Commit**

```bash
git add 'app/(en)/page.tsx' components/pages/v31-personal-pages.tsx tests/pages/v31-personal-pages.test.ts
git commit -m "feat: rebuild v3.1 home"
```

## Task 6: Реализовать Blog и два локальных формата

**Files:**

- Modify: `app/(en)/blog/page.tsx`
- Modify: `app/(en)/blog/[slug]/page.tsx`
- Create: `components/pages/v31-content-detail-page.tsx`
- Modify: `components/pages/v31-personal-pages.tsx`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/build/v31-export-contract.test.ts`

- [ ] **Step 1: Добавить RED-тест Blog**

Проверить, что Blog динамически выводит все public native records, включает обязательные `ai-platform-before-gpu` и `workload-shape-over-model-name`, не выводит ни одной external publication, различает `article`/`note`, показывает темы обычным текстом, точные действия «Читать статью»/«Читать заметку» и оба pilot href.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts -t "Blog"`

Expected: FAIL, потому что текущий Blog включает external note.

- [ ] **Step 3: Реализовать Blog index**

Следовать `04-blog-desktop-1440-top.jpg` и `05-blog-mobile-390-top.jpg`:

- page intro без overline;
- большая статья с увеличенным вертикальным ритмом;
- короткая заметка как более плотный ruled row;
- без filters, pills, карточной сетки и авторского promo.

- [ ] **Step 4: Пересобрать detail shell**

Один `ArticlePage` принимает `editorialFormat` и показывает:

- заголовок, лид, published/updated;
- MDX body в читаемой колонке;
- до трёх related items;
- спокойную подпись автора с переходом на `/about`;
- один контактный переход;
- canonical metadata из record.

Заметка использует тот же shell, но более компактный intro; отдельный новый template не создаётся.

- [ ] **Step 5: Запустить GREEN без полного export**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts tests/build/v31-export-contract.test.ts`

Run: `corepack pnpm typecheck`

Expected: оба local URL входят в route generation contract; внешние publications не получают `/blog/*` URL. Первый полный build выполняется в Task 11 после синхронизации manifest, поэтому новый route не ломает промежуточный milestone.

- [ ] **Step 6: Visual/content/accessibility gate**

Проверить Blog index на 1 440/390 и обе детали на 1 440/390. Gate: нет P0/P1, один `h1`, один `main`, line length удобна, source links и focus видимы.

- [ ] **Step 7: Commit**

```bash
git add 'app/(en)/blog' components/pages tests/pages tests/build
git commit -m "feat: separate v3.1 blog formats"
```

## Task 7: Реализовать Materials как единый публичный архив

**Files:**

- Create: `app/(en)/materials/page.tsx`
- Modify: `components/pages/v31-personal-pages.tsx`
- Modify: `lib/metadata.ts`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/seo/site-routes.test.ts`

- [ ] **Step 1: Добавить RED-тест Materials**

Проверить:

- три группы в порядке `talks → projects → publications`;
- обязательный talk-эталон с реальным 16:9 image, без ограничения будущей выдачи одним элементом;
- обязательный project-эталон с явной runtime-evidence boundary, без ограничения будущей выдачи одним элементом;
- не меньше пяти внешних publications, включая утверждённый pilot subset, в обратной хронологии;
- у каждой publication видны type/source/date/title/excerpt/contribution/external action;
- нет `/talks`, `/projects` index links, filters, metrics и logo wall;
- contact block содержит только Telegram action и контекст; Habr/GitHub остаются в footer.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts -t "Materials"`

Expected: FAIL на отсутствующем `/materials` и старом `/work` layout.

- [ ] **Step 3: Реализовать три разных редакционных ритма**

Использовать:

- `06-materials-desktop-1440-top.jpg`;
- `07-materials-tablet-768-top.jpg`;
- `08-materials-mobile-390-top.jpg`;
- дополнительные screenshots `06-materials-*`, `07-materials-*`, `08-materials-*` из evidence.

Talk — media + text; project — широкий ruled row; publication — bibliographic row. Не унифицировать их в одну карточку.

- [ ] **Step 4: Добавить канонические metadata**

`v3MarketingMetadata("materials")` возвращает canonical `https://notevskii.tech/materials/`, title `Материалы — Сергей Нотевский` и не публикует hreflang на архивные английские страницы.

- [ ] **Step 5: Запустить GREEN и QA**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts tests/seo/site-routes.test.ts`

Проверить 1 440/768/390: reading order, 44 px mobile actions, image 16:9, отсутствие overflow и соседнего дублирования соцссылок.

- [ ] **Step 6: Commit**

```bash
git add 'app/(en)/materials/page.tsx' components/pages/v31-personal-pages.tsx lib/metadata.ts tests
git commit -m "feat: add canonical materials archive"
```

## Task 8: Пересобрать Talk, Project и About

**Files:**

- Modify: `app/(en)/talks/[slug]/page.tsx`
- Modify: `app/(en)/projects/[slug]/page.tsx`
- Modify: `app/(en)/about/page.tsx`
- Modify: `components/pages/v31-content-detail-page.tsx`
- Modify: `components/pages/v31-personal-pages.tsx`
- Modify: `tests/pages/v31-personal-pages.test.ts`
- Modify: `tests/seo/structured-data.test.ts`

- [ ] **Step 1: Добавить RED-тесты трёх страниц**

Talk: venue/event date/format/recording, 3–7 takeaways, только проверенные timestamps/slides, связанные сущности и приглашение выступить.

Project: purpose/audience/workflow/quick start/input-output/evidence boundary/privacy/support/version/GitHub/relations; отсутствие score и web-auditor.

About: роль, личный первый абзац, два focus blocks, пять evidence links, редакционные принципы, speaker bio, одно контактное действие и переход «Все материалы».

- [ ] **Step 2: Зафиксировать первый абзац About**

Взять source-backed `AUTHOR_PROFILE.aboutIntro`, подтверждённый в Task 2:

> В 2024 году я выступал как продакт-менеджер и AI-евангелист Битрикс24, в 2025-м — как AI-евангелист и разработчик команды CoPilot. Сейчас моя публичная роль — AI Platform Lead. Я отвечаю за направление LLM-моделей: поиск, анализ, адаптацию и тестирование на сценариях Битрикс24.

Не добавлять годы опыта, масштабы, размер команды, награды или другие карьерные переходы без отдельного source record.

- [ ] **Step 3: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts tests/seo/structured-data.test.ts`

Expected: FAIL на старых detail shells и About copy.

- [ ] **Step 4: Реализовать страницы**

Talk и Project получают разные intro/body structures, но общий editorial shell. About следует `12-about-desktop-1440-top.jpg`, `13-about-mobile-390-top.jpg` и длинным screenshots evidence. В контактном блоке один Telegram action; Habr/GitHub не повторяются рядом с footer.

- [ ] **Step 5: Запустить GREEN и gate**

Run: `corepack pnpm vitest run tests/pages/v31-personal-pages.test.ts tests/seo/structured-data.test.ts`

Проверить Talk, Project, About на 1 440/390. Gate каждого повторяемого типа: visual/content/accessibility review без P0/P1.

- [ ] **Step 6: Commit**

```bash
git add 'app/(en)/talks/[slug]/page.tsx' 'app/(en)/projects/[slug]/page.tsx' 'app/(en)/about/page.tsx' components/pages tests
git commit -m "feat: rebuild public detail and about pages"
```

## Task 9: Реализовать AI Platform landing

**Files:**

- Create: `components/pages/v31-ai-platform-pages.tsx`
- Modify: `app/(en)/ai-platform/page.tsx`
- Create: `tests/pages/v31-ai-platform-pages.test.ts`

- [ ] **Step 1: Добавить RED-тест landing**

Проверить definition, six signals, five maturity steps, три execution modes без winner, четыре situational entries, семь областей, вертикальный срез из четырёх узлов, ссылку на карту и вводную статью.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-ai-platform-pages.test.ts -t "landing"`

Expected: FAIL на старой reference-first странице.

- [ ] **Step 3: Реализовать landing по target**

Использовать `09-ai-platform-desktop-1440-top.jpg`, `10-ai-platform-tablet-768-top.jpg`, `11-ai-platform-mobile-390-top.jpg` и длинные screenshots evidence. Плотность выше личного контура, но те же Onest, белый фон, cobalt и rectangular geometry.

Статусы областей — обычный текст. Никаких cards, dashboard, handbook hero, graph или универсального победителя MaaS/self-hosted/hybrid.

- [ ] **Step 4: Запустить GREEN и visual QA**

Run: `corepack pnpm vitest run tests/pages/v31-ai-platform-pages.test.ts -t "landing"`

Сравнить на 1 440/768/390; исправить только fidelity и reflow, не искать новый стиль.

- [ ] **Step 5: Commit**

```bash
git add 'app/(en)/ai-platform/page.tsx' components/pages/v31-ai-platform-pages.tsx tests/pages/v31-ai-platform-pages.test.ts
git commit -m "feat: rebuild ai platform entry"
```

## Task 10: Вывести карту и reference-эталоны из принятой системы

**Files:**

- Modify: `components/ai-platform/platform-map.tsx`
- Modify: `components/pages/v31-ai-platform-pages.tsx`
- Modify: `app/(en)/ai-platform/map/page.tsx`
- Modify: `app/(en)/ai-platform/areas/[area]/page.tsx`
- Modify: `app/(en)/ai-platform/components/[component]/page.tsx`
- Modify: `app/(en)/ai-platform/cases/[case]/page.tsx`
- Modify: `tests/pages/v31-ai-platform-pages.test.ts`
- Modify: `tests/pages/reference-path-script.test.ts`

- [ ] **Step 1: Добавить RED-тест карты**

Проверить один ordered capability map, семь областей, одну кликабельную reviewed area, шесть некликабельных planned rows, назначение/ключевой вопрос/компоненты/status и явную подпись `capability map`.

- [ ] **Step 2: Добавить RED-тест reference shell**

Area, Component и Case должны иметь разные обязательные sections из спеки, общий authorship/review/sources/applicability/limitations слой и не больше четырёх связанных сущностей. Synthetic disclosure появляется до case title.

- [ ] **Step 3: Запустить RED**

Run: `corepack pnpm vitest run tests/pages/v31-ai-platform-pages.test.ts tests/pages/reference-path-script.test.ts`

Expected: FAIL на старой geometry и неполных контрактах карты.

- [ ] **Step 4: Реализовать карту**

Карта — уникальный implementation-derived эталон, а не новый визуальный стиль. Использовать ruled rows, одно направление чтения и линейный mobile reflow. Проверить 1 440/768/390.

- [ ] **Step 5: Реализовать три reference types**

Сохранить существующие reviewed MDX bodies и relation graph. Заменить только shell, typography, navigation и presentation metadata. Не переписывать экспертное содержание ради нового визуала.

- [ ] **Step 6: Запустить GREEN и обязательный exemplar gate**

Run: `corepack pnpm vitest run tests/pages/v31-ai-platform-pages.test.ts tests/pages/reference-path-script.test.ts`

Run: `corepack pnpm typecheck`

Run: `corepack pnpm build:raw`

Run: `corepack pnpm verify:reference`

Проверить карту 1 440/768/390, Area/Component/Case 1 440/390 и Prefix Cache дополнительно 768 на локальном render. Нужны отдельные visual/content/accessibility reviews без P0/P1. До этого не добавлять вторую area/component/case. `build:raw` создаёт актуальный export только для reference gate; postprocessor и полный `pnpm build` впервые выполняются в Task 11 после синхронизации route manifest.

- [ ] **Step 7: Commit**

```bash
git add 'app/(en)/ai-platform' components/ai-platform components/pages/v31-ai-platform-pages.tsx tests/pages
git commit -m "feat: derive v3.1 ai platform reference"
```

## Task 11: Применить route decisions и нейтральный archive shell

**Files:**

- Modify: `lib/migration/manifest.ts`
- Modify: `config/v3-route-manifest.json`
- Modify: `scripts/apply-static-aliases.mjs`
- Modify: `scripts/check-static-export.mjs`
- Modify: `app/(en)/work/page.tsx`
- Modify: `app/(en)/talks/page.tsx`
- Modify: `app/(en)/projects/page.tsx`
- Modify: `app/(en)/contact/page.tsx`
- Modify: `tests/migration/manifest.test.ts`
- Modify: `tests/migration/static-aliases.test.ts`
- Modify: `tests/build/static-export-contract.test.ts`
- Create: `tests/build/v31-export-contract.test.ts`

- [ ] **Step 1: Добавить RED-тесты `archive` behavior**

Проверить:

- `archive` требует `destination: null`;
- `/materials` и `/blog/workload-shape-over-model-name` — единственные новые `keep`;
- `/work`, `/talks`, `/projects` → `/materials`;
- `/contact` → `/about`;
- каждый alias указывает прямо на `keep`;
- archive требует `archivedAt: 2026-08-02` и `archiveTarget`, который указывает прямо на `keep`;
- итоговый archive имеет self-canonical, `noindex,follow`, заметный статус, дату архивации и ровно одну актуальную ссылку;
- итоговый archive не содержит `/_next/static/*.js`, `self.__next_f`, интерактивных legacy controls или alias semantics;
- source set — 102 неслужебных export routes: 100 текущих и два новых canonical routes.

- [ ] **Step 2: Запустить RED**

Run: `corepack pnpm vitest run tests/migration tests/build/v31-export-contract.test.ts`

Expected: FAIL, потому что script отклоняет `archive` и manifest ещё описывает v3.

- [ ] **Step 3: Обновить typed manifest**

В типах разделить `RouteKeep`, `RouteAlias` и `RouteArchive`. У archive обязательны поля:

```ts
interface RouteArchive extends RouteRecord {
  readonly behavior: "archive";
  readonly destination: null;
  readonly archivedAt: string;
  readonly archiveTarget: string;
}
```

Остальные behavior не принимают `archivedAt/archiveTarget`. В `validateManifest` разделить правила:

```ts
if (record.behavior === "keep" || record.behavior === "archive") {
  if (record.destination !== null) throw new Error("keep/archive destination must be null");
}
if (record.behavior === "static-alias") {
  // distinct direct keep destination only
}
```

`resolveCanonicalDestination` разрешает только keep/alias; попытка использовать archive как relation target бросает ошибку. `archiveTarget` нормализуется, обязан отличаться от source и указывать на прямой `keep`.

- [ ] **Step 4: Расширить postprocessor**

Сохранить atomic preflight/rollback. Для alias оставить target canonical. Для archive не мутировать hydration tree, а собрать самостоятельный non-hydrated HTML document:

- прочитать исходный HTML до записи;
- извлечь title, description и содержимое исходного `main`, удалить scripts, RSC payload, forms, buttons, client controls, старые header/footer/sidebar/CTA/featured/related blocks;
- создать новый минимальный `<!doctype html>` с `lang`, self canonical, robots `noindex, follow`, `data-archive="true"`, встроенным neutral archive CSS и без Next scripts;
- перед очищенным линейным содержимым показать статус «Архив» и `archivedAt`;
- добавить ровно одну ссылку на явный `archiveTarget`;
- не добавлять meta refresh.

До удаления старого v3 page bundle перевести `/work`, `/talks`, `/projects` и `/contact` на `StaticAliasBody` в новом `EditorialShell`. Эти route builders нужны Next export, но после postprocess их итоговый HTML заменяется единым self-contained alias shell.

- [ ] **Step 5: Синхронизировать 102 route decisions**

Перенести решения буквально из `2026-07-27-notevskii-tech-v3-1-route-decisions.md`. Все 54 archive records явно получают `archivedAt: "2026-08-02"` и `archiveTarget` по правилам спеки; runtime fallback запрещён. Автоматический test сравнивает source set, behavior, destination и archive fields с решениями спецификации; ручное расхождение не допускается.

Обновить `scripts/check-static-export.mjs`: checker принимает `archive` как отдельный behavior, проверяет его self-canonical, `noindex,follow`, archive marker/target, отсутствие alias semantics и отсутствие Next hydration assets. `archive` не добавляется в `keepSources` или `aliasBySource`.

- [ ] **Step 6: Запустить GREEN и изолированный export test**

Run: `corepack pnpm vitest run tests/migration tests/build/v31-export-contract.test.ts`

Run: `corepack pnpm build`

Run: `corepack pnpm verify:export`

Expected: все aliases/archives materialized; keep bytes не меняются; archive output self-contained и non-hydrated; rollback fault test и static export checker проходят.

- [ ] **Step 7: Commit**

```bash
git add lib/migration config scripts app/'(en)'/work app/'(en)'/talks/page.tsx app/'(en)'/projects/page.tsx app/'(en)'/contact tests/migration tests/build
git commit -m "feat: apply v3.1 route decisions"
```

## Task 12: Свести metadata, author entity и discovery surfaces

**Files:**

- Modify: `lib/metadata.ts`
- Modify: `lib/seo/structured-data.ts`
- Modify: `lib/seo/rss.ts`
- Modify: `lib/seo/urls.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: `app/rss.xml/route.ts`
- Modify: `tests/seo/structured-data.test.ts`
- Modify: `tests/seo/rss.test.ts`
- Modify: `tests/build/v31-export-contract.test.ts`

- [ ] **Step 1: Перепроверить актуальные первичные требования**

Перед кодом сверить текущие официальные Google `ProfilePage`, Article structured data, `Google-Extended`, people-first content и официальные OpenAI publisher instructions. Не переносить требования из вторичных SEO-чеклистов.

- [ ] **Step 2: Добавить RED-тест единого author `@id`**

Ожидать:

```ts
const authorId = "https://notevskii.tech/about/#person";
expect(profilePage.mainEntity["@id"]).toBe(authorId);
expect(blogPosting.author["@id"]).toBe(authorId);
expect(video.author["@id"]).toBe(authorId);
expect(software.author["@id"]).toBe(authorId);
expect(techArticle.author["@id"]).toBe(authorId);
```

`sameAs` содержит точный Habr profile `https://habr.com/ru/users/Ser_no/`, GitHub profile и Telegram; publication URLs и Habr `/articles/` запрещены. Существующее валидное поле `SoftwareSourceCode.author` сохраняется; миграция на `creator` не нужна.

- [ ] **Step 3: Добавить RED-тест discovery**

Проверить:

- sitemap — ровно 13 canonical `keep` routes из обновлённого manifest;
- external publications не получают local URL;
- RSS детерминированно содержит все public article records из registry: native используют локальный canonical как `link`/`guid`, external-note используют `sourceUrl` как `link`/`guid`; при текущем pilot это семь items;
- robots разрешает public content обычным crawlers и `OAI-SearchBot`;
- archives и aliases исключены;
- metadata `/materials` canonical-only.

- [ ] **Step 4: Реализовать ProfilePage и ссылки автора**

`/about` публикует `ProfilePage` с `mainEntity: Person`. Home может публиковать `WebSite`, но не создаёт второй Person id. Breadcrumbs Talk/Project ведут через `/materials`, а не через alias indexes.

`lib/seo/urls.ts` перестаёт хранить старый ручной набор `/work`, `/talks`, `/projects`, `/contact`: canonical sitemap routes выводятся из validated manifest и фильтруются по `behavior === "keep"`. Ожидаемый pilot set — 13 routes. RSS называется как лента материалов Сергея Нотевского, а не как лента только локального блога.

- [ ] **Step 5: Запустить GREEN**

Run: `corepack pnpm vitest run tests/seo tests/build/v31-export-contract.test.ts`

Run: `corepack pnpm typecheck`

Run: `corepack pnpm build`

Run: `corepack pnpm verify:export`

Expected: typecheck, metadata tests, фактические sitemap/RSS/robots/JSON-LD и полный export gate проходят на одном актуальном `out`.

- [ ] **Step 6: Commit**

```bash
git add lib/metadata.ts lib/seo app/sitemap.ts app/robots.ts app/rss.xml tests/seo tests/build
git commit -m "feat: align v3.1 author and discovery metadata"
```

## Task 13: Удалить старый UI-контур и обновить документацию

**Files:**

- Delete: только три недостижимых page components из файловой карты после `rg`-проверки
- Modify: `.agent/IMPLEMENTATION_PLAN.md`
- Modify: `.agent/STATUS.md`
- Modify: `README.md`
- Modify: `public/og-image.svg` только если текущий asset не соответствует светлому editorial contour после render review

- [ ] **Step 1: Найти оставшиеся импорты старого UI**

Run:

```bash
rg -n "v3-marketing-pages|ai-platform-pages|content-detail-page|reference-detail-page" app components tests lib
```

Expected: канонические v3.1 routes больше не импортируют старые components. Импорты из legacy/archive route builders документируются и не считаются основанием для удаления их зависимостей.

- [ ] **Step 2: Удалить недостижимые компоненты**

Удалить только `components/pages/ai-platform-pages.tsx`, `components/pages/content-detail-page.tsx` и `components/pages/reference-detail-page.tsx` после отдельного `rg`, который подтверждает ноль импортов каждого файла. `components/pages/v3-marketing-pages.tsx` и `components/marketing/site-shell.tsx` в v3.1 не удалять: они остаются compile-time зависимостями legacy/archive route builders до отдельной миграции. Не удалять reusable MDX, relation, schema, SEO или migration code только из-за старого имени.

- [ ] **Step 3: Обновить документацию**

`.agent/IMPLEMENTATION_PLAN.md` ссылается на этот plan как current. README описывает `/materials`, native Blog, AI Platform vertical, archive behavior и `corepack pnpm verify`. `.agent/STATUS.md` перечисляет выполненные milestones, точные проверки и нерешённые launch blockers.

- [ ] **Step 4: Проверить OG asset**

Отрендерить `public/og-image.svg`. Если он сохраняет cyan/dark handbook language, заменить содержание на светлый author-first asset: имя, роль, три продукта, без градиентов и схем. Если текущий asset уже соответствует, не менять его.

- [ ] **Step 5: Commit**

```bash
git add -A components app tests .agent README.md public/og-image.svg
git commit -m "refactor: retire the v3 interface"
```

## Task 14: Полная проверка, независимые ревью и production smoke

**Files:**

- Modify: `.agent/STATUS.md`
- Create: `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-implementation-review.md`
- Create: `docs/superpowers/reviews/2026-08-02-notevskii-tech-v3-1-reader-gate.md` после реального reader test

- [ ] **Step 1: Запустить полный repository gate**

Run: `corepack pnpm verify`

Expected:

- lint PASS;
- typecheck PASS;
- все tests PASS;
- static build PASS;
- reference path audit PASS;
- export audit PASS;
- 102 route decisions, aliases и archives согласованы.

- [ ] **Step 2: Проверить exported HTML**

Для `/`, `/blog`, двух local blog details, `/materials`, talk, project, `/ai-platform`, map, area, component, case и `/about` подтвердить:

- HTTP/file exists;
- ровно один `main`, `h1`, canonical;
- нет broken links/fragment targets;
- нет archive/alias URL в sitemap;
- structured data ссылается на единый author id;
- на 390 px нет page-level overflow.

- [ ] **Step 3: Выполнить responsive и interaction QA**

Viewports:

- Home: 1 440/768/390;
- Blog: 1 440/390;
- Materials: 1 440/768/390;
- AI Platform: 1 440/768/390;
- About: 1 440/390;
- Map: 1 440/768/390;
- каждый detail/reference exemplar: 1 440/390;
- Prefix Cache: дополнительно 768.

Проверить keyboard navigation, visible focus, skip link, полный interaction contract mobile menu из Task 4 (initial focus, focus containment, active route, явное закрытие, close after navigation, `Escape`, focus return и scroll lock), 200% zoom, reduced motion, external link cues и 44 px mobile targets.

- [ ] **Step 4: Сравнить реализацию с visual target**

Side-by-side reference + implementation comparison выполнить только для пяти поверхностей, у которых есть принятые screenshots пятого пакета: Home, Blog, Materials, AI Platform landing и About на перечисленных для них viewport. Screenshot сам по себе не считается QA. Исправлять visible mismatch до отсутствия P0/P1; допустимые P2/P3 записать с решением.

Map и detail/reference exemplars не имеют принятого screenshot target. Их проверять против токенов, editorial shell, reading-width/spacing contracts и смысловых ограничений спеки; каждый derived-эталон проходит собственный visual/content/accessibility gate без P0/P1 до расширения типа.

- [ ] **Step 5: Провести четыре независимых ревью**

1. spec/product/content;
2. visual/accessibility;
3. AI Platform subject matter/public safety;
4. code/SEO/static export.

Каждый reviewer проверяет актуальный HEAD. Исправлять до отсутствия P0/P1 и повторять точечный review после каждого изменения.

- [ ] **Step 6: Повторить production smoke**

Предусловие уже выполнено частично: Pages resource `sernote/blog` отключён, repository сохранён. После истечения edge cache проверить с внешней сети:

```text
/
/blog/
/blog/ai-platform-before-gpu/
/materials/
/ai-platform/
/talks/maas-vs-self-hosted/
/projects/audit-prompt-caching/
```

Ожидать основной сайт, верный title/control fragment и HTTP 200. Если deployment v3.1 ещё не выпущен, smoke выполняется на preview artifact, а production release остаётся отдельным явным действием.

- [ ] **Step 7: Провести reader gate**

Шесть участников и четыре задания берутся буквально из раздела 14.4 спеки. Не моделировать результаты. Сохранить профиль без персональных данных, pass/fail, проблемы, исправления и повторную проверку.

- [ ] **Step 8: Финальная проверка после всех исправлений**

Run: `corepack pnpm verify`

Run: `git diff --check`

Expected: PASS, рабочее дерево содержит только намеренные изменения, critical issue не скрыт.

- [ ] **Step 9: Commit review artifact**

```bash
git add .agent/STATUS.md docs/superpowers/reviews
git commit -m "docs: converge v3.1 implementation review"
```

## Gate расширения после пилота

Новая статья, выступление, проект, area, component или case добавляется только после того, как соответствующий эталон:

1. опубликован и не имеет P0/P1;
2. прошёл visual/content/accessibility gate;
3. проверен в реальном reader scenario;
4. не требует нового каталога, фильтра или навигационного уровня;
5. укладывается в 4–6 часов авторской поддержки в неделю.

Следующие существенные материалы после пилота:

1. ноябрь 2026 — «MaaS, self-hosted или гибридная схема: как принять решение»;
2. декабрь 2026 — «Control Plane AI-платформы: где заканчивается gateway».
