import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ContentToc } from "@/components/editorial/content-toc";
import type { ContentToc as Toc } from "@/lib/content-v3/source-core";
import { EditorialShell } from "@/components/site/editorial-shell";
import { formatRussianDate } from "@/lib/content-v3/view-models";
import { siteLinks } from "@/lib/i18n";

export type DetailFact = Readonly<{
  label: string;
  value: string;
  dateTime?: string;
}>;

export type DetailRelatedItem = Readonly<{
  href: string;
  title: string;
  meta: string;
}>;

type DetailAction = Readonly<{
  href: string;
  label: string;
  external?: boolean;
}>;

type V31ContentDetailPageProps = Readonly<{
  toc?: Toc;
  currentPath: string;
  kindLabel: string;
  title: string;
  lead: string;
  authorHref: string;
  bylineLabel?: string;
  publishedAt?: string;
  updatedAt?: string;
  facts?: readonly DetailFact[];
  media?: ReactNode;
  primaryAction?: DetailAction;
  related?: readonly DetailRelatedItem[];
  contactLabel: string;
  compactIntro?: boolean;
  children?: ReactNode;
}>;

function Action({ action }: { action: DetailAction }) {
  const contents = (
    <>
      {action.label}
      {action.external ? <ArrowUpRight aria-hidden="true" className="size-4" /> : <ArrowRight aria-hidden="true" className="size-4" />}
    </>
  );
  const className = "inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-primary hover:underline";
  return action.external ? (
    <a href={action.href} target="_blank" rel="noreferrer" className={className}>
      {contents}<span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
    </a>
  ) : (
    <Link href={action.href} className={className}>{contents}</Link>
  );
}

export function V31ContentDetailPage({
  toc,
  currentPath,
  kindLabel,
  title,
  lead,
  authorHref,
  bylineLabel = "Автор",
  publishedAt,
  updatedAt,
  facts = [],
  media,
  primaryAction,
  related = [],
  contactLabel,
  compactIntro = false,
  children
}: V31ContentDetailPageProps) {
  if ((publishedAt === undefined) !== (updatedAt === undefined)) {
    throw new Error("Publication dates must be supplied together");
  }

  return (
    <EditorialShell currentPath={currentPath}>
      <article className="mx-auto w-full max-w-[52rem] px-5 py-10 md:px-10 md:py-16 lg:px-0">
        <header className="border-b border-border pb-9">
          <p className="text-sm text-muted-foreground">{kindLabel}</p>
          <h1 className={`${compactIntro ? "max-w-3xl text-[2.15rem] md:text-[2.75rem]" : "text-[2.35rem] md:text-[3.15rem]"} mt-3 font-semibold leading-[1.08] tracking-[-0.045em]`}>
            {title}
          </h1>
          <p className={`${compactIntro ? "max-w-2xl text-base leading-7" : "max-w-3xl text-lg leading-8"} mt-5 text-muted-foreground`}>
            {lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <p>{bylineLabel} — <Link href={authorHref} className="text-foreground hover:text-primary">Сергей Нотевский</Link></p>
            {publishedAt ? <p>Опубликовано <time dateTime={publishedAt}>{formatRussianDate(publishedAt)}</time></p> : null}
            {updatedAt && updatedAt !== publishedAt ? <p>Обновлено <time dateTime={updatedAt}>{formatRussianDate(updatedAt)}</time></p> : null}
          </div>
          {facts.length ? (
            <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1 text-base font-medium">
                    {fact.dateTime ? <time dateTime={fact.dateTime}>{fact.value}</time> : fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {media ? <div className="mt-8">{media}</div> : null}
          {primaryAction ? <div className="mt-5"><Action action={primaryAction} /></div> : null}
        </header>

        <div className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-[-0.025em] prose-a:text-primary prose-pre:max-w-full prose-pre:overflow-x-auto md:prose-lg">
          <ContentToc toc={toc} />{children}
        </div>

        {related.length ? (
          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">Связанные материалы</h2>
            <div className="mt-4 border-t border-border">
              {related.slice(0, 3).map((item) => (
                <Link key={`${item.href}:${item.title}`} href={item.href} className="grid min-h-16 gap-1 border-b border-border py-4 hover:text-primary sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.meta}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="mt-12 border-t border-border pt-7">
          <a href={siteLinks.telegram} className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-primary hover:underline">
            {contactLabel}<ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </footer>
      </article>
    </EditorialShell>
  );
}
