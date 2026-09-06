import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import { PlatformMap, getAreaPresentation } from "@/components/ai-platform/platform-map";
import { ContentToc } from "@/components/editorial/content-toc";
import { EditorialShell } from "@/components/site/editorial-shell";
import type {
  PlatformLandingViewModel,
  PlatformMapViewModel,
  ReferenceDetailViewModel,
  V3ListItemViewModel
} from "@/lib/content-v3/view-models";
import { cn } from "@/lib/utils";

const frameClassName = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[72px]";

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
    <h2 className="max-w-[52rem] text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-[1.75rem]">
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
  const questions = model.questions ?? [];
  const mapEntry = model.entryModes.find((entry) => entry.id === "map");
  const verticalEntry = model.entryModes.find((entry) => entry.id === "vertical");

  return (
    <EditorialShell currentPath="/ai-platform">
      <div className={`${frameClassName} py-10 md:py-12 lg:py-14`}>
        <header data-platform-hero="" className="max-w-[820px]">
          <p className="text-sm font-medium text-primary">Инженерный хэндбук</p>
          <h1 className="mt-4 text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.75rem]">
            AI Platform
          </h1>
          <p className="mt-7 max-w-[48rem] text-xl leading-[1.45] tracking-[-0.015em] md:text-[1.5rem] md:leading-[1.45]">
            Как проектировать и эксплуатировать AI-платформу: разбирать задержки, выбирать пулы и проверять, что оптимизация действительно помогает.
          </p>
          <p className="mt-4 max-w-[43rem] text-base leading-7 text-muted-foreground">
            Начинаю с исполнения запросов и кэша. Здесь собраны главы, авторские разборы и воспроизводимые проверки.
          </p>
          <nav aria-label="Как читать хэндбук" className="mt-5 flex flex-wrap gap-x-8">
            {questions.length > 0 ? <InlineLink href="#handbook-questions">Выбрать вопрос</InlineLink> : null}
            <InlineLink href={verticalEntry?.href ?? "#current-vertical"}>Читать по порядку</InlineLink>
            <InlineLink href={mapEntry?.href ?? "/ai-platform/map"}>Открыть карту</InlineLink>
          </nav>
        </header>

        {questions.length > 0 ? (
          <section id="handbook-questions" aria-labelledby="handbook-questions-heading" className="mt-10 scroll-mt-24 md:mt-14">
            <SectionTitle><span id="handbook-questions-heading">С каким вопросом вы пришли</span></SectionTitle>
            <div className="mt-6 grid border-l border-t border-border md:grid-cols-2">
              {questions.map((question) => (
                <Link
                  key={question.id}
                  href={question.href}
                  data-platform-question={question.id}
                  className="group flex min-w-0 flex-col border-b border-r border-border px-5 py-6 transition-colors hover:bg-[var(--surface-subtle)] focus-visible:bg-[var(--surface-subtle)] md:p-7"
                >
                  <p className="text-xs font-medium text-muted-foreground">{question.meta}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-[1.3] tracking-[-0.02em] group-hover:text-primary group-focus-visible:text-primary">{question.question}</h3>
                  <p className="mb-5 mt-3 text-sm leading-6 text-muted-foreground">{question.outcome}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {question.action}<ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section id="current-vertical" aria-labelledby="platform-vertical-heading" className="mt-14 scroll-mt-24 md:mt-20">
          <SectionTitle><span id="platform-vertical-heading">Разобраться по порядку</span></SectionTitle>
          <p className="mt-3 max-w-[760px] text-base leading-7 text-muted-foreground">{verticalEntry?.description}</p>
          <ol className="m-0 mt-7 list-none border-t border-border p-0">
            {model.vertical.map((node, index) => (
              <li key={node.entityId} data-vertical-node={node.entityId} className="border-b border-border">
                <Link href={node.href} className="group grid min-h-11 grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 gap-y-3 py-6 md:grid-cols-[2rem_minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-x-7">
                  <span className="pt-1 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{node.meta} · {node.statusLabel}</p>
                    <h3 className="mt-2 text-lg font-semibold leading-6 group-hover:text-primary group-focus-visible:text-primary">
                      {node.title}<ArrowRight aria-hidden="true" className="ml-2 inline size-4 text-primary" />
                    </h3>
                  </div>
                  {node.outcome ? <p className="col-start-2 text-sm leading-6 text-muted-foreground md:col-start-3 md:self-center">{node.outcome}</p> : null}
                </Link>
              </li>
            ))}
          </ol>
          {model.introduction ? (
            <aside className="mt-6 border-l-2 border-primary pl-5">
              <p className="text-sm leading-6 text-muted-foreground">Если общая платформа ещё только обсуждается, начните с границ, качества и ответственности.</p>
              <InlineLink href={model.introduction.href}>{model.introduction.title}</InlineLink>
            </aside>
          ) : null}
        </section>

        <section aria-labelledby="platform-areas-heading" className="mt-14 border-t border-border pt-8 md:mt-20">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
            <SectionTitle><span id="platform-areas-heading">Что ещё входит в AI-платформу</span></SectionTitle>
            <InlineLink href={mapEntry?.href ?? "/ai-platform/map"}>Карта с границами ответственности</InlineLink>
          </div>
          <p className="mt-3 max-w-[760px] text-sm leading-6 text-muted-foreground">
            Карта задаёт устройство справочника. По ссылкам открываются опубликованные области; будущие отмечены отдельно.
          </p>
          <div className="mt-7 border-t border-border">
            {mapModel.areas.map((area) => {
              const presentation = getAreaPresentation(area);
              const status = area.statusLabel === "Планируется" ? "Запланировано" : area.statusLabel === "Доступно" ? "Проверено" : "Нужна проверка";
              const content = (
                <>
                  <div>
                    <h3 className="text-base font-semibold leading-6 group-hover:text-primary group-focus-visible:text-primary">
                      {presentation.title}
                      {area.href === null ? null : <ArrowRight aria-hidden="true" className="ml-2 inline size-4 text-primary" />}
                    </h3>
                    <p data-platform-area-status={status} className="mt-2 text-xs text-muted-foreground">{status}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{area.purpose}</p>
                </>
              );
              const className = "grid min-w-0 gap-3 border-b border-border py-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12";
              return area.href === null ? (
                <div key={area.entityId} data-platform-area-summary={area.entityId} className={className}>{content}</div>
              ) : (
                <Link key={area.entityId} href={area.href} data-platform-area-summary={area.entityId} className={`group min-h-11 ${className}`}>{content}</Link>
              );
            })}
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

  return (
    <EditorialShell currentPath={model.href}>
      <article data-reference-type={model.contentType} className={`${frameClassName} py-10 md:py-12 lg:py-14`}>
        <header className="max-w-[800px]">
          <Breadcrumb model={model} />
          <p className="text-sm font-medium text-primary">{model.typeLabel}</p>
          {model.isSynthetic ? (
            <p className="mt-4 border-y border-border py-3 text-sm leading-6 text-foreground">
              Учебный пример на специально подготовленных данных.
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

        <ContentToc toc={model.toc} />

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
