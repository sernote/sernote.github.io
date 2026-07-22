import { TalksPageContent } from "@/components/pages/v3-marketing-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getTalksViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("talks");

export default function TalksPage() {
  return <TalksPageContent model={getTalksViewModel(v3Source)} />;
}
