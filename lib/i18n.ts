export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ru";
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutLocale = normalized.replace(/^\/(?:ru|en)(?=\/|$)/, "") || "/";

  if (locale === "en") {
    return withoutLocale === "/" ? "/en" : `/en${withoutLocale}`;
  }

  return withoutLocale;
}

export function alternateLocalePath(path: string, locale: Locale): string {
  return localizedPath(path, locale === "en" ? "ru" : "en");
}

export const siteLinks = {
  telegram: "https://t.me/s/sergeinotevskii",
  habr: "https://habr.com/ru/users/Ser_no/articles/"
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://notevskii.tech";

export function getSiteConfig(locale: Locale = defaultLocale) {
  return {
    name: "Production AI Platform Handbook",
    author: "Sergei Notevskii",
    role: locale === "ru" ? "AI Platform Lead" : "AI Platform Lead",
    url: siteUrl,
    description:
      locale === "ru"
        ? "Хэндбук о production AI-платформах: инференс, маршрутизация, кеш, проверка качества, защитные контуры, наблюдаемость, стоимость и ответственность."
        : "A field guide for building LLM, STT, embeddings and agent platforms in production: inference, routing, cache, evals, guardrails, observability, cost, incidents and ownership.",
    links: siteLinks
  };
}

export function getNavItems(locale: Locale = defaultLocale) {
  const items =
    locale === "ru"
      ? [
          { href: "/", label: "Главная" },
          { href: "/handbook", label: "Хэндбук" },
          { href: "/handbook/platform-map", label: "Карта" },
          { href: "/tools", label: "Инструменты" },
          { href: "/writing", label: "Тексты" },
          { href: "/talks", label: "Выступления" },
          { href: "/contact", label: "Контакты" }
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/handbook", label: "Handbook" },
          { href: "/handbook/platform-map", label: "Map" },
          { href: "/tools", label: "Tools" },
          { href: "/writing", label: "Writing" },
          { href: "/talks", label: "Talks" },
          { href: "/contact", label: "Contact" }
        ];

  return items.map((item) => ({ ...item, href: localizedPath(item.href, locale) }));
}

export function getExpertiseAreas(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        "AI-платформы",
        "Свой инференс",
        "vLLM и GPU",
        "Маршрутизация и резервные пути",
        "Экономика prefix cache",
        "Оценка качества и релизный контроль",
        "Наблюдаемость LLM",
        "Защитные контуры и ответственность"
      ]
    : [
        "AI Platform",
        "Self-hosted inference",
        "vLLM and GPU capacity",
        "Model routing and fallback",
        "Prefix cache economics",
        "Evals and quality gates",
        "LLM observability",
        "Guardrails and ownership"
      ];
}

