import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import {
  V31ContentDetailPage,
  type DetailRelatedItem
} from "@/components/pages/v31-content-detail-page";
import { EditorialMdxLink } from "@/components/editorial/mdx-link";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { getCanonicalUrl } from "@/lib/content-v3/registry";
import { v3Source } from "@/lib/content-v3/source";
import { articleMetadata } from "@/lib/metadata";
import { buildArticleStructuredData } from "@/lib/seo/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return v3Source.generateParams("article", "ru");
}

function getNativeArticle(slug: string) {
  const record = v3Source.getBySlug("article", slug, "ru");

  if (record === null || record.type !== "article" || record.kind !== "native") {
    notFound();
  }

  return record;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(getNativeArticle(slug));
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getNativeArticle(slug);
  const MDX = record.body;
  const related: DetailRelatedItem[] = v3Source
    .getRelatedForPage(record, 3)
    .map((item) => ({
      href: getCanonicalUrl(item),
      title: item.title,
      meta:
        item.type === "talk"
          ? "Выступление"
          : item.type === "project"
            ? "Открытый проект"
            : item.type === "article"
              ? "Блог"
              : "AI Platform"
    }));
  const isNote = record.editorialFormat === "note";

  return (
    <>
      <JsonLd data={buildArticleStructuredData(record)} />
      <V31ContentDetailPage
        currentPath={`/blog/${record.slug}`}
        kindLabel={isNote ? "Короткая заметка" : "Статья"}
        title={record.title}
        lead={record.excerpt}
        authorHref="/about"
        publishedAt={record.publishedAt!}
        updatedAt={record.updatedAt}
        compactIntro={isNote}
        related={related}
        contactLabel="Обсудить материал"
      >
        <DocsBody>
          <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
        </DocsBody>
      </V31ContentDetailPage>
    </>
  );
}
