import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { SkipLink } from "@/components/marketing/site-shell";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function HandbookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink locale="en" />
      <DocsLayout tree={source.pageTree} {...baseOptions("en")}>
        {children}
      </DocsLayout>
    </>
  );
}
