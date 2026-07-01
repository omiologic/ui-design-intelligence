# Component Analysis Template

Use this template to produce a `ComponentSpec` before React implementation.
Do not include JSX or TSX source code in this artifact unless the user
explicitly asks to continue into implementation after the spec is approved.

## Source

```txt
Source type: mockup | screenshot | wireframe | prototype | design-system-seed | runtime-design-theme | style-reference | visual-experience-spec | mixed-input | manual-brief
Source refs:
Consumer config:
componentBuildConventionPath:
Assumptions:
```

## UI Classification

```txt
Component name:
Component layer: primitive | shared-ui | section | layout | data-driven | app-specific | workflow
Complexity level: 1 | 2 | 3 | 4 | 5 | 6 | 7
Data coupling: none | static-props | schema-data | api-data | domain-model | state-machine | external-service
Implementation target framework: react
Default component code format: jsx | tsx
```

## Purpose

```txt
What the component helps the user do:
Where it appears:
What must remain configurable:
```

## Visual Hierarchy

```txt
Primary heading:
Secondary heading:
Supporting copy:
CTA or primary action:
Media or product area:
Repeated items:
Decorative elements:
State indicators:
```

## Component Tree

```txt
ComponentName
├── ChildComponent
├── ChildComponent
└── ChildComponent
```

## Props Model

```txt
propName: type - description
```

For shared UI, use display-ready props or view models. Do not expose raw API
responses, service clients, auth state, cart objects, analytics emitters, or
domain workflow objects unless the component is explicitly app-specific.

## Responsive Behavior

```txt
Desktop:
Tablet:
Mobile:
Reduced motion:
Long content:
Missing media:
```

## Accessibility Requirements

```txt
Semantic HTML:
Heading and landmark behavior:
Button versus link behavior:
Image alt behavior:
Keyboard and focus behavior:
Color and contrast:
Reduced motion:
Error/success/status feedback:
```

## Shared UI vs App-Specific Decision

```txt
Recommendation:
Reason:
Container or adapter needed:
Data owner:
Side-effect owner:
Risks:
```

## ComponentSpec Output

```json
{
  "componentName": "",
  "componentLayer": "",
  "implementationTarget": {
    "framework": "react",
    "defaultComponentCodeFormat": "tsx",
    "stylingApproach": "project-convention",
    "storybookRequired": true,
    "testPlanRequired": true
  },
  "sourceType": "",
  "complexityLevel": 3,
  "dataCoupling": "",
  "purpose": "",
  "componentTree": [],
  "propsModel": {},
  "responsiveBehavior": {
    "desktop": "",
    "tablet": "",
    "mobile": ""
  },
  "accessibilityRequirements": [],
  "implementationRisks": [],
  "openQuestions": []
}
```

## Implementation Risks

```txt
- Risk:
- Risk:
```

## Open Questions

```txt
- Question:
- Question:
```
