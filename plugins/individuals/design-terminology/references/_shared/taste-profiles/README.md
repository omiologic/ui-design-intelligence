# Structural Taste Profiles

Taste profiles bias UIBlueprint structure without changing the neutral schema or
vocabulary. A profile is not a visual theme. It must not define colors,
typography, shadows, animation, imagery style, or code implementation rules.

Profiles answer: given the same schema-valid vocabulary, which structural
choices should be favored for this user goal and register?

## File Format

Profiles are JSON files named in lowercase kebab-case:

```txt
shared/taste-profiles/conversion.json
shared/taste-profiles/utility-product.json
```

Required top-level fields:

- `name`: kebab-case profile identifier matching the filename.
- `version`: semantic version for the profile format.
- `register`: broad structural register such as `marketing` or `product`.
- `description`: one-sentence purpose.
- `intent`: the primary structural bias in plain language.
- `rules`: deterministic structural guidance.
- `antiPatterns`: profile-specific structural failures to avoid.

Required `rules` fields:

- `sectionOrder`: ordered section jobs the profile prefers.
- `density`: structural density guidance.
- `layoutSelection`: layout-pattern preferences by section job.
- `ctaCadence`: primary and secondary action guidance.
- `overlayUse`: allowed overlay behavior and constraints.
- `responsivePriority`: what must remain prominent on smaller viewports.

## Authoring Rules

- Keep profiles structural: page sequence, hierarchy, density, layouts, CTAs,
  overlays, responsive priority, and proof placement.
- Explain why the bias exists.
- Prefer deterministic lists and records over prose-only advice.
- Do not create synonyms for schema vocabulary. Reference existing node types,
  roles, layouts, and states.
- Do not make a profile mandatory for a valid UIBlueprint. Profiles are advisory
  metadata for skills, profile-aware validators, and downstream export tools.

## Validation Boundary

`npm run validate:taste-profiles` checks deterministic vocabulary drift only:

- Profile `name` matches the filename and uses kebab-case.
- Profile `version` uses semantic `x.y.z` format.
- Profile `register` is one of the approved structural registers.
- `rules.sectionOrder[].preferredStructures` and
  `rules.layoutSelection.*[]` reference approved node types or layout patterns.
- `rules.overlayUse.allowed` and `rules.overlayUse.preferred` reference approved
  node types.
- Optional `rules.contentRoles[]` values reference approved content roles.

The validator does not judge whether a profile has good taste, whether a
sequence is strategically appropriate, or whether density and CTA cadence advice
is persuasive. Those remain skill judgment and review concerns.

## Available Profiles

| Profile | Register | When to use |
| --- | --- | --- |
| `conversion` | marketing | Pages that need a visitor to understand, trust, and take one primary action |
| `utility-product` | product | Screens where users inspect state, compare options, and complete tasks efficiently |
| `editorial` | marketing | Long-form, content-first pages where depth and authority build trust before action |
| `healthcare` | marketing | Healthcare and institutional pages where clarity, trust, and accessibility take precedence |
| `ecommerce` | marketing | Product-led pages optimized for scanning, comparison, and purchase decisions |
| `saas-utility` | product | SaaS screens where feature discovery, task density, and progressive disclosure support repeated use |
| `local-business` | marketing | Local business pages that need to convert nearby intent into contact, appointment, or visit |

## Blueprint Metadata

Blueprint examples can reference a profile with optional metadata:

```json
{
  "metadata": {
    "tasteProfile": "conversion",
    "register": "marketing"
  }
}
```

These keys are advisory. They do not change base schema validity.
