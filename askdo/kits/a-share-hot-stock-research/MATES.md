# A-Share Hot Stock Research Mates

## Crew

Source: `ROLES.json`

Name: A-Share Market Research Crew

Purpose: Produce a verified A-share hot-stock research report with bounded, non-personalized trading suggestions.

## Role Contract

Source: `ROLES.json`

Roles are stable responsibility seats. Shared roles may use the same `archetype` across scenarios, but scenario-specific behavior belongs in `scenario_bindings`, not in copied role definitions.

## Mate Roster

Source: `ROSTER.json`

Mates are concrete workers assigned to roles. Add, remove, pause, or replace mates in `ROSTER.json`; update this Markdown only when the operating contract changes.

## Assignment Notes

- Each run creates assignments for current market heat screening, company research, catalyst analysis, trading context, risk review, and report synthesis.
- Each assignment must be owned by one mate from `ROSTER.json`.
- Every factual claim must be supported by current public evidence or marked as uncertain.
- Trading suggestions must remain non-personalized and bounded by the confirmed time horizon and risk frame.
- If the ask expands into account-specific portfolio allocation, leverage, or automated trading, escalate before execution.

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
- Use the lowest viable permission for each role and mate.
- Escalate unclear boundaries or permission expansion.
- Do not perform destructive, irreversible, personalized, or automated trading work without explicit approval.
