import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { JsonLd } from "../../components/seo/json-ld";
import { AUTHOR_PROFILE } from "../../lib/author-profile";
import type {
  V3Article,
  V3Case,
  V3PlatformArea,
  V3PlatformComponent,
  V3Project,
  V3Talk
} from "../../lib/content-v3/schema";
import {
  buildAboutStructuredData,
  buildArticleStructuredData,
  buildHomeStructuredData,
  buildProjectStructuredData,
  buildReferenceStructuredData,
  buildTalkStructuredData,
  serializeJsonLd
} from "../../lib/seo/structured-data";
import { buildSitemapEntries, canonicalUrl } from "../../lib/seo/urls";
import { parseManifest, validateManifest } from "../../lib/migration/manifest";
import { v3MarketingMetadata } from "../../lib/metadata";

const manifest = validateManifest(
  parseManifest(
    JSON.parse(
      readFileSync(join(process.cwd(), "config/v3-route-manifest.json"), "utf8")
    )
  )
);

const expectedKeepPaths = [
  "/",
  "/about",
  "/ai-platform",
  "/ai-platform/areas/inference-plane",
  "/ai-platform/cases/agent-session-cache-reuse",
  "/ai-platform/components/prefix-cache",
  "/ai-platform/map",
  "/blog",
  "/blog/ai-platform-before-gpu",
  "/blog/workload-shape-over-model-name",
  "/materials",
  "/projects/audit-prompt-caching",
  "/talks/bitrix24-ai-platform-podcast",
  "/talks/every-token-counts",
  "/talks/maas-vs-self-hosted"
] as const;

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
  editorialFormat: "article",
  title: "ИИ-платформа начинается не с GPU",
  description:
    "Почему production AI начинается с правил работы с данными, качества, SLO и владельцев.",
  excerpt: "Сначала зафиксируйте контракт сценария, а затем выбирайте способ исполнения.",
  externalType: null,
  sourceName: null,
  sourceUrl: null,
  sourceAuthorProfileUrl: null,
  participationLabel: null,
  supersedes: null,
  supersededBy: null
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

const areaBreadcrumbContext = {
  entityId: area.entityId,
  contentType: area.type,
  title: area.title,
  href: `/ai-platform/areas/${area.slug}`,
  primaryArea: null,
  parentComponent: null,
  parentComponentPrimaryAreaId: null
} as const;

const componentBreadcrumbContext = {
  entityId: component.entityId,
  contentType: component.type,
  title: component.title,
  href: `/ai-platform/components/${component.slug}`,
  primaryArea: {
    entityId: area.entityId,
    contentType: area.type,
    slug: area.slug,
    title: area.title,
    href: `/ai-platform/areas/${area.slug}`
  },
  parentComponent: null,
  parentComponentPrimaryAreaId: null
} as const;

const caseBreadcrumbContext = {
  entityId: caseRecord.entityId,
  contentType: caseRecord.type,
  title: caseRecord.title,
  href: `/ai-platform/cases/${caseRecord.slug}`,
  primaryArea: componentBreadcrumbContext.primaryArea,
  parentComponent: {
    entityId: component.entityId,
    contentType: component.type,
    slug: component.slug,
    title: component.title,
    href: `/ai-platform/components/${component.slug}`
  },
  parentComponentPrimaryAreaId: component.primaryAreaId
} as const;

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

  it("derives exactly the canonical keep routes from the validated manifest", () => {
    const entries = buildSitemapEntries(manifest);
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual(expectedKeepPaths.map(canonicalUrl));
    expect(urls).toHaveLength(15);
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
    expect(urls.some((url) => url.includes("habr.com"))).toBe(false);
    expect(urls).not.toContain("https://notevskii.tech/ru/");
    expect(urls).not.toContain("https://notevskii.tech/writing/");
    expect(urls).not.toContain("https://notevskii.tech/work/");
    expect(urls).not.toContain("https://notevskii.tech/talks/");
    expect(urls).not.toContain("https://notevskii.tech/projects/");
    expect(urls).not.toContain("https://notevskii.tech/contact/");
  });

  it("exposes public sitemap and permissive robots metadata routes", () => {
    const sitemapSource = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    const robotsSource = readFileSync(join(process.cwd(), "app/robots.ts"), "utf8");
    expect(sitemapSource).toContain("validateManifest(parseManifest(routeManifest))");
    expect(sitemapSource).toContain("buildSitemapEntries(manifest)");
    expect(sitemapSource).toContain('export const dynamic = "force-static"');
    expect(robotsSource).toContain('allow: "/"');
    expect(robotsSource).toContain('userAgent: "OAI-SearchBot"');
    expect(robotsSource).toContain('publicFileUrl("/sitemap.xml")');
    expect(robotsSource).toContain('export const dynamic = "force-static"');
    expect(robotsSource).not.toContain("disallow");
  });

  it("keeps Materials canonical-only without an archived English alternate", () => {
    expect(v3MarketingMetadata("materials").alternates).toEqual({
      canonical: "https://notevskii.tech/materials/"
    });
  });
});

