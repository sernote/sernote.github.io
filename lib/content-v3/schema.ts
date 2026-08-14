import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const kebabCaseId = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a safe kebab-case identifier");

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return false;

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

const calendarDate = z.string().refine(isCalendarDate, "Expected a valid YYYY-MM-DD date");

const httpsUrl = z.string().refine((value) => {
  if (!value.startsWith("https://")) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0;
  } catch {
    return false;
  }
}, "Expected an absolute HTTPS URL");

const sourceSchema = z
  .object({
    title: nonEmptyText,
    url: httpsUrl,
    verifiedAt: calendarDate
  })
  .strict();

const relationsSchema = z
  .object({
    articleIds: z.array(kebabCaseId).optional(),
    talkIds: z.array(kebabCaseId).optional(),
    projectIds: z.array(kebabCaseId).optional(),
    platformEntityIds: z.array(kebabCaseId).optional()
  })
  .strict()
  .superRefine((relations, context) => {
    const relationCount = Object.values(relations).reduce(
      (total, ids) => total + (ids?.length ?? 0),
      0
    );

    if (relationCount > 4) {
      context.addIssue({
        code: "custom",
        message: "A record can reference at most four related entities"
      });
    }
  });

const sharedBaseShape = {
  entityId: kebabCaseId,
  locale: z.enum(["ru", "en"]),
  title: z.string().trim().min(3),
  description: z.string().trim().min(20),
  publicationStatus: z.enum(["draft", "published", "archived"]),
  reviewStatus: z.enum(["unreviewed", "reviewed", "stale"]),
  publishedAt: calendarDate.nullable(),
  updatedAt: calendarDate,
  reviewedAt: calendarDate.nullable(),
  reviewCycleDays: z.number().int().positive().nullable(),
  topics: z.array(nonEmptyText).max(8),
  relations: relationsSchema
};

const referenceEvidenceShape = {
  sources: z.array(sourceSchema).default([]),
  applicability: nonEmptyText.nullable().default(null),
  limitations: nonEmptyText.nullable().default(null)
};

const articleSchema = z
  .object({
    ...sharedBaseShape,
    type: z.literal("article"),
    kind: z.enum(["native", "external-note"]),
    slug: kebabCaseId.nullable(),
    editorialFormat: z.enum(["article", "note"]).nullable(),
    excerpt: nonEmptyText,
    externalType: z
      .enum(["authored-article", "expert-comment", "interview", "media-mention"])
      .nullable(),
    sourceName: nonEmptyText.nullable(),
    sourceUrl: httpsUrl.nullable(),
    sourceAuthorProfileUrl: httpsUrl.nullable(),
    participationLabel: nonEmptyText.nullable(),
    supersedes: kebabCaseId.nullable(),
    supersededBy: kebabCaseId.nullable()
  })
  .strict();

const thumbnailPath = z.string().refine((path) => {
  if (!path.startsWith("/media/") || path.includes("%") || path.includes("\\")) return false;

  const segments = path.slice(1).split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return false;

  return /^[A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpg|jpeg|png|webp)$/.test(segments.at(-1) ?? "");
}, "Expected a safe /media/... image path");

const thumbnailSchema = z
  .object({
    path: thumbnailPath,
    sourceUrl: httpsUrl,
    capturedAt: calendarDate,
    alt: nonEmptyText
  })
  .strict();

const takeawaySchema = z
  .object({
    label: nonEmptyText,
    text: nonEmptyText,
    timestampSeconds: z.number().int().nonnegative().nullable()
  })
  .strict();

const talkSchema = z
  .object({
    ...sharedBaseShape,
    type: z.literal("talk"),
    slug: kebabCaseId,
    venue: nonEmptyText,
    eventDate: calendarDate,
    format: z.enum(["talk", "webinar", "podcast", "interview", "stream"]),
    recordingUrl: httpsUrl.nullable(),
    recordingUploadedAt: calendarDate.nullable(),
    abstract: nonEmptyText,
    takeaways: z.array(takeawaySchema).min(3).max(7),
    slidesUrl: httpsUrl.nullable(),
    thumbnail: thumbnailSchema.nullable()
  })
  .strict();

const verifiedReleaseSchema = z
  .object({
    version: nonEmptyText,
    publishedAt: calendarDate,
    url: httpsUrl,
    verifiedAt: calendarDate
  })
  .strict();

const projectSchema = z
  .object({
    ...sharedBaseShape,
    type: z.literal("project"),
    slug: kebabCaseId,
    repositoryUrl: httpsUrl,
    verifiedRelease: verifiedReleaseSchema.nullable(),
    audience: z.array(nonEmptyText).min(1),
    quickStart: nonEmptyText,
    privacyBoundary: nonEmptyText,
    evidence: z.array(nonEmptyText).min(1),
    supportBoundary: nonEmptyText
  })
  .strict();

const platformAreaSchema = z
  .object({
    ...sharedBaseShape,
    ...referenceEvidenceShape,
    type: z.literal("platform-area"),
    slug: kebabCaseId,
    order: z.number().int(),
    mapBoundary: nonEmptyText,
    included: z.array(nonEmptyText),
    excluded: z.array(nonEmptyText),
    signals: z.array(nonEmptyText)
  })
  .strict();

