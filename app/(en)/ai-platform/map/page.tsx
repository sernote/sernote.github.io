import { AiPlatformMapPageContent } from "@/components/pages/ai-platform-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getPlatformMapViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("aiPlatformMap");

export default function AiPlatformMapPage() {
  return <AiPlatformMapPageContent model={getPlatformMapViewModel(v3Source)} />;
}
