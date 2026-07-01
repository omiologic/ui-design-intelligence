# Agent Definition Format

Agent files are documentation-first orchestrator contracts referenced by plugin
bundle manifests. They are not executable subagent definitions and do not use
YAML frontmatter in this repository. The filename stem is the manifest
reference; for example, `agents/ui-researcher.md` is referenced as
`ui-researcher`.

If a later host promotes agents to executable subagents, the required
frontmatter should be `name`, `description`, and explicit execution capability
fields such as `tools` or `model`. Until that runtime exists, bundle manifests
remain the machine-readable roster and the markdown body remains the agent
contract.

Use one markdown file per agent:

```txt
agents/{agent-name}.md
```

## Canonical Sections

Each file should include:

- `# {Human Agent Name}` heading.
- `## Purpose`: what the agent orchestrates and what layer it owns.
- `## Use When`: when a bundle or command should invoke the agent.
- `## Boundary`: do-not-use rules and adjacent-agent disambiguation.
- `## Skills`: structured roster entries formatted as `required:` or
  `optional:` with backticked skill names.
- `## Commands`: structured roster entries formatted as `required:` or
  `optional:` with backticked command names.
- `## Workflow`: numbered sequence with branch conditions and stop conditions.
- `## Arbitration`: how the agent resolves conflicting skill outputs.
- `## Inputs`: expected source material, with schema/file references where
  available.
- `## Outputs`: expected artifacts or decisions, with schema/file references
  where available.
- `## Worked Example`: short input -> skill sequence -> consolidated output
  trace.
- `## Hand-Offs`: which agents, commands, or skills take over next.

## Orchestration Rules

- Use `required:` for skills and commands that must be present in every bundle
  that ships the agent.
- Use `optional:` for cross-bundle handoff capabilities that the agent can use
  when the aggregate bundle or a dependent bundle provides them.
- Start with the narrowest agent that owns the requested layer.
- Run evidence-gathering or extraction skills before generation skills.
- Run audit skills after generation when the output will feed another layer.
- Stop when required inputs are missing, when the requested layer is outside the
  agent boundary, or when blockers require user or upstream evidence.
- Preserve schema, accessibility, provenance, source confidence, and explicit
  user constraints over aesthetic or convenience recommendations.
- Link inputs and outputs to concrete schemas, templates, examples, or mark them
  as `Prose-only:` when no repository schema exists.

## Adjacent-Agent Boundaries

- `ui-researcher` owns page intent and evidence framing; it does not normalize
  structural vocabulary or generate artifacts.
- `ui-specification-analyst` owns structure inventory; it does not decide final
  blueprint hierarchy.
- `ui-interaction-analyst` owns observed interaction notes; `prototype-architect`
  owns prototype behavior config.
- `accessibility-reviewer` owns accessibility findings; `ui-audit-lead`
  prioritizes cross-domain audit reports.
- `seo-content-analyst` owns metadata and search-intent findings; it does not
  own full page structure.
- `blueprint-architect` owns blueprint and wireframe structure.
- `ui-knowledge-librarian` owns reusable pattern records and lineage.
- `design-system-architect` owns design-system seed and foundation contracts.
- `style-reference-curator` owns style vocabulary, recommendations, blends,
  applications, patches, and audits.
- `prototype-architect` owns declarative prototype behavior over wireframe node
  references.
- `user-journey-architect` owns journey strategy, stages, objections, and
  conversion-path logic.
- `ux-content-strategist` owns content hierarchy and copy-role planning between
  journeys and node-tied content.
- `ux-copywriter` owns realistic UX copy for blueprint nodes and prototype
  surfaces.
- `conversion-copywriter` owns conversion-oriented CTA, proof, objection, and
  form copy.
- `prototype-content-designer` owns prototype-ready copy tied to content models,
  prototype screens, forms, messages, and node IDs.
