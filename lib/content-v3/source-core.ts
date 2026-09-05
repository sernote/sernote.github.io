import type { ReactNode } from "react";
import type { MDXContent } from "mdx/types";

import { createRegistry, type Locale, type V3Type } from "./registry";
import type { V3Frontmatter, V3PlatformArea } from "./schema";

export type ContentToc = readonly Readonly<{ title: ReactNode; url: string; depth: number }>[];

type GeneratedV3Entry = {
  body: MDXContent;
  info?: {
    path?: string;
    fullPath?: string;
  };
  toc?: ContentToc;
  structuredData?: unknown;
  _exports?: unknown;
  extractedReferences?: unknown;
  getText?: unknown;
  getMDAST?: unknown;
};

export type V3SourceItem<T extends V3Frontmatter = V3Frontmatter> = T & {
  body: MDXContent;
  sourcePath: string;
  toc: ContentToc;
};

export type V3RouteParam = {
  slug: string;
};

export type V3Source = {
  listPublic(type?: V3Type, locale?: Locale): V3SourceItem[];
  listLocalCanonical(type?: V3Type, locale?: Locale): V3SourceItem[];
  listFeatured(type?: V3Type, locale?: Locale): V3SourceItem[];
  getBySlug(type: V3Type, slug: string, locale: Locale): V3SourceItem | null;
  getPlannedAreas(locale: Locale): V3SourceItem<V3PlatformArea>[];
  generateParams(type: V3Type, locale: Locale): V3RouteParam[];
  getRelatedForPage(record: V3SourceItem, limit?: number): V3SourceItem[];
};

type NormalizedEntry = {
  metadata: Record<string, unknown>;
  body: MDXContent;
  sourcePath: string;
  toc: ContentToc;
};

const GENERATED_RUNTIME_KEYS = [
  "body",
  "info",
  "toc",
  "structuredData",
  "_exports",
  "extractedReferences",
  "getText",
  "getMDAST"
] as const;

function safeSourcePath(info: GeneratedV3Entry["info"]): string {
  const path = info?.path;
  if (typeof path !== "string" || path.length === 0 || path.startsWith("/") || path.includes("\\")) {
    throw new Error("A generated v3 entry requires a safe relative info.path");
  }

  const segments = path.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Unsafe generated v3 source path: ${path}`);
  }
  return path;
}

function normalizeEntry<T extends GeneratedV3Entry>(entry: T): NormalizedEntry {
  const metadata: Record<string, unknown> = { ...entry };
  for (const key of GENERATED_RUNTIME_KEYS) {
    delete metadata[key];
  }

  return { metadata, body: entry.body, sourcePath: safeSourcePath(entry.info), toc: Object.freeze([...(entry.toc ?? [])]) };
}

function sourceIdentity(record: Pick<V3Frontmatter, "type" | "locale" | "entityId">): string {
  return `${record.type}:${record.locale}:${record.entityId}`;
}

export function createV3Source<T extends GeneratedV3Entry>(entries: readonly T[]): V3Source {
  const normalized = entries.map(normalizeEntry);
  const registry = createRegistry(normalized.map((entry) => entry.metadata));
  const sourceEntries = new Map<string, NormalizedEntry>();

  for (const entry of normalized) {
    const metadata = entry.metadata as Pick<V3Frontmatter, "type" | "locale" | "entityId">;
    sourceEntries.set(sourceIdentity(metadata), entry);
  }

  function toSourceItem<T extends V3Frontmatter>(record: T): V3SourceItem<T> {
    const entry = sourceEntries.get(sourceIdentity(record));
    if (entry === undefined) {
      throw new Error(`Missing generated source entry for ${sourceIdentity(record)}`);
    }
    return Object.freeze(
      Object.assign({}, record, { body: entry.body, sourcePath: entry.sourcePath, toc: entry.toc })
    );
  }

  return {
    listPublic: (type, locale) => registry.listPublic(type, locale).map(toSourceItem),
    listLocalCanonical: (type, locale) =>
      registry.listLocalCanonical(type, locale).map(toSourceItem),
    listFeatured: (type, locale) => registry.listFeatured(type, locale).map(toSourceItem),
    getBySlug: (type, slug, locale) =>
      registry
        .listLocalCanonical(type, locale)
        .filter((record) => record.slug === slug)
        .map(toSourceItem)[0] ?? null,
    getPlannedAreas: (locale) =>
      registry
        .all()
        .filter(
          (record): record is V3PlatformArea =>
            record.type === "platform-area" &&
            record.locale === locale &&
            record.publicationStatus === "draft"
        )
        .sort((left, right) => left.order - right.order || left.entityId.localeCompare(right.entityId))
        .map(toSourceItem),
    generateParams: (type, locale) =>
      registry.listLocalCanonical(type, locale).map((record) => ({ slug: record.slug! })),
    getRelatedForPage: (record, limit) =>
      registry.getRelatedForPage(record, limit).map(toSourceItem)
  };
}
