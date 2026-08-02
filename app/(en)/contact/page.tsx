import { StaticAliasBody } from "@/components/routing/static-alias-page";
import { EditorialShell } from "@/components/site/editorial-shell";
import { staticAliasMetadata } from "@/lib/metadata";

const DESTINATION = "/about";

export const metadata = staticAliasMetadata(DESTINATION, "ru");

export default function ContactPage() {
  return (
    <EditorialShell currentPath="/about">
      <StaticAliasBody destination={DESTINATION} locale="ru" />
    </EditorialShell>
  );
}
