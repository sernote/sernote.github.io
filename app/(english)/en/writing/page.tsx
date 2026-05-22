import { WritingPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("en", "writing");

export default function WritingPage() {
  return <WritingPageContent locale="en" currentPath="/en/writing" />;
}
