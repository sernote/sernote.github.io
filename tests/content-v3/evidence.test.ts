import { describe, expect, it } from "vitest";

import evidence from "../../evidence/v3/agent-session-cache-reuse/layout-linter-output.json";

const checkoutPath = ".evidence-tools/audit-prompt-caching-v0.1.3";
const origin = "https://github.com/sernote/audit-prompt-caching.git";
const tag = "v0.1.3";
const head = "cbf216e73b0b49064e44e7a9ed1a174d1c5dbd23";

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
