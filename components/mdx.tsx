import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { CacheRoutingLab } from "@/components/tools/cache-routing-lab";
import { Callout } from "@/components/handbook/callout";
import { Checklist } from "@/components/handbook/checklist";
import { DecisionMatrix } from "@/components/handbook/decision-matrix";
import { MaturityModel } from "@/components/handbook/maturity-model";
import { BlockDiagram, FlowDiagram, StackDiagram } from "@/components/handbook/pattern-diagrams";
import { PlatformMap } from "@/components/handbook/platform-map";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    CacheRoutingLab,
    Checklist,
    DecisionMatrix,
    FlowDiagram,
    BlockDiagram,
    StackDiagram,
    MaturityModel,
    PlatformMap,
    ...components
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
