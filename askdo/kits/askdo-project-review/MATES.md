# Askdo Project Review Mates

## Crew

Source: `ROLES.json`

Name: Askdo Project Review Crew

Purpose: Review the Askdo project across product, architecture, execution, testing, documentation, and delivery dimensions.

## Role Contract

Source: `ROLES.json`

Roles are stable responsibility seats. Shared review roles use archetypes and scenario bindings so the same role pattern can adapt across simple, medium, and hard review levels.

## Mate Roster

Source: `ROSTER.json`

Mates are concrete workers assigned to roles. Add, remove, pause, or replace mates in `ROSTER.json`; update this Markdown only when the operating contract changes.

## Assignment Notes

- Assignments are created per run.
- Each assignment must be owned by one active mate from `ROSTER.json`.
- Simple, medium, and hard tests may reuse the same role through different scenario bindings.
- Permission expansion, network access, destructive actions, or cross-workspace writes must be escalated before execution.

## Change Rules

- Role changes go in `ROLES.json`.
- Employee or mate changes go in `ROSTER.json`.
- Flow routing changes go in `FLOW.md`.
- Execution entry changes go in `ENTRY.md`.
- This file summarizes the operating contract and should not become the roster database.
