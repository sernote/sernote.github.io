import { QualityGateChecklistPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "quality", "/tools/ai-quality-gate-checklist");

export default function RuAiQualityGateChecklistPage() {
  return <QualityGateChecklistPageContent locale="ru" currentPath="/ru/tools/ai-quality-gate-checklist" />;
}
