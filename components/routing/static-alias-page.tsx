import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const ALIAS_COPY: Record<Locale, { title: string; body: string; cta: string }> = {
  ru: {
    title: "Страница переехала",
    body: "Этот адрес сохранён для старых ссылок. Актуальная версия материала теперь находится здесь.",
    cta: "Перейти к актуальной странице"
  },
  en: {
    title: "This page has moved",
    body: "This address is kept for older links. The current version of the material now lives here.",
    cta: "Go to the current page"
  }
};

/**
 * Landmark-neutral alias content: a concise explanation and one honest link to
 * the canonical destination. It never renders a skip link or a `<main>` — the
 * composing shell (marketing or handbook) owns those landmarks.
 */
export function StaticAliasBody({
  destination,
  locale
}: {
  destination: string;
  locale: Locale;
}) {
  const copy = ALIAS_COPY[locale];
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-16" data-static-alias={destination}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{copy.title}</h1>
      <p className="text-muted-foreground">{copy.body}</p>
      <p>
        <Link href={destination} className="font-medium text-primary underline underline-offset-4">
          {copy.cta}
        </Link>
      </p>
    </div>
  );
}

/**
 * The handbook-flavored `<main>` for alias routes. The handbook layout owns the
 * skip link, so this is the sole `main#main-content` in that composition.
 */
export function DocsAliasMain({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "content-safe flex min-w-0 w-full max-w-[900px] flex-col mx-auto [grid-area:main] px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14",
        className
      )}
    >
      {children}
    </main>
  );
}
