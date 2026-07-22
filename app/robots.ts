import type { MetadataRoute } from "next";

import { publicFileUrl } from "@/lib/seo/urls";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: publicFileUrl("/sitemap.xml")
  };
}
