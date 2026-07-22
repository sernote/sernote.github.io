import type { Metadata } from "next";

import { getCanonicalUrl } from "@/lib/content-v3/registry";
import type {
  V3Article,
  V3Case,
  V3PlatformArea,
  V3PlatformComponent,
  V3Project,
  V3Talk
} from "@/lib/content-v3/schema";
import { getDictionary, getSiteConfig, localizedPath, type Locale } from "@/lib/i18n";
import { canonicalUrl, publicFileUrl } from "@/lib/seo/urls";
import { getActualAlternate } from "@/lib/site-routes";

type PageKey = keyof ReturnType<typeof getDictionary>["pages"];
type ToolKey = "prefix" | "cost" | "quality";
type V3MarketingPageKey =
  | "home"
  | "blog"
  | "work"
  | "talks"
  | "projects"
  | "aiPlatform"
  | "aiPlatformMap"
  | "about"
  | "contact";

function absoluteUrl(locale: Locale, path: string) {
  return canonicalUrl(localizedPath(path, locale));
}

const OG_IMAGE = {
  url: publicFileUrl("/og-image.svg"),
  width: 1200,
  height: 630,
  alt: "Сергей Нотевский — production AI platforms"
};

const V3_RU_MARKETING_PAGES = {
  home: {
    path: "/",
    alternatePath: "/en",
    title: "Сергей Нотевский — AI Platform Lead",
    description:
      "Личный сайт Сергея Нотевского: статьи, выступления, открытые проекты и практический справочник по production AI-платформам."
  },
  blog: {
    path: "/blog",
    alternatePath: null,
    title: "Блог — Сергей Нотевский",
    description:
      "Авторские разборы и короткие инженерные заметки о production AI-платформах. Внешние материалы ведут прямо на исходную площадку."
  },
  work: {
    path: "/work",
    alternatePath: null,
    title: "Материалы — Сергей Нотевский",
    description:
      "Выступления, открытые инженерные проекты и внешние публикации Сергея Нотевского о production AI-платформах."
  },
  talks: {
    path: "/talks",
    alternatePath: null,
    title: "Выступления — Сергей Нотевский",
    description:
      "Записи выступлений Сергея Нотевского о production AI-платформах с краткими выжимками, таймкодами и связанными материалами."
  },
  projects: {
    path: "/projects",
    alternatePath: null,
    title: "Проекты — Сергей Нотевский",
    description:
      "Открытые инженерные проекты Сергея Нотевского для диагностики и эксплуатации production AI-платформ."
  },
  aiPlatform: {
    path: "/ai-platform",
    alternatePath: null,
    title: "AI Platform — Сергей Нотевский",
    description:
      "Карта ответственности и практический reference Сергея Нотевского по построению production AI-платформ."
  },
  aiPlatformMap: {
    path: "/ai-platform/map",
    alternatePath: null,
    title: "Карта AI Platform — Сергей Нотевский",
    description:
      "Семь областей ответственности production AI-платформы: назначение, границы, связи и честный статус материалов."
  },
  about: {
    path: "/about",
    alternatePath: "/en/about",
    title: "Обо мне — Сергей Нотевский",
    description:
      "Сергей Нотевский — AI Platform Lead в Битрикс24: инженерная практика и публичные материалы."
  },
  contact: {
    path: "/contact",
    alternatePath: "/en/contact",
    title: "Контакт — Сергей Нотевский",
    description:
      "Связаться с Сергеем Нотевским по вопросам архитектуры ИИ-платформ, выступлений и открытых проектов."
  }
} as const satisfies Record<
  V3MarketingPageKey,
  { path: string; alternatePath: string | null; title: string; description: string }
>;

export function createPageMetadata({
  locale,
  path,
  alternatePath,
  title,
  description
}: {
  locale: Locale;
  path: string;
  alternatePath?: string | null;
  title: string;
  description: string;
}): Metadata {
  const siteConfig = getSiteConfig(locale);
  const canonical = absoluteUrl(locale, path);
  const alternateLocale = locale === "ru" ? "en" : "ru";
  let alternateUrl: string | null = null;

  if (alternatePath !== null && alternatePath !== undefined) {
    const currentPath = localizedPath(path, locale);
    const expectedAlternate = getActualAlternate(currentPath, locale);

    if (alternatePath !== expectedAlternate) {
      throw new Error(
        `alternatePath ${JSON.stringify(alternatePath)} does not match the locale route policy for ${currentPath}`
      );
    }

    alternateUrl = canonicalUrl(alternatePath);
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(alternateUrl
        ? {
            languages: {
              [locale]: canonical,
              [alternateLocale]: alternateUrl
            }
          }
        : {})
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url]
    }
  };
}

export function v3MarketingMetadata(key: V3MarketingPageKey): Metadata {
  const page = V3_RU_MARKETING_PAGES[key];
  if (page === undefined) {
    throw new Error(`Unknown v3 marketing page: ${String(key)}`);
  }

  return {
    ...createPageMetadata({ locale: "ru", ...page }),
    title: { absolute: page.title }
  };
}

