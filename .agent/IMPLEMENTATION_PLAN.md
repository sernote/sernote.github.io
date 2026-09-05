# Implementation Plan

## Current editorial work — September 2026

The September baseline and project-copy correction were merged in [PR 10](https://github.com/sernote/sernote.github.io/pull/10) and [PR 11](https://github.com/sernote/sernote.github.io/pull/11). The current follow-up on `codex/cache-audit-reader-path` aligns the project, cache articles and handbook with the approved own-project audit path and optional feedback. Implementation, source-link verification, independent review and full site verification are complete; see `.agent/CACHE_AUDIT_READER_PATH_QA_2026-09-06.md`. The prior local hybrid-reasoners draft and local settings remain preserved in the original checkout. Hand off this continuation through a feature PR; publication follows its merge.

Continue the approved product audit and completed cache/author-discovery milestones. The current handbook entrance acceptance is recorded in `.agent/HANDBOOK_ENTRY_QA_2026-09-05.md`.

The user's cache-series handoff adds five tasks to this work: project/first audit; Prefix Cache task routes; three native articles; existing livestream and external entrances; discovery and full reader-path verification. All five tasks are complete; acceptance is recorded in `.agent/CACHE_SERIES_QA_2026-09-05.md`. Their implementation plan is `docs/superpowers/plans/2026-09-05-cache-series-integration.md`, with the corresponding design spec. Preserve the prior milestones and user edits during the PR handoff.

## Released v3.1 baseline

The normative v3.1 plan is:

`docs/superpowers/plans/2026-08-02-notevskii-tech-v3-1-implementation.md`

It defines the release boundary, file map, route migration, milestone checks and final QA gate. The earlier v0 milestones have been retired and are not implementation instructions.

Related sources:

- product spec: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-correction-design.md`;
- route decisions: `docs/superpowers/specs/2026-07-27-notevskii-tech-v3-1-route-decisions.md`;
- current progress: `.agent/STATUS.md`.

Run the relevant focused checks after each task and `corepack pnpm verify` before release.
