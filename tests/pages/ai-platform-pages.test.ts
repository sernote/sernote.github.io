import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PlatformMap } from "../../components/ai-platform/platform-map";
import {
  AiPlatformMapPageContent,
  AiPlatformPageContent
} from "../../components/pages/ai-platform-pages";
import { ReferenceDetailPage } from "../../components/pages/reference-detail-page";
import type {
  PlatformLandingViewModel,
  PlatformMapViewModel,
  ReferenceDetailViewModel,
  V3ListItemViewModel
} from "../../lib/content-v3/view-models";

const mapModel: PlatformMapViewModel = Object.freeze({
  areas: Object.freeze(
    [
      ["strategy-boundaries", "01", "Strategy & Boundaries", "Планируется", null],
      ["control-plane", "02", "Control Plane", "Планируется", null],
      [
        "inference-plane",
        "03",
        "Inference Plane",
        "Доступно",
        "/ai-platform/areas/inference-plane"
      ],
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
    Object.freeze({
      title: "Control Plane и Inference Plane",
      description: "Policy пересекается с фактом исполнения."
    }),
    Object.freeze({
      title: "Context & Agent Runtime и Quality & Lifecycle",
      description: "Agent runtime пересекается с release gate."
    }),
    Object.freeze({
      title: "Эксплуатация, экономика, безопасность и ownership",
      description: "Сквозные ответственности для всех областей."
    })
  ])
});

const landingModel: PlatformLandingViewModel = Object.freeze({
  entryModes: Object.freeze([
    Object.freeze({
      id: "map",
      index: "01",
      title: "Карта областей",
      description: "Семь зон ответственности.",
      href: "/ai-platform/map"
    }),
    Object.freeze({
      id: "vertical",
      index: "02",
      title: "Текущий вертикальный срез",
      description: "Один проверенный путь.",
      href: "#current-vertical"
    })
  ]),
  vertical: Object.freeze([
    Object.freeze({
      entityId: "inference-plane",
      index: "01",
      title: "Inference Plane",
      meta: "Область",
      href: "/ai-platform/areas/inference-plane",
      statusLabel: "Проверено"
    }),
    Object.freeze({
      entityId: "prefix-cache",
      index: "02",
      title: "Prefix Cache",
      meta: "Компонент",
      href: "/ai-platform/components/prefix-cache",
      statusLabel: "Проверено"
    }),
    Object.freeze({
      entityId: "agent-session-cache-reuse",
      index: "03",
      title: "Agent session cache reuse — синтетический кейс",
      meta: "Кейс",
      href: "/ai-platform/cases/agent-session-cache-reuse",
      statusLabel: "Синтетический кейс"
    }),
    Object.freeze({
      entityId: "audit-prompt-caching",
      index: "04",
      title: "audit-prompt-caching",
      meta: "Проект",
      href: "/projects/audit-prompt-caching",
      statusLabel: "Открытый проект"
    })
  ])
});

const primaryArea: V3ListItemViewModel = Object.freeze({
  entityId: "inference-plane",
  contentType: "platform-area",
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
  purpose: "Сократить повторный prefill для подходящего workload.",
  boundary: "Не ускоряет decode и не гарантирует reuse.",
  applicability: "Длинные повторяемые префиксы с наблюдаемым cache read.",
  limitations: "Нет обещания hit rate, latency или экономии.",
  sources: Object.freeze([
    Object.freeze({
      title: "vLLM Automatic Prefix Caching",
      url: "https://docs.vllm.ai/en/stable/design/prefix_caching/",
      verifiedAt: "2026-07-22",
      verifiedLabel: "22 июля 2026 года"
    })
  ]),
  primaryArea,
  parentComponent: null,
  related: Object.freeze([
    primaryArea,
    Object.freeze({
      entityId: "agent-session-cache-reuse",
      contentType: "case",
      title: "Agent session cache reuse — синтетический кейс",
      description: "Синтетический пример.",
      meta: "Синтетический кейс",
      href: "/ai-platform/cases/agent-session-cache-reuse",
      linkKind: "internal"
    })
  ]),
  isSynthetic: false
});

