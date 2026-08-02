# notevskii.tech v3.1 — решения по маршрутам

Статус: accepted — converged, часть correction spec v3.1
Дата: 27 июля 2026 года
Исходный снимок: `config/v3-route-manifest.json`, 100 неслужебных маршрутов v3 export из репозитория

Этот документ задаёт судьбу каждого маршрута из текущего v3 export и добавляет два канонических маршрута, подтверждённых v3.1: `/materials` и короткую заметку `/blog/workload-shape-over-model-name`. Живой production проверяется отдельным внешним crawl и может расходиться с этим снимком.

## Семантика решений

- `keep` — каноническая публичная страница. Входит в sitemap и может участвовать в навигации и relations.
- `static-alias` — совместимый HTML с HTTP 200, `noindex,follow`, canonical и видимой ссылкой на прямой конечный `keep`. Цепочки запрещены.
- `archive` — сохранённая страница с HTTP 200, self-canonical и `noindex,follow`. Не входит в навигацию, sitemap, RSS, featured и relations. Каждая запись manifest хранит собственные `archivedAt` и `archiveTarget`; target обязан указывать прямо на `keep`.
- `remove-after-verification` — исходный URL перестаёт экспортироваться только после проверки внутренних ссылок, публичных профилей, GitHub, поисковой выдачи и ручного списка известных входящих ссылок. В v3.1 этот режим не используется.

Служебные `404.html`, `404/index.html` и `_not-found/index.html` не входят в route manifest. Для них действует отдельный контракт служебных страниц.

Все архивы используют один нейтральный archive shell:

- заметный статус «Архив» и короткое объяснение;
- исходное содержание без утверждения, что оно актуально;
- честная дата архивации, а не выдуманная дата последней редакции;
- одна ссылка в ближайший актуальный раздел;
- без старой глобальной навигации, CTA, featured, related и интерактивных инструментов.

Archive shell относится к новой оболочке сайта и не сохраняет отвергнутый визуальный интерфейс старого продукта.
Он является самостоятельным non-hydrated HTML: Next scripts, RSC payload и интерактивные legacy controls в итоговый архив не попадают.

Для v3.1 все 54 archive records получают `archivedAt: "2026-08-02"`. `archiveTarget` хранится в каждой записи явно и выбирается по ближайшей канонической поверхности:

- About/Contact → `/about`;
- Talks, Projects и Tools → `/materials`;
- Writing → `/blog`;
- Handbook и его тематические страницы → `/ai-platform`;
- архивная английская главная `/en` → `/`.

Это правила заполнения, а не runtime fallback: автоматическая проверка требует оба поля у каждой конкретной archive-записи и проверяет, что `archiveTarget` существует как `keep`.

## Канонические страницы

| Source | Решение | Destination |
|---|---|---|
| `/` | `keep` | — |
| `/about` | `keep` | — |
| `/ai-platform` | `keep` | — |
| `/ai-platform/areas/inference-plane` | `keep` | — |
| `/ai-platform/cases/agent-session-cache-reuse` | `keep` | — |
| `/ai-platform/components/prefix-cache` | `keep` | — |
| `/ai-platform/map` | `keep` | — |
| `/blog` | `keep` | — |
| `/blog/ai-platform-before-gpu` | `keep` | — |
| `/blog/workload-shape-over-model-name` | `keep` | — |
| `/materials` | `keep` | — |
| `/projects/audit-prompt-caching` | `keep` | — |
| `/talks/maas-vs-self-hosted` | `keep` | — |

## Прямые совместимые адреса

