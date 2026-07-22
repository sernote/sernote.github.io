import { createElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "../../components/marketing/site-shell";
import { SheetContent, SheetDescription } from "../../components/ui/sheet";
import { getDictionary, getSiteConfig, getNavItems, type Locale } from "../../lib/i18n";
import type { V3Article, V3Project, V3Talk } from "../../lib/content-v3/schema";
import {
  articleMetadata,
  createPageMetadata,
  projectMetadata,
  talkMetadata,
  v3MarketingMetadata
} from "../../lib/metadata";
import {
  RU_PRIMARY_NAV,
  getActualAlternate,
  getCanonicalStaticRoutes,
  isActiveNavItem
} from "../../lib/site-routes";

type AnyElement = ReactElement<Record<string, unknown>>;

function collectElements(node: ReactNode): AnyElement[] {
  if (Array.isArray(node)) return node.flatMap(collectElements);
  if (!isValidElement(node)) return [];

  const element = node as AnyElement;
  return [element, ...collectElements(element.props.children as ReactNode)];
}

function collectText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (!isValidElement(node)) return "";
  return collectText((node as AnyElement).props.children as ReactNode);
}

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
      "/talks",
      "/talks/maas-vs-self-hosted",
      "/projects",
      "/projects/audit-prompt-caching",
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
      "/en/talks",
      "/en/projects",
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
  it("keeps the Blog index canonical-only", () => {
    const metadata = v3MarketingMetadata("blog");
    expect(metadata.title).toEqual({ absolute: "Блог — Сергей Нотевский" });
    expect(metadata.description).toBe(
      "Авторские разборы и короткие инженерные заметки о production AI-платформах. Внешние материалы ведут прямо на исходную площадку."
    );
    expect(metadata.alternates).toEqual({
      canonical: "https://notevskii.tech/blog"
    });
  });

  it.each([
    ["home", "Сергей Нотевский — AI Platform Lead"],
    ["blog", "Блог — Сергей Нотевский"],
    ["work", "Материалы — Сергей Нотевский"],
    ["talks", "Выступления — Сергей Нотевский"],
    ["projects", "Проекты — Сергей Нотевский"],
    ["about", "Обо мне — Сергей Нотевский"],
    ["contact", "Контакт — Сергей Нотевский"]
  ] as const)(
    "uses an absolute title for the %s page without changing social titles",
    (key, expectedTitle) => {
      const metadata = v3MarketingMetadata(key);

      expect(metadata.title).toEqual({ absolute: expectedTitle });
      expect(metadata.openGraph).toMatchObject({ title: expectedTitle });
      expect(metadata.twitter).toMatchObject({ title: expectedTitle });
    }
  );

  it("emits native article canonical, timestamps, and author metadata without hreflang", () => {
    const article: V3Article = {
      entityId: "ai-platform-before-gpu",
      type: "article",
      locale: "ru",
      kind: "native",
      slug: "ai-platform-before-gpu",
      title: "ИИ-платформа начинается не с GPU",
      description:
        "Почему для production-сценария сначала нужно определить правила работы с данными, критерии качества, SLO и владельцев, а уже потом выбирать модель и инфраструктуру.",
      excerpt:
        "Покупка ускорителей не превращает AI-демо в платформу. Сначала зафиксируйте сценарий, правила работы с данными, критерии качества, SLO и владельцев — затем выбирайте способ исполнения.",
      publicationStatus: "published",
      reviewStatus: "unreviewed",
      publishedAt: "2026-07-22",
      updatedAt: "2026-07-22",
      reviewedAt: null,
      reviewCycleDays: null,
      topics: ["ai-platform", "architecture", "ownership", "slo"],
      relations: {},
      sourceName: null,
      sourceUrl: null,
      supersedes: null,
      supersededBy: null
    };

    const metadata = articleMetadata(article);
    expect(metadata.alternates).toEqual({
      canonical: "https://notevskii.tech/blog/ai-platform-before-gpu"
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://notevskii.tech/blog/ai-platform-before-gpu",
      publishedTime: "2026-07-22",
      modifiedTime: "2026-07-22",
      authors: ["https://notevskii.tech/about"],
      tags: ["ai-platform", "architecture", "ownership", "slo"]
    });
    expect(metadata.authors).toEqual([
      {
        name: "Сергей Нотевский",
        url: "https://notevskii.tech/about"
      }
    ]);
    expect(metadata.alternates).not.toHaveProperty("languages");
  });

  it("emits canonical-only talk and project metadata from published local records", () => {
    const shared = {
      locale: "ru" as const,
      publicationStatus: "published" as const,
      reviewStatus: "unreviewed" as const,
      publishedAt: "2026-07-22",
      updatedAt: "2026-07-22",
      reviewedAt: null,
      reviewCycleDays: null,
      topics: ["ai-platform"],
      relations: {}
    };
    const talk: V3Talk = {
      ...shared,
      entityId: "maas-vs-self-hosted-roii",
      type: "talk",
      slug: "maas-vs-self-hosted",
      title: "Свои ИИ-модели или API по подписке?",
      description:
        "Доклад о выборе между внешним API и собственной моделью по качеству, SLO и ответственности.",
      venue: "РОИИ 2026 · день 1",
      eventDate: "2026-02-19",
      format: "talk",
      recordingUrl: "https://www.youtube.com/watch?v=RHbbeHKGh6I",
      recordingUploadedAt: "2026-02-22",
      abstract:
        "Как сравнить внешнее API и собственную модель по качеству, SLO и ответственности.",
      takeaways: [
        { label: "Качество", text: "Проверить качество.", timestampSeconds: 120 },
        { label: "SLO", text: "Задать SLO.", timestampSeconds: 240 },
        { label: "Ответственность", text: "Назначить владельца.", timestampSeconds: 360 }
      ],
      slidesUrl: null,
      thumbnail: null
    };
    const project: V3Project = {
      ...shared,
      entityId: "audit-prompt-caching",
      type: "project",
      slug: "audit-prompt-caching",
      title: "audit-prompt-caching",
      description:
        "Открытый skill и локальные скрипты для аудита prompt, prefix и KV cache.",
      repositoryUrl: "https://github.com/sernote/audit-prompt-caching",
      verifiedRelease: {
        version: "v0.1.3",
        publishedAt: "2026-07-20",
        url: "https://github.com/sernote/audit-prompt-caching/releases/tag/v0.1.3",
        verifiedAt: "2026-07-22"
      },
      audience: ["AI-инженеры"],
      quickStart:
        "npx skills add https://github.com/sernote/audit-prompt-caching --skill audit-prompt-caching",
      privacyBoundary: "Использовать очищенные или синтетические данные.",
      evidence: ["Публичный репозиторий"],
      supportBoundary: "Без заявленного support SLA."
    };

    expect(talkMetadata(talk).alternates).toEqual({
      canonical: "https://notevskii.tech/talks/maas-vs-self-hosted"
    });
    expect(projectMetadata(project).alternates).toEqual({
      canonical: "https://notevskii.tech/projects/audit-prompt-caching"
    });
    expect(talkMetadata(talk).authors).toEqual([
      { name: "Сергей Нотевский", url: "https://notevskii.tech/about" }
    ]);
    expect(projectMetadata(project).authors).toEqual([
      { name: "Сергей Нотевский", url: "https://notevskii.tech/about" }
    ]);
  });

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

  it("uses the reviewed Russian metadata copy verbatim", () => {
    expect(v3MarketingMetadata("home").description).toBe(
      "Личный сайт Сергея Нотевского: статьи, выступления, открытые проекты и практический справочник по production AI-платформам."
    );
    expect(v3MarketingMetadata("work").description).toBe(
      "Выступления, открытые инженерные проекты и внешние публикации Сергея Нотевского о production AI-платформах."
    );
    expect(v3MarketingMetadata("about").description).toBe(
      "Сергей Нотевский — AI Platform Lead в Битрикс24: инженерная практика и публичные материалы."
    );
    expect(v3MarketingMetadata("contact").description).toBe(
      "Связаться с Сергеем Нотевским по вопросам архитектуры ИИ-платформ, выступлений и открытых проектов."
    );
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

  it.each([
    ["ru", "Основные разделы сайта и контакты.", "Закрыть навигацию"],
    ["en", "Primary site sections and contact options.", "Close navigation"]
  ] as const)(
    "provides a real localized mobile-dialog description and close name for %s",
    (locale, expectedDescription, expectedCloseLabel) => {
      const tree = SiteHeader({ locale: locale as Locale, currentPath: locale === "ru" ? "/" : "/en" });
      const elements = collectElements(tree);
      const description = elements.find((element) => element.type === SheetDescription);
      const content = elements.find((element) => element.type === SheetContent);

      expect(getDictionary(locale).shell.navigationDescription).toBe(expectedDescription);
      expect(getDictionary(locale).shell.closeNavigation).toBe(expectedCloseLabel);
      expect(description?.props.children).toBe(expectedDescription);
      expect(description?.props.className).toContain("sr-only");
      expect(content?.props.closeLabel).toBe(expectedCloseLabel);
    }
  );

  it("keeps closeLabel out of Radix DialogContent while using it as the accessible name", () => {
    const render = (
      SheetContent as unknown as {
        render: (props: Record<string, unknown>, ref: null) => ReactNode;
      }
    ).render;
    const tree = render(
      {
        closeLabel: "Закрыть навигацию",
        children: createElement("p", null, "Содержимое")
      },
      null
    );
    const elements = collectElements(tree);

    expect(
      elements.some((element) => Object.hasOwn(element.props, "closeLabel"))
    ).toBe(false);
    expect(collectText(tree)).toContain("Закрыть навигацию");
  });
});
