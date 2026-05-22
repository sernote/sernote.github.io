import { ContactPageContent } from "@/components/pages/marketing-pages";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata("en", "contact");

export default function ContactPage() {
  return <ContactPageContent locale="en" currentPath="/en/contact" />;
}
