import type { V3Article } from "@/lib/content-v3/schema";
import { canonicalUrl, publicFileUrl } from "@/lib/seo/urls";

function stripInvalidXmlCharacters(value: string): string {
  let sanitized = "";

  for (const character of value) {
    const codePoint = character.codePointAt(0)!;
    const valid =
      codePoint === 0x09 ||
      codePoint === 0x0a ||
      codePoint === 0x0d ||
      (codePoint >= 0x20 && codePoint <= 0xd7ff) ||
      (codePoint >= 0xe000 && codePoint <= 0xfffd) ||
      (codePoint >= 0x10000 && codePoint <= 0x10ffff);
    if (valid) sanitized += character;
  }

  return sanitized;
}

function escapeXml(value: string): string {
  return stripInvalidXmlCharacters(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function articleUrl(article: V3Article): string {
  if (article.kind === "external-note") {
    if (article.sourceUrl === null) {
      throw new Error(`External article ${article.entityId} requires sourceUrl`);
    }
    return article.sourceUrl;
  }

  if (article.slug === null) {
    throw new Error(`Native article ${article.entityId} requires slug`);
  }
  return canonicalUrl(`/blog/${article.slug}`);
}

function publicationDate(value: string): string {
  return new Date(`${value}T00:00:00.000Z`).toUTCString();
}

export function buildRssFeed(articles: readonly V3Article[]): string {
  const published = articles
    .filter(
      (article): article is V3Article & { publishedAt: string } =>
        article.publicationStatus === "published" && article.publishedAt !== null
    )
    .sort(
      (left, right) =>
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.entityId.localeCompare(right.entityId)
    );
  const items = published
    .map((article) => {
      const link = articleUrl(article);
      return [
        "    <item>",
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(article.description)}</description>`,
        `      <pubDate>${publicationDate(article.publishedAt)}</pubDate>`,
        "    </item>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Блог Сергея Нотевского</title>",
    `    <link>${canonicalUrl("/")}</link>`,
    "    <description>Статьи и инженерные заметки о production AI-платформах.</description>",
    "    <language>ru</language>",
    `    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${publicFileUrl("/rss.xml")}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");
}
