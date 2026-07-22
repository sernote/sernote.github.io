import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContentListItem } from "../../components/marketing/content-list-item";
import { PageIntro } from "../../components/marketing/page-intro";
import {
  ContentDetailPage,
  EditorialMdxLink,
  type ContentDetailPageProps
} from "../../components/pages/content-detail-page";
import {
  AboutPageContent,
  BlogPageContent,
  ContactPageContent,
  HomePageContent,
  WorkPageContent
} from "../../components/pages/v3-marketing-pages";
import type {
  HomeViewModel,
  V3ListItemViewModel,
  WorkViewModel
} from "../../lib/content-v3/view-models";

const nativeArticle: V3ListItemViewModel = Object.freeze({
  entityId: "ai-platform-before-gpu",
  contentType: "article",
  title: "ИИ-платформа начинается не с GPU",
  description: "Сначала зафиксируйте контракт и ответственность.",
  meta: "Авторская статья",
  href: "/blog/ai-platform-before-gpu",
  linkKind: "internal"
});

const project: V3ListItemViewModel = Object.freeze({
  entityId: "audit-prompt-caching",
  contentType: "project",
  title: "audit-prompt-caching",
  description: "Локальный аудит формы запроса и cache telemetry.",
  meta: "Открытый проект · v0.1.3",
  href: "/projects/audit-prompt-caching",
  linkKind: "internal"
});

const platformArea: V3ListItemViewModel = Object.freeze({
  entityId: "inference-plane",
  contentType: "platform-area",
  title: "Inference Plane",
  description: "Serving, pools, scheduling, cache и workload boundaries.",
  meta: "Область AI Platform",
  href: "/ai-platform/areas/inference-plane",
  linkKind: "internal"
});

const talk: V3ListItemViewModel = Object.freeze({
  entityId: "maas-vs-self-hosted-roii",
  contentType: "talk",
  title: "Свои ИИ-модели или API по подписке?",
  description: "Как сравнить MaaS и self-hosted по качеству, SLO и ответственности.",
  meta: "ROИИ 2026, день 1",
  href: "/talks/maas-vs-self-hosted",
  linkKind: "internal"
});

const externalArticle: V3ListItemViewModel = Object.freeze({
  entityId: "short-prompt-not-cheap",
  contentType: "article",
  title: "Короткий промпт не значит дешёвый",
  description: "Почему динамический набор tools разрушает повторное использование префикса.",
  meta: "Хабр · внешний материал",
  href: "https://habr.com/ru/companies/bitrix/articles/1033822/",
  linkKind: "external"
});

const nativeBlogArticle = Object.freeze({
  ...nativeArticle,
  description:
    "Покупка ускорителей не превращает AI-демо в платформу. Сначала зафиксируйте сценарий, правила работы с данными, критерии качества, SLO и владельцев — затем выбирайте способ исполнения.",
  articleKind: "native" as const,
  sourceName: null,
  publishedAt: "2026-07-22",
  publishedLabel: "22 июля 2026 года"
});

const externalBlogArticle = Object.freeze({
  ...externalArticle,
  description:
    "Короткий запрос иногда обходится дороже длинного: в агентном цикле важны стабильность префикса, порядок tools и фактические cache-read сигналы.",
  articleKind: "external-note" as const,
  sourceName: "Хабр",
  publishedAt: "2026-05-12",
  publishedLabel: "12 мая 2026 года"
});

const blogModel = Object.freeze({
  items: Object.freeze([nativeBlogArticle, externalBlogArticle])
});

const TestableContentDetailPage = ContentDetailPage as ComponentType<
  Omit<ContentDetailPageProps, "children">
>;

const homeModel: HomeViewModel = Object.freeze({
  entrances: Object.freeze([
    Object.freeze({ id: "blog", index: "01", label: "Блог", description: "Статьи.", href: "/blog" }),
    Object.freeze({ id: "work", index: "02", label: "Материалы", description: "Публичная работа.", href: "/work" }),
    Object.freeze({ id: "ai-platform", index: "03", label: "AI Platform", description: "Reference.", href: "/ai-platform" })
  ]),
  featured: Object.freeze([
    Object.freeze({ surface: "blog", label: "Из блога", item: nativeArticle }),
    Object.freeze({ surface: "work", label: "Открытый проект", item: project }),
    Object.freeze({ surface: "ai-platform", label: "Из AI Platform", item: platformArea })
  ])
});

const workModel: WorkViewModel = Object.freeze({
  groups: Object.freeze([
    Object.freeze({ id: "talks", index: "01", title: "Выступление", description: "Запись и выжимка.", item: talk, indexHref: "/talks", indexLabel: "Все выступления" }),
    Object.freeze({ id: "projects", index: "02", title: "Открытый проект", description: "Инженерный артефакт.", item: project, indexHref: "/projects", indexLabel: "Все проекты" }),
    Object.freeze({ id: "writing", index: "03", title: "Внешняя публикация", description: "Исходная площадка.", item: externalArticle, indexHref: null, indexLabel: null })
  ])
});

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

