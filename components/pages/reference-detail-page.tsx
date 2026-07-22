import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import { MarketingPage } from "@/components/marketing/site-shell";
import type {
  ReferenceDetailViewModel,
  V3ListItemViewModel
} from "@/lib/content-v3/view-models";

function BreadcrumbItem({ item }: { item: V3ListItemViewModel }) {
  return (
    <span className="inline-flex min-w-0 max-w-full items-center gap-1">
      <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
      <Link
        href={item.href}
        className="inline-flex min-h-11 min-w-0 max-w-full items-center truncate py-2 hover:text-primary"
      >
        {item.title}
      </Link>
    </span>
  );
}

function RelatedLink({ item }: { item: V3ListItemViewModel }) {
  const contents = (
    <>
      <span className="min-w-0">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">
          {item.meta}
          {item.reviewStatusLabel === undefined ? null : (
            <span className="text-primary"> · {item.reviewStatusLabel}</span>
          )}
        </span>
        <span className="mt-2 block text-lg font-semibold text-foreground group-hover:text-primary group-focus-visible:text-primary">
          {item.title}
        </span>
      </span>
      {item.linkKind === "external" ? (
        <>
          <ArrowUpRight aria-hidden="true" className="size-4 text-primary" />
          <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
        </>
      ) : (
        <ArrowRight aria-hidden="true" className="size-4 text-primary" />
      )}
    </>
  );
  const className =
    "group grid min-h-11 grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-4 border-b border-border/80 py-5";

  if (item.linkKind === "external") {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {contents}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {contents}
    </Link>
  );
}

export function ReferenceDetailPage({
  model,
  children
}: {
  model: ReferenceDetailViewModel;
  children: ReactNode;
}) {
  return (
    <MarketingPage locale="ru" currentPath={model.href}>
      <article
        aria-labelledby="reference-detail-title"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <header className="max-w-[48rem]">
          <nav
            aria-label="Хлебные крошки"
            className="mb-8 flex min-w-0 flex-wrap items-center gap-x-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground"
          >
            <Link
              href="/ai-platform"
              className="inline-flex min-h-11 items-center px-1 py-2 hover:text-primary"
            >
              AI Platform
            </Link>
            {model.contentType === "platform-area" ? (
              <span className="inline-flex min-w-0 max-w-full items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
                <Link
                  href="/ai-platform/map"
                  className="inline-flex min-h-11 items-center px-1 py-2 hover:text-primary"
                >
                  Карта
                </Link>
              </span>
            ) : null}
            {model.primaryArea !== null ? <BreadcrumbItem item={model.primaryArea} /> : null}
            {model.parentComponent !== null ? (
              <BreadcrumbItem item={model.parentComponent} />
            ) : null}
            <span className="inline-flex min-w-0 max-w-full items-center gap-1">
              <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
              <span
                aria-current="page"
                className="inline-flex min-h-11 min-w-0 max-w-full items-center truncate py-2 text-foreground"
              >
                {model.title}
              </span>
            </span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary">
            {model.typeLabel}
          </p>
          {model.isSynthetic ? (
            <p className="mt-4 border-l border-primary/60 pl-4 text-sm font-medium leading-6 text-foreground">
              Синтетический кейс: публичная демонстрация на специально подготовленных данных, а не результат production-системы.
            </p>
          ) : null}
          {model.reviewStatus === "stale" ? (
            <p
              role="status"
              className="mt-4 border border-border/80 bg-muted/20 px-4 py-3 text-sm leading-6 text-foreground"
            >
              Нужна повторная проверка. Материал остаётся доступным, но его источники или допущения вышли за установленный цикл review.
            </p>
          ) : null}
          <h1
            id="reference-detail-title"
            className="mt-4 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {model.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {model.description}
          </p>

          <div className="reference-meta mt-8 border-y border-border/80 py-5">
            <span>
              Автор —{" "}
              <Link href="/about" className="text-foreground hover:text-primary">
                Сергей Нотевский
              </Link>
            </span>
            <span>{model.typeLabel}</span>
            <span>
              {model.reviewStatusLabel}{" "}
              <time dateTime={model.reviewedAt}>{model.reviewedLabel}</time>
            </span>
          </div>
        </header>

        <section
          aria-label="Назначение и граница материала"
          className="mt-12 grid border-y border-border/80 lg:grid-cols-2"
        >
          <div className="py-6 lg:border-r lg:border-border/80 lg:pr-8">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-primary">
              Назначение
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/90 sm:text-base sm:leading-7">
              {model.purpose}
            </p>
          </div>
          <div className="border-t border-border/80 py-6 lg:border-t-0 lg:pl-8">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-primary">
              Граница материала
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/90 sm:text-base sm:leading-7">
              {model.boundary}
            </p>
          </div>
        </section>

        <div className="mt-12 min-w-0 max-w-[45rem] [overflow-wrap:anywhere] sm:mt-16">
          {children}
        </div>

        <section aria-labelledby="reference-evidence-heading" className="mt-16 sm:mt-20">
          <div className="max-w-[48rem]">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
              Проверка материала
            </p>
            <h2
              id="reference-evidence-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
            >
              Применимость, ограничения и источники
            </h2>
          </div>

          <div className="mt-8 grid border-y border-border/80 lg:grid-cols-2">
            <div className="py-6 lg:border-r lg:border-border/80 lg:pr-8">
              <h3 className="text-lg font-semibold text-foreground">Применимость</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {model.applicability}
              </p>
            </div>
            <div className="border-t border-border/80 py-6 lg:border-t-0 lg:pl-8">
              <h3 className="text-lg font-semibold text-foreground">Ограничения</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {model.limitations}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-[48rem]">
            <h3 className="text-xl font-semibold text-foreground">Источники</h3>
            <ul className="mt-4 m-0 list-none border-t border-border/80 p-0">
              {model.sources.map((source) => (
                <li key={source.url} className="border-b border-border/80 py-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-11 items-center justify-between gap-4 py-1 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <span>
                      {source.title}
                      <span className="mt-1 block font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-muted-foreground">
                        Проверено <time dateTime={source.verifiedAt}>{source.verifiedLabel}</time>
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {model.related.length > 0 ? (
          <section aria-labelledby="related-reference-heading" className="mt-16 sm:mt-20">
            <div className="max-w-[48rem]">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                Продолжить
              </p>
              <h2
                id="related-reference-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              >
                Связанные материалы
              </h2>
              <div className="mt-6 border-t border-border/80">
                {model.related.map((item) => (
                  <div key={`${item.contentType}:${item.entityId}`} data-related-reference={item.entityId}>
                    <RelatedLink item={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <footer className="mt-16 max-w-[48rem] border-t border-border/80 pt-8 sm:mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            Обсудить материал
          </p>
          <Link
            href="/contact"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Связаться с Сергеем
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-primary transition-transform group-hover:translate-x-1"
            />
          </Link>
        </footer>
      </article>
    </MarketingPage>
  );
}
