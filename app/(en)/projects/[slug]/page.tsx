import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import {
  ContentDetailPage,
  EditorialMdxLink,
  type ContentDetailFact
} from "@/components/pages/content-detail-page";
import { getMDXComponents } from "@/components/mdx";
import { v3Source } from "@/lib/content-v3/source";
import { formatRussianDate } from "@/lib/content-v3/view-models";
import { projectMetadata } from "@/lib/metadata";

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
  const facts: ContentDetailFact[] = [
    ...(release
      ? [
          { label: "Проверенный релиз", value: release.version },
          {
            label: "Релиз опубликован",
            value: formatRussianDate(release.publishedAt),
            dateTime: release.publishedAt
          },
          {
            label: "Проверено",
            value: formatRussianDate(release.verifiedAt),
            dateTime: release.verifiedAt
          }
        ]
      : []),
    { label: "Лицензия", value: "MIT" }
  ];

  return (
    <ContentDetailPage
      currentPath={`/projects/${record.slug}`}
      overline="Открытый проект"
      title={record.title}
      deck={record.description}
      author={{ name: "Сергей Нотевский", href: "/about" }}
      facts={facts}
      primaryAction={{
        label: "Открыть на GitHub",
        href: record.repositoryUrl,
        external: true
      }}
      afterContent={
        <section
          aria-labelledby="project-next-step-heading"
          className="border-t border-border/80 pt-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            AI Platform
          </p>
          <h2
            id="project-next-step-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            Понять ответственность Prefix Cache
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Компонент объясняет форму запроса, локальность, наблюдаемые сигналы и причины потери повторного использования.
          </p>
          <Link
            href="/ai-platform/components/prefix-cache"
            className="mt-5 inline-flex min-h-11 items-center border-b border-primary/60 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Открыть Prefix Cache
          </Link>
        </section>
      }
      contact={{
        context: "Вопрос или предложение по проекту",
        label: "Связаться с Сергеем"
      }}
    >
      <DocsBody className="[&_code]:break-all [&_pre_code]:break-normal">
        <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
      </DocsBody>
    </ContentDetailPage>
  );
}
