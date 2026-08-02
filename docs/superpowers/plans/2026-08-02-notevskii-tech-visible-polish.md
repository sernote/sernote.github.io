# notevskii.tech Visible Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Исправить desktop-навигацию и провести короткий визуальный проход по Home, About, AI Platform и карте без изменения архитектуры сайта.

**Architecture:** Сохраняем текущие компоненты и view models. Меняем только разметку и utility-классы, а конфликт отображения навигации закрываем отдельным CSS-классом, объявленным после импортов Fumadocs.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, static export.

---

### Task 1: Desktop navigation

**Files:**
- Modify: `tests/pages/v31-editorial-shell.test.ts`
- Modify: `components/site/editorial-shell.tsx`
- Modify: `app/globals.css`

- [ ] Добавить тест, который требует `editorial-desktop-nav` и запрещает конфликтующую пару `hidden ... md:flex`.
- [ ] Запустить `pnpm vitest run tests/pages/v31-editorial-shell.test.ts` и получить ожидаемый FAIL.
- [ ] Заменить utility-переключение на `editorial-desktop-nav`; задать `display: none` и `display: flex` внутри `@media (min-width: 768px)`.
- [ ] Повторить тест и получить PASS.

### Task 2: Home и About

**Files:**
- Modify: `tests/pages/v31-personal-page-rendering.test.ts`
- Modify: `components/pages/v31-personal-pages.tsx`

- [ ] Добавить проверки нового лида главной, нового лида About и отдельного блока «Путь».
- [ ] Запустить целевой тест и получить ожидаемый FAIL.
- [ ] Укрупнить и разрядить hero главной, добавить один короткий абзац; убрать вертикальные рамки у трёх входов.
- [ ] На About вынести текущую ответственность в лид, а проверяемую хронологию — в отдельный блок «Путь».
- [ ] Повторить целевой тест и получить PASS.

### Task 3: AI Platform и карта

**Files:**
- Modify: `tests/pages/v31-ai-platform-pages.test.ts`
- Modify: `components/pages/v31-ai-platform-pages.tsx`
- Modify: `components/ai-platform/platform-map.tsx`

- [ ] Добавить структурные проверки спокойного hero и двухколоночной карты.
- [ ] Запустить целевой тест и получить ожидаемый FAIL.
- [ ] Ослабить повторяющиеся рамки на landing, собрать maturity в вертикально читаемую последовательность и оставить не больше двух смысловых колонок в списках областей.
- [ ] Перестроить строку карты в две смысловые колонки: название/назначение/граница и вопрос/компоненты; статус поставить рядом с названием.
- [ ] Повторить целевой тест и получить PASS.

### Task 4: Проверка

**Files:**
- Modify: `.agent/STATUS.md`

- [ ] Запустить три целевых Vitest-файла.
- [ ] Запустить `pnpm lint`, `pnpm typecheck`, `pnpm build`.
- [ ] Проверить Home, About, AI Platform и карту в браузере на 1440 и 390 px; исправить overflow и явные визуальные дефекты.
- [ ] Обновить `.agent/STATUS.md` короткой записью о проходе и фактических проверках.
- [ ] Зафиксировать изменения одним implementation-коммитом и подготовить релиз.

## Саморевью

План покрывает каждый критерий спеки. Он не затрагивает маршруты, данные, SEO, handbook и готовые контентные страницы. В плане нет отложенных решений или неподтверждённых фактов.
