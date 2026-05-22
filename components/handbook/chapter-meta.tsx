import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";

type ChapterMetaProps = {
  level: string;
  status: string;
  audience: string[];
  tags?: string[];
  published?: string;
  updated?: string;
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
    beginner: "Базовый уровень",
    intermediate: "Прикладной уровень",
    advanced: "Глубокий разбор",
    expert: "Экспертный уровень"
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
    "ai-platform-lead": "Руководители ИИ-платформ",
    "staff-engineer": "Staff-инженеры",
    "principal-engineer": "Principal-инженеры",
    "ml-platform-engineer": "ML Platform-инженеры",
    "mlops-engineer": "MLOps-инженеры",
    "backend-engineer": "Backend-инженеры",
    "engineering-manager": "Инженерные руководители",
    cto: "CTO",
    "product-engineer": "Продуктовые инженеры"
  }
} as const;

const statusLabels = {
  en: {
    draft: "v0.1",
    published: "Published",
    evergreen: "Evergreen",
    deprecated: "Archived"
  },
  ru: {
    draft: "v0.1",
    published: "Опубликовано",
    evergreen: "Актуальная глава",
    deprecated: "Архив"
  }
} as const;

function labelFor<T extends Record<string, string>>(labels: T, value: string) {
  return labels[value as keyof T] ?? value;
}

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function ChapterMeta({
  level,
  status,
  audience,
  tags = [],
  published,
  updated,
  locale = "en"
}: ChapterMetaProps) {
  const statusLabel = labelFor(statusLabels[locale], status);
  const updatedLabel = formatDate(updated ?? published, locale);
  const updatedText =
    updatedLabel && (locale === "ru" ? `Обновлено ${updatedLabel}` : `Updated ${updatedLabel}`);

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Badge variant="outline">{labelFor(levelLabels[locale], level)}</Badge>
      <Badge variant="muted">{statusLabel}</Badge>
      {updatedText ? <Badge variant="outline">{updatedText}</Badge> : null}
      {audience.slice(0, 3).map((item) => (
        <Badge key={item} variant="secondary">
          {labelFor(audienceLabels[locale], item)}
        </Badge>
      ))}
      {tags.slice(0, 4).map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
