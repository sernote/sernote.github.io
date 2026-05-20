import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

const handbookPageSchema = pageSchema.extend({
  section: z.enum([
    "start",
    "manifesto",
    "platform",
    "strategy",
    "gateway",
    "inference",
    "economics",
    "caching",
    "evals",
    "observability",
    "guardrails",
    "operating-model",
    "tools"
  ]),
  type: z.enum(["chapter", "checklist", "template", "tool", "case-study", "glossary"]),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  status: z.enum(["draft", "published", "evergreen", "deprecated"]),
  audience: z.array(
    z.enum([
      "ai-platform-lead",
      "staff-engineer",
      "principal-engineer",
      "ml-platform-engineer",
      "mlops-engineer",
      "backend-engineer",
      "engineering-manager",
      "cto",
      "product-engineer"
    ])
  ),
  tags: z.array(z.string()),
  related: z.array(z.string()),
  published: z.string(),
  updated: z.string()
});

export const docs = defineDocs({
  dir: "content/handbook",
  docs: {
    schema: handbookPageSchema
  }
});

export const docsRu = defineDocs({
  dir: "content/handbook-ru",
  docs: {
    schema: handbookPageSchema
  }
});

export default defineConfig();
