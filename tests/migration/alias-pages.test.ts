import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { DocsAliasMain, StaticAliasBody } from "@/components/routing/static-alias-page";
import { staticAliasMetadata } from "@/lib/metadata";
import { getSelectedAliasDestination } from "@/lib/migration/manifest";

// The marketing-shell `/writing` alias has no fumadocs `collections` dependency,
// so it is imported and rendered end-to-end. The handbook (docs) alias form is
// verified through its exact composition primitives + decision/metadata helpers,
// because importing the catchall would drag the compiled MDX collection into the
// unit runner; the real exported handbook alias HTML is audited in Task 12.
import WritingPage, { metadata as writingMetadata } from "@/app/(en)/writing/page";

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

const SKIP_LINK = /<a\b[^>]*href=["']#main-content["'][^>]*>/gi;
const MAIN_CONTENT = /<main\b[^>]*\bid=["']main-content["'][^>]*>/gi;
const ANY_MAIN = /<main\b/gi;

describe("StaticAliasBody", () => {
  it("is landmark-neutral: no main, no skip link", () => {
    const html = renderToStaticMarkup(
      createElement(StaticAliasBody, { destination: "/blog", locale: "ru" })
    );
    expect(countMatches(html, ANY_MAIN)).toBe(0);
    expect(countMatches(html, SKIP_LINK)).toBe(0);
  });

  it("renders one heading and a link to the destination", () => {
    const html = renderToStaticMarkup(
      createElement(StaticAliasBody, { destination: "/blog", locale: "ru" })
    );
    expect(countMatches(html, /<h1\b/gi)).toBe(1);
    expect(html).toMatch(/<a\b[^>]*href=["']\/blog["']/i);
  });
});

describe("/writing alias page (marketing shell)", () => {
  const html = renderToStaticMarkup(createElement(WritingPage));

  it("has exactly one skip link and one main#main-content, no nested main", () => {
    expect(countMatches(html, SKIP_LINK)).toBe(1);
    expect(countMatches(html, MAIN_CONTENT)).toBe(1);
    expect(countMatches(html, ANY_MAIN)).toBe(1);
  });

  it("renders the alias body pointing at the canonical /blog destination", () => {
    expect(html).toMatch(/data-static-alias=["']\/blog["']/i);
    expect(html).toMatch(/<a\b[^>]*href=["']\/blog["']/i);
  });

  it("declares the target canonical and noindex,follow metadata", () => {
    expect(writingMetadata.alternates?.canonical).toBe("https://notevskii.tech/blog/");
    expect(writingMetadata.robots).toMatchObject({ index: false, follow: true });
  });
});

describe("handbook alias composition (docs shell)", () => {
  // The catchall renders exactly this for each of the three selected handbook
  // aliases; the handbook layout (not this composition) owns the skip link.
  const cases = [
    { source: "/handbook", destination: "/ai-platform" },
    { source: "/handbook/platform-map", destination: "/ai-platform/map" },
    { source: "/handbook/caching/prefix-cache", destination: "/ai-platform/components/prefix-cache" }
  ];

  for (const { source, destination } of cases) {
    it(`maps ${source} to ${destination}`, () => {
      expect(getSelectedAliasDestination(source)).toBe(destination);
    });

    it(`renders one main#main-content, no skip link, no nested main for ${destination}`, () => {
      const html = renderToStaticMarkup(
        createElement(
          DocsAliasMain,
          null,
          createElement(StaticAliasBody, { destination, locale: "ru" })
        )
      );
      expect(countMatches(html, MAIN_CONTENT)).toBe(1);
      expect(countMatches(html, ANY_MAIN)).toBe(1);
      expect(countMatches(html, SKIP_LINK)).toBe(0);
      expect(html).toMatch(new RegExp(`href=["']${destination}["']`, "i"));
    });

    it(`declares target canonical and noindex,follow metadata for ${destination}`, () => {
      const meta = staticAliasMetadata(destination, "ru");
      expect(meta.alternates?.canonical).toBe(`https://notevskii.tech${destination}/`);
      expect(meta.robots).toMatchObject({ index: false, follow: true });
    });
  }

  it("does not treat a normal handbook chapter as a selected alias", () => {
    expect(getSelectedAliasDestination("/handbook/start-here")).toBeNull();
  });
});
