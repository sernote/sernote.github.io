import { AboutPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "about");

export default function AboutPage() {
  return <AboutPageContent locale="ru" currentPath="/about" />;
}
