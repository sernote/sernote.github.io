"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { estimatePrefixCacheability } from "@/lib/tools/prefix-cache";
import { getDictionary, type Locale } from "@/lib/i18n";

export function PrefixCacheAuditor({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale).tools.prefix;
  const examples = getPrefixExamples(locale);
  const [systemPrompt, setSystemPrompt] = useState(examples.unstable.systemPrompt);
  const [toolSchemaJson, setToolSchemaJson] = useState(examples.unstable.toolSchemaJson);
  const [exampleRequestOne, setExampleRequestOne] = useState(examples.unstable.exampleRequestOne);
  const [exampleRequestTwo, setExampleRequestTwo] = useState(examples.unstable.exampleRequestTwo);

  const result = useMemo(
    () =>
      estimatePrefixCacheability({
        systemPrompt,
        toolSchemaJson,
        exampleRequestOne,
        exampleRequestTwo
      }),
    [exampleRequestOne, exampleRequestTwo, systemPrompt, toolSchemaJson]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.formTitle}</CardTitle>
          <CardDescription>{dictionary.formDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label={dictionary.fields[0]} value={systemPrompt} onChange={setSystemPrompt} />
          <Field label={dictionary.fields[1]} value={toolSchemaJson} onChange={setToolSchemaJson} />
          <Field label={dictionary.fields[2]} value={exampleRequestOne} onChange={setExampleRequestOne} />
          <Field label={dictionary.fields[3]} value={exampleRequestTwo} onChange={setExampleRequestTwo} />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSystemPrompt(examples.stable.systemPrompt);
              setToolSchemaJson(examples.stable.toolSchemaJson);
              setExampleRequestOne(examples.stable.exampleRequestOne);
              setExampleRequestTwo(examples.stable.exampleRequestTwo);
            }}
          >
            {dictionary.loadStable}
          </Button>
        </CardContent>
      </Card>
      <Card className="border-border/80 bg-card/70">
        <CardHeader>
          <CardTitle>{dictionary.resultTitle}</CardTitle>
          <CardDescription>{dictionary.resultDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <div className="mb-2 flex items-end justify-between">
              <span className="text-5xl font-semibold">{result.score}</span>
              <span className="font-mono text-xs uppercase text-muted-foreground">/ 100</span>
            </div>
            <Progress value={result.score} />
          </div>
          <ResultGroup title={dictionary.groups[0]} items={translatePrefixItems(result.unstableSegments, locale)} noIssue={dictionary.noIssue} />
          <ResultGroup title={dictionary.groups[1]} items={translatePrefixItems(result.dynamicFieldWarnings, locale)} noIssue={dictionary.noIssue} />
          <ResultGroup
            title={dictionary.groups[2]}
            items={translatePrefixItems(result.toolSchemaVolatilityWarnings, locale)}
            noIssue={dictionary.noIssue}
          />
          <ResultGroup title={dictionary.groups[3]} items={translatePrefixItems(result.recommendations, locale)} noIssue={dictionary.noIssue} positive />
        </CardContent>
      </Card>
    </div>
  );
}

function getPrefixExamples(locale: Locale) {
  if (locale === "ru") {
    return {
      unstable: {
        systemPrompt:
          "Ты production AI assistant. Следуй стабильной policy и отвечай кратко, но в начале случайно используй {{current_date}}.",
        toolSchemaJson:
          "{\"name\":\"search_docs\",\"properties\":{\"query\":{\"type\":\"string\"},\"trace_id\":{\"type\":\"string\"}}}",
        exampleRequestOne: "Суммаризируй account 123 с текущим timestamp 2026-05-18T10:10:00Z",
        exampleRequestTwo: "Суммаризируй account 987 с текущим timestamp 2026-05-18T10:11:00Z"
      },
      stable: {
        systemPrompt: "Классифицируй requests по фиксированной taxonomy. Stable instructions всегда остаются первыми.",
        toolSchemaJson: "{\"name\":\"classify\",\"properties\":{\"label\":{\"enum\":[\"sales\",\"support\"]}}}",
        exampleRequestOne: "Классифицируй request: клиент спрашивает про invoice",
        exampleRequestTwo: "Классифицируй request: клиент спрашивает про CRM export"
      }
    };
  }

  return {
    unstable: {
      systemPrompt: "You are a production AI assistant. Follow the stable policy and answer with concise reasoning.",
      toolSchemaJson:
        "{\"name\":\"search_docs\",\"properties\":{\"query\":{\"type\":\"string\"},\"trace_id\":{\"type\":\"string\"}}}",
      exampleRequestOne: "Summarize account 123 using the current timestamp 2026-05-18T10:10:00Z",
      exampleRequestTwo: "Summarize account 987 using the current timestamp 2026-05-18T10:11:00Z"
    },
    stable: {
      systemPrompt: "You classify requests using a fixed taxonomy. Stable instructions stay first.",
      toolSchemaJson: "{\"name\":\"classify\",\"properties\":{\"label\":{\"enum\":[\"sales\",\"support\"]}}}",
      exampleRequestOne: "Classify this request: customer asks about invoice",
      exampleRequestTwo: "Classify this request: customer asks about CRM export"
    }
  };
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-xs uppercase text-muted-foreground">{label}</span>
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ResultGroup({
  title,
  items,
  noIssue,
  positive = false
}: {
  title: string;
  items: string[];
  noIssue: string;
  positive?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase text-muted-foreground">{title}</p>
      {items.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          {noIssue}
        </div>
      ) : (
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              {positive ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function translatePrefixItems(items: string[], locale: Locale): string[] {
  if (locale === "en") {
    return items;
  }

  return items.map((item) => {
    if (item.startsWith("Tool schema includes volatile field: ")) {
      return `Схема инструмента содержит volatile field: ${item.replace("Tool schema includes volatile field: ", "")}`;
    }

    const translations: Record<string, string> = {
      "Tool schema is not valid JSON, which makes cache behavior harder to reason about.":
        "Tool schema не является валидным JSON, поэтому cache behavior сложнее анализировать.",
      "Move dates, user identifiers, and per-request values after the stable prompt prefix.":
        "Перенеси даты, user identifiers и per-request values после стабильного prompt prefix.",
      "Keep tool schemas stable and avoid embedding trace/session/request fields in the cached prefix.":
        "Держи tool schemas стабильными и не встраивай trace/session/request fields в cached prefix.",
      "Normalize dynamic fields into late request payloads instead of early system instructions.":
        "Нормализуй dynamic fields в поздний request payload, а не в ранние system instructions.",
      "Make the first tokens of similar requests identical so provider prefix caches can match them.":
        "Сделай первые токены похожих requests одинаковыми, чтобы provider prefix caches могли их матчить.",
      "The prompt shape is cache-friendly; keep stable instructions and schemas before dynamic payloads.":
        "Prompt shape выглядит cache-friendly: держи stable instructions и schemas перед dynamic payloads."
    };

    return translations[item] ?? item;
  });
}
