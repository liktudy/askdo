---
name: askdo-intake
description: Start Askdo from a natural-language user ask, decide whether to reuse an existing kit or build a new one, and keep the user-facing experience simple.
---

# Askdo Intake

Use this skill when the user asks Askdo to handle a business need.

## Goal

Turn one user ask into the correct next action:

```text
reuse kit
build kit
run kit
ask for clarification
request approval
```

## Steps

1. Read `AGENTS.md` and `brain/rules/`.
2. Understand the ask.
3. Check the current project for `askdo/config.json`.
4. If missing, create the minimal project asset structure:

```text
askdo/
|-- config.json
|-- kits/
`-- runs/
```

5. Check existing `askdo/kits/`.
6. Reuse a kit when suitable.
7. Build a new kit only when the ask has a reusable business capability boundary.
8. Run or prepare the selected kit flow.

## Rules

- Do not expose heavy internal organization language in user-facing output.
- Do not delete user-owned kits.
- Escalate unclear boundaries.
- Ask for approval before high-risk, destructive, irreversible, or boundary-expanding work.

