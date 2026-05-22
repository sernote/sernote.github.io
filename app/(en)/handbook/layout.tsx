import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/layout.shared";
import { sourceRuRoot } from "@/lib/source";

export default function HandbookLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={sourceRuRoot.pageTree} {...baseOptions("ru")}>
      {children}
    </DocsLayout>
  );
}
