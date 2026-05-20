import { SectionCard } from "@/components/marketing/section-card";
import { getPublicWriting, type Locale } from "@/lib/i18n";

export function WritingPreview({ locale = "en" }: { locale?: Locale }) {
  const publicWriting = getPublicWriting(locale);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {publicWriting.slice(0, 4).map((item) => (
        <SectionCard key={item.href} title={`${item.source}: ${item.title}`} description={item.description} href={item.href} />
      ))}
    </div>
  );
}
