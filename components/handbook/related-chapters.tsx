import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

type RelatedChaptersProps = {
  locale?: Locale;
  items: Array<{
    href: string;
    title: string;
  }>;
};

export function RelatedChapters({ items, locale = "en" }: RelatedChaptersProps) {
  return (
    <div className="my-8 rounded-lg border border-border bg-muted/25 p-4">
      <p className="mb-3 font-mono text-xs uppercase text-primary">{getDictionary(locale).handbook.related}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
