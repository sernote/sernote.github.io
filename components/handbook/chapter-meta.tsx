import { Badge } from "@/components/ui/badge";

type ChapterMetaProps = {
  level: string;
  status: string;
  audience: string[];
};

export function ChapterMeta({ level, status, audience }: ChapterMetaProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Badge variant="outline">{level}</Badge>
      <Badge variant="muted">{status}</Badge>
      {audience.slice(0, 3).map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  );
}

