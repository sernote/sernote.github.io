import { MarketingPage } from "@/components/marketing/site-shell";
import { StaticAliasBody } from "@/components/routing/static-alias-page";
import { staticAliasMetadata } from "@/lib/metadata";
import { getSelectedAliasDestination } from "@/lib/migration/manifest";

const DESTINATION = getSelectedAliasDestination("/writing") ?? "/blog";

export const metadata = staticAliasMetadata(DESTINATION, "ru");

export default function WritingPage() {
  return (
    <MarketingPage locale="ru" currentPath="/writing">
      <StaticAliasBody destination={DESTINATION} locale="ru" />
    </MarketingPage>
  );
}
