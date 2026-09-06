import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";

import { ArticleSeries } from "../../components/editorial/article-series";
import { getCacheSeries } from "../../lib/content-v3/cache-series";
import type { V3SourceItem } from "../../lib/content-v3/source-core";

const ids = ["sticky-sessions-vs-prefix-routing", "cache-locality-is-a-routing-problem", "what-cache-router-knows", "kv-offload-economics"];
const articles = ids.map((entityId) => ({
  entityId, type: "article", locale: "ru", kind: "native", slug: entityId,
  title: `Заголовок ${entityId}`, publicationStatus: "published", reviewStatus: "unreviewed"
}) as V3SourceItem);

it("shows the current article among public series links without requiring the first article", () => {
  const series = getCacheSeries({ listPublic: () => articles }, ids[2]);
  expect(series?.position).toBe(3);
  expect(series?.items).toHaveLength(4);
  const html = renderToStaticMarkup(createElement(ArticleSeries, { series }));
  expect(html).toContain('aria-current="page"');
  expect(html).toContain(`href="/blog/${ids[0]}"`);
  expect(html).toContain(`href="/blog/${ids[3]}"`);
  expect(html).toContain("3 из 4");
  expect(html).not.toMatch(/<details[^>]*\bopen(?:=|\s|>)/);
});

it("omits unavailable series members and unrelated articles", () => {
  const source = { listPublic: () => [
    { ...articles[0], publicationStatus: "draft" },
    ...articles.slice(1)
  ] as V3SourceItem[] };
  const series = getCacheSeries(source, ids[2]);
  expect(series?.position).toBe(2);
  expect(series?.items).toHaveLength(3);
  expect(getCacheSeries(source, "unrelated")).toBeNull();
  expect(renderToStaticMarkup(createElement(ArticleSeries, { series: null }))).toBe("");
});
