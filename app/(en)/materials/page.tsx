import { MaterialsPageContent } from "@/components/pages/v31-personal-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getMaterialsViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("materials");

export default function MaterialsPage() {
  return <MaterialsPageContent model={getMaterialsViewModel(v3Source)} />;
}
