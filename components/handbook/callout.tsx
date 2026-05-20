import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  children: ReactNode;
  type?: "note" | "warning" | "decision";
};

export function Callout({ title, children, type = "note" }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4",
        type === "warning" && "border-destructive/40 bg-destructive/10",
        type === "decision" && "border-primary/35 bg-primary/10",
        type === "note" && "border-border bg-muted/35"
      )}
    >
      {title ? <p className="mb-2 font-mono text-xs uppercase text-primary">{title}</p> : null}
      <div className="text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}

