import { createElement } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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
import {
  formatTimestampLabel,
  type AboutViewModel,
  type BlogViewModel,
  type HomeViewModel,
  type MaterialsViewModel,
  type SelectedReading
} from "../../lib/content-v3/view-models";
import { siteLinks } from "../../lib/i18n";

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
    { surface: "blog", label: "Заметка", item: listItem("workload-shape-over-model-name", "Workload shape важнее названия модели", "/blog/workload-shape-over-model-name") },
    { surface: "materials", label: "Подкаст", item: { ...listItem("podcast", "Зачем Битрикс24 своя AI-платформа?", "/talks/bitrix24-ai-platform-podcast"), contentType: "talk" } },
    { surface: "ai-platform", label: "AI Platform", item: { ...listItem("prefix-cache", "Prefix Cache", "/ai-platform/components/prefix-cache"), contentType: "platform-component" } }
  ]
};

const blogModel: BlogViewModel = {
  items: [
    { ...listItem("ai-platform-before-gpu", "ИИ-платформа начинается не с GPU", "/blog/ai-platform-before-gpu"), articleKind: "native", editorialFormat: "article", topics: ["ai-platform", "architecture"], sourceName: null, publishedAt: "2026-07-22", publishedLabel: "22 июля 2026 года" },
    { ...listItem("workload-shape", "Workload shape важнее названия модели", "/blog/workload-shape"), meta: "Авторская заметка", articleKind: "native", editorialFormat: "note", topics: ["inference", "capacity"], sourceName: null, publishedAt: "2026-07-22", publishedLabel: "22 июля 2026 года" }
  ]
};

