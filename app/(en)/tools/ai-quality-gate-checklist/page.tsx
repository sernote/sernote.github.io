import { QualityGateChecklistPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "quality", "/tools/ai-quality-gate-checklist");

export default function AiQualityGateChecklistPage() {
  return <QualityGateChecklistPageContent locale="ru" currentPath="/tools/ai-quality-gate-checklist" />;
}
