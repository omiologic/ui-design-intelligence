# Study Page

## Purpose

Study a single page and produce evidence-backed notes about storytelling,
structure, interactions, responsive behavior, motion behavior, and
accessibility risks.

## Use When

- The user provides a URL, screenshot, capture, or page description.
- The next step may be audit, SEO review, or blueprint generation.

## Inputs

- Page URL, local capture, screenshot set, recording, DOM export, notes, or
  page description.
- Optional `.ui-design-intelligence.yml` configuration.
- Optional capture metadata from `capture-manifest.json` or
  `scripts/capture-url.mjs`.
- Optional audience, business goal, or conversion goal.

## Workflow

1. Resolve `.ui-design-intelligence.yml` when present; otherwise use
   `artifacts/{project_brand}/{page}/` as the page artifact root.
2. Use the routing workflow in
   `.convention/workflows/study-capture-motion-routing.md`.
3. Run `study-ui-capture` when visual evidence is missing, stale, partial,
   loader-prone, blank, motion-heavy, or missing viewport/state coverage.
4. Run `study-ui-motion` when scroll-bound, canvas, WebGL/WebGPU, GSAP, React
   Spring, React Three Fiber, requestAnimationFrame, or scroll-reveal behavior
   affects the page experience.
5. Use `ui-researcher` to identify audience, offer, proof, and primary journey.
6. Use `ui-specification-analyst` to inventory regions, sections, and
   components.
7. Use `ui-interaction-analyst` to analyze observed stateful behavior and
   overlays.
8. Use `accessibility-reviewer` to flag structural accessibility risks.
9. Summarize evidence, source gaps, artifact paths, and handoff
   recommendations.

## Capture Decision

Capture is part of the Sprint 010 study workflow. Use `study-ui-capture` to
create or verify screenshots, motion frames, readiness checks, blank-frame
rejection, failed-capture records, and `capture-manifest.json`. Use
`scripts/capture-url.mjs` only when deterministic URL metadata is enough.

## Outputs

- Page study notes under `artifacts/{project_brand}/{page}/`.
- Optional `capture-manifest.json`.
- Optional `.screenshots/` and `.motion_screenshots/` directories.
- Optional `visual-experience-spec.md` when motion-aware implementation handoff
  is needed.
- Evidence, interpretation, source gaps, and handoff items.

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
