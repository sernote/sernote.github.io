# notevskii.tech v3.1 — review публичного контентного инвентаря

Дата проверки: 2 августа 2026 года
Объект: одна native note, пять external notes и публичный профиль автора
Итог: **PASS** — открытых content, attribution, `ru-text` или public-safety замечаний нет.

## Проверка источников публикаций

Все URL проверены прямым HTTP-запросом с переходом по редиректам. Каждый источник вернул HTTP 200; итоговый URL совпал с заданным.

| Запись | Проверенные факты | Ограничение источника |
| --- | --- | --- |
| `prefix-cache-the-code` | [Журнал «Код»](https://thecode.media/prefix-cache-promt-ai-agenty/): H1 `Почему короткий промпт может стоить дороже длинного`; автор — Сергей Нотевский; площадка — журнал «Код» Яндекс Практикума. `article:published_time` и JSON-LD дают `2026-06-18`; [страница автора](https://thecode.media/authors/sergey-notevskiy/) показывает ту же статью с датой 18 июня 2026 года. | Видимая карточка статьи показывает только `Обновлено 03.07.2026`. Поэтому `publishedAt: 2026-06-18` опирается на метаданные статьи и страницу автора, а не на видимую дату карточки. |
| `prefix-cache-habr` | [Хабр](https://habr.com/ru/companies/bitrix/articles/1033822/): точный H1 `Короткий промпт ≠ дешёвый промпт: как оптимизация ломает prefix cache в LLM-агентах`; дата `2026-05-12` в JSON-LD; автор `Ser_no` / Сергей Нотевский; блог компании Битрикс24. | На странице публикации дата текущего года показана без года; полный год подтверждён JSON-LD. |
| `effective-cost-habr` | [Хабр](https://habr.com/ru/companies/bitrix/articles/1008320/): точный H1 `Погоди переезжать на дешёвую модель: считаем effective cost с учётом кэша`; дата `2026-03-10`; автор `Ser_no` / Сергей Нотевский; блог компании Битрикс24. | На странице публикации дата текущего года показана без года; полный год подтверждён JSON-LD. |
| `agent-skills-habr` | [Хабр](https://habr.com/ru/companies/bitrix/articles/980654/): точный H1 `Навыки агентов (Agent Skills): что это такое и почему это больше, чем «папка с промптами»`; видимая дата `26 декабря 2025`; автор `Ser_no` / Сергей Нотевский; блог компании Битрикс24. | Ограничений, меняющих frontmatter, не обнаружено. |
| `prompt-engineering-vc` | [vc.ru](https://vc.ru/ai/1952426-promt-inzhiniring-v-2024-godu): точный H1 `Промт-инжиниринг больше не нужен?`; видимая дата 28 апреля 2025 года и `datePublished: 2025-04-28`; публикация размещена аккаунтом Битрикс24. Лид говорит, что тему объясняет Сергей Нотевский, AI-евангелист и разработчик команды CoPilot; текст идёт от первого лица Сергея. | Площадка не показывает отдельную страницу автора Сергея. Поэтому `externalType: expert-comment`, `sourceAuthorProfileUrl: null`; формулировка `основной эксперт материала` — редакционный вывод из лида и первого лица, а не дословная роль площадки. |

Точное написание title сохранено по H1, без SEO-суффиксов `— журнал «Код»` и `— AI на vc.ru` из `og:title`. Ни один лид источника не скопирован: в MDX хранятся оригинальная краткая аннотация, attribution и ссылка на каноническую публикацию.

## Проверка публичного профиля

| Источник | Что подтверждено |
| --- | --- |
| [AIшница 2024](https://webinars.bitrix24.by/ai-2024/) | Сергей Нотевский — продакт-менеджер и AI-евангелист Битрикс24. |
| [AIшница 3.0](https://webinars.bitrix24.by/aishnitsa3-0/) | В сезоне 2025 года Сергей указан как AI-евангелист и разработчик команды Copilot в Битрикс24. |
| [Профиль на Хабре](https://habr.com/ru/users/Ser_no/) | Сергей Нотевский; текущая публичная роль `AI Platform Lead`; место работы — Битрикс24. |
| [Merge Tatarstan 2026](https://tatarstan2026.mergeconf.ru/speakers/development/aiml/notevskiy) | Роль `AI Platform Lead`; публичное описание ответственности за направление LLM-моделей: поиск, анализ, адаптацию и тестирование на сценариях Битрикс24. |

`AUTHOR_PROFILE` содержит только эти подтверждённые факты. В `sameAs` оставлены профиль Хабра, GitHub и Telegram; URL публикаций и конференций туда не добавлены.

## `ru-text` review

Проверены все шесть новых MDX-записей: `workload-shape-over-model-name`, `prefix-cache-the-code`, `prefix-cache-habr`, `effective-cost-habr`, `agent-skills-habr`, `prompt-engineering-vc`.

| Проверка | Результат |
| --- | --- |
| Кавычки, тире, `ё`, пунктуация | **PASS**. В видимой прозе используются `«»`, длинное тире и единое написание `ё`; в новых аннотациях расставлены неразрывные пробелы после односимвольных предлогов и союзов. |
| Инфостиль | **PASS**. Нет канцелярита, ложных усилителей, вводной воды, пассивных обещаний или рекламных оценок. |
| Профессиональный регистр | **PASS**. `prefix cache`, `tools`, `effective cost`, `Agent Skills` и другие термины сохранены там, где они точнее русского описания и совпадают с темой источника. |
| Native note | **PASS**. Текст `workload-shape-over-model-name` сохранён дословно по утверждённому contract и не расширен. |
| External notes | **PASS**. Каждое тело состоит из короткой оригинальной source note и прямой ссылки; пересказа или копии лида нет. |

## Public-safety review

Результат для шести новых MDX: **PASS**.

- нет внутренних метрик Битрикс24, чисел нагрузки, топологии, стоимости, vendor contracts или customer data;
- общие термины `GPU`, `RPS`, `KV cache`, `latency` и `runtime` в native note не содержат внутренних значений или описания закрытой системы;
- роли и траектория автора подтверждены публичными страницами;
- relation count не превышает четыре; `supersedes` и `supersededBy` равны `null`;
- все external notes имеют `slug: null`, отсутствуют в `listLocalCanonical("article")` и не создают локальные detail routes;
- legacy relation и Materials selector переведены с удалённого `short-prompt-not-cheap` на проверенный `prefix-cache-habr`.

Сканирование по маркерам внутренних метрик, топологии, стоимости и контрактов не нашло блокирующих совпадений. Совпадения `GPU`, `RPS`, `latency` и слова `стоимость` относятся только к утверждённой общей инженерной формулировке и аннотации публичной статьи.

## RED → GREEN evidence

Первичный RED:

```text
corepack pnpm vitest run tests/content-v3/source.test.ts tests/content-v3/evidence.test.ts
Test Files: 2 failed
Tests: 6 failed, 40 passed
```

Падения точно указывали на старый единственный external record, отсутствующую native note, пять отсутствующих publication-файлов и `AUTHOR_PROFILE`.

Дополнительные dependency и integration RED после добавления файлов:

- dangling relation: `tests/content-v3/evidence.test.ts` — 1 failed, 5 passed;
- старый Materials selector: `tests/content-v3/source.test.ts` — 3 failed, 38 passed.
- опубликованные external notes ссылались на draft-only область: static build завершился fail-closed с `Published record agent-skills-habr points to non-public target context-agent-runtime`; узкий regression test дал 1 failed, 6 passed до удаления необязательных relations;
- новый native route отсутствовал в typed migration manifest: static-export integration дала 4 failed, 37 passed до добавления единственной `keep`-записи.

Исправления механические: case relation и selector теперь используют `prefix-cache-habr` — новый ID той же проверенной Habr-публикации; две необязательные связи с draft-only областью удалены; новый native route добавлен в manifest как `keep`.

Manifest-изменение не пересматривает route lifecycle из Task 11. Его fail-closed contract требует точного равенства export set и manifest set, поэтому новый локальный published route обязан получить одну явную `keep`-запись. Набор из 34 `static-alias`, их destinations и правила materialization не изменены.

Финальный GREEN до этого review:

```text
corepack pnpm typecheck
PASS

corepack pnpm vitest run tests/content-v3
Test Files: 5 passed
Tests: 142 passed

corepack pnpm lint
PASS

corepack pnpm build
PASS: 106 static pages generated, 34 aliases materialized

corepack pnpm vitest run tests/build/static-export-contract.test.ts
Test Files: 1 passed
Tests: 41 passed
Manifest: 101 records = 67 keep + 34 static-alias
Discovery: 16 sitemap URLs, 7 RSS items
```

## Исправление по итогам spec review

Spec review выявил два пробела в тестах: v3.1 inventory проверял отдельные синтетические fixtures, а chronology assertion фиксировал ровно пять external IDs. Production-контент мог пройти schema validation с неверным, но валидным title, date, source URL, excerpt или participation label; лишний абзац native note тоже не проверялся дословно.

Исправление ограничено тестами:

- `source.test.ts` рекурсивно читает реальные `content/v3/**/*.mdx` через Fumadocs `frontmatter` и передаёт metadata в существующий `createV3Source`; таким образом, inventory проходит тот же Zod/registry/source path, что и production collection;
- отдельный `v31ArticleFixtures` удалён, а синтетические fixtures сохранены только для unit-тестов `source-core` и view models;
- для пяти обязательных external records проверяются точные lifecycle-поля, title, date, source name/URL/profile URL, excerpt, external type и participation label; canonical assertion работает на реальном source;
- native note проверяется по полному frontmatter contract и точному MDX body, а `AUTHOR_PROFILE` — прямым импортом production-объекта;
- chronology допускает будущие external additions: обязательные пять записей проверяются как подмножество в нужном относительном порядке, `externalIds.length >= 5`, а вся фактическая external sequence должна быть non-increasing по `publishedAt`.

Mutation RED выполнен на реальном `content/v3/blog/workload-shape-over-model-name.mdx`: после временного добавления четвёртого абзаца команда

```text
corepack pnpm vitest run tests/content-v3/source.test.ts -t "reads the exact compact native note and author profile from source files"
Test Files: 1 failed
Tests: 1 failed, 41 skipped
```

упала на exact-body assertion и показала добавленную строку в diff. После восстановления MDX та же команда дала `1 passed, 41 skipped`.

Финальная follow-up проверка:

```text
corepack pnpm lint
PASS

corepack pnpm typecheck
PASS

corepack pnpm vitest run tests/content-v3
Test Files: 5 passed
Tests: 143 passed

corepack pnpm build
PASS: 106 static pages generated, 34 aliases materialized

corepack pnpm vitest run tests/build/static-export-contract.test.ts
Test Files: 1 passed
Tests: 41 passed

git diff --check
PASS
```

## Исправление по итогам code-quality review

Code-quality review нашёл два Important и одно Minor замечание к проверкам. Исправление не меняет product/content scope:

- локальный `pnpm verify` и Pages CI теперь после `pnpm build` явно запускают `pnpm vitest run tests/build/static-export-contract.test.ts`; затем выполняются прежние reference/export audits;
- отдельный lifecycle contract test фиксирует этот порядок в `package.json` и `.github/workflows/pages.yml`, поэтому post-build запуск нельзя удалить незаметно;
- exact external contract теперь покрывает все source-owned frontmatter-поля пяти pilot records, включая `description`, `topics`, `relations`, а также точное короткое MDX body с канонической ссылкой;
- `evidence.test.ts` проверяет `AUTHOR_PROFILE` прямым импортом: полное равенство объекта и `sameAs`, `Object.isFrozen(AUTHOR_PROFILE)` и `Object.isFrozen(AUTHOR_PROFILE.sameAs)`.

TDD RED для lifecycle wiring:

```text
corepack pnpm vitest run tests/build/static-export-contract.test.ts -t "runs the real-export integration suite after build locally and in Pages CI"
Test Files: 1 failed
Tests: 1 failed, 41 skipped
Причина: package verify не содержал post-build integration command.
```

Три независимых schema-valid mutation RED выполнены на реальном `prefix-cache-the-code.mdx`: изменённый `description`, удалённый `projectIds` и добавленный второй body paragraph каждый дали `1 failed, 41 skipped` в exact external contract test. После восстановления тот же focused test дал `1 passed, 41 skipped`.

Clean pre-build proof без каталога `out` выполнил 36 unit/lifecycle tests и ожидаемо пропустил только шесть real-export assertions. После build полный файл выполняет все 42 теста, включая точный RSS count и JSON-LD matrix.

Финальная проверка второго follow-up:

```text
corepack pnpm verify
PASS: lint, typecheck, full tests, build, 42 post-build static-export tests, reference audit, export audit
Warnings: latest build — pre-existing multiple-lockfile workspace-root message; an earlier run also emitted non-failing Fumadocs dynamic-import cache messages

corepack pnpm vitest run tests/content-v3
Test Files: 5 passed
Tests: 143 passed

git diff --check
PASS
```

Итог review: **PASS**. Source limitations описаны выше; противоречий заданным title, date, platform, authorship или role evidence нет.
