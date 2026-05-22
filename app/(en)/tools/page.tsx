import type { Metadata } from "next";

import { ToolsIndexPageContent } from "@/components/pages/tool-pages";

export const metadata: Metadata = {
  title: "Инструменты",
  description: "Локальные инструменты для работы с production AI-платформой."
};

export default function ToolsPage() {
  return <ToolsIndexPageContent locale="ru" currentPath="/tools" />;
}
