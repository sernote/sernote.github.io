import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { createRelativeLink } from "fumadocs-ui/mdx";

import { ChapterMeta } from "@/components/handbook/chapter-meta";
import { LanguageSwitcher } from "@/components/i18n-language-switcher";
import { getMDXComponents } from "@/components/mdx";
import { sourceRu } from "@/lib/source";

export const dynamicParams = false;

export function generateStaticParams() {
  return sourceRu.generateParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = sourceRu.getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description
  };
}

export default async function RuHandbookPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = sourceRu.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ enabled: true }}>
      <LanguageSwitcher locale="ru" currentPath={slug ? `/ru/handbook/${slug.join("/")}` : "/ru/handbook"} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <ChapterMeta level={page.data.level} status={page.data.status} audience={page.data.audience} />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(sourceRu, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
