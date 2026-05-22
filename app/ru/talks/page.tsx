import { TalksPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "talks");

export default function RuTalksPage() {
  return <TalksPageContent locale="ru" currentPath="/ru/talks" />;
}
