import { WritingPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "writing");

export default function RuWritingPage() {
  return <WritingPageContent locale="ru" currentPath="/ru/writing" />;
}
