import { describe, expect, it } from "vitest";

import { parseV3Frontmatter, v3FrontmatterSchema } from "../../lib/content-v3/schema";

const today = "2026-07-22";

const base = {
  entityId: "prefix-cache",
  locale: "ru",
  title: "Prefix cache",
  description: "Практическое описание производственного компонента платформы.",
  publicationStatus: "draft",
  reviewStatus: "unreviewed",
  publishedAt: null,
  updatedAt: today,
  reviewedAt: null,
  reviewCycleDays: null,
  topics: ["caching"],
  relations: {}
} as const;

const reviewed = {
  reviewStatus: "reviewed",
  reviewedAt: today,
  reviewCycleDays: 90,
  sources: [
    {
      title: "Public reference",
      url: "https://example.com/reference",
      verifiedAt: today
    }
  ],
  applicability: "Подходит для повторяющихся стабильных префиксов.",
  limitations: "Не гарантирует попадание в кэш при изменении префикса."
} as const;

const article = {
  ...base,
  type: "article",
  kind: "native",
  slug: "prefix-cache",
  editorialFormat: "article",
  excerpt: "Краткое объяснение работы prefix cache в производственной системе.",
  externalType: null,
  sourceName: null,
  sourceUrl: null,
  sourceAuthorProfileUrl: null,
  participationLabel: null,
  supersedes: null,
  supersededBy: null
} as const;

function nativeArticle(overrides: Record<string, unknown> = {}) {
  return { ...article, ...overrides };
}

function externalArticle(overrides: Record<string, unknown> = {}) {
  return {
    ...article,
    kind: "external-note",
    slug: null,
    editorialFormat: null,
    publishedAt: today,
    externalType: "authored-article",
    sourceName: "Habr",
    sourceUrl: "https://example.com/notes/prefix-cache",
    sourceAuthorProfileUrl: null,
    participationLabel: "Авторская статья",
    ...overrides
  };
}

const talk = {
  ...base,
  entityId: "platform-observability-talk",
  type: "talk",
  slug: "platform-observability",
  venue: "Production AI Meetup",
  eventDate: today,
  format: "talk",
  recordingUrl: "https://example.com/talk",
  recordingUploadedAt: today,
  abstract: "Как строить наблюдаемую и управляемую AI-платформу.",
  takeaways: [
    { label: "Контракт", text: "Начинайте с измеримого контракта платформы.", timestampSeconds: 30 },
    { label: "Сигналы", text: "Связывайте симптомы с проверяемыми сигналами.", timestampSeconds: 120 },
    { label: "Решения", text: "Отделяйте наблюдение от решения о мощности.", timestampSeconds: null }
  ],
  slidesUrl: "https://example.com/slides",
  thumbnail: {
    path: "/media/talks/platform-observability.webp",
    sourceUrl: "https://example.com/talk-thumbnail",
    capturedAt: today,
    alt: "Слайд с картой слоёв производственной AI-платформы"
  }
} as const;

const project = {
  ...base,
  entityId: "production-ai-handbook",
  type: "project",
  slug: "production-ai-handbook",
  repositoryUrl: "https://github.com/example/production-ai-handbook",
  verifiedRelease: {
    version: "v1.0.0",
    publishedAt: today,
    url: "https://github.com/example/production-ai-handbook/releases/tag/v1.0.0",
    verifiedAt: today
  },
  audience: ["AI platform engineers"],
  quickStart: "Откройте карту платформы и выберите актуальный контур.",
  privacyBoundary: "Только публичные и синтетические данные.",
  evidence: ["Публичный репозиторий и воспроизводимые примеры."],
  supportBoundary: "Материалы предоставляются без операционной поддержки."
} as const;

const platformArea = {
  ...base,
  entityId: "inference-runtime",
  type: "platform-area",
  slug: "inference-runtime",
  order: 3,
  mapBoundary:
    "Исполняет model workloads и управляет runtime-ресурсами; не выбирает бизнес-сценарий.",
  included: ["Serving runtimes", "Capacity controls"],
  excluded: ["Model training"],
  signals: ["Queue depth", "Time to first token"]
} as const;

const platformComponent = {
  ...base,
  ...reviewed,
  entityId: "prefix-cache-component",
  type: "platform-component",
  slug: "prefix-cache",
  primaryAreaId: "inference-runtime",
  relatedAreaIds: ["ai-gateway"],
  decisionQuestions: ["Какая доля запросов имеет общий стабильный префикс?"],
  metrics: ["Cache hit rate"],
  failureModes: ["Префикс меняется между запросами"]
} as const;

const caseRecord = {
  ...base,
  entityId: "synthetic-cache-case",
  type: "case",
  slug: "synthetic-cache-case",
  caseKind: "synthetic",
  componentIds: ["prefix-cache-component"],
  evidence: ["Синтетическая трасса с фиксированными входными данными."]
} as const;

