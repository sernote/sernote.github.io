import { TalksPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "talks");

export default function TalksPage() {
  return <TalksPageContent locale="ru" currentPath="/talks" />;
}
