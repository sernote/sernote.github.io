# Readable Home

The user approved the Visualize composition with “выглядит неплохо” after identifying the published Home as unreadable. This is the governing correction for Home only; other page templates retain the accepted v3.1 design.

## Composition

- Retain the real shared navigation, author identity and footer.
- Constrain Home to a 1,024 px frame, including horizontal padding.
- Use a compact author introduction: 35 px name on desktop, 30 px on mobile, a 15 px role, then an 18 px sentence about the writing.
- Place the articles in one reading column beside a handbook/project/materials sidebar. The desktop ratio is approximately 1.72:1 with a 46 px gap; stack naturally on small screens.
- Use a 30 px lead headline, 23 px secondary headlines and 18 px descriptions. The lead becomes 27 px on smaller screens.
- Remove the oversized hero, numbered continuation strip, duplicate article labels and bottom entrance cards from Home.
- Give the handbook a restrained blue surface and a direct map link, followed by the available Inference Plane and Prefix Cache chapters.
- Give the public cache auditor its own sidebar entrance, linking to the existing own-project instructions. Keep a compact materials entrance below it.

Approved local reference: `/Users/notevskii/.codex/visualizations/2026/09/04/01a06e77-837c-7863-b777-f92ac6843868/home-readable.html`. It is a composition reference, not application code. Do not copy its demo readers, navigation state, controls or scripts.

## Reader copy

Introduction: “Здесь разбираю, как работают модели под нагрузкой, где теряется время и из чего складывается стоимость.”

Lead category: “Кэш и маршрутизация”. Lead description: “Почему запросу иногда выгоднее пересчитать префикс, чем ждать реплику с готовым кэшем.” Action: “Читать разбор”. Apply these only to the selected cache article; a fallback article retains its own title, description and action.

The selected articles keep their source URLs, dates and native/external semantics. Home-only teasers may follow the reference without changing Blog or canonical article metadata:

- KV offload: “Перенос готового кэша тоже занимает время. Разбираю, когда он окупается.”
- Hybrid reasoners: existing description about short answers and long reasoning sharing a pool.
- Effective cost: short Home title “Погоди переезжать на дешёвую модель”; description “Считаем стоимость запроса с учётом попаданий в кэш.”

Sidebar: “Хэндбук”, “Как устроена AI‑платформа”, “Исполнение моделей, кэш и выбор реплики.”, “Карта платформы”, “Исполнение моделей”, “Префиксный кэш”. Project: “Открытый проект”, “Проверить кэш в своём проекте”, “Скилл для Codex помогает найти изменения в начале запроса.”, “Как запустить аудит”. Materials: “Выступления и подкасты”, “Разговоры про AI-платформы и инженерную работу.”, “Все материалы”.

## Behavior and boundaries

Use source-backed eligible records for chapter and project links. Missing, draft or stale records must not become hardcoded Home links. Retain the latest eligible native article as fallback lead and never repeat it in the selected list. Keep external publication attribution and new-tab disclosure. Every production action is a real link.

Keep the current site palette and typography family. No new theme switch, client component, dependency, backend, tracking, invented claims or content-body edits. Preserve static export and existing routes.

## Acceptance

Review the real export at 1,440, 768 and 390 px, including legibility, horizontal overflow, heading hierarchy, navigation and keyboard focus. Run `pnpm verify`, which includes the required lint, typecheck and build. Update `.agent/STATUS.md` with the implementation and verified result.
