import Image from "next/image";
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
import { talkMetadata } from "@/lib/metadata";

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
  const facts: ContentDetailFact[] = [
    { label: "Площадка", value: record.venue },
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

  return (
    <ContentDetailPage
      currentPath={`/talks/${record.slug}`}
      overline="Доклад"
      title={record.title}
      deck={record.abstract}
      author={{ name: "Сергей Нотевский", href: "/about" }}
      facts={facts}
      media={
        record.thumbnail !== null && record.recordingUrl !== null ? (
          <a
            href={record.recordingUrl}
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
        ) : null
      }
      primaryAction={
        record.recordingUrl
          ? {
              label: "Смотреть запись",
              href: record.recordingUrl,
              external: true
            }
          : undefined
      }
      afterContent={
        <section aria-labelledby="talk-next-step-heading" className="border-t border-border/80 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            AI Platform
          </p>
          <h2
            id="talk-next-step-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            Разложить решение по областям платформы
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Карта отделяет стратегический выбор от control plane, инференса, качества, эксплуатации и безопасности.
          </p>
          <Link
            href="/ai-platform/map"
            className="mt-5 inline-flex min-h-11 items-center border-b border-primary/60 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Открыть карту AI Platform
          </Link>
        </section>
      }
      contact={{
        context: "Обсудить тему доклада или выступление",
        label: "Связаться с Сергеем"
      }}
    >
      <DocsBody>
        <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
      </DocsBody>
    </ContentDetailPage>
  );
}
