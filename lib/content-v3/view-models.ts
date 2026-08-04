import type { V3Source, V3SourceItem } from "./source-core";
import { getCanonicalUrl, type V3Type } from "./registry";

export type V3ListItemViewModel = Readonly<{
  entityId: string;
  contentType: V3Type;
  title: string;
  description: string;
  meta: string;
  href: string;
  linkKind: "internal" | "external";
  reviewStatusLabel?: "Нужна проверка";
}>;

export type ReferenceBreadcrumbItemViewModel = V3ListItemViewModel &
  Readonly<{
    slug: string;
  }>;

export type HomeViewModel = Readonly<{
  entrances: readonly Readonly<{
    id: "blog" | "materials" | "ai-platform";
    index: string;
    label: string;
    description: string;
    href: string;
  }>[];
  featured: readonly Readonly<{
    surface: "blog" | "materials";
    label: string;
    item: V3ListItemViewModel;
  }>[];
}>;

export type ExternalPublicationViewModel = Readonly<{
  entityId: string;
  externalTypeLabel:
    | "Авторская статья"
    | "Экспертный комментарий"
    | "Интервью"
    | "Упоминание";
  sourceName: string;
  publishedLabel: string;
  title: string;
  excerpt: string;
  participationLabel: string;
  href: string;
}>;

export type TalkSummaryViewModel = Readonly<{
  entityId: string;
  title: string;
  venue: string;
  eventDateLabel: string;
  formatLabel: string;
  description: string;
  recordingLabel: string | null;
  thumbnail: { path: string; alt: string } | null;
  href: string;
}>;

export type ProjectSummaryViewModel = Readonly<{
  entityId: string;
  title: string;
  typeLabel: string;
  releaseLabel: string | null;
  description: string;
  evidenceBoundary: string;
  href: string;
  repositoryUrl: string;
}>;

export type MaterialsViewModel = Readonly<{
  talks: readonly TalkSummaryViewModel[];
  projects: readonly ProjectSummaryViewModel[];
  publications: readonly ExternalPublicationViewModel[];
}>;

export type AboutViewModel = Readonly<{
  evidence: readonly V3ListItemViewModel[];
}>;

export type WorkViewModel = Readonly<{
  groups: readonly Readonly<{
    id: "talks" | "projects" | "writing";
    index: string;
    title: string;
    description: string;
    item: V3ListItemViewModel;
    indexHref: string | null;
    indexLabel: string | null;
  }>[];
}>;

export type BlogListItemViewModel = V3ListItemViewModel &
  Readonly<{
    articleKind: "native" | "external-note";
    editorialFormat?: "article" | "note";
    topics?: readonly string[];
    sourceName: string | null;
    publishedAt: string;
    publishedLabel: string;
  }>;

export type BlogViewModel = Readonly<{
  items: readonly BlogListItemViewModel[];
}>;

export type ContentIndexItemViewModel = V3ListItemViewModel &
  Readonly<{
    eyebrow: string;
  }>;

export type TalksViewModel = Readonly<{
  items: readonly ContentIndexItemViewModel[];
}>;

export type ProjectsViewModel = Readonly<{
  items: readonly ContentIndexItemViewModel[];
}>;

export type PlatformMapAreaViewModel = Readonly<{
  entityId: string;
  index: string;
  title: string;
  purpose: string;
  mapBoundary: string;
  statusLabel: "Доступно" | "Нужна проверка" | "Планируется";
  href: string | null;
}>;

export type PlatformMapViewModel = Readonly<{
  areas: readonly PlatformMapAreaViewModel[];
  intersections: readonly Readonly<{
    title: string;
    description: string;
  }>[];
}>;

export type PlatformLandingViewModel = Readonly<{
  entryModes: readonly Readonly<{
    id: "map" | "vertical";
    index: string;
    title: string;
    description: string;
    href: string;
  }>[];
  vertical: readonly Readonly<{
    entityId: string;
    index: string;
    title: string;
    meta: string;
    href: string;
    statusLabel:
      | "Проверено"
      | "Нужна проверка"
      | "Синтетический кейс"
      | "Открытый проект";
  }>[];
}>;

