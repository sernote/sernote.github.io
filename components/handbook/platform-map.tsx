import { getPlatformLayers, type Locale } from "@/lib/i18n";

export function PlatformMap({ locale = "en" }: { locale?: Locale }) {
  const platformLayers = getPlatformLayers(locale);

  return (
    <div className="my-8 grid gap-3">
      {platformLayers.map((layer, index) => (
        <div key={layer.title} className="grid gap-3 rounded-lg border border-border bg-card/60 p-4 md:grid-cols-[72px_1fr] md:items-center">
          <div className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3 className="text-base font-semibold">{layer.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{layer.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
