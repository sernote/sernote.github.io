import { ContactPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("ru", "contact");

export default function RuContactPage() {
  return <ContactPageContent locale="ru" currentPath="/ru/contact" />;
}
