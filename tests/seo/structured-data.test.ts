import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { JsonLd } from "../../components/seo/json-ld";
import type {
  V3Article,
  V3Case,
  V3PlatformArea,
  V3PlatformComponent,
  V3Project,
  V3Talk
} from "../../lib/content-v3/schema";
import {
  buildArticleStructuredData,
  buildHomeStructuredData,
  buildProjectStructuredData,
  buildReferenceStructuredData,
  buildTalkStructuredData,
  serializeJsonLd
} from "../../lib/seo/structured-data";
import { buildSitemapEntries, canonicalUrl } from "../../lib/seo/urls";
import { v3MarketingMetadata } from "../../lib/metadata";

const published = {
  locale: "ru" as const,
  publicationStatus: "published" as const,
  reviewStatus: "unreviewed" as const,
  publishedAt: "2026-07-22",
  updatedAt: "2026-07-22",
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["ai-platform"],
  relations: {}
};

const article: V3Article = {
  ...published,
  entityId: "ai-platform-before-gpu",
  type: "article",
  kind: "native",
  slug: "ai-platform-before-gpu",
  title: "ИИ-платформа начинается не с GPU",
  description:
    "Почему production AI начинается с правил работы с данными, качества, SLO и владельцев.",
  excerpt: "Сначала зафиксируйте контракт сценария, а затем выбирайте способ исполнения.",
  sourceName: null,
  sourceUrl: null,
  supersedes: null,
  supersededBy: null
};

const externalArticle: V3Article = {
  ...article,
  entityId: "short-prompt-not-cheap",
  kind: "external-note",
  slug: null,
  title: "Короткий промпт не значит дешёвый",
  sourceName: "Хабр",
  sourceUrl: "https://habr.com/ru/companies/bitrix/articles/1033822/"
};

const talk: V3Talk = {
  ...published,
  entityId: "maas-vs-self-hosted-roii",
  type: "talk",
  slug: "maas-vs-self-hosted",
  title: "Свои ИИ-модели или API по подписке?",
  description:
    "Доклад ROИИ о выборе между MaaS и self-hosted по качеству, SLO и ответственности.",
  venue: "ROИИ 2026 · день 1",
  eventDate: "2026-02-19",
  format: "talk",
  recordingUrl: "https://www.youtube.com/watch?v=RHbbeHKGh6I",
  recordingUploadedAt: "2026-02-22",
  abstract: "Как сравнить MaaS и self-hosted по проверяемым требованиям.",
  takeaways: [
    { label: "Качество", text: "Проверить качество.", timestampSeconds: 120 },
    { label: "SLO", text: "Задать SLO.", timestampSeconds: 240 },
    { label: "Ownership", text: "Назначить владельца.", timestampSeconds: 360 }
  ],
  slidesUrl: null,
  thumbnail: {
    path: "/media/talks/maas-vs-self-hosted.jpg",
    sourceUrl: "https://i.ytimg.com/vi/RHbbeHKGh6I/maxresdefault.jpg",
    capturedAt: "2026-07-22",
    alt: "Сергей Нотевский объясняет ответственность внутреннего AI-провайдера"
  }
};

const project: V3Project = {
  ...published,
  entityId: "audit-prompt-caching",
  type: "project",
  slug: "audit-prompt-caching",
  title: "audit-prompt-caching",
  description:
    "Открытый Codex skill и локальные скрипты для поиска причин cache misses.",
  repositoryUrl: "https://github.com/sernote/audit-prompt-caching",
  verifiedRelease: {
    version: "v0.1.3",
    publishedAt: "2026-07-20",
    url: "https://github.com/sernote/audit-prompt-caching/releases/tag/v0.1.3",
    verifiedAt: "2026-07-22"
  },
  audience: ["AI-инженеры"],
  quickStart: "npx skills add https://github.com/sernote/audit-prompt-caching",
  privacyBoundary: "Использовать очищенные или синтетические записи.",
  evidence: ["Публичный репозиторий"],
  supportBoundary: "Открытый проект без support SLA."
};

