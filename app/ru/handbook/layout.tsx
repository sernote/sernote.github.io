import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { SkipLink } from "@/components/marketing/site-shell";
import { baseOptions } from "@/lib/layout.shared";
import { sourceRu } from "@/lib/source";

export default function RuHandbookLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink locale="ru" />
      <DocsLayout tree={sourceRu.pageTree} {...baseOptions("ru")}>
        {children}
      </DocsLayout>
    </>
  );
}
