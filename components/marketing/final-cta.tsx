import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";

export function FinalCta({ locale = "en" }: { locale?: Locale }) {
  const cta = getDictionary(locale).finalCta;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="manual-surface rounded-lg p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase text-primary">{cta.label}</p>
            <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{cta.title}</h2>
            <p className="mt-4 text-muted-foreground">{cta.copy}</p>
          </div>
          <Button asChild size="lg">
            <Link href={localizedPath("/handbook/platform-map", locale)}>
              {cta.button} <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
