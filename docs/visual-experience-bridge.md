# Visual Experience Bridge

Sprint 010 turns UI study into a motion-aware workflow:

```text
study-ui-capture -> study-ui-motion -> VisualExperienceSpec
```

## Capture

`study-ui-capture` owns evidence acquisition. It resolves
`.ui-design-intelligence.yml`, stores artifacts under
`artifacts/{project_brand}/{page}/`, captures still screenshots under
`.screenshots/`, captures scroll or animation frames under
`.motion_screenshots/`, and records failures in a capture manifest.

Blank frames, loader-only screens, timeouts, missing targets, and blocked pages
are not valid evidence. They must be stored as failed captures with a reason.

## Motion

`study-ui-motion` consumes the capture manifest and frame evidence. It studies
scroll-bound transitions, palette shifts, pinned sections, canvas layers,
WebGL/WebGPU clues, GSAP ScrollTrigger, React Spring, React Three Fiber, scroll
reveal behavior, and custom render loops.

The output should identify rendering-layer ownership and implementation-facing
motion fields without copying a reference site's exact choreography.

## Visual Experience Spec

`.convention/templates/visual-experience-spec.md` is the handoff artifact. It records
evidence files, palette timeline, scroll storyboard, section state map, motion
fields, captured frame index, rendering-layer ownership, design-quality notes,
implementation notes, and originality guardrails.

Use the spec when static image generation captures aesthetics but misses motion,
scroll timing, color transitions, canvas behavior, or interaction rhythm.
