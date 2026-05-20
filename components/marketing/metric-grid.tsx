import { Badge } from "@/components/ui/badge";

type MetricGridProps = {
  items: Array<{
    value: string;
    label: string;
  }>;
};

export function MetricGrid({ items }: MetricGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="manual-surface rounded-lg p-5">
          <Badge variant="muted" className="mb-4 font-mono uppercase tracking-normal">
            {item.value}
          </Badge>
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

