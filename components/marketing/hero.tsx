import Link from "next/link";
import { ArrowRight, BookOpen, Mail, Map } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale);
  const hero = dictionary.home.hero;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(82svh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex w-full max-w-[358px] flex-col gap-8 sm:max-w-none">
          <div className="flex flex-col gap-5">
            <Badge variant="outline" className="w-fit font-mono uppercase tracking-normal text-primary">
              {hero.badge}
            </Badge>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.08] tracking-normal text-foreground [overflow-wrap:anywhere] sm:text-5xl md:text-7xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {hero.copy}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={localizedPath("/handbook", locale)}>
                {hero.start} <BookOpen data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={localizedPath("/handbook/platform-map", locale)}>
                {hero.map} <Map data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href={localizedPath("/contact", locale)}>
                {hero.projects} <Mail data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="manual-surface relative w-full max-w-[358px] rounded-lg p-5 sm:max-w-none">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-xs uppercase text-muted-foreground">{hero.mapVersion}</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <div className="grid gap-3">
            {hero.layers.map((layer, index) => (
              <div key={layer} className="flex items-center gap-3 rounded-md border border-border/80 bg-background/55 p-3">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm text-foreground">{layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
