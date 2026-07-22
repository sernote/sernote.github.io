import { createElement } from "react";
import type { MDXContent } from "mdx/types";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { createV3Source } from "../../lib/content-v3/source-core";
import {
  getHomeViewModel,
  getWorkViewModel
} from "../../lib/content-v3/view-models";

const published = {
  locale: "ru",
  title: "Production AI record",
  description: "Проверяемое описание элемента production AI platform.",
  publicationStatus: "published",
  reviewStatus: "unreviewed",
  publishedAt: "2026-07-22",
  updatedAt: "2026-07-22",
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["ai-platform"],
  relations: {}
} as const;

const reviewed = {
  reviewStatus: "reviewed",
  reviewedAt: "2026-07-22",
  reviewCycleDays: 90,
  sources: [
    {
      title: "Public reference",
      url: "https://example.com/reference",
      verifiedAt: "2026-07-22"
    }
  ],
  applicability: "Подходит для синтетических и публично проверяемых сценариев.",
  limitations: "Не подтверждает характеристики конкретной production-системы."
} as const;

const flattenedRuntimeBody: MDXContent = () => createElement("p", null, "Runtime body");

const flattenedRuntimeEntry = {
  ...published,
  entityId: "fumadocs-runtime-shape",
  type: "article",
  kind: "native",
  slug: "fumadocs-runtime-shape",
  excerpt: "Краткое объяснение реальной формы записи Fumadocs.",
  sourceName: null,
  sourceUrl: null,
  supersedes: null,
  supersededBy: null,
  body: flattenedRuntimeBody,
  info: {
    path: "blog/fumadocs-runtime-shape.mdx",
    fullPath: "content/v3/blog/fumadocs-runtime-shape.mdx"
  },
  toc: [{ title: "Контекст", url: "#context", depth: 2 }],
  structuredData: { headings: [], contents: [] },
  _exports: { frontmatter: { entityId: "fumadocs-runtime-shape" } },
  extractedReferences: [],
  getText: async () => "# Fumadocs runtime shape",
  getMDAST: async () => ({ type: "root", children: [] })
} as const;

function entry<T extends Record<string, unknown>>(metadata: T, path: string) {
  return {
    ...metadata,
    body: flattenedRuntimeBody,
    info: { path }
  };
}

function article(
  entityId: string,
  overrides: Record<string, unknown> = {}
) {
  return entry(
    {
      ...published,
      entityId,
      type: "article",
      kind: "native",
      slug: entityId,
      excerpt: "Краткое объяснение инженерной позиции и её границ.",
      sourceName: null,
      sourceUrl: null,
      supersedes: null,
      supersededBy: null,
      ...overrides
    },
    `blog/${entityId}.mdx`
  );
}

function area(entityId: string, order: number, overrides: Record<string, unknown> = {}) {
  return entry(
    {
      ...published,
      ...reviewed,
      entityId,
      type: "platform-area",
      slug: entityId,
      order,
      included: ["Платформенные решения"],
      excluded: ["Закрытые детали реализации"],
      signals: ["Проверяемый сигнал"],
      ...overrides
    },
    `areas/${entityId}.mdx`
  );
}

function component(entityId: string, primaryAreaId: string) {
  return entry(
    {
      ...published,
      ...reviewed,
      entityId,
      type: "platform-component",
      slug: entityId,
      primaryAreaId,
      relatedAreaIds: [],
      decisionQuestions: ["Какой контракт проверяет компонент?"],
      metrics: ["Cache hit signal"],
      failureModes: ["Нестабильный префикс"]
    },
    `components/${entityId}.mdx`
  );
}

