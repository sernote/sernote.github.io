import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import evidence from "../../evidence/v3/agent-session-cache-reuse/layout-linter-output.json";
import { AUTHOR_PROFILE } from "../../lib/author-profile";

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
    expect(AUTHOR_PROFILE.id).toBe("https://notevskii.tech/about/#person");
    expect(AUTHOR_PROFILE.name).toBe("Сергей Нотевский");
    expect(AUTHOR_PROFILE.role).toBe("AI Platform Lead");
    expect(AUTHOR_PROFILE.company).toBe("Битрикс24");
    expect(AUTHOR_PROFILE.url).toBe("https://notevskii.tech/about/");
    expect(AUTHOR_PROFILE.sameAs).toEqual([
      "https://habr.com/ru/users/Ser_no/",
      "https://github.com/sernote",
      "https://t.me/sergeinotevskii"
    ]);
    expect(AUTHOR_PROFILE.aboutIntro).toBe(
      "Мы ушли с внешних API на свои GPU. Всё, что было чужой проблемой за чужим SLA, стало моей."
    );
    expect(AUTHOR_PROFILE.channelName).toBe("AI да парень!");

    expect(AUTHOR_PROFILE.responsibilities.map(({ title }) => title)).toEqual([
      "Инференс и мощности",
      "Шлюз и доступ",
      "Модели",
      "Качество",
      "Стоимость и задержка",
      "Эксплуатация"
    ]);
    expect(AUTHOR_PROFILE.positions).toHaveLength(6);

    const aboutCopy = [
      AUTHOR_PROFILE.aboutIntro,
      AUTHOR_PROFILE.channelPitch,
      AUTHOR_PROFILE.organizerNote,
      ...AUTHOR_PROFILE.positions,
      ...AUTHOR_PROFILE.responsibilities.flatMap(({ title, body }) => [title, body])
    ];

    // The "не просто X, а Y" / "не только X, но и Y" negative parallelism is the single most
    // detectable LLM tell in Russian copy. Keep it out of the About page.
    for (const line of aboutCopy) {
      expect(line.trim().length).toBeGreaterThan(0);
      expect(line).not.toMatch(/не\s+просто\s+[^,.]+,\s*а\s/i);
      expect(line).not.toMatch(/не\s+только\s+[^,.]+,\s*но\s+и\s/i);
      expect(line).not.toMatch(/\b(?:является|данн(?:ый|ая|ое|ые))\b/i);
      expect(line).not.toMatch(/стоит\s+отметить|важно\s+понимать|таким\s+образом/i);
    }

    // AGENTS.md forbids publishing Bitrix24 internal scale, topology and cost. The About copy
    // must stay free of request volumes, fleet or headcount claims.
    const allCopy = JSON.stringify(AUTHOR_PROFILE);
    for (const forbidden of [
      /\d[\d\s.,]*\s*млн/i,
      /\d+\s*(?:млн|млрд|K|тыс)\+/i,
      /\d+\+\s*GPU/i,
      /GPU\s*(?:в\s*парке|-\s*нод)/i,
      /\d+\s*инженер/i,
      /\d+\s*(?:FTE|команд)/i,
      /запросов\s*(?:в|за)\s*(?:месяц|сутки|день)/i
    ]) {
      expect(allCopy).not.toMatch(forbidden);
    }

    expect(Object.isFrozen(AUTHOR_PROFILE)).toBe(true);
    expect(Object.isFrozen(AUTHOR_PROFILE.sameAs)).toBe(true);

    for (const collection of [AUTHOR_PROFILE.responsibilities, AUTHOR_PROFILE.positions]) {
      expect(Object.isFrozen(collection)).toBe(true);
      for (const entry of collection) {
        expect(Object.isFrozen(entry)).toBe(true);
      }
    }
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
