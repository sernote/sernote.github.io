import { ArrowUpRight } from "lucide-react";

import { getPublicWriting, type Locale } from "@/lib/i18n";

export function WritingPreview({ locale = "en", limit = 4 }: { locale?: Locale; limit?: number }) {
  const publicWriting = getPublicWriting(locale);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {publicWriting.slice(0, limit).map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="group block h-full rounded-lg border border-border/80 bg-card/70 p-5 transition-colors hover:border-primary/45"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase text-primary">{item.source}</p>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-7">{item.title}</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
        </a>
      ))}
    </div>
  );
}
