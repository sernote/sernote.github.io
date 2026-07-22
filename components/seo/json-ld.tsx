import type { StructuredData } from "@/lib/seo/structured-data";
import { serializeJsonLd } from "@/lib/seo/structured-data";

export function JsonLd({
  data
}: {
  data: StructuredData | readonly StructuredData[];
}) {
  const values = Array.isArray(data) ? data : [data];

  return (
    <>
      {values.map((value, index) => (
        <script
          key={`${String(value["@type"])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
        />
      ))}
    </>
  );
}
