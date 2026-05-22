import { LlmCostCalculatorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "cost", "/tools/llm-cost-calculator");

export default function RuLlmCostCalculatorPage() {
  return <LlmCostCalculatorPageContent locale="ru" currentPath="/ru/tools/llm-cost-calculator" />;
}
