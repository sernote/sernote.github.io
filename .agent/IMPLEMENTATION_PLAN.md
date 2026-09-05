# Implementation Plan

## Current editorial work — September 2026

The completed changes are pushed on `codex/cache-editorial-exemplar` in [draft PR 10](https://github.com/sernote/sernote.github.io/pull/10). The isolated PR source tree passed a frozen-lockfile install and full verification; the cumulative release review has no actionable blockers. The prior local hybrid-reasoners draft and local settings are excluded. Release evidence and handoff state: `.agent/SITE_RELEASE_QA_2026-09-05.md` and `.agent/STATUS.md`. Merging and production deployment remain separate from this handoff.

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
