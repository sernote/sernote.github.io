import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import { getMDXComponents } from "@/components/mdx";
import { EditorialMdxLink } from "@/components/pages/content-detail-page";
import { ReferenceDetailPage } from "@/components/pages/reference-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { v3Source } from "@/lib/content-v3/source";
import { getReferenceDetailViewModel } from "@/lib/content-v3/view-models";
import { referenceMetadata } from "@/lib/metadata";
import { buildReferenceStructuredData } from "@/lib/seo/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return v3Source.generateParams("platform-area", "ru").map(({ slug }) => ({ area: slug }));
}

function getArea(slug: string) {
  const record = v3Source.getBySlug("platform-area", slug, "ru");
  if (record === null || record.type !== "platform-area") notFound();
  return record;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  return referenceMetadata(getArea(area));
}

export default async function PlatformAreaPage({
  params
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const record = getArea(area);
  const model = getReferenceDetailViewModel(v3Source, "platform-area", area);
  if (model === null) notFound();
  const MDX = record.body;

  return (
    <>
      <JsonLd data={buildReferenceStructuredData(record)} />
      <ReferenceDetailPage model={model}>
        <DocsBody>
          <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
        </DocsBody>
      </ReferenceDetailPage>
    </>
  );
}
