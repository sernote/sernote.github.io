import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";

export function baseOptions(locale: Locale = "en"): BaseLayoutProps {
  const dictionary = getDictionary(locale);

  return {
    nav: {
      title: "Production AI Platform Handbook",
      url: localizedPath("/", locale)
    },
    links: [
      {
        text: dictionary.handbook.home,
        url: localizedPath("/", locale),
        active: "url"
      },
      {
        text: dictionary.handbook.tools,
        url: localizedPath("/tools/prefix-cache-auditor", locale),
        active: "nested-url"
      },
      {
        text: dictionary.handbook.writing,
        url: localizedPath("/writing", locale),
        active: "url"
      }
    ],
    searchToggle: {
      enabled: false
    },
    themeSwitch: {
      enabled: false
    }
  };
}
