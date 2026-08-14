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
  editorialFormat: "article" | "note"
): V3SourceItem {
  return {
    ...base,
    entityId,
    type: "article",
    kind: "native",
    slug: entityId,
    editorialFormat,
    title: `Текст ${entityId}`,
    publishedAt: "2026-07-22",
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
  nativeArticle("workload-shape-over-model-name", "note"),
  nativeArticle("ai-platform-before-gpu", "article"),
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

describe("v3.1 personal-page view models", () => {
  it("builds the three Home entrances and the exact Сейчас selection", () => {
    const model = getHomeViewModel(v3Source);

    expect(model.entrances.map(({ href }) => href)).toEqual([
      "/blog",
      "/materials",
      "/ai-platform"
    ]);
    expect(model.entrances[2]?.description).toBe(
      "Карта и\u00a0практический справочник по production AI-платформам."
    );
    expect(model.featured.map(({ item }) => item.entityId)).toEqual([
      "ai-platform-before-gpu",
      "maas-vs-self-hosted-roii",
      "audit-prompt-caching"
    ]);
  });

  it("keeps every public native text in Blog, excludes external publications and orders article before note on a tie", () => {
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
    expect(ids.indexOf("ai-platform-before-gpu")).toBeLessThan(
      ids.indexOf("workload-shape-over-model-name")
    );
    expect(model.items.every(({ articleKind }) => articleKind === "native")).toBe(true);
    expect(model.items.map(({ editorialFormat }) => editorialFormat)).toEqual([
      "article",
      "note"
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
      getHomeViewModel(replacePublicEntity(v3Source, "maas-vs-self-hosted-roii", null))
    ).toThrow(/maas-vs-self-hosted-roii.*not available/i);

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

    const wrongKind = {
      ...publicEntity("prefix-cache-habr"),
      entityId: "ai-platform-before-gpu"
    } as V3SourceItem;
    expect(() =>
      getHomeViewModel(
        replacePublicEntity(v3Source, "ai-platform-before-gpu", wrongKind)
      )
    ).toThrow(/ai-platform-before-gpu.*native/i);
  });
});
