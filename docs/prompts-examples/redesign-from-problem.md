# Redesign From Problem To Solve

Use this when the user describes a problem with an existing or planned
`{page}`, `{section}`, or `{component}` but does not provide complete study
artifacts.

## Order Of Execution

1. Clarify problem, scope, and success criteria.
2. Study current evidence if the source is not already understood.
3. Audit current evidence against the problem.
4. Gather or infer brand/design constraints.
5. Generate or update design-system seed and design spec.
6. Create journey map around the problem.
7. Create revised wireframe.
8. Audit the revised wireframe when the problem is high-risk.
9. Create prototype plan.
10. Generate revised copy.
11. Package high-fidelity handoff inputs.

## Orchestration Commands

### 1. Problem Framing

```text
Frame redesign problem:
- Scope: {page|section|component}
- Current problem: {problem}
- Audience affected: {audience}
- Desired outcome: {outcome}
- Constraints: {constraints}
- Evidence available: {screenshots|URL|notes|none}

Define success criteria before redesign.
```

### 2. Audit Existing Evidence

If the existing UI has not been studied, study it first:

```text
/study-page
Scope: {page|section|component}
Source: {URL, screenshots, notes, or current artifact}
Output directory: artifacts/{project_brand}/{page}/study-current
```

```text
/audit-page
Scope: {page|section|component}
Problem to solve: {problem}
Evidence: {URL, screenshots, notes, or current artifact}
Output directory: artifacts/{project_brand}/{page}/audit
Focus on issues that block the desired outcome.
```

If the problem is interaction-specific:

```text
/audit-interactions
Surface: {component-or-flow}
Problem: {problem}
Evidence: {screenshots, notes, prototype config, or observed behavior}
Output directory: artifacts/{project_brand}/{page}/audit
```

### 3. Design Foundation

```text
/generate-design-system-seed
Input type: redesign brief and audit findings
Source truth:
- problem framing
- artifacts/{project_brand}/{page}/audit
Output directory: artifacts/{project_brand}/design-system
```

```text
/create-design-spec
Scope: {page|section|component}
Implementation audience: frontend engineer or implementation agent
Source truth:
- problem framing
- audit findings
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/design-spec
```

### 4. Journey And Content Strategy

```text
/generate-user-journey-map
Audience: {audience}
Primary user goal: {goal}
Problem: {problem}
Conversion or completion goal: {outcome}
Source truth:
- problem framing
- audit findings
Output directory: artifacts/{project_brand}/{page}/journey
```

### 5. Redesigned Wireframe

```text
/create-wireframe
Scope: {page|section|component}
Audience: {audience}
Primary user goal: {goal}
Success action: {success-action}
Source truth:
- artifacts/{project_brand}/{page}/audit
- artifacts/{project_brand}/{page}/journey/journey-map.json
- artifacts/{project_brand}/{page}/design-spec/design-spec.md
Output directory: artifacts/{project_brand}/{page}/wireframe-redesign
```

### 6. Prototype Plan

Optional redesign audit gate:

```text
/review-generated-wireframe
Wireframe: artifacts/{project_brand}/{page}/wireframe-redesign/wireframe.json
Problem to solve: {problem}
Audit focus: confirm the revised structure addresses the documented problem
```

```text
/create-prototype-plan
Source wireframe: artifacts/{project_brand}/{page}/wireframe-redesign/wireframe.json
Design spec: artifacts/{project_brand}/{page}/design-spec/design-spec.md
Key flows: flows directly affected by {problem}
Output directory: artifacts/{project_brand}/{page}/prototype-redesign
```

### 7. Revised Copy

```text
/generate-prototype-copy
Source content model or journey map: artifacts/{project_brand}/{page}/journey/journey-map.json
Source prototype config: artifacts/{project_brand}/{page}/prototype-redesign/prototype-config.json
Brand voice: artifacts/{project_brand}/design-system/design-system-seed.md
Output directory: artifacts/{project_brand}/{page}/copy-redesign
```

### 8. High-Fidelity Handoff Package

```text
Prepare redesign implementation handoff:
- Problem framing and success criteria
- Audit findings
- design-system-seed.json
- design-spec.md
- wireframe-redesign/wireframe.json
- optional wireframe review findings
- prototype-redesign/prototype-config.json
- copy-redesign/prototype-content.json

Ask implementation to preserve the success criteria and avoid unrelated
redesign churn.
```
