import { TalksPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("en", "talks");

export default function TalksPage() {
  return <TalksPageContent locale="en" currentPath="/en/talks" />;
}
