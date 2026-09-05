# Editorial and cache-series release QA — 5 September 2026

Status: verified and pushed in [draft PR 10](https://github.com/sernote/sernote.github.io/pull/10). Implementation commit: `f71261bd84a7bee356a9b5350a933844906a8fb9`; the following handoff update changes release documentation only. Production has not been deployed by this handoff.

## Scope

- Branch: `codex/cache-editorial-exemplar`; target: `main`.
- Verified base: `c763c7a3885eef67530d5a4e14cc1bf8c9066e81`, matching `origin/main` after fetch.
- Includes author/editorial discovery, handbook entry, four cache-series articles, the Prefix Cache chapter and client-side routing model, the project/first-audit and router-observation paths, livestream metadata corrections, and their tests and documentation.
- The route manifest grows from 108 to 112 records: four new canonical articles, no changed existing route decisions. The final split is 23 keep routes, 35 aliases and 54 archives.
- The earlier local hybrid-reasoners article revision, local workspace configuration and local agent settings are excluded and preserved. The release test contract matches the article already in the base, so the PR does not depend on that local draft.
- No dependency, backend, tracking or deployment-workflow change is included.

## Fresh verification

A temporary source tree was created from an archive of the verified base and overlaid with only the intended release files. It contains the base hybrid-reasoners article and no local workspace or agent settings. Dependencies were installed independently from the frozen lockfile; existing checkout dependencies were not reused.

Environment: macOS, Node.js 23.11.0, Corepack 0.32.0, pnpm 10.19.0 as pinned in `package.json`. Nested `pnpm` calls used the same pinned version. This is local verification, not a GitHub CI result or a Node.js 22/Linux run.

Commands:

```sh
CI=true corepack pnpm install --frozen-lockfile --network-concurrency 4
corepack pnpm verify
```

Results:

- ESLint and TypeScript passed.
- 24 test files: 408 passed, 8 intentional production-only skips.
- Next.js 16.2.6 static build: 117 pages.
- 35 aliases and 54 archives materialized.
- 46 production export checks passed.
- Reference audit: 6 files, 16 transitions.
- Export audit: 112 routes, 23 sitemap URLs.

The initial offline install lacked a cached tarball; a registry timeout during the first network attempt was resolved by retrying with lower concurrency. The lockfile stayed unchanged. The fresh build emitted the existing Fumadocs/webpack dynamic-import cache-dependency warning and completed successfully. Default pnpm dependency-script policy was unchanged.

Release-status documentation was added after the successful verification; runtime, content and test files were not changed afterward. All 57 staged files were compared byte-for-byte against the verified tree, including the subsequent release-status documentation, before the implementation commit. Protected working files retained their original hashes.

## Review and publication boundaries

An independent cumulative review of the 56 implementation, content, test and milestone-documentation files found no actionable blockers. It checked source-owned links and content selection, reader navigation, route/SEO preservation, synthetic evidence boundaries, excluded-file independence and the scoped public-content diff. It did not rerun tests or a GPU experiment. Prior visual acceptance is recorded in the individual milestone QA files.

The interactive model is synthetic. The pinned public router observation uses a synthetic HTTP worker without a model or KV cache. Neither is presented as measured GPU savings or a comparison of production policy performance.

The existing Pages workflow triggers on a push to `main` or manual dispatch. A feature-branch push and draft PR do not run that workflow or publish the site. This handoff does not merge `main` or dispatch a deployment.
