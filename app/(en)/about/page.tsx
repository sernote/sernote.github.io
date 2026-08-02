import { AboutPageContent } from "@/components/pages/v31-personal-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { v3Source } from "@/lib/content-v3/source";
import { getAboutViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";
import { buildAboutStructuredData } from "@/lib/seo/structured-data";

export const metadata = v3MarketingMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutStructuredData()} />
      <AboutPageContent model={getAboutViewModel(v3Source)} />
    </>
  );
}
