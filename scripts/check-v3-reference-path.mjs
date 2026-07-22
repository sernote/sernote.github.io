import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

const exportRoot = resolve(process.argv[2] ?? "out");

function isWithinExportRoot(absolutePath) {
  const relativePath = relative(exportRoot, absolutePath);
  return relativePath === "" || (!relativePath.startsWith("..") && !isAbsolute(relativePath));
}

const pages = Object.freeze({
  landing: "ai-platform/index.html",
  map: "ai-platform/map/index.html",
  area: "ai-platform/areas/inference-plane/index.html",
  component: "ai-platform/components/prefix-cache/index.html",
  case: "ai-platform/cases/agent-session-cache-reuse/index.html",
  project: "projects/audit-prompt-caching/index.html"
});

const transitions = Object.freeze([
  ["landing", "/ai-platform/map"],
  ["landing", "#current-vertical"],
  ["landing", "/ai-platform/areas/inference-plane"],
  ["landing", "/ai-platform/components/prefix-cache"],
  ["landing", "/ai-platform/cases/agent-session-cache-reuse"],
  ["landing", "/projects/audit-prompt-caching"],
  ["map", "/ai-platform"],
  ["map", "/ai-platform/areas/inference-plane"],
  ["area", "/ai-platform/map"],
  ["area", "/ai-platform/components/prefix-cache"],
  ["component", "/ai-platform/areas/inference-plane"],
  ["component", "/ai-platform/cases/agent-session-cache-reuse"],
  ["component", "/projects/audit-prompt-caching"],
  ["case", "/ai-platform/components/prefix-cache"],
  ["case", "/projects/audit-prompt-caching"],
  ["project", "/ai-platform/components/prefix-cache"]
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasExactLink(html, target) {
  const escapedTarget = escapeRegExp(target);
  return new RegExp(
    `<a\\b[^>]*\\bhref\\s*=\\s*["']${escapedTarget}/?["'][^>]*>`,
    "i"
  ).test(html);
}

const failures = [];
const htmlByPage = new Map();

for (const [page, relativePath] of Object.entries(pages)) {
  const absolutePath = resolve(exportRoot, relativePath);
  if (!isWithinExportRoot(absolutePath)) {
    failures.push(`unsafe export path: ${relativePath}`);
    continue;
  }
  if (!existsSync(absolutePath)) {
    failures.push(`missing export file: ${relativePath}`);
    continue;
  }
  htmlByPage.set(page, readFileSync(absolutePath, "utf8"));
}

for (const [from, target] of transitions) {
  const html = htmlByPage.get(from);
  if (html !== undefined && !hasExactLink(html, target)) {
    failures.push(`missing transition from ${from} to ${target}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`V3 reference path audit: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `V3 reference path audit passed: ${Object.keys(pages).length} files, ${transitions.length} transitions`
  );
}
