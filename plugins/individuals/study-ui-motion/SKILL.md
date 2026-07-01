---
name: study-ui-motion
description: Study scroll-bound motion, animation systems, canvas/WebGL/WebGPU layers, GSAP, React Spring, React Three Fiber, and frame evidence for VisualExperienceSpec handoff.
license: See repository LICENSE
---

# Study UI Motion

Use this skill when a site or app relies on motion, scroll transitions, canvas,
WebGL, WebGPU, Three.js, GSAP ScrollTrigger, React Spring, React Three Fiber,
requestAnimationFrame, or scroll-reveal behavior that static screenshots cannot
explain. Also use it when a user asks to study visual experience for frontend
implementation handoff.

## Purpose

Translate captured motion evidence into an implementation-facing motion study
and `VisualExperienceSpec` inputs: palette timelines, scroll storyboards,
section state maps, motion fields, rendering-layer ownership, design-quality
notes, and implementation notes.

## Philosophy

Motion study is temporal evidence analysis. It should explain what changes,
when it changes, what triggers it, what layer owns it, and what downstream
implementation needs to preserve the experience without copying the exact site.
Static mockups can describe a look; this skill describes the experience logic.

## Evidence Discipline

Base findings on capture manifests, frame sequences, recordings, DOM/CSS
inspection notes, implementation source, or supplied screenshots. Separate
observed motion from inferred library behavior. When a rendering stack is
unknown, record it as unknown rather than naming a framework from aesthetics
alone.

## References

- `references/motion-study-baseline.md`
- `../../../shared/workflows/study-capture-motion-routing.md`
- `../../../shared/workflows/visual-experience-agent-routing.md`
- `../../../shared/templates/visual-experience-spec.md`
- `../../../shared/templates/capture-manifest.example.json`

## Boundary

- Owns: motion interpretation, scroll sampling analysis, rendering-layer
  ownership, animation field extraction, and `VisualExperienceSpec` handoff.
- Does not own: screenshot acquisition, production animation coding, broad 3D
  library support, full design-system generation, or static visual mockup
  generation.
- Hand capture gaps back to `study-ui-capture`.

## Rules

1. Consume `study-ui-capture` evidence before making motion claims.
2. Identify likely ownership as DOM/CSS, Canvas 2D, Three.js/WebGL, WebGPU,
   GSAP/ScrollTrigger, React Spring, React Three Fiber, scroll-reveal library,
   requestAnimationFrame/custom loop, video, or unknown.
3. Record trigger, start state, end state, keyframes, easing, duration, scrub,
   pinning, stagger, viewport behavior, reduced-motion expectations, and
   performance risks when evidence supports them.
4. Sample scroll-bound experiences at meaningful progress points such as 0%,
   10%, 25%, 50%, 75%, and 100%, plus section boundaries and interaction
   states.
5. Distinguish color transitions, layer fades, camera/object motion, shader or
   canvas changes, text reveal timing, sticky/pinned sections, and cursor or
   pointer effects.
6. Preserve originality guardrails: describe reusable principles and
   implementation constraints without copying a site's exact choreography.
7. Hand implementation-ready findings to `VisualExperienceSpec`.

## Anti-Patterns

- Screenshot-only motion: describing a scroll or animation system from one
  frame.
- Library cosplay: claiming GSAP, Three.js, R3F, or WebGL without source,
  runtime, DOM, canvas, or timing evidence.
- Timeline flattening: reducing scroll-bound state changes to a static style
  note.
- Performance blindness: omitting canvas, shader, image sequence, scroll
  listener, or layout-thrash risks.
- Originality drift: copying exact choreography from a reference site instead
  of extracting reusable behavior principles.

## Workflow

1. Use `../../../shared/workflows/study-capture-motion-routing.md` when motion
   study is part of a `study-page`, `study-site`, or natural-language Codex
   request. Use
   `../../../shared/workflows/visual-experience-agent-routing.md` when
   role-level routing or handoff ownership is needed without runtime subagents.
2. Review the capture manifest, successful frames, failed frames, source gaps,
   viewport set, and scroll or interaction sampling plan.
3. Identify visible rendering layers: DOM, sticky sections, media, canvas,
   WebGL/WebGPU surfaces, video, overlays, and pointer effects.
4. Detect likely motion systems from source evidence, DOM/runtime clues, file
   names, global objects, CSS, or implementation notes.
5. Map scroll progress and interaction states to visual changes, palette shifts,
   object/camera changes, text reveals, layer transitions, and pinned regions.
6. Extract motion fields with confidence labels and missing evidence.
7. Record accessibility and quality implications, including reduced motion,
   focus safety, contrast during transitions, frame budget, and mobile fallback.
8. Fill or update `visual-experience-spec.md` for downstream implementation.

## Inline Example

```json
{
  "motionFindings": [
    {
      "id": "hero-canvas-scroll-field",
      "evidence": "observed",
      "trigger": "scroll",
      "renderingLayer": "Canvas/WebGL unknown",
      "scrollRange": { "start": 0, "end": 0.42 },
      "startState": "dark field with centered brand mark",
      "endState": "lighter product field with foreground copy fully visible",
      "motionFields": {
        "scrub": true,
        "pin": "hero appears fixed while content advances",
        "easing": "unknown",
        "duration": "scroll-bound"
      },
      "openQuestions": ["Confirm runtime library and reduced-motion fallback."]
    }
  ]
}
```

## Hand-Offs

Hand missing frames, blank captures, or untested states back to
`study-ui-capture`. Hand structural and responsive implications to
`study-ui-specification` and `study-ui-responsive-behavior`. Hand final
implementation-facing motion fields to `visual-experience-spec.md` and
frontend build skills.
