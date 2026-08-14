import { describe, expect, it } from "vitest";

import { createElement } from "react";

import type { V3Source, V3SourceItem } from "../../lib/content-v3/source-core";
import {
  getAboutViewModel,
  getBlogViewModel,
  getHomeViewModel,
  getMaterialsViewModel
} from "../../lib/content-v3/view-models";

const EXTERNAL_PUBLICATION_IDS = [
  "prefix-cache-the-code",
  "prefix-cache-habr",
  "effective-cost-habr",
  "agent-skills-habr",
  "prompt-engineering-vc"
] as const;

const ABOUT_EVIDENCE_IDS = [
  "agent-skills-habr",
  "maas-vs-self-hosted-roii",
  "audit-prompt-caching"
] as const;

const body = () => createElement("p", null, "Fixture");
const base = {
  locale: "ru",
  description: "Проверяемое публичное описание материала.",
  publicationStatus: "published",
  reviewStatus: "unreviewed",
  publishedAt: "2026-01-01",
  updatedAt: "2026-01-01",
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["ai-platform"],
  relations: {},
  body
} as const;

function nativeArticle(
  entityId: string,
  editorialFormat: "article" | "note",
  publishedAt: string
): V3SourceItem {
  return {
    ...base,
    entityId,
    type: "article",
    kind: "native",
    slug: entityId,
    editorialFormat,
    title: `Текст ${entityId}`,
    publishedAt,
    updatedAt: publishedAt,
    excerpt: `Аннотация ${entityId}`,
    externalType: null,
    sourceName: null,
    sourceUrl: null,
    sourceAuthorProfileUrl: null,
    participationLabel: null,
    supersedes: null,
    supersededBy: null,
    sourcePath: `blog/${entityId}.mdx`
  } as unknown as V3SourceItem;
}

function externalArticle(
  entityId: string,
  publishedAt: string,
  externalType: "authored-article" | "expert-comment" = "authored-article"
): V3SourceItem {
  return {
    ...base,
    entityId,
    type: "article",
    kind: "external-note",
    slug: null,
    editorialFormat: null,
    title: `Публикация ${entityId}`,
    publishedAt,
    excerpt: `Аннотация ${entityId}`,
    externalType,
    sourceName: "Публичная площадка",
    sourceUrl: `https://example.com/${entityId}`,
    sourceAuthorProfileUrl: null,
    participationLabel: "Вклад Сергея: автор материала",
    supersedes: null,
    supersededBy: null,
    sourcePath: `publications/${entityId}.mdx`
  } as unknown as V3SourceItem;
}

