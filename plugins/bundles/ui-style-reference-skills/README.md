# UI Style Reference Skills

## Summary

`ui-style-reference-skills` is the structured visual-reference bundle. It
creates, recommends, extracts, applies, blends, audits, and maps reusable style
records without producing final rendered mockups or production CSS.

## When To Install

Install this bundle when a workflow needs a controlled visual vocabulary before
design-system, blueprint, section, component, or prototype generation.

Do not install it as a high-fidelity visual design tool, image-generation
workflow, or production styling system.

## Included

Skills:

- `generate-style-reference`
- `recommend-style-reference`
- `apply-style-reference`
- `blend-style-references`
- `audit-style-application`
- `extract-style-from-reference`
- `map-style-to-design-system-seed`

Agents:

- `style-reference-curator`

Commands:

- `generate-style-library`
- `recommend-style`
- `apply-style-to-design-system`
- `apply-style-to-section`
- `apply-style-to-component`

Shared assets include style-reference schemas, starter style library, templates,
examples, validation script, and interop docs.

## Requirements

Style work expands this repository beyond structural wireframes into visual
vocabulary. Keep that scope explicit: named styles are reference records and
mapping aids, not a claim that final palette, type, motion, imagery, or CSS has
been approved.

Named style references are curated internal examples. Treat their provenance as
repository-provided visual vocabulary unless a project supplies its own source
reference.

## Install

```bash
UI_PLUGIN_BUNDLE="ui-style-reference-skills" ./install.sh
```

Install into a project-local target:

```bash
UI_PLUGIN_BUNDLE="ui-style-reference-skills" UI_PLUGIN_TARGET="./.claude" ./install.sh
```

Uninstall:

```bash
UI_PLUGIN_BUNDLE="ui-style-reference-skills" ./uninstall.sh
```

## Usage Example

Use `recommend-style` to choose a compatible style direction for a brief, then
use `apply-style-to-design-system`, `apply-style-to-section`, or
`apply-style-to-component` to produce scoped style application guidance. Run
`audit-style-application` when a style patch may conflict with brand,
accessibility, or component constraints.

## Relationship To Other Bundles

- Upstream: `ui-study-skills` and `ui-knowledge-skills` provide context.
- Adjacent/downstream: `ui-design-system-skills` maps style into seed roles;
  `ui-blueprint-skills` keeps structural output separate from style treatment.
- Downstream: `ui-prototype-skills` can use style references as constraints, not
  runtime rendering instructions.

## Versioning And Status

Version: `0.1.0`. Status: `transitional`. This is a newer visual-scope layer and
should remain explicit about provenance and boundaries.

## License

Uses the repository license. Release-grade bundle packaging should include a
bundle-local `LICENSE` that points to or copies the repository license.
