import { PrefixCacheAuditorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "prefix", "/tools/prefix-cache-auditor");

export default function RuPrefixCacheAuditorPage() {
  return <PrefixCacheAuditorPageContent locale="ru" currentPath="/ru/tools/prefix-cache-auditor" />;
}
