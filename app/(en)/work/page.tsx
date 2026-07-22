import { WorkPageContent } from "@/components/pages/v3-marketing-pages";
import { getWorkViewModel } from "@/lib/content-v3/view-models";
import { v3Source } from "@/lib/content-v3/source";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("work");

export default function WorkPage() {
  return <WorkPageContent model={getWorkViewModel(v3Source)} />;
}