const materialsModel: MaterialsViewModel = {
  talks: [
    {
      entityId: "podcast",
      title: "Зачем Битрикс24 своя AI-платформа?",
      venue: "«Куда расти?» · Максим Ульянов",
      eventDateLabel: "11 августа 2026 года",
      formatLabel: "Подкаст",
      description: "Описание подкаста",
      recordingLabel: "Смотреть запись",
      recordingUrl: "https://www.youtube.com/watch?v=vFleE0MLh_w",
      thumbnail: {
        path: "/media/talks/bitrix24-ai-platform-podcast.jpg",
        alt: "Кадр из подкаста об AI-платформе"
      },
      href: "/talks/bitrix24-ai-platform-podcast"
    },
    {
      entityId: "talk",
      title: "Свои ИИ-модели или API по подписке?",
      venue: "ROИИ 2026",
      eventDateLabel: "19 февраля 2026 года",
      formatLabel: "Доклад",
      description: "Описание выступления",
      recordingLabel: "Смотреть запись",
      recordingUrl: null,
      thumbnail: {
        path: "/media/talks/maas-vs-self-hosted.jpg",
        alt: "Кадр доклада"
      },
      href: "/talks/example"
    }
  ],
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
  it("uses the shared localized talk labels in the detail page", () => {
    const viewModels = readFileSync(
      join(process.cwd(), "lib/content-v3/view-models.ts"),
      "utf8"
    );
    const talkPage = readFileSync(
      join(process.cwd(), "app/(en)/talks/[slug]/page.tsx"),
      "utf8"
    );

    expect(viewModels).toContain("export const TALK_FORMAT_LABELS");
    expect(talkPage).toContain("TALK_FORMAT_LABELS");
    expect(talkPage).toContain('record.format === "stream" ? "Дата эфира"');
    expect(talkPage).toContain('value: TALK_FORMAT_LABELS[record.format]');
    expect(talkPage).toContain('kindLabel={TALK_FORMAT_LABELS[record.format]}');
    expect(talkPage).toContain('label: "Запись опубликована"');
    expect(talkPage).toContain("record.recordingUploadedAt !== record.eventDate");
    expect(talkPage).toContain(
      'item.type === "talk" ? TALK_FORMAT_LABELS[item.format] : "AI Platform"'
    );
    expect(talkPage).toContain("formatTimestampLabel(takeaway.timestampSeconds)");
    expect(talkPage).toContain('bylineLabel="Участник"');
  });

  it("formats talk timestamps on both sides of one hour", () => {
    expect(formatTimestampLabel(2006)).toBe("33:26");
    expect(formatTimestampLabel(4236)).toBe("1:10:36");
  });

  it("renders Home as three entrances and an author introduction, editorial lead and current selections", () => {
    const html = renderToStaticMarkup(
      createElement(HomePageContent, { model: homeModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(html).toContain("Сергей Нотевский");
    expect(html).toContain("AI Platform Lead в Битрикс24");
    expect(html).not.toContain("Статьи, выступления и рабочая система знаний об AI Platform.");
    expect(html).not.toContain('data-home-intro=""');
    expect(html).toContain("Сейчас");
    expect(html).not.toContain("Все материалы");
    expect(html).toContain("Workload shape важнее названия модели");
    expect(html).toContain("Заметка");
    expect(html).toContain(AUTHOR_PROFILE.aboutIntro);
    expect(html).toContain("Читать заметку");
    expect(html).toContain("Зачем Битрикс24 своя AI-платформа?");
    expect(html).toContain("Prefix Cache");
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
    for (const item of blogModel.items) {
      expect(html).toMatch(new RegExp(`<h3[^>]*>\\s*<a[^>]*href="${item.href}"[^>]*>${item.title}</a>`));
    }
    expect(html).not.toContain("ai-platform · architecture");
    expect(html).not.toContain("inference · capacity");
  });

  it("renders curated reading before the linked native archive, preserving external destinations and follow links", () => {
    const selected: SelectedReading[] = [
      { ...listItem("first", "Первый разбор", "/blog/first"), label: "Общий пул", reason: "Причина первого перехода", sourceName: null },
      { ...listItem("second", "Второй разбор", "/blog/second"), label: "Кэш и очередь", reason: "Причина второго перехода", sourceName: null },
      { ...listItem("external", "Внешняя авторская статья", "https://example.com/authored"), linkKind: "external", label: "Стоимость", reason: "Причина внешнего перехода", sourceName: "Хабр" }
    ];
    const html = renderToStaticMarkup(createElement(BlogPageContent, {
      model: {
        ...blogModel,
        selected,
        journey: selected,
        readingPath: [{ ...listItem("legacy-path", "Legacy path", "/old-cache-path"), action: "Legacy action", outcome: "Legacy outcome" }]
      }
    }));

    const selectedSection = html.match(/<section[^>]*aria-labelledby="selected-reading-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    const journey = html.match(/<nav[^>]*aria-labelledby="reading-journey-heading"[\s\S]*?<\/nav>/)?.[0] ?? "";
    expect(selectedSection).not.toBe("");
    expect(journey).not.toBe("");
    expect(html.indexOf(selectedSection)).toBeLessThan(html.indexOf(journey));
    expect(html.indexOf(journey)).toBeLessThan(html.indexOf('aria-labelledby="blog-archive-heading"'));
    for (const item of selected) {
      expect(selectedSection).toContain(item.reason);
      expect(selectedSection).toContain(item.title);
      expect(selectedSection).toContain(item.label);
      expect(journey).toContain(item.reason);
      expect(journey).toContain(item.label);
    }
    for (const section of [selectedSection, journey]) {
      expect(section).toMatch(/<a[^>]*href="https:\/\/example\.com\/authored"[^>]*target="_blank"[^>]*rel="noreferrer"/);
      expect(section).toContain("Хабр");
      expect(section).toMatch(/<span[^>]*>В новой вкладке<\/span>/);
    }
    expect(html).not.toContain("/old-cache-path");
    expect(html).toContain(`href="${siteLinks.telegram}"`);
    expect(html).toContain('href="/rss.xml"');
  });

  it("omits unavailable reading selections and a one-item journey without hiding native entries", () => {
    const html = renderToStaticMarkup(createElement(BlogPageContent, {
      model: {
        ...blogModel,
        selected: [],
        journey: [{ ...listItem("single", "Один текст", "/blog/single"), label: "Начало", reason: "Причина", sourceName: null }]
      }
    }));
    expect(html).not.toContain('aria-labelledby="selected-reading-heading"');
    expect(html).not.toContain('aria-labelledby="reading-journey-heading"');
    for (const item of blogModel.items) expect(html).toContain(item.title);
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
    expect(html).toContain("bitrix24-ai-platform-podcast.jpg");
    expect(html).toContain("Открыть подкаст");
    expect(html).toContain("Открыть доклад");
    expect(html).not.toContain("Открыть выступление");
    expect(html).not.toContain("58:10 · YouTube");
    expect(count(html, /data-publication=/g)).toBe(model.publications.length);
    expect(count(html, /Читать канал/g)).toBe(1);
    expect(html).not.toContain('href="/talks"');
    expect(html).not.toContain('href="/projects"');
  });

  it("features one recording, keeps every other talk once and limits priority loading to the feature", () => {
    const model: MaterialsViewModel = {
      ...materialsModel,
      featuredTalk: materialsModel.talks[0]
    };
    const html = renderToStaticMarkup(createElement(MaterialsPageContent, { model }));
    const articles = html.match(/<article[^>]*data-talk="[^"]+"[\s\S]*?<\/article>/g) ?? [];
    expect(articles).toHaveLength(model.talks.length);
    expect(count(html, /data-featured-talk=/g)).toBe(1);
    for (const talk of model.talks) {
      const matching = articles.filter((article) => article.includes(`data-talk="${talk.entityId}"`));
      expect(matching).toHaveLength(1);
      const article = matching[0];
      expect(article).toContain(talk.description);
      expect(article).toContain(talk.venue);
      expect(article).toContain(talk.eventDateLabel);
      expect(article).toMatch(new RegExp(`<h3[^>]*>\\s*<a[^>]*href="${talk.href}"`));
      if (talk.recordingUrl) {
        expect(article).toContain(`href="${talk.recordingUrl.replaceAll("&", "&amp;")}"`);
        expect(article).toMatch(/target="_blank"[^>]*rel="noreferrer"/);
      } else {
        expect(article).not.toContain("Смотреть запись");
      }
      const image = article.match(/<img[^>]*>/)?.[0] ?? "";
      expect(image).toContain(`alt="${talk.thumbnail?.alt}"`);
      if (talk === model.featuredTalk) expect(image).not.toContain('loading="lazy"');
      else expect(image).toContain('loading="lazy"');
    }

    const fallback = renderToStaticMarkup(createElement(MaterialsPageContent, {
      model: { ...materialsModel, featuredTalk: null }
    }));
    expect(count(fallback, /data-talk=/g)).toBe(materialsModel.talks.length);
    expect(fallback).not.toContain("data-featured-talk=");
    expect(count(fallback, /<img[^>]*loading="lazy"/g)).toBe(materialsModel.talks.length);
  });

  it("orders watch, read and try sections and groups every publication without losing attribution or links", () => {
    const model: MaterialsViewModel = {
      ...materialsModel,
      publications: materialsModel.publications.map((publication, index) => ({
        ...publication,
        externalTypeLabel: index === 1 ? "Экспертный комментарий" : index === 3 ? "Интервью" : publication.externalTypeLabel,
        excerpt: `Аннотация материала ${index}`,
        participationLabel: `Вклад автора ${index}`
      }))
    };
    const html = renderToStaticMarkup(createElement(MaterialsPageContent, { model }));
    expect(html.indexOf('id="watching"')).toBeLessThan(html.indexOf('id="reading"'));
    expect(html.indexOf('id="reading"')).toBeLessThan(html.indexOf('id="projects"'));
    const authored = html.match(/<div[^>]*aria-labelledby="authored-publications-heading"[\s\S]*?(?=<div[^>]*aria-labelledby="comment-publications-heading")/)?.[0] ?? "";
    const comments = html.match(/<div[^>]*aria-labelledby="comment-publications-heading"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(authored).not.toBe("");
    expect(comments).not.toBe("");
    for (const publication of model.publications) {
      const group = publication.externalTypeLabel === "Авторская статья" ? authored : comments;
      expect(count(html, new RegExp(`data-publication="${publication.entityId}"`, "g"))).toBe(1);
      for (const value of [publication.title, publication.sourceName, publication.publishedLabel, publication.excerpt, publication.participationLabel]) {
        expect(group).toContain(value);
      }
      expect(group).toContain(`href="${publication.href}"`);
      expect(group).toMatch(/target="_blank"[^>]*rel="noreferrer"/);
    }
    for (const group of [authored, comments]) {
      const ids = [...group.matchAll(/data-publication="([^"]+)"/g)].map((match) => match[1]);
      const expectedIds = model.publications.filter((publication) => (publication.externalTypeLabel === "Авторская статья") === (group === authored)).map(({ entityId }) => entityId);
      expect(ids).toEqual(expectedIds);
    }
    for (const project of model.projects) {
      expect(html).toContain(`href="${project.href}"`);
      expect(html).toContain(`href="${project.repositoryUrl}"`);
      expect(html).toContain(project.description);
    }
  });

  it("keeps project separators only between project rows", () => {
    const oneProjectHtml = renderToStaticMarkup(
      createElement(MaterialsPageContent, { model: materialsModel })
    );
    const twoProjectsHtml = renderToStaticMarkup(
      createElement(MaterialsPageContent, {
        model: {
          ...materialsModel,
          projects: [
            ...materialsModel.projects,
            { ...materialsModel.projects[0], entityId: "project-2", title: "Второй проект" }
          ]
        }
      })
    );

    expect(count(oneProjectHtml, /data-project-separator=/g)).toBe(0);
    expect(count(twoProjectsHtml, /data-project-separator=/g)).toBe(1);
    expect(oneProjectHtml).not.toContain(materialsModel.projects[0].evidenceBoundary);
  });

  it("renders About from the verified first-person profile and source-driven evidence", () => {
    const html = renderToStaticMarkup(
      createElement(AboutPageContent, { model: aboutModel })
    );

    expect(html).toContain(AUTHOR_PROFILE.aboutIntro);
    expect(html).toContain(AUTHOR_PROFILE.currentWork);
    expect(html).toContain("Как я пришёл к AI Platform");
    expect(html).toContain(AUTHOR_PROFILE.career);
    expect(html).toContain("Что я здесь собираю");
    for (const paragraph of AUTHOR_PROFILE.sitePurpose) {
      expect(html).toContain(paragraph);
    }
    expect(count(html, /data-about-evidence=/g)).toBe(aboutModel.evidence.length);
    expect(html).not.toContain("За что отвечаю");
    expect(html).not.toContain("На чём я стою");
    expect(html).not.toContain("внешних API");
    expect(html).not.toContain("внешним моделям");
    expect(html).toContain(AUTHOR_PROFILE.organizerNote);
    expect(html).not.toContain("Редакционные принципы");
    expect(html).not.toContain("Короткая биография для организаторов");
    expect(html).not.toContain("Как здесь оказался");
    expect(html).not.toContain("Кем не являюсь");
    expect(count(html, /Читать канал/g)).toBe(1);
    expect(html).toContain('href="/materials"');
    expect(html).toMatch(
      /<a[^>]+href="https:\/\/example\.com\/external"[^>]+target="_blank"[^>]+rel="noreferrer"/
    );
  });

  it("renders an attributed About portrait and collapses the photo column when the source is unavailable", () => {
    const photo = {
      path: "/media/talks/ural-speaker.jpg",
      alt: "Сергей выступает на конференции",
      caption: "Ural Digital Weekend 2025 · Пермь · 1 августа 2025 года",
      href: "/talks/llm-selection-ural-digital-weekend"
    };
    const html = renderToStaticMarkup(createElement(AboutPageContent, { model: { ...aboutModel, photo } }));
    const header = html.match(/<header[^>]*data-about-intro[^>]*>[\s\S]*?<\/header>/)?.[0] ?? "";
    expect(header).toContain(AUTHOR_PROFILE.name);
    expect(header).toContain(AUTHOR_PROFILE.aboutIntro);
    expect(header).toContain(AUTHOR_PROFILE.currentWork);
    const imageSource = header.match(/<img[^>]*src="([^"]+)"/)?.[1] ?? "";
    expect(decodeURIComponent(imageSource)).toContain(photo.path);
    expect(header).toContain(`alt="${photo.alt}"`);
    expect(header).toContain(photo.caption);
    expect(header).toContain(`href="${photo.href}"`);
    expect(header).toContain("<figcaption");
    expect(header).toContain("object-[40%_center]");
    for (const missing of [undefined, null]) {
      const fallback = renderToStaticMarkup(createElement(AboutPageContent, { model: { ...aboutModel, photo: missing } }));
      const fallbackHeader = fallback.match(/<header[^>]*data-about-intro[^>]*>[\s\S]*?<\/header>/)?.[0] ?? "";
      expect(fallbackHeader).toContain(AUTHOR_PROFILE.aboutIntro);
      expect(fallbackHeader).not.toContain("grid-cols-");
      expect(fallbackHeader).not.toContain("<figure");
      expect(fallbackHeader).not.toContain("<img");
    }
  });
});

describe("v3.1 content detail shell", () => {
  it("distinguishes participation in a recording from authorship of an article", () => {
    const props = {
      currentPath: "/talks/example",
      kindLabel: "Подкаст",
      title: "Разговор о платформе",
      lead: "Разбор решений команды.",
      authorHref: "/about",
      contactLabel: "Читать канал"
    };
    const participant = renderToStaticMarkup(createElement(V31ContentDetailPage, {
      ...props, bylineLabel: "Участник"
    })).replace(/<[^>]+>/g, "");
    const author = renderToStaticMarkup(createElement(V31ContentDetailPage, props))
      .replace(/<[^>]+>/g, "");

    expect(participant).toContain("Участник — Сергей Нотевский");
    expect(participant).not.toContain("Автор — Сергей Нотевский");
    expect(author).toContain("Автор — Сергей Нотевский");
  });

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
