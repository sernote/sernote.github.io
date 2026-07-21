# notevskii.tech v3 — review продуктовой спецификации

Дата: 22 июля 2026 года
Объект: `docs/superpowers/specs/2026-07-22-notevskii-tech-v3-design.md`
Метод: self-review владельца решения и два независимых reviewer-прохода

## Раунд 1

### Product, UX и content strategy

P0 не найдено. Исправлены все P1:

1. Бюджет распространён на весь v3; пилот ограничен 6–8 неделями и 40 авторскими часами.
2. Три части продукта отражены в IA: добавлен общий `/work`, глобальная навигация сокращена до четырёх пунктов и utility-contact.
3. Зафиксированы один pilot ICP и один decision-JTBD.
4. Приёмка переведена с произвольного числа кликов на проверяемую Prefix Cache-задачу; плоские detail URL получили breadcrumb и контекст области.
5. Заданы окно наблюдения, тест 5 из 6 целевых читателей, ручной evidence log и абсолютная цель до 31 декабря.
6. Нереализуемые HTTP redirects заменены статически совместимыми aliases.
7. Спецификация больше не объявляет себя заменой implementation plan.

Также исправлены P2: одно направление структурных связей, раздельные publication/review statuses, роли reviewer-проходов и строгое определение квалифицированной возможности.

### Техника, metadata и миграция

P0 не найдено. Исправлены все P1:

1. Для legacy URL определён `static-alias` с HTTP 200, canonical, noindex, видимой ссылкой и проверяемым manifest.
2. Пилот использует отдельные v3 collections/schema; 40 legacy MDX не требуют массовой миграции.
3. Identity задаётся `entityId + locale + type + slug`; URL и переводные пары выводятся однозначно.
4. Publication и review разделены; production-поведение draft, stale и archived определено.
5. Общие reference-поля включают sources, applicability, limitations, review date и cycle.
6. Зафиксированы правила RSS, sitemap, hreflang, JSON-LD и post-build audit.

Также исправлены P2: принадлежность area/component хранится в одном направлении, а browser/export acceptance разделена на post-build crawl и browser evidence.

## Self-review после правок

- Явный запрос пользователя на один exemplar каждого повторяемого типа сохранён: native article и talk detail не удалены ради сокращения scope.
- Пилот остаётся одним сквозным срезом Prefix Cache; соседние материалы не создают ссылки на отсутствующие detail pages.
- В новую публичную модель не попали закрытые цифры, топология, экономика, внутренние названия или непроверенные production-результаты.
- Static export, GitHub Pages, отсутствие backend/auth/analytics и selective English сохранены.
- В документе нет незакрытых TODO/TBD.

## Раунд 2

P0 не найдено. Исправлены два оставшихся P1:

1. `external-note` больше не получает фиктивный локальный slug/canonical: он не создаёт detail page и ведёт прямо на `sourceUrl`; локальные URL проверяются на уникальность отдельно.
2. Для stale-reference определены обязательные evidence-поля, автоматическая проверка срока, поведение карты, индексов, relations и sitemap; `publishedAt` обязателен для публичных и архивных сущностей.

Повторный convergence pass: `PASS — converged`. P0/P1 не осталось.

## Итог

Спецификация принята. Все замечания двух независимых раундов либо исправлены, либо явно отклонены как противоречащие запросу пользователя; единственное такое предложение — удалить native article и talk detail ради сокращения scope — не принято, потому что пользователь явно потребовал по одному exemplar для каждого повторяемого типа.
