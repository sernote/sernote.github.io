import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import { getMDXComponents } from "@/components/mdx";
import {
  AiPlatformMdxLink as EditorialMdxLink,
  AiPlatformReferencePage as ReferenceDetailPage
} from "@/components/pages/v31-ai-platform-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { v3Source } from "@/lib/content-v3/source";
import { getReferenceDetailViewModel } from "@/lib/content-v3/view-models";
import { referenceMetadata } from "@/lib/metadata";
import { buildReferenceStructuredData } from "@/lib/seo/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return v3Source.generateParams("case", "ru").map(({ slug }) => ({ case: slug }));
}

function getCase(slug: string) {
  const record = v3Source.getBySlug("case", slug, "ru");
  if (record === null || record.type !== "case") notFound();
  return record;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ case: string }>;
}): Promise<Metadata> {
  const { case: caseSlug } = await params;
  return referenceMetadata(getCase(caseSlug));
}

export default async function PlatformCasePage({
  params
}: {
  params: Promise<{ case: string }>;
}) {
  const { case: caseSlug } = await params;
  const record = getCase(caseSlug);
  const model = getReferenceDetailViewModel(v3Source, "case", caseSlug);
  if (model === null) notFound();
  const MDX = record.body;

  return (
    <>
      <JsonLd data={buildReferenceStructuredData(record, model)} />
      <ReferenceDetailPage model={model}>
        <DocsBody className="[&_code]:break-all [&_pre_code]:break-normal">
          <MDX components={getMDXComponents({ a: EditorialMdxLink })} />
        </DocsBody>
      </ReferenceDetailPage>
    </>
  );
}
