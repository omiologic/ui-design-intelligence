# Visual Experience Agent Routing

Use this reference when Codex needs the role logic from
`agents/visual-experience-analyst.md` but cannot rely on runtime subagents or
direct agent-file access. Use it when a user asks to study visual experience,
motion, scroll choreography, color transitions, or canvas/WebGL behavior.

## Role

The visual-experience analyst owns capture-backed motion study. Its job is to
turn reliable page evidence into implementation-ready visual experience
findings without copying a reference site's exact design.

## Required Skills

- `study-ui-capture`
- `study-ui-motion`

## Optional Handoffs

- `study-ui-specification` for structure and section/component inventory.
- `study-ui-responsive-behavior` for viewport-specific layout and motion
  differences.
- `study-ui-interaction` for controls, states, overlays, and interaction
  evidence.
- `study-ui-accessibility` for focus, keyboard, contrast during transitions,
  and reduced-motion risks.

## Routing Rules

1. If evidence is missing, stale, loader-only, blank, partial, or missing
   needed viewports/states, route to `study-ui-capture`.
2. If the page uses scroll-bound color changes, fixed canvas, WebGL/WebGPU,
   Three.js, React Three Fiber, GSAP, React Spring, requestAnimationFrame,
   scroll reveal, video, or shader-backed visuals, route to `study-ui-motion`.
3. If implementation needs temporal handoff, create or update
   `visual-experience-spec.md`.
4. If capture is blocked or incomplete, record source gaps and do not make
   motion claims from aesthetics alone.
5. If a reference site inspires the study, extract reusable principles and
   constraints; do not copy exact choreography, assets, copy, or brand-specific
   visual signatures.

## Stop Conditions

- No source is available.
- Captures are blank, loader-only, blocked, or too incomplete for the requested
  scope.
- Scroll or interaction states cannot be inspected but are central to the
  requested output.
- The user asks for production motion code rather than study output.

## Outputs

- `artifacts/{project_brand}/{page}/capture-manifest.json`
- `artifacts/{project_brand}/{page}/.screenshots/`
- `artifacts/{project_brand}/{page}/.motion_screenshots/`
- `artifacts/{project_brand}/{page}/visual-experience-spec.md`
- Source gaps and downstream handoff notes.
