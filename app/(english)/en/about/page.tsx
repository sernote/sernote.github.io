import { AboutPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("en", "about");

export default function AboutPage() {
  return <AboutPageContent locale="en" currentPath="/en/about" />;
}
