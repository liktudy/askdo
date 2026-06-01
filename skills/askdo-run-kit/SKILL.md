---
name: askdo-run-kit
description: Run an existing Askdo kit for a concrete user ask, using the kit's FLOW.md and MATES.md.
---

# Askdo Run Kit

Use this skill when the user asks to run an existing kit or when intake selects a reusable kit.

## Steps

1. Load `askdo/kits/<kit>/kit.json`.
2. Load `FLOW.md` and `MATES.md`.
3. Check kit status.
4. Check approval and risk rules.
5. Execute the flow through the host agent.
6. Produce the result.
7. Save only meaningful artifacts under `askdo/runs/` or `askdo/kits/<kit>/runs/` when useful.
8. Update meaningful performance or level signals only when they matter.

## Blockers

Stop and ask the user when:

- kit status blocks execution
- required approval is missing
- permission expansion is needed
- the ask exceeds the kit boundary
- destructive or irreversible action is requested