export function getPlatformLayers(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        {
          title: "Продуктовые сценарии",
          description: "Ценность, риски, владелец и критерии успеха."
        },
        {
          title: "AI Gateway",
          description: "Единый вход: доступ, лимиты, маршрутизация, политики и учёт стоимости."
        },
        {
          title: "Стратегия провайдеров",
          description: "MaaS, self-hosted и гибридный подход как стратегия, а не религия."
        },
        {
          title: "Маршрутизация моделей",
          description: "Алиасы, резервные пути, канареечные выкатки и версии моделей."
        },
        {
          title: "Инференс-рантайм",
          description: "Запуск LLM, STT, embeddings и rerankers с бюджетами задержки и пропускной способности."
        },
        {
          title: "Кеширование",
          description: "Prompt cache, prefix cache, KV-cache и стабильная форма запроса."
        },
        {
          title: "Жизненный цикл модели",
          description: "От исследования до теневого теста, канареечной выкатки, production, отката и вывода из эксплуатации."
        },
        {
          title: "Оценка качества и релизный контроль",
          description: "Датасеты, регрессионные проверки, канареечная выкатка и обратная связь."
        },
        {
          title: "Наблюдаемость",
          description: "Трейсы, токены, TTFT, TPOT, события резервного маршрута, события безопасности и обратная связь."
        },
        {
          title: "Экономика / FinOps",
          description: "Стоимость сценария, кешированные токены, повторы, загрузка GPU и цена принятого результата."
        },
        {
          title: "Защитные контуры / безопасность",
          description: "Политики, PII, prompt injection, риски инструментов и аудит."
        },
        {
          title: "Эксплуатация / ответственность",
          description: "SLO, инциденты, планирование мощности, инструкции и опыт разработчиков платформы."
        }
      ]
    : [
        {
          title: "Product use cases",
          description: "Scenario intake, user value, risk profile, acceptance criteria."
        },
        {
          title: "AI Gateway",
          description: "Unified API layer for auth, quotas, routing, policy, cost attribution."
        },
        {
          title: "Provider strategy",
          description: "MaaS, OpenRouter-style research loops, self-hosted and hybrid decisions."
        },
        {
          title: "Model routing",
          description: "Aliases, fallback, canary and model versioning."
        },
        {
          title: "Inference runtime",
          description: "LLM, STT, embeddings and reranker serving with latency and throughput budgets."
        },
        {
          title: "Caching",
          description: "Prompt cache, prefix cache, KV-cache and stable request shape."
        },
        {
          title: "Model lifecycle",
          description: "From research to shadow, canary, production, rollback and retire."
        },
        {
          title: "Evals and Quality Gate",
          description: "Datasets, eval suites, regression checks, canary rollout and feedback loops."
        },
        {
          title: "Observability",
          description: "Traces, tokens, TTFT, TPOT, fallback events, safety events and feedback."
        },
        {
          title: "Economics / FinOps",
          description: "Scenario cost, cached tokens, retries, GPU utilization and cost per accepted outcome."
        },
        {
          title: "Guardrails / Security",
          description: "Policies, PII, prompt injection, tool risks and audit trail."
        },
        {
          title: "Operations / Ownership",
          description: "Ownership, SLOs, incidents, capacity planning, runbooks and platform DevEx."
        }
      ];
}

export function getFeaturedChapters(locale: Locale = defaultLocale) {
  const items =
    locale === "ru"
      ? [
          {
            title: "Карта Production AI Platform",
            href: "/handbook/platform-map",
            description: "Карта ответственности: от сценариев к AI Gateway, инференсу, проверке качества и владельцам."
          },
          {
            title: "Модель зрелости AI-платформы",
            href: "/handbook/maturity-model",
            description: "Модель зрелости: от одного API-ключа до зрелой AI-платформы."
          },
          {
            title: "MaaS vs Self-hosted",
            href: "/handbook/strategy/maas-vs-self-hosted",
            description: "Как выбирать MaaS, self-hosted или гибридный инференс."
          },
          {
            title: "Prefix Cache",
            href: "/handbook/caching/prefix-cache",
            description: "Как стабильный префикс, схемы инструментов и маршрутизация влияют на реальную стоимость."
          },
          {
            title: "Контроль качества ИИ",
            href: "/handbook/evals/ai-quality-gate",
            description: "Процесс, который не даёт качеству незаметно деградировать."
          },
          {
            title: "Чеклист наблюдаемости LLM",
            href: "/handbook/observability/llm-observability-checklist",
            description: "Минимальная телеметрия для модели, промпта, задержки, стоимости и результата."
          }
        ]
      : [
          {
            title: "Production AI Platform Map",
            href: "/handbook/platform-map",
            description: "The responsibility-first map: from use cases to gateway, inference, evals and ownership."
          },
          {
            title: "AI Platform Maturity Model",
            href: "/handbook/maturity-model",
            description: "A leadership framework from one API key to AI-native operating model."
          },
          {
            title: "MaaS vs Self-hosted",
            href: "/handbook/strategy/maas-vs-self-hosted",
            description: "A strategy chapter for choosing managed, self-hosted or hybrid serving."
          },
          {
            title: "Prefix Cache",
            href: "/handbook/caching/prefix-cache",
            description: "How stable prefixes, tool schemas and routing decide effective LLM cost."
          },
          {
            title: "AI Quality Gate",
            href: "/handbook/evals/ai-quality-gate",
            description: "A rollout loop that prevents silent quality degradation."
          },
          {
            title: "LLM Observability Checklist",
            href: "/handbook/observability/llm-observability-checklist",
            description: "Minimum telemetry for model, prompt, cost, latency and outcome debugging."
          }
        ];

  return items.map((item) => ({ ...item, href: localizedPath(item.href, locale) }));
}

