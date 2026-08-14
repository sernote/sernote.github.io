# Four external publications design

## Goal

Add the four verified publications Sergey supplied to the current Materials inventory without copying the source articles or creating local detail pages.

## Product decision

Use the existing `article` + `external-note` content model. Every record appears as a chronological card on `/materials/` and as an external item in `/rss.xml`. The original publisher remains canonical.

The site must distinguish authored work from editorial material that uses Sergey's expertise:

| Entity | Date | Type | Source | Sergey's role |
|---|---|---|---|---|
| `gpt5-rb-expert-comment` | 2025-08-08 | `expert-comment` | RB.RU | Comments on GPT-5 hallucinations and `lost in the middle` |
| `llm-style-ranking-habr` | 2025-04-24 | `authored-article` | Habr, Bitrix24 blog | Author and technical analysis |
| `grok3-snob-expert-comment` | 2025-03-20 | `expert-comment` | Snob | Main expert; the editorial author remains Chermen Dzgoev |
| `ai-employee-rbc-trends` | 2024-08-01 | `expert-comment` | RBC Trends | Expert on the boundary between an AI assistant and an employee |

## Content boundary

- Store a short original annotation, verified source metadata, contribution label and source link.
- Do not reproduce article paragraphs or quotations.
- Do not claim authorship for RB.RU, Snob or RBC Trends.
- Keep the Habr author profile only on the authored Habr record.
- Add no images, routes, sitemap entries, redirects or legacy `lib/i18n.ts` changes.

## Verification

- Source contracts cover all four records and their exact classification.
- Materials keeps all external publications in descending `publishedAt` order.
- RSS grows from 8 to 12 items and uses each source URL as link and GUID.
- Full repository verification and static-export audit pass.
- Live smoke confirms all four cards and links on Materials and in RSS.