function talk(entityId: string, overrides: Record<string, unknown> = {}) {
  return entry(
    {
      ...published,
      entityId,
      type: "talk",
      slug: entityId === "maas-vs-self-hosted-roii" ? "maas-vs-self-hosted" : entityId,
      venue: "ROИИ 2026, день 1",
      eventDate: "2026-02-19",
      format: "talk",
      recordingUrl: "https://youtu.be/RHbbeHKGh6I",
      recordingUploadedAt: "2026-02-22",
      abstract: "Как сравнить MaaS и self-hosted по качеству, SLO и ответственности.",
      takeaways: [
        { label: "Качество", text: "Качество проверяют на целевом сценарии.", timestampSeconds: 120 },
        { label: "SLO", text: "SLO задаёт эксплуатационные границы.", timestampSeconds: 240 },
        { label: "Ownership", text: "Self-hosted добавляет инженерную ответственность.", timestampSeconds: 360 }
      ],
      slidesUrl: null,
      thumbnail: null,
      ...overrides
    },
    `talks/${entityId}.mdx`
  );
}

function project(entityId: string, overrides: Record<string, unknown> = {}) {
  return entry(
    {
      ...published,
      entityId,
      type: "project",
      slug: entityId,
      repositoryUrl: `https://github.com/sernote/${entityId}`,
      verifiedRelease: null,
      audience: ["AI- и backend-инженеры"],
      quickStart: "Установить skill из публичного репозитория.",
      privacyBoundary: "Использовать очищенные или синтетические запросы.",
      evidence: ["Публичный репозиторий"],
      supportBoundary: "Открытый проект без support SLA.",
      ...overrides
    },
    `projects/${entityId}.mdx`
  );
}

const fixtures = [
  article("ai-platform-before-gpu", { publishedAt: "2026-07-22" }),
  article("short-prompt-not-cheap", {
    kind: "external-note",
    slug: null,
    sourceName: "Хабр",
    sourceUrl: "https://habr.com/ru/companies/bitrix/articles/1033822/",
    publishedAt: "2026-07-21",
    relations: { platformEntityIds: ["prefix-cache"] }
  }),
  talk("maas-vs-self-hosted-roii"),
  project("audit-prompt-caching"),
  area("inference-plane", 3),
  component("prefix-cache", "inference-plane"),
  ...[
    ["strategy-boundaries", 1],
    ["control-plane", 2],
    ["context-agent-runtime", 4],
    ["quality-lifecycle", 5],
    ["operations-economics", 6],
    ["security-ownership", 7]
  ].map(([entityId, order]) =>
    area(entityId as string, order as number, {
      publicationStatus: "draft",
      reviewStatus: "unreviewed",
      publishedAt: null,
      reviewedAt: null,
      reviewCycleDays: null,
      sources: [],
      applicability: null,
      limitations: null,
      included: [],
      excluded: [],
      signals: entityId === "strategy-boundaries" ? ["Planned map signal"] : []
    })
  )
];

