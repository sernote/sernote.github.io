import type { RouteRecord } from "@/lib/migration/manifest";

const DEFAULT_SITE_ORIGIN = "https://notevskii.tech";

export type SitemapEntry = Readonly<{
  url: string;
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

export function buildSitemapEntries(manifest: readonly RouteRecord[]): SitemapEntry[] {
  return manifest
    .filter((record) => record.behavior === "keep")
    .map((record) => ({ url: canonicalUrl(record.source) }));
}
