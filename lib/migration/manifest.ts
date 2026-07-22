/**
 * Explicit, reversible route-migration manifest.
 *
 * Every exported non-auxiliary HTML route receives exactly one record. A record
 * is either a canonical `keep` (destination `null`) or a `static-alias` that
 * points at a distinct `keep` destination in the same manifest. The other
 * behaviors are reserved by the normative enum but unused by the pilot.
 */

export const ROUTE_BEHAVIORS = [
  "keep",
  "static-alias",
  "merge",
  "archive",
  "remove-after-verification"
] as const;

export type RouteBehavior = (typeof ROUTE_BEHAVIORS)[number];

export type Locale = "en" | "ru";

export interface RouteRecord {
  readonly source: string;
  readonly destination: string | null;
  readonly behavior: RouteBehavior;
  readonly locale: Locale;
}

export interface RouteAlias extends RouteRecord {
  readonly destination: string;
  readonly behavior: "static-alias";
}

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

    return Object.freeze({
      source: normalizeRoutePath(record.source),
      destination: record.destination === null ? null : normalizeRoutePath(record.destination),
      behavior: record.behavior as RouteBehavior,
      locale: record.locale as Locale
    });
  });
}

export function validateManifest(
  records: readonly RouteRecord[],
  exportedRoutePaths?: readonly string[]
): RouteRecord[] {
  const normalized = records.map((record) =>
    Object.freeze({
      source: normalizeRoutePath(record.source),
      destination: record.destination === null ? null : normalizeRoutePath(record.destination),
      behavior: record.behavior,
      locale: record.locale
    })
  );

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
    if (record.behavior === "keep") {
      if (record.destination !== null) {
        throw new Error(
          `keep route ${JSON.stringify(record.source)} must not declare a destination`
        );
      }
      continue;
    }

    if (record.source === "/") {
      throw new Error(`the root "/" may not be an alias source`);
    }
    if (record.destination === null) {
      throw new Error(
        `static-alias route ${JSON.stringify(record.source)} requires a destination`
      );
    }
    if (record.destination === record.source) {
      throw new Error(`alias ${JSON.stringify(record.source)} must not point at itself`);
    }
    if (!keepSources.has(record.destination)) {
      throw new Error(
        `alias destination ${JSON.stringify(record.destination)} for ${JSON.stringify(record.source)} must be a distinct keep record (no chains)`
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
    if (record.destination === null) {
      throw new Error(`alias ${JSON.stringify(record.source)} has no destination`);
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
