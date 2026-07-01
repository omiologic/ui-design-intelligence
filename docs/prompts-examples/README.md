# Prompt And Orchestration Examples

These examples show multi-command orchestration sequences for common design and
redesign use cases. They are not single prompts. Use them as command runbooks
when working with the UI Design Intelligence skill repository.

## Mental Model

The full creation path is:

1. Gather brand information.
2. Create a design-system seed and design spec.
3. Create style references.
4. Create content and user journey maps.
5. Create wireframes from scratch or from artifact files.
6. Create a low-to-medium fidelity prototype from the wireframe.
7. Create copy content from the wireframe and prototype.
8. Prepare a high-fidelity implementation handoff with copy, style, design
   spec, and prototype config.

Current repo boundary: this repository creates study artifacts, design-system
seeds, style references, wireframes, prototype configs/plans, and copy content.
It does not yet render a production high-fidelity prototype viewer by itself.
Treat step 8 as a handoff package for an implementation agent or app builder.

## Use Case Files

- [Study Versus Audit](./study-vs-audit.md)
- [Design From User Information](./design-from-user-information.md)
- [Design From Studied Artifact References](./design-from-studied-artifacts.md)
- [Redesign From Problem To Solve](./redesign-from-problem.md)
- [Redesign From Studied Artifact References](./redesign-from-studied-artifacts.md)
- [Extract Design From Site](./extract-design-from-site.md)
- [Manage Knowledge Base Of Studied Sites](./manage-studied-sites-knowledgebase.md)

## Study And Audit Placement

Study captures evidence. Audit prioritizes problems.

Use study before design when the source is a URL, screenshot, existing page, or
unknown interface. Use audit before redesign when the user has a problem to
solve or when studied artifacts need severity-ranked decisions.

```text
study -> design inputs -> wireframe -> optional audit -> prototype
study -> audit -> redesign inputs -> revised wireframe -> prototype
```

## Scope Words

Replace `{scope}` with one of:

- `page`
- `section`
- `component`

Use the smallest useful scope. A component should not be treated as a page just
because the command can handle broad inputs.

## Common Artifact Order

```text
brief/context
  -> design-system-seed.json / design-system-seed.md
  -> design-spec.md
  -> style-reference records
  -> journey-map.json / journey-map.md
  -> wireframe.json / wireframe-notes.md
  -> prototype-config.json / prototype-plan.md
  -> prototype-content.json
  -> implementation handoff package
```

## Common Commands

Study and evidence:

```text
/study-page
/study-site
/study-visual-experience
```

Design foundation:

```text
/generate-design-system-seed
/create-design-spec
/generate-style-library
/recommend-style
```

Journey and structure:

```text
/generate-user-journey-map
/create-wireframe
/review-generated-wireframe
```

Prototype and copy:

```text
/create-prototype-plan
/generate-prototype-from-blueprint
/generate-prototype-copy
/audit-prototype-copy
/audit-prototype-flow
```

Redesign and audit:

```text
/audit-page
/audit-site
/audit-interactions
/audit-design-system-seed
```
