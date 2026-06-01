---
name: askdo-build-kit
description: Build a reusable Askdo kit with kit.json, FLOW.md, and MATES.md from a user business need.
---

# Askdo Build Kit

Use this skill when no existing kit can naturally handle the user ask.

## Required Outputs

```text
askdo/kits/<kit-name>/kit.json
askdo/kits/<kit-name>/FLOW.md
askdo/kits/<kit-name>/MATES.md
```

## Steps

1. Check existing kits first.
2. Choose a short kebab-case kit name.
3. Define the kit purpose and boundary.
4. Create `kit.json` using `brain/schemas/kit.schema.json`.
5. Create `FLOW.md` with inputs, steps, review, output, and failure handling.
6. Create `MATES.md` with single-responsibility mates and lowest viable permissions.
7. Do not create extra crews, mates, templates, or future workflows by default.
8. Stop for approval when risk, permission, or boundary rules require it.

## Minimal Kit

```text
askdo/kits/<kit-name>/
|-- kit.json
|-- FLOW.md
`-- MATES.md
```