export function articleMetadata(article: V3Article): Metadata {
  if (
    article.kind !== "native" ||
    article.slug === null ||
    article.publicationStatus !== "published" ||
    article.publishedAt === null
  ) {
    throw new Error(`Article metadata requires a published native article: ${article.entityId}`);
  }

  const canonicalPath = getCanonicalUrl(article);
  const unprefixedPath =
    article.locale === "en" ? canonicalPath.replace(/^\/en(?=\/|$)/, "") || "/" : canonicalPath;
  const baseMetadata = createPageMetadata({
    locale: article.locale,
    path: unprefixedPath,
    alternatePath: null,
    title: article.title,
    description: article.description
  });
  const authorUrl = absoluteUrl(article.locale, "/about");

  return {
    ...baseMetadata,
    authors: [{ name: "Сергей Нотевский", url: authorUrl }],
    keywords: article.topics,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [authorUrl],
      tags: article.topics
    }
  };
}

function localEditorialMetadata(
  record: V3Talk | V3Project,
  expectedType: "talk" | "project"
): Metadata {
  if (
    record.type !== expectedType ||
    record.publicationStatus !== "published" ||
    record.publishedAt === null
  ) {
    throw new Error(
      `${expectedType} metadata requires a published local record: ${record.entityId}`
    );
  }

  const canonicalPath = getCanonicalUrl(record);
  const unprefixedPath =
    record.locale === "en"
      ? canonicalPath.replace(/^\/en(?=\/|$)/, "") || "/"
      : canonicalPath;
  const metadata = createPageMetadata({
    locale: record.locale,
    path: unprefixedPath,
    alternatePath: null,
    title: record.title,
    description: record.description
  });

  return {
    ...metadata,
    authors: [
      {
        name: "Сергей Нотевский",
        url: absoluteUrl(record.locale, "/about")
      }
    ],
    keywords: record.topics
  };
}

export function talkMetadata(talk: V3Talk): Metadata {
  return localEditorialMetadata(talk, "talk");
}

export function projectMetadata(project: V3Project): Metadata {
  return localEditorialMetadata(project, "project");
}

type V3Reference = V3PlatformArea | V3PlatformComponent | V3Case;

export function referenceMetadata(record: V3Reference): Metadata {
  if (
    record.publicationStatus !== "published" ||
    (record.reviewStatus !== "reviewed" && record.reviewStatus !== "stale") ||
    record.publishedAt === null ||
    record.reviewedAt === null
  ) {
    throw new Error(`Reference metadata requires a published reviewed record: ${record.entityId}`);
  }

  const canonicalPath = getCanonicalUrl(record);
  const unprefixedPath =
    record.locale === "en"
      ? canonicalPath.replace(/^\/en(?=\/|$)/, "") || "/"
      : canonicalPath;
  const title = `${record.title} — AI Platform`;
  const metadata = createPageMetadata({
    locale: record.locale,
    path: unprefixedPath,
    alternatePath: null,
    title,
    description: record.description
  });

  return {
    ...metadata,
    title: { absolute: title },
    authors: [
      {
        name: "Сергей Нотевский",
        url: absoluteUrl(record.locale, "/about")
      }
    ],
    keywords: record.topics
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const title = locale === "ru" ? "Сергей Нотевский - AI Platform Lead" : "Sergei Notevskii - AI Platform Lead";
  const path = "/";

  return createPageMetadata({
    locale,
    path,
    alternatePath: getActualAlternate(localizedPath(path, locale), locale),
    title,
    description: dictionary.home.hero.copy
  });
}

export function marketingMetadata(locale: Locale, key: PageKey): Metadata {
  const page = getDictionary(locale).pages[key];
  const path = `/${key}`;

  return createPageMetadata({
    locale,
    path,
    alternatePath: getActualAlternate(localizedPath(path, locale), locale),
    title: page.title,
    description: page.copy
  });
}

export function toolsIndexMetadata(locale: Locale): Metadata {
  const path = "/tools";

  return createPageMetadata({
    locale,
    path,
    alternatePath: getActualAlternate(localizedPath(path, locale), locale),
    title: locale === "ru" ? "Инструменты" : "Tools",
    description:
      locale === "ru"
        ? "Локальные инструменты для проверки кеша, стоимости и готовности ИИ-сценариев к выкатке."
        : "Client-side tools for cache, cost and rollout readiness in production AI platform work."
  });
}

export function toolMetadata(locale: Locale, key: ToolKey, path: string): Metadata {
  const page = getDictionary(locale).tools[key];

  return createPageMetadata({
    locale,
    path,
    alternatePath: getActualAlternate(localizedPath(path, locale), locale),
    title: page.title,
    description: page.copy
  });
}
