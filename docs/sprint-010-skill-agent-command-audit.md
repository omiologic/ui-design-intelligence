# Sprint 010 Skill, Agent, And Command Audit

Date: 2026-07-01

## Scope

This audit checks whether the current skill repository surface supports the
Sprint 010 objective: reliable UI study capture, project/page artifact
organization, motion-aware analysis, and `VisualExperienceSpec` handoff.

The review focuses on user-facing skills, agents, commands, bundle wiring, and
validation. It does not audit implementation code quality outside this
workflow.

## Executive Summary

Sprint 010 added the right primitive assets, but the repository is not yet
fully usable from the user-facing command and agent layer.

The strongest parts are the new `study-ui-capture` and `study-ui-motion` skills,
the `visual-experience-spec.md` template, the config template, and validation
for bridge files. The weakest part is orchestration: `study-page` and
`study-site` still describe the old external-capture-only model, and no agent
currently owns capture or motion routing. As a result, installed users can have
the new skills present but still receive old workflow instructions that bypass
them.

## Findings

### P0: Study Commands Contradict Sprint 010 Capture

Evidence:

- `commands/study-page.md` still says inputs are "externally captured page
  material" and optional metadata from `scripts/capture-url.mjs`.
- `commands/study-page.md` still says "Sprint 001 does not include browser
  automation" and that `capture-url.mjs` "does not fetch the page."
- `commands/study-site.md` repeats the same external-capture-only model.

Impact:

This is the highest user-facing mismatch. A user asking to study a live page
will be routed through the command surface that explicitly tells the agent not
to perform browser capture, even though Sprint 010 defines `study-ui-capture` as
the owner of screenshots, readiness, retries, blank-frame rejection, motion
frames, and manifests.

Recommended fix:

Update `study-page` and `study-site` so the workflow starts with a capture
decision:

1. If visual evidence is missing, stale, motion-heavy, or loader-prone, run
   `study-ui-capture`.
2. If motion, canvas, WebGL/WebGPU, GSAP, React Spring, React Three Fiber,
   requestAnimationFrame, or scroll reveal is detected, run `study-ui-motion`.
3. Write outputs under `artifacts/{project_brand}/{page}/`.
4. Produce or update `capture-manifest.json`.
5. Produce `visual-experience-spec.md` when motion-aware implementation handoff
   is needed.

### P0: No Agent Owns Capture Or Motion

Evidence:

- `plugins/bundles/ui-study-skills/plugin.json` includes
  `study-ui-capture` and `study-ui-motion`, but its agents are still only
  `ui-researcher`, `ui-specification-analyst`, `ui-interaction-analyst`, and
  `accessibility-reviewer`.
- `ui-researcher` requires storytelling, information architecture, and
  responsive behavior, but does not reference `study-ui-capture` or
  `study-ui-motion`.
- `ui-specification-analyst` reads screenshots/DOM summaries but has no
  capture-manifest or scoped artifact dependency.
- `ui-interaction-analyst` explicitly says it does not create visual motion
  polish and does not route scroll-bound/canvas motion to `study-ui-motion`.
- `accessibility-reviewer` handles reduced-motion token risks but does not
  consume `VisualExperienceSpec` or motion-study output.

Impact:

The new skills are installable but orphaned. Agent arbitration will continue to
route study work through the pre-Sprint-010 roles, so visual capture and motion
analysis depend on the model remembering the new skills from bundle docs rather
than following agent instructions.

Recommended fix:

Add one of these:

- Preferred: a new `visual-experience-analyst` or `motion-study-analyst` agent
  requiring `study-ui-capture` and `study-ui-motion`, with optional
  `study-ui-responsive-behavior`, `study-ui-interaction`, and
  `study-ui-accessibility`.
- Minimum: update `ui-researcher` to require or optionally invoke
  `study-ui-capture`, and update `ui-interaction-analyst` to optionally invoke
  `study-ui-motion` when temporal visual behavior is in scope.

### P1: No User-Facing Command For Visual Experience Handoff

Evidence:

- Existing commands include `study-page` and `study-site`, but there is no
  `study-visual-experience`, `study-motion`, `capture-ui`, or
  `generate-visual-experience-spec` command.
- Sprint 010 objective text mentions possible names such as
  `extract-visual-experience-spec`, `capture-motion-frames`, and
  `audit-visual-experience-gap`, but no command implements that user-facing
  path.

Impact:

Users can ask generally to "study this site," but there is no command-shaped
entry point for the exact problem Sprint 010 was created to solve: static image
mockups miss color transitions, scroll choreography, canvas/WebGL behavior, and
interactive rhythm.

Recommended fix:

Add a focused command such as `study-visual-experience.md` with:

- Inputs: URL/local capture, project slug, page slug, scope, viewport set,
  motion depth.
- Workflow: `study-ui-capture -> study-ui-motion -> visual-experience-spec.md`.
- Outputs: `capture-manifest.json`, `.screenshots/`, `.motion_screenshots/`,
  and `visual-experience-spec.md`.
- Agents: the new motion/visual-experience agent, plus optional existing study
  agents.

### P1: `study-ui-capture` Is A Direction, Not A Concrete Tool Contract

Evidence:

- `study-ui-capture` defines readiness fields, paths, and failure rules.
- It does not name concrete browser tools, minimum screenshot operations,
  capture retry procedure, blank-frame detection method, or screenshot manifest
  write steps.

