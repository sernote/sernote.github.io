import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type DiagramItem = {
  label?: string;
  title: string;
  description?: string;
};

export function FlowDiagram({
  title,
  caption,
  steps
}: {
  title?: string;
  caption?: string;
  steps: DiagramItem[];
}) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-card/45 p-4 md:p-5">
      {title ? <figcaption className="font-mono text-xs uppercase text-primary">{title}</figcaption> : null}
      <div
        className="mt-4 grid gap-3 md:grid-cols-[repeat(var(--flow-count),minmax(0,1fr))]"
        style={{ "--flow-count": steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="relative">
            <div className="min-h-full rounded-md border border-border/80 bg-background/70 p-4">
              {step.label ? <p className="font-mono text-[11px] uppercase text-primary">{step.label}</p> : null}
              <p className="mt-2 text-sm font-semibold text-foreground">{step.title}</p>
              {step.description ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.description}</p> : null}
            </div>
            {index < steps.length - 1 ? (
              <div className="hidden md:absolute md:-right-3 md:top-1/2 md:z-10 md:block md:-translate-y-1/2">
                <span className="flex size-6 items-center justify-center rounded-full border border-border bg-background text-primary">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {caption ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{caption}</p> : null}
    </figure>
  );
}

export function BlockDiagram({
  title,
  caption,
  blocks,
  columns = 3
}: {
  title?: string;
  caption?: string;
  blocks: DiagramItem[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-card/45 p-4 md:p-5">
      {title ? <figcaption className="font-mono text-xs uppercase text-primary">{title}</figcaption> : null}
      <div
        className={cn(
          "mt-4 grid gap-3",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-3",
          columns === 4 && "md:grid-cols-2 xl:grid-cols-4"
        )}
      >
        {blocks.map((block, index) => (
          <div key={`${block.title}-${index}`} className="rounded-md border border-border/80 bg-background/70 p-4">
            {block.label ? <p className="font-mono text-[11px] uppercase text-primary">{block.label}</p> : null}
            <p className="mt-2 text-sm font-semibold text-foreground">{block.title}</p>
            {block.description ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{block.description}</p> : null}
          </div>
        ))}
      </div>
      {caption ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{caption}</p> : null}
    </figure>
  );
}

export function StackDiagram({
  title,
  caption,
  items
}: {
  title?: string;
  caption?: string;
  items: DiagramItem[];
}) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-card/45 p-4 md:p-5">
      {title ? <figcaption className="font-mono text-xs uppercase text-primary">{title}</figcaption> : null}
      <div className="mt-4 grid gap-2">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="grid gap-2 rounded-md border border-border/80 bg-background/70 p-3 md:grid-cols-[160px_1fr] md:items-center"
          >
            <p className="font-mono text-xs text-primary">{item.label ?? String(index + 1).padStart(2, "0")}</p>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              {item.description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
      {caption ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{caption}</p> : null}
    </figure>
  );
}
