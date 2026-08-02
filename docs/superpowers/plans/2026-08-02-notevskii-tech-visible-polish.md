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

- [x] Добавить тест, который требует отдельные правила для desktop-навигации и mobile trigger и запрещает конфликтующие responsive utility.
- [x] Запустить целевой Vitest и получить ожидаемый FAIL.
- [x] Заменить utility-переключение на отдельные CSS-классы после импортов Fumadocs.
- [x] Повторить тест и получить PASS.

### Task 2: Home и About

**Files:**
- Modify: `tests/pages/v31-personal-page-rendering.test.ts`
- Modify: `components/pages/v31-personal-pages.tsx`

- [x] Добавить проверки спокойного hero главной и source-backed About.
- [x] Запустить целевой тест и получить ожидаемый FAIL.
- [x] Укрупнить и разрядить hero главной без дополнительного слогана; убрать вертикальные рамки у трёх входов.
- [x] На About использовать единый подтверждённый `AUTHOR_PROFILE.aboutIntro` без дублирования биографии.
- [x] Повторить целевой тест и получить PASS.

### Task 3: AI Platform и карта

**Files:**
- Modify: `tests/pages/v31-ai-platform-pages.test.ts`
- Modify: `components/pages/v31-ai-platform-pages.tsx`
- Modify: `components/ai-platform/platform-map.tsx`

- [x] Добавить структурные проверки спокойного hero и двухколоночной карты.
- [x] Запустить целевой тест и получить ожидаемый FAIL.
- [x] Ослабить повторяющиеся рамки на landing, собрать maturity в вертикально читаемую последовательность и оставить не больше двух смысловых колонок в списках областей.
- [x] Перестроить строку карты в две смысловые колонки: название/назначение/граница и вопрос/компоненты; статус поставить рядом с названием.
- [x] Повторить целевой тест и получить PASS.

### Task 4: Проверка

**Files:**
- Modify: `.agent/STATUS.md`

- [x] Запустить три целевых Vitest-файла.
- [x] Запустить lint, typecheck и production build через локальные бинарники проекта.
- [x] Проверить Home, About, AI Platform и карту в браузере на 1440, 768 и 390 px; исправить overflow и явные визуальные дефекты.
- [x] Обновить `.agent/STATUS.md` короткой записью о проходе и фактических проверках.
- [x] Зафиксировать изменения одним implementation-коммитом и подготовить релиз.

## Саморевью

План покрывает каждый критерий спеки. Он не затрагивает маршруты, данные, SEO, handbook и готовые контентные страницы. В плане нет отложенных решений или неподтверждённых фактов.