describe("v3 generated-entry source adapter", () => {
  it("accepts the flattened Fumadocs runtime shape without leaking runtime fields", () => {
    const source = createV3Source([flattenedRuntimeEntry]);
    const item = source.getBySlug("article", "fumadocs-runtime-shape", "ru");

    expect(item).not.toBeNull();
    expect(item?.body).toBe(flattenedRuntimeBody);
    const renderableBody: MDXContent = item!.body;
    expect(renderableBody({}).type).toBe("p");
    expect(createElement(renderableBody, {}).type).toBe(flattenedRuntimeBody);
    expect(item?.sourcePath).toBe("blog/fumadocs-runtime-shape.mdx");
    for (const runtimeKey of [
      "info",
      "toc",
      "structuredData",
      "_exports",
      "extractedReferences",
      "getText",
      "getMDAST"
    ]) {
      expect(item).not.toHaveProperty(runtimeKey);
    }
  });

  it("still rejects generated fields outside the known Fumadocs runtime contract", () => {
    expect(() =>
      createV3Source([{ ...flattenedRuntimeEntry, unexpectedRuntimeField: true }])
    ).toThrow(/unexpectedRuntimeField|unrecognized key/i);
  });

  it("validates stripped metadata while preserving body and a safe source path", () => {
    const source = createV3Source(fixtures);

    expect(source.listPublic("article", "ru").map((item) => item.entityId)).toEqual([
      "ai-platform-before-gpu",
      "short-prompt-not-cheap"
    ]);
    expect(source.getBySlug("article", "ai-platform-before-gpu", "ru")?.body).toBe(
      fixtures[0].body
    );
    expect(source.listPublic("article", "ru")[0].sourcePath).toBe(
      "blog/ai-platform-before-gpu.mdx"
    );
    expect(source.listPublic("article", "ru")[0]).not.toHaveProperty("info");
  });

  it("generates params only for public local records", () => {
    const source = createV3Source(fixtures);

    expect(source.generateParams("article", "ru")).toEqual([
      { slug: "ai-platform-before-gpu" }
    ]);
    expect(source.getBySlug("article", "short-prompt-not-cheap", "ru")).toBeNull();
    expect(source.getBySlug("article", "ai-platform-before-gpu", "ru")?.entityId).toBe(
      "ai-platform-before-gpu"
    );
  });

  it("keeps the six non-pilot draft areas available only to the explicit map query", () => {
    const source = createV3Source(fixtures);

    expect(source.getPlannedAreas("ru").map((item) => item.entityId)).toEqual([
      "strategy-boundaries",
      "control-plane",
      "context-agent-runtime",
      "quality-lifecycle",
      "operations-economics",
      "security-ownership"
    ]);
    expect(source.generateParams("platform-area", "ru")).toEqual([{ slug: "inference-plane" }]);
  });

  it("keeps a draft area planned when richer map metadata is added", () => {
    const source = createV3Source(fixtures);

    expect(source.getPlannedAreas("ru")[0]).toMatchObject({
      entityId: "strategy-boundaries",
      signals: ["Planned map signal"]
    });
  });

  it("delegates featured and related visibility to the registry", () => {
    const source = createV3Source(fixtures);
    const external = source.listPublic("article", "ru")[1];

    expect(source.listFeatured("article", "ru").map((item) => item.entityId)).toEqual([
      "ai-platform-before-gpu",
      "short-prompt-not-cheap"
    ]);
    expect(source.getRelatedForPage(external).map((item) => item.entityId)).toEqual([
      "prefix-cache"
    ]);
  });

  it("returns identical lists and params when generated entries arrive reversed", () => {
    const normal = createV3Source(fixtures);
    const reversed = createV3Source([...fixtures].reverse());

    expect(reversed.listPublic("article", "ru")).toEqual(normal.listPublic("article", "ru"));
    expect(reversed.getPlannedAreas("ru")).toEqual(normal.getPlannedAreas("ru"));
    expect(reversed.generateParams("article", "ru")).toEqual(
      normal.generateParams("article", "ru")
    );
  });
});