describe("v3 frontmatter record variants", () => {
  it("parses a native article", () => {
    expect(parseV3Frontmatter(article)).toMatchObject({ type: "article", kind: "native" });
  });

  it("does not require reference-review metadata from an unreviewed article", () => {
    const unreviewedArticle: Record<string, unknown> = { ...article };
    delete unreviewedArticle.sources;
    delete unreviewedArticle.applicability;
    delete unreviewedArticle.limitations;

    expect(v3FrontmatterSchema.safeParse(unreviewedArticle).success).toBe(true);
  });

  it.each([
    ["talk", talk],
    ["project", project],
    ["platform-area", platformArea],
    ["platform-component", platformComponent],
    ["case", caseRecord]
  ])("parses a %s record", (_type, record) => {
    expect(v3FrontmatterSchema.parse(record)).toMatchObject({ type: _type });
  });

  it.each(["synthetic", "composite", "public"])("accepts caseKind %s", (caseKind) => {
    expect(v3FrontmatterSchema.safeParse({ ...caseRecord, caseKind }).success).toBe(true);
  });
});

describe("v3 article publication contract", () => {
  it.each(["article", "note"])("accepts native editorialFormat %s", (editorialFormat) => {
    expect(() => parseV3Frontmatter(nativeArticle({ editorialFormat }))).not.toThrow();
  });

  it("rejects a native article without editorialFormat", () => {
    expect(() => parseV3Frontmatter(nativeArticle({ editorialFormat: null }))).toThrow(
      /editorialFormat/
    );
  });

  it("rejects an external note with a native editorialFormat", () => {
    expect(() => parseV3Frontmatter(externalArticle({ editorialFormat: "article" }))).toThrow(
      /external/i
    );
  });

  it("rejects an external note without externalType", () => {
    expect(() => parseV3Frontmatter(externalArticle({ externalType: null }))).toThrow(
      /externalType/
    );
  });

  it("rejects an external note without participationLabel", () => {
    expect(() => parseV3Frontmatter(externalArticle({ participationLabel: null }))).toThrow(
      /participationLabel/
    );
  });

  it.each([
    ["editorialFormat", () => nativeArticle()],
    ["externalType", () => externalArticle()],
    ["sourceAuthorProfileUrl", () => externalArticle()],
    ["participationLabel", () => externalArticle()]
  ] as const)("rejects omitted required article field %s at its issue path", (field, makeArticle) => {
    const candidate: Record<string, unknown> = makeArticle();
    delete candidate[field];

    const result = v3FrontmatterSchema.safeParse(candidate);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === field)).toBe(true);
    }
  });

  it("rejects a non-HTTPS sourceAuthorProfileUrl at its issue path", () => {
    const result = v3FrontmatterSchema.safeParse(
      externalArticle({ sourceAuthorProfileUrl: "http://example.com/authors/platform-engineer" })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path[0] === "sourceAuthorProfileUrl")
      ).toBe(true);
    }
  });

  it.each([
    ["externalType", "authored-article"],
    ["sourceName", "Habr"],
    ["sourceUrl", "https://example.com/articles/prefix-cache"],
    ["sourceAuthorProfileUrl", "https://example.com/authors/platform-engineer"],
    ["participationLabel", "Авторская статья"]
  ])("rejects native article external field %s", (field, value) => {
    expect(() => parseV3Frontmatter(nativeArticle({ [field]: value }))).toThrow(/native/i);
  });

  it("requires every external publication field except sourceAuthorProfileUrl", () => {
    expect(() => parseV3Frontmatter(externalArticle())).not.toThrow();
    expect(() =>
      parseV3Frontmatter(
        externalArticle({ sourceAuthorProfileUrl: "https://example.com/authors/platform-engineer" })
      )
    ).not.toThrow();

    for (const field of ["publishedAt", "sourceName", "sourceUrl"] as const) {
      expect(() => parseV3Frontmatter(externalArticle({ [field]: null }))).toThrow(
        new RegExp(field)
      );
    }
  });

  it.each(["authored-article", "expert-comment", "interview", "media-mention"])(
    "accepts externalType %s",
    (externalType) => {
      expect(() => parseV3Frontmatter(externalArticle({ externalType }))).not.toThrow();
    }
  );
});