| Source | Решение | Destination |
|---|---|---|
| `/contact` | `static-alias` | `/about` |
| `/handbook` | `static-alias` | `/ai-platform` |
| `/handbook/caching/prefix-cache` | `static-alias` | `/ai-platform/components/prefix-cache` |
| `/handbook/inference/embeddings-serving` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/handbook/inference/inference-runtime` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/handbook/inference/stt-serving` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/handbook/manifesto` | `static-alias` | `/ai-platform` |
| `/handbook/maturity-model` | `static-alias` | `/ai-platform` |
| `/handbook/platform-map` | `static-alias` | `/ai-platform/map` |
| `/handbook/start-here` | `static-alias` | `/ai-platform` |
| `/handbook/strategy/maas-vs-self-hosted` | `static-alias` | `/ai-platform` |
| `/projects` | `static-alias` | `/materials` |
| `/talks` | `static-alias` | `/materials` |
| `/tools` | `static-alias` | `/materials` |
| `/tools/prefix-cache-auditor` | `static-alias` | `/projects/audit-prompt-caching` |
| `/work` | `static-alias` | `/materials` |
| `/writing` | `static-alias` | `/blog` |

## Архивируемые русские страницы

| Source | Решение | Destination |
|---|---|---|
| `/handbook/economics/inference-economics` | `archive` | — |
| `/handbook/evals/ai-quality-gate` | `archive` | — |
| `/handbook/gateway/ai-gateway` | `archive` | — |
| `/handbook/gateway/semantic-router` | `archive` | — |
| `/handbook/guardrails/guardrails` | `archive` | — |
| `/handbook/observability/llm-observability-checklist` | `archive` | — |
| `/handbook/operating-model/ownership` | `archive` | — |
| `/handbook/templates/execution-context-matrix` | `archive` | — |
| `/handbook/templates/non-prod-cost-sheet` | `archive` | — |
| `/handbook/templates/scenario-migration-rfc` | `archive` | — |
| `/tools/ai-quality-gate-checklist` | `archive` | — |
| `/tools/llm-cost-calculator` | `archive` | — |

Эти страницы сохраняются как исторические материалы до появления проверенной сущности AI Platform, в которую можно перенести полезное содержание. Архивный статус не означает, что материал прошёл review.

## Английские страницы

Вся текущая английская поверхность архивируется. Это устраняет ложное обещание языкового паритета и не требует переносить старый интерфейс в новую визуальную систему.

| Source | Решение | Destination |
|---|---|---|
| `/en` | `archive` | — |
| `/en/about` | `archive` | — |
| `/en/contact` | `archive` | — |
| `/en/handbook` | `archive` | — |
| `/en/handbook/caching/prefix-cache` | `archive` | — |
| `/en/handbook/economics/inference-economics` | `archive` | — |
| `/en/handbook/evals/ai-quality-gate` | `archive` | — |
| `/en/handbook/gateway/ai-gateway` | `archive` | — |
| `/en/handbook/gateway/semantic-router` | `archive` | — |
| `/en/handbook/guardrails/guardrails` | `archive` | — |
| `/en/handbook/inference/embeddings-serving` | `archive` | — |
| `/en/handbook/inference/inference-runtime` | `archive` | — |
| `/en/handbook/inference/stt-serving` | `archive` | — |
| `/en/handbook/manifesto` | `archive` | — |
| `/en/handbook/maturity-model` | `archive` | — |
| `/en/handbook/observability/llm-observability-checklist` | `archive` | — |
| `/en/handbook/operating-model/ownership` | `archive` | — |
| `/en/handbook/platform-map` | `archive` | — |
| `/en/handbook/start-here` | `archive` | — |
| `/en/handbook/strategy/maas-vs-self-hosted` | `archive` | — |
| `/en/handbook/templates/execution-context-matrix` | `archive` | — |
| `/en/handbook/templates/non-prod-cost-sheet` | `archive` | — |
| `/en/handbook/templates/scenario-migration-rfc` | `archive` | — |
| `/en/projects` | `archive` | — |
| `/en/talks` | `archive` | — |
| `/en/tools` | `archive` | — |
| `/en/tools/ai-quality-gate-checklist` | `archive` | — |
| `/en/tools/llm-cost-calculator` | `archive` | — |
| `/en/tools/prefix-cache-auditor` | `archive` | — |
| `/en/writing` | `archive` | — |

Новая английская страница создаётся позже как самостоятельный reviewed-материал. Она не «разархивирует» старую поверхность автоматически.

## Совместимые `/ru`-адреса

Каждый alias указывает сразу на конечный `keep`. Промежуточные `/contact`, `/projects`, `/talks`, `/tools`, `/work`, `/writing` и `/handbook` не используются как destinations.

| Source | Решение | Destination |
|---|---|---|
| `/ru` | `static-alias` | `/` |
| `/ru/about` | `static-alias` | `/about` |
| `/ru/contact` | `static-alias` | `/about` |
| `/ru/handbook` | `static-alias` | `/ai-platform` |
| `/ru/handbook/caching/prefix-cache` | `static-alias` | `/ai-platform/components/prefix-cache` |
| `/ru/handbook/inference/embeddings-serving` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/ru/handbook/inference/inference-runtime` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/ru/handbook/inference/stt-serving` | `static-alias` | `/ai-platform/areas/inference-plane` |
| `/ru/handbook/manifesto` | `static-alias` | `/ai-platform` |
| `/ru/handbook/maturity-model` | `static-alias` | `/ai-platform` |
| `/ru/handbook/platform-map` | `static-alias` | `/ai-platform/map` |
| `/ru/handbook/start-here` | `static-alias` | `/ai-platform` |
| `/ru/handbook/strategy/maas-vs-self-hosted` | `static-alias` | `/ai-platform` |
| `/ru/projects` | `static-alias` | `/materials` |
| `/ru/talks` | `static-alias` | `/materials` |
| `/ru/tools` | `static-alias` | `/materials` |
| `/ru/tools/prefix-cache-auditor` | `static-alias` | `/projects/audit-prompt-caching` |
| `/ru/writing` | `static-alias` | `/blog` |

## Архивируемые `/ru`-адреса

Эти маршруты получают собственное архивное состояние. Они не ссылаются через alias на другую архивную страницу.

| Source | Решение | Destination |
|---|---|---|
| `/ru/handbook/economics/inference-economics` | `archive` | — |
| `/ru/handbook/evals/ai-quality-gate` | `archive` | — |
| `/ru/handbook/gateway/ai-gateway` | `archive` | — |
| `/ru/handbook/gateway/semantic-router` | `archive` | — |
| `/ru/handbook/guardrails/guardrails` | `archive` | — |
| `/ru/handbook/observability/llm-observability-checklist` | `archive` | — |
| `/ru/handbook/operating-model/ownership` | `archive` | — |
| `/ru/handbook/templates/execution-context-matrix` | `archive` | — |
| `/ru/handbook/templates/non-prod-cost-sheet` | `archive` | — |
| `/ru/handbook/templates/scenario-migration-rfc` | `archive` | — |
| `/ru/tools/ai-quality-gate-checklist` | `archive` | — |
| `/ru/tools/llm-cost-calculator` | `archive` | — |

## Проверка полноты

Перед implementation plan автоматическая проверка должна подтвердить:

1. каждый из 100 `source` текущего manifest встречается в этом документе ровно один раз;
2. `/materials` и `/blog/workload-shape-over-model-name` добавлены как единственные новые канонические маршруты;
3. каждый `static-alias` указывает на прямой `keep`;
4. alias chains и self aliases отсутствуют;
5. ни один `archive` не входит в sitemap, RSS, навигацию, featured или relations;
6. архивные и служебные страницы не засчитываются как публичное содержание v3.1.
