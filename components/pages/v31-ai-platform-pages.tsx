import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import { PlatformMap, getAreaPresentation } from "@/components/ai-platform/platform-map";
import { EditorialShell } from "@/components/site/editorial-shell";
import type {
  PlatformLandingViewModel,
  PlatformMapViewModel,
  ReferenceDetailViewModel,
  V3ListItemViewModel
} from "@/lib/content-v3/view-models";
import { cn } from "@/lib/utils";

const frameClassName = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[72px]";

const PLATFORM_SIGNALS = Object.freeze([
  "Несколько команд используют общие модели или провайдеров.",
  "Качество и выпуск изменений требуют общих критериев.",
  "Появились стабильные имена моделей, маршруты, политики и лимиты.",
  "Очередь, capacity, SLO и деградация стали общей эксплуатационной задачей.",
  "Нужно одинаково соблюдать границы данных и доступа.",
  "Стоимость и ответственность нужно связывать с конкретными сценариями."
]);

const MATURITY_STEPS = Object.freeze([
  ["Отдельный сценарий", "Один продукт, один провайдер, локальные правила."],
  ["Общие контракты", "Стабильные имена, лимиты и границы данных."],
  ["Control plane", "Доступ, маршруты, политики и выпуск конфигурации."],
  ["Управляемый inference", "Пулы ресурсов, планирование, память и кэш."],
  ["Качество и эксплуатация", "Evals, SLO, инциденты и стоимость результата."]
]);

const EXECUTION_MODES = Object.freeze([
  Object.freeze({
    id: "maas",
    title: "MaaS",
    facts: Object.freeze([
      ["Что покупает команда", "Готовый serving и часть масштабирования."],
      ["Что остаётся у команды", "Интеграция, данные, качество, лимиты и деградация."],
      ["Когда рассматривать", "Небольшой или нерегулярный спрос, допустимая внешняя граница."]
    ])
  }),
  Object.freeze({
    id: "self-hosted",
    title: "Self-hosted",
    facts: Object.freeze([
      ["Что получает команда", "Контроль над runtime и размещением."],
      ["Что добавляется", "Capacity, обновления, наблюдаемость, дежурство и лицензии."],
      ["Когда рассматривать", "Проверенный workload, подходящая граница данных и готовность владеть serving."]
    ])
  }),
  Object.freeze({
    id: "hybrid",
    title: "Hybrid",
    facts: Object.freeze([
      ["Что даёт", "Разные execution paths для разных классов данных и задач."],
      ["Что добавляется", "Routing policy, объяснимость маршрута и две эксплуатационные поверхности."],
      ["Когда рассматривать", "Требования и workload действительно различаются."]
    ])
  })
]);

const SITUATIONAL_ENTRIES = Object.freeze([
  ["Один сценарий работает через MaaS, общей платформы пока нет.", "Что зафиксировать до появления второго сценария?"],
  ["Несколько команд делят модели, политики и лимиты.", "С каких контрактов начинается control plane?"],
  ["Компания рассматривает локальный inference.", "Какая загрузка и ответственность делают self-hosted оправданным?"],
  ["Платформа уже работает, но её нужно эксплуатировать и развивать.", "Как связать качество, стоимость и инциденты в один контур ответственности?"]
]);

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-primary hover:underline"
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </Link>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-border pb-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground">
      {children}
    </h2>
  );
}

