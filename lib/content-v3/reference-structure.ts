export type ReferenceStructureContentType =
  | "platform-area"
  | "platform-component"
  | "case";

const REFERENCE_STRUCTURE_PLAN = Object.freeze({
  "platform-area": Object.freeze({
    headings: Object.freeze([
      "Что входит в область",
      "Что остаётся снаружи",
      "Workload shape важнее названия модели",
      "Компоненты пилота",
      "Наблюдаемые сигналы",
      "Trade-offs и отказоустойчивость",
      "Пересечения с соседними областями",
      "Связанные артефакты",
      "Применимость, ограничения и следующая проверка"
    ]),
    markers: Object.freeze([] as string[])
  }),
  "platform-component": Object.freeze({
    headings: Object.freeze([
      "Проблема и контекст",
      "Ответственность и граница",
      "Контракт запроса и основной поток",
      "Варианты реализации",
      "Метрики и evidence",
      "Failure modes",
      "Trade-offs и анти-паттерны",
      "Практический checklist",
      "Роль продуктов и OSS",
      "Связанные артефакты",
      "Применимость и ограничения"
    ]),
    markers: Object.freeze([] as string[])
  }),
  case: Object.freeze({
    headings: Object.freeze([
      "Контекст",
      "Наблюдаемый симптом",
      "Решение и ограничения",
      "Закреплённые команды",
      "Гипотезы после finding",
      "Изменение",
      "Валидация",
      "Что этот кейс доказывает",
      "Чего не доказывает",
      "Следующее проверочное действие"
    ]),
    markers: Object.freeze(["synthetic-disclosure"])
  })
} satisfies Record<
  ReferenceStructureContentType,
  Readonly<{ headings: readonly string[]; markers: readonly string[] }>
>);

/** Build-time gate fed by headings and semantic markers observed in actual MDX. */
export function validateReferenceStructure(input: {
  entityId: string;
  contentType: ReferenceStructureContentType;
  headings: readonly string[];
  markers: readonly string[];
}): void {
  const plan = REFERENCE_STRUCTURE_PLAN[input.contentType];
  const observedHeadings = new Set(input.headings);
  const observedMarkers = new Set(input.markers);
  const missing = [
    ...plan.headings.filter((heading) => !observedHeadings.has(heading)),
    ...plan.markers.filter((marker) => !observedMarkers.has(marker))
  ];

  if (missing.length > 0) {
    throw new Error(
      `Reference ${input.entityId} is missing required sections or markers: ${missing.join(", ")}`
    );
  }

  const headingsMatchPlan =
    input.headings.length === plan.headings.length &&
    plan.headings.every((heading, index) => input.headings[index] === heading);
  if (!headingsMatchPlan) {
    throw new Error(
      `Reference ${input.entityId} headings do not match the required order: ${plan.headings.join(" | ")}`
    );
  }
}