describe("v3 editorial primitives", () => {
  it("renders a narrow page intro with one explicit heading", () => {
    const html = renderToStaticMarkup(
      createElement(PageIntro, {
        overline: "Материалы",
        title: "Публичная работа",
        lead: "Выступления, проекты и публикации."
      })
    );

    expect(count(html, /<h1\b/g)).toBe(1);
    expect(html).toContain("Материалы");
    expect(html).toContain("Публичная работа");
    expect(html).toContain("max-w-3xl");
  });

  it("keeps each list item a single full-row link and marks external destinations", () => {
    const internalHtml = renderToStaticMarkup(
      createElement(ContentListItem, { item: nativeArticle })
    );
    const externalHtml = renderToStaticMarkup(
      createElement(ContentListItem, { item: externalArticle })
    );

    expect(count(internalHtml, /<a\b/g)).toBe(1);
    expect(internalHtml).toContain('href="/blog/ai-platform-before-gpu"');
    expect(internalHtml).toContain('data-link-kind="internal"');
    expect(internalHtml).toContain("min-h-11");
    expect(internalHtml).toContain("grid-cols-[minmax(0,1fr)_2.75rem]");
    expect(externalHtml).toContain('data-link-kind="external"');
    expect(externalHtml).toContain('rel="noreferrer"');
    expect(externalHtml).toContain("Внешняя ссылка, откроется в новой вкладке");
  });
});

describe("v3 complete top-level personal pages", () => {
  it("renders the exact Blog index as two dated editorial rows in one active Blog main", () => {
    const html = renderToStaticMarkup(createElement(BlogPageContent, { model: blogModel }));

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /data-entity-id=/g)).toBe(2);
    expect(html).toContain("Блог");
    expect(html).toContain("Статьи и заметки");
    expect(html).toContain(
      "Авторские разборы и короткие инженерные заметки о production AI-платформах. Внешние материалы ведут прямо на исходную площадку."
    );
    expect(html).toContain("Авторская статья");
    expect(html).toContain("22 июля 2026 года");
    expect(html).toContain("Хабр · внешний материал");
    expect(html).toContain("12 мая 2026 года");
    expect(html).toContain(nativeBlogArticle.description);
    expect(html).toContain(externalBlogArticle.description);
    expect(html).toMatch(
      /<a(?=[^>]*href="\/blog")(?=[^>]*aria-current="page")[^>]*>/
    );
    expect(html).toMatch(
      /<a(?=[^>]*href="https:\/\/habr\.com\/ru\/companies\/bitrix\/articles\/1033822\/")(?=[^>]*target="_blank")(?=[^>]*rel="noreferrer")[^>]*>/
    );
    expect(html).toContain("Внешняя ссылка, откроется в новой вкладке");
    expect(html).not.toContain('href="/blog/short-prompt-not-cheap"');
  });

  it("renders the author first and all three entrances in one main", () => {
    const html = renderToStaticMarkup(
      createElement(HomePageContent, { model: homeModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(html).toContain("AI Platform Lead в Битрикс24");
    expect(html).not.toContain("AI PLATFORM LEAD · БИТРИКС24");
    expect(html).toContain("Сергей Нотевский");
    expect(html).toContain(
      "Проектирую production AI-платформы: от выбора пути исполнения и собственного инференса до качества, стоимости и эксплуатации."
    );
    for (const href of ["/blog", "/work", "/ai-platform"]) {
      expect(html).toContain(`href="${href}"`);
    }
    for (const entityId of [
      "ai-platform-before-gpu",
      "audit-prompt-caching",
      "inference-plane"
    ]) {
      expect(html).toContain(`data-entity-id="${entityId}"`);
    }
    for (const label of ["Из блога", "Открытый проект", "Из AI Platform"]) {
      expect(html).toContain(`>${label}<`);
    }
    for (const copy of [
      "Главное",
      "По одному материалу из каждого раздела",
      "Границы платформы, control plane, путь исполнения и контракты с продуктовыми командами.",
      "MaaS, self-hosted и гибридные схемы: запуск моделей, наблюдаемость и эксплуатационные решения.",
      "Оценка качества, релизный контроль, стоимость сценария и понятное распределение ответственности.",
      "Начать разговор"
    ]) {
      expect(html).toContain(copy);
    }
    expect(html).not.toContain("Production AI Platform Handbook");
  });

  it("renders Materials as three consecutive groups without a fake writing index", () => {
    const html = renderToStaticMarkup(
      createElement(WorkPageContent, { model: workModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(html.indexOf('data-group-id="talks"')).toBeLessThan(
      html.indexOf('data-group-id="projects"')
    );
    expect(html.indexOf('data-group-id="projects"')).toBeLessThan(
      html.indexOf('data-group-id="writing"')
    );
    expect(html).toContain('href="/talks"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="https://habr.com/ru/companies/bitrix/articles/1033822/"');
    expect(html).toContain(
      "Выступления, открытые проекты и внешние публикации о production AI-платформах — по одному выбранному материалу в каждом формате."
    );
    expect(html).not.toContain('href="/writing"');
  });

  it("renders About with three work areas and compact public channels", () => {
    const html = renderToStaticMarkup(createElement(AboutPageContent));

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /data-work-area=/g)).toBe(3);
    expect(html).toContain(
      "AI Platform Lead в Битрикс24. Работаю с архитектурой, инференсом, качеством и эксплуатацией production AI-платформ."
    );
    expect(html).not.toContain("Bitrix24");
    for (const copy of [
      "Архитектура платформы",
      "Работаю с MaaS, self-hosted и гибридными схемами: инференсом, кешем, планированием мощности и наблюдаемостью.",
      "Качество, экономика и ответственность",
      "Связываю оценку качества, релизный контроль, стоимость и ответственность в единый эксплуатационный контур."
    ]) {
      expect(html).toContain(copy);
    }
    expect(html).toContain("Редакционные принципы");
    for (const channel of ["Telegram", "Habr", "GitHub"]) {
      expect(html).toContain(channel);
    }
    expect(count(html, /Внешняя ссылка, откроется в новой вкладке/g)).toBeGreaterThanOrEqual(3);
  });

  it("renders Contact with Telegram as the only primary action and four contexts", () => {
    const html = renderToStaticMarkup(createElement(ContactPageContent));

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /data-contact-context=/g)).toBe(4);
    expect(count(html, /data-primary-action=/g)).toBe(1);
    expect(html).toContain('href="https://t.me/sergeinotevskii"');
    for (const copy of [
      "Напишите в Telegram и сразу обозначьте задачу. Ниже — четыре повода для разговора.",
      "С чем можно обратиться",
      "Сравнить MaaS, self-hosted и гибридный подход, определить ответственность команды и ближайшие решения.",
      "Обсудить доклад, подкаст или технический разбор о production AI-платформах.",
      "Совместный публичный проект",
      "Внешняя ссылка, откроется в новой вкладке"
    ]) {
      expect(html).toContain(copy);
    }
    expect(html).not.toMatch(/<form\b/);
    expect(html).not.toMatch(/availability|отвечу в течение/i);
  });
});

