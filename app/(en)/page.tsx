import { HomePageContent } from "@/components/pages/v3-marketing-pages";
import { getHomeViewModel } from "@/lib/content-v3/view-models";
import { v3Source } from "@/lib/content-v3/source";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("home");

export default function Home() {
  return <HomePageContent model={getHomeViewModel(v3Source)} />;
}
