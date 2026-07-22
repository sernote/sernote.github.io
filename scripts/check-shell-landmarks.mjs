import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const exportDirectory = path.resolve(process.argv[2] ?? "out");
const samples = [
  ["marketing page", "about/index.html"],
  ["tool page", "tools/prefix-cache-auditor/index.html"],
  ["handbook landing", "handbook/index.html"],
  ["handbook chapter", "handbook/start-here/index.html"],
  ["Russian compatibility chapter", "ru/handbook/start-here/index.html"]
];

const failures = [];

for (const [label, relativeFile] of samples) {
  const file = path.join(exportDirectory, relativeFile);
  const html = await readFile(file, "utf8");
  const skipLinks = html.match(/<a\b[^>]*\bhref=["']#main-content["'][^>]*>/gi) ?? [];
  const mainTags = html.match(/<main\b[^>]*>/gi) ?? [];
  const identifiedMains = mainTags.filter((tag) => /\bid=["']main-content["']/i.test(tag));

  if (skipLinks.length !== 1 || mainTags.length !== 1 || identifiedMains.length !== 1) {
    failures.push(
      `${label} (${relativeFile}): skip links=${skipLinks.length}, mains=${mainTags.length}, main#main-content=${identifiedMains.length}`
    );
  }
}

if (failures.length > 0) {
  console.error(["Shell landmark audit failed:", ...failures.map((failure) => `- ${failure}`)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Shell landmark audit passed for ${samples.length} representative exports.`);
}
