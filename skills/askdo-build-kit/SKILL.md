---
name: askdo-build-kit
description: Build a reusable Askdo kit with entry, flow map, role contract, roster, and approval gate from a user business need.
---

# Askdo Build Kit

Use this skill when no existing kit can naturally handle the user ask.

## Required Outputs

```text
<configured-kit-root>/<kit-name>/kit.json
<configured-kit-root>/<kit-name>/ENTRY.md
<configured-kit-root>/<kit-name>/FLOW.md
<configured-kit-root>/<kit-name>/MATES.md
<configured-kit-root>/<kit-name>/ROLES.json
<configured-kit-root>/<kit-name>/ROSTER.json
```

## Steps

1. Read `askdo/config.json` and resolve configured kit roots.
2. Check existing kits first through the registry.
3. Choose a short kebab-case kit name.
4. Define the kit purpose and boundary.
5. Create `kit.json` using `brain/schemas/kit.schema.json`.
6. Set new kits to `under_review` with `build_approval.status` as `pending`.
7. Create `ENTRY.md` as the single run entry for this kit.
8. Create `FLOW.md` with a flow map, decision gates, rejection paths, assignment mapping, review, output, and failure handling.
9. Create `ROLES.json` with one crew, stable roles, role archetypes, scenario bindings, default permissions, and acceptance checks.
10. Create `ROSTER.json` with concrete mates assigned to roles.
11. Create `MATES.md` as a human-readable operating contract summary that points to `ROLES.json` and `ROSTER.json`.
12. Apply language config: machine-readable controls stay English; user-facing narrative follows configured defaults when appropriate.
13. Do not create extra crews, roles, mates, templates, or future workflows by default.
14. Create a choice gate before execution.
15. Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or render the same choices through an adapter.
16. Stop until the user chooses approve, revise, or reject.

## Role And Mate Rules

- A role is a stable responsibility seat, not a worker.
- A mate is a concrete worker assigned to a role.
- A role may have one or more mates.
- Shared roles use role archetypes and scenario bindings.
- Employee or mate add/remove/pause changes belong in `ROSTER.json`.
- Do not use broad phase-bucket mates such as generic builder, runner, handler, or manager.
- If a role needs unrelated capabilities, split the role or add separate mates with clear boundaries.
- A generated kit is not executable until the user approves it.
- Approval must be requested with explicit choices, not an execution command.

## Decision Request

For a newly generated kit, provide these choices:

- `approve_and_run`
- `revise_kit`
- `reject`

Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` beside the pending kit, or render the same choices through an adapter.

## Minimal Kit

```text
<configured-kit-root>/<kit-name>/
|-- kit.json
|-- ENTRY.md
|-- FLOW.md
|-- MATES.md
|-- ROLES.json
`-- ROSTER.json
```
