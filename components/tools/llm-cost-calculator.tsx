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
  const [agentSteps, setAgentSteps] = useState(1);
  const [acceptedResultRate, setAcceptedResultRate] = useState(85);
  const [retriesRate, setRetriesRate] = useState(5);
  const [fallbackRate, setFallbackRate] = useState(2);

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
  const agentMultiplier = Math.max(agentSteps, 1) * (1 + Math.max(retriesRate, 0) / 100) * (1 + Math.max(fallbackRate, 0) / 100);
  const agentSessionCost = result.costWithCache * agentMultiplier;
  const acceptedResults = requestCount * Math.max(acceptedResultRate, 0) / 100;
  const costPerAcceptedResult = acceptedResults === 0 ? 0 : agentSessionCost / acceptedResults;
  const degradedHitRateCost = useMemo(() => {
    const degradedCachedTokens = Math.round(inputTokens * 0.5);
    return calculateLlmCost({
      inputTokens,
      outputTokens,
      cachedInputTokens: degradedCachedTokens,
      inputPricePerMillion,
      cachedInputPricePerMillion,
      outputPricePerMillion,
      requestCount
    }).costWithCache * agentMultiplier;
  }, [
    agentMultiplier,
    cachedInputPricePerMillion,
    inputPricePerMillion,
    inputTokens,
    outputPricePerMillion,
    outputTokens,
    requestCount
  ]);

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
          <div className="sm:col-span-2 mt-2 border-t border-border pt-4">
            <p className="font-mono text-xs uppercase text-primary">{locale === "ru" ? "Режим агента" : "Agent mode"}</p>
          </div>
          <NumberField label={locale === "ru" ? "Шагов агента" : "Agent steps"} value={agentSteps} onChange={setAgentSteps} />
          <NumberField label={locale === "ru" ? "Принятый результат, %" : "Accepted result, %"} value={acceptedResultRate} onChange={setAcceptedResultRate} />
          <NumberField label={locale === "ru" ? "Повторы, %" : "Retries, %"} value={retriesRate} onChange={setRetriesRate} />
          <NumberField label={locale === "ru" ? "Резервный маршрут, %" : "Fallback, %"} value={fallbackRate} onChange={setFallbackRate} />
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
          <Metric label={locale === "ru" ? "Стоимость сессии агента" : "Agent session cost"} value={`$${agentSessionCost.toFixed(2)}`} />
          <Metric label={locale === "ru" ? "Стоимость принятого результата" : "Cost per accepted result"} value={`$${costPerAcceptedResult.toFixed(4)}`} />
          <Metric
            label={locale === "ru" ? "Если hit rate падает до 50%" : "If hit rate drops to 50%"}
            value={`$${degradedHitRateCost.toFixed(2)}`}
          />
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
