# Study Site

## Purpose

Study multiple pages as a site-level experience and identify shared story,
navigation, structure, interaction, capture, and motion patterns.

## Use When

- The user wants a site study before audit or blueprint work.
- Multiple URLs or page captures should be compared.

## Inputs

- Site URL, sitemap, page list, local captures, screenshots, recordings, DOM
  exports, notes, or mixed evidence.
- Optional `.ui-design-intelligence.yml` configuration.
- Optional capture metadata from `capture-manifest.json` or
  `scripts/capture-url.mjs` for each page.
- Optional audience and business goal.

## Workflow

1. Resolve `.ui-design-intelligence.yml` when present; otherwise use
   `artifacts/{project_brand}/` as the project artifact root and
   `artifacts/{project_brand}/{page}/` for each page.
2. Use the routing workflow in
   `.convention/workflows/study-capture-motion-routing.md`.
3. For each page, run `study-ui-capture` when visual evidence is missing,
   stale, partial, loader-prone, blank, motion-heavy, or missing
   viewport/state coverage.
4. For each page, run `study-ui-motion` when scroll-bound, canvas,
   WebGL/WebGPU, GSAP, React Spring, React Three Fiber,
   requestAnimationFrame, or scroll-reveal behavior affects the experience.
5. Use `ui-researcher` to identify site purpose and primary user journeys.
6. Use `ui-specification-analyst` to compare IA, templates, and reusable
   components.
7. Use `ui-interaction-analyst` to compare shared interactions and state
   patterns.
8. Use `accessibility-reviewer` to flag repeated structural accessibility
   risks.
9. Produce site-level synthesis, page-specific notes, source gaps, artifact
   paths, and handoff recommendations.

## Capture Decision

Capture is part of the Sprint 010 study workflow. Use `study-ui-capture` to
create or verify screenshots, motion frames, readiness checks, blank-frame
rejection, failed-capture records, and per-page `capture-manifest.json` files.
Use `scripts/capture-url.mjs` only when deterministic URL metadata is enough.

## Outputs

- Site study summary under `artifacts/{project_brand}/`.
- Page-level study notes under `artifacts/{project_brand}/{page}/`.
- Optional per-page `capture-manifest.json`.
- Optional per-page `.screenshots/` and `.motion_screenshots/` directories.
- Optional per-page `visual-experience-spec.md` when motion-aware
  implementation handoff is needed.
- Repeated patterns, inconsistencies, source gaps, and handoff notes for audit
  or blueprint work.

## Agents

- `ui-researcher`
- `ui-specification-analyst`
- `ui-interaction-analyst`
- `accessibility-reviewer`

## Skills

- `study-ui-capture`
- `study-ui-motion`
- `study-ui-storytelling`
- `study-ui-information-architecture`
- `study-ui-specification`
- `study-ui-responsive-behavior`
- `study-ui-interaction`
- `study-ui-accessibility`
