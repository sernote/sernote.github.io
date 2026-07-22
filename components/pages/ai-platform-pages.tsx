import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PlatformMap } from "@/components/ai-platform/platform-map";
import { PageIntro } from "@/components/marketing/page-intro";
import { MarketingPage } from "@/components/marketing/site-shell";
import type {
  PlatformLandingViewModel,
  PlatformMapViewModel
} from "@/lib/content-v3/view-models";

export function AiPlatformPageContent({
  model
}: {
  model: PlatformLandingViewModel;
}) {
  return (
    <MarketingPage locale="ru" currentPath="/ai-platform">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="AI Platform"
          title="Production AI как система ответственности"
          lead="Карта и практический reference по построению production AI platform: от стратегии и control plane до инференса, качества, стоимости и эксплуатации."
        />

        <aside className="mt-10 max-w-[48rem] border-l border-primary/60 pl-5 text-sm leading-6 text-muted-foreground sm:mt-12 sm:text-base sm:leading-7">
          Это модель ответственности и инженерных решений, а не схема развёртывания и не архитектура конкретной компании. Она помогает отделить границы, контракты и проверяемые сигналы от выбора конкретной реализации.
        </aside>

        <section aria-labelledby="platform-entry-heading" className="mt-16 sm:mt-20 lg:mt-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
              Два входа
            </p>
            <h2
              id="platform-entry-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Начните с карты или готового среза
            </h2>
          </div>

          <nav aria-label="Способы входа в AI Platform" className="mt-8 border-t border-border/80">
            {model.entryModes.map((mode) => (
              <Link
                key={mode.id}
                href={mode.href}
                data-entry-mode={mode.id}
                className="group grid min-h-11 gap-4 border-b border-border/80 py-6 transition-colors hover:bg-muted/25 focus-visible:bg-muted/25 sm:grid-cols-[3rem_minmax(0,1fr)_2rem] sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                  {mode.index}
                </span>
                <span>
                  <span className="block text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                    {mode.title}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-6 text-muted-foreground">
                    {mode.description}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 text-primary transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 max-sm:hidden"
                />
              </Link>
            ))}
          </nav>
        </section>

        <section
          id="current-vertical"
          aria-labelledby="platform-vertical-heading"
          className="mt-16 scroll-mt-24 sm:mt-20 lg:mt-24"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                Опубликованный путь
              </p>
              <h2
                id="platform-vertical-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              >
                От области до рабочего артефакта
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                Пилот показывает один полный вертикальный срез. Остальные области остаются на карте и не выдают черновик за готовый материал.
              </p>
            </div>

            <ol className="m-0 list-none border-t border-border/80 p-0">
              {model.vertical.map((node) => (
                <li key={node.entityId} data-vertical-node={node.entityId}>
                  <Link
                    href={node.href}
                    className="group grid min-h-11 gap-3 border-b border-border/80 py-6 transition-colors hover:bg-muted/25 focus-visible:bg-muted/25 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-6"
                  >
                    <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                      {node.index}
                    </span>
                    <span className="min-w-0">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">
                        {node.meta}
                      </span>
                      <span className="mt-2 block text-lg font-semibold text-foreground sm:text-xl">
                        {node.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-primary">
                      {node.statusLabel}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </MarketingPage>
  );
}

export function AiPlatformMapPageContent({
  model
}: {
  model: PlatformMapViewModel;
}) {
  return (
    <MarketingPage locale="ru" currentPath="/ai-platform/map">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="AI Platform"
          title="Карта областей"
          lead="Семь устойчивых зон ответственности production AI-платформы. У каждой области есть назначение, граница и честный статус материала."
        />

        <p className="mt-10 max-w-[48rem] border-l border-primary/60 pl-5 text-sm leading-6 text-muted-foreground sm:mt-12 sm:text-base sm:leading-7">
          Порядок помогает читать карту, но это не строгая topology и не последовательность прохождения запроса. Области пересекаются через контракты, сигналы и общую операционную ответственность.
        </p>

        <section aria-label="Карта областей AI Platform" className="mt-12 sm:mt-16">
          <PlatformMap model={model} />
        </section>

        <section aria-labelledby="platform-intersections-heading" className="mt-16 sm:mt-20">
          <div className="grid gap-6 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                Пересечения
              </p>
              <h2
                id="platform-intersections-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              >
                Как области связаны
              </h2>
            </div>
            <ul className="m-0 list-none border-t border-border/80 p-0">
              {model.intersections.map((intersection, index) => (
                <li
                  key={intersection.title}
                  className="grid gap-3 border-b border-border/80 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {intersection.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {intersection.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-16 border-t border-border/80 pt-8">
          <Link
            href="/ai-platform"
            className="group inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 text-primary transition-transform group-hover:-translate-x-1"
            />
            Вернуться к AI Platform
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
