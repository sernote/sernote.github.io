# Cache series in the author publication

5 September 2026. Approved scope comes from the user's continued site work and the explicit handoff in `/Users/notevskii/develop/audit-prompt/docs/content/2026-09-05-cache-series/site-handoff.md`, received in this thread while the handbook entrance milestone was being verified.

The site now has the cache/routing exemplar, author-discovery pages and a task-oriented handbook entrance. This milestone connects the prepared cache series to a reproducible first audit in those existing surfaces. The product remains an author publication with a broad AI Platform handbook. Local implementation is the deliverable; deployment, Habr/Telegram posting, native routing-log adapters and GPU experiments are outside scope.

## Reader path

An article or the existing livestream should lead directly to an explanation or a practical audit. The project page's stable `#first-audit` anchor is the practical entry: when useful, a concrete before/after example, commands, observed output and interpretation. `#your-project` continues to the reader's own inputs. `#provider-usage` separates API-specific usage from input layout and routing; `#routing-audit` explains the normalized JSONL helper. These are sections of the existing project page, not new intermediary pages.

GitHub PR 21 was rechecked in this thread: open, draft, unmerged; head `54f333fd06fafc7a8428aab7242682548c5891af`, branch `codex/cache-first-audit`. Verify again before finishing commands. The new practice must use that explicit commit or an explicitly labeled draft branch. Keep the historical case pinned to its existing version. Do not silently promote a draft to the stable release. The 43→254 result is UTF-8 bytes in a rendered common prefix, not tokens, cache hits or savings. Document expected nonzero exit codes if the analyzer reports findings. Feedback must use a link that exists in the chosen GitHub version; an unmerged issue template cannot be advertised as a working default-branch form.

## Three distinct articles

Adapt the prepared drafts in this order, retaining the author's voice and their specific evidence:

1. `sticky-sessions-vs-prefix-routing`: session affinity versus common-prefix locality, including invalidation, isolation and a bounded comparison method. Do not repeat the existing warm-queue article as the main thesis.
2. `what-cache-router-knows`: standalone vllm-router and Dynamo state, index evidence, KV events and recovery. Pin source versions. Distinguish prediction target from selected worker, proxy/load scope, characters from engine tokens, HTTP timing from client TTFT/stream completion.
3. `kv-offload-economics`: loading KV versus recomputation, compatibility and storage levels, a clearly illustrative calculation or comparison with explicit units and assumptions. No measured winner or claimed production saving.

All three are native Russian blog articles using existing MDX components and generated contents. Set their actual first local publication date to 2026-09-05, matching current article conventions; mark applicability and source-check boundaries in prose. Add relevant source links and immediate action links. The supplied Habr draft and Batch Telegram post stay in the next-release editorial queue and are not republished as site originals.

## Chapter, project and talk links

Keep the rewritten Prefix Cache chapter, nine required sections, contents, diagram and experiment. Add a compact symptom/task table inside its existing structure: unstable prompt/tools/schema; API rules and usage; replica locality/load; KV events/recovery; offload. Link actual published records and the project anchors. Extend existing typed relations without creating empty topic pages or claiming more coverage than exists.

Update the existing `every-token-counts` record: eventDate 2026-06-04; unknown upload date null; preserve the card's publication date. Three reuse conditions at 4684 seconds, skill explanation at 6565 and offload at 6911. Reuse recording/thumbnail/player and link `#first-audit` from the page. Retain explicit authorship and original platform URLs for external work.

## Acceptance

Integration decisions: the project page exposes its compiled contents and a local primary action to `#first-audit`, then links the reproduced result to `#your-project`. Its release fact is labeled as the stable release, distinct from the pinned draft walkthrough. When a talk's upload date is unknown, retain BreadcrumbList and the visible recording/player but omit VideoObject until the actual upload date is verified. Do not substitute event or editorial dates. Google lists uploadDate as required video evidence: https://developers.google.com/search/docs/appearance/structured-data/video (checked 2026-09-05).

Static export, existing route lifecycle, canonical URLs, structured metadata, sitemap and native-article RSS continue to work. New canonical article records go into the manifest. No backend, dependencies, auth, tracking, analytics or global skill installation. Existing user changes and completed milestones remain intact, including the protected hybrid article and pnpm workspace configuration.

Reproduce documented commands in an isolated temporary checkout without private inputs. Run lint, typecheck, relevant/full tests, build and existing export/reference gates. Inspect desktop and mobile paths from new article and talk to chapter/practice, first result, own-project section and feedback. Independent reviews cover factual/spec boundaries and integration quality. Search traffic and reader adoption remain unmeasured.
