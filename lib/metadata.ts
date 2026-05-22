import type { Metadata } from "next";

import { getDictionary, getSiteConfig, localizedPath, type Locale } from "@/lib/i18n";

type PageKey = keyof ReturnType<typeof getDictionary>["pages"];
type ToolKey = "prefix" | "cost" | "quality";

function absoluteUrl(locale: Locale, path: string) {
  const siteConfig = getSiteConfig(locale);
  return `${siteConfig.url}${localizedPath(path, locale) === "/" ? "" : localizedPath(path, locale)}`;
}

export function createPageMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const siteConfig = getSiteConfig(locale);
  const canonical = absoluteUrl(locale, path);
  const alternatePath = locale === "en" ? path.replace(/^\/en(?=\/|$)/, "") || "/" : path;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ru: absoluteUrl("ru", alternatePath),
        en: absoluteUrl("en", alternatePath)
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const title = locale === "ru" ? "Sergei Notevskii - AI Platform Lead" : "Sergei Notevskii - AI Platform Lead";

  return createPageMetadata({
    locale,
    path: "/",
    title,
    description: dictionary.home.hero.copy
  });
}

export function marketingMetadata(locale: Locale, key: PageKey): Metadata {
  const page = getDictionary(locale).pages[key];

  return createPageMetadata({
    locale,
    path: `/${key}`,
    title: page.title,
    description: page.copy
  });
}

export function toolsIndexMetadata(locale: Locale): Metadata {
  return createPageMetadata({
    locale,
    path: "/tools",
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
    title: page.title,
    description: page.copy
  });
}
