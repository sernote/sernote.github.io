# notevskii.tech v3.1 — ревью спецификации

Статус: converged
Дата: 27 июля 2026 года

Проверены:

- `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-correction-design.md`;
- `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-route-decisions.md`.

## Ревьюеры

1. Продукт и информационная архитектура.
2. AI Platform и distributed systems.
3. Русский текст, миграция, GitHub Pages и проверяемость приёмки.

## Первый раунд

P0 не найдено. Ревьюеры запросили:

- поднять исправление живого `/blog` перед визуальным и implementation cycle;
- разделить канонические страницы и совместимые aliases;
- задать судьбу каждого legacy URL и запретить alias chains;
- связать reader-facing статусы карты с metadata;
- описать границу AI Platform, Platform API, self-service, retrieval data lifecycle и training;
- ввести `primaryArea` и типизированные связи между областями;
- сократить обязательное ядро страницы компонента;
- сделать Prefix Cache примером платформенного решения, а не отдельной темы оптимизации;
- добавить `editorialFormat`, `reviewCycleDays` и reader gate;
- зафиксировать реалистичный режим поддержки;
- убрать необязательные английские слова из входного русского текста.

Все замечания внесены.

## Второй раунд

Профильное AI Platform-ревью сошлось без P0/P1/P2.

Остались:

- immediate smoke требовал новый `/materials`, которого ещё нет;
- архивным страницам не хватало единого presentation contract;
- срок пилота не гарантировал выпуск двух следующих статей;
- route snapshot был неточно назван production snapshot;
- reader gate не сохранял доказательство прохождения.

Исправлено:

- incident smoke и release smoke разделены;
- pilot deadline установлен на 31 октября 2026 года;
- следующие статьи назначены на ноябрь и декабрь;
- архивы получают один нейтральный archive shell;
- route snapshot назван снимком v3 export из репозитория;
- результат reader gate сохраняется отдельным review artifact.

## Итог

Три ревьюера вернули `CONVERGED`. Открытых P0, P1 и P2 нет.

Автоматическая проверка route decisions:

- 101 строка: 100 текущих маршрутов и новый `/materials`;
- дубликатов нет;
- пропущенных текущих маршрутов нет;
- лишних маршрутов кроме `/materials` нет;
- каждый `static-alias` указывает прямо на `keep`;
- self aliases и alias chains отсутствуют.
