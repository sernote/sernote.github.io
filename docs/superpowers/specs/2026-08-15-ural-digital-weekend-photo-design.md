# Ural Digital Weekend photo preview design

## Goal

Replace the generic Ural Digital Weekend stream poster with Sergey's supplied event photograph so the Materials card and talk page show the actual speaker and event context.

## Visual decision

Use the supplied JPEG as-is and apply only deterministic crop and resize operations:

- crop the full 853 px width from vertical offset 260 px to a 853 × 480 frame;
- resize that frame to 1280 × 720;
- keep Sergey's face and upper body near the centre, the presentation screen on the right and the event environment on the left;
- do not retouch the face, generate missing content, add text, blur the background or apply decorative colour treatment.

The crop intentionally drops the lower event watermark and most of the legs. At card size the useful signals are the speaker, gesture and slide, not the full portrait.

## Asset and metadata

- Publish the result as `/media/talks/llm-selection-ural-digital-weekend-speaker.jpg` so existing browser caches cannot retain the poster.
- Remove the superseded `/media/talks/llm-selection-ural-digital-weekend.jpg` asset after the new path is wired.
- Update the talk `updatedAt` and thumbnail `capturedAt` to `2026-08-15`.
- Use the public site asset URL as the source URL because the photograph was supplied directly rather than fetched from a public publisher page.
- Use factual alt text: `Сергей Нотевский выступает на Ural Digital Weekend 2025 рядом со слайдом о выборе LLM`.

## Scope boundary

No component, layout, route, text, recording link or structured-data logic changes. The existing 16:9 `object-cover` Materials card and `object-contain` talk detail both receive the new 16:9 file without CSS overrides.

## Verification

- The source contract fails before the metadata change and passes after it.
- The generated JPEG is exactly 1280 × 720 and visually preserves the approved composition.
- The static export references the new path and contains no reference to the old poster path.
- Full repository verification, Pages deployment and live image checks pass.
