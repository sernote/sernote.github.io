import { PrefixCacheAuditorPageContent } from "@/components/pages/tool-pages";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("en", "prefix", "/tools/prefix-cache-auditor");

export default function PrefixCacheAuditorPage() {
  return <PrefixCacheAuditorPageContent locale="en" currentPath="/en/tools/prefix-cache-auditor" />;
}
