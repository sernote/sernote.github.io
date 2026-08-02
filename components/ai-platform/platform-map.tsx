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

function displayStatus(area: PlatformMapAreaViewModel): "Проверено" | "Нужна проверка" | "Запланировано" {
  if (area.statusLabel === "Доступно") return "Проверено";
  if (area.statusLabel === "Нужна проверка") return "Нужна проверка";
  return "Запланировано";
}

function AreaContents({ area }: { area: PlatformMapAreaViewModel }) {
  const presentation = getAreaPresentation(area);
  const status = displayStatus(area);

  return (
    <div className="grid min-w-0 gap-5 py-6 md:grid-cols-[2.5rem_minmax(0,1fr)_8rem] md:gap-x-6 lg:grid-cols-[2.5rem_minmax(13rem,0.9fr)_minmax(13rem,0.9fr)_minmax(15rem,1.1fr)_8rem] lg:items-start lg:gap-x-8">
      <span className="text-xs font-medium text-muted-foreground">{area.index}</span>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold leading-6 tracking-[-0.015em] text-foreground">
          {presentation.title}
          {area.href === null ? null : (
            <ArrowRight aria-hidden="true" className="ml-2 inline size-4 text-primary" />
          )}
        </h2>
        <p className="mt-3 text-xs font-medium text-muted-foreground">Назначение</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.purpose}</p>
        <p className="mt-3 text-xs font-medium text-muted-foreground">Граница ответственности</p>
        <p className="mt-2 text-sm leading-6 text-foreground">{area.mapBoundary}</p>
      </div>
      <div className="min-w-0 md:col-start-2 lg:col-start-auto">
        <p className="text-xs font-medium text-muted-foreground">Ключевой вопрос</p>
        <p className="mt-2 text-sm leading-6 text-foreground">{presentation.question}</p>
      </div>
      <div className="min-w-0 md:col-start-2 lg:col-start-auto">
        <p className="text-xs font-medium text-muted-foreground">Основные компоненты</p>
        <p className="mt-2 text-sm leading-6 text-foreground">{presentation.components}</p>
      </div>
      <p
        data-area-status={status}
        className="text-sm text-muted-foreground md:col-start-3 md:row-start-1 md:text-right lg:col-start-auto lg:row-start-auto"
      >
        {status}
      </p>
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
