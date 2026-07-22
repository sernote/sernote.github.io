import { createElement } from "react";
import type { MDXContent } from "mdx/types";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { createV3Source } from "../../lib/content-v3/source-core";
import {
  formatRussianDate,
  getBlogViewModel,
  getHomeViewModel,
  getPlatformLandingViewModel,
  getPlatformMapViewModel,
  getProjectsViewModel,
  getReferenceDetailViewModel,
  getTalksViewModel,
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
  const titleByEntityId: Record<string, string> = {
    "strategy-boundaries": "Стратегия и границы",
    "control-plane": "Control Plane",
    "inference-plane": "Inference Plane",
    "context-agent-runtime": "Context & Agent Runtime",
    "quality-lifecycle": "Качество и lifecycle",
    "operations-economics": "Эксплуатация и экономика",
    "security-ownership": "Безопасность и ownership"
  };

  return entry(
    {
      ...published,
      ...reviewed,
      entityId,
      type: "platform-area",
      slug: entityId,
      title: titleByEntityId[entityId] ?? `Область ${entityId}`,
      order,
      mapBoundary: `Граница области ${entityId}: проверяемая ответственность без привязки к topology.`,
      included: ["Платформенные решения"],
      excluded: ["Закрытые детали реализации"],
      signals: ["Проверяемый сигнал"],
      ...overrides
    },
    `areas/${entityId}.mdx`
  );
}

function component(
  entityId: string,
  primaryAreaId: string,
  overrides: Record<string, unknown> = {}
) {
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
      failureModes: ["Нестабильный префикс"],
      ...overrides
    },
    `components/${entityId}.mdx`
  );
}

function syntheticCase(
  entityId: string,
  componentId: string,
  overrides: Record<string, unknown> = {}
) {
  return entry(
    {
      ...published,
      ...reviewed,
      entityId,
      type: "case",
      slug: entityId,
      title: "Синтетический кейс: Agent session cache reuse",
      description:
        "Синтетический кейс о проверке порядка инструментов в двух эквивалентных запросах.",
      caseKind: "synthetic",
      componentIds: [componentId],
      evidence: ["Синтетические JSON fixtures"],
      relations: {
        articleIds: ["short-prompt-not-cheap"],
        projectIds: ["audit-prompt-caching"]
      },
      ...overrides
    },
    `cases/${entityId}.mdx`
  );
}

