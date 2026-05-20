import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/handbook/callout";
import { Checklist } from "@/components/handbook/checklist";
import { DecisionMatrix } from "@/components/handbook/decision-matrix";
import { MaturityModel } from "@/components/handbook/maturity-model";
import { PlatformMap } from "@/components/handbook/platform-map";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    Checklist,
    DecisionMatrix,
    MaturityModel,
    PlatformMap,
    ...components
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

