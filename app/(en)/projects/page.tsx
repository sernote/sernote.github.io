import { ProjectsPageContent } from "@/components/pages/v3-marketing-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getProjectsViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("projects");

export default function ProjectsPage() {
  return <ProjectsPageContent model={getProjectsViewModel(v3Source)} />;
}
