import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SectionCardProps = {
  title: string;
  description: string;
  href?: string;
};

export function SectionCard({ title, description, href }: SectionCardProps) {
  const body = (
    <Card className="h-full border-border/80 bg-card/70 transition-colors hover:border-primary/45">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span>{title}</span>
          {href ? <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (!href) {
    return body;
  }

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block h-full">
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  );
}
