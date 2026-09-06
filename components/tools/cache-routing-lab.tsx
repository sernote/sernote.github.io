"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { compareCacheRoutes, type CacheRoutingInput } from "@/lib/experiments/cache-routing";

const INITIAL_INPUT: CacheRoutingInput = {
  warmQueueMs: 100,
  coldQueueMs: 100,
  coldPrefillMs: 600,
  warmPrefillMs: 80,
  prefixAvailable: true
};

const PRESETS = {
  warmWins: { ...INITIAL_INPUT, warmQueueMs: 100 },
  coldWins: { ...INITIAL_INPUT, warmQueueMs: 900 }
} satisfies Record<string, CacheRoutingInput>;

export function CacheRoutingLab() {
  const controlPrefix = useId();
  const [input, setInput] = useState<CacheRoutingInput>(INITIAL_INPUT);
  const result = useMemo(() => compareCacheRoutes(input), [input]);
  const resultLabel =
    result.winner === "tie"
      ? "Ничья: расчётное время одинаково"
      : `Побеждает реплика ${result.winner}: меньше расчётное время`;
  const candidateALabel = input.prefixAvailable
    ? "A · кэш доступен"
    : "A · префикс недоступен, полный prefill";

  return (
    <section className="not-prose my-8 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-7" aria-labelledby={`${controlPrefix}-title`}>
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Интерактивная модель</p>
        <h3 id={`${controlPrefix}-title`} className="mt-2 text-2xl font-semibold tracking-tight">
          Кэш или свободная очередь?
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Меняйте очередь и время обработки входа, чтобы найти, когда выгоднее пересчитать префикс.
          В этой учебной модели складываются ожидание и prefill; сеть и генерацию ответа оценивают отдельно.
        </p>
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="space-y-5">
          <RangeControl
            id={`${controlPrefix}-warm-queue`}
            label={input.prefixAvailable ? "Очередь реплики A с кэшем" : "Очередь реплики A без доступного префикса"}
            value={input.warmQueueMs}
            min={0}
            max={1500}
            step={20}
            onChange={(warmQueueMs) => setInput((current) => ({ ...current, warmQueueMs }))}
          />
          <RangeControl
            id={`${controlPrefix}-cold-queue`}
            label="Очередь реплики B без кэша"
            value={input.coldQueueMs}
            min={0}
            max={1000}
            step={20}
            onChange={(coldQueueMs) => setInput((current) => ({ ...current, coldQueueMs }))}
          />
          <RangeControl
            id={`${controlPrefix}-warm-prefill`}
            label="Обработка A при попадании в кэш"
            value={input.warmPrefillMs}
            min={0}
            max={input.coldPrefillMs}
            step={20}
            disabled={!input.prefixAvailable}
            description={!input.prefixAvailable ? "Префикс недоступен: в расчёте A используется полный prefill." : undefined}
            onChange={(warmPrefillMs) => setInput((current) => ({ ...current, warmPrefillMs }))}
          />
          <RangeControl
            id={`${controlPrefix}-cold-prefill`}
            label="Полный prefill без кэша"
            value={input.coldPrefillMs}
            min={input.warmPrefillMs}
            max={1200}
            step={20}
            onChange={(coldPrefillMs) => setInput((current) => ({ ...current, coldPrefillMs }))}
          />

          <label htmlFor={`${controlPrefix}-prefix`} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <input
              id={`${controlPrefix}-prefix`}
              type="checkbox"
              checked={input.prefixAvailable}
              onChange={(event) => setInput((current) => ({ ...current, prefixAvailable: event.target.checked }))}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span>
              <span className="block text-sm font-medium">Префикс доступен на реплике A</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                Если выключить, A тоже выполняет полный prefill: одного адреса «тёплой» реплики недостаточно.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Сценарии модели">
            <Button type="button" variant="outline" onClick={() => setInput(PRESETS.warmWins)}>Короткая очередь A</Button>
            <Button type="button" variant="outline" onClick={() => setInput(PRESETS.coldWins)}>Длинная очередь A</Button>
            <Button type="button" variant="ghost" onClick={() => setInput(INITIAL_INPUT)}>Сбросить</Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <p className="text-sm font-semibold" role="status">
            {resultLabel}. A — {result.candidateA.totalMs} мс, B — {result.candidateB.totalMs} мс.
          </p>
          <div className="mt-5 space-y-5">
            <CandidateBar label={candidateALabel} candidate={result.candidateA} maxTotal={Math.max(result.candidateA.totalMs, result.candidateB.totalMs)} />
            <CandidateBar label="B · холодный prefill" candidate={result.candidateB} maxTotal={Math.max(result.candidateA.totalMs, result.candidateB.totalMs)} />
          </div>
          <div className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            <p>
              Граница для очереди A: <strong className="text-foreground">{result.warmQueueBreakEvenMs} мс</strong>.
              Ниже неё быстрее A, выше — B, на границе получается ничья.
            </p>
            <p className="mt-3 font-mono text-xs">total = queue + remaining prefill</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RangeControl({ id, label, value, min, max, step, disabled = false, description, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; disabled?: boolean; description?: string; onChange: (value: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <output htmlFor={id} className="font-mono text-sm tabular-nums">{value} мс</output>
      </div>
      <input id={id} type="range" value={value} min={min} max={max} step={step} disabled={disabled} aria-describedby={description ? `${id}-description` : undefined} onChange={(event) => onChange(event.currentTarget.valueAsNumber)} className="h-2 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50" />
      {description ? <p id={`${id}-description`} className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function CandidateBar({ label, candidate, maxTotal }: { label: string; candidate: { queueMs: number; prefillMs: number; totalMs: number }; maxTotal: number }) {
  const width = maxTotal === 0 ? 0 : (candidate.totalMs / maxTotal) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <span className="text-sm">{label}</span>
        <strong className="font-mono text-lg tabular-nums">{candidate.totalMs} мс</strong>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${width}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Очередь {candidate.queueMs} мс + prefill {candidate.prefillMs} мс</p>
    </div>
  );
}
