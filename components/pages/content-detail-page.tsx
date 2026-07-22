import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MarketingPage } from "@/components/marketing/site-shell";
import { formatRussianDate } from "@/lib/content-v3/view-models";
import { cn } from "@/lib/utils";

type DetailAction = Readonly<{
  label: string;
  href: string;
  external?: boolean;
}>;

export type ContentDetailPageProps = {
  currentPath: string;
  overline: string;
  title: string;
  deck: string;
  author: Readonly<{
    name: string;
    href: string;
  }>;
  publishedAt: string;
  updatedAt: string;
  media?: ReactNode;
  primaryAction?: DetailAction;
  afterContent?: ReactNode;
  contact: Readonly<{
    context: string;
    label: string;
  }>;
  children: ReactNode;
};

function PrimaryAction({ action }: { action: DetailAction }) {
  const contents = (
    <>
      {action.label}
      {action.external ? (
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
    "group inline-flex min-h-11 items-center gap-2 border-b border-primary/60 py-2 text-sm font-semibold text-foreground hover:text-primary";

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noreferrer" className={className}>
        {contents}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {contents}
    </Link>
  );
}

export function EditorialMdxLink({
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
          <span
            aria-hidden="true"
            data-external-cue="true"
            className="ml-1 inline-block text-primary no-underline"
          >
            ↗
          </span>
          <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
        </>
      ) : null}
    </a>
  );
}

export function ContentDetailPage({
  currentPath,
  overline,
  title,
  deck,
  author,
  publishedAt,
  updatedAt,
  media,
  primaryAction,
  afterContent,
  contact,
  children
}: ContentDetailPageProps) {
  const showUpdated = updatedAt !== publishedAt;

  return (
    <MarketingPage locale="ru" currentPath={currentPath}>
      <article
        aria-labelledby="content-detail-title"
        className="mx-auto w-full max-w-[45rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
      >
        <header>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary">
            {overline}
          </p>
          <h1
            id="content-detail-title"
            className="mt-4 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {deck}
          </p>

          <div className="mt-8 space-y-2 border-y border-border/80 py-5 font-mono text-xs leading-5 text-muted-foreground">
            <p>
              Автор —{" "}
              <Link href={author.href} className="text-foreground hover:text-primary">
                {author.name}
              </Link>
            </p>
            <p>
              Опубликовано{" "}
              <time dateTime={publishedAt}>{formatRussianDate(publishedAt)}</time>
            </p>
            {showUpdated ? (
              <p>
                Обновлено <time dateTime={updatedAt}>{formatRussianDate(updatedAt)}</time>
              </p>
            ) : null}
          </div>

          {media ? <div className="mt-10">{media}</div> : null}
          {primaryAction ? (
            <div className="mt-8">
              <PrimaryAction action={primaryAction} />
            </div>
          ) : null}
        </header>

        <div className="mt-12 sm:mt-14">{children}</div>

        {afterContent ? <div className="mt-16 sm:mt-20">{afterContent}</div> : null}

        <footer className="mt-16 border-t border-border/80 pt-8 sm:mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            {contact.context}
          </p>
          <Link
            href="/contact"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            {contact.label}
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
