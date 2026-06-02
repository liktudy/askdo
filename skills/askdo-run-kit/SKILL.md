---
name: askdo-run-kit
description: Run an existing Askdo kit for a concrete user ask, using the kit's FLOW.md and MATES.md.
---

# Askdo Run Kit

Use this skill when the user asks to run an existing kit or when intake selects a reusable kit.

## Steps

1. Load `askdo/kits/<kit>/kit.json`.
2. Load `ENTRY.md`.
3. Confirm kit status is `active` and `build_approval.status` is `approved`.
4. Load `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
5. Map the concrete ask into scenario-specific run assignments.
6. Assign each assignment to one active mate from `ROSTER.json` under the correct role from `ROLES.json`.
7. Check approval and risk rules.
8. If approval is missing, create a choice gate through `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or an adapter surface.
9. Execute the flow through the host agent only after approval.
10. If review or approval fails, follow the revision or stop path in `FLOW.md`.
11. Produce the result.
12. Save only meaningful artifacts under `askdo/runs/` or `askdo/kits/<kit>/runs/` when useful.
13. Update meaningful performance or level signals only when they matter.

## Blockers

Stop and ask the user when:

- kit status blocks execution
- build approval is pending or rejected
- required approval is missing
- permission expansion is needed
- the ask exceeds the kit boundary
- destructive or irreversible action is requested

## Decision Request

Use explicit choices for any blocker that requires user authority. Write decision request artifacts or render the same choices through an adapter, then wait.
