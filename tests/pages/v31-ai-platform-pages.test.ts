import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PlatformMap } from "../../components/ai-platform/platform-map";
import {
  AiPlatformMapPageContent,
  AiPlatformPageContent,
  AiPlatformReferencePage
} from "../../components/pages/v31-ai-platform-pages";
import type {
  PlatformLandingViewModel,
  PlatformMapViewModel,
  ReferenceBreadcrumbItemViewModel,
  ReferenceDetailViewModel
} from "../../lib/content-v3/view-models";

const mapModel: PlatformMapViewModel = Object.freeze({
  areas: Object.freeze(
    [
      ["strategy-boundaries", "01", "Strategy & Boundaries", "Планируется", null],
      ["control-plane", "02", "Control Plane", "Планируется", null],
      ["inference-plane", "03", "Inference Plane", "Доступно", "/ai-platform/areas/inference-plane"],
      ["context-agent-runtime", "04", "Context & Agent Runtime", "Планируется", null],
      ["quality-lifecycle", "05", "Quality & Lifecycle", "Планируется", null],
      ["operations-economics", "06", "Operations & Economics", "Планируется", null],
      ["security-ownership", "07", "Security & Ownership", "Планируется", null]
    ].map(([entityId, index, title, statusLabel, href]) =>
      Object.freeze({
        entityId: entityId as string,
        index: index as string,
        title: title as string,
        purpose: `Назначение области ${title as string}.`,
        mapBoundary: `Граница ответственности ${title as string}.`,
        statusLabel: statusLabel as "Доступно" | "Планируется",
        href: href as string | null
      })
    )
  ),
  intersections: Object.freeze([
    Object.freeze({ title: "Control Plane и Inference Plane", description: "Policy и исполнение." })
  ])
});

const landingModel: PlatformLandingViewModel = Object.freeze({
  entryModes: Object.freeze([
    Object.freeze({ id: "map", index: "01", title: "Карта областей", description: "Семь зон.", href: "/ai-platform/map" }),
    Object.freeze({ id: "vertical", index: "02", title: "Вертикаль", description: "Один путь.", href: "#current-vertical" })
  ]),
  vertical: Object.freeze([
    Object.freeze({ entityId: "inference-plane", index: "01", title: "Inference Plane", meta: "Область", href: "/ai-platform/areas/inference-plane", statusLabel: "Проверено" }),
    Object.freeze({ entityId: "prefix-cache", index: "02", title: "Prefix Cache", meta: "Компонент", href: "/ai-platform/components/prefix-cache", statusLabel: "Проверено" }),
    Object.freeze({ entityId: "agent-session-cache-reuse", index: "03", title: "Agent session cache reuse", meta: "Кейс", href: "/ai-platform/cases/agent-session-cache-reuse", statusLabel: "Синтетический кейс" }),
    Object.freeze({ entityId: "audit-prompt-caching", index: "04", title: "audit-prompt-caching", meta: "Проект", href: "/projects/audit-prompt-caching", statusLabel: "Открытый проект" })
  ]),
  introduction: Object.freeze({
    entityId: "ai-platform-before-gpu", contentType: "article", title: "Исходный заголовок введения",
    description: "Введение", meta: "Авторская статья", href: "/blog/ai-platform-before-gpu", linkKind: "internal"
  }),
  questions: Object.freeze([
    ["shared-pool", "/blog/hybrid-reasoners-in-production"],
    ["cache-latency", "/ai-platform/components/prefix-cache#метрики"],
    ["replica-choice", "/ai-platform/components/prefix-cache#experiment"],
    ["prompt-drift", "/ai-platform/cases/agent-session-cache-reuse"]
  ].map(([id, href]) => Object.freeze({
    id, entityId: id, contentType: "article" as const, title: `Источник ${id}`,
    question: `Вопрос ${id}`, outcome: `Разбор ${id}`, action: `Открыть ${id}`,
    description: "Описание", meta: "Формат", href, linkKind: "internal" as const
  })))
});

