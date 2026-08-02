import { AboutPageContent } from "@/components/pages/v31-personal-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getAboutViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("about");

export default function AboutPage() {
  return <AboutPageContent model={getAboutViewModel(v3Source)} />;
}
