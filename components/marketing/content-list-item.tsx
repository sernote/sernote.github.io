import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { V3ListItemViewModel } from "@/lib/content-v3/view-models";

type ContentListItemProps = {
  item: V3ListItemViewModel;
  eyebrow?: string;
};

const rowClassName =
  "group grid min-h-11 w-full grid-cols-[minmax(0,1fr)_2.75rem] gap-4 border-b border-border/80 py-6 text-left transition-colors hover:bg-muted/25 focus-visible:bg-muted/25 md:grid-cols-[minmax(10rem,12rem)_minmax(0,1fr)_3rem] md:gap-8 md:px-2 md:py-8";

function RowContents({ item, eyebrow }: ContentListItemProps) {
  const Icon = item.linkKind === "external" ? ArrowUpRight : ArrowRight;

  return (
    <>
      <p className="col-span-2 font-mono text-[0.6875rem] uppercase leading-5 tracking-[0.1em] text-primary md:col-span-1">
        {eyebrow ?? item.meta}
      </p>
      <span className="min-w-0">
        <span className="block text-xl font-semibold leading-7 tracking-[-0.015em] text-foreground sm:text-2xl sm:leading-8">
          {item.title}
        </span>
        <span className="mt-3 block max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {item.description}
        </span>
      </span>
      <span className="flex min-h-11 items-start justify-end text-primary md:pt-1">
        <Icon
          aria-hidden="true"
          className="size-5 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
        {item.linkKind === "external" ? (
          <span className="sr-only">Внешняя ссылка</span>
        ) : null}
      </span>
    </>
  );
}

export function ContentListItem({ item, eyebrow }: ContentListItemProps) {
  const sharedProps = {
    "data-entity-id": item.entityId,
    "data-link-kind": item.linkKind,
    className: rowClassName
  } as const;

  if (item.linkKind === "external") {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" {...sharedProps}>
        <RowContents item={item} eyebrow={eyebrow} />
      </a>
    );
  }

  return (
    <Link href={item.href} {...sharedProps}>
      <RowContents item={item} eyebrow={eyebrow} />
    </Link>
  );
}
