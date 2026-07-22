import { describe, expect, it } from "vitest";

import {
  createRegistry,
  getCanonicalUrl,
  type RelationRef
} from "../../lib/content-v3/registry";

const now = "2026-07-22";

const shared = {
  locale: "ru",
  title: "Production AI record",
  description: "Практическое описание производственного элемента AI-платформы.",
  publicationStatus: "published",
  reviewStatus: "unreviewed",
  publishedAt: "2026-07-01",
  updatedAt: "2026-07-10",
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["platform"],
  relations: {}
};

const reviewEvidence = {
  reviewStatus: "reviewed",
  reviewedAt: "2026-07-01",
  reviewCycleDays: 90,
  sources: [
    {
      title: "Public reference",
      url: "https://example.com/reference",
      verifiedAt: "2026-07-01"
    }
  ],
  applicability: "Подходит для production-like сценариев с измеримыми границами.",
  limitations: "Не заменяет проверку на фактической нагрузке и данных команды."
};

function article(entityId: string, overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    entityId,
    type: "article",
    kind: "native",
    slug: entityId,
    excerpt: "Краткое практическое объяснение инженерного решения.",
    sourceName: null,
    sourceUrl: null,
    supersedes: null,
    supersededBy: null,
    ...overrides
  };
}

function talk(entityId: string, overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    entityId,
    type: "talk",
    slug: entityId,
    venue: "Production AI Meetup",
    eventDate: "2026-06-01",
    format: "talk",
    recordingUrl: null,
    recordingUploadedAt: null,
    abstract: "Как принимать проверяемые решения о production AI-платформе.",
    takeaways: [
      { label: "Контракт", text: "Начинайте с измеримого контракта.", timestampSeconds: null },
      { label: "Сигналы", text: "Проверяйте решение по сигналам.", timestampSeconds: null },
      { label: "Границы", text: "Фиксируйте границы применимости.", timestampSeconds: null }
    ],
    slidesUrl: null,
    thumbnail: null,
    ...overrides
  };
}

function project(entityId: string, overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    entityId,
    type: "project",
    slug: entityId,
    repositoryUrl: `https://github.com/example/${entityId}`,
    verifiedRelease: null,
    audience: ["AI platform engineers"],
    quickStart: "Откройте документацию и воспроизведите минимальный пример.",
    privacyBoundary: "Только публичные и синтетические данные.",
    evidence: ["Публичный репозиторий с воспроизводимым примером."],
    supportBoundary: "Материалы предоставляются без операционной поддержки.",
    ...overrides
  };
}

function area(entityId: string, overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    ...reviewEvidence,
    entityId,
    type: "platform-area",
    slug: entityId,
    order: 1,
    mapBoundary: `Граница области ${entityId} для карты ответственности.`,
    included: ["Production responsibilities"],
    excluded: ["Confidential implementation details"],
    signals: ["Latency"],
    ...overrides
  };
}

function component(entityId: string, primaryAreaId: string, overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    ...reviewEvidence,
    entityId,
    type: "platform-component",
    slug: entityId,
    primaryAreaId,
    relatedAreaIds: [],
    decisionQuestions: ["Какой измеримый контракт должен выполнять компонент?"],
    metrics: ["Request latency"],
    failureModes: ["Непроверенная граница нагрузки"],
    ...overrides
  };
}

function caseRecord(entityId: string, componentIds: string[], overrides: Record<string, unknown> = {}) {
  return {
    ...shared,
    ...reviewEvidence,
    entityId,
    type: "case",
    slug: entityId,
    caseKind: "synthetic",
    componentIds,
    evidence: ["Синтетическая трасса с фиксированными входными данными."],
    ...overrides
  };
}

