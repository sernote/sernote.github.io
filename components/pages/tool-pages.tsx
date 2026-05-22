import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

import { MarketingPage } from "@/components/marketing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LlmCostCalculator } from "@/components/tools/llm-cost-calculator";
import { PrefixCacheAuditor } from "@/components/tools/prefix-cache-auditor";
import { QualityGateChecklist } from "@/components/tools/quality-gate-checklist";
import { handbookCatalog, localizeCatalogItem } from "@/lib/handbook-catalog";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";

type ToolPageProps = {
  locale?: Locale;
  currentPath: string;
};

const toolsIndexCopy = {
  en: {
    label: "Tools",
    title: "Small diagnostics for production AI platform work.",
    copy:
      "The tools are client-side v0 artifacts: no external calls, no accounts, no analytics. They support the handbook with practical checks for cache, cost and rollout readiness.",
    open: "Open tool",
    handbook: "Open handbook"
  },
  ru: {
    label: "Инструменты",
    title: "Небольшие проверки для работы с ИИ-платформой.",
    copy:
      "Инструменты работают в браузере: без внешних вызовов, аккаунтов и аналитики. Они дополняют хэндбук проверками кеша, стоимости и готовности к выкатке.",
    open: "Открыть",
    handbook: "Открыть хэндбук"
  }
} as const;

export function ToolsIndexPageContent({ locale = "en", currentPath }: ToolPageProps) {
  const t = toolsIndexCopy[locale];
  const tools = handbookCatalog
    .filter((item) => item.format === "tool")
    .map((item) => localizeCatalogItem(item, locale));

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Badge variant="outline" className="font-mono uppercase text-primary">
            <Wrench data-icon="inline-start" />
            {t.label}
          </Badge>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal md:text-7xl">{t.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{t.copy}</p>
          <Button asChild className="mt-8" size="lg">
            <Link href={localizedPath("/handbook", locale)}>
              {t.handbook} <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href ?? localizedPath("/tools", locale)} className="group block h-full">
              <article className="h-full rounded-lg border border-border bg-card/60 p-5 transition-colors group-hover:border-primary/45">
                <p className="font-mono text-xs uppercase text-primary">{t.label}</p>
                <h2 className="mt-3 text-xl font-semibold">{tool.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                  {t.open} <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </MarketingPage>
  );
}

export function PrefixCacheAuditorPageContent({ locale = "en", currentPath }: ToolPageProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.tools.prefix;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{dictionary.tools.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <PrefixCacheAuditor locale={locale} />
        </div>
      </main>
    </MarketingPage>
  );
}

export function LlmCostCalculatorPageContent({ locale = "en", currentPath }: ToolPageProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.tools.cost;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{dictionary.tools.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <LlmCostCalculator locale={locale} />
        </div>
      </main>
    </MarketingPage>
  );
}

export function QualityGateChecklistPageContent({ locale = "en", currentPath }: ToolPageProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.tools.quality;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{dictionary.tools.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <QualityGateChecklist locale={locale} />
        </div>
      </main>
    </MarketingPage>
  );
}