export function getPublicWriting(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        {
          title: "Короткий промпт не значит дешёвый промпт",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1033822/",
          description: "Agent loops, стабильный список инструментов и дизайн промпта с учётом кеша."
        },
        {
          title: "7 анти-паттернов prefix cache",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1016734/",
          description: "Дрейф timestamp, плавающий порядок инструментов, round-robin маршрутизация и KV-cache."
        },
        {
          title: "Реальная стоимость с кешем",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1008320/",
          description: "Почему выбор модели нельзя считать только по цене токенов."
        },
        {
          title: "AI да парен!",
          source: "Telegram",
          href: siteLinks.telegram,
          description: "Заметки про AI-платформы, vLLM, агентов и продакшн-компромиссы."
        }
      ]
    : [
        {
          title: "Short prompt does not mean cheap prompt",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1033822/",
          description: "Agent loops, tool list stability, allowed tools and cache-aware prompt design."
        },
        {
          title: "7 prefix cache anti-patterns",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1016734/",
          description: "Timestamp drift, floating tool order, round-robin routing and KV-cache lifetime."
        },
        {
          title: "Effective cost with cache",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1008320/",
          description: "Why model choice needs cache-aware economics, not only list prices."
        },
        {
          title: "AI da paren!",
          source: "Telegram",
          href: siteLinks.telegram,
          description: "Notes on AI platform engineering, tools, vLLM, agent systems and production trade-offs."
        }
      ];
}

export function getTalks(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        {
          title: "From MaaS to self-hosted / on-premise models",
          venue: "Merge Tatarstan 2026",
          description:
            "Практический доклад о внутреннем провайдере моделей, self-hosted и мифах перед миграцией."
        },
        {
          title: "AI-агенты без тумана",
          venue: "Internal AI conference / Habr follow-up",
          description: "Рабочая модель: где LLM-вызов, где процесс, а где agent loop."
        },
        {
          title: "Экономика prefix cache",
          venue: "Public article series",
          description:
            "Как разбирать падение доли попаданий в кеш, рост стоимости и скачки задержки после небольших правок."
        }
      ]
    : [
        {
          title: "From MaaS to self-hosted / on-premise models",
          venue: "Merge Tatarstan 2026",
          description:
            "A practical talk about becoming an internal model provider, self-hosted trade-offs and myths to remove before migration."
        },
        {
          title: "AI agents without the fog",
          venue: "Internal AI conference / Habr follow-up",
          description: "A clear working model for distinguishing LLM calls, workflows and agent loops."
        },
        {
          title: "Prefix cache economics",
          venue: "Public article series",
          description:
            "A repeatable way to debug why cache hit rate, effective cost and latency drift after harmless changes."
        }
      ];
}

export function getDictionary(locale: Locale = defaultLocale) {
  return locale === "ru" ? ruDictionary : enDictionary;
}