describe("v3 registry identity and URLs", () => {
  it("rejects duplicate locale identities and type drift between locales", () => {
    expect(() => createRegistry([article("prefix-cache"), article("prefix-cache")], { now })).toThrow(
      /duplicate identity/i
    );
    expect(() =>
      createRegistry(
        [article("prefix-cache"), talk("prefix-cache", { locale: "en" })],
        { now }
      )
    ).toThrow(/different types/i);
  });

  it("rejects local canonical collisions but excludes external notes from the collision set", () => {
    const colliding = article("cache-alias", { slug: "prefix-cache" });
    expect(() => createRegistry([article("prefix-cache"), colliding], { now })).toThrow(
      /canonical URL/i
    );

    const external = article("external-prefix-cache", {
      kind: "external-note",
      slug: null,
      sourceName: "Habr",
      sourceUrl: "https://example.com/notes/prefix-cache"
    });
    expect(createRegistry([article("prefix-cache"), external], { now }).all()).toHaveLength(2);
  });

  it("derives exhaustive RU-root, EN-prefixed, and external canonical URLs", () => {
    const records = [
      article("article"),
      talk("talk"),
      project("project"),
      area("gateway"),
      component("router", "gateway"),
      caseRecord("routing-case", ["router"]),
      article("english", { locale: "en" }),
      article("external", {
        kind: "external-note",
        slug: null,
        sourceName: "Habr",
        sourceUrl: "https://example.com/external"
      })
    ];
    const registry = createRegistry(records, { now });

    expect(records.map((record) => getCanonicalUrl(registry.getByIdentity(record as RelationRef, record.locale as "ru" | "en")!))).toEqual([
      "/blog/article",
      "/talks/talk",
      "/projects/project",
      "/ai-platform/areas/gateway",
      "/ai-platform/components/router",
      "/ai-platform/cases/routing-case",
      "/en/blog/english",
      "https://example.com/external"
    ]);
  });

  it("returns only an exact same-type opposite-locale alternate", () => {
    const ru = article("prefix-cache");
    const en = article("prefix-cache", { locale: "en", slug: "prefix-cache-guide" });
    const ruOnly = article("gateway-policy");
    const registry = createRegistry([ruOnly, en, ru], { now });

    expect(registry.getAlternate(registry.getByIdentity(ru as RelationRef, "ru")!)).toMatchObject({
      locale: "en",
      slug: "prefix-cache-guide"
    });
    expect(registry.getAlternate(registry.getByIdentity(ruOnly as RelationRef, "ru")!)).toBeNull();
  });
});

describe("v3 registry graph validation", () => {
  it("rejects duplicate, self, missing, and wrong-type editorial relations", () => {
    const target = article("target");
    expect(() =>
      createRegistry(
        [target, article("source", { relations: { articleIds: ["target", "target"] } })],
        { now }
      )
    ).toThrow(/duplicate relation/i);
    expect(() =>
      createRegistry([article("self", { relations: { articleIds: ["self"] } })], { now })
    ).toThrow(/self relation/i);
    expect(() =>
      createRegistry([article("source", { relations: { articleIds: ["missing"] } })], { now })
    ).toThrow(/missing relation target/i);
    expect(() =>
      createRegistry(
        [talk("target"), article("source", { relations: { articleIds: ["target"] } })],
        { now }
      )
    ).toThrow(/wrong relation type/i);
  });

  it("rejects published editorial links to non-public targets", () => {
    const draft = article("draft-target", {
      publicationStatus: "draft",
      publishedAt: null
    });
    expect(() =>
      createRegistry(
        [draft, article("source", { relations: { articleIds: ["draft-target"] } })],
        { now }
      )
    ).toThrow(/non-public target/i);
  });

  it("builds deterministic relation backlinks", () => {
    const target = article("prefix-cache");
    const records = [
      article("zeta-guide", { relations: { articleIds: ["prefix-cache"] } }),
      target,
      talk("cache-talk", { relations: { articleIds: ["prefix-cache"] } }),
      article("alpha-guide", { relations: { articleIds: ["prefix-cache"] } })
    ];

    const ids = createRegistry(records, { now })
      .getBacklinks({ type: "article", entityId: "prefix-cache" }, "ru")
      .map((record) => record.entityId);
    expect(ids).toEqual(["alpha-guide", "zeta-guide", "cache-talk"]);
  });

  it("validates published structural membership while allowing planned drafts", () => {
    const draftArea = area("runtime", { publicationStatus: "draft", publishedAt: null });
    expect(() => createRegistry([draftArea, component("cache", "runtime")], { now })).toThrow(
      /published reviewed-or-stale primary area/i
    );
    expect(() =>
      createRegistry([area("runtime", { reviewStatus: "unreviewed", reviewedAt: null, reviewCycleDays: null }), component("cache", "runtime")], { now })
    ).toThrow(/published reviewed-or-stale primary area/i);
    expect(() =>
      createRegistry([area("runtime"), component("cache", "runtime", { publicationStatus: "draft", publishedAt: null })], { now })
    ).not.toThrow();

    const draftComponent = component("cache", "runtime", {
      publicationStatus: "draft",
      publishedAt: null
    });
    expect(() =>
      createRegistry([area("runtime"), draftComponent, caseRecord("cache-case", ["cache"])], {
        now
      })
    ).toThrow(/published reviewed-or-stale component/i);
    expect(() => createRegistry([area("runtime"), component("cache", "runtime"), caseRecord("empty-case", [])], { now })).toThrow(
      /at least one published reviewed-or-stale component/i
    );
  });
});

