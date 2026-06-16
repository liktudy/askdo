# Mates

## Crew

Source: `ROLES.json`

Name: <crew name>

Purpose: <what this crew is responsible for inside the kit>

## Role Contract

Source: `ROLES.json`

Roles are stable responsibility seats. Shared roles may use the same `archetype` across scenarios, but scenario-specific behavior belongs in `scenario_bindings`, not in copied role definitions.

## Context Contract

Source: `ROLES.json`

Each role must define a context contract:

- `inputs`: the minimum context the role needs to do its job.
- `exclusions`: context the role should not read or rely on by default.
- `return_packet`: the compressed result the role returns to the main loop.
- `memory_write`: whether the role may write nothing, propose a level note, or update kit source after approval.

Mates inherit the context contract of their role. If an assignment needs more context than the role contract allows, escalate or revise the role before execution.

## Mate Roster

Source: `ROSTER.json`

Mates are concrete workers assigned to roles. Add, remove, pause, or replace mates in `ROSTER.json`; update this Markdown only when the operating contract changes.

## Assignment Notes

- Assignments are created per run.
- Each assignment must be owned by one mate from `ROSTER.json`.
- A mate may have multiple assignments in one run when they fit its responsibility.
- If an assignment needs unrelated responsibility or expanded permission, escalate before execution.

## Change Rules

- Role changes go in `ROLES.json`.
- Employee or mate changes go in `ROSTER.json`.
- Flow routing changes go in `FLOW.md`.
- Execution entry changes go in `ENTRY.md`.
- This file summarizes the operating contract and should not become the roster database.

## Rules

- A crew contains roles.
- A role is a stable responsibility seat, not a worker.
- A role must have one or more active mates before execution.
- A mate is a concrete worker under one role.
- Each mate has one primary responsibility inside its role.
- Each role and mate must operate inside its context contract.
- Use the lowest viable permission for each role and mate.
- Escalate unclear boundaries or permission expansion.
- Do not perform destructive or irreversible work without explicit approval.
