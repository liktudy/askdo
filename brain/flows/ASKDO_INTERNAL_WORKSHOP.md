# Askdo Internal Workshop Flow

## Purpose

Review Askdo itself as a product system rather than reviewing a user-owned kit.

## Trigger

This flow should run only when the user explicitly asks for one of the following intents:

- Askdo self review
- Askdo internal workshop
- Askdo project audit
- review Askdo itself
- internal maintenance review

## Flow

1. Confirm the request targets Askdo itself, not a user kit.
2. Inspect source-of-truth files:

```text
README.md
docs/
brain/
skills/
templates/
platforms/
AGENTS.md
```

3. Check consistency across rules, flows, schemas, skills, templates, and platform adapters.
4. Separate findings into:

- safe documentation update
- schema or template update
- skill behavior update
- platform adapter update
- structural decision required
- deferred backlog item

5. Produce an internal workshop report in English.
6. Validate structured reports against `brain/schemas/internal-workshop.schema.json` when a JSON report is written.
7. Ask for approval before structural changes.
8. Do not alter user-owned kits unless the user explicitly expands the scope.

## Output

- findings
- proposed decisions
- backlog items
- safe changes already applied, if approved
- blocked changes requiring user authority

## Report Schema

Use:

```text
brain/schemas/internal-workshop.schema.json
templates/internal-workshop/INTERNAL_WORKSHOP_REPORT.md
templates/internal-workshop/INTERNAL_WORKSHOP_REPORT.json
```
