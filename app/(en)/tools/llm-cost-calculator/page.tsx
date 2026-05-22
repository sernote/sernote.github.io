import { LlmCostCalculatorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "cost", "/tools/llm-cost-calculator");

export default function LlmCostCalculatorPage() {
  return <LlmCostCalculatorPageContent locale="ru" currentPath="/tools/llm-cost-calculator" />;
}
