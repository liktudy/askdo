---
name: askdo-internal-workshop
description: Run a keyword-triggered internal Askdo self review across brain, rules, schemas, skills, templates, docs, and platform adapters.
---

# Askdo Internal Workshop

Use this skill only when the user explicitly asks for Askdo self review, Askdo internal workshop, Askdo project audit, review Askdo itself, or internal maintenance review.

## Scope

This skill reviews Askdo as a product system. It does not audit user-owned kits unless the user explicitly expands the scope.

## Steps

1. Confirm the request targets Askdo itself.
2. Read `brain/flows/ASKDO_INTERNAL_WORKSHOP.md`, `brain/rules/KIT_QUALITY.md`, `brain/schemas/internal-workshop.schema.json`, and `docs/QUALITY_AND_ASSET_GOVERNANCE.md`.
3. Inspect source-of-truth files:

```text
AGENTS.md
README.md
docs/
brain/
skills/
templates/
platforms/
```

4. Check for conflicts, gaps, duplicated responsibilities, stale templates, schema drift, public language drift, and capability exposure mistakes.
5. Separate findings into:

- safe documentation update
- schema or template update
- skill behavior update
- platform adapter update
- structural decision required
- deferred backlog item

6. Produce an internal workshop report in English using `templates/internal-workshop/` unless the user asks for a translated summary.
7. Ask for explicit approval before structural or high-risk changes.

## Rules

- Keyword-triggered only.
- Internal records stay in English.
- Do not expose internal maintenance as normal public onboarding.
- Do not modify user-owned kits by default.
- Do not create process logs.
- Do not use the external kit audit schema for internal Askdo review.
