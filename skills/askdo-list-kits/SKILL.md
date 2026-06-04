---
name: askdo-list-kits
description: List all Askdo kits from the project registry and configured kit roots, including kits outside the current folder when permitted.
---

# Askdo List Kits

Use this skill when the user asks to show, list, search, find, inventory, or summarize Askdo kits.

## Steps

1. Read `AGENTS.md`, `brain/rules/ASSET_REGISTRY.md`, and `askdo/config.json` when present.
2. Resolve kit roots from:

```text
asset_roots.kits
kits_dir
./askdo/kits
```

3. De-duplicate resolved roots.
4. Inspect directories containing `kit.json`.
5. Read each `kit.json` and, only when needed, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
6. Report kits in a concise table with:

- id
- name
- status
- approval status
- maturity or last audit verdict when available
- last run date when available
- source root

7. Report missing, unreadable, duplicate, or out-of-scope roots as warnings or unknowns.

## Rules

- Read only by default.
- Do not create process logs.
- Do not delete, move, merge, or edit kits.
- If external roots are configured but unavailable due to host permissions, state that clearly.
- Use the configured deliverable language for user-facing output when available.
