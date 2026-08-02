# notevskii.tech

Личный инженерный сайт Сергея Нотевского и открытый справочник AI Platform. Это статический Next.js-сайт с тремя основными входами: Блог, Материалы и AI Platform.

## Стек

- Next.js App Router и React;
- TypeScript;
- Fumadocs MDX;
- Tailwind CSS;
- pnpm;
- static export для GitHub Pages.

Нужен Node.js 22 или новее.

## Публичные маршруты

- `/` — главная;
- `/blog` — авторские статьи, короткие заметки и ссылки на внешние публикации;
- `/materials` — выступления, открытые проекты и публикации;
- `/ai-platform` — вход в открытый справочник по production AI-платформе;
- `/ai-platform/map` — карта семи областей ответственности;
- `/about` — биография, публичная роль и контакты.

Локальные страницы Блога создаются только для записей `kind: native`. Внешняя публикация ведёт прямо на канонический источник и не получает дублирующий URL на сайте.

В текущем AI Platform pilot полностью опубликован один вертикальный срез:

- область `/ai-platform/areas/inference-plane`;
- компонент `/ai-platform/components/prefix-cache`;
- синтетический кейс `/ai-platform/cases/agent-session-cache-reuse`.

Также доступны эталонные страницы выступления `/talks/maas-vs-self-hosted` и проекта `/projects/audit-prompt-caching`.

## Контент

Типизированные записи находятся в `content/v3`, схема — в `lib/content-v3/schema.ts`. Для новой записи:

1. Создайте MDX в подходящем каталоге `content/v3`.
2. Заполните frontmatter согласно типу записи.
3. Для внешней публикации оставьте `slug: null` и укажите подтверждённые источник, URL, тип участия и вклад автора.
4. Для reference-материала используйте только публичные, проверяемые источники и явно задайте применимость и ограничения.
5. Запустите `corepack pnpm verify`.

Перевод не создаётся автоматически: русский материал не подразумевает английскую копию.

## Старые URL

`config/v3-route-manifest.json` задаёт решение для каждого прежнего маршрута:

- `keep` — каноническая страница;
- `static-alias` — совместимая страница с канонической ссылкой на новый адрес;
- `archive` — сохранённая страница с self-canonical и `noindex,follow`, исключённая из навигации, sitemap, RSS и связей.

Например, `/work` ведёт на `/materials`, `/writing` — на `/blog`, `/handbook` — на `/ai-platform`, а снятые с публикации разделы остаются доступными как архив.

## Локальная разработка

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Полная проверка перед выпуском:

```bash
corepack pnpm verify
```

Она включает lint, typecheck, тесты, static build, проверку reference-путей и контракт экспортированных страниц. Результат сборки находится в `out/`.

## Ограничения

Сайт остаётся полностью статическим: без backend, auth, базы данных, аналитики, server actions и API routes. Не публикуйте внутреннюю архитектуру, закрытые числа, договоры или данные компании; используйте обезличенные production-like примеры.

## Документы проекта

- нормативная спецификация: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-correction-design.md`;
- решения по маршрутам: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-route-decisions.md`;
- план реализации: `docs/superpowers/plans/2026-08-02-notevskii-tech-v3-1-implementation.md`;
- текущий статус: `.agent/STATUS.md`.

Деплой выполняет `.github/workflows/pages.yml`; custom domain хранится в `public/CNAME`.