const TestableReferenceDetailPage = ReferenceDetailPage as ComponentType<{
  model: ReferenceDetailViewModel;
}>;

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

describe("AI Platform top-level reference surfaces", () => {
  it("renders the product as a responsibility reference with exactly two entry modes", () => {
    const html = renderToStaticMarkup(
      createElement(AiPlatformPageContent, { model: landingModel })
    );

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(count(html, /data-entry-mode=/g)).toBe(2);
    expect(count(html, /data-vertical-node=/g)).toBe(4);
    expect(html).toContain('href="#current-vertical"');
    expect(html).toContain('id="current-vertical"');
    expect(html).toContain("AI Platform");
    expect(html).toContain("модель ответственности и инженерных решений");
    expect(html).toContain("не схема развёртывания");
    expect(html).toContain("не архитектура конкретной компании");
    expect(html).toContain("Синтетический кейс");
    for (const href of [
      "/ai-platform/map",
      "/ai-platform/areas/inference-plane",
      "/ai-platform/components/prefix-cache",
      "/ai-platform/cases/agent-session-cache-reuse",
      "/projects/audit-prompt-caching"
    ]) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).toMatch(
      /<a(?=[^>]*href="\/ai-platform")(?=[^>]*aria-current="page")[^>]*>/
    );
  });

  it("renders a semantic seven-area map with only the public area interactive", () => {
    const mapHtml = renderToStaticMarkup(createElement(PlatformMap, { model: mapModel }));
    const pageHtml = renderToStaticMarkup(
      createElement(AiPlatformMapPageContent, { model: mapModel })
    );

    expect(count(mapHtml, /<ol\b/g)).toBe(1);
    expect(count(mapHtml, /data-platform-area=/g)).toBe(7);
    expect(count(mapHtml, /data-map-row=/g)).toBe(7);
    expect(count(mapHtml, /data-area-link=/g)).toBe(1);
    expect(mapHtml).toContain('href="/ai-platform/areas/inference-plane"');
    expect(mapHtml).not.toContain("aria-disabled");
    expect(mapHtml).not.toContain("map-grid");
    expect(count(mapHtml, />Граница ответственности</g)).toBe(7);
    expect(mapHtml).toContain("Граница ответственности Inference Plane.");
    expect(count(pageHtml, /<main\b/g)).toBe(1);
    expect(pageHtml).toContain("Как области связаны");
    expect(pageHtml).toContain("не строгая topology");
    expect(pageHtml).toContain("Сквозные ответственности для всех областей.");
  });
});

