# Build Kit Flow

## Purpose

Build a reusable kit from a user ask when no existing kit can naturally handle the need.

## Required Outputs

```text
kits/<kit-name>/kit.json
kits/<kit-name>/ENTRY.md
kits/<kit-name>/FLOW.md
kits/<kit-name>/MATES.md
kits/<kit-name>/ROLES.json
kits/<kit-name>/ROSTER.json
```

## Flow

1. Start from the selected scenario, not from the raw ask.
2. Confirm the selected scenario has complete outcome, inputs or assumptions, expected artifacts, feasibility, risk notes, and closure logic.
3. Check existing kits for reuse.
4. Define kit purpose and boundary.
5. Define the single-kit entry in `ENTRY.md`.
6. Define the flow with a flow map and rejection or revision paths.
7. Define the crew.
8. Define stable roles in `ROLES.json`, each with accountability, boundary, default permission, acceptance checks, and scenario bindings.
9. Define mates as concrete workers in `ROSTER.json`.
10. Write `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
11. Set the new kit to `under_review` with `build_approval.status` as `pending`.
12. Check the new kit against rules and schemas.
13. Create a choice gate for user approval before execution.
14. Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or render the same choices through an adapter.
15. Stop until the user chooses approve, revise, or reject.

## Do Not

- Do not build a kit when reuse is sufficient.
- Do not build a kit before the user selects a complete scenario.
- Do not generate extra crews, roles, or mates for possible future use.
- Do not use mates as broad phase buckets.
- Do not combine unrelated responsibilities into one mate.
- Do not run a newly generated kit before approval.
- Do not ask the user to type an execution command when a choice gate is required.
