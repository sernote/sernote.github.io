import { HomePageContent } from "@/components/pages/v31-personal-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { getHomeViewModel } from "@/lib/content-v3/view-models";
import { v3Source } from "@/lib/content-v3/source";
import { v3MarketingMetadata } from "@/lib/metadata";
import { buildHomeStructuredData } from "@/lib/seo/structured-data";

export const metadata = v3MarketingMetadata("home");

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />
      <HomePageContent model={getHomeViewModel(v3Source)} />
    </>
  );
}
