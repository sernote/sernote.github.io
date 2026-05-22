import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { createRelativeLink } from "fumadocs-ui/mdx";

import { ChapterActions } from "@/components/handbook/chapter-actions";
import { ChapterMeta } from "@/components/handbook/chapter-meta";
import { LanguageSwitcher } from "@/components/i18n-language-switcher";
import { getMDXComponents } from "@/components/mdx";
import { HandbookLanding } from "@/components/pages/handbook-landing";
import { createPageMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: [] }, ...source.generateParams().filter((param) => param.slug?.length)];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return createPageMetadata({
      locale: "en",
      path: "/handbook",
      title: "Production AI Platform Handbook",
      description: "From API key to platform: a field guide for production AI platforms."
    });
  }

  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  return {
    ...createPageMetadata({
      locale: "en",
      path: `/handbook/${slug.join("/")}`,
      title: page.data.title,
      description: page.data.description ?? page.data.title
    }),
    title: page.data.title,
    description: page.data.description,
    keywords: page.data.tags
  };
}

export default async function HandbookPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return <HandbookLanding locale="en" />;
  }

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const currentPath = `/en/handbook/${slug.join("/")}`;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ enabled: true }}>
      <LanguageSwitcher locale="en" currentPath={currentPath} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <ChapterMeta
        level={page.data.level}
        status={page.data.status}
        audience={page.data.audience}
        tags={page.data.tags}
        published={page.data.published}
        updated={page.data.updated}
        locale="en"
      />
      <ChapterActions locale="en" itemId={currentPath} />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
