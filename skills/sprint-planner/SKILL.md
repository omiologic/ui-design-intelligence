---
name: sprint-planner
description: Local utility skill for managing this repository's .plan directory, numbered sprint folders, sprint summaries, local objectives, and task files with subtasks.
license: See repository LICENSE
---

# Sprint Planner

Use this skill to organize planning work in the local `.plan/` directory for the `ui-blueprint-skills` repository.

## Purpose

Maintain a predictable planning structure for numbered sprints. Convert broad repository plans into sprint objectives, sprint summaries, and task files that can guide implementation work.

## References

No external references are required. Use the repository planning directory as
the source of truth.

## Decision Criteria

1. Use sprint summaries for sprint-level goals, scope, sequencing, and status.
2. Use objective files for source material that needs more detail than the
   summary.
3. Use task files for independently completable implementation units with
   concrete subtasks.
4. Update summaries when task order, completion state, or boundaries change.

## Use When

- Planning a new sprint for this repository.
- Reading `.plan/initial/initial.plan.md` to derive implementation work.
- Creating or updating `.plan/sprint-NNN/` folders.
- Writing sprint-local objectives in `.plan/sprint-NNN/objectives/*.md`.
- Creating task files in `.plan/sprint-NNN/tasks/`.
- Breaking a task into concrete subtasks.
- Updating a sprint summary after planning or implementation progress.

## Repository Planning Layout

Use `.plan/` as the planning root.

```txt
.plan/
  initial/
    initial.plan.md
  sprint-001/
    objectives/
      *.md
    sprint-001.summary.md
    tasks/
      sprint-001.{task-name}.task.md
```

Number each sprint with a three-digit, zero-padded suffix:

```txt
sprint-001
sprint-002
sprint-003
```

## File Naming Rules

Name sprint directories:

```txt
.plan/sprint-NNN
```

Name sprint summaries:

```txt
.plan/sprint-NNN/sprint-NNN.summary.md
```

Name sprint task files:

```txt
.plan/sprint-NNN/tasks/sprint-NNN.{task-name}.task.md
```

Use lowercase kebab-case for `{task-name}`:

```txt
sprint-001.define-wireframe-schema.task.md
sprint-001.add-page-planner-skill.task.md
sprint-001.document-install-flow.task.md
```

Store optional sprint-local objectives in:

```txt
.plan/sprint-NNN/objectives/*.md
```

## Workflow

1. Read `.plan/initial/initial.plan.md` before planning sprint work.
2. Inspect existing `.plan/sprint-*` directories to find the latest sprint number.
3. Create the next sprint directory only when starting a new sprint.
4. Ensure each sprint directory contains `objectives/`, `tasks/`, and `sprint-NNN.summary.md`.
5. Write concise objective files when the sprint has local goals that need more detail than the summary.
6. Create one task file per meaningful implementation unit.
7. Include subtasks in each task file so work can be completed and reviewed incrementally.
8. Update the sprint summary whenever the sprint scope, task list, or completion status changes.

## Rules

1. Keep planning files factual and implementation-oriented.
2. Use explicit file paths for context.
3. Keep task filenames lowercase, kebab-case, and sprint-prefixed.
4. Preserve completed task history unless the user explicitly asks for a
   rewrite.
5. Keep task subtasks concrete enough to verify.

## Anti-Patterns

- Renumbering existing sprint tasks without recording the reason.
- Creating broad catch-all tasks that cannot be completed independently.
- Moving later-sprint boundaries into the current sprint without updating scope.
- Replacing objective source material with a summary that loses important
  constraints.

## Sprint Summary Template

Use this structure for `sprint-NNN.summary.md`:

```md
# Sprint NNN Summary

## Objective

Short statement of the sprint goal.

## Scope

- Planned work item.
- Planned work item.

## Tasks

- [ ] `sprint-NNN.example-task.task.md` - Short task description.

## Notes

Important context, decisions, or dependencies.
```

## Task Template

Use this structure for `.plan/sprint-NNN/tasks/sprint-NNN.{task-name}.task.md`:

```md
# {Task Name}

## Goal

Describe the outcome this task should produce.

## Context

Link to relevant plan, objective, skill, schema, or source files.

## Subtasks

- [ ] First concrete step.
- [ ] Second concrete step.
- [ ] Verification or documentation step.

## Done When

- Completion condition.
- Completion condition.
```

## Planning Rules

- Keep sprint tasks small enough to review independently.
- Prefer explicit file paths over vague descriptions.
- Preserve existing sprint files unless the user asks to rewrite them.
- Do not renumber existing sprints.
- Do not move completed tasks between sprints without recording the reason in the summary.
- Keep summaries factual and current.

## Hand-Offs

Hand off implementation work to the generated task files. Hand off sprint status
to the sprint summary after each task is completed.
