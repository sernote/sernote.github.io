import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import {
  V31ContentDetailPage,
  type DetailFact,
  type DetailRelatedItem
} from "@/components/pages/v31-content-detail-page";
import { EditorialMdxLink } from "@/components/pages/content-detail-page";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { getCanonicalUrl } from "@/lib/content-v3/registry";
import { v3Source } from "@/lib/content-v3/source";
import { formatRussianDate } from "@/lib/content-v3/view-models";
import { talkMetadata } from "@/lib/metadata";
import { buildTalkStructuredData } from "@/lib/seo/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return v3Source.generateParams("talk", "ru");
}

function getTalk(slug: string) {
  const record = v3Source.getBySlug("talk", slug, "ru");

  if (record === null || record.type !== "talk") {
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
  return talkMetadata(getTalk(slug));
}

export default async function TalkPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getTalk(slug);
  const MDX = record.body;
  const facts: DetailFact[] = [
    { label: "Площадка", value: record.venue },
    { label: "Формат", value: record.format === "talk" ? "Доклад" : record.format },
    {
      label: "Дата выступления",
      value: formatRussianDate(record.eventDate),
      dateTime: record.eventDate
    },
    ...(record.recordingUploadedAt
      ? [
          {
            label: "Видео опубликовано",
            value: formatRussianDate(record.recordingUploadedAt),
            dateTime: record.recordingUploadedAt
          }
        ]
      : [])
  ];
  const related: DetailRelatedItem[] = v3Source.getRelatedForPage(record, 3).map((item) => ({
    href: getCanonicalUrl(item),
    title: item.title,
    meta: item.type === "article" ? "Блог" : item.type === "project" ? "Открытый проект" : "AI Platform"
  }));

  function timestampLabel(seconds: number): string {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainder = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
  }

  return (
    <>
      <JsonLd data={buildTalkStructuredData(record)} />
      <V31ContentDetailPage
        currentPath={`/talks/${record.slug}`}
        kindLabel="Выступление"
        title={record.title}
        lead={record.abstract}
        authorHref="/about"
        facts={facts}
        media={record.thumbnail !== null ? (
          <a
            href={record.recordingUrl ?? record.thumbnail.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="group block border border-border/80 bg-muted/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src={record.thumbnail.path}
              alt={record.thumbnail.alt}
              width={1280}
              height={720}
              sizes="(max-width: 720px) 100vw, 720px"
              className="aspect-video h-auto w-full object-contain"
              priority
            />
            <span className="sr-only">Смотреть запись на YouTube, откроется в новой вкладке</span>
          </a>
        ) : null}
        primaryAction={record.recordingUrl ? { label: "Смотреть запись", href: record.recordingUrl, external: true } : undefined}
        related={related}
        contactLabel="Пригласить выступить"
      >
        <section>
          <h2>Ключевые выводы</h2>
          <ul>
            {record.takeaways.map((takeaway) => (
              <li key={takeaway.label}>
                <strong>{takeaway.label}.</strong> {takeaway.text}{" "}
                {takeaway.timestampSeconds !== null && record.recordingUrl ? (
                  <a href={`${record.recordingUrl}&t=${takeaway.timestampSeconds}s`} target="_blank" rel="noreferrer">
                    {timestampLabel(takeaway.timestampSeconds)}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          {record.slidesUrl ? <p><a href={record.slidesUrl}>Открыть слайды</a></p> : null}
        </section>
        <DocsBody>
          <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
        </DocsBody>
      </V31ContentDetailPage>
    </>
  );
}
