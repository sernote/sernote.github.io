import { RU_PRIMARY_NAV } from "@/lib/site-routes";

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
  telegramDm: "https://t.me/sergeinotevskii",
  habr: "https://habr.com/ru/users/Ser_no/articles/",
  auditPromptCaching: "https://github.com/sernote/audit-prompt-caching",
  talkUral: "https://www.youtube.com/live/2RvzgMYrX0o?si=TrgfDk2wVLht-I6k&t=11102",
  talkRoii: "https://youtu.be/RHbbeHKGh6I",
  podcastSmallTalk: "https://www.youtube.com/watch?v=NrvGciRm8Ps&t=1992s"
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://notevskii.tech";

export function getSiteConfig(locale: Locale = defaultLocale) {
  return {
    name: locale === "ru" ? "Сергей Нотевский" : "Sergei Notevskii",
    author: locale === "ru" ? "Сергей Нотевский" : "Sergei Notevskii",
    role: locale === "ru" ? "AI Platform Lead" : "AI Platform Lead",
    url: siteUrl,
    description:
      locale === "ru"
        ? "Личная инженерная публикация о production AI platforms: архитектуре, инференсе, качестве, стоимости и эксплуатации."
        : "A personal engineering publication about production AI platforms, public work and the decisions behind reliable AI systems.",
    links: siteLinks
  };
}

export function getNavItems(locale: Locale = defaultLocale) {
  const items =
    locale === "ru"
      ? RU_PRIMARY_NAV
      : [
          { href: "/", label: "Home" },
          { href: "/handbook", label: "Handbook" },
          { href: "/tools", label: "Tools" },
          { href: "/writing", label: "Writing" },
          { href: "/talks", label: "Talks" },
          { href: "/projects", label: "Projects" },
          { href: "/about", label: "About" }
        ];

  return items.map((item) => ({ ...item, href: localizedPath(item.href, locale) }));
}

