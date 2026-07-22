import { AiPlatformPageContent } from "@/components/pages/ai-platform-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getPlatformLandingViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("aiPlatform");

export default function AiPlatformPage() {
  return <AiPlatformPageContent model={getPlatformLandingViewModel(v3Source)} />;
}
