# notevskii.tech v3 — review implementation plan

Дата: 22 июля 2026 года

Объект: `docs/superpowers/plans/2026-07-22-notevskii-tech-v3-implementation.md`

Нормативная база: `docs/superpowers/specs/2026-07-22-notevskii-tech-v3-design.md`

Метод: self-review владельца решения и три независимых reviewer-прохода — spec trace, scope/realism red team и technical/static-export review.

## Раунд 1

### Traceability к спецификации

P0 не найдено. Исправлены все P1:

1. Два обязательных content-review gate перенесены до присвоения reference-материалам статуса `reviewed`.
2. В схему возвращён нормативный `caseKind: composite`.
3. Structural membership отделён от editorial relations; backlinks выводятся registry, related list дедуплицируется и ограничен четырьмя элементами.
4. Структура area/component/case расширена до всех обязательных секций и защищена pure structure test.
5. Migration manifest заменён на полный exact-route inventory без wildcard-решений.
6. Usability test 5 из 6 снова стал launch gate, а не необязательной заметкой.
7. Дата выступления отделена от даты загрузки и проверена по странице организатора.
8. `publishedAt` и measurement baseline привязаны к фактическому content/release freeze, а не к дате написания плана.

Исправлены P2: карта объясняет пересечения областей; дополнительные legacy-talks удалены из pilot index; private evidence log, time ledger и selective-English policy стали исполнимыми.

### Scope и реалистичность

Первый red-team pass выявил два блокера принятия и несколько P1:

1. Добавлен жёсткий бюджет 32 плановых + 8 резервных авторских часов, лимиты объёма каждого эталона и потолок поддержки один час в неделю.
2. На координацию и синтез обязательного six-reader test выделены отдельные три часа без увеличения общего бюджета.
3. Повторные редакционные проходы объединены; `humanizer-ru` используется только точечно с повторной factual-проверкой.
4. Шесть planned areas остаются честными non-links; обязательный Prefix Cache vertical и все exemplar types не сокращены.
5. `audit-prompt-caching` release проверяется в content freeze, synthetic evidence воспроизводится pinned-версией, а изменчивые stars/forks не публикуются.
6. Реальный talk thumbnail перенесён в Task 3 и фиксируется вместе с validated metadata до review/promotion.
7. В v3 pilot остаётся один полноценный talk exemplar вместо второго ручного каталога.

### Техническая исполнимость

Technical review сверил план с фактическим Next.js/Fumadocs/static-export стеком. Исправлены все P1:

1. Pure adapter разделён на `source-core.ts` и server-only `source.ts`; view-model builders принимают injected `V3Source`, поэтому Vitest не импортирует generated MDX modules.
2. Fumadocs TOC сохранён sibling grid item: custom `DocsMainContainer` заменяет только `DocsPage` container slot, а layout не оборачивает всех children в `<main>`.
3. Marketing и docs aliases получили разные landmark compositions поверх общего neutral body; каждый вариант имеет один skip link и один `main#main-content`.
4. Pinned `layout_linter.py` path и фактический статус `ok` исправлены; повторное использование checkout fail-closed проверяет origin/tag/HEAD.
5. Registry и map получили детерминированную сортировку; schema tests покрывают hostile slug и URL cases.
6. Talk thumbnail стал validated local asset и не требует исключения в JSON-LD audit.
7. `404.html`, `404/index.html` и `_not-found/index.html` вынесены в один shared auxiliary-export set и исключены из canonical route inventory.
8. Many-to-one aliases разрешены, но duplicate sources, chains, traversal, missing targets и collisions с canonical `keep` routes запрещены.
9. `.mjs` scripts проверяются как black-box CLI через `spawnSync`; post-build aliases обязаны иметь skip link, один main, canonical и `noindex,follow`.

## Self-review после правок

- Каждый нормативный раздел спецификации имеет implementation task или explicit non-goal.
- Все верхнеуровневые страницы реализуются полностью; repeatable types ограничены одним detail exemplar, external note не получает локальный route.
- Порядок работ сохраняет TDD, два ранних visual/accessibility checkpoint и обязательные независимые review gates.
- Content, release и synthetic-evidence claims fail closed; внутренние цифры, топология и production outcomes запрещены.
- Migration сохраняет legacy handbook/tools/English pages и не обещает недоступные HTTP redirects.
- Полный automated gate остаётся `pnpm verify`; browser evidence и six-reader test не подменяются unit tests или screenshots.
- Без результата 5/6 допустим только статус `technical release candidate`, не `pilot accepted` и не `launch-ready`.

## Раунд 2 — convergence

Повторные проверки выполнены по текущему файлу после всех правок:

- spec trace: `PASS — converged`;
- scope/realism red team: `PASS`;
- technical/static-export review: `PASS`.

Открытых P0, P1 и pilot-affecting P2 нет.

## Итог

Implementation plan принят и готов к исполнению task-by-task. Из frozen scope ничего не расширено: backend, auth, analytics, full handbook migration, search, knowledge graph, paywall, PDF и English parity остаются вне пилота.