const enDictionary = {
  language: {
    current: "English",
    alternate: "RU",
    switchTo: "Русская версия"
  },
  shell: {
    startReading: "Start reading",
    openNavigation: "Open navigation",
    navigation: "Navigation",
    footerLine: "from API key to platform",
    contact: "Contact"
  },
  home: {
    hero: {
      badge: "AI Platform Lead",
      title: "Sergei Notevskii",
      copy:
        "I build production-grade AI platforms for LLM, STT, embeddings and agents: inference, evals, guardrails, observability, cost and ownership.",
      start: "Open handbook",
      map: "Platform map",
      projects: "Contact",
      mapVersion: "From API key to platform",
      layers: [
        "API key / demo",
        "AI Gateway",
        "Routing / Inference / Cache",
        "Evals / Observability / Cost",
        "Guardrails / Ownership"
      ]
    },
    sections: {
      proofTitle: "Why this work exists",
      proofCopy: "Public, sanitized field notes from production AI platform work.",
      problemTitle: "After the demo",
      problemCopy: "The demo works. Then production starts.",
      layersTitle: "Platform layers",
      layersCopy: "The handbook is organized by platform responsibility, not by hype cycle.",
      expertiseTitle: "Where I am useful",
      expertiseCopy: "Architecture reviews, platform strategy, quality gates and inference economics.",
      projectsTitle: "Projects",
      projectsCopy: "The handbook is the flagship project. Tools and templates grow around it.",
      writingTitle: "Writing",
      writingCopy: "Public writing becomes chapters, checklists and tools inside the handbook.",
      talksTitle: "Talks",
      talksCopy: "Talks and conference material feed the strategy, inference and economics tracks.",
      engagementTitle: "Ways to work",
      engagementCopy: "Clear formats for talks, reviews and executive conversations.",
      authorLabel: "About the author",
      centralSentenceLabel: "Central sentence",
      readMore: "Read more"
    },
    proof: [
      ["Production AI platforms", "LLM · STT · embeddings · agents"],
      ["Self-hosted inference", "vLLM · GPU capacity · routing"],
      ["Quality systems", "Evals · regression · feedback loops"],
      ["Public field notes", "Habr · Telegram · talks"]
    ],
    metrics: [
      "Latency spikes.",
      "Token cost grows.",
      "Prompts break.",
      "Agents loop.",
      "Evals are missing.",
      "Nobody owns quality."
    ],
    authorCopy:
      "I write Production AI Platform Handbook: a practical field guide for teams turning AI demos into production platforms.",
    centralSentence:
      "The materials are public and sanitized: no internal details, but with production taste.",
    engagements: [
      [
        "Architecture review",
        "Review gateway, routing, cache, evals, observability, cost and ownership before they harden into platform debt."
      ],
      [
        "Executive workshop",
        "Align MaaS vs self-hosted strategy, maturity, team responsibilities and the first platform roadmap."
      ],
      ["Talk or podcast", "A practical, non-hype conversation about production AI platform engineering."],
      ["Handbook collaboration", "Turn public field notes, tools and templates into durable handbook artifacts."]
    ]
  },
  pages: {
    about: {
      label: "About",
      title: "Sergei Notevskii",
      copy:
        "AI Platform Lead building production-grade LLM, STT, embeddings and agent platforms. The public work here is about production taste: making AI systems measurable, operable, cost-aware and useful in real products.",
      cards: [
        ["Hard engineering", "Self-hosted inference, vLLM, GPU capacity, model routing, cache and latency."],
        ["Quality systems", "Evals, scenario datasets, feedback loops, regression checks and model release gates."],
        ["Platform leadership", "Operating model, ownership, DevEx, cost review, incident process and sanitized public frameworks."]
      ]
    },
    projects: {
      label: "Projects",
      title: "Public platform knowledge products.",
      copy:
        "The roadmap is intentionally artifact-led: Production AI Platform Map, Prefix Cache Auditor, AI Quality Gate Kit, then the broader handbook."
    },
    writing: {
      label: "Writing",
      title: "Articles, channel notes and handbook chapters.",
      copy:
        "Habr articles and Telegram notes become durable handbook pieces: cache checklists, cost models, agent-loop design, vLLM serving notes and platform strategy.",
      verified: "Verified public links",
      telegram: "Telegram: AI da paren! / Sergei Notevskii",
      habr: "Habr: Ser_no articles"
    },
    talks: {
      label: "Talks",
      title: "Conference and field notes.",
      copy:
        "Talks focus on the hard transition from demos to production: MaaS vs self-hosted, agents, cache economics, vLLM, quality gates and operating model."
    },
    contact: {
      label: "Contact",
      title: "Talks, collaborations and platform conversations.",
      copy:
        "Best fit: production AI platform engineering, self-hosted inference, cache economics, evals, observability, guardrails, operating model and AI platform leadership.",
      cards: [
        ["Telegram", "Channel and comments for AI platform notes."],
        ["Habr", "Long-form Russian articles and series."]
      ]
    }
  },
  projects: [
    [
      "Production AI Platform Handbook",
      "A platform responsibility map for teams moving from API key and demo to inference, routing, evals, cost and ownership.",
      "/handbook"
    ],
    [
      "Prefix Cache Auditor",
      "A client-side diagnostic tool for unstable prefixes, dynamic fields, tool schema drift and cache-aware recommendations.",
      "/tools/prefix-cache-auditor"
    ],
    [
      "AI Quality Gate Kit",
      "A rollout readiness checklist for evals, regression, canary, feedback, fallback and production ownership.",
      "/tools/ai-quality-gate-checklist"
    ]
  ],
  finalCta: {
    label: "Start with the map",
    title: "A model is replaceable. A platform is compounding.",
    copy: "The first release is intentionally small: map, maturity model, core platform layers and practical tools.",
    button: "Open the map"
  },
  tools: {
    label: "Tool",
    prefix: {
      title: "Prefix Cache Auditor",
      copy:
        "Client-side v0 for diagnosing cacheability score, unstable prefix segments, dynamic fields, schema volatility and cache-aware recommendations.",
      formTitle: "Prompt and request shape",
      formDescription: "No external calls. This only inspects text structure locally.",
      fields: ["System prompt", "Tool schema JSON", "Example request 1", "Example request 2"],
      loadStable: "Load stable example",
      resultTitle: "Cacheability score",
      resultDescription: "Estimated risk based on unstable prefix shape, dynamic fields and schema volatility.",
      groups: ["Unstable prefix segments", "Dynamic field warnings", "Tool schema volatility", "Recommendations"],
      noIssue: "No obvious issue detected."
    },
    cost: {
      title: "LLM Cost Calculator",
      copy: "Estimate cost with and without cached input tokens. The goal is effective cost, not list-price token math.",
      formTitle: "Cost model",
      formDescription: "Enter token volume, provider prices and request count. Values are per request unless noted.",
      fields: [
        "Input tokens",
        "Output tokens",
        "Cached input tokens",
        "Request count",
        "Input $ / 1M",
        "Cached input $ / 1M",
        "Output $ / 1M"
      ],
      resultTitle: "Estimated spend",
      resultDescription: "Cache-aware cost compared with raw token pricing.",
      metrics: ["Without cache", "With cache", "Savings", "Savings percent"]
    },
    quality: {
      title: "AI Quality Gate Checklist",
      copy:
        "Interactive local checklist for pre-rollout readiness: evals, regression, canary, observability, fallback and ownership.",
      checklistTitle: "Quality gate checklist",
      checklistDescription: "Local state only. Use it as a pre-rollout readiness review.",
      readinessTitle: "Readiness",
      readinessDescription: "Quality Gate is a process, not one score. This is a lightweight v0 proxy.",
      complete: "checks complete",
      status: "Status",
      statuses: {
        ready: "готово",
        "needs-work": "нужна доработка",
        blocked: "заблокировано"
      },
      items: [
        "Golden dataset exists for the scenario",
        "Error taxonomy is defined",
        "Offline eval suite runs before rollout",
        "Regression checks compare prompt/model versions",
        "Canary rollout has stop criteria",
        "Fallback and rollback path is documented",
        "Traces include tokens, cost, latency and model version",
        "Scenario owner and platform owner are explicit"
      ]
    }
  },
  handbook: {
    home: "Home",
    tools: "Tools",
    writing: "Writing",
    related: "Related chapters",
    matrix: ["Option", "Use when", "Trade-off"],
    maturity: {
      headers: ["Level", "State", "Typical pain"],
      levels: [
        ["0. Demo", "One API key, one scenario", "Nothing is measured"],
        ["1. Product Integration", "AI embedded in product", "Quality and cost are weakly controlled"],
        ["2. Gateway", "Unified API layer", "Model lifecycle is still ad hoc"],
        ["3. Quality Gate", "Evals, datasets and regression", "Model releases slow down"],
        ["4. Self-hosted / Hybrid", "Own models plus MaaS", "Capacity, GPU cost and reliability"],
        ["5. AI Platform", "Lifecycle, observability and governance", "Ownership must scale"],
        ["6. AI-native org", "AI in product and SDLC operations", "Roles, process and economics change"]
      ]
    }
  }
};