export type ReferenceContentType = "platform-area" | "platform-component" | "case";

export type ReferenceDetailViewModel = Readonly<{
  entityId: string;
  contentType: ReferenceContentType;
  title: string;
  description: string;
  href: string;
  typeLabel: "Область AI Platform" | "Компонент AI Platform" | "Синтетический кейс" | "Кейс AI Platform";
  reviewStatus: "reviewed" | "stale";
  reviewStatusLabel: "Проверено" | "Нужна повторная проверка";
  reviewedAt: string;
  reviewedLabel: string;
  publishedAt: string;
  updatedAt: string;
  purpose: string;
  boundary: string;
  applicability: string;
  limitations: string;
  sources: readonly Readonly<{
    title: string;
    url: string;
    verifiedAt: string;
    verifiedLabel: string;
  }>[];
  primaryArea: ReferenceBreadcrumbItemViewModel | null;
  parentComponent: ReferenceBreadcrumbItemViewModel | null;
  parentComponentPrimaryAreaId: string | null;
  related: readonly V3ListItemViewModel[];
  isSynthetic: boolean;
}>;

const RUSSIAN_MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря"
] as const;

export function formatRussianDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match === null) {
    throw new Error(`Expected a valid calendar date, received ${JSON.stringify(value)}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    throw new Error(`Expected a valid calendar date, received ${JSON.stringify(value)}`);
  }

  return `${day} ${RUSSIAN_MONTHS[month - 1]} ${year} года`;
}

const HOME_ENTRANCES: HomeViewModel["entrances"] = Object.freeze([
  Object.freeze({
    id: "blog",
    index: "01",
    label: "Блог",
    description: "Статьи и короткие инженерные заметки.",
    href: "/blog"
  }),
  Object.freeze({
    id: "materials",
    index: "02",
    label: "Материалы",
    description: "Выступления, открытые проекты и публикации.",
    href: "/materials"
  }),
  Object.freeze({
    id: "ai-platform",
    index: "03",
    label: "AI Platform",
    description: "Карта и практический reference по production AI platform.",
    href: "/ai-platform"
  })
]);

const CANONICAL_PLATFORM_AREAS = Object.freeze([
  "strategy-boundaries",
  "control-plane",
  "inference-plane",
  "context-agent-runtime",
  "quality-lifecycle",
  "operations-economics",
  "security-ownership"
] as const);

const PLATFORM_INTERSECTIONS: PlatformMapViewModel["intersections"] = Object.freeze([
  Object.freeze({
    title: "Control Plane и Inference Plane",
    description:
      "Control Plane задаёт route intent, policy и limits. Inference Plane отвечает доступностью, pressure и фактом исполнения."
  }),
  Object.freeze({
    title: "Context & Agent Runtime и Quality & Lifecycle",
    description:
      "Agent runtime собирает контекст и действия. Quality & Lifecycle проверяет версии данных, промптов, tools и поведения перед выпуском."
  }),
  Object.freeze({
    title: "Эксплуатация, экономика, безопасность и ownership",
    description:
      "SLO, capacity, cost, data boundaries, audit и владельцы решений проходят через все области, а не образуют отдельный шаг request path."
  })
]);

const PLATFORM_MAP_ENTRY_MODE = Object.freeze({
  id: "map" as const,
  index: "01",
  title: "Карта областей",
  description:
    "Семь зон ответственности — от выбора сценария до эксплуатации, безопасности и ownership.",
  href: "/ai-platform/map"
});

function metaFor(record: V3SourceItem): string {
  switch (record.type) {
    case "article":
      return record.kind === "external-note"
        ? `${record.sourceName} · внешний материал`
        : "Авторская статья";
    case "talk":
      return record.venue;
    case "project":
      return record.verifiedRelease === null
        ? "Открытый проект"
        : `Открытый проект · ${record.verifiedRelease.version}`;
    case "platform-area":
      return "Область AI Platform";
    case "platform-component":
      return "Компонент AI Platform";
    case "case":
      return record.caseKind === "synthetic"
        ? "Синтетический кейс"
        : "Практический кейс";
    default:
      record satisfies never;
      throw new Error("Unsupported v3 content type");
  }
}

function normalizeListItem(record: V3SourceItem): V3ListItemViewModel {
  const reviewStatusLabel =
    (record.type === "platform-area" ||
      record.type === "platform-component" ||
      record.type === "case") &&
    record.reviewStatus === "stale"
      ? "Нужна проверка"
      : undefined;

  return Object.freeze({
    entityId: record.entityId,
    contentType: record.type,
    title: record.title,
    description: record.description,
    meta: metaFor(record),
    href: getCanonicalUrl(record),
    linkKind:
      record.type === "article" && record.kind === "external-note" ? "external" : "internal",
    ...(reviewStatusLabel === undefined ? {} : { reviewStatusLabel })
  });
}

function normalizeReferenceBreadcrumbItem(
  record: V3SourceItem
): ReferenceBreadcrumbItemViewModel {
  if (record.type !== "platform-area" && record.type !== "platform-component") {
    throw new Error(`Unsupported reference breadcrumb type: ${record.type}`);
  }

  return Object.freeze({
    ...normalizeListItem(record),
    slug: record.slug
  });
}

function requirePublicEntity(
  source: V3Source,
  type: V3Type,
  entityId: string
): V3SourceItem {
  const record = source
    .listPublic(type, "ru")
    .find((candidate) => candidate.entityId === entityId);

  if (record === undefined) {
    throw new Error(`Required public ${type} ${entityId} is not available`);
  }
  if (record.type !== type) {
    throw new Error(`Required ${entityId}: expected ${type}, found ${record.type}`);
  }
  return record;
}

function findPublicByEntityId(
  source: V3Source,
  type: V3Type,
  entityId: string
): V3SourceItem | null {
  return (
    source
      .listPublic(type, "ru")
      .find((candidate) => candidate.entityId === entityId) ?? null
  );
}

function selectFeatured(
  source: V3Source,
  expectedType: V3Type,
  entityId: string
): V3ListItemViewModel {
  const visibleRecord = source
    .listFeatured(undefined, "ru")
    .find((record) => record.entityId === entityId);

  if (visibleRecord === undefined) {
    throw new Error(`Featured selection ${entityId} is not available`);
  }
  if (visibleRecord.type !== expectedType) {
    throw new Error(
      `Featured selection ${entityId}: expected ${expectedType}, found ${visibleRecord.type}`
    );
  }

  return normalizeListItem(visibleRecord);
}

function requireEligibleEntity(
  source: V3Source,
  expectedType: V3Type,
  entityId: string,
  expectedArticleKind?: "native" | "external-note"
): V3SourceItem {
  const record = source
    .listPublic(undefined, "ru")
    .find((candidate) => candidate.entityId === entityId);
  const featured = source
    .listFeatured(undefined, "ru")
    .some((candidate) => candidate.entityId === entityId);

  if (
    record === undefined ||
    record.publicationStatus !== "published" ||
    record.reviewStatus === "stale" ||
    !featured
  ) {
    throw new Error(`Required public ${expectedType} ${entityId} is not available`);
  }
  if (record.type !== expectedType) {
    throw new Error(`Required ${entityId}: expected ${expectedType}, found ${record.type}`);
  }
  if (
    expectedArticleKind !== undefined &&
    (record.type !== "article" || record.kind !== expectedArticleKind)
  ) {
    throw new Error(`Required article ${entityId} must be ${expectedArticleKind}`);
  }
  return record;
}

export function getHomeViewModel(source: V3Source): HomeViewModel {
  const article = requireEligibleEntity(
    source,
    "article",
    "ai-platform-before-gpu",
    "native"
  );
  const talk = requireEligibleEntity(source, "talk", "maas-vs-self-hosted-roii");
  const project = requireEligibleEntity(source, "project", "audit-prompt-caching");
  const featured: HomeViewModel["featured"] = Object.freeze([
    Object.freeze({
      surface: "blog",
      label: "Статья",
      item: normalizeListItem(article)
    }),
    Object.freeze({
      surface: "materials",
      label: "Выступление",
      item: normalizeListItem(talk)
    }),
    Object.freeze({
      surface: "materials",
      label: "Открытый проект",
      item: normalizeListItem(project)
    })
  ]);

  return Object.freeze({ entrances: HOME_ENTRANCES, featured });
}

export function getWorkViewModel(source: V3Source): WorkViewModel {
  const groups: WorkViewModel["groups"] = Object.freeze([
    Object.freeze({
      id: "talks",
      index: "01",
      title: "Выступление",
      description: "Запись и краткая выжимка из доклада.",
      item: selectFeatured(source, "talk", "maas-vs-self-hosted-roii"),
      indexHref: "/talks",
      indexLabel: "Все выступления"
    }),
    Object.freeze({
      id: "projects",
      index: "02",
      title: "Открытый проект",
      description: "Работающий инженерный артефакт и его границы.",
      item: selectFeatured(source, "project", "audit-prompt-caching"),
      indexHref: "/projects",
      indexLabel: "Все проекты"
    }),
    Object.freeze({
      id: "writing",
      index: "03",
      title: "Внешняя публикация",
      description: "Статья опубликована на исходной площадке.",
      item: selectFeatured(source, "article", "prefix-cache-habr"),
      indexHref: null,
      indexLabel: null
    })
  ]);

  return Object.freeze({ groups });
}

export function getBlogViewModel(source: V3Source): BlogViewModel {
  const items = Object.freeze(
    source
      .listPublic("article", "ru")
      .filter((record) => record.type === "article" && record.kind === "native")
      .sort((left, right) => {
        if (left.type !== "article" || right.type !== "article") return 0;
        return (
          (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "") ||
          Number(right.editorialFormat === "article") -
            Number(left.editorialFormat === "article") ||
          left.entityId.localeCompare(right.entityId)
        );
      })
      .map((record): BlogListItemViewModel => {
        if (
          record.type !== "article" ||
          record.kind !== "native" ||
          record.editorialFormat === null ||
          record.publishedAt === null
        ) {
          throw new Error(`Blog record ${record.entityId} is not a published article`);
        }

        return Object.freeze({
          ...normalizeListItem(record),
          description: record.excerpt,
          articleKind: record.kind,
          editorialFormat: record.editorialFormat,
          topics: Object.freeze([...record.topics]),
          sourceName: record.sourceName,
          publishedAt: record.publishedAt,
          publishedLabel: formatRussianDate(record.publishedAt)
        });
      })
  );

  return Object.freeze({ items });
}

const EXTERNAL_TYPE_LABELS = {
  "authored-article": "Авторская статья",
  "expert-comment": "Экспертный комментарий",
  interview: "Интервью",
  "media-mention": "Упоминание"
} as const;

const TALK_FORMAT_LABELS = {
  talk: "Доклад",
  webinar: "Вебинар",
  podcast: "Подкаст",
  interview: "Интервью"
} as const;

const MATERIALS_EXTERNAL_IDS = [
  "prefix-cache-the-code",
  "prefix-cache-habr",
  "effective-cost-habr",
  "agent-skills-habr",
  "prompt-engineering-vc"
] as const;

const ABOUT_EVIDENCE_IDS = [
  ["article", "agent-skills-habr", "external-note"],
  ["talk", "maas-vs-self-hosted-roii"],
  ["project", "audit-prompt-caching"]
] as const;

export function getMaterialsViewModel(source: V3Source): MaterialsViewModel {
  requireEligibleEntity(source, "talk", "maas-vs-self-hosted-roii");
  requireEligibleEntity(source, "project", "audit-prompt-caching");
  for (const entityId of MATERIALS_EXTERNAL_IDS) {
    requireEligibleEntity(source, "article", entityId, "external-note");
  }

  const talks = Object.freeze(
    source
      .listPublic("talk", "ru")
      .sort((left, right) => {
        if (left.type !== "talk" || right.type !== "talk") return 0;
        return (
          right.eventDate.localeCompare(left.eventDate) ||
          left.entityId.localeCompare(right.entityId)
        );
      })
      .map((record): TalkSummaryViewModel => {
        if (record.type !== "talk") {
          throw new Error(`Materials received ${record.type} as talk`);
        }
        return Object.freeze({
          entityId: record.entityId,
          title: record.title,
          venue: record.venue,
          eventDateLabel: formatRussianDate(record.eventDate),
          formatLabel: TALK_FORMAT_LABELS[record.format],
          description: record.abstract,
          recordingLabel: record.recordingUrl === null ? null : "Смотреть запись",
          thumbnail:
            record.thumbnail === null
              ? null
              : Object.freeze({ path: record.thumbnail.path, alt: record.thumbnail.alt }),
          href: getCanonicalUrl(record)
        });
      })
  );

  const projects = Object.freeze(
    source.listPublic("project", "ru").map((record): ProjectSummaryViewModel => {
      if (record.type !== "project") {
        throw new Error(`Materials received ${record.type} as project`);
      }
      return Object.freeze({
        entityId: record.entityId,
        title: record.title,
        typeLabel: "Открытый проект",
        releaseLabel: record.verifiedRelease?.version ?? null,
        description: record.description,
        evidenceBoundary: record.supportBoundary,
        href: getCanonicalUrl(record),
        repositoryUrl: record.repositoryUrl
      });
    })
  );

  const publications = Object.freeze(
    source
      .listPublic("article", "ru")
      .filter((record) => record.type === "article" && record.kind === "external-note")
      .sort((left, right) =>
        (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "") ||
        left.entityId.localeCompare(right.entityId)
      )
      .map((record): ExternalPublicationViewModel => {
        if (
          record.type !== "article" ||
          record.kind !== "external-note" ||
          record.externalType === null ||
          record.sourceName === null ||
          record.sourceUrl === null ||
          record.participationLabel === null ||
          record.publishedAt === null
        ) {
          throw new Error(`External publication ${record.entityId} is incomplete`);
        }
        return Object.freeze({
          entityId: record.entityId,
          externalTypeLabel: EXTERNAL_TYPE_LABELS[record.externalType],
          sourceName: record.sourceName,
          publishedLabel: formatRussianDate(record.publishedAt),
          title: record.title,
          excerpt: record.excerpt,
          participationLabel: record.participationLabel,
          href: record.sourceUrl
        });
      })
  );

  return Object.freeze({ talks, projects, publications });
}

export function getAboutViewModel(source: V3Source): AboutViewModel {
  const evidence = Object.freeze(
    ABOUT_EVIDENCE_IDS.map(([type, entityId, articleKind]) =>
      normalizeListItem(requireEligibleEntity(source, type, entityId, articleKind))
    )
  );
  return Object.freeze({ evidence });
}

export function getTalksViewModel(source: V3Source): TalksViewModel {
  const items = Object.freeze(
    source.listPublic("talk", "ru").map((record): ContentIndexItemViewModel => {
      if (record.type !== "talk") {
        throw new Error(`Talks index received a ${record.type} record: ${record.entityId}`);
      }

      const venue = record.venue.split(/\s*[·,]\s*/, 1)[0];
      return Object.freeze({
        ...normalizeListItem(record),
        description: record.abstract,
        eyebrow: `${venue} · ${formatRussianDate(record.eventDate)}`
      });
    })
  );

  return Object.freeze({ items });
}

export function getProjectsViewModel(source: V3Source): ProjectsViewModel {
  const items = Object.freeze(
    source.listPublic("project", "ru").map((record): ContentIndexItemViewModel => {
      if (record.type !== "project") {
        throw new Error(`Projects index received a ${record.type} record: ${record.entityId}`);
      }

      const item = normalizeListItem(record);
      return Object.freeze({ ...item, eyebrow: item.meta });
    })
  );

  return Object.freeze({ items });
}

export function getPlatformMapViewModel(source: V3Source): PlatformMapViewModel {
  const records = [
    ...source.listPublic("platform-area", "ru"),
    ...source.getPlannedAreas("ru")
  ];
  const identities = records.map((record) => record.entityId);
  const uniqueIdentities = new Set(identities);

  if (records.length !== CANONICAL_PLATFORM_AREAS.length || uniqueIdentities.size !== records.length) {
    throw new Error("AI Platform map requires exactly seven unique canonical areas");
  }

  const unexpected = identities.filter(
    (identity) => !CANONICAL_PLATFORM_AREAS.includes(identity as (typeof CANONICAL_PLATFORM_AREAS)[number])
  );
  const missing = CANONICAL_PLATFORM_AREAS.filter((identity) => !uniqueIdentities.has(identity));
  if (unexpected.length > 0 || missing.length > 0) {
    throw new Error(
      `AI Platform map canonical area mismatch; missing=${missing.join(",") || "none"}; unexpected=${unexpected.join(",") || "none"}`
    );
  }

  const byIdentity = new Map(records.map((record) => [record.entityId, record]));
  const areas = Object.freeze(
    CANONICAL_PLATFORM_AREAS.map((entityId, offset): PlatformMapAreaViewModel => {
      const record = byIdentity.get(entityId);
      if (record === undefined || record.type !== "platform-area" || record.order !== offset + 1) {
        throw new Error(`AI Platform map area ${entityId} has an invalid canonical order`);
      }

      const isPublic = record.publicationStatus === "published";
      const href = isPublic ? getCanonicalUrl(record) : null;
      const statusLabel = !isPublic
        ? "Планируется"
        : record.reviewStatus === "stale"
          ? "Нужна проверка"
          : "Доступно";

      return Object.freeze({
        entityId: record.entityId,
        index: String(record.order).padStart(2, "0"),
        title: record.title,
        purpose: record.description,
        mapBoundary: record.mapBoundary,
        statusLabel,
        href
      });
    })
  );

  return Object.freeze({ areas, intersections: PLATFORM_INTERSECTIONS });
}

export function getPlatformLandingViewModel(source: V3Source): PlatformLandingViewModel {
  const area = requirePublicEntity(source, "platform-area", "inference-plane");
  const component = requirePublicEntity(source, "platform-component", "prefix-cache");
  const caseRecord = requirePublicEntity(source, "case", "agent-session-cache-reuse");
  const project = requirePublicEntity(source, "project", "audit-prompt-caching");

  if (area.type !== "platform-area") throw new Error("Inference Plane has an invalid type");
  if (component.type !== "platform-component") throw new Error("Prefix Cache has an invalid type");
  if (caseRecord.type !== "case" || caseRecord.caseKind !== "synthetic") {
    throw new Error("Agent session cache reuse must remain a synthetic case");
  }
  if (project.type !== "project") throw new Error("audit-prompt-caching has an invalid type");

  const hasStaleReference = [area, component, caseRecord].some(
    (record) => record.reviewStatus === "stale"
  );
  const entryModes: PlatformLandingViewModel["entryModes"] = Object.freeze([
    PLATFORM_MAP_ENTRY_MODE,
    Object.freeze({
      id: "vertical",
      index: "02",
      title: "Текущий вертикальный срез",
      description: hasStaleReference
        ? "Один опубликованный путь от области инференса к компоненту, синтетическому кейсу и открытому проекту; часть reference-материалов требует повторной проверки."
        : "Один проверенный путь от области инференса к компоненту, синтетическому кейсу и открытому проекту.",
      href: "#current-vertical"
    })
  ]);

  const vertical: PlatformLandingViewModel["vertical"] = Object.freeze([
    Object.freeze({
      entityId: area.entityId,
      index: "01",
      title: area.title,
      meta: "Область",
      href: getCanonicalUrl(area),
      statusLabel: area.reviewStatus === "stale" ? "Нужна проверка" : "Проверено"
    }),
    Object.freeze({
      entityId: component.entityId,
      index: "02",
      title: component.title,
      meta: "Компонент",
      href: getCanonicalUrl(component),
      statusLabel:
        component.reviewStatus === "stale" ? "Нужна проверка" : "Проверено"
    }),
    Object.freeze({
      entityId: caseRecord.entityId,
      index: "03",
      title: caseRecord.title,
      meta: "Кейс",
      href: getCanonicalUrl(caseRecord),
      statusLabel:
        caseRecord.reviewStatus === "stale" ? "Нужна проверка" : "Синтетический кейс"
    }),
    Object.freeze({
      entityId: project.entityId,
      index: "04",
      title: project.title,
      meta: "Проект",
      href: getCanonicalUrl(project),
      statusLabel: "Открытый проект"
    })
  ]);

  return Object.freeze({ entryModes, vertical });
}

function referenceTypeLabel(
  record: V3SourceItem
): ReferenceDetailViewModel["typeLabel"] {
  if (record.type === "platform-area") return "Область AI Platform";
  if (record.type === "platform-component") return "Компонент AI Platform";
  if (record.type === "case") {
    return record.caseKind === "synthetic" ? "Синтетический кейс" : "Кейс AI Platform";
  }
  throw new Error(`Unsupported reference type: ${record.type}`);
}

function requirePrimaryArea(
  source: V3Source,
  areaId: string
): ReferenceBreadcrumbItemViewModel {
  const areaRecord = findPublicByEntityId(source, "platform-area", areaId);
  if (areaRecord === null || areaRecord.type !== "platform-area") {
    throw new Error(`Published reference requires public primary area ${areaId}`);
  }
  return normalizeReferenceBreadcrumbItem(areaRecord);
}

export function getReferenceDetailViewModel(
  source: V3Source,
  type: ReferenceContentType,
  slug: string
): ReferenceDetailViewModel | null {
  const record = source.getBySlug(type, slug, "ru");
  if (record === null) return null;
  if (record.type !== type) {
    throw new Error(`Reference ${slug}: expected ${type}, found ${record.type}`);
  }
  if (
    record.reviewStatus === "unreviewed" ||
    record.publishedAt === null ||
    record.reviewedAt === null ||
    record.applicability === null ||
    record.limitations === null
  ) {
    throw new Error(`Reference ${record.entityId} is missing public review evidence`);
  }

  let primaryArea: ReferenceBreadcrumbItemViewModel | null = null;
  let parentComponent: ReferenceBreadcrumbItemViewModel | null = null;
  let parentComponentPrimaryAreaId: string | null = null;
  if (record.type === "platform-component") {
    primaryArea = requirePrimaryArea(source, record.primaryAreaId);
  } else if (record.type === "case") {
    const componentId = record.componentIds[0];
    const componentRecord = findPublicByEntityId(source, "platform-component", componentId);
    if (componentRecord === null || componentRecord.type !== "platform-component") {
      throw new Error(`Published case ${record.entityId} requires public component ${componentId}`);
    }
    parentComponent = normalizeReferenceBreadcrumbItem(componentRecord);
    parentComponentPrimaryAreaId = componentRecord.primaryAreaId;
    primaryArea = requirePrimaryArea(source, componentRecord.primaryAreaId);
  }

  const sources = Object.freeze(
    record.sources.map((sourceRecord) =>
      Object.freeze({
        ...sourceRecord,
        verifiedLabel: formatRussianDate(sourceRecord.verifiedAt)
      })
    )
  );
  const related = Object.freeze(
    source.getRelatedForPage(record, 4).map((relatedRecord) => normalizeListItem(relatedRecord))
  );
  const model: ReferenceDetailViewModel = Object.freeze({
    entityId: record.entityId,
    contentType: type,
    title: record.title,
    description: record.description,
    href: getCanonicalUrl(record),
    typeLabel: referenceTypeLabel(record),
    reviewStatus: record.reviewStatus,
    reviewStatusLabel:
      record.reviewStatus === "stale" ? "Нужна повторная проверка" : "Проверено",
    reviewedAt: record.reviewedAt,
    reviewedLabel: formatRussianDate(record.reviewedAt),
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
    purpose: record.description,
    boundary: record.type === "platform-area" ? record.mapBoundary : record.limitations,
    applicability: record.applicability,
    limitations: record.limitations,
    sources,
    primaryArea,
    parentComponent,
    parentComponentPrimaryAreaId,
    related,
    isSynthetic: record.type === "case" && record.caseKind === "synthetic"
  });

  return model;
}
