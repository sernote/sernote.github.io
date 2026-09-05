import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/content-v3/source", () => ({
  v3Source: {
    generateParams: () => [{ slug: "audit-prompt-caching" }],
    getBySlug: () => ({
      entityId: "audit-prompt-caching",
      type: "project",
      locale: "ru",
      slug: "audit-prompt-caching",
      title: "audit-prompt-caching",
      description: "Описание проекта",
      repositoryUrl: "https://github.com/sernote/audit-prompt-caching",
      verifiedRelease: {
        version: "v0.1.3",
        publishedAt: "2026-07-20",
        url: "https://github.com/sernote/audit-prompt-caching/releases/tag/v0.1.3",
        verifiedAt: "2026-07-22"
      },
      audience: [
        "AI- и backend-инженеры, которые разбирают cache misses и длинный TTFT",
        "Разработчики агентов с tools, MCP, compaction и многошаговыми сессиями",
        "Platform- и SRE-инженеры, отвечающие за gateway и self-hosted inference"
      ],
      quickStart: "npx skills add example",
      evidence: ["Публичный репозиторий"],
      supportBoundary: "Без support SLA.",
      privacyBoundary: "Используйте очищенные данные.",
      toc: [{ title: "Первый полезный аудит", url: "#первый-полезный-аудит", depth: 2 }],
      body: () => null
    }),
    getRelatedForPage: () => []
  }
}));

vi.mock("@/lib/seo/structured-data", () => ({
  buildProjectStructuredData: () => ({ "@type": "SoftwareSourceCode" }),
  serializeJsonLd: (value: unknown) => JSON.stringify(value)
}));

describe("v3.1 project page", () => {
  it("lets the project body own the explanatory content", async () => {
    const { default: ProjectPage } = await import("../../app/(en)/projects/[slug]/page");
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "audit-prompt-caching" })
    });
    const html = renderToStaticMarkup(page);

    expect(html).not.toContain("Как работает");
    expect(html).not.toContain("Для кого.");
    expect(html).not.toContain("Граница доказательств");
    expect(html).not.toContain("Данные и приватность");
    expect(html).not.toContain("npx skills add example");
    expect(html).toContain("v0.1.3");
    expect(html).not.toContain("Релиз опубликован");
    expect(html).not.toContain("Проверено");
  });

  it("opens the reader's own project audit and renders the project's compiled contents", async () => {
    const { default: ProjectPage } = await import("../../app/(en)/projects/[slug]/page");
    const html = renderToStaticMarkup(await ProjectPage({
      params: Promise.resolve({ slug: "audit-prompt-caching" })
    }));

    const action = html.match(/<a\b[^>]*href="#your-project"[^>]*>[\s\S]*?<\/a>/)?.[0];
    expect(action).toContain("Проверить кэш в своём проекте");
    expect(action).not.toContain("target=");
    expect(html).toContain('aria-label="В этой статье"');
    expect(html).toContain('href="#первый-полезный-аудит"');
    expect(html).toContain("Стабильный релиз");
  });
});
