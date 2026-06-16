# Run Kit Flow

## Purpose

Run an existing kit for a concrete ask.

## Flow

1. Resolve the target kit through the project registry and configured kit roots.
2. Load `kit.json`.
3. Load `ENTRY.md`.
4. Confirm `status` is `active` and `build_approval.status` is `approved`.
5. Load `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
6. Confirm the user selected a complete scenario before execution.
7. Map the selected scenario into run assignments owned by mates.
8. Prepare only the context each mate needs according to its role context contract.
9. Check approval and risk rules.
10. If approval is missing, create a choice gate through `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or an adapter surface.
11. Execute the flow through the assigned mates only after approval.
12. If review or approval fails, revise or stop according to `FLOW.md`.
13. Review the result before delivery for correctness, boundary fit, usefulness, and deliverable language.
14. Revise safe in-scope result issues before delivery.
15. Record non-blocking reusable findings as concrete level notes with the next trigger, or apply them to the kit if approved and safe.
16. Produce the result in the configured deliverable language when available.
17. Record only meaningful run and level signals.

## Blockers

Stop and request user input when:

- kit status blocks execution
- required approval is missing
- no complete user-selected scenario exists
- permission expansion is needed
- the ask exceeds the kit boundary
- destructive or irreversible action is requested
- configured kit roots are unreadable or outside granted host permissions

Use a choice gate for blockers that require kit owner or run decision-maker authority.
