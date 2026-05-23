"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { summarizeQualityGate, type QualityGateItem } from "@/lib/tools/quality-gate";
import { getDictionary, type Locale } from "@/lib/i18n";

const itemIds = [
  "dataset",
  "taxonomy",
  "offline",
  "regression",
  "canary",
  "fallback",
  "observability",
  "router",
  "long-context",
  "owner"
] as const;
const checkedByDefault = new Set<string>(["dataset", "taxonomy", "fallback", "owner"]);

export function QualityGateChecklist({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale).tools.quality;
  const seedItems: QualityGateItem[] = itemIds.map((id, index) => ({
    id,
    label: dictionary.items[index],
    checked: checkedByDefault.has(id)
  }));
  const [items, setItems] = useState(seedItems);
  const summary = useMemo(() => summarizeQualityGate({ items }), [items]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.checklistTitle}</CardTitle>
          <CardDescription>{dictionary.checklistDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {items.map((item) => (
            <label key={item.id} className="flex cursor-pointer gap-3 rounded-md border border-border bg-background/55 p-3 text-sm">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((candidate) =>
                      candidate.id === item.id ? { ...candidate, checked: event.target.checked } : candidate
                    )
                  )
                }
                className="mt-1 accent-cyan-300"
              />
              <span className="text-muted-foreground">{item.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.readinessTitle}</CardTitle>
          <CardDescription>{dictionary.readinessDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div>
            <p className="text-5xl font-semibold">{summary.percent}%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {summary.completed} / {summary.total} {dictionary.complete}
            </p>
          </div>
          <Progress value={summary.percent} />
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="font-mono text-xs uppercase text-muted-foreground">{dictionary.status}</p>
            <p className="mt-2 text-2xl font-semibold">{dictionary.statuses[summary.status]}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
