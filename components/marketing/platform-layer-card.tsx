import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlatformLayerCardProps = {
  index: number;
  title: string;
  description: string;
};

export function PlatformLayerCard({ index, title, description }: PlatformLayerCardProps) {
  return (
    <Card className="border-border/80 bg-card/70">
      <CardHeader>
        <Badge variant="outline" className="w-fit font-mono text-primary">
          L{String(index + 1).padStart(2, "0")}
        </Badge>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

