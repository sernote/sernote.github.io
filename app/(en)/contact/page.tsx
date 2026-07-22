import { ContactPageContent } from "@/components/pages/v3-marketing-pages";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("contact");

export default function ContactPage() {
  return <ContactPageContent />;
}