export function AiPlatformPageContent({
  model,
  mapModel
}: {
  model: PlatformLandingViewModel;
  mapModel: PlatformMapViewModel;
}) {
  const mapEntry = model.entryModes.find((entry) => entry.id === "map");
  const verticalEntry = model.entryModes.find((entry) => entry.id === "vertical");

  return (
    <EditorialShell currentPath="/ai-platform">
      <div className={`${frameClassName} py-10 md:py-12 lg:py-14`}>
        <header className="max-w-[760px]">
          <h1 className="text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[2.75rem]">
            AI Platform
          </h1>
          <p className="mt-5 text-xl leading-[1.45] tracking-[-0.015em] md:text-[1.375rem]">
            AI-платформа — набор общих контрактов и возможностей, который помогает нескольким продуктовым сценариям безопасно проходить путь от запроса до наблюдаемого результата.
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Модель и инфраструктура входят в платформу, но не заменяют правила работы с данными, критерии качества, SLO, маршрутизацию и ответственность.
          </p>
          <div className="mt-5 flex flex-col gap-x-8 sm:flex-row">
            <InlineLink href={mapEntry?.href ?? "/ai-platform/map"}>Открыть карту</InlineLink>
            <InlineLink href={verticalEntry?.href ?? "#current-vertical"}>С чего начать</InlineLink>
          </div>
        </header>

        <section aria-labelledby="platform-signals-heading" className="mt-12 border-t border-border pt-7 md:mt-14">
          <SectionTitle>
            <span id="platform-signals-heading">Признаки, что одного API уже недостаточно</span>
          </SectionTitle>
          <ul className="m-0 grid list-none p-0 md:grid-cols-2 md:gap-x-14">
            {PLATFORM_SIGNALS.map((signal) => (
              <li key={signal} data-platform-signal="" className="border-b border-border py-4 text-base leading-6">
                {signal}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="platform-maturity-heading" className="mt-12 border-t border-border pt-7">
          <SectionTitle>
            <span id="platform-maturity-heading">От отдельного сценария к платформе</span>
          </SectionTitle>
          <ol className="m-0 grid list-none p-0 md:grid-cols-5">
            {MATURITY_STEPS.map(([title, description], index) => (
              <li
                key={title}
                data-maturity-step=""
                className="relative border-b border-border py-4 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="text-base font-semibold leading-5">
                  {title}
                  {index === MATURITY_STEPS.length - 1 ? null : (
                    <ArrowRight aria-hidden="true" className="ml-1 inline size-4 text-primary max-md:hidden" />
                  )}
                </h3>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="execution-modes-heading" className="mt-12 border-t border-border pt-7">
          <SectionTitle>
            <span id="execution-modes-heading">Три способа исполнения — без универсального победителя</span>
          </SectionTitle>
          <div className="grid md:grid-cols-3">
            {EXECUTION_MODES.map((mode) => (
              <article
                key={mode.id}
                data-execution-mode={mode.id}
                className="border-b border-border py-5 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="text-xl font-semibold">{mode.title}</h3>
                <dl className="mt-4 space-y-4">
                  {mode.facts.map(([term, description]) => (
                    <div key={term}>
                      <dt className="text-sm text-muted-foreground">{term}</dt>
                      <dd className="mt-1 text-base leading-6">{description}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="situational-entries-heading" className="mt-12 border-t border-border pt-7">
          <SectionTitle>
            <span id="situational-entries-heading">Где вы сейчас</span>
          </SectionTitle>
          <div>
            {SITUATIONAL_ENTRIES.map(([situation, question]) => (
              <article
                key={situation}
                data-situational-entry=""
                className="grid gap-3 border-b border-border py-5 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(16rem,1fr)_auto] lg:items-center lg:gap-10"
              >
                <h3 className="text-base font-semibold leading-6">{situation}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{question}</p>
                <InlineLink href="/ai-platform/map">Открыть маршрут</InlineLink>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="platform-areas-heading" className="mt-12 border-t border-border pt-7">
          <SectionTitle>
            <span id="platform-areas-heading">Области AI Platform</span>
          </SectionTitle>
          <div>
            {mapModel.areas.map((area) => {
              const presentation = getAreaPresentation(area);
              const status = area.statusLabel === "Планируется" ? "Запланировано" : area.statusLabel === "Доступно" ? "Проверено" : "Нужна проверка";
              const content = (
                <>
                  <h3 className="text-base font-semibold leading-6 group-hover:text-primary group-focus-visible:text-primary">
                    {presentation.title}
                    {area.href === null ? null : <ArrowRight aria-hidden="true" className="ml-2 inline size-4 text-primary" />}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">{area.purpose}</p>
                  <p className="text-sm text-muted-foreground md:text-right">{status}</p>
                </>
              );

              return area.href === null ? (
                <div
                  key={area.entityId}
                  data-platform-area-summary={area.entityId}
                  className="grid gap-2 border-b border-border py-4 md:grid-cols-[minmax(14rem,0.85fr)_minmax(18rem,1.4fr)_8rem] md:gap-8"
                >
                  {content}
                </div>
              ) : (
                <Link
                  key={area.entityId}
                  href={area.href}
                  data-platform-area-summary={area.entityId}
                  className="group grid min-h-11 gap-2 border-b border-border py-4 md:grid-cols-[minmax(14rem,0.85fr)_minmax(18rem,1.4fr)_8rem] md:gap-8"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section id="current-vertical" aria-labelledby="platform-vertical-heading" className="mt-12 scroll-mt-24 border-t border-border pt-7">
          <SectionTitle>
            <span id="platform-vertical-heading">Один путь уже разобран полностью</span>
          </SectionTitle>
          <ol className="m-0 grid list-none p-0 md:grid-cols-2 lg:grid-cols-4">
            {model.vertical.map((node) => (
              <li key={node.entityId} data-vertical-node={node.entityId} className="border-b border-border py-4 md:border-r md:px-5 md:odd:pl-0 md:even:border-r-0 lg:odd:pl-5 lg:even:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <Link href={node.href} className="group block min-h-11">
                  <h3 className="text-base font-semibold leading-5 group-hover:text-primary group-focus-visible:text-primary">
                    {node.title}
                    <ArrowRight aria-hidden="true" className="ml-1 inline size-4 text-primary" />
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-muted-foreground">{node.meta === "Область" ? "Где исполняется модельная нагрузка." : node.meta === "Компонент" ? "Когда повторный prefill становится платформенной ответственностью." : node.meta === "Кейс" ? "Как порядок tools меняет cache identity." : "Как проверить форму payload и собрать evidence."}</p>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-2 flex flex-col gap-x-10 sm:flex-row sm:items-center">
            <InlineLink href="/ai-platform/map">Открыть карту</InlineLink>
            <p className="text-sm text-muted-foreground">
              Вводный материал: <Link href="/blog/ai-platform-before-gpu" className="font-medium text-primary hover:underline">«AI-платформа начинается не с GPU»</Link>
            </p>
          </div>
        </section>
      </div>
    </EditorialShell>
  );
}

export function AiPlatformMapPageContent({ model }: { model: PlatformMapViewModel }) {
  return (
    <EditorialShell currentPath="/ai-platform/map">
      <div className={`${frameClassName} py-10 md:py-12 lg:py-14`}>
        <header className="max-w-[760px]">
          <p className="text-sm font-medium text-primary">capability map</p>
          <h1 className="mt-3 text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[2.75rem]">
            Карта AI Platform
          </h1>
          <p className="mt-5 text-lg leading-7">
            Семь устойчивых зон ответственности: от выбора сценария до эксплуатации, безопасности и ownership.
          </p>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Это capability map, а не целевая архитектура конкретной компании и не строгий путь запроса. Строки читаются сверху вниз; пересечения показаны отдельно.
          </p>
        </header>

        <section aria-label="Capability map AI Platform" className="mt-10 md:mt-12">
          <PlatformMap model={model} />
        </section>

        <section aria-labelledby="platform-intersections-heading" className="mt-12 border-t border-border pt-7">
          <SectionTitle>
            <span id="platform-intersections-heading">Как области пересекаются</span>
          </SectionTitle>
          <ol className="m-0 list-none p-0">
            {model.intersections.map((intersection, index) => (
              <li key={intersection.title} className="grid gap-2 border-b border-border py-5 md:grid-cols-[2.5rem_minmax(12rem,0.7fr)_minmax(18rem,1.3fr)] md:gap-6">
                <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-semibold">{intersection.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{intersection.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 border-t border-border pt-4">
          <Link href="/ai-platform" className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Вернуться к AI Platform
          </Link>
        </div>
      </div>
    </EditorialShell>
  );
}

function Breadcrumb({ model }: { model: ReferenceDetailViewModel }) {
  const ancestors: V3ListItemViewModel[] = [];
  if (model.primaryArea !== null) ancestors.push(model.primaryArea);
  if (model.parentComponent !== null) ancestors.push(model.parentComponent);

  return (
    <nav aria-label="Хлебные крошки" className="mb-7 flex min-w-0 flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
      <Link href="/ai-platform" className="inline-flex min-h-11 items-center py-2 hover:text-primary">AI Platform</Link>
      {model.contentType === "platform-area" ? (
        <>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <Link href="/ai-platform/map" className="inline-flex min-h-11 items-center py-2 hover:text-primary">Карта</Link>
        </>
      ) : null}
      {ancestors.map((item) => (
        <span key={item.entityId} className="inline-flex min-w-0 items-center gap-1">
          <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
          <Link href={item.href} className="inline-flex min-h-11 min-w-0 items-center py-2 hover:text-primary">{item.title}</Link>
        </span>
      ))}
      <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
      <span aria-current="page" className="inline-flex min-h-11 min-w-0 items-center py-2 text-foreground">{model.title}</span>
    </nav>
  );
}

const REFERENCE_LABELS = Object.freeze({
  "platform-area": Object.freeze({ purpose: "Зачем существует", boundary: "Граница области" }),
  "platform-component": Object.freeze({ purpose: "Ответственность компонента", boundary: "Что остаётся снаружи" }),
  case: Object.freeze({ purpose: "Задача кейса", boundary: "Доказательная граница кейса" })
});

function RelatedReference({ item }: { item: V3ListItemViewModel }) {
  const body = (
    <>
      <span>
        <span className="block text-sm text-muted-foreground">{item.meta}</span>
        <span className="mt-1 block text-base font-semibold group-hover:text-primary group-focus-visible:text-primary">{item.title}</span>
      </span>
      {item.linkKind === "external" ? <ArrowUpRight aria-hidden="true" className="size-4 text-primary" /> : <ArrowRight aria-hidden="true" className="size-4 text-primary" />}
    </>
  );
  const className = "group grid min-h-11 grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-4 border-b border-border py-4";
  return item.linkKind === "external" ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={className}>{body}<span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span></a>
  ) : (
    <Link href={item.href} className={className}>{body}</Link>
  );
}

export function AiPlatformMdxLink({
  href,
  children,
  className,
  ...props
}: ComponentProps<"a">) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      {...props}
      href={href}
      className={cn("font-medium underline underline-offset-4", className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      {external ? (
        <>
          <ArrowUpRight
            aria-hidden="true"
            data-external-cue="true"
            className="ml-1 inline size-3.5 align-[-0.125em] text-primary no-underline"
          />
          <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
        </>
      ) : null}
    </a>
  );
}

export function AiPlatformReferencePage({
  model,
  children
}: {
  model: ReferenceDetailViewModel;
  children?: ReactNode;
}) {
  const labels = REFERENCE_LABELS[model.contentType];

  return (
    <EditorialShell currentPath={model.href}>
      <article data-reference-type={model.contentType} className={`${frameClassName} py-10 md:py-12 lg:py-14`}>
        <header className="max-w-[800px]">
          <Breadcrumb model={model} />
          <p className="text-sm font-medium text-primary">{model.typeLabel}</p>
          {model.isSynthetic ? (
            <p className="mt-4 border-y border-border py-3 text-sm leading-6 text-foreground">
              Синтетический кейс: публичная демонстрация на специально подготовленных данных, а не результат production-системы.
            </p>
          ) : null}
          {model.reviewStatus === "stale" ? (
            <p role="status" className="mt-4 border-y border-border py-3 text-sm leading-6">
              Нужна повторная проверка: источники или допущения вышли за установленный review cycle.
            </p>
          ) : null}
          <h1 id="reference-detail-title" className="mt-4 text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[2.75rem] lg:text-[3.25rem]">
            {model.title}
          </h1>
          <p className="mt-5 text-lg leading-7 text-muted-foreground md:text-xl md:leading-8">{model.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
            <span>Автор — <Link href="/about" className="text-foreground hover:text-primary">Сергей Нотевский</Link></span>
            <span>{model.typeLabel}</span>
            <span>{model.reviewStatusLabel} <time dateTime={model.reviewedAt}>{model.reviewedLabel}</time></span>
          </div>
        </header>

        <section aria-label="Назначение и граница" className="mt-10 grid border-y border-border md:grid-cols-2">
          <div className="py-5 md:border-r md:border-border md:pr-8">
            <h2 className="text-sm font-semibold text-primary">{labels.purpose}</h2>
            <p className="mt-2 text-base leading-7">{model.purpose}</p>
          </div>
          <div className="border-t border-border py-5 md:border-t-0 md:pl-8">
            <h2 className="text-sm font-semibold text-primary">{labels.boundary}</h2>
            <p className="mt-2 text-base leading-7">{model.boundary}</p>
          </div>
        </section>

        <div className="mt-10 min-w-0 max-w-[760px] [overflow-wrap:anywhere] md:mt-12">
          {children}
        </div>

        <section aria-labelledby="reference-evidence-heading" className="mt-14 border-t border-border pt-7">
          <SectionTitle>
            <span id="reference-evidence-heading">Проверка материала</span>
          </SectionTitle>
          <div className="grid md:grid-cols-2">
            <div className="border-b border-border py-5 md:border-r md:pr-8">
              <h3 className="text-base font-semibold">Применимость</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.applicability}</p>
            </div>
            <div className="border-b border-border py-5 md:pl-8">
              <h3 className="text-base font-semibold">Ограничения</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.limitations}</p>
            </div>
          </div>
          <div className="mt-7 max-w-[760px]">
            <h3 className="text-lg font-semibold">Источники</h3>
            <ul className="m-0 mt-3 list-none border-t border-border p-0">
              {model.sources.map((source) => (
                <li key={source.url} className="border-b border-border">
                  <a href={source.url} target="_blank" rel="noreferrer" className="group grid min-h-11 grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-4 py-4 text-sm hover:text-primary">
                    <span>{source.title}<span className="mt-1 block text-xs text-muted-foreground">Проверено <time dateTime={source.verifiedAt}>{source.verifiedLabel}</time></span></span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-primary" />
                    <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {model.related.length > 0 ? (
          <section aria-labelledby="related-reference-heading" className="mt-14 border-t border-border pt-7">
            <SectionTitle><span id="related-reference-heading">Связанные материалы</span></SectionTitle>
            <div className="max-w-[760px]">
              {model.related.slice(0, 4).map((item) => (
                <div key={`${item.contentType}:${item.entityId}`} data-related-reference={item.entityId}>
                  <RelatedReference item={item} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </EditorialShell>
  );
}
