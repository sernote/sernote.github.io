/**
 * Explicit, reversible route-migration manifest.
 *
 * Every exported non-auxiliary HTML route receives exactly one record. A record
 * is either a canonical `keep` (destination `null`) or a `static-alias` that
 * points at a distinct `keep` destination in the same manifest. The other
 * behaviors are reserved by the normative enum but unused by the pilot.
 */

export const ROUTE_BEHAVIORS = ["keep", "static-alias", "archive"] as const;

export type RouteBehavior = (typeof ROUTE_BEHAVIORS)[number];

export type Locale = "en" | "ru";

interface RouteBase {
  readonly source: string;
  readonly locale: Locale;
}

export interface RouteKeep extends RouteBase {
  readonly destination: null;
  readonly behavior: "keep";
}

export interface RouteAlias extends RouteBase {
  readonly destination: string;
  readonly behavior: "static-alias";
}

export interface RouteArchive extends RouteBase {
  readonly destination: null;
  readonly behavior: "archive";
  readonly archivedAt: string;
  readonly archiveTarget: string;
}

export type RouteRecord = RouteKeep | RouteAlias | RouteArchive;

/**
 * The four legacy routes that Next renders as honest alias bodies (in the
 * marketing/handbook shells) so the dev server and the pre-materialization
 * export show an honest page. The final exported form of every alias — these
 * four included — is the self-contained page written by
 * `scripts/apply-static-aliases.mjs`, which materializes all `static-alias`
 * sources uniformly.
 */
export const SELECTED_STATIC_ALIASES = [
  { source: "/writing", destination: "/blog" },
  { source: "/handbook", destination: "/ai-platform" },
  { source: "/handbook/platform-map", destination: "/ai-platform/map" },
  { source: "/handbook/caching/prefix-cache", destination: "/ai-platform/components/prefix-cache" }
] as const;

const SELECTED_ALIAS_MAP: ReadonlyMap<string, string> = new Map(
  SELECTED_STATIC_ALIASES.map((alias) => [alias.source, alias.destination])
);

/**
 * Destination for one of the four legacy routes that Next renders as an alias,
 * or `null` for any other path. Used by the `/writing` page and the handbook
 * catchall to decide whether to render an alias body.
 */
export function getSelectedAliasDestination(source: string): string | null {
  return SELECTED_ALIAS_MAP.get(normalizeRoutePath(source)) ?? null;
}

export function normalizeRoutePath(path: string): string {
  if (typeof path !== "string" || path.length === 0) {
    throw new Error(`route path must be a non-empty string, received ${JSON.stringify(path)}`);
  }
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash === "/" ? "/" : withLeadingSlash.replace(/\/+$/, "");
}

const BEHAVIOR_SET: ReadonlySet<string> = new Set(ROUTE_BEHAVIORS);
const LOCALE_SET: ReadonlySet<string> = new Set<Locale>(["en", "ru"]);

export function parseManifest(value: unknown): RouteRecord[] {
  if (!Array.isArray(value)) {
    throw new Error("route manifest must be an array of records");
  }

  return value.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error(`route record ${index} must be an object`);
    }
    const record = entry as Record<string, unknown>;

    if (typeof record.source !== "string") {
      throw new Error(`route record ${index} is missing a string source`);
    }
    if (typeof record.behavior !== "string" || !BEHAVIOR_SET.has(record.behavior)) {
      throw new Error(
        `route record ${JSON.stringify(record.source)} has an unknown behavior ${JSON.stringify(record.behavior)}`
      );
    }
    if (typeof record.locale !== "string" || !LOCALE_SET.has(record.locale)) {
      throw new Error(
        `route record ${JSON.stringify(record.source)} has an unknown locale ${JSON.stringify(record.locale)}`
      );
    }
    if (record.destination !== null && typeof record.destination !== "string") {
      throw new Error(
        `route record ${JSON.stringify(record.source)} destination must be a string or null`
      );
    }

    const source = normalizeRoutePath(record.source);
    const locale = record.locale as Locale;
    if (record.behavior === "archive") {
      if (record.destination !== null) {
        throw new Error(`archive route ${JSON.stringify(source)} destination must be null`);
      }
      if (typeof record.archivedAt !== "string" || typeof record.archiveTarget !== "string") {
        throw new Error(`archive route ${JSON.stringify(source)} requires archivedAt and archiveTarget`);
      }
      return Object.freeze({
        source,
        destination: null,
        behavior: "archive" as const,
        locale,
        archivedAt: record.archivedAt,
        archiveTarget: normalizeRoutePath(record.archiveTarget)
      });
    }
    if ("archivedAt" in record || "archiveTarget" in record) {
      throw new Error(`non-archive route ${JSON.stringify(source)} must not declare archive fields`);
    }
    if (record.behavior === "keep") {
      return Object.freeze({ source, destination: record.destination, behavior: "keep" as const, locale }) as RouteKeep;
    }
    return Object.freeze({
      source,
      destination: record.destination as string,
      behavior: "static-alias" as const,
      locale
    });
  });
}