const records = [
  nativeArticle("workload-shape-over-model-name", "note", "2026-08-02"),
  nativeArticle("ai-platform-before-gpu", "article", "2026-07-22"),
  externalArticle("prompt-engineering-vc", "2025-04-28", "expert-comment"),
  externalArticle("agent-skills-habr", "2025-12-26"),
  externalArticle("effective-cost-habr", "2026-03-10"),
  externalArticle("prefix-cache-habr", "2026-05-12"),
  externalArticle("prefix-cache-the-code", "2026-06-18"),
  {
    ...base,
    entityId: "bitrix24-ai-platform-podcast",
    type: "talk",
    slug: "bitrix24-ai-platform-podcast",
    title: "Зачем Битрикс24 своя AI-платформа?",
    venue: "«Куда расти?» · Максим Ульянов",
    eventDate: "2026-08-11",
    format: "podcast",
    recordingUrl: "https://www.youtube.com/watch?v=vFleE0MLh_w",
    recordingUploadedAt: "2026-08-11",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    abstract: "Разговор о том, зачем компании своя AI-платформа.",
    takeaways: [
      { label: "Платформа", text: "Разобрать границы AI Platform.", timestampSeconds: 2006 },
      { label: "MaaS", text: "Сравнить MaaS и self-hosted.", timestampSeconds: 4236 },
      { label: "Команда", text: "Обсудить роли команды.", timestampSeconds: 7011 }
    ],
    slidesUrl: null,
    thumbnail: {
      path: "/media/talks/bitrix24-ai-platform-podcast.jpg",
      sourceUrl: "https://example.com/podcast.jpg",
      capturedAt: "2026-08-14",
      alt: "Кадр из подкаста об AI-платформе"
    },
    sourcePath: "talks/bitrix24-ai-platform-podcast.mdx"
  },
  {
    ...base,
    entityId: "every-token-counts",
    type: "talk",
    slug: "every-token-counts",
    title: "«Каждый токен на счету»",
    venue: "YouTube · Константин Доронин",
    eventDate: "2026-05-27",
    format: "stream",
    recordingUrl: "https://www.youtube.com/watch?v=X71ZfXMKslo",
    recordingUploadedAt: "2026-05-27",
    publishedAt: "2026-05-27",
    updatedAt: "2026-08-14",
    abstract: "Как управлять контекстом и расходом токенов в AI-агентах.",
    takeaways: [
      { label: "Контекст", text: "Связать кэш с профилем запросов.", timestampSeconds: 3614 },
      { label: "Стоимость", text: "Посчитать effective cost.", timestampSeconds: 5083 },
      { label: "Аудит", text: "Найти причины cache misses.", timestampSeconds: 6572 }
    ],
    slidesUrl: null,
    thumbnail: null,
    sourcePath: "talks/every-token-counts.mdx"
  },
  {
    ...base,
    entityId: "maas-vs-self-hosted-roii",
    type: "talk",
    slug: "maas-vs-self-hosted",
    title: "Свои ИИ-модели или API по подписке?",
    venue: "ROИИ 2026 · день 1",
    eventDate: "2026-02-19",
    format: "talk",
    recordingUrl: "https://example.com/video",
    recordingUploadedAt: "2026-02-22",
    abstract: "Как сравнить MaaS и self-hosted.",
    takeaways: [
      { label: "Раз", text: "Вывод один", timestampSeconds: null },
      { label: "Два", text: "Вывод два", timestampSeconds: null },
      { label: "Три", text: "Вывод три", timestampSeconds: null }
    ],
    slidesUrl: null,
    thumbnail: null,
    sourcePath: "talks/maas-vs-self-hosted.mdx"
  },
  {
    ...base,
    entityId: "audit-prompt-caching",
    type: "project",
    slug: "audit-prompt-caching",
    title: "audit-prompt-caching",
    publishedAt: "2026-07-22",
    updatedAt: "2026-08-14",
    repositoryUrl: "https://github.com/sernote/audit-prompt-caching",
    verifiedRelease: {
      version: "v0.1.3",
      publishedAt: "2026-07-20",
      url: "https://github.com/sernote/audit-prompt-caching/releases/tag/v0.1.3",
      verifiedAt: "2026-07-22"
    },
    audience: ["AI-инженеры"],
    quickStart: "Установить skill.",
    privacyBoundary: "Использовать очищенные данные.",
    evidence: ["Публичный репозиторий"],
    supportBoundary: "Не подтверждает runtime cache hit.",
    sourcePath: "projects/audit-prompt-caching.mdx"
  },
  {
    ...base,
    entityId: "inference-plane",
    type: "platform-area",
    slug: "inference-plane",
    title: "Inference Plane",
    reviewStatus: "reviewed",
    publishedAt: "2026-07-22",
    updatedAt: "2026-08-20",
    sourcePath: "ai-platform/areas/inference-plane.mdx"
  },
  {
    ...base,
    entityId: "prefix-cache",
    type: "platform-component",
    slug: "prefix-cache",
    title: "Prefix Cache",
    reviewStatus: "reviewed",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    sourcePath: "ai-platform/components/prefix-cache.mdx"
  }
] as unknown as V3SourceItem[];

const v3Source = {
  listPublic: (type, locale) =>
    records.filter(
      (record) =>
        (type === undefined || record.type === type) &&
        (locale === undefined || record.locale === locale)
    ),
  listFeatured: (type, locale) =>
    v3Source
      .listPublic(type, locale)
      .filter((record) => record.reviewStatus !== "stale"),
  listLocalCanonical: (type, locale) =>
    v3Source
      .listPublic(type, locale)
      .filter((record) => record.type !== "article" || record.kind === "native")
} as V3Source;

function replacePublicEntity(
  source: V3Source,
  entityId: string,
  replacement: V3SourceItem | null
): V3Source {
  const replace = (items: V3SourceItem[]) =>
    items.flatMap((item) =>
      item.entityId !== entityId ? [item] : replacement === null ? [] : [replacement]
    );

  return {
    ...source,
    listPublic: (type, locale) => replace(source.listPublic(type, locale)),
    listFeatured: (type, locale) => replace(source.listFeatured(type, locale))
  };
}

function publicEntity(entityId: string): V3SourceItem {
  const record = v3Source
    .listPublic(undefined, "ru")
    .find((candidate) => candidate.entityId === entityId);
  if (record === undefined) throw new Error(`Missing test entity ${entityId}`);
  return record;
}

function withoutHomeSurface(
  source: V3Source,
  surface: "blog" | "materials" | "ai-platform"
): V3Source {
  const belongsToSurface = (record: V3SourceItem) => {
    if (surface === "blog") {
      return record.type === "article" && record.kind === "native";
    }
    if (surface === "materials") {
      return record.type === "talk" ||
        record.type === "project" ||
        (record.type === "article" && record.kind === "external-note");
    }
    return record.type === "platform-area" ||
      record.type === "platform-component" ||
      record.type === "case";
  };

  return {
    ...source,
    listPublic: (type, locale) =>
      source.listPublic(type, locale).filter((record) => !belongsToSurface(record)),
    listFeatured: (type, locale) =>
      source.listFeatured(type, locale).filter((record) => !belongsToSurface(record))
  };
}

