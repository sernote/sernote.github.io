import type {
  V3Article,
  V3Case,
  V3PlatformArea,
  V3PlatformComponent,
  V3Project,
  V3Talk
} from "@/lib/content-v3/schema";
import { AUTHOR_PROFILE } from "@/lib/author-profile";
import { getCanonicalUrl, type V3Type } from "@/lib/content-v3/registry";
import { canonicalUrl, publicFileUrl } from "@/lib/seo/urls";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];
type JsonObject = { readonly [key: string]: JsonValue };

declare const validatedStructuredData: unique symbol;

export type StructuredData = Readonly<
  JsonObject & {
    readonly "@context": "https://schema.org";
    readonly "@type":
      | "Person"
      | "ProfilePage"
      | "WebSite"
      | "BlogPosting"
      | "VideoObject"
      | "SoftwareSourceCode"
      | "TechArticle"
      | "BreadcrumbList";
    readonly [validatedStructuredData]: true;
  }
>;

type ReferenceRecord = V3PlatformArea | V3PlatformComponent | V3Case;
type Breadcrumb = Readonly<{ name: string; path: string }>;
type ReferenceBreadcrumbItem = Readonly<{
  entityId: string;
  contentType: V3Type;
  slug: string;
  title: string;
  href: string;
}>;

export type ReferenceBreadcrumbContext = Readonly<{
  entityId: string;
  contentType: ReferenceRecord["type"];
  title: string;
  href: string;
  primaryArea: ReferenceBreadcrumbItem | null;
  parentComponent: ReferenceBreadcrumbItem | null;
  parentComponentPrimaryAreaId: string | null;
}>;

function validated<T extends JsonObject>(value: T): StructuredData {
  return Object.freeze(value) as unknown as StructuredData;
}

function personReference(): JsonObject {
  return {
    "@type": "Person",
    "@id": AUTHOR_PROFILE.id,
    name: AUTHOR_PROFILE.name,
    url: AUTHOR_PROFILE.url
  };
}

function breadcrumbs(items: readonly Breadcrumb[]): StructuredData {
  return validated({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  });
}

function requirePublished(
  record: { entityId: string; publicationStatus: string; publishedAt: string | null },
  label: string
): asserts record is typeof record & { publicationStatus: "published"; publishedAt: string } {
  if (record.publicationStatus !== "published" || record.publishedAt === null) {
    throw new Error(`${label} structured data requires a published record: ${record.entityId}`);
  }
}

function youtubeVideoId(recordingUrl: string, entityId: string): string {
  let url: URL;

  try {
    url = new URL(recordingUrl);
  } catch {
    throw new Error(`Talk ${entityId} requires a supported YouTube URL`);
  }

  let videoId: string | null = null;
  if (
    (url.hostname === "youtube.com" || url.hostname === "www.youtube.com") &&
    url.pathname === "/watch"
  ) {
    videoId = url.searchParams.get("v");
  } else if (url.hostname === "youtu.be") {
    const segments = url.pathname.split("/").filter(Boolean);
    videoId = segments.length === 1 ? segments[0] : null;
  }

  if (videoId === null || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error(`Talk ${entityId} requires a supported YouTube URL`);
  }

  return videoId;
}

function assertReferenceBreadcrumbContext(
  record: ReferenceRecord,
  context: ReferenceBreadcrumbContext
): void {
  const detailMatches =
    context.entityId === record.entityId &&
    context.contentType === record.type &&
    context.title === record.title &&
    context.href === getCanonicalUrl(record);

  if (!detailMatches) {
    throw new Error(`Reference ${record.entityId} has mismatched breadcrumb context`);
  }

  if (record.type === "platform-area") {
    if (
      context.primaryArea !== null ||
      context.parentComponent !== null ||
      context.parentComponentPrimaryAreaId !== null
    ) {
      throw new Error(`Reference ${record.entityId} has mismatched breadcrumb context`);
    }
    return;
  }

  const primaryArea = context.primaryArea;
  if (
    primaryArea === null ||
    primaryArea.contentType !== "platform-area" ||
    primaryArea.href !== `/ai-platform/areas/${primaryArea.slug}` ||
    (context.parentComponent !== null && record.type === "platform-component")
  ) {
    throw new Error(`Reference ${record.entityId} has mismatched breadcrumb context`);
  }

  if (record.type === "platform-component") {
    if (
      primaryArea.entityId !== record.primaryAreaId ||
      context.parentComponentPrimaryAreaId !== null
    ) {
      throw new Error(`Reference ${record.entityId} has mismatched breadcrumb context`);
    }
    return;
  }

  const parentComponent = context.parentComponent;
  if (
    parentComponent === null ||
    parentComponent.contentType !== "platform-component" ||
    parentComponent.entityId !== record.componentIds[0] ||
    parentComponent.href !== `/ai-platform/components/${parentComponent.slug}` ||
    context.parentComponentPrimaryAreaId !== primaryArea.entityId
  ) {
    throw new Error(`Reference ${record.entityId} has mismatched breadcrumb context`);
  }
}

export function buildHomeStructuredData(): readonly StructuredData[] {
  const website = validated({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl("/")}#website`,
    name: "Сергей Нотевский",
    url: canonicalUrl("/"),
    inLanguage: "ru",
    author: { "@id": AUTHOR_PROFILE.id }
  });

  return Object.freeze([website]);
}

