# Manage Knowledge Base Of Studied Sites

Use this to keep a reusable knowledge base from studied sites organized,
searchable, and safe to reuse.

## Knowledge Base Shape

Recommended project-local layout:

```text
artifacts/{project_brand}/
  ui-knowledge/
    index.json
    patterns/
      {source}-{pattern}.pattern.json
    content/
      {source}-{copy-pattern}.json
    sources/
      {source}/
        source-notes.md
        source-gaps.md
```

Use `artifacts/{project_brand}/{page}/` for page-level evidence and
`artifacts/{project_brand}/ui-knowledge/` for reusable cross-page knowledge.

## Order Of Execution

1. Study or update site/page evidence.
2. Extract candidate UI patterns.
3. Extract candidate copy and journey patterns.
4. Curate candidate knowledge.
5. Index the knowledge base.
6. Search the knowledge base before new design/redesign work.
7. Deprecate stale or unsafe records.

## Orchestration Commands

### 1. Add A Studied Site

```text
/study-site
Site: {site-url}
Project/brand slug: {project_brand}
Pages: {page-list}
Output root: artifacts/{project_brand}
```

When motion matters:

```text
/study-visual-experience
Source: {page-url}
Project/brand slug: {project_brand}
Page slug: {page}
Output directory: artifacts/{project_brand}/{page}
```

### 2. Extract Candidate UI Pattern Records

```text
/extract-patterns-from-study
Study output:
- artifacts/{project_brand}/{page}/page-study.md
- artifacts/{project_brand}/{page}/capture-manifest.json
- artifacts/{project_brand}/{page}/visual-experience-spec.md
Target knowledge path: artifacts/{project_brand}/ui-knowledge/patterns
Extraction scope: {structure|interaction|responsive|motion|conversion|IA}
Status: candidate
```

### 3. Extract Candidate Copy/Journey Records

```text
/extract-copy-patterns-from-study
Study output:
- artifacts/{project_brand}/{page}/page-study.md
Pattern type: {copy|journey|objection|voice}
Target knowledge path: artifacts/{project_brand}/ui-knowledge/content
Status: candidate
```

### 4. Curate Records

```text
Curate studied-site knowledge:
- Remove observations that are too source-specific.
- Preserve sourceRefs and confidence.
- Mark copied wording/assets/choreography as not reusable.
- Merge duplicate pattern records.
- Set status: candidate, accepted, deprecated.
- Record source gaps that limit reuse.
```

### 5. Index Knowledge

```text
/index-knowledge-base
Knowledge path: artifacts/{project_brand}/ui-knowledge
Validate pattern records and rebuild:
- artifacts/{project_brand}/ui-knowledge/index.json
Report duplicate IDs, invalid tags, missing source refs, and deprecated records.
```

### 6. Search Before New Design

```text
/search-ui-knowledge
Knowledge index: artifacts/{project_brand}/ui-knowledge/index.json
Brief: {page-section-component-brief}
Audience: {audience}
Goal: {goal}
Return:
- matching pattern IDs
- confidence
- why each applies
- what not to reuse
- gaps requiring fresh study
```

### 7. Use Knowledge In Design Or Redesign

For design:

```text
/create-wireframe
Scope: {page|section|component}
Source truth:
- user brief
- artifacts/{project_brand}/ui-knowledge/index.json search results
- artifacts/{project_brand}/design-system/design-system-seed.json
Output directory: artifacts/{project_brand}/{page}/wireframe
```

For redesign:

```text
/create-wireframe
Scope: {page|section|component}
Source truth:
- audit findings
- study artifacts
- artifacts/{project_brand}/ui-knowledge/index.json search results
Output directory: artifacts/{project_brand}/{page}/wireframe-redesign
```

## Maintenance Rules

- Re-index after adding, editing, merging, or deprecating records.
- Never reuse deprecated records in generation.
- Prefer accepted records over candidate records.
- Keep source-specific brand signatures out of reusable patterns.
- Preserve source references so future audits can trace evidence.
- Record stale knowledge when source pages change.

## When To Refresh A Studied Site

Refresh study evidence when:

- The source page changed.
- The design or redesign depends on motion, responsive behavior, or hidden
  states not captured before.
- Search results feel stale or incomplete.
- Source gaps block confident reuse.
- A candidate pattern is being promoted to accepted status.
