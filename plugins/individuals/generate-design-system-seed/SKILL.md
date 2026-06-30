---
name: generate-design-system-seed
description: Orchestrate generation of DesignSystemSeed JSON and Markdown from prompts, screenshots, URLs, study output, knowledge patterns, or mixed input.
license: See repository LICENSE
---

# Generate Design System Seed

Use this skill when a workflow needs a lightweight design-system foundation
before blueprint, wireframe, or prototype generation.

## Purpose

Generate `DesignSystemSeed` artifacts that normalize brand, palette,
typography, iconography, buttons, cards, header, and footer into reusable JSON
and Markdown.

## Philosophy

A design-system seed is a contract for downstream generation, not a finished UI
kit. It should name semantic roles before values, carry honest provenance and
confidence, and leave unresolved decisions visible instead of laundering guesses
into final-looking design tokens.

## References

- `references/design-system-seed-orchestration.md`
- `references/_shared/design-philosophy/design-system/design-system-principles.md`
- `references/_shared/design-philosophy/design-system/design-system-anti-slop.md`
- `references/_shared/design-philosophy/design-system/skill-doctrine.md`
- `references/_shared/schemas/design-system-seed.schema.json`
- `references/_shared/schemas/brand-foundation.schema.json`
- `references/_shared/schemas/palette-foundation.schema.json`
- `references/_shared/schemas/typography-foundation.schema.json`
- `references/_shared/schemas/iconography-foundation.schema.json`
- `references/_shared/schemas/button-foundation.schema.json`
- `references/_shared/schemas/card-foundation.schema.json`
- `references/_shared/schemas/header-foundation.schema.json`
- `references/_shared/schemas/footer-foundation.schema.json`
- `references/_shared/vocabulary/design-token-types.json`
- `references/_shared/vocabulary/component-anatomy.json`
- `references/_shared/vocabulary/component-variants.json`
- `references/_shared/vocabulary/layout-roles.json`
- `references/_shared/vocabulary/accessibility-rules.json`
- `references/_shared/vocabulary/design-system-source-kinds.json`
- `references/_shared/vocabulary/content-roles.json`
- `references/_shared/vocabulary/interaction-states.json`

## Decision Criteria

1. Use this skill when the user needs a first design-system foundation, not a
   production design system.
2. Accept prompt, screenshot, URL capture, `StudyOutput`, knowledge patterns, or
   mixed input.
3. Preserve source and confidence metadata for uncertain values.
4. Hand off focused foundation gaps to the relevant extraction/generation skill.
5. Run completeness, naming, and consistency audits before treating the seed as
   ready for downstream use.

## Rules

1. Emit both `design-system-seed.json` and `design-system-seed.md` shapes.
2. Include exactly the MVP sections: brand, palette, typography, iconography,
   buttons, cards, header, and footer.
3. Use `observed`, `inferred`, `recommended`, `generated`, and `userProvided`
   source labels deliberately.
4. Do not claim exact colors, fonts, spacing, or icon libraries from screenshots
   unless the evidence supports exactness.
5. Keep the output a generation contract, not final UI kit governance.
6. Prevent false precision, confidence laundering, value-named tokens,
   multiple primaries, orphan tokens, and final-styling drift.
7. Every required section exists, evidence-bearing values include source and
   confidence, and open questions are explicit.

## Boundary

- Owns: orchestration, section ordering, final seed assembly, JSON/Markdown
  shape, usage notes, open questions, and audit handoff.
- Does not own: production components, visual polish, token build pipelines, or
  runtime implementation.

## Workflow

1. Identify source input type and evidence quality.
2. Load project defaults from `.ui-design-intelligence.yml` when available.
3. Generate or request each foundation section.
4. Assemble the schema-facing seed.
5. Add Markdown notes for humans.
6. Run audit skills and preserve unresolved questions.

## Anti-Patterns

- Treating a seed as a production design system.
- Inventing exact visual values from weak evidence.
- Omitting provenance from generated recommendations.
- Creating component names that drift from shared vocabulary.
- Defining multiple primary action variants in the same context.
- Emitting orphan tokens with no usage or semantic role.
- Hiding unresolved evidence gaps in prose instead of `openQuestions`.

