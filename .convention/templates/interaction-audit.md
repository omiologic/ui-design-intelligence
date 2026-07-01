# Interaction Audit

## Source

- URL or name:
- Captured at:
- Viewport:
- Interaction path:

## Summary

State whether the interaction is discoverable, predictable, reversible, and
accessible.

## Checks

- Trigger clarity
- Default, hover, focus, active, loading, empty, error, and success states
- Keyboard access and focus order
- Escape, cancel, close, and recovery paths
- Feedback timing and error copy
- Mobile behavior and touch target size

## Findings

Use `.convention/vocabulary/audit-severity.json` for severity and return JSON
matching `.convention/schemas/page-audit.schema.json` with `auditType` set to
`interaction`.
