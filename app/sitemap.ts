import type { MetadataRoute } from "next";

import { v3Source } from "@/lib/content-v3/source";
import { buildSitemapEntries } from "@/lib/seo/urls";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(v3Source.listPublic(undefined, "ru"));
}