Impact:

The skill is useful guidance, but two agents can execute it differently. This is
especially risky for loader-heavy or canvas-heavy sites, which were the reason
Sprint 010 was created.

Recommended fix:

Add a reference or script contract for capture execution:

- Browser/tool selection order.
- Required viewport loop.
- Ready selector and loader selector wait algorithm.
- Blank-frame detection heuristic.
- Retry behavior.
- Manifest append/update semantics.
- Naming conventions for stills and motion frames.
- Failure reason vocabulary.

### P1: Validation Checks Bridge Presence, Not Command/Agent Routing

Evidence:

- `scripts/validate-visual-experience-bridge.mjs` checks the two skill files,
  bundle inclusion, config strings, template sections, capture-manifest fields,
  flat `artifacts/*` files, and bridge docs.
- It does not fail when `study-page` and `study-site` omit
  `study-ui-capture`, `study-ui-motion`, `.motion_screenshots`, or
  `visual-experience-spec.md`.
- It does not fail when no agent references `study-ui-capture` or
  `study-ui-motion`.

Impact:

The repo can pass validation while the primary user-facing study commands still
route users through the old Sprint 001 behavior.

Recommended fix:

Extend bridge validation to require:

- `commands/study-page.md` references `study-ui-capture`.
- `commands/study-site.md` references `study-ui-capture`.
- At least one command references `study-ui-motion`.
- At least one agent references `study-ui-capture`.
- At least one agent references `study-ui-motion`.
- At least one command declares `visual-experience-spec.md` as an output.

### P2: Artifact Config Exists But Is Not Consumed By Commands

Evidence:

- `.convention/templates/ui-design-intelligence.config.yml` defines
  `artifacts.rootDir`, `projectSlug`, page paths, screenshot paths, motion frame
  paths, manifest path, and visual-experience path.
- `study-page` and `study-site` do not mention `.ui-design-intelligence.yml`,
  artifact path resolution, project/page slug naming, or scoped output paths.

Impact:

The repository now has the right config shape, but the user-facing command
layer does not instruct agents to use it. This weakens the Sprint 010 objective
of replacing flat `artifacts/*` output with organized
`artifacts/{project_brand}/{page}/` output.

Recommended fix:

Add a config-resolution step to `study-page`, `study-site`, and the proposed
visual-experience command. Include defaults when the config is missing.

### P2: Visual Experience Spec Is Template-Only

Evidence:

- `.convention/templates/visual-experience-spec.md` provides required sections and
  tables.
- There is no schema, fixture, or example completed spec.

Impact:

Downstream skills can see the desired shape, but validation cannot check a
completed artifact for semantic quality beyond headings. The current template
does not yet demonstrate a good result for a scroll-bound canvas/WebGL page.

Recommended fix:

Add one example completed `visual-experience-spec.md` fixture under a scoped
artifact example directory, plus invalid examples for missing frame index,
missing rendering-layer ownership, and missing originality guardrails.

### P2: Existing Study Skills Do Not Explicitly Consume Capture Manifests

Evidence:

- `study-ui-capture` hands evidence to specification, responsive, interaction,
  accessibility, and motion skills.
- The older study skills predate the manifest and mostly refer to screenshots,
  notes, DOM summaries, or captured evidence in generic terms.

Impact:

The handoff is one-way. Capture knows who should consume its manifest, but most
consumers do not say how they should interpret capture statuses, failed
captures, motion frames, or source gaps.

Recommended fix:

Update the core study skills to treat `capture-manifest.json` as first-class
evidence:

- `study-ui-specification`: consume successful stills and source gaps.
- `study-ui-responsive-behavior`: consume viewport-specific captures.
- `study-ui-interaction`: consume interaction-state captures and failed state
  gaps.
- `study-ui-accessibility`: consume motion/reduced-motion gaps and blocked
  keyboard/focus evidence.

## Strengths

- The study bundle now includes `study-ui-capture` and `study-ui-motion`.
- The capture skill correctly names readiness, loader, retry, viewport,
  blank-frame, failed-capture, and artifact path concerns.
- The motion skill covers the right Sprint 010 baseline: animation, Canvas 2D,
  Three.js/WebGL/WebGPU awareness, GSAP, React Spring, React Three Fiber,
  scroll reveal, and custom render loops.
- The config template now supports scoped project/page storage and motion frame
  paths.
- `visual-experience-spec.md` has the right required sections for the bridge.
- Validation catches missing bridge primitives and flat files directly under
  `artifacts/*`.

## Recommended Remediation Order

1. Update `study-page` and `study-site` to route through `study-ui-capture` and
   `study-ui-motion`.
2. Add `study-visual-experience.md` as the explicit command for the Sprint 010
   bridge.
3. Add a `visual-experience-analyst` or `motion-study-analyst` agent.
4. Extend validation to fail if commands and agents do not route the new
   skills.
5. Add a concrete capture execution contract and completed
   `visual-experience-spec.md` example.
6. Update older study skills to consume `capture-manifest.json` explicitly.

## Conclusion

Sprint 010 succeeded at adding the primitive bridge assets, but the current
repository still has a user-facing orchestration gap. The next work should not
add more motion knowledge first. It should connect the new skills to commands
and agents so a user asking to study a real page reliably gets capture,
motion analysis, scoped artifacts, and a `VisualExperienceSpec` without needing
to know the internal skill names.
