# Review: коррекция release-плана notevskii.tech v3

Дата: 22 июля 2026 года  
Область: Tasks 11–12 в `docs/superpowers/plans/2026-07-22-notevskii-tech-v3-implementation.md`  
Основание: фактический static export после Task 10 (`6879552`)

## Проверенный baseline

- 103 HTML-файла в `out/`.
- Три точных служебных артефакта: `404.html`, `404/index.html`, `_not-found/index.html`.
- 100 публичных route records после исключения служебного набора.
- 66 решений `keep`.
- 34 решения `static-alias`: четыре выбранных root URL и `/ru` с 29 дочерними маршрутами.
- 60 handbook exports: 20 root RU, 20 `/en`, 20 `/ru`.
- Discovery output Task 10: 15 sitemap URL, два RSS item и 14 JSON-LD scripts на семи точных страницах.

## Раунд 1

Три независимых reviewer’а проверили миграцию, export-аудит и их совместимость. Были приняты и исправлены следующие замечания:

1. `getCanonicalStaticRoutes()` не покрывает все динамические и handbook destinations. Источником истины стал полный non-auxiliary export set и структурные `keep` records манифеста.
2. Normal build не позволял бы восстановить manifest после route drift. Добавлен ранний `build:raw`; snapshot использует его до alias materialization.
3. Preflight не гарантировал восстановление при write-time failure. План теперь требует staged replacements, rollback, injected failure test и успешный повтор.
4. Lexical containment не закрывал symlink escape. Добавлены `realpath` containment, запрет symlink path и black-box fixture.
5. Production counts смешивались с fixture cardinality. Значения 100/66/34 закреплены только в production integration; fixtures выводят собственные counts.
6. Export audit мог пройти на orphan HTML, пустых discovery files или неполном JSON-LD. Добавлены exact manifest coverage, невакуумные sitemap/RSS/robots проверки и точная матрица 7 pages / 14 scripts.
7. Landmark и robots contracts были слабее продуктовой спеки. Теперь проверяются skip link и единственный `main#main-content` на каждой non-aux page, self-canonical для `keep`, target canonical и tokenized `noindex,follow` для aliases.
8. External URL policy не учитывала JSON-LD graph ids и YouTube embed semantics. Уточнены `@context`, local `@id` base, per-page allowlist и соответствие `embedUrl` видимому `sameAs` watch URL.
9. Generic crawl не заменяет точный pilot path. `check-v3-reference-path.mjs` остаётся отдельным CI gate и получает cross-platform containment test.
10. Negative proof мог испортить рабочий `out/`. Теперь он выполняется на временной копии, после чего полный `pnpm verify` проверяет исходный export.
11. Task 11 gate не включал lint и явное обновление status. План требует полный lint/type/test/build gate и запись фактических результатов в `.agent/STATUS.md`.

## Раунд 2

Оставалось одно P1: `build:raw` использовался в Step 4, но создавался только в Step 8. Скрипт перенесён до первого использования; Step 8 теперь только собирает normal build из уже существующего raw build и materializer.

## Финальный результат

- Migration reviewer: `PASS`, открытых P0–P2 нет.
- Export-contract reviewer: `PASS`, открытых P0–P2 нет.
- Combined red-team reviewer: `PASS`, открытых P0–P2 нет.
- Рабочая реализация не менялась в рамках review.
- Consumed user attention: 0 часов; review и коррекция выполнены автономно.

Итог: Tasks 11–12 снова считаются согласованным и исполнимым release-планом. Реализация может начинаться с Task 11 по обновлённой последовательности.
