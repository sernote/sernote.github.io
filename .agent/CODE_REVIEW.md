# Code Review Checklist

Review every completed milestone against this checklist.

## Product fit

- Does the change support the core message?
- Does it avoid generic AI SaaS aesthetics?
- Does it preserve the premium technical field manual feel?

## Architecture

- Is the code scoped and understandable?
- Are components reusable?
- Are routes organized clearly?
- Are MDX pages separated from UI components?
- Is there unnecessary backend/server logic?

## Static compatibility

- No server actions.
- No API routes.
- No database.
- No auth.
- Client-side tools only.

## Content

- No confidential internal details.
- No invented company-specific metrics.
- Placeholder content is clearly marked.
- Handbook pages use required frontmatter.

## Design

- Dark-mode-first.
- Clear typography.
- Good spacing.
- Thin borders.
- Restrained accent.
- No clutter.

## Validation

- `pnpm lint` passes.
- `pnpm typecheck` passes.
- `pnpm build` passes.

