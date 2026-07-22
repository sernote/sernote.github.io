import { AboutPageContent } from "@/components/pages/v3-marketing-pages";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("about");

export default function AboutPage() {
  return <AboutPageContent />;
}
