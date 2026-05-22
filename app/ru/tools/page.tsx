import { ToolsIndexPageContent } from "@/components/pages/tool-pages";
import { toolsIndexMetadata } from "@/lib/metadata";

export const metadata = toolsIndexMetadata("ru");

export default function RuToolsPage() {
  return <ToolsIndexPageContent locale="ru" currentPath="/ru/tools" />;
}