describe("v3 registry lifecycle", () => {
  it("rejects reviewed references only after their review deadline", () => {
    expect(() =>
      createRegistry([area("expired", { reviewedAt: "2026-04-22", reviewCycleDays: 90 })], {
        now
      })
    ).toThrow(/reviewed reference.*expired/i);
    expect(() =>
      createRegistry([area("deadline-today", { reviewedAt: "2026-04-23", reviewCycleDays: 90 })], {
        now
      })
    ).not.toThrow();
  });

  it("rejects stale references until after their review deadline without rewriting status", () => {
    const earlyStale = area("early-stale", {
      reviewStatus: "stale",
      reviewedAt: "2026-04-23",
      reviewCycleDays: 90
    });
    expect(() => createRegistry([earlyStale], { now })).toThrow(/stale reference.*not expired/i);

    const validStale = area("valid-stale", {
      reviewStatus: "stale",
      reviewedAt: "2026-04-22",
      reviewCycleDays: 90
    });
    const registry = createRegistry([validStale], { now });
    expect(registry.all()[0].reviewStatus).toBe("stale");
    expect(() => registry.assertLifecycle(now)).not.toThrow();
  });
});

describe("v3 registry public queries and ordering", () => {
  it("applies editorial and reference visibility filters", () => {
    const records = [
      article("published-unreviewed"),
      article("draft", { publicationStatus: "draft", publishedAt: null }),
      article("archived", { publicationStatus: "archived" }),
      area("reviewed"),
      area("stale", { reviewStatus: "stale", reviewedAt: "2026-04-22", reviewCycleDays: 90 }),
      area("unreviewed", { reviewStatus: "unreviewed", reviewedAt: null, reviewCycleDays: null }),
      article("external", {
        kind: "external-note",
        slug: null,
        sourceName: "Habr",
        sourceUrl: "https://example.com/external"
      })
    ];
    const registry = createRegistry(records, { now });

    expect(registry.listPublic().map((record) => record.entityId).sort()).toEqual([
      "external",
      "published-unreviewed",
      "reviewed",
      "stale"
    ]);
    expect(registry.listLocalCanonical().map((record) => record.entityId).sort()).toEqual([
      "published-unreviewed",
      "reviewed",
      "stale"
    ]);
    expect(registry.listFeatured().map((record) => record.entityId).sort()).toEqual([
      "external",
      "published-unreviewed",
      "reviewed"
    ]);
  });

  it("orders all records and public lists deterministically for reversed input", () => {
    const records = [
      talk("talk-old", { publishedAt: "2026-05-01", updatedAt: "2026-07-20" }),
      article("zeta", { publishedAt: "2026-07-02", updatedAt: "2026-07-03" }),
      article("alpha", { publishedAt: "2026-07-02", updatedAt: "2026-07-04" }),
      area("third", { order: 3 }),
      area("first-zeta", { order: 1 }),
      area("first-alpha", { order: 1 }),
      article("english", { locale: "en" })
    ];
    const normal = createRegistry(records, { now });
    const reversed = createRegistry([...records].reverse(), { now });
    const ids = (values: ReturnType<typeof normal.all>) =>
      values.map((record) => `${record.type}:${record.locale}:${record.entityId}`);

    expect(ids(normal.all())).toEqual(ids(reversed.all()));
    expect(normal.all().map((record) => record.entityId)).toEqual([
      "english",
      "alpha",
      "zeta",
      "first-alpha",
      "first-zeta",
      "third",
      "talk-old"
    ]);
    expect(normal.listPublic("article", "ru").map((record) => record.entityId)).toEqual([
      "alpha",
      "zeta"
    ]);
    expect(normal.listPublic("platform-area", "ru").map((record) => record.entityId)).toEqual([
      "first-alpha",
      "first-zeta",
      "third"
    ]);
    expect(ids(normal.listLocalCanonical())).toEqual(ids(reversed.listLocalCanonical()));
    expect(ids(normal.listFeatured())).toEqual(ids(reversed.listFeatured()));
  });

  it("keeps mixed public ordering identical across every input permutation", () => {
    const oldArticle = article("old-article", { publishedAt: "2026-01-01" });
    const newTalk = talk("new-talk", { publishedAt: "2026-07-01" });
    const platformArea = area("platform-area", { order: 1 });
    const permutations = [
      [oldArticle, newTalk, platformArea],
      [oldArticle, platformArea, newTalk],
      [newTalk, oldArticle, platformArea],
      [newTalk, platformArea, oldArticle],
      [platformArea, oldArticle, newTalk],
      [platformArea, newTalk, oldArticle]
    ];

    expect(
      permutations.map((records) =>
        createRegistry(records, { now })
          .listPublic()
          .map((record) => record.entityId)
      )
    ).toEqual(
      Array.from({ length: permutations.length }, () => [
        "platform-area",
        "new-talk",
        "old-article"
      ])
    );
  });

  it("supports typed slug and identity lookups", () => {
    const record = article("prefix-cache", { slug: "prefix-cache-guide" });
    const registry = createRegistry([record], { now });
    expect(registry.getBySlug("article", "prefix-cache-guide", "ru")?.entityId).toBe(
      "prefix-cache"
    );
    expect(registry.getBySlug("talk", "prefix-cache-guide", "ru")).toBeNull();
    expect(registry.getByIdentity({ type: "article", entityId: "prefix-cache" }, "ru")?.title).toBe(
      shared.title
    );
  });

  it("exposes the same deeply frozen records from every query", () => {
    const registry = createRegistry(
      [article("target"), article("source", { relations: { articleIds: ["target"] } })],
      { now }
    );
    const record = registry.getByIdentity({ type: "article", entityId: "source" }, "ru")!;
    const relationIds = record.relations.articleIds!;

    expect(Object.isFrozen(record)).toBe(true);
    expect(Object.isFrozen(record.relations)).toBe(true);
    expect(Object.isFrozen(relationIds)).toBe(true);
    expect(registry.all().find((candidate) => candidate.entityId === "source")).toBe(record);
    expect(registry.getRelated(record)[0]).toBe(
      registry.getByIdentity({ type: "article", entityId: "target" }, "ru")
    );
    expect(() => {
      record.title = "Mutated title";
    }).toThrow(TypeError);
    expect(() => relationIds.push("another-target")).toThrow(TypeError);
  });
});

