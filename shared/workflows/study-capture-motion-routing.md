# Study Capture And Motion Routing

Use this workflow when a user asks to study a page, site, section, component,
element, or flow from a URL, local capture, screenshot set, recording, or page
description. If the user says "study visual experience", use the same routing
with `study-ui-capture -> study-ui-motion -> visual-experience-spec.md`.

## Codex Visibility

Command and agent files are useful orchestration source documents, but Codex
does not treat them as runtime subagents or guaranteed callable commands. Keep
this workflow reachable from installed skill references so Codex can apply the
same routing even when it cannot directly invoke command or agent files.

## Inputs

- Source: URL, local HTML, screenshot, recording, DOM export, notes, or mixed
  evidence.
- Scope: site, page, section, component, element, flow, state, viewport, or
  scroll range.
- Project or brand slug.
- Page slug or page slug strategy.
- Optional `.ui-design-intelligence.yml` configuration.
- Optional business goal, audience, conversion goal, or implementation goal.

## Path Resolution

Resolve output paths from `.ui-design-intelligence.yml` when present. If the
config is missing, use:

- Project root: `artifacts/{project_brand}/`
- Page root: `artifacts/{project_brand}/{page}/`
- Still screenshots: `artifacts/{project_brand}/{page}/.screenshots/`
- Motion frames:
  `artifacts/{project_brand}/{page}/.motion_screenshots/`
- Failed captures:
  `artifacts/{project_brand}/{page}/.screenshots/failed/`
- Capture manifest:
  `artifacts/{project_brand}/{page}/capture-manifest.json`
- Visual experience spec:
  `artifacts/{project_brand}/{page}/visual-experience-spec.md`

## Capture Decision

Run `study-ui-capture` before downstream study when any of these are true:

- The user provides only a URL or local page without usable visual evidence.
- Existing screenshots are stale, partial, blank, loader-only, or missing
  viewport/state coverage.
- The page is loader-prone, animation-heavy, canvas/WebGL-backed, or
  scroll-bound.
- The study requires page, section, component, element, state, viewport, or
  scroll-position evidence.
- Downstream work needs `capture-manifest.json` for repeatable evidence.

Use supplied screenshots or recordings directly only when they are fresh,
complete enough for the requested scope, and source gaps are recorded.

## Motion Decision

Run `study-ui-motion` when evidence indicates:

- Scroll-bound color, layout, opacity, camera, object, or section-state changes.
- Fixed canvas, Canvas 2D, WebGL, WebGPU, Three.js, React Three Fiber, video, or
  shader-backed visuals.
- GSAP ScrollTrigger, React Spring, requestAnimationFrame, custom render loops,
  or scroll-reveal behavior.
- Motion timing, transition rhythm, pinning, scrub, stagger, easing, or
  reduced-motion behavior affects implementation.

Produce or update `visual-experience-spec.md` when motion findings need to feed
frontend implementation.

## Page Study Flow

1. Resolve project/page output paths.
2. Decide whether capture is required.
3. Run `study-ui-capture` when evidence is missing or unreliable.
4. Run `study-ui-motion` when temporal visual behavior is present.
5. Run storytelling, information architecture, specification, responsive,
   interaction, and accessibility study skills as needed for the request.
6. Write page-level outputs under `artifacts/{project_brand}/{page}/`.
7. Record source gaps for uncaptured pages, states, breakpoints, interactions,
   or scroll positions.

## Visual Experience Study Flow

1. Resolve project/page output paths.
2. Run `study-ui-capture` for still screenshots, motion frames, readiness,
   blank-frame rejection, failed captures, and `capture-manifest.json`.
3. Run `study-ui-motion` for temporal visual behavior and rendering-layer
   ownership.
4. Use `visual-experience-analyst` role logic from
   `shared/workflows/visual-experience-agent-routing.md` for handoffs and stop
   conditions.
5. Write `visual-experience-spec.md` for implementation handoff.

## Site Study Flow

1. Resolve the project root and per-page slugs.
2. For each page, run the page study flow with shared config.
3. Compare navigation, IA, repeated components, responsive behavior,
   interaction patterns, motion patterns, and source gaps across pages.
4. Write project-level synthesis under `artifacts/{project_brand}/` and
   page-level evidence under `artifacts/{project_brand}/{page}/`.

## Outputs

- `capture-manifest.json`
- `.screenshots/`
- `.motion_screenshots/`
- Optional `visual-experience-spec.md`
- Page or site study notes
- Source gaps and downstream handoff notes
