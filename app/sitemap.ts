import type { MetadataRoute } from "next";

import routeManifest from "@/config/v3-route-manifest.json";
import { parseManifest, validateManifest } from "@/lib/migration/manifest";
import { buildSitemapEntries } from "@/lib/seo/urls";

export const dynamic = "force-static";

const manifest = validateManifest(parseManifest(routeManifest));

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(manifest);
}
