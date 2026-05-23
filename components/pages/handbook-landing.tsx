import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, ClipboardCheck, Map, Wrench } from "lucide-react";

import { HandbookNavigator } from "@/components/handbook/handbook-navigator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHandbookStats, handbookTracks } from "@/lib/handbook-catalog";
import { getFeaturedChapters, getPlatformLayers, localizedPath, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    badge: "Field guide · v0.1",
    title: "Production AI Platform Handbook",
    subtitle: "From API key to platform.",
    description:
      "Production AI is not a model. It is a platform. This is a practical map for teams building LLM, STT, embeddings and agent systems in production: inference, routing, cache, evals, guardrails, observability, cost and ownership.",
    map: "Start with the map",
    maturity: "Maturity model",
    tools: "Tools",
    useTitle: "How to use the handbook",
    useCopy: "Do not read it linearly. Start from the platform problem in front of you.",
    steps: [
      ["Need the big picture?", "Open the platform map and locate the missing responsibility."],
      ["Need an executive framing?", "Use the maturity model and MaaS vs self-hosted strategy chapter."],
      ["Cost or latency is drifting?", "Start with inference economics and prefix cache."],
      ["Quality is unstable?", "Use AI Quality Gate, observability and ownership chapters."]
    ],
    layersTitle: "Platform layers",
    layersCopy: "The map has twelve responsibilities. If one is missing, a product team will implement it locally.",
    rolesTitle: "Start by role",
    rolesCopy: "Pick the path closest to your current responsibility, then use the catalog below to filter materials.",
    startsTitle: "Start points",
    startsCopy: "Foundational chapters for the first public version.",
    artifactsTitle: "Tools and templates",
    artifactsCopy: "The handbook is meant to become maps, checklists, templates and small diagnostic tools.",
    artifacts: [
      ["Prefix Cache Auditor", "Find unstable prefixes, dynamic fields and schema drift.", "/tools/prefix-cache-auditor"],
      ["LLM Cost Calculator", "Estimate effective cost with cached input tokens.", "/tools/llm-cost-calculator"],
      ["AI Quality Gate Checklist", "Review readiness before rollout.", "/tools/ai-quality-gate-checklist"],
      ["Templates", "Scenario migration RFC, execution boundary matrix and non-prod cost sheet.", "/handbook/templates/scenario-migration-rfc"]
    ]
  },
  ru: {
    badge: "Хэндбук · v0.1",
    title: "Production AI Platform Handbook",
    subtitle: "От API-ключа к платформе.",
    description:
      "Production AI — это не модель. Это платформа. Практическая карта для команд, которые строят LLM, STT, эмбеддинги и агентов в production: инференс, маршрутизация, кеш, оценка качества, guardrails, наблюдаемость, стоимость и ответственность.",
    map: "Начать с карты",
    maturity: "Модель зрелости",
    tools: "Инструменты",
    useTitle: "Как пользоваться хэндбуком",
    useCopy: "Не читайте подряд. Начните с той платформенной проблемы, которая уже болит.",
    steps: [
      ["Нужна общая картина?", "Откройте карту платформы и найдите слой, где нет владельца."],
      ["Нужен язык для CTO?", "Начните с модели зрелости и главы про MaaS vs self-hosted."],
      ["Растёт стоимость или задержка?", "Идите в экономику инференса и prefix cache."],
      ["Плывёт качество?", "Начните с контроля качества, наблюдаемости и ответственности."]
    ],
    layersTitle: "Слои платформы",
    layersCopy: "В карте двенадцать зон ответственности. Если слоя нет, его всё равно кто-то сделает внутри продукта.",
    rolesTitle: "Начать по роли",
    rolesCopy: "Выберите маршрут по своей зоне ответственности, а затем отфильтруйте материалы в каталоге ниже.",
    startsTitle: "Быстрые входы",
    startsCopy: "Короткий маршрут по основным главам v0.1.",
    artifactsTitle: "Инструменты и шаблоны",
    artifactsCopy: "Карты, чеклисты, шаблоны и инструменты собраны как рабочие артефакты, а не как список статей.",
    artifacts: [
      ["Prefix Cache Auditor", "Ищет нестабильный префикс, динамические поля и дрейф схем.", "/tools/prefix-cache-auditor"],
      ["LLM Cost Calculator", "Оценивает реальную стоимость с кешированными входными токенами.", "/tools/llm-cost-calculator"],
      ["Чеклист контроля качества", "Проверяет готовность перед выкаткой.", "/tools/ai-quality-gate-checklist"],
      ["Шаблоны", "RFC миграции сценария, матрица выбора контура и non-prod cost sheet.", "/handbook/templates/scenario-migration-rfc"]
    ]
  }
} as const;