describe("v3 visible related records", () => {
  it("merges forward, structural, and backlink buckets in priority order with dedupe and cap", () => {
    const gateway = area("gateway");
    const runtime = area("runtime", { order: 2 });
    const cache = component("prefix-cache", "gateway", {
      relatedAreaIds: ["runtime"],
      relations: {
        articleIds: ["cache-guide"],
        platformEntityIds: ["gateway"]
      }
    });
    const guide = article("cache-guide", { publishedAt: "2026-07-15" });
    const draftGuide = article("draft-guide", {
      publicationStatus: "draft",
      publishedAt: null,
      relations: { platformEntityIds: ["prefix-cache"] }
    });
    const useCase = caseRecord("cache-case", ["prefix-cache"]);
    const backlink = talk("cache-talk", {
      relations: { platformEntityIds: ["prefix-cache"] }
    });
    const registry = createRegistry(
      [backlink, useCase, draftGuide, guide, cache, runtime, gateway],
      { now }
    );
    const record = registry.getByIdentity(
      { type: "platform-component", entityId: "prefix-cache" },
      "ru"
    )!;

    expect(registry.getRelated(record).map((item) => item.entityId)).toEqual([
      "gateway",
      "cache-guide"
    ]);
    expect(registry.getRelatedForPage(record).map((item) => item.entityId)).toEqual([
      "gateway",
      "cache-guide",
      "runtime",
      "cache-case"
    ]);
    expect(registry.getRelatedForPage(record, 8).map((item) => item.entityId)).toEqual([
      "gateway",
      "cache-guide",
      "runtime",
      "cache-case"
    ]);
    expect(
      createRegistry([backlink, useCase, draftGuide, guide, cache, runtime, gateway].reverse(), {
        now
      })
        .getRelatedForPage(record, 8)
        .map((item) => item.entityId)
    ).toEqual(["gateway", "cache-guide", "runtime", "cache-case"]);
  });

  it("clamps explicit limits to a finite integer between zero and four", () => {
    const target = article("target");
    const sources = ["one", "two", "three", "four"].map((entityId) =>
      article(entityId, { relations: { articleIds: ["target"] } })
    );
    const registry = createRegistry([target, ...sources], { now });
    const targetRecord = registry.getByIdentity({ type: "article", entityId: "target" }, "ru")!;

    expect(registry.getRelatedForPage(targetRecord, 2.9)).toHaveLength(2);
    expect(registry.getRelatedForPage(targetRecord, -1)).toEqual([]);
    expect(registry.getRelatedForPage(targetRecord, Number.POSITIVE_INFINITY)).toEqual([]);
    expect(registry.getRelatedForPage(targetRecord, Number.NaN)).toEqual([]);
  });

  it("sorts every priority bucket independently of relation and input order", () => {
    const oldForward = article("old-forward", { publishedAt: "2026-05-01" });
    const newForward = article("new-forward", { publishedAt: "2026-07-01" });
    const forwardSource = (ids: string[]) =>
      article("forward-source", { relations: { articleIds: ids } });
    const forwardNormal = createRegistry(
      [oldForward, newForward, forwardSource(["old-forward", "new-forward"])],
      { now }
    );
    const forwardReversed = createRegistry(
      [forwardSource(["new-forward", "old-forward"]), newForward, oldForward],
      { now }
    );
    const forwardIds = (registry: ReturnType<typeof createRegistry>) => {
      const record = registry.getByIdentity({ type: "article", entityId: "forward-source" }, "ru")!;
      return {
        direct: registry.getRelated(record).map((candidate) => candidate.entityId),
        visible: registry.getRelatedForPage(record).map((candidate) => candidate.entityId)
      };
    };
    expect([forwardIds(forwardNormal), forwardIds(forwardReversed)]).toEqual([
      { direct: ["new-forward", "old-forward"], visible: ["new-forward", "old-forward"] },
      { direct: ["new-forward", "old-forward"], visible: ["new-forward", "old-forward"] }
    ]);

    const platformArea = area("runtime");
    const oldComponent = component("old-component", "runtime", { publishedAt: "2026-05-01" });
    const newComponent = component("new-component", "runtime", { publishedAt: "2026-07-01" });
    const structuralNormal = createRegistry(
      [platformArea, oldComponent, newComponent, caseRecord("focus-case", ["old-component", "new-component"])],
      { now }
    );
    const structuralReversed = createRegistry(
      [caseRecord("focus-case", ["new-component", "old-component"]), newComponent, oldComponent, platformArea],
      { now }
    );
    const structuralIds = (registry: ReturnType<typeof createRegistry>) => {
      const record = registry.getByIdentity({ type: "case", entityId: "focus-case" }, "ru")!;
      return registry.getRelatedForPage(record).map((candidate) => candidate.entityId);
    };
    expect([structuralIds(structuralNormal), structuralIds(structuralReversed)]).toEqual([
      ["new-component", "old-component"],
      ["new-component", "old-component"]
    ]);

    const backlinkTarget = article("backlink-target");
    const oldArticleBacklink = article("old-article-backlink", {
      publishedAt: "2026-05-01",
      relations: { articleIds: ["backlink-target"] }
    });
    const newTalkBacklink = talk("new-talk-backlink", {
      publishedAt: "2026-07-01",
      relations: { articleIds: ["backlink-target"] }
    });
    const backlinkNormal = createRegistry(
      [oldArticleBacklink, backlinkTarget, newTalkBacklink],
      { now }
    );
    const backlinkReversed = createRegistry(
      [newTalkBacklink, backlinkTarget, oldArticleBacklink],
      { now }
    );
    const backlinkIds = (registry: ReturnType<typeof createRegistry>) => {
      const record = registry.getByIdentity(
        { type: "article", entityId: "backlink-target" },
        "ru"
      )!;
      return registry.getRelatedForPage(record).map((candidate) => candidate.entityId);
    };
    expect([backlinkIds(backlinkNormal), backlinkIds(backlinkReversed)]).toEqual([
      ["new-talk-backlink", "old-article-backlink"],
      ["new-talk-backlink", "old-article-backlink"]
    ]);
  });
});