export function buildAboutStructuredData(): readonly StructuredData[] {
  const profilePage = validated({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${AUTHOR_PROFILE.url}#profile-page`,
    url: AUTHOR_PROFILE.url,
    mainEntity: {
      ...personReference(),
      jobTitle: AUTHOR_PROFILE.role,
      worksFor: {
        "@type": "Organization",
        name: AUTHOR_PROFILE.company
      },
      sameAs: AUTHOR_PROFILE.sameAs
    }
  });

  return Object.freeze([profilePage]);
}

export function buildArticleStructuredData(
  article: V3Article
): readonly StructuredData[] {
  requirePublished(article, "Article");
  if (article.kind !== "native" || article.slug === null) {
    throw new Error(`Article structured data requires a native article: ${article.entityId}`);
  }

  const posting = validated({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl(getCanonicalUrl(article))}#article`,
    headline: article.title,
    description: article.description,
    url: canonicalUrl(getCanonicalUrl(article)),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: article.locale,
    keywords: article.topics,
    author: personReference()
  });

  return Object.freeze([
    posting,
    breadcrumbs([
      { name: "Главная", path: "/" },
      { name: "Блог", path: "/blog" },
      { name: article.title, path: getCanonicalUrl(article) }
    ])
  ]);
}

export function buildTalkStructuredData(talk: V3Talk): readonly StructuredData[] {
  requirePublished(talk, "Talk");
  if (talk.recordingUrl === null || talk.thumbnail === null) {
    throw new Error(`Talk structured data requires verified recording evidence: ${talk.entityId}`);
  }
  const videoId = youtubeVideoId(talk.recordingUrl, talk.entityId);
  const trail = breadcrumbs([
    { name: "Главная", path: "/" },
    { name: "Материалы", path: "/materials" },
    { name: talk.title, path: getCanonicalUrl(talk) }
  ]);

  // Video rich results require the actual upload date. Event and editorial
  // dates are different evidence; keep the page usable until upload is verified.
  if (talk.recordingUploadedAt === null) {
    return Object.freeze([trail]);
  }

  const video = validated({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${canonicalUrl(getCanonicalUrl(talk))}#video`,
    name: talk.title,
    description: talk.abstract,
    url: canonicalUrl(getCanonicalUrl(talk)),
    sameAs: talk.recordingUrl,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    uploadDate: talk.recordingUploadedAt,
    thumbnailUrl: publicFileUrl(talk.thumbnail.path),
    inLanguage: talk.locale,
    author: personReference()
  });

  return Object.freeze([video, trail]);
}

export function buildProjectStructuredData(
  project: V3Project
): readonly StructuredData[] {
  requirePublished(project, "Project");
  const sourceCode = validated({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${canonicalUrl(getCanonicalUrl(project))}#project`,
    name: project.title,
    description: project.description,
    url: canonicalUrl(getCanonicalUrl(project)),
    codeRepository: project.repositoryUrl,
    ...(project.verifiedRelease === null
      ? {}
      : {
          version: project.verifiedRelease.version,
          datePublished: project.verifiedRelease.publishedAt
        }),
    author: personReference()
  });

  return Object.freeze([
    sourceCode,
    breadcrumbs([
      { name: "Главная", path: "/" },
      { name: "Материалы", path: "/materials" },
      { name: project.title, path: getCanonicalUrl(project) }
    ])
  ]);
}

export function buildReferenceStructuredData(
  record: ReferenceRecord,
  context: ReferenceBreadcrumbContext
): readonly StructuredData[] {
  requirePublished(record, "Reference");
  if (record.reviewStatus !== "reviewed" && record.reviewStatus !== "stale") {
    throw new Error(`Reference structured data requires reviewed evidence: ${record.entityId}`);
  }
  assertReferenceBreadcrumbContext(record, context);

  const article = validated({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl(getCanonicalUrl(record))}#reference`,
    headline: record.title,
    description: record.description,
    url: canonicalUrl(getCanonicalUrl(record)),
    datePublished: record.publishedAt,
    dateModified: record.updatedAt,
    inLanguage: record.locale,
    keywords: record.topics,
    author: personReference()
  });
  const detailPath = getCanonicalUrl(record);
  const referenceBreadcrumbs: Breadcrumb[] = [
    { name: "Главная", path: "/" },
    { name: "AI Platform", path: "/ai-platform" }
  ];

  if (record.type === "platform-area") {
    referenceBreadcrumbs.push({ name: "Карта", path: "/ai-platform/map" });
  } else {
    referenceBreadcrumbs.push({
      name: context.primaryArea!.title,
      path: context.primaryArea!.href
    });
    if (record.type === "case") {
      referenceBreadcrumbs.push({
        name: context.parentComponent!.title,
        path: context.parentComponent!.href
      });
    }
  }
  referenceBreadcrumbs.push({ name: record.title, path: detailPath });

  return Object.freeze([article, breadcrumbs(referenceBreadcrumbs)]);
}

export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);
  if (serialized === undefined) throw new Error("JSON-LD value must be serializable");
  return serialized.replace(/</g, "\\u003c");
}
