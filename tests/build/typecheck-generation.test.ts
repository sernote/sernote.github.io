import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, expect, it } from "vitest";

const roots: string[] = [];
const projectRoot = resolve(import.meta.dirname, "../..");

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

it("typechecks complete MDX collections after Next interrupts its background generation", () => {
  const root = mkdtempSync(join(tmpdir(), "site-typecheck-"));
  roots.push(root);
  const write = (path: string, content: string) => {
    const destination = join(root, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, content);
  };
  const { scripts } = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf8"));

  symlinkSync(join(projectRoot, "node_modules"), join(root, "node_modules"), "junction");
  write("package.json", JSON.stringify({ private: true, type: "module" }));
  write("next.config.mjs", readFileSync(join(projectRoot, "next.config.mjs"), "utf8"));
  write("tsconfig.json", readFileSync(join(projectRoot, "tsconfig.json"), "utf8"));
  write("app/page.tsx", "export default function Page() { return null; }\n");
  write("app/layout.tsx", `import type { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return <html><body>{children}</body></html>;
}\n`);
  write("source.config.ts", `import { defineDocs, defineConfig } from "fumadocs-mdx/config";
export const docs = defineDocs({ dir: "content/docs" });
export default defineConfig();\n`);
  write("content/docs/index.mdx", "---\ntitle: Fixture\n---\n\n# Fixture\n");
  write("index.ts", `import { docs } from "collections/server";
docs.toFumadocsSource();\n`);

  // Next's CLI exits explicitly while createMDX's initialization is still
  // running. Hold a disk write pending after opening/truncating server.ts.
  // Hold the final route-type write until truncation so this is deterministic.
  write("slow-mdx-write.mjs", `import fs from "node:fs/promises";
if (process.argv.includes("typegen")) {
  const originalWrite = fs.writeFile.bind(fs);
  let markTruncated;
  const truncated = new Promise((resolve) => { markTruncated = resolve; });
  fs.writeFile = async (file, ...args) => {
    const path = String(file).replaceAll("\\\\", "/");
    if (path.endsWith(".source/server.ts")) {
      await originalWrite(file, "");
      await originalWrite("interrupted-write", "reproduced");
      markTruncated();
      await new Promise(() => {});
    }
    if (path.endsWith(".next/types/validator.ts")) await truncated;
    return originalWrite(file, ...args);
  };
}\n`);

  const result = spawnSync(scripts.typecheck, {
    cwd: root,
    shell: true,
    encoding: "utf8",
    timeout: 30_000,
    env: {
      ...process.env,
      PATH: `${dirname(process.execPath)}:${join(projectRoot, "node_modules/.bin")}:${process.env.PATH}`,
      NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --import=${pathToFileURL(join(root, "slow-mdx-write.mjs")).href}`,
      NEXT_TELEMETRY_DISABLED: "1"
    }
  });

  expect(result.error).toBeUndefined();
  expect(readFileSync(join(root, "interrupted-write"), "utf8")).toBe("reproduced");
  expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
  expect(readFileSync(join(root, ".source/server.ts"), "utf8")).toContain("export const docs");
}, 35_000);
