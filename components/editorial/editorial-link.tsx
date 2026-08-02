import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type EditorialLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  showArrow?: boolean;
};

export function EditorialLink({
  children,
  className,
  showArrow = true,
  ...props
}: EditorialLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" className="size-4 shrink-0" /> : null}
    </Link>
  );
}
