import Link from "next/link";
import type { CacheSeries } from "@/lib/content-v3/cache-series";

export function ArticleSeries({ series }: { series: CacheSeries | null }) {
  if (!series) return null;
  return (
    <details className="mt-6 border-b border-border pb-4">
      <summary className="min-h-11 cursor-pointer py-3 text-sm text-muted-foreground marker:text-primary">
        {series.title} · {series.position} из {series.items.length}
      </summary>
      <nav aria-label={series.title}>
        <ol className="m-0 grid list-none gap-x-6 p-0 sm:grid-cols-2">
          {series.items.map((item, index) => (
            <li key={item.entityId}>
              {item.entityId === series.currentId ? (
                <span aria-current="page" className="flex min-h-11 items-center gap-3 py-3 text-sm font-semibold">
                  <span className="font-mono text-xs text-muted-foreground">{index + 1}</span>{item.title}
                </span>
              ) : (
                <Link href={item.href} className="flex min-h-11 items-center gap-3 py-3 text-sm text-primary hover:underline">
                  <span className="font-mono text-xs text-muted-foreground">{index + 1}</span>{item.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
