import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import evidence from "../../evidence/v3/agent-session-cache-reuse/layout-linter-output.json";

const checkoutPath = ".evidence-tools/audit-prompt-caching-v0.1.3";
const origin = "https://github.com/sernote/audit-prompt-caching.git";
const tag = "v0.1.3";
const head = "cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23";

function readRequiredFile(path: string): string {
  expect(existsSync(path), `Missing required file: ${path}`).toBe(true);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

describe("agent-session cache-reuse evidence recipe", () => {
  it("preserves the historical commands used to capture both runs", () => {
    expect(evidence.runs.map((run) => run.command)).toEqual([
      "python3 /private/tmp/notevskii-v3-audit-v0.1.3/audit-prompt-caching/scripts/layout_linter.py evidence/v3/agent-session-cache-reuse/step-stable.json",
      "python3 /private/tmp/notevskii-v3-audit-v0.1.3/audit-prompt-caching/scripts/layout_linter.py evidence/v3/agent-session-cache-reuse/step-drift.json"
    ]);
  });

  it("provides a fail-closed portable clone and exact origin, tag, and HEAD checks", () => {
    expect(evidence).toMatchObject({
      portableVerificationRecipe: {
        checkoutPath,
        origin,
        tag,
        head,
        freshCloneCommand: `test ! -e ${checkoutPath} && git clone --depth 1 --branch ${tag} ${origin} ${checkoutPath}`,
        originCheckCommand: `git -C ${checkoutPath} remote get-url origin | grep -Fx '${origin}'`,
        exactTagCheckCommand: `git -C ${checkoutPath} describe --tags --exact-match HEAD | grep -Fx '${tag}'`,
        headCheckCommand: `git -C ${checkoutPath} rev-parse HEAD | grep -Fx '${head}'`
      }
    });
  });
});

describe("v3.1 public content evidence", () => {
  it("defines the frozen source-backed author profile contract", () => {
    const profileText = readRequiredFile(
      join(process.cwd(), "lib/author-profile.ts")
    );

    for (const exactValue of [
      'id: "https://notevskii.tech/about/#person"',
      'name: "Сергей Нотевский"',
      'role: "AI Platform Lead"',
      'company: "Битрикс24"',
      'url: "https://notevskii.tech/about/"',
      '"https://habr.com/ru/users/Ser_no/"',
      '"https://github.com/sernote"',
      '"https://t.me/sergeinotevskii"',
      "В 2024 году я выступал как продакт-менеджер и AI-евангелист Битрикс24, в 2025-м — как AI-евангелист и разработчик команды CoPilot. Сейчас моя публичная роль — AI Platform Lead. Я отвечаю за направление LLM-моделей: поиск, анализ, адаптацию и тестирование на сценариях Битрикс24."
    ]) {
      expect(profileText).toContain(exactValue);
    }
    expect(profileText).toMatch(/export const AUTHOR_PROFILE = Object\.freeze\(/);
    expect(profileText).toMatch(/sameAs:\s*Object\.freeze\(\[/);
    expect(profileText).not.toMatch(/webinars\.bitrix24\.by|mergeconf\.ru|thecode\.media/);
  });

  it("keeps the exact compact native workload note", () => {
    const noteText = readRequiredFile(
      join(process.cwd(), "content/v3/blog/workload-shape-over-model-name.mdx")
    );

    expect(noteText).toContain("entityId: workload-shape-over-model-name");
    expect(noteText).toContain("editorialFormat: note");
    expect(noteText).toContain('publishedAt: "2026-07-22"');
    expect(noteText).toContain(
      "Название модели почти ничего не говорит о том, как будет работать конкретный сервис."
    );
    expect(noteText).toContain(
      "Подробнее границы этого решения разобраны в [Inference Plane](/ai-platform/areas/inference-plane)."
    );
    expect(noteText.match(/^## /gm)).toBeNull();
  });

  it("replaces the old external note with the five verified publication records", () => {
    const publicationDir = join(process.cwd(), "content/v3/publications");
    const expectedFiles = [
      "prefix-cache-the-code.mdx",
      "prefix-cache-habr.mdx",
      "effective-cost-habr.mdx",
      "agent-skills-habr.mdx",
      "prompt-engineering-vc.mdx"
    ];

    for (const fileName of expectedFiles) {
      const text = readRequiredFile(join(publicationDir, fileName));
      expect(text).toContain("kind: external-note");
      expect(text).toContain("slug: null");
      expect(text).toContain("editorialFormat: null");
      expect(text).toContain("publicationStatus: published");
      expect(text).toContain('updatedAt: "2026-08-02"');
      expect(text).toContain("supersedes: null");
      expect(text).toContain("supersededBy: null");
    }

    expect(
      existsSync(join(process.cwd(), "content/v3/blog/short-prompt-not-cheap.mdx"))
    ).toBe(false);
  });

  it("moves the synthetic case relation from the deleted note to its verified replacement", () => {
    const caseText = readRequiredFile(
      join(
        process.cwd(),
        "content/v3/ai-platform/cases/agent-session-cache-reuse.mdx"
      )
    );

    expect(caseText).toContain("    - prefix-cache-habr");
    expect(caseText).toContain(
      "[«Короткий промпт ≠ дешёвый промпт: как оптимизация ломает prefix cache в LLM-агентах»](https://habr.com/ru/companies/bitrix/articles/1033822/)"
    );
    expect(caseText).not.toContain("short-prompt-not-cheap");
  });

  it("keeps published external notes from pointing to draft-only platform areas", () => {
    for (const fileName of ["agent-skills-habr.mdx", "prompt-engineering-vc.mdx"]) {
      const text = readRequiredFile(
        join(process.cwd(), "content/v3/publications", fileName)
      );

      expect(text).toContain("relations: {}");
      expect(text).not.toContain("context-agent-runtime");
    }
  });
});
