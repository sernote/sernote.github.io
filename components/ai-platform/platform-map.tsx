import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type {
  PlatformMapAreaViewModel,
  PlatformMapViewModel
} from "@/lib/content-v3/view-models";
import { cn } from "@/lib/utils";

function AreaContents({ area }: { area: PlatformMapAreaViewModel }) {
  return (
    <div className="grid min-w-0 gap-5 py-7 lg:grid-cols-[3rem_minmax(12rem,0.8fr)_minmax(18rem,1.2fr)_10rem] lg:items-start lg:gap-8">
      <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
        {area.index}
      </span>
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {area.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.purpose}</p>
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-primary">
          Граница ответственности
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/85">{area.mapBoundary}</p>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-3 lg:items-end">
        <span
          className={cn(
            "font-mono text-[0.6875rem] uppercase tracking-[0.08em]",
            area.statusLabel === "Планируется" ? "text-muted-foreground" : "text-primary"
          )}
        >
          {area.statusLabel}
        </span>
        {area.href !== null ? (
          <span className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-foreground group-hover:text-primary group-focus-visible:text-primary">
            Открыть область
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-primary transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function PlatformMap({ model }: { model: PlatformMapViewModel }) {
  return (
    <ol
      aria-label="Области AI Platform"
      className="m-0 list-none border-t border-border/80 p-0"
    >
      {model.areas.map((area) => (
        <li
          key={area.entityId}
          data-platform-area={area.entityId}
          data-map-row=""
          className="min-w-0 border-b border-border/80"
        >
          {area.href === null ? (
            <div className="min-w-0">
              <AreaContents area={area} />
            </div>
          ) : (
            <Link
              href={area.href}
              data-area-link={area.entityId}
              className="group block min-h-11 min-w-0 transition-colors hover:bg-muted/25 focus-visible:bg-muted/25"
            >
              <AreaContents area={area} />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
