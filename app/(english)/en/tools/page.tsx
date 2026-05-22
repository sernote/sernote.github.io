import { ToolsIndexPageContent } from "@/components/pages/tool-pages";
import { toolsIndexMetadata } from "@/lib/metadata";

export const metadata = toolsIndexMetadata("en");

export default function ToolsPage() {
  return <ToolsIndexPageContent currentPath="/en/tools" />;
}
