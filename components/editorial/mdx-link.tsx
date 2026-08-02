import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

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
          <ArrowUpRight
            aria-hidden="true"
            data-external-cue="true"
            className="ml-1 inline size-3.5 align-[-0.125em] text-primary no-underline"
          />
          <span className="sr-only">
            Внешняя ссылка, откроется в новой вкладке
          </span>
        </>
      ) : null}
    </a>
  );
}
