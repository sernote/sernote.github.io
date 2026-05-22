import { HomePageContent } from "@/components/pages/marketing-pages";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata("ru");

export default function RuHome() {
  return <HomePageContent locale="ru" currentPath="/ru" />;
}
