import { ProjectsPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "projects");

export default function RuProjectsPage() {
  return <ProjectsPageContent locale="ru" currentPath="/ru/projects" />;
}
