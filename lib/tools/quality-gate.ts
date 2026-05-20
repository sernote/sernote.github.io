export type QualityGateItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type QualityGateInput = {
  items: QualityGateItem[];
};

export type QualityGateSummary = {
  completed: number;
  total: number;
  percent: number;
  status: "ready" | "needs-work" | "blocked";
};

export function summarizeQualityGate(input: QualityGateInput): QualityGateSummary {
  const total = input.items.length;
  const completed = input.items.filter((item) => item.checked).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    completed,
    total,
    percent,
    status: getStatus(percent, total)
  };
}

function getStatus(percent: number, total: number): QualityGateSummary["status"] {
  if (total === 0) {
    return "blocked";
  }

  if (percent >= 90) {
    return "ready";
  }

  if (percent >= 50) {
    return "needs-work";
  }

  return "blocked";
}

