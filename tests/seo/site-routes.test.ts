import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "../../components/marketing/site-shell";
import { getSiteConfig, getNavItems } from "../../lib/i18n";
import { createPageMetadata, v3MarketingMetadata } from "../../lib/metadata";
import {
  RU_PRIMARY_NAV,
  getActualAlternate,
  getCanonicalStaticRoutes,
  isActiveNavItem
} from "../../lib/site-routes";

describe("v3 site route policy", () => {
  it("defines the exact compact Russian primary navigation", () => {
    expect(RU_PRIMARY_NAV).toEqual([
      { label: "Блог", href: "/blog" },
      { label: "Материалы", href: "/work" },
      { label: "AI Platform", href: "/ai-platform" },
      { label: "Обо мне", href: "/about" }
    ]);
    expect(getNavItems("ru")).toEqual(RU_PRIMARY_NAV);
    const primaryHrefs: readonly string[] = RU_PRIMARY_NAV.map((item) => item.href);
    expect(primaryHrefs).not.toContain("/contact");
  });

  it("keeps only literal routes in the static inventory", () => {
    const routes = getCanonicalStaticRoutes();

    expect(routes).toEqual(
      expect.arrayContaining([
        "/",
        "/blog",
        "/work",
        "/talks",
        "/projects",
        "/ai-platform",
        "/ai-platform/map",
        "/about",
        "/contact",
        "/tools",
        "/tools/prefix-cache-auditor",
        "/writing",
        "/handbook",
        "/en",
        "/en/about",
        "/ru"
      ])
    );
    expect(routes.every((route) => !/[\[\]:*]/.test(route))).toBe(true);
    expect(routes).not.toContain("/blog/fumadocs-runtime-shape");
    expect(routes).not.toContain("/ai-platform/components/prefix-cache");
  });

  it("returns alternates only for explicitly equivalent route pairs", () => {
    expect(getActualAlternate("/about", "ru")).toBe("/en/about");
    expect(getActualAlternate("/en/about/", "en")).toBe("/about");

    for (const path of [
      "/blog",
      "/blog/fumadocs-runtime-shape",
      "/work",
      "/ai-platform",
      "/ai-platform/map",
      "/ai-platform/components/prefix-cache",
      "/handbook",
      "/handbook/platform-map",
      "/handbook/caching/prefix-cache"
    ]) {
      expect(getActualAlternate(path, "ru"), path).toBeNull();
    }

    for (const path of [
      "/en/writing",
      "/en/handbook",
      "/en/handbook/platform-map",
      "/en/handbook/caching/prefix-cache"
    ]) {
      expect(getActualAlternate(path, "en"), path).toBeNull();
    }

    expect(getActualAlternate("/ru/about", "ru")).toBeNull();
    expect(getActualAlternate("/unknown", "ru")).toBeNull();
  });

  it("matches navigation sections on path boundaries", () => {
    expect(isActiveNavItem("/blog", "/blog")).toBe(true);
    expect(isActiveNavItem("/blog/cache-shape", "/blog")).toBe(true);
    expect(isActiveNavItem("/blogroll", "/blog")).toBe(false);

    for (const path of ["/work", "/talks", "/talks/maas", "/projects/audit-cache"]) {
      expect(isActiveNavItem(path, "/work"), path).toBe(true);
    }
    expect(isActiveNavItem("/projects-archive", "/work")).toBe(false);

    expect(isActiveNavItem("/ai-platform/areas/inference", "/ai-platform")).toBe(true);
    expect(isActiveNavItem("/ai-platforms", "/ai-platform")).toBe(false);
  });

  it("treats the localized English home route as exact-only", () => {
    expect(isActiveNavItem("/en", "/en")).toBe(true);
    expect(isActiveNavItem("/en/about", "/en")).toBe(false);
  });
});

