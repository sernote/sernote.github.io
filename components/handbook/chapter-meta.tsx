import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";

type ChapterMetaProps = {
  level: string;
  status: string;
  audience: string[];
  locale?: Locale;
};

const levelLabels = {
  en: {
    beginner: "Foundation",
    intermediate: "Applied",
    advanced: "Deep dive",
    expert: "Expert"
  },
  ru: {
    beginner: "Основа",
    intermediate: "Практика",
    advanced: "Глубина",
    expert: "Эксперт"
  }
} as const;

const audienceLabels = {
  en: {
    "ai-platform-lead": "AI Platform Leads",
    "staff-engineer": "Staff Engineers",
    "principal-engineer": "Principal Engineers",
    "ml-platform-engineer": "ML Platform Engineers",
    "mlops-engineer": "MLOps Engineers",
    "backend-engineer": "Backend Engineers",
    "engineering-manager": "Engineering Managers",
    cto: "CTOs",
    "product-engineer": "Product Engineers"
  },
  ru: {
    "ai-platform-lead": "AI Platform Leads",
    "staff-engineer": "Staff Engineers",
    "principal-engineer": "Principal Engineers",
    "ml-platform-engineer": "ML Platform Engineers",
    "mlops-engineer": "MLOps Engineers",
    "backend-engineer": "Backend Engineers",
    "engineering-manager": "Engineering Managers",
    cto: "CTO",
    "product-engineer": "Product Engineers"
  }
} as const;

function labelFor<T extends Record<string, string>>(labels: T, value: string) {
  return labels[value as keyof T] ?? value;
}

export function ChapterMeta({ level, status, audience, locale = "en" }: ChapterMetaProps) {
  const statusLabel = status === "evergreen" ? "Evergreen" : "v0.1";

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Badge variant="outline">{labelFor(levelLabels[locale], level)}</Badge>
      <Badge variant="muted">{statusLabel}</Badge>
      {audience.slice(0, 3).map((item) => (
        <Badge key={item} variant="secondary">
          {labelFor(audienceLabels[locale], item)}
        </Badge>
      ))}
    </div>
  );
}
