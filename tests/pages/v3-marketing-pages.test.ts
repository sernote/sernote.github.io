import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { EditorialMdxLink } from "../../components/editorial/mdx-link";
import { ContentListItem } from "../../components/marketing/content-list-item";
import { PageIntro } from "../../components/marketing/page-intro";
import {
  AboutPageContent,
  BlogPageContent,
  ContactPageContent,
  ProjectsPageContent,
  TalksPageContent,
  WorkPageContent
} from "../../components/pages/v3-marketing-pages";
import type {
  ProjectsViewModel,
  TalksViewModel,
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

const workModel: WorkViewModel = Object.freeze({
  groups: Object.freeze([
    Object.freeze({ id: "talks", index: "01", title: "Выступление", description: "Запись и выжимка.", item: talk, indexHref: "/talks", indexLabel: "Все выступления" }),
    Object.freeze({ id: "projects", index: "02", title: "Открытый проект", description: "Инженерный артефакт.", item: project, indexHref: "/projects", indexLabel: "Все проекты" }),
    Object.freeze({ id: "writing", index: "03", title: "Внешняя публикация", description: "Исходная площадка.", item: externalArticle, indexHref: null, indexLabel: null })
  ])
});

const talksModel: TalksViewModel = Object.freeze({
  items: Object.freeze([
    Object.freeze({
      ...talk,
      description:
        "Как разложить выбор между внешним API и собственной моделью на требования к качеству, SLO, загрузке, инженерной поддержке, контексту и лицензии.",
      eyebrow: "ROИИ 2026 · 19 февраля 2026 года"
    })
  ])
});

const projectsModel: ProjectsViewModel = Object.freeze({
  items: Object.freeze([
    Object.freeze({
      ...project,
      description:
        "Открытый Codex skill и набор локальных скриптов, которые помогают искать вероятные причины промахов prompt, prefix и KV cache и собирать доказательства.",
      eyebrow: "Открытый проект · v0.1.3"
    })
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

  it("renders Talks as one ruled source-backed row with a quiet Telegram continuation", () => {
    const html = renderToStaticMarkup(
      createElement(TalksPageContent, { model: talksModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /data-entity-id=/g)).toBe(1);
    expect(html).toContain("Выступления");
    expect(html).toContain("Доклады и разговоры");
    expect(html).toContain(
      "Записи выступлений о production AI-платформах с краткими выжимками, таймкодами и ссылками на связанные материалы."
    );
    expect(html).toContain("ROИИ 2026 · 19 февраля 2026 года");
    expect(html).toContain("Свои ИИ-модели или API по подписке?");
    expect(html).toContain(talksModel.items[0].description);
    expect(html).toMatch(
      /<a(?=[^>]*href="\/materials")(?=[^>]*aria-current="page")[^>]*>/
    );
    expect(html).toMatch(
      /<a(?=[^>]*href="https:\/\/t\.me\/s\/sergeinotevskii")(?=[^>]*target="_blank")(?=[^>]*rel="noreferrer")[^>]*>/
    );
    expect(html).not.toContain("2RvzgMYrX0o");
    expect(html).not.toContain("NrvGciRm8Ps");
  });

  it("renders Projects as one ruled source-backed row without live popularity metrics", () => {
    const html = renderToStaticMarkup(
      createElement(ProjectsPageContent, { model: projectsModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /data-entity-id=/g)).toBe(1);
    expect(html).toContain("Projects");
    expect(html).toContain("Открытые инженерные проекты");
    expect(html).toContain("audit-prompt-caching");
    expect(html).toContain("Открытый проект · v0.1.3");
    expect(html).toContain(projectsModel.items[0].description);
    expect(html).toMatch(
      /<a(?=[^>]*href="\/materials")(?=[^>]*aria-current="page")[^>]*>/
    );
    expect(html).not.toMatch(/\b(?:stars?|forks?)\b/i);
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

describe("editorial MDX link", () => {
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
    expect(routeText).toContain("V31ContentDetailPage");
    expect(routeText).toContain('authorHref="/about"');
    expect(routeText).toContain('kindLabel={isNote ? "Короткая заметка" : "Статья"}');
    expect(routeText).toMatch(/v3Source\s*\.getRelatedForPage\(record, 3\)/);
    expect(routeText).toContain('contactLabel="Обсудить материал"');
    expect(routeText).not.toContain("DocsPage");
    expect(routeText).not.toContain("dangerouslySetInnerHTML");
    expect(routeText).not.toContain("short-prompt-not-cheap");
    expect(routeText).not.toContain("habr.com/ru/companies/bitrix/articles/1033822");
  });
});

describe("v3 Talks and Projects route contract", () => {
  it.each(["talks", "projects"] as const)("keeps the %s index as an alias to Materials", (segment) => {
    const routePath = join(process.cwd(), `app/(en)/${segment}/page.tsx`);
    const routeText = readFileSync(routePath, "utf8");

    expect(routeText).toContain("StaticAliasBody");
    expect(routeText).toContain("EditorialShell");
    expect(routeText).toContain('const DESTINATION = "/materials"');
    expect(routeText).toContain('staticAliasMetadata(DESTINATION, "ru")');
    expect(routeText).toContain("destination={DESTINATION}");
  });

  it.each([
    [
      "talks",
      "maas-vs-self-hosted",
      "talk",
      "talkMetadata",
      "Смотреть запись"
    ],
    [
      "projects",
      "audit-prompt-caching",
      "project",
      "projectMetadata",
      "Открыть на GitHub"
    ]
  ] as const)(
    "builds the %s exemplar from source-generated params",
    (segment, slug, contentType, metadataBuilder, primaryAction) => {
      const routePath = join(process.cwd(), `app/(en)/${segment}/[slug]/page.tsx`);

      expect(existsSync(routePath)).toBe(true);
      if (!existsSync(routePath)) return;

      const routeText = readFileSync(routePath, "utf8");
      expect(routeText).toContain("export const dynamicParams = false");
      expect(routeText).toContain(`v3Source.generateParams("${contentType}", "ru")`);
      expect(routeText).toContain(`v3Source.getBySlug("${contentType}", slug, "ru")`);
      expect(routeText).toContain("notFound()");
      expect(routeText).toContain(metadataBuilder);
      expect(routeText).toContain("V31ContentDetailPage");
      expect(routeText).toContain("DocsBody");
      expect(routeText).toContain("EditorialMdxLink");
      expect(routeText).toContain(primaryAction);
      expect(routeText).toMatch(/v3Source\s*\.getRelatedForPage\(record, 3\)/);
      expect(routeText).toContain('authorHref="/about"');
    }
  );
});
