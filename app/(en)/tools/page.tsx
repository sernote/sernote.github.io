import type { Metadata } from "next";

import { ToolsIndexPageContent } from "@/components/pages/tool-pages";

export const metadata: Metadata = {
  title: "Tools",
  description: "Client-side tools for production AI platform work."
};

export default function ToolsPage() {
  return <ToolsIndexPageContent currentPath="/tools" />;
}
