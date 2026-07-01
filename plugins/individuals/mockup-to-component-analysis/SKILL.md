---
name: mockup-to-component-analysis
description: Analyze a mockup, screenshot, wireframe, or visual brief into a schema-aware ComponentSpec before any React JSX or TSX implementation work begins.
license: See repository LICENSE
---

# Mockup To Component Analysis

Use this skill when a user wants to turn a mockup, screenshot, wireframe,
prototype frame, or visual component brief into a React-ready component
specification.

## Purpose

Produce a `ComponentSpec` that explains component purpose, layer, complexity,
data coupling, props, responsive behavior, accessibility requirements,
implementation risks, and open questions before code is written.

## Philosophy

React implementation quality starts before JSX or TSX. A visual design must be
translated into ownership, data, state, accessibility, and responsive decisions
first. The output should make implementation safer without pretending that a
single screenshot has answered every product or codebase question.

## Decision Criteria

1. Use this skill before React code when the user provides a mockup, screenshot,
   wireframe, image, visual section, component brief, or existing UI capture.
2. Produce `ComponentSpec` when the component boundary, props, layer, data
   coupling, or accessibility behavior is not already settled.
3. Prefer `tsx` when the consumer config or project convention is TypeScript;
   use `jsx` only when the project or user explicitly prefers JavaScript.
4. Escalate to shared or app-specific planning when data coupling is
   `api-data`, `domain-model`, `state-machine`, or `external-service`.

## Boundary

- Owns: component analysis, `ComponentSpec` shape, component tree, props model,
  responsive behavior, accessibility requirements, implementation risks, and
  open questions.
- Does not own: writing production React code, creating Storybook files,
  selecting a final package architecture, fetching live data, or building a
  runtime component library.

## References

- `references/mockup-to-component-analysis.md`
- `references/_shared/contracts/react-components/component-spec.contract.md`
- `references/_shared/contracts/react-components/component-build-config.contract.md`
- `references/_shared/schemas/component-spec.schema.json`
- `references/_shared/templates/react-components/component-analysis-template.md`
- `references/_shared/vocabulary/react-components/component-layer.md`
- `references/_shared/vocabulary/react-components/component-complexity.md`
- `references/_shared/vocabulary/react-components/data-coupling.md`
- `references/_shared/vocabulary/react-components/component-code-format.md`
- `references/_shared/react-patterns/react-component-rules.md`
- `references/_shared/react-patterns/ui-layer-boundary.md`
- `references/_shared/react-patterns/accessibility-rules.md`
- `references/_shared/react-patterns/ai-output-rules.md`
- `references/_shared/templates/ui-design-intelligence.config.yml`

## Rules

1. Produce `ComponentSpec`; do not write JSX or TSX unless the user explicitly
   asks for implementation after the spec.
2. Use `component-analysis-template.md` for structured analysis output unless a
   stricter user-provided format is required.
3. Check consumer config for `reactComponents.componentBuildConventionPath`
   when available and apply it without replacing repository safety rules.
4. Always set `implementationTarget.framework` to `react` and
   `defaultComponentCodeFormat` to `jsx` or `tsx`.
5. Classify `componentLayer`, `complexityLevel`, and `dataCoupling` using the
   canonical vocabulary.
6. Keep reusable UI components in the UI layer; name containers, adapters, or
   route owners for data-layer work.
7. Include desktop, tablet, and mobile responsive behavior.
8. Include accessibility requirements for semantics, labels, keyboard/focus,
   images, buttons versus links, contrast, and motion when relevant.
9. Include implementation risks and open questions instead of hiding uncertainty
   in code.

## Anti-Patterns

- Jumping from a mockup straight to JSX or TSX.
- Marking an API-coupled component as shared UI without a mapper or container.
- Omitting mobile behavior because the source image is desktop-only.
- Treating decorative visuals as meaningful content without alt-text decisions.
- Exposing raw backend response shapes in a reusable UI props model.
- Filling unknowns with invented project conventions instead of open questions.

## Workflow

1. Identify input type: mockup, screenshot, wireframe, prototype, style
   reference, runtime theme, or manual brief.
2. Read consumer config and optional component convention markdown if available.
3. Identify UI type, primary purpose, audience task, and visual hierarchy.
4. Classify component layer, complexity level, and data coupling.
5. Build a component tree with meaningful React component names.
6. Define props and view-model fields; separate raw data from display props.
7. Define responsive behavior for desktop, tablet, and mobile.
8. Define accessibility requirements and interaction states.
9. Identify shared UI versus app-specific concerns.
10. Produce schema-shaped `ComponentSpec` with implementation risks and open
    questions.

## Inline Example

```json
{
  "componentName": "ProductFeatureGrid",
  "componentLayer": "section",
  "implementationTarget": {
    "framework": "react",
    "defaultComponentCodeFormat": "tsx",
    "stylingApproach": "project-convention",
    "storybookRequired": true,
    "testPlanRequired": true
  },
  "sourceType": "mockup",
  "complexityLevel": 3,
  "dataCoupling": "static-props",
  "purpose": "Display a responsive grid of product feature cards with a heading, supporting copy, and optional CTA.",
  "componentTree": ["ProductFeatureGrid", "SectionHeader", "FeatureCardList", "FeatureCard", "SectionCTA"],
  "propsModel": {
    "title": "string",
    "description": "string",
    "items": "FeatureCardItem[]",
    "cta": "LinkAction | null"
  },
  "responsiveBehavior": {
    "desktop": "Three-column grid.",
    "tablet": "Two-column grid.",
    "mobile": "Single-column stack."
  },
  "accessibilityRequirements": ["Use a section landmark labelled by heading."],
  "implementationRisks": ["Do not hard-code feature card count."],
  "openQuestions": ["Confirm whether cards link to detail pages."]
}
```

## Hand-Offs

Hand approved specs to `component-spec-to-react-plan`. Hand shared reusable
questions to `shared-ui-component-planner`. Hand data-coupled or workflow-heavy
components to `app-specific-component-planner`. Hand Storybook scenario work to
`storybook-from-component-spec`. Hand implemented components to
`react-component-review`.
