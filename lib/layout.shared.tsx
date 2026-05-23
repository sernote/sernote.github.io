import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { getNavItems, getSiteConfig, localizedPath, type Locale } from "@/lib/i18n";

export function baseOptions(locale: Locale = "en"): BaseLayoutProps {
  const navItems = getNavItems(locale);
  const siteConfig = getSiteConfig(locale);

  return {
    nav: {
      title: siteConfig.author,
      url: localizedPath("/", locale)
    },
    links: navItems.map((item) => ({
      text: item.label,
      url: item.href,
      active: item.href === localizedPath("/", locale) ? "url" : "nested-url"
    })),
    searchToggle: {
      enabled: false
    },
    themeSwitch: {
      enabled: false
    }
  };
}