const ruDictionary = {
  language: {
    current: "Русский",
    alternate: "EN",
    switchTo: "English version"
  },
  shell: {
    startReading: "Читать",
    openNavigation: "Открыть навигацию",
    navigation: "Навигация",
    footerLine: "от API-ключа к платформе",
    contact: "Контакты"
  },
  home: {
    hero: {
      badge: "AI Platform Lead",
      title: "Sergei Notevskii",
      copy:
        "Строю AI-платформы для production: LLM, STT, embeddings, агенты, инференс, оценка качества, защитные контуры, наблюдаемость, стоимость и ответственность.",
      start: "Открыть хэндбук",
      map: "Карта платформы",
      projects: "Связаться",
      mapVersion: "От API-ключа к платформе",
      layers: [
        "API-ключ / демо",
        "Gateway",
        "Маршрутизация / инференс / кеш",
        "Оценка качества / наблюдаемость / стоимость",
        "Защитные контуры / ответственность"
      ]
    },
    sections: {
      proofTitle: "Почему мне можно доверять",
      proofCopy: "Публичные, очищенные заметки из production-контекста.",
      problemTitle: "После демо",
      problemCopy: "Демо работает. Потом начинается production.",
      layersTitle: "Слои платформы",
      layersCopy: "Хэндбук устроен вокруг ответственности платформы, а не вокруг хайпа.",
      expertiseTitle: "Где я полезен",
      expertiseCopy: "Разбор архитектуры, стратегия платформы, контроль качества и экономика инференса.",
      projectsTitle: "Проекты",
      projectsCopy: "Хэндбук - главный проект. Вокруг него растут инструменты и шаблоны.",
      writingTitle: "Тексты",
      writingCopy: "Публичные статьи становятся главами, чеклистами и инструментами внутри хэндбука.",
      talksTitle: "Выступления",
      talksCopy: "Доклады становятся главами про стратегию, инференс и экономику.",
      engagementTitle: "Форматы взаимодействия",
      engagementCopy: "Понятные форматы для докладов, разборов и разговоров на уровне руководства.",
      authorLabel: "Об авторе",
      centralSentenceLabel: "Центральная фраза",
      readMore: "Подробнее"
    },
    proof: [
      ["Production AI-платформы", "LLM · STT · embeddings · агенты"],
      ["Свой инференс", "vLLM · GPU · маршрутизация"],
      ["Системы качества", "Оценки · регрессии · обратная связь"],
      ["Публичные материалы", "Habr · Telegram · доклады"]
    ],
    metrics: [
      "Задержка скачет.",
      "Стоимость токенов растёт.",
      "Промпты ломаются.",
      "Агенты уходят в цикл.",
      "Оценки качества нет.",
      "Владелец качества размыт."
    ],
    authorCopy:
      "Я пишу Production AI Platform Handbook: практический хэндбук для команд, которые превращают AI-демо в production-платформу.",
    centralSentence:
      "Материалы публичные и очищенные: без внутренних деталей, но с production-вкусом.",
    engagements: [
      [
        "Разбор архитектуры",
        "Проверка AI Gateway, маршрутизации, кеша, качества, наблюдаемости, стоимости и ответственности до того, как это станет платформенным долгом."
      ],
      [
        "Рабочая сессия для руководства",
        "Синхронизация стратегии MaaS vs self-hosted, зрелости платформы, ответственности команды и первого плана развития."
      ],
      ["Доклад или подкаст", "Практичный разговор о production AI-платформах без хайпа."],
      ["Коллаборация по хэндбуку", "Превращение публичных заметок, инструментов и шаблонов в устойчивые материалы хэндбука."]
    ]
  },
  pages: {
    about: {
      label: "Об авторе",
      title: "Sergei Notevskii",
      copy:
        "AI Platform Lead. Строю AI-платформы для production: LLM, STT, embeddings и агенты. Публичная работа здесь про production-вкус: как делать AI-системы измеримыми, управляемыми, экономичными и полезными в реальных продуктах.",
      cards: [
        ["Инженерная глубина", "Свой инференс, vLLM, GPU, маршрутизация моделей, кеш и задержка."],
        ["Системы качества", "Проверочные датасеты, обратная связь, регрессионные проверки и контроль релиза моделей."],
        ["Платформенное лидерство", "Операционная модель, ответственность, опыт разработчиков, разбор стоимости, инциденты и очищенные публичные модели."]
      ]
    },
    projects: {
      label: "Проекты",
      title: "Публичные артефакты про AI-платформы.",
      copy:
        "План строится вокруг артефактов: карта Production AI Platform, Prefix Cache Auditor, набор проверок качества ИИ, затем полный хэндбук."
    },
    writing: {
      label: "Тексты",
      title: "Статьи, заметки в канале и главы хэндбука.",
      copy:
        "Статьи на Habr и заметки в Telegram становятся материалами хэндбука: чеклисты кеша, модели стоимости, дизайн агентского цикла, заметки про запуск vLLM и стратегию платформы.",
      verified: "Проверенные публичные ссылки",
      telegram: "Telegram: AI да парен! / Sergei Notevskii",
      habr: "Habr: статьи Ser_no"
    },
    talks: {
      label: "Выступления",
      title: "Конференции и технические заметки.",
      copy:
        "Доклады про трудный переход от демо к production: MaaS vs self-hosted, агенты, экономика кеша, vLLM, контроль качества и операционная модель."
    },
    contact: {
      label: "Контакты",
      title: "Доклады, коллаборации и разговоры про платформы.",
      copy:
        "Лучшее пересечение: проектирование production AI-платформ, self-hosted инференс, экономика кеша, проверка качества, наблюдаемость, защитные контуры, операционная модель и платформенное лидерство.",
      cards: [
        ["Telegram", "Канал и комментарии про AI-платформы."],
        ["Habr", "Большие статьи и серии на русском."]
      ]
    }
  },
  projects: [
    [
      "Production AI Platform Handbook",
      "Карта платформенной ответственности для команд, которые идут от API-ключа и демо к инференсу, маршрутизации, оценке качества, стоимости и владельцам.",
      "/handbook"
    ],
    [
      "Prefix Cache Auditor",
      "Локальный инструмент для поиска нестабильного префикса, динамических полей, дрейфа схем инструментов и рекомендаций по кешу.",
      "/tools/prefix-cache-auditor"
    ],
    [
      "Набор проверок качества ИИ",
      "Чеклист готовности к выкатке: проверка качества, регрессии, канареечная выкатка, обратная связь, резервный маршрут и ответственность.",
      "/tools/ai-quality-gate-checklist"
    ]
  ],
  finalCta: {
    label: "Начни с карты",
    title: "Модель заменяема. Платформа накапливает эффект.",
    copy: "Первый релиз намеренно небольшой: карта, модель зрелости, основные слои платформы и практические инструменты.",
    button: "Открыть карту"
  },
  tools: {
    label: "Инструмент",
    prefix: {
      title: "Prefix Cache Auditor",
      copy:
        "Локальная v0-версия для оценки кешируемости, нестабильных префиксов, динамических полей и дрейфа схем.",
      formTitle: "Промпт и форма запроса",
      formDescription: "Без внешних вызовов. Инструмент локально анализирует только структуру текста.",
      fields: ["Системный промпт", "JSON-схема инструментов", "Пример запроса 1", "Пример запроса 2"],
      loadStable: "Загрузить стабильный пример",
      resultTitle: "Оценка кешируемости",
      resultDescription: "Оценка риска по форме префикса, динамическим полям и дрейфу схем.",
      groups: ["Нестабильные сегменты префикса", "Предупреждения о динамических полях", "Дрейф схемы инструментов", "Рекомендации"],
      noIssue: "Явных проблем не найдено."
    },
    cost: {
      title: "LLM Cost Calculator",
      copy: "Оценивает стоимость с кешированными входными токенами и без них. Цель - реальная стоимость, а не цена токенов в прайсе.",
      formTitle: "Модель стоимости",
      formDescription: "Укажи объём токенов, цены провайдера и число запросов. Значения считаются на один запрос, если не указано иначе.",
      fields: [
        "Входные токены",
        "Выходные токены",
        "Кешированные входные токены",
        "Число запросов",
        "Вход $ / 1M",
        "Кешированный вход $ / 1M",
        "Выход $ / 1M"
      ],
      resultTitle: "Оценка расходов",
      resultDescription: "Стоимость с учётом кеша в сравнении с обычным расчётом по токенам.",
      metrics: ["Без кеша", "С кешем", "Экономия", "Процент экономии"]
    },
    quality: {
      title: "Чеклист контроля качества ИИ",
      copy:
        "Локальный чеклист готовности к выкатке: проверка качества, регрессии, канареечная выкатка, наблюдаемость, резервный маршрут и ответственность.",
      checklistTitle: "Чеклист контроля качества",
      checklistDescription: "Только локальное состояние. Используй перед выкаткой.",
      readinessTitle: "Готовность",
      readinessDescription: "Контроль качества перед релизом - это процесс, а не одна оценка. Здесь лёгкая v0-проверка.",
      complete: "проверок закрыто",
      status: "Статус",
      statuses: {
        ready: "готово",
        "needs-work": "нужна доработка",
        blocked: "заблокировано"
      },
      items: [
        "Эталонный датасет есть для сценария",
        "Таксономия ошибок определена",
        "Набор проверок запускается до выкатки",
        "Регрессионные проверки сравнивают версии промпта и модели",
        "Канареечная выкатка имеет критерии остановки",
        "Резервный маршрут и путь отката описаны",
        "Трейсы включают токены, стоимость, задержку и версию модели",
        "Владелец сценария и владелец платформы явно определены"
      ]
    }
  },
  handbook: {
    home: "Главная",
    tools: "Инструменты",
    writing: "Тексты",
    related: "Связанные главы",
    matrix: ["Вариант", "Когда использовать", "Компромисс"],
    maturity: {
      headers: ["Уровень", "Состояние", "Типичная боль"],
      levels: [
        ["0. Demo", "Один API-ключ, один сценарий", "Ничего не измеряется"],
        ["1. Продуктовая интеграция", "AI встроен в продукт", "Качество и стоимость слабо контролируются"],
        ["2. Gateway", "Единый API-слой", "Жизненный цикл модели всё ещё хаотичен"],
        ["3. Контроль качества", "Датасеты, оценки и регрессии", "Релизы моделей замедляются"],
        ["4. Self-hosted / Hybrid", "Свои модели плюс MaaS", "Мощность, стоимость GPU и надёжность"],
        ["5. AI Platform", "Жизненный цикл, наблюдаемость и управление", "Ответственность нужно масштабировать"],
        ["6. AI-native org", "AI в продукте и SDLC-процессах", "Меняются роли, процессы и экономика"]
      ]
    }
  }
};