const reviewed = {
  ...published,
  reviewStatus: "reviewed" as const,
  reviewedAt: "2026-07-22",
  reviewCycleDays: 90,
  sources: [
    {
      title: "Public source",
      url: "https://example.com/source",
      verifiedAt: "2026-07-22"
    }
  ],
  applicability: "Для публично проверяемого production-like сценария.",
  limitations: "Не подтверждает характеристики закрытой production-системы."
};

const area: V3PlatformArea = {
  ...reviewed,
  entityId: "inference-plane",
  type: "platform-area",
  slug: "inference-plane",
  title: "Inference Plane",
  description: "Как платформа запускает модели и распределяет нагрузку.",
  order: 3,
  mapBoundary: "Исполняет модельные нагрузки, но не выбирает бизнес-сценарий.",
  included: ["Serving runtimes"],
  excluded: ["Бизнес-сценарий"],
  signals: ["Очередь"]
};

const component: V3PlatformComponent = {
  ...reviewed,
  entityId: "prefix-cache",
  type: "platform-component",
  slug: "prefix-cache",
  title: "Prefix Cache",
  description: "Как повторно использовать общую часть запроса без ложных гарантий.",
  primaryAreaId: "inference-plane",
  relatedAreaIds: [],
  decisionQuestions: ["Совпадает ли префикс?"],
  metrics: ["Cache-read tokens"],
  failureModes: ["Нестабильный порядок tools"]
};

const caseRecord: V3Case = {
  ...reviewed,
  entityId: "agent-session-cache-reuse",
  type: "case",
  slug: "agent-session-cache-reuse",
  title: "Agent session cache reuse — синтетический кейс",
  description: "Синтетический пример изменения порядка инструментов в двух запросах.",
  caseKind: "synthetic",
  componentIds: ["prefix-cache"],
  evidence: ["Синтетические JSON fixtures"]
};

describe("public SEO URLs", () => {
  it("normalizes canonical URLs to the public origin with trailing slashes", () => {
    expect(canonicalUrl("/")).toBe("https://notevskii.tech/");
    expect(canonicalUrl("/blog/ai-platform-before-gpu")).toBe(
      "https://notevskii.tech/blog/ai-platform-before-gpu/"
    );
  });

  it("uses trailing-slash canonicals in page metadata", () => {
    expect(v3MarketingMetadata("blog").alternates).toEqual({
      canonical: "https://notevskii.tech/blog/"
    });
  });

  it("keeps aliases, drafts, and external URLs out of sitemap entries", () => {
    const draftArea: V3PlatformArea = {
      ...area,
      entityId: "control-plane",
      slug: "control-plane",
      publicationStatus: "draft",
      reviewStatus: "unreviewed",
      publishedAt: null,
      reviewedAt: null,
      reviewCycleDays: null,
      sources: [],
      applicability: null,
      limitations: null
    };

    const entries = buildSitemapEntries([article, externalArticle, talk, project, area, component, caseRecord, draftArea]);
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://notevskii.tech/blog/ai-platform-before-gpu/");
    expect(urls).toContain("https://notevskii.tech/ai-platform/components/prefix-cache/");
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(urls.some((url) => url.includes("habr.com"))).toBe(false);
    expect(urls.some((url) => url.includes("control-plane"))).toBe(false);
    expect(urls).not.toContain("https://notevskii.tech/ru/");
    expect(urls).not.toContain("https://notevskii.tech/writing/");
  });

  it("exposes public sitemap and permissive robots metadata routes", () => {
    const sitemapSource = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    const robotsSource = readFileSync(join(process.cwd(), "app/robots.ts"), "utf8");
    expect(sitemapSource).toContain(
      'buildSitemapEntries(v3Source.listPublic(undefined, "ru"))'
    );
    expect(sitemapSource).toContain('export const dynamic = "force-static"');
    expect(robotsSource).toContain('allow: "/"');
    expect(robotsSource).toContain('publicFileUrl("/sitemap.xml")');
    expect(robotsSource).toContain('export const dynamic = "force-static"');
    expect(robotsSource).not.toContain("disallow");
  });
});

