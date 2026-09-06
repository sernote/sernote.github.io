import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import type { SelectedReading } from "@/lib/content-v3/view-models";

function ReadingLink({ item, children }: { item: SelectedReading; children: ReactNode }) {
  const className = "hover:text-primary hover:underline underline-offset-4";
  if (item.linkKind === "external") {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4 align-baseline" />
        <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
      </a>
    );
  }
  return <Link href={item.href} className={className}>{children}</Link>;
}

function ReadingMetadata({ item }: { item: SelectedReading }) {
  if (!item.publishedLabel && item.linkKind !== "external") return null;
  return (
    <p className="mt-3 flex flex-wrap gap-x-3 text-xs leading-5 text-muted-foreground">
      {item.publishedLabel ? <span>{item.publishedLabel}</span> : null}
      {item.linkKind === "external" ? (
        <>
          {item.sourceName ? <span>{item.sourceName}</span> : null}
          <span>В новой вкладке</span>
        </>
      ) : null}
    </p>
  );
}

export function SelectedReadingCards({ items, title = "Для первого знакомства" }: {
  items: readonly SelectedReading[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="selected-reading-heading" className="py-10 md:py-12">
      <h2 id="selected-reading-heading" className="text-2xl font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      <ol className="mt-7 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-8 lg:gap-12">
        {items.map((item) => (
          <li key={item.entityId} className="min-w-0 border-t border-border pt-5">
            <p className="text-sm font-medium leading-6 text-primary">{item.label}</p>
            <h3 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.025em]">
              <ReadingLink item={item}>{item.title}</ReadingLink>
            </h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{item.reason}</p>
            <ReadingMetadata item={item} />
          </li>
        ))}
      </ol>
    </section>
  );
}
