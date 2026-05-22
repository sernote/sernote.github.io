import { localizedPath, type Locale } from "@/lib/i18n";

export type HandbookFormat = "map" | "chapter" | "checklist" | "tool" | "template";
export type HandbookTrack = "lead" | "cto" | "backend-ai" | "mlops";
export type HandbookStatus = "available" | "planned";

export type HandbookCatalogItem = {
  id: string;
  format: HandbookFormat;
  status: HandbookStatus;
  href?: string;
  tracks: HandbookTrack[];
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const handbookFormats: Array<{
  id: HandbookFormat | "all";
  label: Record<Locale, string>;
}> = [
  { id: "all", label: { en: "All", ru: "Все" } },
  { id: "map", label: { en: "Maps", ru: "Карты" } },
  { id: "chapter", label: { en: "Chapters", ru: "Главы" } },
  { id: "checklist", label: { en: "Checklists", ru: "Чеклисты" } },
  { id: "tool", label: { en: "Tools", ru: "Инструменты" } },
  { id: "template", label: { en: "Templates", ru: "Шаблоны" } }
];

export const handbookTracks: Array<{
  id: HandbookTrack | "all";
  label: Record<Locale, string>;
  description: Record<Locale, string>;
}> = [
  {
    id: "all",
    label: { en: "All roles", ru: "Все роли" },
    description: { en: "Full map", ru: "Вся карта" }
  },
  {
    id: "lead",
    label: { en: "AI Platform Lead", ru: "Руководитель AI-платформы" },
    description: { en: "Ownership, platform map, quality and economics.", ru: "Ответственность, карта, качество и экономика." }
  },
  {
    id: "cto",
    label: { en: "CTO / Head", ru: "CTO / руководитель" },
    description: { en: "Strategy, maturity and operating model.", ru: "Стратегия, зрелость и операционная модель." }
  },
  {
    id: "backend-ai",
    label: { en: "Backend to AI", ru: "Backend в AI" },
    description: { en: "Gateway, observability, tools and production contracts.", ru: "AI Gateway, наблюдаемость, инструменты и контракты." }
  },
  {
    id: "mlops",
    label: { en: "MLOps / Inference", ru: "MLOps / инференс" },
    description: { en: "Serving, STT, embeddings, cache and capacity.", ru: "Развёртывание, STT, embeddings, кеш и мощность." }
  }
];

export const handbookCatalog: HandbookCatalogItem[] = [
  {
    id: "platform-map",
    format: "map",
    status: "available",
    href: "/handbook/platform-map",
    tracks: ["lead", "cto", "backend-ai", "mlops"],
    title: { en: "Production AI Platform Map", ru: "Карта Production AI Platform" },
    description: {
      en: "The twelve-responsibility map from use cases to ownership.",
      ru: "Двенадцать зон ответственности: от сценариев до владельцев."
    }
  },
  {
    id: "maturity-model",
    format: "map",
    status: "available",
    href: "/handbook/maturity-model",
    tracks: ["lead", "cto"],
    title: { en: "AI Platform Maturity Model", ru: "Модель зрелости AI-платформы" },
    description: {
      en: "Seven levels from one API key to AI-native operations.",
      ru: "Семь уровней: от API-ключа до AI-native операционной модели."
    }
  },
  {
    id: "start-here",
    format: "chapter",
    status: "available",
    href: "/handbook/start-here",
    tracks: ["lead", "cto", "backend-ai", "mlops"],
    title: { en: "Start Here", ru: "С чего начать" },
    description: {
      en: "Choose the first chapter by the platform problem in front of you.",
      ru: "Выберите первый маршрут по текущей платформенной проблеме."
    }
  },
  {
    id: "manifesto",
    format: "chapter",
    status: "available",
    href: "/handbook/manifesto",
    tracks: ["lead", "cto"],
    title: { en: "Manifesto", ru: "Манифест" },
    description: {
      en: "Why production AI should be treated as a platform, not a model choice.",
      ru: "Почему production AI стоит мыслить как платформу, а не как выбор модели."
    }
  },
  {
    id: "maas-vs-self-hosted",
    format: "chapter",
    status: "available",
    href: "/handbook/strategy/maas-vs-self-hosted",
    tracks: ["lead", "cto", "mlops"],
    title: { en: "MaaS vs Self-hosted", ru: "MaaS vs Self-hosted" },
    description: {
      en: "A strategy decision, not a religious argument.",
      ru: "Стратегическое решение, а не религиозный спор."
    }
  },
  {
    id: "ai-gateway",
    format: "chapter",
    status: "available",
    href: "/handbook/gateway/ai-gateway",
    tracks: ["lead", "backend-ai", "cto"],
    title: { en: "AI Gateway", ru: "AI Gateway" },
    description: {
      en: "The control point for access, quotas, routing, policy and cost.",
      ru: "Точка управления доступом, квотами, маршрутизацией, политиками и стоимостью."
    }
  },
  {
    id: "inference-runtime",
    format: "chapter",
    status: "available",
    href: "/handbook/inference/inference-runtime",
    tracks: ["lead", "mlops"],
    title: { en: "Inference Runtime", ru: "Рантайм инференса" },
    description: {
      en: "Serving decisions around LLM, STT, embeddings and rerankers.",
      ru: "Решения по развёртыванию LLM, STT, embeddings и rerankers."
    }
  },
  {
    id: "stt-serving",
    format: "chapter",
    status: "available",
    href: "/handbook/inference/stt-serving",
    tracks: ["lead", "mlops"],
    title: { en: "STT Serving", ru: "STT в production" },
    description: {
      en: "Treat speech-to-text as a first-class production workload.",
      ru: "STT как полноценная production-нагрузка, а не предварительная обработка."
    }
  },
  {
    id: "embeddings-serving",
    format: "chapter",
    status: "available",
    href: "/handbook/inference/embeddings-serving",
    tracks: ["lead", "mlops", "backend-ai"],
    title: { en: "Embeddings Serving", ru: "Embeddings в production" },
    description: {
      en: "Embeddings and rerankers as a quality, latency and lifecycle layer.",
      ru: "Embeddings и rerankers как слой качества, задержки и жизненного цикла."
    }
  },
  {
    id: "inference-economics",
    format: "chapter",
    status: "available",
    href: "/handbook/economics/inference-economics",
    tracks: ["lead", "cto", "mlops"],
    title: { en: "Inference Economics", ru: "Экономика инференса" },
    description: {
      en: "Cost per accepted outcome, not raw token math.",
      ru: "Стоимость принятого результата, а не сырая цена токена."
    }
  },
  {
    id: "prefix-cache",
    format: "chapter",
    status: "available",
    href: "/handbook/caching/prefix-cache",
    tracks: ["lead", "backend-ai", "mlops"],
    title: { en: "Prefix Cache", ru: "Prefix Cache" },
    description: {
      en: "How prompt shape, tool schemas and routing decide cache behavior.",
      ru: "Как форма промпта, схемы инструментов и маршрутизация влияют на кеш."
    }
  },
  {
    id: "ai-quality-gate",
    format: "checklist",
    status: "available",
    href: "/handbook/evals/ai-quality-gate",
    tracks: ["lead", "cto", "backend-ai"],
    title: { en: "AI Quality Gate", ru: "Контроль качества ИИ" },
    description: {
      en: "A rollout loop that prevents silent quality degradation.",
      ru: "Цикл выкатки, который не даёт качеству деградировать незаметно."
    }
  },
  {
    id: "llm-observability",
    format: "checklist",
    status: "available",
    href: "/handbook/observability/llm-observability-checklist",
    tracks: ["lead", "backend-ai", "mlops"],
    title: { en: "LLM Observability Checklist", ru: "Чеклист наблюдаемости LLM" },
    description: {
      en: "Minimum telemetry for model, prompt, cost, latency and outcome.",
      ru: "Минимальная телеметрия для модели, промпта, стоимости, задержки и результата."
    }
  },
  {
    id: "guardrails",
    format: "chapter",
    status: "available",
    href: "/handbook/guardrails/guardrails",
    tracks: ["lead", "cto", "backend-ai"],
    title: { en: "Guardrails and Security", ru: "Защитные контуры и безопасность" },
    description: {
      en: "Policies, telemetry, fallback and ownership, not one magic library.",
      ru: "Политики, телеметрия, путь отката и ответственность, а не одна магическая библиотека."
    }
  },
  {
    id: "ownership",
    format: "chapter",
    status: "available",
    href: "/handbook/operating-model/ownership",
    tracks: ["lead", "cto"],
    title: { en: "Ownership and Operating Model", ru: "Ответственность и операционная модель" },
    description: {
      en: "Who owns quality, cost, incidents and platform contracts.",
      ru: "Кто владеет качеством, стоимостью, инцидентами и контрактами платформы."
    }
  },
  {
    id: "prefix-cache-auditor",
    format: "tool",
    status: "available",
    href: "/tools/prefix-cache-auditor",
    tracks: ["lead", "backend-ai", "mlops"],
    title: { en: "Prefix Cache Auditor", ru: "Prefix Cache Auditor" },
    description: {
      en: "Client-side diagnostic for unstable prefixes and schema drift.",
      ru: "Локальная диагностика нестабильных префиксов и дрейфа схем."
    }
  },
  {
    id: "llm-cost-calculator",
    format: "tool",
    status: "available",
    href: "/tools/llm-cost-calculator",
    tracks: ["lead", "cto", "mlops"],
    title: { en: "LLM Cost Calculator", ru: "LLM Cost Calculator" },
    description: {
      en: "Estimate effective cost with cached input tokens.",
      ru: "Оценка реальной стоимости с кешированными входными токенами."
    }
  },
  {
    id: "quality-gate-checklist",
    format: "tool",
    status: "available",
    href: "/tools/ai-quality-gate-checklist",
    tracks: ["lead", "backend-ai", "cto"],
    title: { en: "AI Quality Gate Checklist", ru: "Чеклист контроля качества" },
    description: {
      en: "Local readiness review before rollout.",
      ru: "Локальная проверка готовности перед выкаткой."
    }
  },
  {
    id: "ai-scenario-rfc",
    format: "template",
    status: "planned",
    tracks: ["lead", "backend-ai", "cto"],
    title: { en: "AI Scenario RFC", ru: "RFC AI-сценария" },
    description: {
      en: "A template for use case, owner, risk, evals, cost and rollout path.",
      ru: "Шаблон для сценария, владельца, риска, проверок качества, стоимости и выкатки."
    }
  },
  {
    id: "model-release-rfc",
    format: "template",
    status: "planned",
    tracks: ["lead", "mlops"],
    title: { en: "Model Release RFC", ru: "RFC релиза модели" },
    description: {
      en: "Release notes, quality gate, fallback and cost profile for model changes.",
      ru: "Описание релиза, порог качества, путь отката и профиль стоимости при смене модели."
    }
  },
  {
    id: "eval-report-template",
    format: "template",
    status: "planned",
    tracks: ["lead", "backend-ai"],
    title: { en: "Eval Report", ru: "Отчёт по качеству" },
    description: {
      en: "Dataset, error taxonomy, regression deltas and rollout recommendation.",
      ru: "Датасет, таксономия ошибок, регрессионные дельты и рекомендация по выкатке."
    }
  },
  {
    id: "cost-review",
    format: "template",
    status: "planned",
    tracks: ["lead", "cto", "mlops"],
    title: { en: "Cost Review", ru: "Разбор стоимости" },
    description: {
      en: "Scenario cost, cached tokens, retries, GPU utilization and accepted outcomes.",
      ru: "Стоимость сценария, кешированные токены, повторы, загрузка GPU и принятые результаты."
    }
  },
  {
    id: "provider-decision-matrix",
    format: "template",
    status: "planned",
    tracks: ["lead", "cto"],
    title: { en: "Provider Decision Matrix", ru: "Матрица выбора провайдера" },
    description: {
      en: "A reusable matrix for MaaS, self-hosted and hybrid provider decisions.",
      ru: "Шаблон для выбора между MaaS, self-hosted и гибридным подходом."
    }
  },
  {
    id: "incident-postmortem",
    format: "template",
    status: "planned",
    tracks: ["lead", "cto", "backend-ai"],
    title: { en: "AI Incident Postmortem", ru: "Разбор AI-инцидента" },
    description: {
      en: "A postmortem template for prompt, model, tool, cost and safety incidents.",
      ru: "Шаблон для инцидентов с промптом, моделью, инструментом, стоимостью и безопасностью."
    }
  }
];

export function localizeCatalogItem(item: HandbookCatalogItem, locale: Locale) {
  return {
    ...item,
    title: item.title[locale],
    description: item.description[locale],
    href: item.href ? localizedPath(item.href, locale) : undefined,
    storageId: item.href ? localizedPath(item.href, locale) : item.id
  };
}

export function getHandbookStats(locale: Locale) {
  const available = handbookCatalog.filter((item) => item.status === "available");
  const chapters = available.filter((item) => item.format === "chapter" || item.format === "map").length;
  const tools = available.filter((item) => item.format === "tool").length;

  return [
    {
      value: String(chapters),
      label: locale === "ru" ? "глав и карт" : "chapters and maps"
    },
    {
      value: "12",
      label: locale === "ru" ? "слоёв платформы" : "platform layers"
    },
    {
      value: "5",
      label: locale === "ru" ? "форматов" : "content formats"
    },
    {
      value: String(tools),
      label: locale === "ru" ? "инструмента" : "tools"
    },
    {
      value: String(handbookTracks.length - 1),
      label: locale === "ru" ? "ролевых трека" : "role tracks"
    }
  ];
}
