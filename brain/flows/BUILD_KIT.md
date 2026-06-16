# Build Kit Flow

## Purpose

Build a reusable kit from a user ask when no existing kit can naturally handle the need.

## Required Outputs

```text
<configured-kit-root>/<kit-name>/kit.json
<configured-kit-root>/<kit-name>/ENTRY.md
<configured-kit-root>/<kit-name>/FLOW.md
<configured-kit-root>/<kit-name>/MATES.md
<configured-kit-root>/<kit-name>/ROLES.json
<configured-kit-root>/<kit-name>/ROSTER.json
```

## Flow

1. Start from the selected scenario, not from the raw ask.
2. Confirm the selected scenario has complete outcome, inputs or assumptions, expected artifacts, feasibility, risk notes, and closure logic.
3. Check existing kits for reuse through the project registry and configured kit roots.
4. Define kit purpose and boundary.
5. Define the kit mission: why it exists, observable success, constraints, and out-of-scope work.
6. Define the single-kit entry in `ENTRY.md`.
7. Define the flow with a flow map and rejection or revision paths.
8. Define the crew.
9. Define stable roles in `ROLES.json`, each with accountability, boundary, context contract, default permission, acceptance checks, and scenario bindings.
10. Define mates as concrete workers in `ROSTER.json`.
11. Write `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
12. Set the new kit to `under_review` with `build_approval.status` as `pending`.
13. Apply project language config: machine-readable fields stay English, and user-facing narrative follows configured defaults when appropriate.
14. Check the new kit against rules and schemas.
15. Run a current-loop quality pass on the generated kit before asking for approval.
16. Revise safe in-scope findings immediately; convert non-blocking reusable findings into concrete level notes with evidence, implication, and next trigger.
17. Create a choice gate for user approval before execution.
18. Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or render the same choices through an adapter.
19. Stop until the user chooses approve, revise, or reject.

## Do Not

- Do not build a kit when reuse is sufficient.
- Do not assume all reusable kits are under the current folder.
- Do not build a kit before the user selects a complete scenario.
- Do not optimize a kit away from its mission, success criteria, constraints, or out-of-scope boundary.
- Do not generate extra crews, roles, or mates for possible future use.
- Do not use mates as broad phase buckets.
- Do not combine unrelated responsibilities into one mate.
- Do not let every role inherit full project, run, audit, or scratchpad context by default.
- Do not leave known safe build-quality improvements as a plan when they can be applied before approval.
- Do not run a newly generated kit before approval.
- Do not ask the user to type an execution command when a choice gate is required.
