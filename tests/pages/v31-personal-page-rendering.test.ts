import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  AboutPageContent,
  BlogPageContent,
  HomePageContent,
  MaterialsPageContent
} from "../../components/pages/v31-personal-pages";
import { V31ContentDetailPage } from "../../components/pages/v31-content-detail-page";
import { AUTHOR_PROFILE } from "../../lib/author-profile";
import type {
  AboutViewModel,
  BlogViewModel,
  HomeViewModel,
  MaterialsViewModel
} from "../../lib/content-v3/view-models";

const listItem = (entityId: string, title: string, href: string) => ({
  entityId,
  contentType: "article" as const,
  title,
  description: `Описание ${title}`,
  meta: "Авторская статья",
  href,
  linkKind: "internal" as const
});

const homeModel: HomeViewModel = {
  entrances: [
    { id: "blog", index: "01", label: "Блог", description: "Статьи и заметки", href: "/blog" },
    { id: "materials", index: "02", label: "Материалы", description: "Публичные материалы", href: "/materials" },
    { id: "ai-platform", index: "03", label: "AI Platform", description: "Система знаний", href: "/ai-platform" }
  ],
  featured: [
    { surface: "blog", label: "Статья", item: listItem("ai-platform-before-gpu", "ИИ-платформа начинается не с GPU", "/blog/ai-platform-before-gpu") },
    { surface: "materials", label: "Выступление", item: { ...listItem("talk", "Свои ИИ-модели или API?", "/talks/example"), contentType: "talk" } },
    { surface: "materials", label: "Открытый проект", item: { ...listItem("project", "audit-prompt-caching", "/projects/example"), contentType: "project" } }
  ]
};

const blogModel: BlogViewModel = {
  items: [
    { ...listItem("ai-platform-before-gpu", "ИИ-платформа начинается не с GPU", "/blog/ai-platform-before-gpu"), articleKind: "native", editorialFormat: "article", topics: ["ai-platform", "architecture"], sourceName: null, publishedAt: "2026-07-22", publishedLabel: "22 июля 2026 года" },
    { ...listItem("workload-shape", "Workload shape важнее названия модели", "/blog/workload-shape"), meta: "Авторская заметка", articleKind: "native", editorialFormat: "note", topics: ["inference", "capacity"], sourceName: null, publishedAt: "2026-07-22", publishedLabel: "22 июля 2026 года" }
  ]
};

const materialsModel: MaterialsViewModel = {
  talks: [{ entityId: "talk", title: "Свои ИИ-модели или API по подписке?", venue: "ROИИ 2026", eventDateLabel: "19 февраля 2026 года", formatLabel: "Доклад", description: "Описание выступления", recordingLabel: "Смотреть запись", thumbnail: { path: "/media/talks/maas-vs-self-hosted.jpg", alt: "Кадр доклада" }, href: "/talks/example" }],
  projects: [{ entityId: "project", title: "audit-prompt-caching", typeLabel: "Открытый проект", releaseLabel: "v0.1.3", description: "Описание проекта", evidenceBoundary: "Требуется runtime telemetry", href: "/projects/example", repositoryUrl: "https://github.com/sernote/audit-prompt-caching" }],
  publications: Array.from({ length: 5 }, (_, index) => ({ entityId: `publication-${index}`, externalTypeLabel: "Авторская статья" as const, sourceName: "Хабр", publishedLabel: "12 мая 2026 года", title: `Публикация ${index}`, excerpt: "Аннотация публикации", participationLabel: "Вклад Сергея: автор материала", href: `https://example.com/${index}` }))
};

const aboutModel: AboutViewModel = {
  evidence: [
    { ...listItem("evidence-external", "Внешняя публикация", "https://example.com/external"), linkKind: "external" as const },
    ...Array.from({ length: 2 }, (_, index) => listItem(`evidence-${index}`, `Материал ${index}`, `/materials#${index}`))
  ]
};

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

