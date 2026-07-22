import { getCanonicalUrl } from "@/lib/content-v3/registry";
import type { V3Frontmatter } from "@/lib/content-v3/schema";

const DEFAULT_SITE_ORIGIN = "https://notevskii.tech";

export const DISCOVERY_TOP_LEVEL_PATHS = Object.freeze([
  "/",
  "/blog",
  "/work",
  "/talks",
  "/projects",
  "/ai-platform",
  "/ai-platform/map",
  "/about",
  "/contact"
] as const);

export type SitemapEntry = Readonly<{
  url: string;
  lastModified?: string;
}>;

export function getPublicOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN;
  let url: URL;

  try {
    url = new URL(configured);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin");
  }

  if ((url.protocol !== "https:" && url.protocol !== "http:") || url.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin");
  }

  return url.origin;
}

function localPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`Expected a local absolute path, received ${JSON.stringify(path)}`);
  }

  return path.split(/[?#]/, 1)[0] || "/";
}

export function canonicalUrl(path: string): string {
  const pathname = localPath(path);
  const normalized = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  return `${getPublicOrigin()}${normalized}`;
}

export function publicFileUrl(path: string): string {
  const pathname = localPath(path);
  return `${getPublicOrigin()}${pathname}`;
}

function isDiscoverableLocalRecord(record: V3Frontmatter): boolean {
  if (record.publicationStatus !== "published") return false;
  if (record.type === "article" && record.kind === "external-note") return false;

  if (
    record.type === "platform-area" ||
    record.type === "platform-component" ||
    record.type === "case"
  ) {
    return record.reviewStatus === "reviewed" || record.reviewStatus === "stale";
  }

  return true;
}

export function buildSitemapEntries(records: readonly V3Frontmatter[]): SitemapEntry[] {
  const staticEntries = DISCOVERY_TOP_LEVEL_PATHS.map((path) => ({
    url: canonicalUrl(path)
  }));
  const contentEntries = records
    .filter(isDiscoverableLocalRecord)
    .map((record) => ({
      url: canonicalUrl(getCanonicalUrl(record)),
      lastModified: record.updatedAt
    }))
    .sort((left, right) => left.url.localeCompare(right.url));

  return [...staticEntries, ...contentEntries];
}
