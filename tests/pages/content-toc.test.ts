import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ContentToc } from "../../components/editorial/content-toc";

it("links top-level compiled anchors without inventing slugs", () => {
  const html = renderToStaticMarkup(createElement(ContentToc, { toc: [
    { title: "Метрики", url: "#метрики-2", depth: 2 },
    { title: "Подробности", url: "#details", depth: 3 }
  ] }));
  expect(html).toContain('href="#метрики-2"');
  expect(html).not.toContain('href="#details"');
  expect(html).toContain('aria-label="В этой статье"');
});
it("omits empty navigation", () => {
  expect(renderToStaticMarkup(createElement(ContentToc, {}))).toBe("");
});