const platformComponentSchema = z
  .object({
    ...sharedBaseShape,
    ...referenceEvidenceShape,
    type: z.literal("platform-component"),
    slug: kebabCaseId,
    primaryAreaId: kebabCaseId,
    relatedAreaIds: z.array(kebabCaseId),
    decisionQuestions: z.array(nonEmptyText),
    metrics: z.array(nonEmptyText),
    failureModes: z.array(nonEmptyText)
  })
  .strict();

const caseSchema = z
  .object({
    ...sharedBaseShape,
    ...referenceEvidenceShape,
    type: z.literal("case"),
    slug: kebabCaseId,
    caseKind: z.enum(["synthetic", "composite", "public"]),
    componentIds: z.array(kebabCaseId),
    evidence: z.array(nonEmptyText).min(1)
  })
  .strict();

export const v3FrontmatterSchema = z
  .discriminatedUnion("type", [
    articleSchema,
    talkSchema,
    projectSchema,
    platformAreaSchema,
    platformComponentSchema,
    caseSchema
  ])
  .superRefine((record, context) => {
    if (record.publicationStatus !== "draft" && record.publishedAt === null) {
      context.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "Published and archived records require publishedAt"
      });
    }

    if (record.reviewStatus !== "unreviewed") {
      if (record.reviewedAt === null) {
        context.addIssue({ code: "custom", path: ["reviewedAt"], message: "Review date is required" });
      }
      if (record.reviewCycleDays === null) {
        context.addIssue({
          code: "custom",
          path: ["reviewCycleDays"],
          message: "Review cycle is required"
        });
      }
      if (
        record.type === "platform-area" ||
        record.type === "platform-component" ||
        record.type === "case"
      ) {
        if (record.sources.length === 0) {
          context.addIssue({
            code: "custom",
            path: ["sources"],
            message: "Review sources are required"
          });
        }
        if (record.applicability === null) {
          context.addIssue({
            code: "custom",
            path: ["applicability"],
            message: "Applicability is required"
          });
        }
        if (record.limitations === null) {
          context.addIssue({
            code: "custom",
            path: ["limitations"],
            message: "Limitations are required"
          });
        }
      }
    }

    if (record.type === "article") {
      if (record.kind === "external-note") {
        if (record.editorialFormat !== null) {
          context.addIssue({
            code: "custom",
            path: ["editorialFormat"],
            message: "External notes must not define editorialFormat"
          });
        }
        if (record.publishedAt === null) {
          context.addIssue({
            code: "custom",
            path: ["publishedAt"],
            message: "External notes require publishedAt"
          });
        }
        if (record.slug !== null) {
          context.addIssue({
            code: "custom",
            path: ["slug"],
            message: "External notes must not have a local slug"
          });
        }
        if (record.sourceUrl === null) {
          context.addIssue({
            code: "custom",
            path: ["sourceUrl"],
            message: "External notes require sourceUrl"
          });
        }
        if (record.sourceName === null) {
          context.addIssue({
            code: "custom",
            path: ["sourceName"],
            message: "External notes require sourceName"
          });
        }
        if (record.externalType === null) {
          context.addIssue({
            code: "custom",
            path: ["externalType"],
            message: "External notes require externalType"
          });
        }
        if (record.participationLabel === null) {
          context.addIssue({
            code: "custom",
            path: ["participationLabel"],
            message: "External notes require participationLabel"
          });
        }
      } else {
        if (record.slug === null) {
          context.addIssue({
            code: "custom",
            path: ["slug"],
            message: "Native articles require a slug"
          });
        }
        if (record.editorialFormat === null) {
          context.addIssue({
            code: "custom",
            path: ["editorialFormat"],
            message: "Native articles require editorialFormat"
          });
        }

        for (const [field, value] of [
          ["externalType", record.externalType],
          ["sourceName", record.sourceName],
          ["sourceUrl", record.sourceUrl],
          ["sourceAuthorProfileUrl", record.sourceAuthorProfileUrl],
          ["participationLabel", record.participationLabel]
        ] as const) {
          if (value !== null) {
            context.addIssue({
              code: "custom",
              path: [field],
              message: `Native articles must not define ${field}`
            });
          }
        }
      }
    }

    if (
      record.type === "talk" &&
      record.recordingUploadedAt !== null &&
      record.recordingUrl === null
    ) {
      context.addIssue({
        code: "custom",
        path: ["recordingUrl"],
        message: "A recording upload date requires a recording URL"
      });
    }
  });

export function parseV3Frontmatter(input: unknown): V3Frontmatter {
  return v3FrontmatterSchema.parse(input);
}

export type V3Frontmatter = z.infer<typeof v3FrontmatterSchema>;
export type V3Article = z.infer<typeof articleSchema>;
export type V3Talk = z.infer<typeof talkSchema>;
export type V3Project = z.infer<typeof projectSchema>;
export type V3PlatformArea = z.infer<typeof platformAreaSchema>;
export type V3PlatformComponent = z.infer<typeof platformComponentSchema>;
export type V3Case = z.infer<typeof caseSchema>;
