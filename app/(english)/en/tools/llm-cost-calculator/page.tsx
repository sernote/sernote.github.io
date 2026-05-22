import { LlmCostCalculatorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("en", "cost", "/tools/llm-cost-calculator");

export default function LlmCostCalculatorPage() {
  return <LlmCostCalculatorPageContent locale="en" currentPath="/en/tools/llm-cost-calculator" />;
}
