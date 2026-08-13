import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ComponentType, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { EditorialLink } from "../../components/editorial/editorial-link";
import { SectionHeading } from "../../components/editorial/section-heading";
import { EditorialShell } from "../../components/site/editorial-shell";

const TestShell = EditorialShell as ComponentType<{ currentPath: string; children?: ReactNode }>;
const TestEditorialLink = EditorialLink as ComponentType<{
  href: string;
  children?: ReactNode;
}>;

describe("v3.1 editorial shell", () => {
  it("renders one page landmark, a working skip link and the compact navigation", () => {
    const html = renderToStaticMarkup(
      createElement(
        TestShell,
        { currentPath: "/materials" },
        createElement("p", null, "Содержание")
      )
    );

    expect(html.match(/<main\b/g)).toHaveLength(1);
    expect(html).toContain('<main id="main-content"');
    expect(html).toContain('href="#main-content"');
    expect(html).toContain("Блог");
    expect(html).toContain("Материалы");
    expect(html).toContain("AI Platform");
    expect(html).toContain("Обо мне");
    expect(html).toMatch(/<a(?=[^>]*href="\/materials")(?=[^>]*aria-current="page")[^>]*>/);
    expect(html).toContain("Написать в Telegram");
    expect(html).not.toContain("Сменить язык");
    expect(html).not.toContain(">SN<");
  });

  it("keeps the footer factual and gives mobile navigation an explicit trigger", () => {
    const html = renderToStaticMarkup(
      createElement(TestShell, { currentPath: "/" }, createElement("span", null, "x"))
    );

    expect(html).toContain("Telegram");
    expect(html).toContain("Хабр");
    expect(html).toContain("GitHub");
    expect(html).toContain("© 2026 Сергей Нотевский");
    expect(html).toContain("Меню");
  });

  it("uses a dedicated desktop navigation display rule after the Fumadocs cascade", () => {
    const html = renderToStaticMarkup(
      createElement(TestShell, { currentPath: "/" }, createElement("span", null, "x"))
    );
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

    expect(html).toContain("editorial-desktop-nav");
    expect(html).not.toContain("hidden items-center gap-8 md:flex");
    expect(css).toMatch(/\.editorial-desktop-nav\s*{[^}]*display:\s*none/);
    expect(css).toMatch(/@media \(min-width:\s*768px\)[\s\S]*\.editorial-desktop-nav\s*{[^}]*display:\s*flex/);
    expect(html).toContain("editorial-mobile-nav-trigger");
    expect(html).not.toContain("text-primary md:hidden");
    expect(css).toMatch(/\.editorial-mobile-nav-trigger\s*{[^}]*display:\s*inline-flex/);
    expect(css).toMatch(/@media \(min-width:\s*768px\)[\s\S]*\.editorial-mobile-nav-trigger\s*{[^}]*display:\s*none/);
  });

  it("provides minimal editorial heading and link primitives", () => {
    const html = renderToStaticMarkup(
      createElement(SectionHeading, {
        title: "Сейчас",
        action: { href: "/materials", label: "Все материалы" }
      })
    );
    const link = renderToStaticMarkup(
      createElement(TestEditorialLink, { href: "/blog/example" }, "Читать статью")
    );

    expect(html).toContain("<h2");
    expect(html).toContain("Сейчас");
    expect(html).toContain('href="/materials"');
    expect(link).toContain('href="/blog/example"');
    expect(link).toContain("Читать статью");
  });
});
