---
name: apply-style-reference
description: Convert a selected StyleReference into a scoped StyleApplication or StylePatch without replacing unrelated design decisions.
license: See repository LICENSE
---

# Apply Style Reference

Use this skill when a selected style should affect a site, page, section,
component, or prototype target.

## Purpose

Create scoped style applications and patches shaped by the style application and
style patch schemas.

## Philosophy

Applying style means changing a bounded target, not reopening every design
decision. The style layer should say where visual treatment lands, how strongly
it lands, what it must preserve, and what it must avoid. Global application is a
rare project-level choice; local application is preferred for page sections,
component variants, and prototype feel when the existing brand, accessibility,
structure, and component contracts should remain stable.

## Decision Criteria

1. Apply style at the narrowest scope that satisfies the request.
2. Preserve existing brand, typography, palette, structure, and component rules
   unless the user explicitly asks to replace them.
3. Use `StyleApplication` for a requested treatment and `StylePatch` for
   concrete changes to an existing seed, section, component, or prototype
   behavior artifact.
4. Include avoid rules for accessibility and style overuse risks.
5. Hand off to design-system seed generation only when the target is global
   reusable foundations rather than a scoped style treatment.

## Boundary

- Owns: scoped visual treatment instructions and preservation-aware patches.
- Does not own: final design-system seed assembly, blueprint structure,
  component implementation code, or prototype runtime.

## References

- `references/style-application.md`
- `../../../.convention/schemas/style-application.schema.json`
- `../../../.convention/schemas/style-patch.schema.json`
- `../../../.convention/templates/style-application.json`
- `../../../.convention/templates/style-patch.json`

## Rules

1. Always specify style id, scope, target, intensity, preserve, apply-to, and
   avoid rules.
2. Do not rewrite unrelated scopes.
3. Do not let style application change information architecture by itself.
4. For global site or page application, name the seed or brand decisions that
   remain locked.
5. For local section/component/prototype application, keep changes limited to
   the named target.


## Anti-Patterns

- Regenerating the whole visual system for a local section request.
- Ignoring preserve rules.
- Applying transparent or decorative treatments without contrast controls.

## Workflow

1. Load the selected style reference.
2. Identify scope, target, intensity, preserve rules, and avoid rules.
3. Produce a `StyleApplication` for requests or a `StylePatch` for existing
   artifacts.
4. Flag unresolved conflicts for audit.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "styleApplication",
  "styleId": "bento-box",
  "scope": "section",
  "target": {
    "scope": "section",
    "id": "pricing-grid",
    "label": "Pricing Grid"
  },
  "intensity": "medium",
  "preserve": ["brand palette", "body typography", "CTA button hierarchy"],
  "applyTo": ["plan card layout", "comparison grouping", "section spacing"],
  "avoid": ["nested cards", "low contrast badges", "hover layout shifts"],
  "notes": ["Apply locally; do not change header, footer, or global tokens."],
  "source": {
    "type": "userProvided",
    "description": "Scoped pricing-section style request.",
    "licenseNotes": "No external prose included."
  }
}
```

## Hand-Offs

Hand style patches to `map-style-to-design-system-seed` for seed integration or
to blueprint/prototype workflows as scoped constraints.