## Inline Example

```json
{
  "version": "0.1.0",
  "type": "designSystemSeed",
  "id": "clinic-seed",
  "name": "Clinic seed",
  "source": {
    "inputType": "mixed",
    "sourceRefs": ["brief", "homepage-screenshot"],
    "confidence": "medium",
    "notes": ["Screenshot colors are approximate."]
  },
  "brand": {
    "name": {"value": "Northline Dental", "source": "userProvided", "confidence": "high"},
    "summary": {"value": "Local dental practice focused on appointment conversion.", "source": "inferred", "confidence": "medium"},
    "personality": {"values": ["calm", "precise"], "source": "inferred", "confidence": "medium"},
    "audience": {"values": ["local patients"], "source": "userProvided", "confidence": "high"},
    "positioning": {"value": "Accessible preventive care.", "source": "recommended", "confidence": "medium"},
    "voice": {
      "tone": {"value": "clear and reassuring", "source": "recommended", "confidence": "medium"},
      "avoid": {"values": ["luxury claims", "clinical jargon"], "source": "recommended", "confidence": "medium"}
    },
    "visualDirection": {
      "density": {"value": "moderate", "source": "recommended", "confidence": "medium"},
      "style": {"value": "clean service utility", "source": "recommended", "confidence": "medium"},
      "emphasis": {"value": "appointment clarity", "source": "recommended", "confidence": "medium"}
    }
  },
  "palette": {
    "mode": "light",
    "colors": {
      "color.action.primary": {
        "name": "color.action.primary",
        "value": "#1D6F8F",
        "intent": "Primary appointment action",
        "usage": "Main CTA backgrounds only",
        "useOn": ["color.surface.default"],
        "accessibilityNotes": ["contrastCheckRequired"],
        "source": "inferred",
        "confidence": "medium"
      }
    },
    "accessibilityNotes": ["Generated or inferred pairs require contrast checks."]
  },
  "typography": {
    "fontFamilies": {
      "typography.family.body": {"value": "system sans", "source": "recommended", "confidence": "medium"}
    },
    "scale": {
      "typography.heading.h1": {
        "fontSize": "40px",
        "lineHeight": "48px",
        "fontWeight": 700,
        "usage": "Primary page heading",
        "source": "recommended",
        "confidence": "medium"
      }
    }
  },
  "iconography": {
    "style": "outline",
    "strokeWidth": "2px",
    "cornerStyle": "rounded",
    "preferredLibrary": "lucide",
    "usage": {"buttons": "support labels only"},
    "rules": ["Icons never replace accessible text labels."],
    "source": "recommended",
    "confidence": "medium"
  },
  "components": {
    "buttons": {
      "base": {"radius": "6px", "fontWeight": 600, "height": {"default": "44px"}},
      "variants": {
        "button.primary": {
          "usage": "Single highest-priority action per region",
          "background": "color.action.primary",
          "text": "color.text.inverse",
          "allowedActions": ["navigate", "openDialog"]
        }
      },
      "states": ["default", "focus", "disabled", "loading"],
      "rules": ["Do not create a second primary variant for the same context."],
      "source": "recommended",
      "confidence": "medium"
    },
    "cards": {"base": {}, "anatomy": ["media", "title", "summary"], "variants": {}, "rules": [], "source": "recommended", "confidence": "medium"},
    "header": {"layout": {"desktop": "logo-nav-cta"}, "height": {"desktop": "72px"}, "behavior": {"sticky": false}, "anatomy": ["logo", "navigation", "cta"], "navigation": {"maxItems": 5}, "rules": [], "source": "recommended", "confidence": "medium"},
    "footer": {"layout": {"mobile": "stacked"}, "anatomy": ["contact", "legal"], "navigationGroups": ["services", "legal"], "rules": [], "source": "recommended", "confidence": "medium"}
  },
  "usageNotes": ["Use semantic token roles, not raw values, in downstream blueprints."],
  "openQuestions": ["Confirm final brand colors from source CSS."]
}
```

## Hand-Offs

Hand off section gaps to focused foundation skills. Hand off schema concerns to
`design-system-seed.schema.json` validation. Hand off downstream structure to
blueprint or prototype skills after audit.