describe("v3 lifecycle and relation invariants", () => {
  it.each([undefined, "", "   "])(
    "rejects a platform area with an invalid mapBoundary %s",
    (mapBoundary) => {
      const candidate: Record<string, unknown> = { ...platformArea };
      if (mapBoundary === undefined) {
        delete candidate.mapBoundary;
      } else {
        candidate.mapBoundary = mapBoundary;
      }

      const result = v3FrontmatterSchema.safeParse(candidate);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((issue) => issue.path[0] === "mapBoundary")).toBe(true);
      }
    }
  );

  it.each([
    ["article", article],
    ["talk", talk],
    ["project", project]
  ])("accepts a reviewed editorial %s without reference-only evidence fields", (_type, record) => {
    const result = v3FrontmatterSchema.safeParse({
      ...record,
      reviewStatus: "reviewed",
      reviewedAt: today,
      reviewCycleDays: 90
    });

    expect(result.success).toBe(true);
  });

  it("rejects an external note without sourceUrl", () => {
    const result = v3FrontmatterSchema.safeParse({
      ...externalArticle({ sourceUrl: null })
    });
    expect(result.success).toBe(false);
  });

  it("rejects an external note without sourceName", () => {
    const result = v3FrontmatterSchema.safeParse({
      ...externalArticle({ sourceName: null })
    });
    expect(result.success).toBe(false);
  });

  it("accepts an external note with sourceName and an HTTPS sourceUrl", () => {
    const result = v3FrontmatterSchema.safeParse(externalArticle());
    expect(result.success).toBe(true);
  });

  it("rejects an unsupported talk format", () => {
    expect(v3FrontmatterSchema.safeParse({ ...talk, format: "conference-talk" }).success).toBe(
      false
    );
  });

  it.each([
    ["sources", []],
    ["applicability", null],
    ["limitations", null],
    ["reviewedAt", null],
    ["reviewCycleDays", null]
  ])("rejects a reviewed reference with invalid %s and reports its path", (field, value) => {
    const result = v3FrontmatterSchema.safeParse({ ...platformComponent, [field]: value });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === field)).toBe(true);
    }
  });

  it.each([
    ["platform-area", platformArea],
    ["platform-component", platformComponent],
    ["case", caseRecord]
  ])("rejects a reviewed %s without reference evidence", (_type, record) => {
    const result = v3FrontmatterSchema.safeParse({
      ...record,
      reviewStatus: "reviewed",
      reviewedAt: today,
      reviewCycleDays: 90,
      sources: [],
      applicability: null,
      limitations: null
    });

    expect(result.success).toBe(false);
  });

  it.each(["published", "archived"])("rejects %s content without publishedAt", (publicationStatus) => {
    expect(
      v3FrontmatterSchema.safeParse({ ...article, publicationStatus, publishedAt: null }).success
    ).toBe(false);
  });

  it("rejects more than four relation IDs across all buckets", () => {
    const result = v3FrontmatterSchema.safeParse({
      ...article,
      relations: {
        articleIds: ["article-one", "article-two"],
        talkIds: ["talk-one"],
        projectIds: ["project-one"],
        platformEntityIds: ["component-one"]
      }
    });
    expect(result.success).toBe(false);
  });

  it("rejects a synthetic case missing caseKind", () => {
    const withoutCaseKind: Record<string, unknown> = { ...caseRecord };
    delete withoutCaseKind.caseKind;
    expect(v3FrontmatterSchema.safeParse(withoutCaseKind).success).toBe(false);
  });
});

describe("v3 navigated path and URL safety", () => {
  it.each(["a/b", ".", "..", "%2f", "Prefix_Cache"])("rejects hostile local slug %s", (slug) => {
    expect(v3FrontmatterSchema.safeParse({ ...article, slug }).success).toBe(false);
  });

  it.each(["javascript:alert(1)", "http://example.com", "/relative/path", "https:/example.com"])(
    "rejects navigated external URL %s",
    (sourceUrl) => {
      expect(
        v3FrontmatterSchema.safeParse({
          ...externalArticle({ sourceUrl })
        }).success
      ).toBe(false);
    }
  );

  it("accepts an absolute HTTPS navigated URL", () => {
    expect(
      v3FrontmatterSchema.safeParse(externalArticle()).success
    ).toBe(true);
  });

  it("rejects a traversal talk thumbnail path", () => {
    expect(
      v3FrontmatterSchema.safeParse({
        ...talk,
        thumbnail: { ...talk.thumbnail, path: "/media/../secret.jpg" }
      }).success
    ).toBe(false);
  });

  it("accepts a nullable talk thumbnail", () => {
    expect(v3FrontmatterSchema.safeParse({ ...talk, thumbnail: null }).success).toBe(true);
  });

  it.each([
    ["path", { ...talk.thumbnail, path: "/images/talk.webp" }],
    ["extension", { ...talk.thumbnail, path: "/media/talk.svg" }],
    ["sourceUrl", { ...talk.thumbnail, sourceUrl: "http://example.com/image" }],
    ["capturedAt", { ...talk.thumbnail, capturedAt: "2026-02-31" }],
    ["alt", { ...talk.thumbnail, alt: "" }]
  ])("rejects an invalid thumbnail %s", (_field, thumbnail) => {
    expect(v3FrontmatterSchema.safeParse({ ...talk, thumbnail }).success).toBe(false);
  });
});