export function HandbookLanding({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const layers = getPlatformLayers(locale);
  const chapters = getFeaturedChapters(locale);
  const stats = getHandbookStats(locale);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Badge variant="outline" className="font-mono uppercase text-primary">
            {t.badge}
          </Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-normal md:text-7xl">{t.title}</h1>
          <p className="mt-5 text-2xl text-foreground/90 md:text-3xl">{t.subtitle}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{t.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={localizedPath("/handbook/platform-map", locale)}>
                {t.map} <Map data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localizedPath("/handbook/maturity-model", locale)}>
                {t.maturity} <BookOpen data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href={localizedPath("/tools", locale)}>
                {t.tools} <Wrench data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card/55 p-3">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="manual-surface rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-xs uppercase text-primary">API key → platform</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <div className="grid gap-2">
            {layers.slice(0, 6).map((layer, index) => (
              <div key={layer.title} className="rounded-md border border-border/80 bg-background/55 p-3">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-sm font-medium">{layer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HandbookSection title={t.useTitle} copy={t.useCopy}>
        <div className="grid gap-4 md:grid-cols-4">
          {t.steps.map(([title, description]) => (
            <InfoCard key={title} title={title} description={description} />
          ))}
        </div>
      </HandbookSection>

      <HandbookSection title={t.rolesTitle} copy={t.rolesCopy}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {handbookTracks
            .filter((track) => track.id !== "all")
            .map((track) => (
              <InfoCard key={track.id} title={track.label[locale]} description={track.description[locale]} />
            ))}
        </div>
      </HandbookSection>

      <HandbookNavigator locale={locale} />

      <HandbookSection title={t.layersTitle} copy={t.layersCopy}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {layers.map((layer, index) => (
            <div key={layer.title} className="rounded-lg border border-border bg-card/60 p-4">
              <p className="font-mono text-xs text-primary">L{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-lg font-semibold">{layer.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{layer.description}</p>
            </div>
          ))}
        </div>
      </HandbookSection>

      <HandbookSection title={t.startsTitle} copy={t.startsCopy}>
        <div className="grid gap-4 md:grid-cols-2">
          {chapters.slice(0, 4).map((chapter) => (
            <InfoCard key={chapter.href} title={chapter.title} description={chapter.description} href={chapter.href} />
          ))}
        </div>
      </HandbookSection>

      <HandbookSection title={t.artifactsTitle} copy={t.artifactsCopy}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.artifacts.map(([title, description, href]) => (
            <InfoCard
              key={title}
              title={title}
              description={description}
              href={href ? localizedPath(href, locale) : undefined}
              icon={<ClipboardCheck className="h-4 w-4 text-primary" />}
            />
          ))}
        </div>
      </HandbookSection>
    </main>
  );
}

function HandbookSection({
  title,
  copy,
  children
}: {
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{copy}</p>
      </div>
      {children}
    </section>
  );
}

function InfoCard({
  title,
  description,
  href,
  icon
}: {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
}) {
  const body = (
    <div className="h-full rounded-lg border border-border bg-card/60 p-5 transition-colors hover:border-primary/45">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon ?? (href ? <ArrowRight className="h-4 w-4 text-primary" /> : null)}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );

  if (!href) {
    return body;
  }

  return (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  );
}