describe("personal master brand and metadata alternates", () => {
  it("uses the personal master brand in both locales", () => {
    expect(getSiteConfig("ru").name).toBe("Сергей Нотевский");
    expect(getSiteConfig("en").name).toBe("Sergei Notevskii");
    expect(getSiteConfig("ru").description).toMatch(/личн.*инженерн.*публикац/i);
    expect(getSiteConfig("ru").description).toMatch(/production AI platform/i);
  });

  it("emits canonical-only metadata unless an actual pair is supplied", () => {
    const canonicalOnly = createPageMetadata({
      locale: "ru",
      path: "/blog",
      title: "Блог",
      description: "Инженерные заметки"
    });
    expect(canonicalOnly.alternates).toEqual({
      canonical: "https://notevskii.tech/blog"
    });

    const paired = createPageMetadata({
      locale: "ru",
      path: "/about",
      alternatePath: "/en/about",
      title: "Обо мне",
      description: "Профессиональный контекст"
    });
    expect(paired.alternates).toEqual({
      canonical: "https://notevskii.tech/about",
      languages: {
        ru: "https://notevskii.tech/about",
        en: "https://notevskii.tech/en/about"
      }
    });
  });

  it("rejects supplied alternates that do not exactly match the route policy", () => {
    for (const [path, alternatePath] of [
      ["/blog", "/en/about"],
      ["/blog", ""],
      ["/about", "/en/about/"]
    ] as const) {
      expect(
        () =>
          createPageMetadata({
            locale: "ru",
            path,
            alternatePath,
            title: "Блог",
            description: "Инженерные заметки"
          }),
        alternatePath || "empty alternate"
      ).toThrow(/alternatePath.*does not match the locale route policy/i);
    }
  });

  it("treats null and undefined alternates as omitted", () => {
    for (const alternatePath of [null, undefined]) {
      const metadata = createPageMetadata({
        locale: "ru",
        path: "/about",
        alternatePath,
        title: "Обо мне",
        description: "Профессиональный контекст"
      });

      expect(metadata.alternates).toEqual({
        canonical: "https://notevskii.tech/about"
      });
    }
  });

  it.each([
    ["ru", "/", "/en"],
    ["en", "/", "/"],
    ["ru", "/about", "/en/about"],
    ["en", "/about", "/about"],
    ["ru", "/tools", "/en/tools"],
    ["en", "/tools", "/tools"]
  ] as const)("accepts the actual %s alternate for %s", (locale, path, alternatePath) => {
    expect(() =>
      createPageMetadata({
        locale,
        path,
        alternatePath,
        title: "Title",
        description: "Description"
      })
    ).not.toThrow();
  });

  it("keeps Materials canonical-only while pairing only real v3 translations", () => {
    expect(v3MarketingMetadata("work").alternates).toEqual({
      canonical: "https://notevskii.tech/work"
    });
    expect(v3MarketingMetadata("home").alternates).toEqual({
      canonical: "https://notevskii.tech",
      languages: {
        ru: "https://notevskii.tech",
        en: "https://notevskii.tech/en"
      }
    });
    expect(v3MarketingMetadata("about").alternates).toMatchObject({
      canonical: "https://notevskii.tech/about",
      languages: { en: "https://notevskii.tech/en/about" }
    });
    expect(v3MarketingMetadata("contact").alternates).toMatchObject({
      canonical: "https://notevskii.tech/contact",
      languages: { en: "https://notevskii.tech/en/contact" }
    });
  });
});

describe("site header active state", () => {
  it("marks the Contact utility as the current page", () => {
    const html = renderToStaticMarkup(
      createElement(SiteHeader, { locale: "ru", currentPath: "/contact" })
    );

    expect(html).toMatch(
      /<a(?=[^>]*href="\/contact")(?=[^>]*aria-current="page")[^>]*>/
    );
  });

  it("marks only About current in the English About header", () => {
    const html = renderToStaticMarkup(
      createElement(SiteHeader, { locale: "en", currentPath: "/en/about" })
    );
    const currentLinks = html.match(/<a\b[^>]*aria-current="page"[^>]*>/g) ?? [];

    expect(currentLinks).toHaveLength(1);
    expect(currentLinks[0]).toMatch(/\bhref="\/en\/about"/);
    expect(currentLinks[0]).not.toMatch(/\bhref="\/en"/);
  });
});