describe("AI Platform reference detail shell", () => {
  it("renders authorship, review evidence, boundaries, related pages, and quiet contact", () => {
    const html = renderToStaticMarkup(
      createElement(
        TestableReferenceDetailPage,
        { model: referenceModel },
        createElement("h2", null, "Проблема и контекст"),
        createElement("p", null, "Основное reference-содержание.")
      )
    );
    const text = html.replace(/<[^>]+>/g, "");

    expect(count(html, /<main\b/g)).toBe(1);
    expect(count(html, /<article\b/g)).toBe(1);
    expect(count(html, /<h1\b/g)).toBe(1);
    expect(text).toContain("Автор — Сергей Нотевский");
    expect(text).toContain("Компонент AI Platform");
    expect(text).toContain("Проверено 22 июля 2026 года");
    expect(text).toContain("Назначение");
    expect(text).toContain(referenceModel.purpose);
    expect(text).toContain("Граница материала");
    expect(text).toContain(referenceModel.boundary);
    expect(text).toContain("Применимость");
    expect(text).toContain(referenceModel.applicability);
    expect(text).toContain("Ограничения");
    expect(text).toContain(referenceModel.limitations);
    expect(text).toContain("Источники");
    expect(html).toContain('href="https://docs.vllm.ai/en/stable/design/prefix_caching/"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('href="/ai-platform/areas/inference-plane"');
    expect(count(html, /data-related-reference=/g)).toBe(2);
    expect(html).toContain('href="/contact"');
    expect(text).toContain("Обсудить материал");
  });

  it("gives every linked breadcrumb a real 44px target while preserving hierarchy", () => {
    const areaHtml = renderToStaticMarkup(
      createElement(TestableReferenceDetailPage, {
        model: {
          ...referenceModel,
          entityId: "inference-plane",
          contentType: "platform-area",
          href: "/ai-platform/areas/inference-plane",
          typeLabel: "Область AI Platform",
          primaryArea: null
        }
      })
    );
    const parentComponent: V3ListItemViewModel = Object.freeze({
      entityId: "prefix-cache",
      contentType: "platform-component",
      title: "Prefix Cache",
      description: "Повторное использование префикса.",
      meta: "Компонент AI Platform",
      href: "/ai-platform/components/prefix-cache",
      linkKind: "internal"
    });
    const caseHtml = renderToStaticMarkup(
      createElement(TestableReferenceDetailPage, {
        model: {
          ...referenceModel,
          entityId: "agent-session-cache-reuse",
          contentType: "case",
          href: "/ai-platform/cases/agent-session-cache-reuse",
          typeLabel: "Синтетический кейс",
          parentComponent,
          isSynthetic: true
        }
      })
    );

    for (const [html, href] of [
      [areaHtml, "/ai-platform"],
      [areaHtml, "/ai-platform/map"],
      [caseHtml, "/ai-platform/areas/inference-plane"],
      [caseHtml, "/ai-platform/components/prefix-cache"]
    ]) {
      expect(html).toMatch(
        new RegExp(
          `<a(?=[^>]*href="${href}")(?=[^>]*class="[^"]*min-h-11[^"]*")[^>]*>`
        )
      );
    }
  });

  it("keeps a stale related reference linked and labels it for review", () => {
    const staleArea = Object.freeze({
      ...primaryArea,
      reviewStatusLabel: "Нужна проверка"
    }) as V3ListItemViewModel;
    const html = renderToStaticMarkup(
      createElement(TestableReferenceDetailPage, {
        model: {
          ...referenceModel,
          related: Object.freeze([staleArea])
        }
      })
    );

    expect(html).toContain('href="/ai-platform/areas/inference-plane"');
    expect(html).toContain("Нужна проверка");
  });
});

describe("AI Platform route contracts", () => {
  it.each([
    ["app/(en)/ai-platform/page.tsx", "AiPlatformPageContent", "getPlatformLandingViewModel", 'v3MarketingMetadata("aiPlatform")'],
    ["app/(en)/ai-platform/map/page.tsx", "AiPlatformMapPageContent", "getPlatformMapViewModel", 'v3MarketingMetadata("aiPlatformMap")']
  ] as const)("keeps %s source-backed", (relativePath, component, builder, metadata) => {
    const routePath = join(process.cwd(), relativePath);
    expect(existsSync(routePath)).toBe(true);
    if (!existsSync(routePath)) return;

    const routeText = readFileSync(routePath, "utf8");
    expect(routeText).toContain(component);
    expect(routeText).toContain(`${builder}(v3Source)`);
    expect(routeText).toContain(metadata);
  });

  it.each([
    ["areas", "area", "platform-area"],
    ["components", "component", "platform-component"],
    ["cases", "case", "case"]
  ] as const)("builds the %s exemplar from source-generated params", (segment, param, type) => {
    const routePath = join(process.cwd(), `app/(en)/ai-platform/${segment}/[${param}]/page.tsx`);
    expect(existsSync(routePath)).toBe(true);
    if (!existsSync(routePath)) return;

    const routeText = readFileSync(routePath, "utf8");
    expect(routeText).toContain("export const dynamicParams = false");
    expect(routeText).toMatch(
      new RegExp(`v3Source\\s*\\.generateParams\\("${type}",\\s*"ru"\\)`)
    );
    expect(routeText).toContain(`v3Source.getBySlug("${type}"`);
    expect(routeText).toContain("notFound()");
    expect(routeText).toContain("getReferenceDetailViewModel");
    expect(routeText).toContain("referenceMetadata");
    expect(routeText).toContain("ReferenceDetailPage");
    expect(routeText).toContain("DocsBody");
    expect(routeText).toContain("EditorialMdxLink");
    expect(routeText).not.toContain("dangerouslySetInnerHTML");
  });
});
