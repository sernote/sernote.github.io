import { QualityGateChecklistPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("en", "quality", "/tools/ai-quality-gate-checklist");

export default function AiQualityGateChecklistPage() {
  return <QualityGateChecklistPageContent locale="en" currentPath="/en/tools/ai-quality-gate-checklist" />;
}