describe("v3 personal-site view models", () => {
  it("builds the exact home entrances and explicit selected artifacts", () => {
    const model = getHomeViewModel(createV3Source(fixtures));

    expect(model.entrances.map(({ id, href }) => [id, href])).toEqual([
      ["blog", "/blog"],
      ["work", "/work"],
      ["ai-platform", "/ai-platform"]
    ]);
    expect(model.featured.map(({ surface, item }) => [surface, item.entityId])).toEqual([
      ["blog", "ai-platform-before-gpu"],
      ["work", "audit-prompt-caching"],
      ["ai-platform", "inference-plane"]
    ]);
    expect(model.featured.map(({ item }) => [item.href, item.linkKind])).toEqual([
      ["/blog/ai-platform-before-gpu", "internal"],
      ["/projects/audit-prompt-caching", "internal"],
      ["/ai-platform/areas/inference-plane", "internal"]
    ]);
  });

  it("builds Materials in the exact group order with honest index links", () => {
    const model = getWorkViewModel(createV3Source(fixtures));

    expect(model.groups.map(({ id, item }) => [id, item.entityId])).toEqual([
      ["talks", "maas-vs-self-hosted-roii"],
      ["projects", "audit-prompt-caching"],
      ["writing", "short-prompt-not-cheap"]
    ]);
    expect(model.groups.map(({ item }) => [item.href, item.linkKind])).toEqual([
      ["/talks/maas-vs-self-hosted", "internal"],
      ["/projects/audit-prompt-caching", "internal"],
      ["https://habr.com/ru/companies/bitrix/articles/1033822/", "external"]
    ]);
    expect(model.groups.map(({ id, indexHref }) => [id, indexHref])).toEqual([
      ["talks", "/talks"],
      ["projects", "/projects"],
      ["writing", null]
    ]);
  });

  it("returns small immutable list items without MDX bodies or source paths", () => {
    const home = getHomeViewModel(createV3Source(fixtures));
    const work = getWorkViewModel(createV3Source(fixtures));
    const items = [
      ...home.featured.map(({ item }) => item),
      ...work.groups.map(({ item }) => item)
    ];

    expect(Object.isFrozen(home)).toBe(true);
    expect(Object.isFrozen(home.entrances)).toBe(true);
    expect(Object.isFrozen(work)).toBe(true);
    for (const item of items) {
      expect(Object.isFrozen(item)).toBe(true);
      expect(item).not.toHaveProperty("body");
      expect(item).not.toHaveProperty("sourcePath");
    }
  });

  it("is independent of generated-entry input order", () => {
    const normal = createV3Source(fixtures);
    const permuted = createV3Source([
      ...fixtures.slice(5),
      ...fixtures.slice(0, 5)
    ]);

    expect(getHomeViewModel(permuted)).toEqual(getHomeViewModel(normal));
    expect(getWorkViewModel(permuted)).toEqual(getWorkViewModel(normal));
  });

  it("fails closed when an explicit selection is missing", () => {
    const withoutTalk = fixtures.filter(
      (item) => item.entityId !== "maas-vs-self-hosted-roii"
    );

    expect(() => getWorkViewModel(createV3Source(withoutTalk))).toThrow(
      /maas-vs-self-hosted-roii.*not available/i
    );
  });

  it("fails closed when an explicit selection is a draft", () => {
    const withDraftProject = fixtures.map((item) =>
      item.entityId === "audit-prompt-caching"
        ? project("audit-prompt-caching", {
            publicationStatus: "draft",
            publishedAt: null
          })
        : item
    );

    expect(() => getHomeViewModel(createV3Source(withDraftProject))).toThrow(
      /audit-prompt-caching.*not available/i
    );
  });

  it("fails closed when a selected reference is stale", () => {
    const withStaleArea = fixtures.map((item) =>
      item.entityId === "inference-plane"
        ? area("inference-plane", 3, {
            reviewStatus: "stale",
            reviewedAt: "2026-01-01",
            reviewCycleDays: 30
          })
        : item
    );

    expect(() => getHomeViewModel(createV3Source(withStaleArea))).toThrow(
      /inference-plane.*not available/i
    );
  });

  it("fails closed when an explicit selection has the wrong content kind", () => {
    const wrongKind = [
      ...fixtures.filter((item) => item.entityId !== "audit-prompt-caching"),
      article("audit-prompt-caching")
    ];

    expect(() => getWorkViewModel(createV3Source(wrongKind))).toThrow(
      /audit-prompt-caching.*expected project.*found article/i
    );
  });

  it("keeps the pure view-model module off generated server collections", () => {
    const moduleText = readFileSync(
      join(process.cwd(), "lib/content-v3/view-models.ts"),
      "utf8"
    );

    expect(moduleText).not.toMatch(/collections\/server|from ["'].\/source["']/);
    expect(moduleText).toMatch(/import type .*source-core/);
    expect(moduleText).toMatch(/getCanonicalUrl.*\.\/registry/);
  });
});
