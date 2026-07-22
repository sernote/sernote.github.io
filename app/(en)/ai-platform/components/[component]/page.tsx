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
  return v3Source
    .generateParams("platform-component", "ru")
    .map(({ slug }) => ({ component: slug }));
}

function getComponent(slug: string) {
  const record = v3Source.getBySlug("platform-component", slug, "ru");
  if (record === null || record.type !== "platform-component") notFound();
  return record;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ component: string }>;
}): Promise<Metadata> {
  const { component } = await params;
  return referenceMetadata(getComponent(component));
}

export default async function PlatformComponentPage({
  params
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const record = getComponent(component);
  const model = getReferenceDetailViewModel(v3Source, "platform-component", component);
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
