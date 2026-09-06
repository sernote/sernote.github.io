import { getCanonicalUrl } from "./registry";
import type { V3Source } from "./source-core";

const ARTICLE_IDS = [
  "sticky-sessions-vs-prefix-routing",
  "cache-locality-is-a-routing-problem",
  "what-cache-router-knows",
  "kv-offload-economics"
] as const;

export type CacheSeries = Readonly<{
  title: string;
  currentId: string;
  position: number;
  items: readonly Readonly<{ entityId: string; title: string; href: string }>[];
}>;

export function getCacheSeries(source: Pick<V3Source, "listPublic">, entityId: string): CacheSeries | null {
  if (!ARTICLE_IDS.some((id) => id === entityId)) return null;
  const articles = source.listPublic("article", "ru");
  const items = ARTICLE_IDS.flatMap((id) => {
    const record = articles.find((item) => item.entityId === id && item.type === "article" && item.kind === "native" && item.locale === "ru" && item.publicationStatus === "published");
    return record ? [Object.freeze({ entityId: id, title: record.title, href: getCanonicalUrl(record) })] : [];
  });
  const position = items.findIndex((item) => item.entityId === entityId) + 1;
  if (position === 0 || items.length < 2) return null;
  return Object.freeze({ title: "Кэш и маршрутизация", currentId: entityId, position, items: Object.freeze(items) });
}
