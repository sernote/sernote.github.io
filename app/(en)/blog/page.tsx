import { BlogPageContent } from "@/components/pages/v31-personal-pages";
import { v3Source } from "@/lib/content-v3/source";
import { getBlogViewModel } from "@/lib/content-v3/view-models";
import { v3MarketingMetadata } from "@/lib/metadata";

export const metadata = v3MarketingMetadata("blog");

export default function BlogPage() {
  return <BlogPageContent model={getBlogViewModel(v3Source)} />;
}
