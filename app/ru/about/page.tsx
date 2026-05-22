import { AboutPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "about");

export default function RuAboutPage() {
  return <AboutPageContent locale="ru" currentPath="/ru/about" />;
}
