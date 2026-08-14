# Roles in LLM prompts article design

## Goal

Turn Sergey's 14 December 2025 post into a native Blog article while preserving its first-person voice and correcting the description of the Wharton persona-prompting study.

## Product decision

Publish one full local article at `/blog/roles-in-llm-prompts/` with the original publication date and a visible 15 August 2026 update date. This is Sergey's own argument, so it belongs in Blog rather than Materials.

The article keeps the original tension: an interesting narrow result triggered an overly broad community reaction. The expanded version should help the reader separate three questions:

1. does a short expert persona improve factual multiple-choice accuracy;
2. can a persona change tone, perspective, structure or level of explanation;
3. what should replace a vague role when factual correctness matters.

## Source and accuracy boundary

Use the primary Wharton technical report and its arXiv record:

- `https://gail.wharton.upenn.edu/research-and-insights/playing-pretend-expert-personas/`
- `https://arxiv.org/abs/2512.05858`

The article may state that the report tested GPT-4o, GPT-4o mini, o3-mini, o4-mini, Gemini 2.0 Flash and Gemini 2.5 Flash on GPQA Diamond and MMLU-Pro, using 12 prompt conditions and 25 trials per question. It may state that expert personas produced no systematic accuracy improvement and that low-knowledge personas often made answers worse.

The article must not claim that the report disproved personas for every task, tested answer style or explanation quality, tested elaborate role descriptions, or established a general rule for older and smaller models. It must not claim that a more detailed persona improves factual accuracy without evidence.

## Editorial direction

- Keep the first-person opening, mild irritation with absolutist reactions, the phrase about having enough brains to understand the research, and the final «Без крайностей».
- Use a professional conversational register: a technical peer explaining what they checked, not a lecturer or a prompt-engineering marketer.
- Prefer prose to a long numbered rebuttal. Use section headings only for the actual argument: what was tested, what was found, what remains useful, and the practical conclusion.
- Explain roles as a compact way to pass context, audience, perspective and response style. For correctness, prefer explicit task instructions, criteria, examples, sources and evaluation.
- Link the two primary sources in a short sources section. Do not copy passages from either source.

## Integration boundary

- Add one native `article` MDX record with no new component or design work.
- Add one `keep` route to the migration manifest.
- Let the existing source registry, Blog index, RSS, sitemap, metadata and JSON-LD paths consume the record.
- Do not add an image, category page, filter, external publication record, redirect or legacy route.

## Verification

- Exact source contract and article body are covered in the content tests.
- Blog ordering is `workload-shape-over-model-name`, `ai-platform-before-gpu`, `roles-in-llm-prompts`.
- The new route appears in the manifest, sitemap, RSS and static export with BlogPosting and BreadcrumbList JSON-LD.
- Home remains unchanged because its current Blog item is newer.
- Full repository verification, Pages deployment and live route checks pass.
