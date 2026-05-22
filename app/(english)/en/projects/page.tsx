import { ProjectsPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("en", "projects");

export default function ProjectsPage() {
  return <ProjectsPageContent locale="en" currentPath="/en/projects" />;
}
