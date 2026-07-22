import { v3Source } from "@/lib/content-v3/source";
import type { V3Article } from "@/lib/content-v3/schema";
import { buildRssFeed } from "@/lib/seo/rss";

export const dynamic = "force-static";

export function GET(): Response {
  const articles = v3Source
    .listPublic("article", "ru")
    .filter((record): record is typeof record & V3Article => record.type === "article");

  return new Response(buildRssFeed(articles), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
