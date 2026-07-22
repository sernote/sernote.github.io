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
}>;

export type HomeViewModel = Readonly<{
  entrances: readonly Readonly<{
    id: "blog" | "work" | "ai-platform";
    index: string;
    label: string;
    description: string;
    href: string;
  }>[];
  featured: readonly Readonly<{
    surface: "blog" | "work" | "ai-platform";
    label: string;
    item: V3ListItemViewModel;
  }>[];
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
    sourceName: string | null;
    publishedAt: string;
    publishedLabel: string;
  }>;

export type BlogViewModel = Readonly<{
  items: readonly BlogListItemViewModel[];
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
    id: "work",
    index: "02",
    label: "Материалы",
    description: "Выступления, открытые проекты и публикации.",
    href: "/work"
  }),
  Object.freeze({
    id: "ai-platform",
    index: "03",
    label: "AI Platform",
    description: "Карта и практический reference по production AI platform.",
    href: "/ai-platform"
  })
]);

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
  return Object.freeze({
    entityId: record.entityId,
    contentType: record.type,
    title: record.title,
    description: record.description,
    meta: metaFor(record),
    href: getCanonicalUrl(record),
    linkKind:
      record.type === "article" && record.kind === "external-note" ? "external" : "internal"
  });
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

export function getHomeViewModel(source: V3Source): HomeViewModel {
  const featured: HomeViewModel["featured"] = Object.freeze([
    Object.freeze({
      surface: "blog",
      label: "Из блога",
      item: selectFeatured(source, "article", "ai-platform-before-gpu")
    }),
    Object.freeze({
      surface: "work",
      label: "Открытый проект",
      item: selectFeatured(source, "project", "audit-prompt-caching")
    }),
    Object.freeze({
      surface: "ai-platform",
      label: "Из AI Platform",
      item: selectFeatured(source, "platform-area", "inference-plane")
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
      item: selectFeatured(source, "article", "short-prompt-not-cheap"),
      indexHref: null,
      indexLabel: null
    })
  ]);

  return Object.freeze({ groups });
}

export function getBlogViewModel(source: V3Source): BlogViewModel {
  const items = Object.freeze(
    source.listPublic("article", "ru").map((record): BlogListItemViewModel => {
      if (record.type !== "article" || record.publishedAt === null) {
        throw new Error(`Blog record ${record.entityId} is not a published article`);
      }

      return Object.freeze({
        ...normalizeListItem(record),
        description: record.excerpt,
        articleKind: record.kind,
        sourceName: record.sourceName,
        publishedAt: record.publishedAt,
        publishedLabel: formatRussianDate(record.publishedAt)
      });
    })
  );

  return Object.freeze({ items });
}