describe("JSON-LD builders", () => {
  it("publishes only WebSite on Home and one ProfilePage Person on About", () => {
    const data = buildHomeStructuredData();
    const about = buildAboutStructuredData();

    expect(data.map((item) => item["@type"])).toEqual(["WebSite"]);
    expect(data[0]).toMatchObject({
      author: { "@id": AUTHOR_PROFILE.id }
    });
    expect(about.map((item) => item["@type"])).toEqual(["ProfilePage"]);
    expect(about[0]).toMatchObject({
      url: AUTHOR_PROFILE.url,
      mainEntity: {
        "@type": "Person",
        "@id": AUTHOR_PROFILE.id,
        name: AUTHOR_PROFILE.name,
        url: AUTHOR_PROFILE.url,
        jobTitle: AUTHOR_PROFILE.role,
        sameAs: AUTHOR_PROFILE.sameAs
      }
    });
    expect(about[0]["mainEntity"]).toMatchObject({
      worksFor: { "@type": "Organization", name: AUTHOR_PROFILE.company }
    });
    expect((about[0]["mainEntity"] as { sameAs: readonly string[] }).sameAs).toEqual([
      "https://habr.com/ru/users/Ser_no/",
      "https://github.com/sernote",
      "https://t.me/sergeinotevskii"
    ]);
    expect(JSON.stringify(about)).not.toMatch(/habr\.com\/.*\/articles\//);
    expect(data.every((item) => item["@context"] === "https://schema.org")).toBe(true);
  });

  it("uses the one author id across every authored schema", () => {
    const authored = [
      buildArticleStructuredData(article)[0],
      buildTalkStructuredData(talk)[0],
      buildProjectStructuredData(project)[0],
      buildReferenceStructuredData(area, areaBreadcrumbContext)[0]
    ];

    for (const item of authored) {
      expect(item.author).toMatchObject({
        "@type": "Person",
        "@id": AUTHOR_PROFILE.id,
        name: AUTHOR_PROFILE.name,
        url: AUTHOR_PROFILE.url
      });
    }
    expect(buildProjectStructuredData(project)[0]).toHaveProperty("author");
    expect(buildProjectStructuredData(project)[0]).not.toHaveProperty("creator");
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

  it("uses the verified recording identity, embed URL, upload date, and local thumbnail", () => {
    const data = buildTalkStructuredData(talk);
    expect(data.map((item) => item["@type"])).toEqual(["VideoObject", "BreadcrumbList"]);
    expect(data[0]).toMatchObject({
      sameAs: "https://www.youtube.com/watch?v=RHbbeHKGh6I",
      embedUrl: "https://www.youtube.com/embed/RHbbeHKGh6I",
      uploadDate: "2026-02-22",
      thumbnailUrl: "https://notevskii.tech/media/talks/maas-vs-self-hosted.jpg"
    });
    expect(data[0]).not.toHaveProperty("contentUrl");
    expect(data[0]).not.toHaveProperty("duration");
    expect(data[1]["itemListElement"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Материалы", item: "https://notevskii.tech/materials/" })
      ])
    );
  });

  it("fails closed when a verified talk URL cannot yield a supported YouTube id", () => {
    expect(() =>
      buildTalkStructuredData({
        ...talk,
        recordingUrl: "https://videos.example.com/watch?v=RHbbeHKGh6I"
      })
    ).toThrow(/supported YouTube URL/);
  });

  it("uses verified release dates rather than editorial page dates for software", () => {
    const projectData = buildProjectStructuredData(project);
    expect(projectData.map((item) => item["@type"])).toEqual([
      "SoftwareSourceCode",
      "BreadcrumbList"
    ]);
    expect(projectData[0]).toMatchObject({
      codeRepository: project.repositoryUrl,
      version: "v0.1.3",
      datePublished: "2026-07-20"
    });
    expect(projectData[0]).not.toHaveProperty("dateModified");
    expect(projectData[1]["itemListElement"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Материалы", item: "https://notevskii.tech/materials/" })
      ])
    );
    expect(serializeJsonLd(projectData[0])).not.toContain(project.updatedAt);

    const withoutRelease = buildProjectStructuredData({
      ...project,
      verifiedRelease: null
    })[0];
    expect(withoutRelease).not.toHaveProperty("version");
    expect(withoutRelease).not.toHaveProperty("datePublished");
    expect(withoutRelease).not.toHaveProperty("dateModified");
  });

  it("builds TechArticle schemas with breadcrumbs that mirror visible hierarchy", () => {
    const contexts = [
      [area, areaBreadcrumbContext, ["Главная", "AI Platform", "Карта", area.title]],
      [component, componentBreadcrumbContext, ["Главная", "AI Platform", area.title, component.title]],
      [
        caseRecord,
        caseBreadcrumbContext,
        ["Главная", "AI Platform", area.title, component.title, caseRecord.title]
      ]
    ] as const;

    for (const [reference, context, expectedNames] of contexts) {
      const referenceData = buildReferenceStructuredData(reference, context);
      expect(referenceData.map((item) => item["@type"])).toEqual([
        "TechArticle",
        "BreadcrumbList"
      ]);
      expect(referenceData[1]["itemListElement"]).toEqual(
        expectedNames.map((name, index) =>
          expect.objectContaining({ position: index + 1, name })
        )
      );
    }
  });

  it("uses source-backed slugs when reference identity differs from its canonical path", () => {
    const differentlySluggedArea: V3PlatformArea = {
      ...area,
      entityId: "inference-plane-record",
      slug: "serving-runtime"
    };
    const differentlySluggedComponent: V3PlatformComponent = {
      ...component,
      entityId: "prefix-cache-record",
      slug: "cache-runtime",
      primaryAreaId: differentlySluggedArea.entityId
    };
    const differentlySluggedCase: V3Case = {
      ...caseRecord,
      entityId: "agent-cache-case-record",
      slug: "agent-cache-case",
      componentIds: [differentlySluggedComponent.entityId]
    };
    const primaryArea = {
      entityId: differentlySluggedArea.entityId,
      contentType: differentlySluggedArea.type,
      slug: differentlySluggedArea.slug,
      title: differentlySluggedArea.title,
      href: "/ai-platform/areas/serving-runtime"
    } as const;
    const parentComponent = {
      entityId: differentlySluggedComponent.entityId,
      contentType: differentlySluggedComponent.type,
      slug: differentlySluggedComponent.slug,
      title: differentlySluggedComponent.title,
      href: "/ai-platform/components/cache-runtime"
    } as const;

    const componentData = buildReferenceStructuredData(differentlySluggedComponent, {
      entityId: differentlySluggedComponent.entityId,
      contentType: differentlySluggedComponent.type,
      title: differentlySluggedComponent.title,
      href: "/ai-platform/components/cache-runtime",
      primaryArea,
      parentComponent: null,
      parentComponentPrimaryAreaId: null
    });
    const caseData = buildReferenceStructuredData(differentlySluggedCase, {
      entityId: differentlySluggedCase.entityId,
      contentType: differentlySluggedCase.type,
      title: differentlySluggedCase.title,
      href: "/ai-platform/cases/agent-cache-case",
      primaryArea,
      parentComponent,
      parentComponentPrimaryAreaId: differentlySluggedComponent.primaryAreaId
    });

    expect(componentData[1]["itemListElement"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: differentlySluggedArea.title,
          item: "https://notevskii.tech/ai-platform/areas/serving-runtime/"
        })
      ])
    );
    expect(caseData[1]["itemListElement"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: differentlySluggedComponent.title,
          item: "https://notevskii.tech/ai-platform/components/cache-runtime/"
        })
      ])
    );
  });

  it("fails closed when reference breadcrumb context does not match the record", () => {
    expect(() =>
      buildReferenceStructuredData(component, {
        ...componentBreadcrumbContext,
        primaryArea: {
          ...componentBreadcrumbContext.primaryArea,
          entityId: "control-plane",
          href: "/ai-platform/areas/control-plane"
        }
      })
    ).toThrow(/breadcrumb context/);

    expect(() =>
      buildReferenceStructuredData(caseRecord, {
        ...caseBreadcrumbContext,
        parentComponent: null
      })
    ).toThrow(/breadcrumb context/);

    expect(() =>
      buildReferenceStructuredData(caseRecord, {
        ...caseBreadcrumbContext,
        primaryArea: {
          ...caseBreadcrumbContext.primaryArea,
          entityId: "control-plane",
          slug: "control-plane",
          title: "Control Plane",
          href: "/ai-platform/areas/control-plane"
        }
      })
    ).toThrow(/breadcrumb context/);
  });

  it("serializes JSON-LD without a literal closing script tag", () => {
    const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("renders only application/ld+json scripts with safe serialized data", () => {
    const html = renderToStaticMarkup(createElement(JsonLd, { data: buildHomeStructuredData() }));
    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html.match(/type="application\/ld\+json"/g)).toHaveLength(1);
    expect(html).toContain("WebSite");
  });

  it("wires validated JSON-LD builders into every applicable page shape", () => {
    const pages = [
      ["app/(en)/page.tsx", "buildHomeStructuredData"],
      ["app/(en)/about/page.tsx", "buildAboutStructuredData"],
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
      if (builder === "buildReferenceStructuredData") {
        expect(source, path).toContain("buildReferenceStructuredData(record, model)");
      }
    }
  });
});
