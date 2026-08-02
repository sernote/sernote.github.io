import { StaticAliasBody } from "@/components/routing/static-alias-page";
import { EditorialShell } from "@/components/site/editorial-shell";
import { staticAliasMetadata } from "@/lib/metadata";

const DESTINATION = "/materials";

export const metadata = staticAliasMetadata(DESTINATION, "ru");

export default function WorkPage() {
  return (
    <EditorialShell currentPath="/materials">
      <StaticAliasBody destination={DESTINATION} locale="ru" />
    </EditorialShell>
  );
}