describe("v3 reusable content detail page", () => {
  it("renders one author-led article with media, actions, next step, and quiet contact", () => {
    const html = renderToStaticMarkup(
      createElement(
        TestableContentDetailPage,
        {
          currentPath: "/blog/ai-platform-before-gpu",
          overline: "Авторская статья",
          title: "ИИ-платформа начинается не с GPU",
          deck:
            "Почему для production-сценария сначала нужно определить правила работы с данными, критерии качества, SLO и владельцев, а уже потом выбирать модель и инфраструктуру.",
          author: { name: "Сергей Нотевский", href: "/about" },
          publishedAt: "2026-07-22",
          updatedAt: "2026-07-22",
          media: createElement("figure", { "data-detail-media": true }, "Превью материала"),
          primaryAction: {
            label: "Открыть запись",
            href: "https://example.com/recording",
            external: true
          },
          afterContent: createElement(
            "section",
            { "data-after-content": true },
            createElement("p", null, "AI Platform"),
            createElement("h2", null, "Продолжить в AI Platform"),
            createElement("a", { href: "/ai-platform" }, "Открыть AI Platform")
          ),
          contact: {
            context: "Вопрос или предложение по материалу",
            label: "Связаться с Сергеем"
          }
        },
        createElement("p", null, "Тело материала")
      )
    );
    const visibleText = html.replace(/<[^>]+>/g, "");

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<article\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(visibleText).toContain("Автор — Сергей Нотевский");
    expect(html).toContain('href="/about"');
    expect(visibleText).toContain("Опубликовано 22 июля 2026 года");
    expect(html).toContain('<time dateTime="2026-07-22">22 июля 2026 года</time>');
    expect(visibleText).not.toContain("Обновлено");
    expect(html).toContain("Превью материала");
    expect(html).toMatch(
      /<a(?=[^>]*href="https:\/\/example\.com\/recording")(?=[^>]*target="_blank")(?=[^>]*rel="noreferrer")[^>]*>/
    );
    expect(html).toContain("Продолжить в AI Platform");
    expect(html).toContain('href="/ai-platform"');
    expect(html).toContain("Вопрос или предложение по материалу");
    expect(html).toContain('href="/contact"');
    expect(html).toContain("Связаться с Сергеем");
    expect(html).toContain("Тело материала");
  });

  it("shows a semantic updated date only when it differs from publication", () => {
    const html = renderToStaticMarkup(
      createElement(
        TestableContentDetailPage,
        {
          currentPath: "/blog/ai-platform-before-gpu",
          overline: "Авторская статья",
          title: "ИИ-платформа начинается не с GPU",
          deck: "Проверяемая редакционная вводная для материала.",
          author: { name: "Сергей Нотевский", href: "/about" },
          publishedAt: "2026-07-22",
          updatedAt: "2026-08-03",
          contact: {
            context: "Вопрос или предложение по материалу",
            label: "Связаться с Сергеем"
          }
        },
        createElement("p", null, "Тело материала")
      )
    );
    const visibleText = html.replace(/<[^>]+>/g, "");

    expect(visibleText).toContain("Обновлено 3 августа 2026 года");
    expect(html).toContain('<time dateTime="2026-08-03">3 августа 2026 года</time>');
  });

  it("marks external MDX links visibly and accessibly without changing internal links", () => {
    const externalHtml = renderToStaticMarkup(
      createElement(
        EditorialMdxLink,
        { href: "https://www.nist.gov/itl/ai-risk-management-framework" },
        "NIST AI Risk Management Framework"
      )
    );
    const internalHtml = renderToStaticMarkup(
      createElement(EditorialMdxLink, { href: "/ai-platform/map" }, "Карта AI Platform")
    );

    expect(externalHtml).toContain('target="_blank"');
    expect(externalHtml).toContain('rel="noreferrer"');
    expect(externalHtml).toMatch(
      /<svg(?=[^>]*data-external-cue="true")(?=[^>]*class="[^"]*lucide-arrow-up-right[^"]*")(?=[^>]*aria-hidden="true")[^>]*>/
    );
    expect(externalHtml).toMatch(
      /class="[^"]*\binline\b[^"]*\balign-\[-0\.125em\][^"]*\bno-underline\b[^"]*"/
    );
    expect(externalHtml).not.toContain("↗");
    expect(externalHtml).toContain("Внешняя ссылка, откроется в новой вкладке");
    expect(internalHtml).not.toContain('target="_blank"');
    expect(internalHtml).not.toContain("Внешняя ссылка, откроется в новой вкладке");
  });
});

