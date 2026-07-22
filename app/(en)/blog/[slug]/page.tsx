import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import {
  ContentDetailPage,
  EditorialMdxLink
} from "@/components/pages/content-detail-page";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
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

  return (
    <>
      <JsonLd data={buildArticleStructuredData(record)} />
      <ContentDetailPage
      currentPath={`/blog/${record.slug}`}
      overline="Авторская статья"
      title={record.title}
      deck={record.description}
      author={{ name: "Сергей Нотевский", href: "/about" }}
      publishedAt={record.publishedAt!}
      updatedAt={record.updatedAt}
      afterContent={
        <section aria-labelledby="article-next-step-heading" className="border-t border-border/80 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            AI Platform
          </p>
          <h2
            id="article-next-step-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            Продолжить в AI Platform
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Карта областей и практический reference по построению production AI platform: от стратегии и control plane до инференса, качества, стоимости и эксплуатации.
          </p>
          <Link
            href="/ai-platform"
            className="mt-5 inline-flex min-h-11 items-center border-b border-primary/60 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Открыть AI Platform
          </Link>
        </section>
      }
      contact={{
        context: "Вопрос или предложение по материалу",
        label: "Связаться с Сергеем"
      }}
    >
      <DocsBody>
        <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
      </DocsBody>
      </ContentDetailPage>
    </>
  );
}
