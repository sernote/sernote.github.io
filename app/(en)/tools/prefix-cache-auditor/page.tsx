import { PrefixCacheAuditorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("ru", "prefix", "/tools/prefix-cache-auditor");

export default function PrefixCacheAuditorPage() {
  return <PrefixCacheAuditorPageContent locale="ru" currentPath="/tools/prefix-cache-auditor" />;
}
