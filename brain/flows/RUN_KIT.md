# Run Kit Flow

## Purpose

Run an existing kit for a concrete ask.

## Flow

1. Load `kit.json`.
2. Load `ENTRY.md`.
3. Confirm `status` is `active` and `build_approval.status` is `approved`.
4. Load `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
5. Confirm the user selected a complete scenario before execution.
6. Map the selected scenario into run assignments owned by mates.
7. Check approval and risk rules.
8. If approval is missing, create a choice gate through `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or an adapter surface.
9. Execute the flow through the assigned mates only after approval.
10. If review or approval fails, revise or stop according to `FLOW.md`.
11. Produce the result.
12. Record only meaningful run signals.

## Blockers

Stop and request user input when:

- kit status blocks execution
- required approval is missing
- no complete user-selected scenario exists
- permission expansion is needed
- the ask exceeds the kit boundary
- destructive or irreversible action is requested

Use a choice gate for blockers that require user authority.