describe("JSON-LD builders", () => {
  it("builds Person and WebSite schemas for the home page", () => {
    const data = buildHomeStructuredData();
    expect(data.map((item) => item["@type"])).toEqual(["Person", "WebSite"]);
    expect(data.every((item) => item["@context"] === "https://schema.org")).toBe(true);
  });

  it("builds BlogPosting and breadcrumb schemas for a native article", () => {
    const data = buildArticleStructuredData(article);
    expect(data.map((item) => item["@type"])).toEqual(["BlogPosting", "BreadcrumbList"]);
    expect(data[0]).toMatchObject({
      url: "https://notevskii.tech/blog/ai-platform-before-gpu/",
      datePublished: "2026-07-22",
      dateModified: "2026-07-22"
    });
    expect(data[1]).toMatchObject({
      itemListElement: expect.arrayContaining([
        expect.objectContaining({ name: "Блог", item: "https://notevskii.tech/blog/" }),
        expect.objectContaining({ name: article.title })
      ])
    });
  });

  it("uses the verified recording upload date and local production thumbnail for VideoObject", () => {
    const data = buildTalkStructuredData(talk);
    expect(data.map((item) => item["@type"])).toEqual(["VideoObject", "BreadcrumbList"]);
    expect(data[0]).toMatchObject({
      contentUrl: "https://www.youtube.com/watch?v=RHbbeHKGh6I",
      uploadDate: "2026-02-22",
      thumbnailUrl: "https://notevskii.tech/media/talks/maas-vs-self-hosted.jpg"
    });
    expect(data[0]).not.toHaveProperty("duration");
  });

  it("builds SoftwareSourceCode and TechArticle schemas with breadcrumbs", () => {
    const projectData = buildProjectStructuredData(project);
    expect(projectData.map((item) => item["@type"])).toEqual([
      "SoftwareSourceCode",
      "BreadcrumbList"
    ]);
    expect(projectData[0]).toMatchObject({ codeRepository: project.repositoryUrl });

    for (const reference of [area, component, caseRecord]) {
      const referenceData = buildReferenceStructuredData(reference);
      expect(referenceData.map((item) => item["@type"])).toEqual([
        "TechArticle",
        "BreadcrumbList"
      ]);
      expect(referenceData[1]).toMatchObject({
        itemListElement: expect.arrayContaining([
          expect.objectContaining({ name: reference.title })
        ])
      });
    }
  });

  it("serializes JSON-LD without a literal closing script tag", () => {
    const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("renders only application/ld+json scripts with safe serialized data", () => {
    const html = renderToStaticMarkup(createElement(JsonLd, { data: buildHomeStructuredData() }));
    expect(html.match(/<script/g)).toHaveLength(2);
    expect(html.match(/type="application\/ld\+json"/g)).toHaveLength(2);
    expect(html).toContain("Person");
    expect(html).toContain("WebSite");
  });

  it("wires validated JSON-LD builders into every applicable page shape", () => {
    const pages = [
      ["app/(en)/page.tsx", "buildHomeStructuredData"],
      ["app/(en)/blog/[slug]/page.tsx", "buildArticleStructuredData"],
      ["app/(en)/talks/[slug]/page.tsx", "buildTalkStructuredData"],
      ["app/(en)/projects/[slug]/page.tsx", "buildProjectStructuredData"],
      ["app/(en)/ai-platform/areas/[area]/page.tsx", "buildReferenceStructuredData"],
      ["app/(en)/ai-platform/components/[component]/page.tsx", "buildReferenceStructuredData"],
      ["app/(en)/ai-platform/cases/[case]/page.tsx", "buildReferenceStructuredData"]
    ] as const;

    for (const [path, builder] of pages) {
      const source = readFileSync(join(process.cwd(), path), "utf8");
      expect(source, path).toContain("<JsonLd");
      expect(source, path).toContain(builder);
    }
  });
});
