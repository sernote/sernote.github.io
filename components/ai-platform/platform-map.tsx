import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type {
  PlatformMapAreaViewModel,
  PlatformMapViewModel
} from "@/lib/content-v3/view-models";

type AreaPresentation = Readonly<{
  title: string;
  question: string;
  components: string;
}>;

const AREA_PRESENTATION: Readonly<Record<string, AreaPresentation>> = Object.freeze({
  "strategy-boundaries": Object.freeze({
    title: "Стратегия и границы",
    question: "Когда общая платформа оправдана, а когда достаточно одного сценария?",
    components: "Сценарии, зрелость, execution mode, критерии инвестиции"
  }),
  "control-plane": Object.freeze({
    title: "Управляющий контур (Control Plane)",
    question: "Какие общие контракты управляют доступом, маршрутами и выпуском?",
    components: "Platform API и SDK, gateway, registry, routing, policies, quotas"
  }),
  "inference-plane": Object.freeze({
    title: "Контур инференса (Inference Plane)",
    question: "Где и как исполняется модельная нагрузка?",
    components: "Runtimes, model pools, scheduling, batching, cache"
  }),
  "context-agent-runtime": Object.freeze({
    title: "Контекст и исполнение агентов (Context & Agent Runtime)",
    question: "Как система собирает контекст, вызывает tools и хранит состояние?",
    components: "Retrieval lifecycle, tool registry, execution, state, memory"
  }),
  "quality-lifecycle": Object.freeze({
    title: "Качество и жизненный цикл",
    question: "Как изменение проходит проверку и попадает в production?",
    components: "Evals, datasets, release gates, model/prompt/agent lifecycle"
  }),
  "operations-economics": Object.freeze({
    title: "Эксплуатация и экономика",
    question: "Как связать SLO, capacity, инциденты и стоимость результата?",
    components: "Observability, SLO, capacity, incidents, cost attribution"
  }),
  "security-ownership": Object.freeze({
    title: "Безопасность и ответственность",
    question: "Где проходят границы данных, доступа и operational ownership?",
    components: "Data boundaries, guardrails, access, audit, ownership"
  })
});

export function getAreaPresentation(area: PlatformMapAreaViewModel): AreaPresentation {
  return (
    AREA_PRESENTATION[area.entityId] ??
    Object.freeze({
      title: area.title,
      question: area.mapBoundary,
      components: "Состав области уточняется"
    })
  );
}

export function displayStatus(area: PlatformMapAreaViewModel): "Читать" | "Нужна проверка" | "Запланировано" {
  if (area.statusLabel === "Доступно") return "Читать";
  if (area.statusLabel === "Нужна проверка") return "Нужна проверка";
  return "Запланировано";
}

function AreaContents({ area }: { area: PlatformMapAreaViewModel }) {
  const presentation = getAreaPresentation(area);
  const status = displayStatus(area);

  return (
    <div
      data-map-layout="editorial-two-column"
      className="grid min-w-0 gap-5 py-7 md:grid-cols-[2.5rem_minmax(0,1fr)] md:gap-x-6 md:py-8"
    >
      <span className="text-xs font-medium text-muted-foreground">{area.index}</span>
      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h2 className="text-lg font-semibold leading-6 tracking-[-0.015em] text-foreground">
              {presentation.title}
              {area.href === null ? null : (
                <ArrowRight aria-hidden="true" className="ml-2 inline size-4 text-primary" />
              )}
            </h2>
            <p data-area-status={status} className="shrink-0 text-xs text-muted-foreground">
              {status}
            </p>
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground">Назначение</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.purpose}</p>
          <p className="mt-4 text-xs font-medium text-muted-foreground">Граница ответственности</p>
          <p className="mt-2 text-sm leading-6 text-foreground">{area.mapBoundary}</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">Ключевой вопрос</p>
          <p className="mt-2 text-sm leading-6 text-foreground">{presentation.question}</p>
          <p className="mt-5 text-xs font-medium text-muted-foreground">Основные компоненты</p>
          <p className="mt-2 text-sm leading-6 text-foreground">{presentation.components}</p>
        </div>
      </div>
    </div>
  );
}

export function PlatformMap({ model }: { model: PlatformMapViewModel }) {
  return (
    <ol
      aria-label="Области AI Platform"
      data-reading-direction="ordered-linear"
      className="m-0 list-none border-t border-border p-0"
    >
      {model.areas.map((area) => (
        <li
          key={area.entityId}
          data-platform-area={area.entityId}
          data-map-row=""
          className="min-w-0 border-b border-border"
        >
          {area.href === null ? (
            <AreaContents area={area} />
          ) : (
            <Link
              href={area.href}
              data-area-link={area.entityId}
              className="group block min-h-11 min-w-0 hover:bg-[var(--surface-subtle)] focus-visible:bg-[var(--surface-subtle)]"
            >
              <AreaContents area={area} />
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Areas that span the full width of the outline: strategy on top, control plane below, security as the base. */
const FULL_WIDTH_AREAS = new Set(["strategy-boundaries", "control-plane", "security-ownership"]);

const STATUS_TONE = Object.freeze({
  "Читать": "accent",
  "Нужна проверка": "warn",
  "Запланировано": "muted"
} as const);

/**
 * Compact schematic of the capability map for the AI Platform entrance.
 * It mirrors the map rows as layered blocks and is purely descriptive: the
 * linked area list and the full map remain the navigable versions.
 */
export function PlatformOutline({ model }: { model: PlatformMapViewModel }) {
  const statuses = (Object.keys(STATUS_TONE) as (keyof typeof STATUS_TONE)[]).filter((status) =>
    model.areas.some((area) => displayStatus(area) === status)
  );
  return (
    <figure data-platform-outline="" className="panel m-0 p-4 sm:p-5">
      <figcaption className="section-kicker">Карта областей</figcaption>
      <ol className="m-0 mt-4 grid list-none grid-cols-2 gap-1.5 p-0">
        {model.areas.map((area) => {
          const [title, english] = getAreaPresentation(area).title.split(" (");
          const status = displayStatus(area);
          return (
            <li
              key={area.entityId}
              data-outline-area={area.entityId}
              className={`flex min-w-0 flex-col justify-between gap-3 border border-border bg-background/60 px-3 py-2.5 ${FULL_WIDTH_AREAS.has(area.entityId) ? "col-span-2" : ""}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.6875rem] text-muted-foreground">{area.index}</span>
                <span aria-hidden="true" className="status-dot" data-tone={STATUS_TONE[status]} />
              </span>
              <span className="text-sm font-medium leading-5 text-foreground">
                {title}
                {english ? <span className="block font-mono text-[0.625rem] uppercase tracking-[0.08em] text-muted-foreground">{english.replace(")", "")}</span> : null}
                <span className="sr-only"> — {status}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p aria-hidden="true" className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {statuses.map((status) => (
          <span key={status} className="inline-flex items-center gap-2">
            <span className="status-dot" data-tone={STATUS_TONE[status]} />
            {status}
          </span>
        ))}
      </p>
    </figure>
  );
}