const primaryArea: ReferenceBreadcrumbItemViewModel = Object.freeze({
  entityId: "inference-plane",
  contentType: "platform-area",
  slug: "inference-plane",
  title: "Inference Plane",
  description: "Исполнение model workloads.",
  meta: "Область AI Platform",
  href: "/ai-platform/areas/inference-plane",
  linkKind: "internal"
});

const referenceModel: ReferenceDetailViewModel = Object.freeze({
  entityId: "prefix-cache",
  contentType: "platform-component",
  title: "Prefix Cache",
  description: "Как повторно использовать общую часть запроса.",
  href: "/ai-platform/components/prefix-cache",
  typeLabel: "Компонент AI Platform",
  reviewStatus: "reviewed",
  reviewStatusLabel: "Проверено",
  reviewedAt: "2026-07-22",
  reviewedLabel: "22 июля 2026 года",
  publishedAt: "2026-07-22",
  updatedAt: "2026-07-22",
  purpose: "Сократить повторный prefill.",
  boundary: "Не ускоряет decode.",
  applicability: "Повторяемый префикс.",
  limitations: "Без обещания hit rate.",
  sources: Object.freeze([
    Object.freeze({ title: "vLLM", url: "https://docs.vllm.ai/", verifiedAt: "2026-07-22", verifiedLabel: "22 июля 2026 года" })
  ]),
  primaryArea,
  parentComponent: null,
  parentComponentPrimaryAreaId: null,
  related: Object.freeze([primaryArea]),
  isSynthetic: false
});

const Reference = AiPlatformReferencePage as ComponentType<{
  model: ReferenceDetailViewModel;
}>;

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

