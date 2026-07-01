# Study Visual Experience

## Purpose

Study a page or site as a motion-aware visual experience and produce
capture-backed implementation handoff artifacts.

## Use When

- The user asks to study visual experience, motion, scroll transitions, color
  transitions, canvas/WebGL behavior, or animated section states.
- Static screenshots or image-generated mockups are not enough to explain the
  page experience.
- Frontend implementation needs `visual-experience-spec.md`.

## Inputs

- URL, local page, screenshot set, recording, DOM export, notes, or mixed
  evidence.
- Project or brand slug.
- Page slug or page slug strategy.
- Scope: page, section, component, element, flow, state, viewport, or scroll
  range.
- Viewport set and optional motion depth.
- Optional `.ui-design-intelligence.yml` capture config.
- Output intent: summary, detailed study, or implementation handoff.

## Workflow

1. Resolve `.ui-design-intelligence.yml` when present; otherwise use
   `artifacts/{project_brand}/{page}/` as the page artifact root.
2. Use `shared/workflows/study-capture-motion-routing.md` and
   `shared/workflows/visual-experience-agent-routing.md`.
3. Run `study-ui-capture` to create or verify screenshots, motion frames,
   readiness checks, blank-frame rejection, failed captures, and
   `capture-manifest.json`.
4. Run `study-ui-motion` to analyze scroll-bound, canvas, WebGL/WebGPU, GSAP,
   React Spring, React Three Fiber, requestAnimationFrame, scroll reveal,
   palette transition, and temporal section-state behavior.
5. Use `visual-experience-analyst` as the role model for routing, stop
   conditions, source gaps, and downstream handoffs.
6. Hand structural observations to `study-ui-specification`, responsive
   differences to `study-ui-responsive-behavior`, interactive states to
   `study-ui-interaction`, and reduced-motion or focus risks to
   `study-ui-accessibility` when needed.
7. Write or update `visual-experience-spec.md` with evidence files, palette
   timeline, scroll storyboard, section state map, motion fields, captured
   frame index, rendering-layer ownership, design-quality notes,
   implementation notes, and originality guardrails.

## Outputs

- `artifacts/{project_brand}/{page}/capture-manifest.json`
- `artifacts/{project_brand}/{page}/.screenshots/`
- `artifacts/{project_brand}/{page}/.motion_screenshots/`
- `artifacts/{project_brand}/{page}/visual-experience-spec.md`
- Source gaps and downstream handoff notes.

## Agents

- `visual-experience-analyst`
- Optional: `ui-specification-analyst`
- Optional: `ui-interaction-analyst`
- Optional: `accessibility-reviewer`

## Skills

- `study-ui-capture`
- `study-ui-motion`
- Optional: `study-ui-specification`
- Optional: `study-ui-responsive-behavior`
- Optional: `study-ui-interaction`
- Optional: `study-ui-accessibility`