export function validateManifest(
  records: readonly RouteRecord[],
  exportedRoutePaths?: readonly string[]
): RouteRecord[] {
  const normalized = records.map((record): RouteRecord => {
    const source = normalizeRoutePath(record.source);
    if (record.behavior === "archive") {
      return Object.freeze({
        source,
        destination: record.destination,
        behavior: "archive",
        locale: record.locale,
        archivedAt: record.archivedAt,
        archiveTarget: normalizeRoutePath(record.archiveTarget)
      }) as RouteArchive;
    }
    if (record.behavior === "keep") {
      return Object.freeze({
        source,
        destination: record.destination,
        behavior: "keep",
        locale: record.locale,
        ...(Object.prototype.hasOwnProperty.call(record, "archivedAt")
          ? { archivedAt: (record as unknown as { archivedAt: unknown }).archivedAt }
          : {}),
        ...(Object.prototype.hasOwnProperty.call(record, "archiveTarget")
          ? { archiveTarget: (record as unknown as { archiveTarget: unknown }).archiveTarget }
          : {})
      }) as RouteKeep;
    }
    const aliasDestination = (record as unknown as { destination: unknown }).destination;
    return Object.freeze({
      source,
      destination:
        typeof aliasDestination === "string"
          ? normalizeRoutePath(aliasDestination)
          : aliasDestination,
      behavior: "static-alias",
      locale: record.locale,
      ...(Object.prototype.hasOwnProperty.call(record, "archivedAt")
        ? { archivedAt: (record as unknown as { archivedAt: unknown }).archivedAt }
        : {}),
      ...(Object.prototype.hasOwnProperty.call(record, "archiveTarget")
        ? { archiveTarget: (record as unknown as { archiveTarget: unknown }).archiveTarget }
        : {})
    }) as RouteAlias;
  });

  const seen = new Set<string>();
  const keepSources = new Set<string>();
  for (const record of normalized) {
    if (seen.has(record.source)) {
      throw new Error(`duplicate route source ${JSON.stringify(record.source)}`);
    }
    seen.add(record.source);
    if (record.behavior === "keep") {
      keepSources.add(record.source);
    }
  }

  for (const record of normalized) {
    const raw = record as unknown as {
      source: string;
      destination: string | null;
      behavior: RouteBehavior;
      archivedAt?: unknown;
      archiveTarget?: unknown;
    };
    if (raw.behavior !== "archive" && ("archivedAt" in raw || "archiveTarget" in raw)) {
      throw new Error(`non-archive route ${JSON.stringify(raw.source)} must not declare archive fields`);
    }

    if (raw.behavior === "keep") {
      if (raw.destination !== null) {
        throw new Error(
          `keep route ${JSON.stringify(raw.source)} must not declare a destination`
        );
      }
      continue;
    }

    if (raw.behavior === "archive") {
      if (raw.destination !== null) {
        throw new Error(`archive route ${JSON.stringify(raw.source)} destination must be null`);
      }
      if (raw.archivedAt !== "2026-08-02") {
        throw new Error(`archive route ${JSON.stringify(raw.source)} archivedAt must be 2026-08-02`);
      }
      if (typeof raw.archiveTarget !== "string") {
        throw new Error(`archive route ${JSON.stringify(raw.source)} requires archiveTarget`);
      }
      if (raw.archiveTarget === raw.source) {
        throw new Error(`archiveTarget for ${JSON.stringify(raw.source)} must be distinct`);
      }
      if (!keepSources.has(raw.archiveTarget)) {
        throw new Error(
          `archiveTarget ${JSON.stringify(raw.archiveTarget)} for ${JSON.stringify(raw.source)} must be a direct keep record`
        );
      }
      continue;
    }

    if (raw.source === "/") {
      throw new Error(`the root "/" may not be an alias source`);
    }
    if (raw.destination === null) {
      throw new Error(
        `static-alias route ${JSON.stringify(raw.source)} requires a destination`
      );
    }
    if (raw.destination === raw.source) {
      throw new Error(`alias ${JSON.stringify(raw.source)} must not point at itself`);
    }
    if (!keepSources.has(raw.destination)) {
      throw new Error(
        `alias destination ${JSON.stringify(raw.destination)} for ${JSON.stringify(raw.source)} must be a distinct keep record (no chains)`
      );
    }
  }

  if (exportedRoutePaths !== undefined) {
    const exported = new Set(exportedRoutePaths.map((path) => normalizeRoutePath(path)));
    const missing = [...exported].filter((path) => !seen.has(path)).sort();
    const extra = [...seen].filter((path) => !exported.has(path)).sort();
    if (missing.length > 0 || extra.length > 0) {
      throw new Error(
        `manifest source set differs from exported routes: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`
      );
    }
  }

  return normalized;
}

export interface RouteManifest {
  getDecisionByPath(path: string): RouteRecord | null;
  getAliasByPath(path: string): RouteAlias | null;
  resolveCanonicalDestination(path: string): string;
  getAllRouteDecisions(): RouteRecord[];
}

export function createRouteManifest(records: readonly RouteRecord[]): RouteManifest {
  const bySource = new Map<string, RouteRecord>();
  for (const record of records) {
    bySource.set(normalizeRoutePath(record.source), record);
  }

  function getDecisionByPath(path: string): RouteRecord | null {
    return bySource.get(normalizeRoutePath(path)) ?? null;
  }

  function getAliasByPath(path: string): RouteAlias | null {
    const record = getDecisionByPath(path);
    if (record && record.behavior === "static-alias" && record.destination !== null) {
      return record as RouteAlias;
    }
    return null;
  }

  function resolveCanonicalDestination(path: string): string {
    const record = getDecisionByPath(path);
    if (record === null) {
      return normalizeRoutePath(path);
    }
    if (record.behavior === "keep") {
      return record.source;
    }
    if (record.behavior === "archive") {
      throw new Error(`archive ${JSON.stringify(record.source)} cannot be a canonical relation target`);
    }
    const destination = bySource.get(record.destination);
    if (!destination || destination.behavior !== "keep") {
      throw new Error(
        `alias ${JSON.stringify(record.source)} does not resolve to a keep destination`
      );
    }
    return destination.source;
  }

  function getAllRouteDecisions(): RouteRecord[] {
    return [...bySource.values()];
  }

  return { getDecisionByPath, getAliasByPath, resolveCanonicalDestination, getAllRouteDecisions };
}