describe("v3.1 personal pages", () => {
  it("renders Home as three entrances and one quiet current selection", () => {
    const html = renderToStaticMarkup(
      createElement(HomePageContent, { model: homeModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(html).toContain("Сергей Нотевский");
    expect(html).toContain("AI Platform Lead в Битрикс24");
    expect(html).not.toContain("Статьи, выступления и рабочая система знаний об AI Platform.");
    expect(html).not.toContain('data-home-intro=""');
    expect(html).toContain("Сейчас");
    expect(html).toContain("Все материалы");
    expect(html).toContain('href="/blog"');
    expect(html).toContain('href="/materials"');
    expect(html).toContain('href="/ai-platform"');
    expect(html).not.toContain("Отвечаю за инференс");
    expect(html).not.toContain("Профессиональный контекст");
  });

  it("renders every native Blog entry with format-specific actions", () => {
    const html = renderToStaticMarkup(
      createElement(BlogPageContent, { model: blogModel })
    );

    expect(html).toContain("Читать статью");
    expect(html).toContain("Читать заметку");
    expect(html).toContain("ИИ-платформа начинается не с GPU");
    expect(html).toContain("Workload shape важнее названия модели");
    expect(html).not.toContain("Фильтр");
    expect(html).not.toContain("Поиск");
  });

  it("renders complete Materials lists with one contextual contact action", () => {
    const model = materialsModel;
    const html = renderToStaticMarkup(
      createElement(MaterialsPageContent, { model })
    );

    expect(html).toContain("Выступления, интервью и подкасты");
    expect(html).toContain("Открытые проекты");
    expect(html).toContain("Публикации на внешних площадках");
    expect(html).toContain("maas-vs-self-hosted.jpg");
    expect(count(html, /data-publication=/g)).toBe(model.publications.length);
    expect(count(html, /Написать в Telegram/g)).toBe(1);
    expect(html).not.toContain('href="/talks"');
    expect(html).not.toContain('href="/projects"');
  });

  it("renders About from the verified profile with responsibilities, positions and evidence", () => {
    const html = renderToStaticMarkup(
      createElement(AboutPageContent, { model: aboutModel })
    );

    expect(html).toContain(AUTHOR_PROFILE.aboutIntro);
    expect(count(html, /data-about-evidence=/g)).toBe(aboutModel.evidence.length);
    expect(count(html, /data-about-responsibility/g)).toBe(
      AUTHOR_PROFILE.responsibilities.length
    );
    expect(count(html, /data-about-position/g)).toBe(AUTHOR_PROFILE.positions.length);
    expect(html).toContain(AUTHOR_PROFILE.organizerNote);
    for (const { title } of AUTHOR_PROFILE.responsibilities) {
      expect(html).toContain(title);
    }
    expect(html).not.toContain("Редакционные принципы");
    expect(html).not.toContain("Короткая биография для организаторов");
    expect(html).not.toContain("Как здесь оказался");
    expect(html).not.toContain("Кем не являюсь");
    expect(count(html, /Написать в Telegram/g)).toBe(1);
    expect(html).toContain('href="/materials"');
    expect(html).toMatch(
      /<a[^>]+href="https:\/\/example\.com\/external"[^>]+target="_blank"[^>]+rel="noreferrer"/
    );
  });
});

describe("v3.1 content detail shell", () => {
  it("keeps one main, calm authorship, related items and one contact action", () => {
    const html = renderToStaticMarkup(
      createElement(
        V31ContentDetailPage,
        {
          currentPath: "/blog/example",
          kindLabel: "Короткая заметка",
          title: "Пример заметки",
          lead: "Короткое проверяемое введение.",
          authorHref: "/about",
          publishedAt: "2026-07-22",
          updatedAt: "2026-07-22",
          related: [
            { href: "/ai-platform", title: "AI Platform", meta: "Система знаний" }
          ],
          contactLabel: "Обсудить материал"
        },
        createElement("p", null, "Основной текст")
      )
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(html).toContain("Сергей Нотевский");
    expect(html).toContain("Связанные материалы");
    expect(count(html, />Обсудить материал</g)).toBe(1);
  });
});
