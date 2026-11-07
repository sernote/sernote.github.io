# Pilot podcast article — 7 November 2026

## Delivery

Native Russian article: `content/v3/blog/agents-built-it-users-arrived.mdx`.
Title: «Агенты написали код. А дальше пришли пользователи».
Based on the public pilot of «300 токенов в секунду», existing author articles and primary technical sources linked in the text. The final prose distinguishes guest anecdotes from the author's operational recommendations. Raw transcript timestamps were omitted because the released episode was edited.

Porch drafting and editorial revisions used `claude-b`, `claude-opus-5-5`, effort `xhigh`; final technical review corrected streaming scope, tool-call effects, checkpoint identity, lock atomicity and unproven optimization outcomes. Two responsive show-me diagrams are implemented in static React/CSS, without a new dependency or client runtime. Article links cover all five user-supplied release platforms; YouTube and RUTUBE metadata were checked, playback on all platforms was not verified.

## Integration

Prepared on `codex/podcast-pilot-article` from `origin/main` at `985ab93`, preserving unrelated local edits in the original checkout. Updated the explicit route manifest and discovery expectations for the added article. The fresh main branch already contains another article absent from the older local preview: the resulting totals are 114 route decisions, 25 sitemap entries and 20 RSS items.

The existing 90-day review period for Inference Plane and the session-cache example expired on 20 October 2026. Marked these two records `stale`, retaining their actual review dates and contents. No new source review is claimed. Synthetic current-state view-model fixtures use today's review date; explicit expiry tests retain their fixed clock. Runtime validation remains enabled.

Diagram accent borders use the primary accent when the optional `--accent-line` token is absent in the latest main theme.

## Validation

Final integration checks are recorded in STATUS.md. No deployment is part of this branch push.
