"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateLlmCost } from "@/lib/tools/cost";
import { getDictionary, type Locale } from "@/lib/i18n";

export function LlmCostCalculator({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale).tools.cost;
  const [inputTokens, setInputTokens] = useState(10000);
  const [outputTokens, setOutputTokens] = useState(2000);
  const [cachedInputTokens, setCachedInputTokens] = useState(6000);
  const [inputPricePerMillion, setInputPricePerMillion] = useState(3);
  const [cachedInputPricePerMillion, setCachedInputPricePerMillion] = useState(0.3);
  const [outputPricePerMillion, setOutputPricePerMillion] = useState(15);
  const [requestCount, setRequestCount] = useState(100);

  const result = useMemo(
    () =>
      calculateLlmCost({
        inputTokens,
        outputTokens,
        cachedInputTokens,
        inputPricePerMillion,
        cachedInputPricePerMillion,
        outputPricePerMillion,
        requestCount
      }),
    [
      cachedInputPricePerMillion,
      cachedInputTokens,
      inputPricePerMillion,
      inputTokens,
      outputPricePerMillion,
      outputTokens,
      requestCount
    ]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.formTitle}</CardTitle>
          <CardDescription>{dictionary.formDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <NumberField label={dictionary.fields[0]} value={inputTokens} onChange={setInputTokens} />
          <NumberField label={dictionary.fields[1]} value={outputTokens} onChange={setOutputTokens} />
          <NumberField label={dictionary.fields[2]} value={cachedInputTokens} onChange={setCachedInputTokens} />
          <NumberField label={dictionary.fields[3]} value={requestCount} onChange={setRequestCount} />
          <NumberField label={dictionary.fields[4]} value={inputPricePerMillion} onChange={setInputPricePerMillion} />
          <NumberField label={dictionary.fields[5]} value={cachedInputPricePerMillion} onChange={setCachedInputPricePerMillion} />
          <NumberField label={dictionary.fields[6]} value={outputPricePerMillion} onChange={setOutputPricePerMillion} />
        </CardContent>
      </Card>
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.resultTitle}</CardTitle>
          <CardDescription>{dictionary.resultDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Metric label={dictionary.metrics[0]} value={`$${result.costWithoutCache.toFixed(2)}`} />
          <Metric label={dictionary.metrics[1]} value={`$${result.costWithCache.toFixed(2)}`} />
          <Metric label={dictionary.metrics[2]} value={`$${result.savings.toFixed(2)}`} />
          <Metric label={dictionary.metrics[3]} value={`${result.savingsPercent}%`} />
        </CardContent>
      </Card>
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-xs uppercase text-muted-foreground">{label}</span>
      <Input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/55 p-4">
      <p className="font-mono text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