function talk(entityId: string, overrides: Record<string, unknown> = {}) {
  return entry(
    {
      ...published,
      entityId,
      type: "talk",
      slug: entityId === "maas-vs-self-hosted-roii" ? "maas-vs-self-hosted" : entityId,
      venue: "ROИИ 2026 · день 1",
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

const nativeArticleExcerpt =
  "Покупка ускорителей не превращает AI-демо в платформу. Сначала зафиксируйте сценарий, правила работы с данными, критерии качества, SLO и владельцев — затем выбирайте способ исполнения.";

const externalArticleExcerpt =
  "Короткий запрос иногда обходится дороже длинного: в агентном цикле важны стабильность префикса, порядок tools и фактические cache-read сигналы.";

const fixtures = [
  article("ai-platform-before-gpu", {
    publishedAt: "2026-07-22",
    excerpt: nativeArticleExcerpt
  }),
  article("short-prompt-not-cheap", {
    kind: "external-note",
    slug: null,
    sourceName: "Хабр",
    sourceUrl: "https://habr.com/ru/companies/bitrix/articles/1033822/",
    publishedAt: "2026-05-12",
    excerpt: externalArticleExcerpt,
    relations: { platformEntityIds: ["prefix-cache"] }
  }),
  talk("maas-vs-self-hosted-roii"),
  project("audit-prompt-caching", {
    relations: { platformEntityIds: ["prefix-cache"] },
    verifiedRelease: {
      version: "v0.1.3",
      publishedAt: "2026-07-20",
      url: "https://github.com/sernote/audit-prompt-caching/releases/tag/v0.1.3",
      verifiedAt: "2026-07-22"
    },
    quickStart:
      "npx skills add https://github.com/sernote/audit-prompt-caching --skill audit-prompt-caching"
  }),
  area("inference-plane", 3),
  component("prefix-cache", "inference-plane"),
  syntheticCase("agent-session-cache-reuse", "prefix-cache"),
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
    expect(source.generateParams("talk", "ru")).toEqual([
      { slug: "maas-vs-self-hosted" }
    ]);
    expect(source.generateParams("project", "ru")).toEqual([
      { slug: "audit-prompt-caching" }
    ]);
    expect(source.generateParams("platform-area", "ru")).toEqual([
      { slug: "inference-plane" }
    ]);
    expect(source.generateParams("platform-component", "ru")).toEqual([
      { slug: "prefix-cache" }
    ]);
    expect(source.generateParams("case", "ru")).toEqual([
      { slug: "agent-session-cache-reuse" }
    ]);
    expect(source.getBySlug("platform-area", "unknown-area", "ru")).toBeNull();
    expect(source.getBySlug("platform-component", "unknown-component", "ru")).toBeNull();
    expect(source.getBySlug("case", "unknown-case", "ru")).toBeNull();
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
      "prefix-cache",
      "agent-session-cache-reuse"
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
  it("builds the Blog in deterministic source order with explicit article provenance and dates", () => {
    const model = getBlogViewModel(createV3Source(fixtures));

    expect(
      model.items.map(
        ({
          entityId,
          href,
          linkKind,
          articleKind,
          sourceName,
          publishedAt,
          publishedLabel,
          meta
        }) => [
          entityId,
          href,
          linkKind,
          articleKind,
          sourceName,
          publishedAt,
          publishedLabel,
          meta
        ]
      )
    ).toEqual([
      [
        "ai-platform-before-gpu",
        "/blog/ai-platform-before-gpu",
        "internal",
        "native",
        null,
        "2026-07-22",
        "22 июля 2026 года",
        "Авторская статья"
      ],
      [
        "short-prompt-not-cheap",
        "https://habr.com/ru/companies/bitrix/articles/1033822/",
        "external",
        "external-note",
        "Хабр",
        "2026-05-12",
        "12 мая 2026 года",
        "Хабр · внешний материал"
      ]
    ]);
    expect(model.items.map(({ description }) => description)).toEqual([
      nativeArticleExcerpt,
      externalArticleExcerpt
    ]);
  });

  it("keeps the Blog view model immutable, body-free, and independent of generated-entry order", () => {
    const normal = getBlogViewModel(createV3Source(fixtures));
    const reversed = getBlogViewModel(createV3Source([...fixtures].reverse()));

    expect(reversed).toEqual(normal);
    expect(Object.isFrozen(normal)).toBe(true);
    expect(Object.isFrozen(normal.items)).toBe(true);
    for (const item of normal.items) {
      expect(Object.isFrozen(item)).toBe(true);
      expect(item).not.toHaveProperty("body");
      expect(item).not.toHaveProperty("sourcePath");
    }
  });

  it("formats Russian publication dates deterministically from calendar-date strings", () => {
    expect(formatRussianDate("2026-07-22")).toBe("22 июля 2026 года");
    expect(formatRussianDate("2026-05-12")).toBe("12 мая 2026 года");
    expect(formatRussianDate("2026-01-01")).toBe("1 января 2026 года");
    expect(() => formatRussianDate("2026-02-30")).toThrow(/calendar date/i);
  });

  it("builds immutable Talks and Projects indexes from public source records", () => {
    const source = createV3Source(fixtures);
    const talks = getTalksViewModel(source);
    const projects = getProjectsViewModel(source);

    expect(talks.items).toEqual([
      expect.objectContaining({
        entityId: "maas-vs-self-hosted-roii",
        href: "/talks/maas-vs-self-hosted",
        description: "Как сравнить MaaS и self-hosted по качеству, SLO и ответственности.",
        eyebrow: "ROИИ 2026 · 19 февраля 2026 года"
      })
    ]);
    expect(projects.items).toEqual([
      expect.objectContaining({
        entityId: "audit-prompt-caching",
        href: "/projects/audit-prompt-caching",
        eyebrow: "Открытый проект · v0.1.3"
      })
    ]);

    for (const model of [talks, projects]) {
      expect(Object.isFrozen(model)).toBe(true);
      expect(Object.isFrozen(model.items)).toBe(true);
      expect(Object.isFrozen(model.items[0])).toBe(true);
      expect(model.items[0]).not.toHaveProperty("body");
      expect(model.items[0]).not.toHaveProperty("sourcePath");
    }

    expect(getTalksViewModel(createV3Source([...fixtures].reverse()))).toEqual(talks);
    expect(getProjectsViewModel(createV3Source([...fixtures].reverse()))).toEqual(projects);
  });

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
    const withDraftProject = fixtures
      .filter((item) => item.entityId !== "agent-session-cache-reuse")
      .map((item) =>
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

describe("AI Platform map and reference view models", () => {
  it("builds the exact seven-area map with one source-driven public link", () => {
    const model = getPlatformMapViewModel(createV3Source(fixtures));

    expect(model.areas.map(({ index, entityId }) => [index, entityId])).toEqual([
      ["01", "strategy-boundaries"],
      ["02", "control-plane"],
      ["03", "inference-plane"],
      ["04", "context-agent-runtime"],
      ["05", "quality-lifecycle"],
      ["06", "operations-economics"],
      ["07", "security-ownership"]
    ]);
    expect(model.areas.map(({ title }) => title)).toEqual([
      "Стратегия и границы",
      "Control Plane",
      "Inference Plane",
      "Context & Agent Runtime",
      "Качество и lifecycle",
      "Эксплуатация и экономика",
      "Безопасность и ownership"
    ]);
    expect(model.areas.filter((area) => area.href)).toEqual([
      expect.objectContaining({
        entityId: "inference-plane",
        href: "/ai-platform/areas/inference-plane",
        mapBoundary: expect.any(String),
        statusLabel: "Доступно"
      })
    ]);
    expect(model.areas.filter((area) => !area.href)).toHaveLength(6);
    expect(model.areas.filter((area) => !area.href).every((area) => area.statusLabel === "Планируется"))
      .toBe(true);
    expect(model.intersections.every((intersection) => !intersection.title.includes("↔"))).toBe(
      true
    );
  });

  it("keeps the map immutable, source-small, deterministic, and input-order independent", () => {
    const model = getPlatformMapViewModel(createV3Source(fixtures));
    const reversed = getPlatformMapViewModel(createV3Source([...fixtures].reverse()));

    expect(reversed).toEqual(model);
    expect(getPlatformMapViewModel(createV3Source(fixtures))).toEqual(model);
    expect(Object.isFrozen(model)).toBe(true);
    expect(Object.isFrozen(model.areas)).toBe(true);
    for (const areaModel of model.areas) {
      expect(Object.isFrozen(areaModel)).toBe(true);
      expect(areaModel).not.toHaveProperty("body");
      expect(areaModel).not.toHaveProperty("sourcePath");
    }
  });

  it("keeps a stale public area linked and marks it for review", () => {
    const withStaleArea = fixtures.map((item) =>
      item.entityId === "inference-plane"
        ? area("inference-plane", 3, {
            reviewStatus: "stale",
            reviewedAt: "2026-01-01",
            reviewCycleDays: 30
          })
        : item
    );

    expect(
      getPlatformMapViewModel(createV3Source(withStaleArea)).areas.find(
        (areaModel) => areaModel.entityId === "inference-plane"
      )
    ).toMatchObject({
      href: "/ai-platform/areas/inference-plane",
      statusLabel: "Нужна проверка"
    });
  });

  it("fails closed on a missing, duplicate, or unexpected canonical area", () => {
    const missing = fixtures.filter((item) => item.entityId !== "security-ownership");
    const duplicate = [...fixtures, area("inference-plane", 3)];
    const unexpected = [...fixtures, area("training-plane", 8, {
      publicationStatus: "draft",
      reviewStatus: "unreviewed",
      publishedAt: null,
      reviewedAt: null,
      reviewCycleDays: null,
      sources: [],
      applicability: null,
      limitations: null
    })];

    expect(() => getPlatformMapViewModel(createV3Source(missing))).toThrow(/seven|missing|canonical/i);
    expect(() => getPlatformMapViewModel(createV3Source(duplicate))).toThrow(/duplicate identity/i);
    expect(() => getPlatformMapViewModel(createV3Source(unexpected))).toThrow(/unexpected|canonical/i);
  });

  it("builds exactly two entry modes and the complete four-node pilot vertical", () => {
    const model = getPlatformLandingViewModel(createV3Source(fixtures));

    expect(model.entryModes.map(({ id, href }) => [id, href])).toEqual([
      ["map", "/ai-platform/map"],
      ["vertical", "#current-vertical"]
    ]);
    expect(model.vertical.map(({ entityId, href }) => [entityId, href])).toEqual([
      ["inference-plane", "/ai-platform/areas/inference-plane"],
      ["prefix-cache", "/ai-platform/components/prefix-cache"],
      ["agent-session-cache-reuse", "/ai-platform/cases/agent-session-cache-reuse"],
      ["audit-prompt-caching", "/projects/audit-prompt-caching"]
    ]);
    expect(model.vertical[2]).toMatchObject({ statusLabel: "Синтетический кейс" });
    expect(model.entryModes[1].description).toMatch(/проверенн/i);
    expect(Object.isFrozen(model)).toBe(true);
    expect(Object.isFrozen(model.vertical)).toBe(true);
  });

  it.each([
    "inference-plane",
    "prefix-cache",
    "agent-session-cache-reuse"
  ])("marks stale reference %s on the landing without claiming a checked path", (entityId) => {
    const staleReview = {
      reviewStatus: "stale",
      reviewedAt: "2026-01-01",
      reviewCycleDays: 30
    };
    const withStaleReference = fixtures.map((item) => {
      if (item.entityId !== entityId) return item;
      if (entityId === "inference-plane") {
        return area("inference-plane", 3, staleReview);
      }
      if (entityId === "prefix-cache") {
        return component("prefix-cache", "inference-plane", staleReview);
      }
      return syntheticCase(
        "agent-session-cache-reuse",
        "prefix-cache",
        staleReview
      );
    });

    const model = getPlatformLandingViewModel(createV3Source(withStaleReference));

    expect(
      model.vertical.find((item) => item.entityId === entityId)?.statusLabel
    ).toBe("Нужна проверка");
    expect(model.entryModes[1].description).not.toMatch(/проверенн(?:ый|ого) путь/i);
    expect(model.entryModes[1].description).toMatch(/повторн.*проверк/i);
  });

  it("keeps a stale related reference linked and exposes its visible review state", () => {
    const withStaleArea = fixtures.map((item) =>
      item.entityId === "inference-plane"
        ? area("inference-plane", 3, {
            reviewStatus: "stale",
            reviewedAt: "2026-01-01",
            reviewCycleDays: 30
          })
        : item
    );
    const model = getReferenceDetailViewModel(
      createV3Source(withStaleArea),
      "platform-component",
      "prefix-cache"
    );

    expect(model?.related.find((item) => item.entityId === "inference-plane")).toMatchObject({
      href: "/ai-platform/areas/inference-plane",
      reviewStatusLabel: "Нужна проверка"
    });
  });

  it("builds all three source-backed reference detail structures", () => {
    const source = createV3Source(fixtures);
    const exemplars = [
      getReferenceDetailViewModel(source, "platform-area", "inference-plane"),
      getReferenceDetailViewModel(source, "platform-component", "prefix-cache"),
      getReferenceDetailViewModel(source, "case", "agent-session-cache-reuse")
    ];

    for (const model of exemplars) {
      expect(model).not.toBeNull();
      expect(Object.isFrozen(model)).toBe(true);
      expect(model).not.toHaveProperty("body");
      expect(model).not.toHaveProperty("sourcePath");
      expect(model).not.toHaveProperty("sectionKeys");
    }

    const componentModel = exemplars[1]!;
    expect(componentModel.primaryArea).toMatchObject({
      entityId: "inference-plane",
      href: "/ai-platform/areas/inference-plane"
    });
    expect(componentModel.related.map(({ entityId }) => entityId)).toEqual([
      "inference-plane",
      "agent-session-cache-reuse",
      "audit-prompt-caching",
      "short-prompt-not-cheap"
    ]);
    expect(componentModel.related).toHaveLength(4);

  });

  it("returns null for unknown reference slugs and marks the case as synthetic", () => {
    const source = createV3Source(fixtures);

    expect(getReferenceDetailViewModel(source, "platform-area", "unknown")).toBeNull();
    expect(getReferenceDetailViewModel(source, "platform-component", "unknown")).toBeNull();
    expect(getReferenceDetailViewModel(source, "case", "unknown")).toBeNull();
    expect(
      getReferenceDetailViewModel(source, "case", "agent-session-cache-reuse")
    ).toMatchObject({ isSynthetic: true, typeLabel: "Синтетический кейс" });
  });
});

describe("AI Platform exemplar editorial contract", () => {
  it("states the inference responsibility contract without inventing a universal topology", () => {
    const inferenceText = readFileSync(
      join(process.cwd(), "content/v3/ai-platform/areas/inference-plane.mdx"),
      "utf8"
    );
    const contextText = readFileSync(
      join(process.cwd(), "content/v3/ai-platform/areas/context-agent-runtime.mdx"),
      "utf8"
    );

    expect(inferenceText).toContain(
      'mapBoundary: "Исполняет модельные нагрузки и управляет средами исполнения, пулами ресурсов, планированием, пакетной обработкой, памятью и кэшем; не выбирает бизнес-сценарий."'
    );
    expect(contextText).toContain(
      'mapBoundary: "Собирает контекст и управляет многошаговой работой агента: поиском данных, инструментами, состоянием сессии, памятью, остановкой и восстановлением."'
    );
    expect(inferenceText).toContain(
      "Inference Plane исполняет подготовленную модельную нагрузку. Если в платформе есть Control Plane, он передаёт параметры маршрута и политики; это контракт ответственности, а не обязательная предыдущая стадия пути запроса."
    );
    expect(inferenceText).not.toContain(
      "Inference Plane исполняет запрос после того, как Control Plane разрешил маршрут."
    );
  });

  it("keeps the case visibly synthetic in title and description", () => {
    const caseText = readFileSync(
      join(process.cwd(), "content/v3/ai-platform/cases/agent-session-cache-reuse.mdx"),
      "utf8"
    );

    expect(caseText).toMatch(/^title: .*синтетич/m);
    expect(caseText).toMatch(/^description: .*Синтетич/m);
    expect(caseText).toContain("> **Синтетический кейс.**");
  });

});

describe("native Blog article editorial contract", () => {
  it("keeps the required lifecycle, structure, links, and corrected Russian copy", () => {
    const articleText = readFileSync(
      join(process.cwd(), "content/v3/blog/ai-platform-before-gpu.mdx"),
      "utf8"
    );
    const requiredDescription =
      "Почему для production-сценария сначала нужно определить правила работы с данными, критерии качества, SLO и владельцев, а уже потом выбирать модель и инфраструктуру.";

    expect(articleText).toContain(`description: "${requiredDescription}"`);
    expect(articleText).toContain(`excerpt: "${nativeArticleExcerpt}"`);
    expect(articleText).toMatch(/publicationStatus: published/);
    expect(articleText).toMatch(/reviewStatus: unreviewed/);
    expect(articleText).toMatch(/publishedAt: "2026-07-22"/);
    expect(articleText).toMatch(/updatedAt: "2026-07-22"/);
    expect(articleText).toMatch(/relations: \{\}/);

    for (const copy of [
      "Коллегам нравится демо.",
      "Один ассистент находит фрагмент в публичной базе знаний.",
      "Другой предлагает изменить запись в рабочей системе.",
      "Третий вызывает инструмент, который записывает данные.",
      "Локальное размещение модели само по себе не защищает систему: сервис может получить чрезмерные права, чувствительные данные — попасть в лог, а вредная инструкция из документа — дойти до исполнения.",
      "лучше выдерживать стиль",
      "корректность выбора инструмента",
      "трижды вызывает инструмент",
      "доля успешных вызовов инструментов",
      "правила реакции на сбой",
      "Security задаёт обязательные меры контроля и процесс оценки остаточного риска. Остаточный риск принимает назначенный владелец.",
      "назначенный владелец с полномочиями",
      "Одних спецификаций устройства без профиля запросов недостаточно для расчёта. Среднюю утилизацию тоже нужно сопоставлять с очередью и SLO.",
      "к компонентам и проверяемым данным"
    ]) {
      expect(articleText).toContain(copy);
    }

    for (const outdatedCopy of [
      "Демо нравится.",
      "лучше писать стиль",
      "корректность tool choice",
      "трижды повторяет инструмент",
      "успех инструментов",
      "политика ошибки",
      "человек или роль, которые вправе",
      "к компонентам и evidence"
    ]) {
      expect(articleText).not.toContain(outdatedCopy);
    }

    expect(articleText).toContain(
      "[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)"
    );
    expect(articleText).toContain(
      "[Implementing SLOs](https://sre.google/workbook/implementing-slos/)"
    );

    const headings = [...articleText.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    expect(headings).toEqual([
      "Сценарий задаёт границу системы",
      "Сначала данные и безопасность",
      "Качество должно пережить демо",
      "SLO описывает пользовательский результат",
      "Ownership нельзя отдать платформе целиком",
      "Теперь выбираем execution path",
      "Карта вместо списка покупок"
    ]);
  });
});

describe("Talk and project exemplar editorial contract", () => {
  it("keeps the talk dates, venue, recording, and five timestamped takeaways distinct", () => {
    const talkText = readFileSync(
      join(process.cwd(), "content/v3/talks/maas-vs-self-hosted.mdx"),
      "utf8"
    );

    expect(talkText).toContain('description: "Доклад ROИИ');
    expect(talkText).toContain('venue: "ROИИ 2026 · день 1"');
    expect(talkText).toContain('eventDate: "2026-02-19"');
    expect(talkText).toContain('recordingUploadedAt: "2026-02-22"');
    expect(talkText).toContain(
      'recordingUrl: "https://www.youtube.com/watch?v=RHbbeHKGh6I"'
    );
    expect(talkText).toContain('path: "/media/talks/maas-vs-self-hosted.jpg"');
    expect(talkText).toContain("слайде доклада ROИИ");
    expect(talkText).toContain("[ROИИ 2026]");
    expect(talkText).toContain("публичные роли ROИИ 2026");
    expect(talkText).not.toContain("РОИИ");
    expect(talkText.match(/timestampSeconds:/g)).toHaveLength(5);
    expect(talkText).toContain("Публичную ссылку на слайды подтвердить не удалось.");
    expect(talkText).not.toMatch(/слайдов (?:нет|не было)/i);
  });

  it("keeps the project quick start, release evidence, data boundary, and safe claim strength", () => {
    const projectText = readFileSync(
      join(process.cwd(), "content/v3/projects/audit-prompt-caching.mdx"),
      "utf8"
    );
    const quickStart =
      "npx skills add https://github.com/sernote/audit-prompt-caching --skill audit-prompt-caching";

    expect(projectText).toContain(quickStart);
    expect(projectText).toContain('version: "v0.1.3"');
    expect(projectText).toContain('publishedAt: "2026-07-20"');
    expect(projectText).toContain('verifiedAt: "2026-07-22"');
    expect(projectText).toContain("cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23");
    expect(projectText).toContain("лицензии MIT");
    expect(projectText).toContain("## Локальность и границы данных");
    expect(projectText).toContain("## Проверенный снимок релиза");
    expect(projectText).toContain("помогает искать вероятные причины");
    expect(projectText).toContain("собирать доказательства");
    expect(projectText).toContain(
      "границу данных определяют его runtime, разрешения инструментов и подключённые сервисы"
    );
    expect(projectText).not.toMatch(/гарант(?:ирует|ирован)|всегда находит|данные никогда не/i);
  });
});
