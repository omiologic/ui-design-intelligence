# Structural Design Philosophy

These references encode structural taste for UIBlueprint work. They explain why
a blueprint should choose one section order, layout pattern, interaction model,
or density level over another.

This directory is not a visual design system. Do not place color, type scale,
motion, illustration, spacing polish, or code-generation rules here. Those
belong to downstream visual-taste and implementation tools.

## Files

- `page-section-ordering.md`: how to sequence page regions around user intent.
- `layout-pattern-selection.md`: how to choose layout patterns by information job.
- `overlay-decision.md`: when dialog, drawer, popover, inline disclosure, or no overlay is justified.
- `hierarchy-density-register.md`: how structural density and hierarchy change by register.
- `blueprint-locks.md`: page-level invariants declared before detailed nodes.
- `preflight-checklist.md`: checks a blueprint should pass before handoff.
- `structural-anti-slop.md`: schema-valid patterns that still produce weak structure.
- `design-system/`: design-system seed doctrine for token intent, provenance,
  confidence, component foundations, accessibility constraints, and
  design-system anti-slop.

## Ownership

Base skills should use these references for universal structural judgment.
Taste profiles should use them as constraints, then add contextual bias for a
specific register or goal.