describe("v3.1 AI Platform landing", () => {
  it("puts direct answers and the complete reading sequence before the planned map", () => {
    const html = renderToStaticMarkup(
      createElement(AiPlatformPageContent, { model: landingModel, mapModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /data-platform-question=/g)).toBe(4);
    expect(count(html, /data-platform-area-summary=/g)).toBe(7);
    expect(count(html, /data-vertical-node=/g)).toBe(4);
    expect(html).toContain('data-platform-hero=""');
    expect(html).toContain('href="/ai-platform/map"');
    expect(html).toContain('href="/blog/ai-platform-before-gpu"');
    expect(html).toContain("Исходный заголовок введения");
    for (const question of landingModel.questions ?? []) {
      const section = html.match(new RegExp(`<a[^>]*data-platform-question="${question.id}"[\\s\\S]*?<\\/a>`))?.[0] ?? "";
      expect(section).not.toBe("");
      expect(section).toContain(`href="${question.href}"`);
      expect(section).toContain(question.question);
      expect(section).toContain(question.outcome);
    }
    expect(html.indexOf('id="handbook-questions"')).toBeLessThan(html.indexOf('id="current-vertical"'));
    expect(html.indexOf('id="current-vertical"')).toBeLessThan(html.indexOf('id="platform-areas-heading"'));
    expect(html).toContain("Синтетический кейс");
    expect(count(html, /data-platform-area-status="Запланировано"/g)).toBe(6);
  });

  it("omits empty optional entry blocks and exposes stale reference status", () => {
    const html = renderToStaticMarkup(createElement(AiPlatformPageContent, {
      model: { ...landingModel, questions: [], introduction: null,
        vertical: landingModel.vertical.map((node) => node.entityId === "prefix-cache"
          ? { ...node, statusLabel: "Нужна проверка" as const } : node) }, mapModel
    }));
    expect(html).not.toContain('id="handbook-questions"');
    expect(html).not.toContain('href="#handbook-questions"');
    expect(html).not.toContain('href="/blog/ai-platform-before-gpu"');
    expect(html).toContain("Нужна проверка");
    expect(count(html, /data-vertical-node=/g)).toBe(4);
  });
});

describe("v3.1 AI Platform map", () => {
  it("renders one ordered capability map with one reviewed link and six planned rows", () => {
    const html = renderToStaticMarkup(createElement(PlatformMap, { model: mapModel }));

    expect(count(html, /<ol\b/g)).toBe(1);
    expect(count(html, /data-platform-area=/g)).toBe(7);
    expect(count(html, /data-area-link=/g)).toBe(1);
    expect(count(html, /data-area-status="Проверено"/g)).toBe(1);
    expect(count(html, /data-area-status="Запланировано"/g)).toBe(6);
    expect(count(html, />Ключевой вопрос</g)).toBe(7);
    expect(count(html, />Основные компоненты</g)).toBe(7);
    expect(count(html, /data-map-layout="editorial-two-column"/g)).toBe(7);
  });

  it("labels the page as a capability map and preserves a single reading direction", () => {
    const html = renderToStaticMarkup(
      createElement(AiPlatformMapPageContent, { model: mapModel })
    );
    expect(html).toContain("capability map");
    expect(html).toContain("не строгий путь запроса");
    expect(html).toContain('data-reading-direction="ordered-linear"');
  });
});

describe("v3.1 AI Platform reference shells", () => {
  it("differentiates area, component and case while sharing review evidence", () => {
    const variants = [
      { ...referenceModel, entityId: "inference-plane", contentType: "platform-area" as const, typeLabel: "Область AI Platform" as const, href: "/ai-platform/areas/inference-plane", primaryArea: null },
      referenceModel,
      { ...referenceModel, entityId: "agent-session-cache-reuse", contentType: "case" as const, typeLabel: "Синтетический кейс" as const, href: "/ai-platform/cases/agent-session-cache-reuse", isSynthetic: true }
    ];
    const html = variants.map((model) =>
      renderToStaticMarkup(createElement(Reference, { model }, createElement("h2", null, "Содержание")))
    );

    expect(html[0]).toContain('data-reference-type="platform-area"');
    expect(html[0]).not.toContain('aria-label="Назначение и граница"');
    expect(html[1]).toContain('data-reference-type="platform-component"');
    expect(html[1]).not.toContain('aria-label="Назначение и граница"');
    expect(html[2]).toContain('data-reference-type="case"');
    expect(html[2]).not.toContain('aria-label="Назначение и граница"');
    for (const output of html) {
      const text = output.replace(/<[^>]+>/g, "");
      expect(text).toContain("Автор — Сергей Нотевский");
      expect(text).toContain("Применимость");
      expect(text).toContain("Ограничения");
      expect(text).toContain("Источники");
      expect(count(output, /data-related-reference=/g)).toBeLessThanOrEqual(4);
    }
  });

  it("places the synthetic disclosure before the case title", () => {
    const html = renderToStaticMarkup(
      createElement(Reference, {
        model: {
          ...referenceModel,
          entityId: "agent-session-cache-reuse",
          contentType: "case",
          typeLabel: "Синтетический кейс",
          href: "/ai-platform/cases/agent-session-cache-reuse",
          isSynthetic: true
        }
      })
    );
    expect(html.indexOf("Учебный пример на специально подготовленных данных.")).toBeGreaterThan(-1);
    expect(html.indexOf("Учебный пример на специально подготовленных данных.")).toBeLessThan(
      html.indexOf('<h1 id="reference-detail-title"')
    );
  });
});

describe("v3.1 AI Platform route generation", () => {
  it.each([
    ["areas", "area", "platform-area"],
    ["components", "component", "platform-component"],
    ["cases", "case", "case"]
  ] as const)("keeps the %s exemplar source-generated", (segment, param, type) => {
    const routePath = join(process.cwd(), `app/(en)/ai-platform/${segment}/[${param}]/page.tsx`);
    expect(existsSync(routePath)).toBe(true);
    const source = readFileSync(routePath, "utf8");
    expect(source).toContain("dynamicParams = false");
    expect(source).toMatch(new RegExp(`generateParams\\(\"${type}\", \\"ru\\"\\)`));
    expect(source).toContain("AiPlatformReferencePage");
  });
});
