# Visual Experience Spec

## Evidence Files

- Capture manifest:
- Still screenshots:
- Motion frames:
- Recordings or source notes:
- Source gaps:

## Palette Timeline

Document color, contrast, background, lighting, material, and mood changes by
scroll progress, section, viewport, or interaction state.

| Range Or State | Observed Palette | Transition | Confidence | Evidence |
| --- | --- | --- | --- | --- |
| 0%-10% |  |  |  |  |

## Scroll Storyboard

Map scroll progress and section boundaries to visual state changes, content
entry/exit, pinning, layer changes, camera or object movement, and failed or
missing frames.

| Frame | Scroll Progress | Section | Visual State | Motion Notes | Evidence |
| --- | ---: | --- | --- | --- | --- |
| 0001 | 0% |  |  |  |  |

## Section State Map

Record each page section's static, active, pinned, transition, responsive, and
interaction states.

| Section | Default State | Active Or Pinned State | Exit State | Viewport Notes | Gaps |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Motion Fields

For each motion region, capture:

- Trigger:
- Rendering layer:
- Start state:
- End state:
- Keyframes or sampled states:
- Easing or physics:
- Duration or scroll range:
- Scrub:
- Pin:
- Stagger:
- Interaction states:
- Reduced-motion expectation:
- Performance risks:
- Confidence:

## Captured Frame Index

| Frame ID | Path | Type | Viewport | Scroll Progress | Interaction State | Status |
| --- | --- | --- | --- | ---: | --- | --- |
|  |  |  |  |  |  |  |

## Rendering Layer Ownership

Identify which layer owns each visible effect: DOM/CSS, Canvas 2D,
Three.js/WebGL, WebGPU, GSAP/ScrollTrigger, React Spring, React Three Fiber,
scroll reveal library, requestAnimationFrame/custom loop, video, or unknown.

## Design Quality Notes

Capture quality implications for hierarchy, readability, contrast during
transitions, rhythm, perceived performance, responsive behavior, accessibility,
focus safety, reduced motion, and design-system reuse.

## Implementation Notes

Translate the study into build constraints, library candidates, fallback needs,
asset requirements, testing notes, and unresolved implementation questions.

## Originality Guardrails

State what can be reused as a principle and what must not be copied directly
from the reference site, including exact choreography, assets, copy, and brand
specific visual signatures.
