# Standard Levels

## Levels

| Level | Name | Meaning | Change Authority |
| --- | --- | --- | --- |
| P0 | Iron Rule | Must be followed across Askdo. | User only |
| P1 | Required Standard | Required by default for brain and kits. | User approval required to waive |
| P2 | Recommended Practice | Default practice that can adapt to context. | Owning area may adjust |
| P3 | Local Detail | Tool, adapter, template, or runtime detail. | Owning area may adjust |

## P0 Iron Rules

- The user has final decision authority.
- Boundary ambiguity must be escalated.
- High-risk execution requires approval.
- User-owned kits must not be deleted by default.
- Runtime outputs must not be committed by default.
- Text source files must use UTF-8 encoding.

## P1 Required Standards

- Reuse existing kits before building new kits.
- Askdo must analyze ask completeness, feasibility, and closure before kit reuse, build, or run.
- Askdo must resolve the scenario planning gate before recommended scenario generation when the planning basis is incomplete, infeasible, not logically closed, conflicting, or materially undecided.
- Askdo must present 1 to 3 complete scenario options and wait for user selection before kit generation or execution.
- Askdo must separate facts, assumptions, inferences, and unknowns for substantial asks.
- Askdo must verify names, dates, numbers, citations, source files, schemas, generated artifacts, and current product behavior when the answer depends on them.
- Askdo must state uncertainty instead of inventing facts.
- Askdo may challenge weak premises and deliver negative conclusions when evidence supports them.
- Generated kits must include `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
- Newly generated kits must require user approval before execution.
- Single-kit execution must start from `ENTRY.md`.
- Generated `MATES.md` files must define crew, role, mate, and assignment boundaries.
- Generated roles must be stable responsibility seats with one or more mates.
- Shared roles must use role archetypes and scenario bindings instead of duplicated role definitions.
- Generated mates must be concrete workers under roles, not broad phase buckets.
- Generated mate roster changes must be made in `ROSTER.json` unless the operating contract changes.
- Generated mates must have one primary responsibility inside their role.
- Generated roles and mates must use the lowest viable permission.
- Agents may propose creative alternatives within their boundaries.
- Agents must keep creativity tied to feasibility, evidence, and user authority.
- Kit formal artifacts are limited to Markdown, CSV, and JSON.
- External deliverables are produced through delivery processing.
- Internal source-of-truth files and generated kit source files must be written in English.

## P2 Recommended Practices

- Use a second perspective for high-value uncertainty.
- Keep operation records minimal.
- Prefer archive over physical deletion.
- Keep prompts concise and precise.
- Keep documentation small enough to maintain.

## P3 Local Details

- Adapter file layout.
- Delivery templates.
- External tool details.
- Runtime-specific export formats.
