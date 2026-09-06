import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import {
  V31ContentDetailPage,
  type DetailFact,
  type DetailRelatedItem
} from "@/components/pages/v31-content-detail-page";
import { EditorialMdxLink } from "@/components/editorial/mdx-link";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { getCanonicalUrl } from "@/lib/content-v3/registry";
import { v3Source } from "@/lib/content-v3/source";
import { projectMetadata } from "@/lib/metadata";
import { buildProjectStructuredData } from "@/lib/seo/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return v3Source.generateParams("project", "ru");
}

function getProject(slug: string) {
  const record = v3Source.getBySlug("project", slug, "ru");

  if (record === null || record.type !== "project") {
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
  return projectMetadata(getProject(slug));
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getProject(slug);
  const MDX = record.body;
  const release = record.verifiedRelease;
  const facts: DetailFact[] = [
    ...(release
      ? [
          { label: "Стабильный релиз", value: release.version }
        ]
      : []),
    { label: "Лицензия", value: "MIT" }
  ];
  const related: DetailRelatedItem[] = v3Source.getRelatedForPage(record, 3).map((item) => ({
    href: getCanonicalUrl(item),
    title: item.title,
    meta: item.type === "article" ? "Блог" : item.type === "talk" ? "Выступление" : "AI Platform"
  }));

  return (
    <>
      <JsonLd data={buildProjectStructuredData(record)} />
      <V31ContentDetailPage
        currentPath={`/projects/${record.slug}`}
        kindLabel="Открытый проект"
        title={record.title}
        lead={record.description}
        authorHref="/about"
        facts={facts}
        primaryAction={record.entityId === "audit-prompt-caching"
          ? { label: "Проверить кэш в своём проекте", href: "#your-project" }
          : { label: "Открыть на GitHub", href: record.repositoryUrl, external: true }}
        toc={record.toc}
        related={related}
        contactLabel="Читать канал «AI да парень!»"
      >
        <DocsBody className="[&_code]:break-all [&_pre_code]:break-normal">
          <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
        </DocsBody>
      </V31ContentDetailPage>
    </>
  );
}
