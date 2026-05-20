import { MarketingPage } from "@/components/marketing/site-shell";
import { LlmCostCalculator } from "@/components/tools/llm-cost-calculator";
import { PrefixCacheAuditor } from "@/components/tools/prefix-cache-auditor";
import { QualityGateChecklist } from "@/components/tools/quality-gate-checklist";
import { getDictionary, type Locale } from "@/lib/i18n";

type ToolPageProps = {
  locale?: Locale;
  currentPath: string;
};

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
