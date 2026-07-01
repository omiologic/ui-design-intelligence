# Motion Study Baseline

Use this reference when analyzing web motion and rendering behavior.

## Required Knowledge Areas

- Animation fundamentals: triggers, timelines, keyframes, easing, duration,
  delay, stagger, scrub, pinning, interruption, and reduced motion.
- Canvas 2D: fixed canvas backgrounds, image sequences, particles, gradients,
  draw loops, resize handling, and blank-frame risks.
- Three.js and React Three Fiber: scenes, cameras, lights, meshes, materials,
  controls, scroll coupling, render loops, and fallback strategy.
- WebGL and WebGPU awareness: shader layers, GPU-backed canvases, feature
  detection, performance budgets, and unsupported-runtime fallbacks.
- GSAP ScrollTrigger: scroll start/end ranges, scrub, pin, toggle actions,
  timelines, refresh behavior, and responsive media queries.
- React Spring: physics-based transitions, interruption behavior, gesture or
  scroll coupling, and state-driven motion.
- Scroll reveal libraries: reveal thresholds, once/replay behavior, stagger,
  intersection observers, and content visibility.
- Custom runtime loops: `requestAnimationFrame`, scroll listeners, resize
  listeners, throttling, cleanup, and layout-thrash risks.

## Observation Checklist

For each animated region, record:

- Trigger
- Timeline or state machine
- Start and end visual state
- Intermediate key moments
- Rendering layer owner
- Evidence type and confidence
- Easing or physics behavior
- Duration or scroll range
- Pinning, sticky behavior, or camera/object motion
- Color or palette transition
- Text/content reveal behavior
- Interaction and hover states
- Reduced-motion and mobile fallback
- Performance risks

## Output Principle

The output should be implementation-facing but not source-copying. Capture the
experience logic, constraints, and reusable principles. Do not reproduce a
reference site's exact timeline, exact assets, or exact choreography unless the
user owns that site and explicitly requests faithful reproduction.
