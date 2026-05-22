import { ProjectsPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "projects");

export default function ProjectsPage() {
  return <ProjectsPageContent locale="ru" currentPath="/projects" />;
}