export function getExpertiseAreas(locale: Locale = defaultLocale) {
  return locale === "ru"
    ? [
        "ИИ-платформы",
        "Свой инференс",
        "vLLM и GPU",
        "Маршрутизация пути исполнения",
        "Экономика кеша префикса",
        "Оценка качества и релизный контроль",
        "Наблюдаемость LLM",
        "Защитные контуры и ответственность"
      ]
    : [
        "AI Platform",
        "Self-hosted inference",
        "vLLM and GPU capacity",
        "Execution-path routing",
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
          title: "Маршрутизация пути исполнения",
          description: "Выбор пути: маленькая модель, большая модель, RAG, агент, ручная проверка или отказ по политике."
        },
        {
          title: "Среда инференса",
          description: "Запуск LLM, STT, эмбеддингов и моделей ранжирования с бюджетами задержки и пропускной способности."
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
          title: "Execution-path routing",
          description: "Choosing the lane: small model, large model, RAG, agent, human review or policy denial."
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
            title: "Модель зрелости ИИ-платформы",
            href: "/handbook/maturity-model",
            description: "Модель зрелости: от одного API-ключа до зрелой ИИ-платформы."
          },
          {
            title: "MaaS vs Self-hosted",
            href: "/handbook/strategy/maas-vs-self-hosted",
            description: "Как выбирать MaaS, self-hosted или гибридный инференс."
          },
          {
            title: "Semantic Router",
            href: "/handbook/gateway/semantic-router",
            description: "Как выбирать путь исполнения: direct, RAG, agentic или ручная проверка."
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
            title: "Semantic Router",
            href: "/handbook/gateway/semantic-router",
            description: "How to choose direct, RAG, agentic or human-review execution."
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
          title: "Короткий промпт не значит дешёвый",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1033822/",
          description: "Циклы агентов, стабильный список инструментов и промпт, который не ломает кеш."
        },
        {
          title: "Кеш префикса: 7 анти-паттернов",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1016734/",
          description: "Метки времени, плавающий порядок инструментов, круговая маршрутизация и срок жизни KV-cache."
        },
        {
          title: "Стоимость модели с учётом кеша",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/1008320/",
          description: "Почему выбор модели нельзя считать только по цене токенов."
        },
        {
          title: "Agent Skills: больше, чем папка с промптами",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/980654/",
          description: "Как навыки агентов связаны с инструментами, RAG, MCP и архитектурой агентных систем."
        },
        {
          title: "Почему миллион токенов не решает проблему контекста",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/976528/",
          description: "Рабочий контекст, деградация качества и границы длинных контекстных окон."
        },
        {
          title: "ИИ-агенты на примере Deep Research",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/971930/",
          description: "Чем отличаются одиночный вызов LLM, процесс, RAG и агентный цикл."
        },
        {
          title: "Как стиль ответа влияет на рейтинг LLM",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/904092/",
          description: "Почему выбор модели нельзя сводить к красивой форме ответа."
        },
        {
          title: "Как выбирать LLM для продукта",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/850614/",
          description: "Контекст, качество, стоимость, юрисдикция и другие параметры выбора модели."
        },
        {
          title: "AI да парен!",
          source: "Telegram",
          href: siteLinks.telegram,
          description: "Заметки про ИИ-платформы, vLLM, агентов и работу в боевой эксплуатации."
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
          title: "Agent Skills are more than a prompt folder",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/980654/",
          description: "How agent skills relate to tools, RAG, MCP and agent architecture."
        },
        {
          title: "Why one million tokens do not solve context",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/976528/",
          description: "Working context, quality decay and the limits of long context windows."
        },
        {
          title: "AI agents explained with Deep Research",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/971930/",
          description: "How LLM calls, workflows, RAG and agent loops differ in practice."
        },
        {
          title: "How answer style changes LLM rankings",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/904092/",
          description: "Why model choice should not be reduced to polished answer style."
        },
        {
          title: "How to choose an LLM for a product",
          source: "Habr",
          href: "https://habr.com/ru/companies/bitrix/articles/850614/",
          description: "Context, quality, cost, jurisdiction and other model-selection parameters."
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
          title: "Свои ИИ-модели или API по подписке?",
          venue: "Конференция ROИИ",
          description:
            "Доклад про выбор между MaaS, self-hosted и гибридной стратегией для продуктовой ИИ-платформы.",
          href: siteLinks.talkRoii
        },
        {
          title: "Управление разработкой",
          venue: "Ural Digital Weekend 2025",
          description: "Секция про управление разработкой. Ссылка ведёт сразу на фрагмент с выступлением.",
          href: siteLinks.talkUral
        },
        {
          title: "Как выбрать нейросеть",
          venue: "Small talk с техдиром",
          description:
            "Подкаст про практический выбор моделей, ограничения, стоимость и внедрение в продукт.",
          href: siteLinks.podcastSmallTalk
        }
      ]
    : [
        {
          title: "Own AI models or subscription API?",
          venue: "ROII Conference",
          description:
            "A talk about choosing between MaaS, self-hosted and hybrid strategy for a product AI platform.",
          href: siteLinks.talkRoii
        },
        {
          title: "Engineering management",
          venue: "Ural Digital Weekend 2025",
          description: "A software engineering management section. The link opens the relevant talk timestamp.",
          href: siteLinks.talkUral
        },
        {
          title: "How to choose an AI model",
          venue: "Small talk podcast",
          description: "A podcast on practical model choice, constraints, cost and product adoption.",
          href: siteLinks.podcastSmallTalk
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
    footerLine: "Sergei Notevskii · production AI platforms",
    contact: "Contact"
  },
  home: {
    hero: {
      badge: "AI Platform Lead",
      title: "Sergei Notevskii",
      copy:
      "I build AI platforms that work in production: LLM, STT, embeddings, agents, inference, evals, observability, cost and ownership. I write Production AI Platform Handbook: a practical map of what starts after the demo.",
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
      proofTitle: "Practice",
      proofCopy: "Field notes from production AI platform work: sanitized, practical and focused on engineering decisions.",
      problemTitle: "After the demo",
      problemCopy: "The demo works. Platform questions start next.",
      layersTitle: "Flagship project",
      layersCopy: "A practical handbook for teams moving from API key and demo to production AI platform. Inside: a 12-layer map, chapters, checklists, tools and templates.",
      projectsTitle: "Public work",
      projectsCopy: "Handbook pages, tools, articles and talks that make the platform practice reusable.",
      writingTitle: "Writing",
      writingCopy: "Long-form Habr articles and short Telegram notes.",
      talksTitle: "Talks",
      talksCopy: "Videos and podcasts about model choice, platform strategy and engineering work.",
      engagementTitle: "Where I am useful",
      engagementCopy: "Architecture review, platform strategy, talks and practical collaboration.",
      authorLabel: "About the author",
      centralSentenceLabel: "Central sentence",
      readMore: "Read more"
    },
    proof: [
      ["AI platform", "LLM · STT · embeddings · agents"],
      ["Self-hosted inference", "vLLM · GPU · routing · cache"],
      ["Quality", "Evals · regression · feedback loops"],
      ["Economics", "Scenario cost · prefix cache · tokens"],
      ["Public artifacts", "Habr · talks · open-source"]
    ],
    metrics: [
      "Latency spikes.",
      "Token cost grows.",
      "Prompts break.",
      "Agents get stuck in loops.",
      "Evals are missing.",
      "Nobody owns quality."
    ],
    authorCopy:
      "I am Sergei Notevskii, AI Platform Lead. I work across platform architecture, inference, quality systems, observability and AI economics. This site is the public layer of that practice: notes, tools, templates and handbook material without internal details.",
    centralSentence:
      "A model is replaceable. A platform compounds.",
    engagements: [
      [
        "Architecture review",
        "AI Gateway, routing, cache, inference, evals, observability, cost and ownership."
      ],
      [
        "Strategy session",
        "MaaS vs self-hosted, AI platform maturity, ownership boundaries and first roadmap."
      ],
      ["Talk or podcast", "A practical conversation about production AI without hype: inference, evals, prefix cache, economics and guardrails."],
      ["Collaboration", "Handbook, open-source tools, templates and joint public materials."]
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
      title: "Writing about production AI platforms.",
      copy:
        "I write about what starts after the demo: cache, cost, inference, agents, quality, observability and ownership.",
      verified: "How this section works",
      telegram: "Telegram",
      habr: "Habr"
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
      "audit-prompt-caching",
      "An open-source diagnostic package for prompt and prefix cache audits: stable layout, volatile fields and cache-aware recommendations.",
      siteLinks.auditPromptCaching
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
      copy: "Estimate cost with cached input tokens, agent steps, retries and cost per accepted result. The goal is effective cost, not list-price token math.",
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
        "Semantic router is checked for false direct and false agentic",
        "Long-context scenarios are checked for distractors, conflicting facts and stale context",
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
    footerLine: "Сергей Нотевский · production AI platforms",
    contact: "Контакты"
  },
  home: {
    hero: {
      badge: "AI Platform Lead",
      title: "Сергей Нотевский",
      copy:
        "Строю ИИ-платформы, которые работают в продакшене: LLM, STT, эмбеддинги, агенты, инференс, оценка качества, наблюдаемость, стоимость и ответственность. Пишу Production AI Platform Handbook — практическую карту того, что начинается после демо.",
      start: "Открыть хэндбук",
      map: "Карта платформы",
      projects: "Связаться",
      mapVersion: "От API-ключа к платформе",
      layers: [
        "API-ключ / демо",
        "AI Gateway",
        "Маршрутизация / инференс / кеш",
        "Оценка качества / наблюдаемость / стоимость",
        "Защита / ответственность"
      ]
    },
    sections: {
      proofTitle: "Практика за хэндбуком",
      proofCopy: "Заметки из работы с боевой ИИ-платформой: без внутренних деталей, но с реальными инженерными компромиссами.",
      problemTitle: "После демо",
      problemCopy: "Демо работает. Дальше начинаются платформенные вопросы.",
      layersTitle: "Флагманский проект",
      layersCopy: "Практический хэндбук для команд, которые идут от API-ключа и демо к боевой ИИ-платформе. Внутри: карта из 12 слоёв, главы, чеклисты, инструменты и шаблоны.",
      projectsTitle: "Публичные материалы",
      projectsCopy: "Хэндбук, инструменты, статьи и доклады, из которых постепенно собирается практическая карта ИИ-платформы.",
      writingTitle: "Тексты",
      writingCopy: "Длинные разборы на Habr и короткие заметки в Telegram.",
      talksTitle: "Выступления",
      talksCopy: "Видео и подкасты про выбор моделей, стратегию платформы и инженерную работу.",
      engagementTitle: "Где я полезен",
      engagementCopy: "Разбор архитектуры, стратегия платформы, доклады и совместные материалы.",
      authorLabel: "Об авторе",
      centralSentenceLabel: "Главная мысль",
      readMore: "Подробнее"
    },
    proof: [
      ["ИИ-платформа", "LLM · STT · эмбеддинги · агенты"],
      ["Свой инференс", "vLLM · GPU · маршрутизация · кеш"],
      ["Качество", "оценки · регрессия · обратная связь"],
      ["Экономика", "стоимость сценария · кеш префикса · токены"],
      ["Публичные материалы", "Habr · доклады · открытый код"]
    ],
    metrics: [
      "Задержка скачет.",
      "Стоимость токенов растёт.",
      "Промпты ломаются.",
      "Агенты зацикливаются.",
      "Оценки качества нет.",
      "Ответственность за качество размыта."
    ],
    authorCopy:
      "Я — Сергей Нотевский, AI Platform Lead. Работаю на стыке платформенной архитектуры, инференса, оценки качества, наблюдаемости и экономики ИИ-сценариев. Этот сайт — публичный слой моей практики: заметки, инструменты, шаблоны и хэндбук без внутренних деталей.",
    centralSentence:
      "Модель заменяема. Платформа накапливает эффект.",
    engagements: [
      [
        "Разбор архитектуры",
        "AI Gateway, маршрутизация, кеш, инференс, качество, наблюдаемость, стоимость и ответственность."
      ],
      [
        "Стратегическая сессия",
        "MaaS vs self-hosted, зрелость ИИ-платформы, зоны ответственности и первый план развития."
      ],
      ["Доклад или подкаст", "Практичный разговор о боевых ИИ-платформах без хайпа: инференс, оценка качества, кеш префикса и экономика."],
      ["Коллаборация", "Хэндбук, инструменты с открытым кодом, шаблоны и совместные публичные материалы."]
    ]
  },
  pages: {
    about: {
      label: "Об авторе",
      title: "Сергей Нотевский",
      copy:
        "AI Platform Lead. Строю ИИ-платформы, которые работают в продакшене: LLM, STT, эмбеддинги и агенты. Публичная работа здесь про практический опыт: как делать ИИ-системы измеримыми, управляемыми, экономичными и полезными в реальных продуктах.",
      cards: [
        ["Инженерная глубина", "Свой инференс, vLLM, GPU, маршрутизация моделей, кеш и задержка."],
        ["Системы качества", "Проверочные датасеты, обратная связь, регрессионные проверки и контроль релиза моделей."],
        ["Платформенное лидерство", "Операционная модель, ответственность, опыт разработчиков, разбор стоимости, инциденты и очищенные публичные модели."]
      ]
    },
    projects: {
      label: "Проекты",
      title: "Публичные артефакты про ИИ-платформы.",
      copy:
        "План строится вокруг артефактов: карта Production AI Platform, Prefix Cache Auditor, набор проверок качества ИИ, затем полный хэндбук."
    },
    writing: {
      label: "Тексты",
      title: "Тексты про ИИ-платформы в боевой эксплуатации.",
      copy:
        "Пишу о том, что начинается после демо: кеш, стоимость, инференс, агенты, качество, наблюдаемость и ответственность.",
      verified: "Как устроен раздел",
      telegram: "Telegram",
      habr: "Habr"
    },
    talks: {
      label: "Выступления",
      title: "Конференции и технические заметки.",
      copy:
        "Доклады про трудный переход от демо к продакшену: MaaS vs self-hosted, агенты, экономика кеша, vLLM, контроль качества и операционная модель."
    },
    contact: {
      label: "Контакты",
      title: "Доклады, коллаборации и разговоры про платформы.",
      copy:
        "Лучшее пересечение: проектирование ИИ-платформ для продакшена, self-hosted инференс, экономика кеша, проверка качества, наблюдаемость, защитные ограничения, операционная модель и платформенное лидерство.",
      cards: [
        ["Telegram", "Канал и комментарии про ИИ-платформы."],
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
      "audit-prompt-caching",
      "Открытый пакет для аудита кеша: стабильная форма промпта, динамические поля и рекомендации по структуре запроса.",
      siteLinks.auditPromptCaching
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
      copy: "Оценивает стоимость с кешированными входными токенами, шагами агента, повторами и стоимостью принятого результата. Цель - реальная стоимость, а не цена токенов в прайсе.",
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
        "Семантический роутер проверен на ложный прямой и ложный агентный маршруты",
        "Сценарии с длинным контекстом проверены на отвлекающие фрагменты, противоречивые факты и устаревший контекст",
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
        ["0. Демо", "Один API-ключ, один сценарий", "Ничего не измеряется"],
        ["1. Продуктовая интеграция", "ИИ встроен в продукт", "Качество и стоимость слабо контролируются"],
        ["2. AI Gateway", "Единый API-слой", "Жизненный цикл модели всё ещё хаотичен"],
        ["3. Контроль качества", "Датасеты, оценки и регрессии", "Релизы моделей замедляются"],
        ["4. Свой инференс / гибрид", "Свои модели плюс MaaS", "Мощность, стоимость GPU и надёжность"],
        ["5. ИИ-платформа", "Жизненный цикл, наблюдаемость и управление", "Ответственность нужно масштабировать"],
        ["6. ИИ-зрелая организация", "ИИ в продукте и процессах разработки", "Меняются роли, процессы и экономика"]
      ]
    }
  }
};