describe("v3 Blog route contract", () => {
  it("keeps the Blog index as a thin source-backed server composition", () => {
    const routePath = join(process.cwd(), "app/(en)/blog/page.tsx");

    expect(existsSync(routePath)).toBe(true);
    if (!existsSync(routePath)) return;

    const routeText = readFileSync(routePath, "utf8");
    expect(routeText).toContain("BlogPageContent");
    expect(routeText).toContain("getBlogViewModel(v3Source)");
    expect(routeText).toContain('v3MarketingMetadata("blog")');
    expect(routeText).not.toContain("short-prompt-not-cheap");
  });

  it("keeps static params source-backed and rejects non-native local detail routes", () => {
    const routePath = join(process.cwd(), "app/(en)/blog/[slug]/page.tsx");

    expect(existsSync(routePath)).toBe(true);
    if (!existsSync(routePath)) return;

    const routeText = readFileSync(routePath, "utf8");
    expect(routeText).toMatch(/export const dynamicParams = false/);
    expect(routeText).toContain('v3Source.generateParams("article", "ru")');
    expect(routeText).toContain('v3Source.getBySlug("article", slug, "ru")');
    expect(routeText).toMatch(
      /record === null \|\| record\.type !== "article" \|\| record\.kind !== "native"/
    );
    expect(routeText).toContain("notFound()");
    expect(routeText).toContain("DocsBody");
    expect(routeText).toContain("EditorialMdxLink");
    expect(routeText).toContain('overline="Авторская статья"');
    expect(routeText).toContain('name: "Сергей Нотевский"');
    expect(routeText).toContain('href: "/about"');
    expect(routeText).toContain("Продолжить в AI Platform");
    expect(routeText).toContain(
      "Карта областей и практический reference по построению production AI platform: от стратегии и control plane до инференса, качества, стоимости и эксплуатации."
    );
    expect(routeText).toContain('href="/ai-platform"');
    expect(routeText).toContain("Открыть AI Platform");
    expect(routeText).toContain("Вопрос или предложение по материалу");
    expect(routeText).toContain("Связаться с Сергеем");
    expect(routeText).not.toContain("DocsPage");
    expect(routeText).not.toContain("dangerouslySetInnerHTML");
    expect(routeText).not.toContain("short-prompt-not-cheap");
    expect(routeText).not.toContain("habr.com/ru/companies/bitrix/articles/1033822");
  });
});
