---
name: askdo-check
description: Check an Askdo project for required structure, kit source files, boundaries, and schema consistency.
---

# Askdo Check

Use this skill when the user asks Askdo to validate a project or when a build/run needs preflight checks.

## Check

- `askdo/config.json` exists when project assets have been initialized.
- `askdo/kits/` exists.
- each kit has `kit.json`, `FLOW.md`, and `MATES.md`.
- each `kit.json` follows `brain/schemas/kit.schema.json`.
- mates have single responsibilities.
- high-risk work has approval points.
- runtime outputs are not treated as source of truth.

## Output

Return a short validation report with:

- pass/fail status
- issues found
- recommended next action

