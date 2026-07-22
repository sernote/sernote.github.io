import { parseV3Frontmatter, type V3Frontmatter } from "./schema";

export type Locale = V3Frontmatter["locale"];
export type V3Type = V3Frontmatter["type"];

export type RelationRef = {
  type: V3Type;
  entityId: string;
};

export type V3Registry = {
  all(): V3Frontmatter[];
  listPublic(type?: V3Type, locale?: Locale): V3Frontmatter[];
  listLocalCanonical(type?: V3Type, locale?: Locale): V3Frontmatter[];
  listFeatured(type?: V3Type, locale?: Locale): V3Frontmatter[];
  getBySlug(type: V3Type, slug: string, locale: Locale): V3Frontmatter | null;
  getByIdentity(ref: RelationRef, locale: Locale): V3Frontmatter | null;
  getRelated(record: V3Frontmatter): V3Frontmatter[];
  getRelatedForPage(record: V3Frontmatter, limit?: number): V3Frontmatter[];
  getBacklinks(ref: RelationRef, locale?: Locale): V3Frontmatter[];
  getAlternate(record: V3Frontmatter): V3Frontmatter | null;
  getCanonicalUrl(record: V3Frontmatter): string;
  assertLifecycle(now?: string): void;
};

type RegistryOptions = {
  now?: string;
};

const referenceTypes = new Set<V3Type>(["platform-area", "platform-component", "case"]);

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareAll(left: V3Frontmatter, right: V3Frontmatter): number {
  return (
    compareText(left.type, right.type) ||
    compareText(left.locale, right.locale) ||
    compareText(left.entityId, right.entityId)
  );
}

function comparePublic(left: V3Frontmatter, right: V3Frontmatter): number {
  if (left.type === "platform-area" && right.type === "platform-area") {
    return (
      left.order - right.order ||
      compareText(left.entityId, right.entityId) ||
      compareText(left.locale, right.locale)
    );
  }

  if (left.type === "platform-area" || right.type === "platform-area") {
    return left.type === "platform-area" ? -1 : 1;
  }

  return (
    compareText(right.publishedAt ?? "", left.publishedAt ?? "") ||
    compareText(right.updatedAt, left.updatedAt) ||
    compareText(left.entityId, right.entityId) ||
    compareText(left.locale, right.locale) ||
    compareText(left.type, right.type)
  );
}

function identityKey(ref: RelationRef, locale: Locale): string {
  return `${ref.type}:${locale}:${ref.entityId}`;
}

function localeEntityKey(entityId: string, locale: Locale): string {
  return `${locale}:${entityId}`;
}

function isReference(record: V3Frontmatter): boolean {
  return referenceTypes.has(record.type);
}

function isPublic(record: V3Frontmatter): boolean {
  if (record.publicationStatus !== "published") return false;
  if (!isReference(record)) return true;
  return record.reviewStatus === "reviewed" || record.reviewStatus === "stale";
}

function parseCalendarDate(value: string, label: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`${label} must be a valid YYYY-MM-DD date`);

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
  return date;
}

