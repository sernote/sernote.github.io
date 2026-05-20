import { SectionCard } from "@/components/marketing/section-card";
import { getTalks, type Locale } from "@/lib/i18n";

export function TalksPreview({ locale = "en" }: { locale?: Locale }) {
  const talks = getTalks(locale);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {talks.map((talk) => (
        <SectionCard key={talk.title} title={talk.title} description={`${talk.venue}. ${talk.description}`} />
      ))}
    </div>
  );
}
