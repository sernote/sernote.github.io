import { HomePageContent } from "@/components/pages/marketing-pages";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata("en");

export default function EnglishHome() {
  return <HomePageContent locale="en" currentPath="/en" />;
}
