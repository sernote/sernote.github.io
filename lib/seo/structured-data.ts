import type {
  V3Article,
  V3Case,
  V3PlatformArea,
  V3PlatformComponent,
  V3Project,
  V3Talk
} from "@/lib/content-v3/schema";
import { getCanonicalUrl } from "@/lib/content-v3/registry";
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

const AUTHOR_NAME = "Сергей Нотевский";

function validated<T extends JsonObject>(value: T): StructuredData {
  return Object.freeze(value) as unknown as StructuredData;
}

function personReference(): JsonObject {
  return {
    "@type": "Person",
    "@id": `${canonicalUrl("/")}#person`,
    name: AUTHOR_NAME,
    url: canonicalUrl("/")
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

export function buildHomeStructuredData(): readonly StructuredData[] {
  const person = validated({
    "@context": "https://schema.org",
    ...personReference(),
    jobTitle: "AI Platform Lead"
  });
  const website = validated({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl("/")}#website`,
    name: "Сергей Нотевский",
    url: canonicalUrl("/"),
    inLanguage: "ru",
    author: personReference()
  });

  return Object.freeze([person, website]);
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
  if (
    talk.recordingUrl === null ||
    talk.recordingUploadedAt === null ||
    talk.thumbnail === null
  ) {
    throw new Error(`Talk structured data requires verified recording evidence: ${talk.entityId}`);
  }

  const video = validated({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${canonicalUrl(getCanonicalUrl(talk))}#video`,
    name: talk.title,
    description: talk.abstract,
    url: canonicalUrl(getCanonicalUrl(talk)),
    contentUrl: talk.recordingUrl,
    uploadDate: talk.recordingUploadedAt,
    thumbnailUrl: publicFileUrl(talk.thumbnail.path),
    inLanguage: talk.locale,
    author: personReference()
  });

  return Object.freeze([
    video,
    breadcrumbs([
      { name: "Главная", path: "/" },
      { name: "Выступления", path: "/talks" },
      { name: talk.title, path: getCanonicalUrl(talk) }
    ])
  ]);
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
    datePublished: project.publishedAt,
    dateModified: project.updatedAt,
    ...(project.verifiedRelease === null
      ? {}
      : { version: project.verifiedRelease.version }),
    author: personReference()
  });

  return Object.freeze([
    sourceCode,
    breadcrumbs([
      { name: "Главная", path: "/" },
      { name: "Проекты", path: "/projects" },
      { name: project.title, path: getCanonicalUrl(project) }
    ])
  ]);
}

export function buildReferenceStructuredData(
  record: ReferenceRecord
): readonly StructuredData[] {
  requirePublished(record, "Reference");
  if (record.reviewStatus !== "reviewed" && record.reviewStatus !== "stale") {
    throw new Error(`Reference structured data requires reviewed evidence: ${record.entityId}`);
  }

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
  }
  referenceBreadcrumbs.push({ name: record.title, path: detailPath });

  return Object.freeze([article, breadcrumbs(referenceBreadcrumbs)]);
}

export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);
  if (serialized === undefined) throw new Error("JSON-LD value must be serializable");
  return serialized.replace(/</g, "\\u003c");
}
