"use client";

import type { ComponentProps } from "react";
import { useDocsPage } from "fumadocs-ui/layouts/docs/page";

import { cn } from "@/lib/utils";

export function DocsMainContainer({ className, children, ...props }: ComponentProps<"article">) {
  const {
    props: { full }
  } = useDocsPage();

  return (
    <main
      {...props}
      id="main-content"
      data-full={full}
      className={cn(
        "content-safe flex min-w-0 w-full max-w-[900px] flex-col mx-auto [grid-area:main] px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14",
        full && "max-w-[1168px]",
        className
      )}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
