# Study Versus Audit

Use study and audit for different jobs.

## Study

Study answers: what is there?

Use study when you need evidence:

- Visible structure, sections, components, and repeated patterns.
- Storytelling, claims, CTAs, proof, objections, and narrative order.
- Information architecture, navigation, labels, grouping, and wayfinding.
- Responsive behavior across desktop, tablet, and mobile.
- Interaction states, overlays, forms, menus, and feedback.
- Accessibility-relevant evidence and source gaps.
- Capture and motion evidence through `capture-manifest.json` and
  `visual-experience-spec.md`.

Study outputs should preserve observed, inferred, and missing evidence. Study
does not decide what must be fixed first.

Common study commands:

```text
/study-page
/study-site
/study-visual-experience
```

## Audit

Audit answers: what is weak, risky, inconsistent, or blocking the goal?

Use audit when you need judgment and prioritization:

- Design or UX problems ranked by severity.
- Conversion, trust, clarity, accessibility, interaction, or content risks.
- Design-system completeness, naming, consistency, or token problems.
- Prototype flow and prototype copy problems.
- A redesign problem translated into repair targets.

Audit outputs should name severity, affected surface, evidence, impact, and
recommended fix. Audit should not invent missing evidence; it should reference
study artifacts and source gaps.

Common audit commands:

```text
/audit-page
/audit-site
/audit-interactions
/audit-design-system-seed
/audit-prototype-flow
/audit-prototype-copy
```

## How Audit Improves Design

For new design, audit can be used as a preflight check after early artifacts:

```text
brief -> design-system-seed -> design-spec -> wireframe -> audit -> revision
```

Use audit to catch weak hierarchy, unclear CTAs, missing states, weak
accessibility constraints, or inconsistent design-system assumptions before
prototype planning.

## How Audit Improves Redesign

For redesign, audit should happen before new structure is generated:

```text
study artifacts -> audit problem -> redesign requirements -> new wireframe
```

Use study artifacts to avoid guessing. Use audit findings to decide what the
redesign must solve. Then feed the audit findings into design spec, journey,
wireframe, prototype, and copy work.

## Recommended Decision

- If the source is unknown or incomplete: study first.
- If evidence exists but the weakness is unclear: audit next.
- If the problem is already clear: audit against that problem.
- If you are generating a new design from a brief: audit after the first
  wireframe or design spec.
- If you are redesigning: audit before wireframe generation.
