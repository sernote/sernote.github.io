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
import { sourceRu } from "@/lib/source";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: [] }, ...sourceRu.generateParams().filter((param) => param.slug?.length)];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return createPageMetadata({
      locale: "ru",
      path: "/handbook",
      title: "Production AI Platform Handbook",
      description: "От API-ключа к платформе: практический хэндбук про ИИ в продакшене."
    });
  }

  const page = sourceRu.getPage(slug);

  if (!page) {
    return {};
  }

  return {
    ...createPageMetadata({
      locale: "ru",
      path: `/handbook/${slug.join("/")}`,
      title: page.data.title,
      description: page.data.description ?? page.data.title
    }),
    title: page.data.title,
    description: page.data.description,
    keywords: page.data.tags
  };
}

export default async function RuHandbookPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return <HandbookLanding locale="ru" />;
  }

  const page = sourceRu.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const currentPath = `/ru/handbook/${slug.join("/")}`;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ enabled: true }}>
      <LanguageSwitcher locale="ru" currentPath={currentPath} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <ChapterMeta
        level={page.data.level}
        status={page.data.status}
        audience={page.data.audience}
        tags={page.data.tags}
        published={page.data.published}
        updated={page.data.updated}
        locale="ru"
      />
      <ChapterActions locale="ru" itemId={currentPath} />
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
