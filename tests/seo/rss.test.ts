import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import type { V3Article } from "../../lib/content-v3/schema";
import { buildRssFeed } from "../../lib/seo/rss";

const shared = {
  type: "article" as const,
  locale: "ru" as const,
  publicationStatus: "published" as const,
  reviewStatus: "unreviewed" as const,
  updatedAt: "2026-07-22",
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["ai-platform"],
  relations: {},
  sourceName: null,
  supersedes: null,
  supersededBy: null
};

const nativeArticle: V3Article = {
  ...shared,
  entityId: "ai-platform-before-gpu",
  kind: "native",
  slug: "ai-platform-before-gpu",
  title: "ИИ-платформа начинается не с GPU",
  description: "Сначала данные, качество, SLO и владельцы — затем GPU.",
  excerpt: "Сценарий и ответственность важнее списка устройств.",
  publishedAt: "2026-07-22",
  sourceUrl: null
};

const externalArticle: V3Article = {
  ...shared,
  entityId: "short-prompt-not-cheap",
  kind: "external-note",
  slug: null,
  title: "Короткий промпт не значит дешёвый",
  description: "Почему порядок tools влияет на cache reuse.",
  excerpt: "Короткий запрос иногда обходится дороже длинного.",
  publishedAt: "2026-05-12",
  sourceName: "Хабр",
  sourceUrl: "https://habr.com/ru/companies/bitrix/articles/1033822/"
};

describe("RSS builder", () => {
  it("serves the source-backed feed as a build-time static XML response", () => {
    const route = readFileSync(join(process.cwd(), "app/rss.xml/route.ts"), "utf8");
    expect(route).toContain('export const dynamic = "force-static"');
    expect(route).toContain('"Content-Type": "application/rss+xml; charset=utf-8"');
    expect(route).toMatch(/v3Source\s*\.listPublic\("article", "ru"\)/);
    expect(route).toContain("new Response(buildRssFeed(articles)");
  });

  it("uses local canonicals for native articles and source URLs for external notes", () => {
    const xml = buildRssFeed([externalArticle, nativeArticle]);

    expect(xml).toContain("https://notevskii.tech/blog/ai-platform-before-gpu/");
    expect(xml).toContain("https://habr.com/ru/companies/bitrix/articles/1033822/");
    expect(xml).toContain(
      "<guid isPermaLink=\"true\">https://habr.com/ru/companies/bitrix/articles/1033822/</guid>"
    );
  });

  it("sorts items deterministically by descending publication date", () => {
    const olderSameDate: V3Article = {
      ...nativeArticle,
      entityId: "alpha-note",
      slug: "alpha-note",
      title: "Alpha note"
    };
    const laterSameDate: V3Article = {
      ...nativeArticle,
      entityId: "zeta-note",
      slug: "zeta-note",
      title: "Zeta note"
    };
    const xml = buildRssFeed([externalArticle, laterSameDate, olderSameDate]);

    expect(xml.indexOf("Alpha note")).toBeLessThan(xml.indexOf("Zeta note"));
    expect(xml.indexOf("Zeta note")).toBeLessThan(xml.indexOf(externalArticle.title));
  });

  it("escapes XML-sensitive item content", () => {
    const unsafe: V3Article = {
      ...nativeArticle,
      entityId: "safe-xml",
      slug: "safe-xml",
      title: "Cache < reuse & safety",
      description: 'Boundary "A" > boundary \'B\'.'
    };
    const xml = buildRssFeed([unsafe]);

    expect(xml).toContain("Cache &lt; reuse &amp; safety");
    expect(xml).toContain("Boundary &quot;A&quot; &gt; boundary &apos;B&apos;.");
    expect(xml).not.toContain("Cache < reuse");
  });

  it("removes XML 1.0-invalid controls while preserving valid whitespace and Unicode", () => {
    const invalidControls = "\u0000\u0001\u0008\u000B\u000C\u000E\u001F";
    const validText = "tab\tline-feed\ncarriage-return\rrocket 🚀";
    const unsafe: V3Article = {
      ...nativeArticle,
      entityId: "xml-controls",
      slug: "xml-controls",
      title: `Before${invalidControls}After ${validText}`,
      description: `Description${invalidControls} ${validText}`
    };
    const xml = buildRssFeed([unsafe]);

    for (const control of invalidControls) {
      expect(xml).not.toContain(control);
    }
    expect(xml).toContain(`BeforeAfter ${validText}`);
    expect(xml).toContain(`Description ${validText}`);

    const invalidCodePoints = Array.from(xml).filter((character) => {
      const codePoint = character.codePointAt(0)!;
      return !(
        codePoint === 0x09 ||
        codePoint === 0x0a ||
        codePoint === 0x0d ||
        (codePoint >= 0x20 && codePoint <= 0xd7ff) ||
        (codePoint >= 0xe000 && codePoint <= 0xfffd) ||
        (codePoint >= 0x10000 && codePoint <= 0x10ffff)
      );
    });
    expect(invalidCodePoints).toEqual([]);
    expect(xml).toMatch(
      /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<rss version="2\.0">[\s\S]*<channel>[\s\S]*<item>[\s\S]*<\/item>[\s\S]*<\/channel>\n<\/rss>\n$/
    );
    expect(xml.match(/<item>/g)).toHaveLength(1);
    expect(xml.match(/<\/item>/g)).toHaveLength(1);
  });
});
