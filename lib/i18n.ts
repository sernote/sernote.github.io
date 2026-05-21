export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ru";
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === "en") {
    return normalized === "/ru" ? "/" : normalized.replace(/^\/ru(?=\/|$)/, "") || "/";
  }

  const withoutLocale = normalized.replace(/^\/ru(?=\/|$)/, "") || "/";
  return withoutLocale === "/" ? "/ru" : `/ru${withoutLocale}`;
}

export function alternateLocalePath(path: string, locale: Locale): string {
  return localizedPath(path, locale === "en" ? "ru" : "en");
}

export const siteLinks = {
  telegram: "https://t.me/s/sergeinotevskii",
  habr: "https://habr.com/ru/users/Ser_no/articles/"
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sernote.github.io";

export function getSiteConfig(locale: Locale = defaultLocale) {
  return {
    name: "Production AI Platform Handbook",
    author: "Sergei Notevskii",
    role: locale === "ru" ? "AI Platform Lead" : "AI Platform Lead",
    url: siteUrl,
    description:
      locale === "ru"
        ? "Практический field guide по production AI-платформам: inference, routing, cache, evals, guardrails, observability, cost, incidents и ownership."
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
          { href: "/tools/prefix-cache-auditor", label: "Инструменты" },
          { href: "/writing", label: "Тексты" },
          { href: "/talks", label: "Выступления" },
          { href: "/contact", label: "Контакты" }
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/handbook", label: "Handbook" },
          { href: "/tools/prefix-cache-auditor", label: "Tools" },
          { href: "/writing", label: "Writing" },
          { href: "/talks", label: "Talks" },
          { href: "/contact", label: "Contact" }
        ];

  return items.map((item) => ({ ...item, href: localizedPath(item.href, locale) }));
}

export function getExpertiseAreas(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        "AI Platform",
        "Self-hosted inference",
        "vLLM и GPU capacity",
        "Model routing и fallback",
        "Экономика prefix cache",
        "Evals и quality gates",
        "LLM observability",
        "Guardrails и ownership"
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
          description: "Scenario intake, пользовательская ценность, риск-профиль и acceptance criteria."
        },
        {
          title: "AI Gateway",
          description: "Единый API-слой для auth, quotas, routing, policy и cost attribution."
        },
        {
          title: "Provider strategy",
          description: "MaaS, OpenRouter-style research loop, self-hosted и hybrid decisions."
        },
        {
          title: "Inference runtime",
          description: "Serving LLM, STT, embeddings и rerankers с бюджетами throughput и latency."
        },
        {
          title: "Routing и cache",
          description: "Model aliases, fallback, prompt cache, prefix cache и KV-cache reuse."
        },
        {
          title: "Quality gate",
          description: "Datasets, eval suites, regression checks, canary rollout и feedback loops."
        },
        {
          title: "Observability",
          description: "Traces, tokens, TTFT, TPOT, cost, fallback events, safety events и feedback."
        },
        {
          title: "Operating model",
          description: "Ownership, SLO, incidents, capacity planning, runbooks и platform DevEx."
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
          title: "Inference runtime",
          description: "LLM, STT, embeddings and reranker serving with throughput and latency budgets."
        },
        {
          title: "Routing and cache",
          description: "Model aliases, fallback, prompt cache, prefix cache and KV-cache reuse."
        },
        {
          title: "Quality gate",
          description: "Datasets, eval suites, regression checks, canary rollout and feedback loops."
        },
        {
          title: "Observability",
          description: "Traces, tokens, TTFT, TPOT, cost, fallback events, safety events and feedback."
        },
        {
          title: "Operating model",
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
            description: "Responsibility-first карта: от сценариев к gateway, inference, evals и ownership."
          },
          {
            title: "AI Platform Maturity Model",
            href: "/handbook/maturity-model",
            description: "Leadership-фреймворк от одного API-ключа до AI-native operating model."
          },
          {
            title: "MaaS vs Self-hosted",
            href: "/handbook/strategy/maas-vs-self-hosted",
            description: "Стратегия выбора managed, self-hosted или hybrid serving."
          },
          {
            title: "Prefix Cache",
            href: "/handbook/caching/prefix-cache",
            description: "Как stable prefixes, tool schemas и routing определяют effective LLM cost."
          },
          {
            title: "AI Quality Gate",
            href: "/handbook/evals/ai-quality-gate",
            description: "Rollout loop, который не даёт качеству незаметно деградировать."
          },
          {
            title: "LLM Observability Checklist",
            href: "/handbook/observability/llm-observability-checklist",
            description: "Минимальная telemetry для debug model, prompt, cost, latency и outcome."
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
          description: "Agent loops, стабильность tool list, allowed tools и cache-aware prompt design."
        },
        {
          title: "7 анти-паттернов prefix cache",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1016734/",
          description: "Timestamp drift, плавающий порядок tools, round-robin routing и lifetime KV-cache."
        },
        {
          title: "Effective cost with cache",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1008320/",
          description: "Почему model choice надо считать через cache-aware economics, а не только list prices."
        },
        {
          title: "AI да парен!",
          source: "Telegram",
          href: siteLinks.telegram,
          description: "Заметки про AI platform engineering, tools, vLLM, agent systems и production trade-offs."
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
            "Практический доклад о том, как стать внутренним model provider, какие trade-offs есть у self-hosted и какие мифы надо снять до миграции."
        },
        {
          title: "AI agents без тумана",
          venue: "Internal AI conference / Habr follow-up",
          description: "Рабочая модель, которая разделяет LLM calls, workflows и agent loops."
        },
        {
          title: "Экономика prefix cache",
          venue: "Public article series",
          description:
            "Повторяемый способ debug-ить, почему cache hit rate, effective cost и latency меняются после безобидных правок."
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
      badge: "Production AI Platform",
      title: "AI Platform Lead building production-grade LLM, STT, embeddings and agent platforms.",
      copy:
        "I write and speak about turning AI demos into production platforms: inference, routing, caching, evals, guardrails, observability, cost and ownership.",
      start: "Start reading",
      map: "Open platform map",
      projects: "View projects",
      mapVersion: "Platform map v0.1",
      layers: [
        "Product use cases",
        "AI Gateway / API Layer",
        "Provider strategy",
        "Inference runtime",
        "Routing / Cache",
        "Evals / Quality Gate",
        "Observability / Cost",
        "Guardrails / Security",
        "Operations / Ownership"
      ]
    },
    sections: {
      problemTitle: "The problem after the demo",
      problemCopy:
        "The expensive part starts after the first successful LLM call: ownership, latency, routing, evals, cache, cost, policy, incidents and product integration.",
      layersTitle: "Platform layers",
      layersCopy: "The handbook is organized by platform responsibility, not by hype cycle.",
      expertiseTitle: "Expertise",
      expertiseCopy: "The site packages the public surface around production AI platform engineering.",
      projectsTitle: "Projects",
      projectsCopy: "Map first, then tools, then the full handbook.",
      writingTitle: "Writing",
      writingCopy: "Public writing becomes chapters, checklists and tools inside the handbook.",
      talksTitle: "Talks",
      talksCopy: "Talks and conference material feed the strategy, inference and economics tracks.",
      authorLabel: "About the author",
      centralSentenceLabel: "Central sentence",
      readMore: "Read more"
    },
    metrics: [
      "Model choice is not a platform strategy.",
      "A cheaper model can be more expensive after cache misses and retries.",
      "Quality needs a gate before model and prompt releases.",
      "Observability must connect prompts, tokens, cost, latency and outcomes."
    ],
    authorCopy:
      "AI Platform Lead focused on production-grade LLM, STT, embeddings and agent platforms: self-hosted inference, routing, caching, evals, observability, guardrails, cost and operating model.",
    centralSentence:
      "I write Production AI Platform Handbook, a practical map for people building LLM platforms in production."
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
      badge: "Production AI Platform",
      title: "AI Platform Lead, который строит production-grade LLM, STT, embeddings и agent platforms.",
      copy:
        "Я пишу и выступаю о том, как превращать AI-демо в production-платформы: inference, routing, caching, evals, guardrails, observability, cost и ownership.",
      start: "Начать читать",
      map: "Открыть карту платформы",
      projects: "Смотреть проекты",
      mapVersion: "Карта платформы v0.1",
      layers: [
        "Продуктовые сценарии",
        "AI Gateway / API Layer",
        "Provider strategy",
        "Inference runtime",
        "Routing / Cache",
        "Evals / Quality Gate",
        "Observability / Cost",
        "Guardrails / Security",
        "Operations / Ownership"
      ]
    },
    sections: {
      problemTitle: "Проблема после демо",
      problemCopy:
        "Дорогая часть начинается после первого успешного LLM-вызова: ownership, latency, routing, evals, cache, cost, policy, incidents и product integration.",
      layersTitle: "Слои платформы",
      layersCopy: "Хэндбук организован вокруг платформенной ответственности, а не вокруг hype cycle.",
      expertiseTitle: "Экспертиза",
      expertiseCopy: "Сайт собирает публичный контур вокруг production AI platform engineering.",
      projectsTitle: "Проекты",
      projectsCopy: "Сначала карта, затем инструменты, затем полный хэндбук.",
      writingTitle: "Тексты",
      writingCopy: "Публичные статьи становятся главами, чеклистами и инструментами внутри хэндбука.",
      talksTitle: "Выступления",
      talksCopy: "Доклады питают треки strategy, inference и economics.",
      authorLabel: "Об авторе",
      centralSentenceLabel: "Центральная фраза",
      readMore: "Подробнее"
    },
    metrics: [
      "Выбор модели сам по себе не является platform strategy.",
      "Более дешёвая модель может оказаться дороже после cache misses и retries.",
      "Качеству нужен gate до релиза модели или промпта.",
      "Observability должна связывать prompts, tokens, cost, latency и outcomes."
    ],
    authorCopy:
      "AI Platform Lead, сфокусированный на production-grade LLM, STT, embeddings и agent platforms: self-hosted inference, routing, caching, evals, observability, guardrails, cost и operating model.",
    centralSentence:
      "Я пишу Production AI Platform Handbook: практическую карту для тех, кто строит LLM-платформы в production."
  },
  pages: {
    about: {
      label: "Об авторе",
      title: "Sergei Notevskii",
      copy:
        "AI Platform Lead, который строит production-grade LLM, STT, embeddings и agent platforms. Публичная работа здесь про production-вкус: делать AI-системы измеримыми, эксплуатируемыми, cost-aware и полезными в реальных продуктах.",
      cards: [
        ["Hard engineering", "Self-hosted inference, vLLM, GPU capacity, model routing, cache и latency."],
        ["Quality systems", "Evals, scenario datasets, feedback loops, regression checks и model release gates."],
        ["Platform leadership", "Operating model, ownership, DevEx, cost review, incident process и sanitized public frameworks."]
      ]
    },
    projects: {
      label: "Проекты",
      title: "Публичные platform knowledge products.",
      copy:
        "Roadmap намеренно строится вокруг артефактов: Production AI Platform Map, Prefix Cache Auditor, AI Quality Gate Kit, затем полный handbook."
    },
    writing: {
      label: "Тексты",
      title: "Статьи, заметки в канале и главы хэндбука.",
      copy:
        "Статьи на Habr и заметки в Telegram становятся устойчивыми материалами хэндбука: cache checklists, cost models, agent-loop design, vLLM serving notes и platform strategy.",
      verified: "Проверенные публичные ссылки",
      telegram: "Telegram: AI да парен! / Sergei Notevskii",
      habr: "Habr: статьи Ser_no"
    },
    talks: {
      label: "Выступления",
      title: "Конференции и field notes.",
      copy:
        "Доклады фокусируются на трудном переходе от demos к production: MaaS vs self-hosted, agents, cache economics, vLLM, quality gates и operating model."
    },
    contact: {
      label: "Контакты",
      title: "Доклады, коллаборации и разговоры про платформы.",
      copy:
        "Лучшее пересечение: production AI platform engineering, self-hosted inference, cache economics, evals, observability, guardrails, operating model и AI platform leadership.",
      cards: [
        ["Telegram", "Канал и комментарии для заметок про AI platform."],
        ["Habr", "Long-form статьи и серии на русском."]
      ]
    }
  },
  projects: [
    [
      "Production AI Platform Handbook",
      "Карта платформенной ответственности для команд, которые идут от API key и demo к inference, routing, evals, cost и ownership.",
      "/handbook"
    ],
    [
      "Prefix Cache Auditor",
      "Client-side diagnostic tool для unstable prefixes, dynamic fields, tool schema drift и cache-aware recommendations.",
      "/tools/prefix-cache-auditor"
    ],
    [
      "AI Quality Gate Kit",
      "Checklist готовности rollout: evals, regression, canary, feedback, fallback и production ownership.",
      "/tools/ai-quality-gate-checklist"
    ]
  ],
  finalCta: {
    label: "Начни с карты",
    title: "Модель заменяема. Платформа накапливает эффект.",
    copy: "Первый релиз намеренно небольшой: карта, maturity model, основные слои платформы и практические инструменты.",
    button: "Открыть карту"
  },
  tools: {
    label: "Инструмент",
    prefix: {
      title: "Prefix Cache Auditor",
      copy:
        "Client-side v0 для диагностики cacheability score, unstable prefix segments, dynamic fields, schema volatility и cache-aware recommendations.",
      formTitle: "Prompt и форма request",
      formDescription: "Без внешних вызовов. Инструмент локально анализирует только структуру текста.",
      fields: ["System prompt", "Tool schema JSON", "Example request 1", "Example request 2"],
      loadStable: "Загрузить стабильный пример",
      resultTitle: "Cacheability score",
      resultDescription: "Оценка риска по unstable prefix shape, dynamic fields и schema volatility.",
      groups: ["Нестабильные prefix segments", "Предупреждения о dynamic fields", "Volatility tool schema", "Рекомендации"],
      noIssue: "Явных проблем не найдено."
    },
    cost: {
      title: "LLM Cost Calculator",
      copy: "Оценивает стоимость с cached input tokens и без них. Цель - effective cost, а не list-price token math.",
      formTitle: "Cost model",
      formDescription: "Укажи token volume, provider prices и request count. Значения считаются per request, если не указано иначе.",
      fields: [
        "Input tokens",
        "Output tokens",
        "Cached input tokens",
        "Request count",
        "Input $ / 1M",
        "Cached input $ / 1M",
        "Output $ / 1M"
      ],
      resultTitle: "Оценка расходов",
      resultDescription: "Cache-aware cost в сравнении с raw token pricing.",
      metrics: ["Без cache", "С cache", "Экономия", "Процент экономии"]
    },
    quality: {
      title: "AI Quality Gate Checklist",
      copy:
        "Интерактивный локальный checklist для pre-rollout readiness: evals, regression, canary, observability, fallback и ownership.",
      checklistTitle: "Quality gate checklist",
      checklistDescription: "Только local state. Используй как pre-rollout readiness review.",
      readinessTitle: "Готовность",
      readinessDescription: "Quality Gate - это процесс, а не один score. Здесь лёгкая v0-прокси.",
      complete: "проверок закрыто",
      status: "Статус",
      statuses: {
        ready: "ready",
        "needs-work": "needs work",
        blocked: "blocked"
      },
      items: [
        "Golden dataset существует для сценария",
        "Error taxonomy определена",
        "Offline eval suite запускается до rollout",
        "Regression checks сравнивают prompt/model versions",
        "Canary rollout имеет stop criteria",
        "Fallback и rollback path задокументированы",
        "Traces включают tokens, cost, latency и model version",
        "Scenario owner и platform owner явно определены"
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
        ["0. Demo", "Один API key, один сценарий", "Ничего не измеряется"],
        ["1. Product Integration", "AI встроен в продукт", "Качество и cost слабо контролируются"],
        ["2. Gateway", "Единый API layer", "Model lifecycle всё ещё ad hoc"],
        ["3. Quality Gate", "Evals, datasets и regression", "Релизы моделей замедляются"],
        ["4. Self-hosted / Hybrid", "Свои модели плюс MaaS", "Capacity, GPU cost и reliability"],
        ["5. AI Platform", "Lifecycle, observability и governance", "Ownership нужно масштабировать"],
        ["6. AI-native org", "AI в продукте и SDLC operations", "Меняются роли, процессы и экономика"]
      ]
    }
  }
};