describe("v3.1 personal-page view models", () => {
  it("selects the latest published item from each Home surface", () => {
    const model = getHomeViewModel(v3Source);

    expect(model.entrances.map(({ href }) => href)).toEqual([
      "/blog",
      "/materials",
      "/ai-platform"
    ]);
    expect(model.entrances[2]?.description).toBe(
      "Карта и\u00a0практический справочник по production AI-платформам."
    );
    expect(model.featured.map(({ surface, item }) => [surface, item.entityId])).toEqual([
      ["blog", "workload-shape-over-model-name"],
      ["materials", "bitrix24-ai-platform-podcast"],
      ["ai-platform", "prefix-cache"]
    ]);
  });

  it("keeps every public native text in Blog, excludes external publications and orders newest first", () => {
    const model = getBlogViewModel(v3Source);
    const publicNativeIds = v3Source
      .listPublic("article", "ru")
      .filter((record) => record.type === "article" && record.kind === "native")
      .map((record) => record.entityId);

    expect(model.items.map(({ entityId }) => entityId)).toEqual(
      expect.arrayContaining(publicNativeIds)
    );
    expect(model.items).toHaveLength(publicNativeIds.length);
    const ids = model.items.map(({ entityId }) => entityId);
    expect(ids).toEqual(
      expect.arrayContaining(["ai-platform-before-gpu", "workload-shape-over-model-name"])
    );
    expect(ids.indexOf("workload-shape-over-model-name")).toBeLessThan(
      ids.indexOf("ai-platform-before-gpu")
    );
    expect(model.items.every(({ articleKind }) => articleKind === "native")).toBe(true);
    expect(model.items.map(({ editorialFormat }) => editorialFormat)).toEqual([
      "note",
      "article"
    ]);
    expect(model.items.every(({ topics }) => (topics?.length ?? 0) > 0)).toBe(true);
  });

  it("builds complete Materials groups and keeps external publications newest first without local routes", () => {
    const model = getMaterialsViewModel(v3Source);
    const publicTalks = v3Source.listPublic("talk", "ru");
    const publicProjects = v3Source.listPublic("project", "ru");
    const publicExternal = v3Source
      .listPublic("article", "ru")
      .filter((record) => record.type === "article" && record.kind === "external-note");

    expect(model.talks).toHaveLength(publicTalks.length);
    expect(model.projects).toHaveLength(publicProjects.length);
    expect(model.publications).toHaveLength(publicExternal.length);
    expect(model.talks.map(({ entityId, formatLabel }) => [entityId, formatLabel])).toEqual([
      ["bitrix24-ai-platform-podcast", "Подкаст"],
      ["every-token-counts", "Стрим"],
      ["maas-vs-self-hosted-roii", "Доклад"]
    ]);
    expect(model.projects.map(({ entityId }) => entityId)).toContain("audit-prompt-caching");
    expect(model.publications.map(({ entityId }) => entityId)).toEqual(
      expect.arrayContaining([...EXTERNAL_PUBLICATION_IDS])
    );
    expect(model.publications.map(({ entityId }) => entityId)).toEqual(
      [...EXTERNAL_PUBLICATION_IDS]
    );
    for (const publication of model.publications) {
      expect(publication.href).toMatch(/^https:\/\//);
      expect(publication).not.toHaveProperty("slug");
    }
  });

  it("resolves the three selected About evidence items from public source entities", () => {
    const model = getAboutViewModel(v3Source);
    const publicIds = new Set(
      v3Source.listPublic(undefined, "ru").map(({ entityId }) => entityId)
    );

    expect(model.evidence.map(({ entityId }) => entityId)).toEqual(ABOUT_EVIDENCE_IDS);
    expect(model.evidence.every(({ entityId }) => publicIds.has(entityId))).toBe(true);
  });

  it("fails closed when a mandatory selection is missing or ineligible", () => {
    expect(() =>
      getHomeViewModel(withoutHomeSurface(v3Source, "blog"))
    ).toThrow(/home surface blog.*no published items/i);
    expect(() =>
      getHomeViewModel(withoutHomeSurface(v3Source, "materials"))
    ).toThrow(/home surface materials.*no published items/i);
    expect(() =>
      getHomeViewModel(withoutHomeSurface(v3Source, "ai-platform"))
    ).toThrow(/home surface ai-platform.*no published items/i);

    const draftProject = {
      ...publicEntity("audit-prompt-caching"),
      publicationStatus: "draft"
    } as V3SourceItem;
    expect(() =>
      getMaterialsViewModel(
        replacePublicEntity(v3Source, "audit-prompt-caching", draftProject)
      )
    ).toThrow(/audit-prompt-caching.*not available/i);

    const staleTalk = {
      ...publicEntity("maas-vs-self-hosted-roii"),
      reviewStatus: "stale"
    } as V3SourceItem;
    expect(() =>
      getAboutViewModel(
        replacePublicEntity(v3Source, "maas-vs-self-hosted-roii", staleTalk)
      )
    ).toThrow(/maas-vs-self-hosted-roii.*not available/i);

  });
});