function addCalendarDays(value: string, days: number): Date {
  const result = parseCalendarDate(value, "reviewedAt");
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

export function getCanonicalUrl(record: V3Frontmatter): string {
  if (record.type === "article" && record.kind === "external-note") {
    if (record.sourceUrl === null) throw new Error(`External article ${record.entityId} has no URL`);
    return record.sourceUrl;
  }

  const prefix = record.locale === "en" ? "/en" : "";
  if (record.type === "article") {
    if (record.slug === null) throw new Error(`Native article ${record.entityId} has no slug`);
    return `${prefix}/blog/${record.slug}`;
  }

  switch (record.type) {
    case "talk":
      return `${prefix}/talks/${record.slug}`;
    case "project":
      return `${prefix}/projects/${record.slug}`;
    case "platform-area":
      return `${prefix}/ai-platform/areas/${record.slug}`;
    case "platform-component":
      return `${prefix}/ai-platform/components/${record.slug}`;
    case "case":
      return `${prefix}/ai-platform/cases/${record.slug}`;
    default:
      record satisfies never;
      throw new Error("Unsupported v3 content type");
  }
}

export function createRegistry(
  inputs: readonly unknown[],
  options: RegistryOptions = {}
): V3Registry {
  const records = inputs.map((input) => parseV3Frontmatter(input)).sort(compareAll);
  const byIdentity = new Map<string, V3Frontmatter>();
  const byLocaleEntity = new Map<string, V3Frontmatter>();
  const entityTypes = new Map<string, V3Type>();
  const localUrls = new Map<string, V3Frontmatter>();

  for (const record of records) {
    const localeKey = localeEntityKey(record.entityId, record.locale);
    if (byLocaleEntity.has(localeKey)) {
      throw new Error(`Duplicate identity (${record.entityId}, ${record.locale})`);
    }

    const knownType = entityTypes.get(record.entityId);
    if (knownType !== undefined && knownType !== record.type) {
      throw new Error(
        `Entity ${record.entityId} uses different types across locales: ${knownType} and ${record.type}`
      );
    }

    byLocaleEntity.set(localeKey, record);
    byIdentity.set(identityKey(record, record.locale), record);
    entityTypes.set(record.entityId, record.type);

    if (!(record.type === "article" && record.kind === "external-note")) {
      const url = getCanonicalUrl(record);
      const collision = localUrls.get(url);
      if (collision !== undefined) {
        throw new Error(
          `Canonical URL collision at ${url}: ${collision.entityId} and ${record.entityId}`
        );
      }
      localUrls.set(url, record);
    }
  }

  function lookup(ref: RelationRef, locale: Locale): V3Frontmatter | null {
    return byIdentity.get(identityKey(ref, locale)) ?? null;
  }

  function resolveFixedRelation(
    source: V3Frontmatter,
    entityId: string,
    expectedType: V3Type
  ): V3Frontmatter {
    const candidate = byLocaleEntity.get(localeEntityKey(entityId, source.locale));
    if (candidate === undefined) {
      throw new Error(`Missing relation target ${expectedType}:${entityId} from ${source.entityId}`);
    }
    if (candidate.type !== expectedType) {
      throw new Error(
        `Wrong relation type for ${entityId}: expected ${expectedType}, found ${candidate.type}`
      );
    }
    return candidate;
  }

  function resolvePlatformRelation(source: V3Frontmatter, entityId: string): V3Frontmatter {
    const candidate = byLocaleEntity.get(localeEntityKey(entityId, source.locale));
    if (candidate === undefined) {
      throw new Error(`Missing relation target platform:${entityId} from ${source.entityId}`);
    }
    if (!referenceTypes.has(candidate.type)) {
      throw new Error(
        `Wrong relation type for ${entityId}: expected a platform entity, found ${candidate.type}`
      );
    }
    return candidate;
  }

  const forward = new Map<string, V3Frontmatter[]>();
  const backlinks = new Map<string, V3Frontmatter[]>();

  for (const source of records) {
    const targets: V3Frontmatter[] = [];
    const seen = new Set<string>();
    const addTarget = (target: V3Frontmatter) => {
      const key = identityKey(target, target.locale);
      if (seen.has(key)) {
        throw new Error(`Duplicate relation ${target.type}:${target.entityId} from ${source.entityId}`);
      }
      if (target.type === source.type && target.entityId === source.entityId) {
        throw new Error(`Self relation ${target.type}:${target.entityId}`);
      }
      if (source.publicationStatus === "published" && !isPublic(target)) {
        throw new Error(
          `Published record ${source.entityId} points to non-public target ${target.entityId}`
        );
      }
      seen.add(key);
      targets.push(target);
      const targetBacklinks = backlinks.get(key) ?? [];
      targetBacklinks.push(source);
      backlinks.set(key, targetBacklinks);
    };

    for (const entityId of source.relations.articleIds ?? []) {
      addTarget(resolveFixedRelation(source, entityId, "article"));
    }
    for (const entityId of source.relations.talkIds ?? []) {
      addTarget(resolveFixedRelation(source, entityId, "talk"));
    }
    for (const entityId of source.relations.projectIds ?? []) {
      addTarget(resolveFixedRelation(source, entityId, "project"));
    }
    for (const entityId of source.relations.platformEntityIds ?? []) {
      addTarget(resolvePlatformRelation(source, entityId));
    }

    forward.set(identityKey(source, source.locale), targets);
  }

  for (const sources of backlinks.values()) sources.sort(compareAll);

  const componentsByArea = new Map<string, V3Frontmatter[]>();
  const casesByComponent = new Map<string, V3Frontmatter[]>();

  for (const record of records) {
    if (record.type === "platform-component") {
      const primary = resolveFixedRelation(record, record.primaryAreaId, "platform-area");
      const areaIds = [record.primaryAreaId, ...record.relatedAreaIds];
      if (new Set(areaIds).size !== areaIds.length) {
        throw new Error(`Duplicate structural area membership on ${record.entityId}`);
      }
      for (const areaId of areaIds) {
        resolveFixedRelation(record, areaId, "platform-area");
        const key = identityKey({ type: "platform-area", entityId: areaId }, record.locale);
        const components = componentsByArea.get(key) ?? [];
        components.push(record);
        componentsByArea.set(key, components);
      }
      if (record.publicationStatus === "published" && !isPublic(primary)) {
        throw new Error(
          `Published component ${record.entityId} requires a published reviewed-or-stale primary area`
        );
      }
    }

    if (record.type === "case") {
      if (new Set(record.componentIds).size !== record.componentIds.length) {
        throw new Error(`Duplicate structural component membership on ${record.entityId}`);
      }
      const components = record.componentIds.map((componentId) =>
        resolveFixedRelation(record, componentId, "platform-component")
      );
      for (const componentRecord of components) {
        const key = identityKey(componentRecord, componentRecord.locale);
        const cases = casesByComponent.get(key) ?? [];
        cases.push(record);
        casesByComponent.set(key, cases);
      }
      if (
        record.publicationStatus === "published" &&
        !components.some((componentRecord) => isPublic(componentRecord))
      ) {
        throw new Error(
          `Published case ${record.entityId} requires at least one published reviewed-or-stale component`
        );
      }
    }
  }

  for (const components of componentsByArea.values()) components.sort(comparePublic);
  for (const cases of casesByComponent.values()) cases.sort(comparePublic);

  function assertLifecycle(at = options.now ?? new Date().toISOString().slice(0, 10)): void {
    const today = parseCalendarDate(at, "now");
    for (const record of records) {
      if (!isReference(record) || record.reviewStatus === "unreviewed") continue;
      if (record.reviewedAt === null || record.reviewCycleDays === null) continue;

      const deadline = addCalendarDays(record.reviewedAt, record.reviewCycleDays);
      if (record.reviewStatus === "reviewed" && today.getTime() > deadline.getTime()) {
        throw new Error(
          `Reviewed reference ${record.entityId} expired on ${deadline.toISOString().slice(0, 10)}`
        );
      }
      if (record.reviewStatus === "stale" && today.getTime() <= deadline.getTime()) {
        throw new Error(
          `Stale reference ${record.entityId} is not expired until after ${deadline.toISOString().slice(0, 10)}`
        );
      }
    }
  }

  function structural(record: V3Frontmatter): V3Frontmatter[] {
    const key = identityKey(record, record.locale);
    if (record.type === "platform-area") return [...(componentsByArea.get(key) ?? [])];
    if (record.type === "platform-component") {
      const areas = [record.primaryAreaId, ...record.relatedAreaIds].map((entityId) =>
        resolveFixedRelation(record, entityId, "platform-area")
      );
      return [...areas, ...(casesByComponent.get(key) ?? [])];
    }
    if (record.type === "case") {
      return record.componentIds.map((entityId) =>
        resolveFixedRelation(record, entityId, "platform-component")
      );
    }
    return [];
  }

  function filterAndSort(type?: V3Type, locale?: Locale): V3Frontmatter[] {
    return records
      .filter(
        (record) =>
          isPublic(record) &&
          (type === undefined || record.type === type) &&
          (locale === undefined || record.locale === locale)
      )
      .sort(comparePublic);
  }

  assertLifecycle();

  const registry: V3Registry = {
    all: () => [...records],
    listPublic: (type, locale) => filterAndSort(type, locale),
    listLocalCanonical: (type, locale) =>
      filterAndSort(type, locale).filter(
        (record) => !(record.type === "article" && record.kind === "external-note")
      ),
    listFeatured: (type, locale) =>
      filterAndSort(type, locale).filter((record) => record.reviewStatus !== "stale"),
    getBySlug: (type, slug, locale) =>
      records.find(
        (record) => record.type === type && record.locale === locale && record.slug === slug
      ) ?? null,
    getByIdentity: lookup,
    getRelated: (record) => [...(forward.get(identityKey(record, record.locale)) ?? [])],
    getRelatedForPage: (record, limit = 4) => {
      const result: V3Frontmatter[] = [];
      const seen = new Set<string>();
      const buckets = [
        forward.get(identityKey(record, record.locale)) ?? [],
        structural(record),
        backlinks.get(identityKey(record, record.locale)) ?? []
      ];
      for (const bucket of buckets) {
        for (const candidate of bucket) {
          const key = identityKey(candidate, candidate.locale);
          if (!isPublic(candidate) || seen.has(key)) continue;
          seen.add(key);
          result.push(candidate);
        }
      }
      return result.slice(0, Math.max(0, limit));
    },
    getBacklinks: (ref, locale) => {
      if (locale !== undefined) {
        return [...(backlinks.get(identityKey(ref, locale)) ?? [])];
      }
      return records
        .filter((record) =>
          (backlinks.get(identityKey(ref, record.locale)) ?? []).some(
            (source) => identityKey(source, source.locale) === identityKey(record, record.locale)
          )
        )
        .sort(compareAll);
    },
    getAlternate: (record) =>
      lookup(record, record.locale === "ru" ? "en" : "ru"),
    getCanonicalUrl,
    assertLifecycle
  };

  return registry;
}
