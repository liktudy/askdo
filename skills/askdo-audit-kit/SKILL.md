---
name: askdo-audit-kit
description: Audit a user-owned Askdo kit with rule checks, multi-dimensional quality review, scorecard, verdict, and level notes.
---

# Askdo Audit Kit

Use this skill when the user asks to audit, review, check deeply, improve, or quality-score a user-owned kit.

## Scope

This skill audits external user-owned kits. It does not review Askdo itself. Use `askdo-internal-workshop` for Askdo project self review.

## Steps

1. Read `AGENTS.md`, `brain/rules/KIT_QUALITY.md`, `brain/flows/KIT_AUDIT.md`, and `brain/schemas/audit.schema.json`.
2. Resolve the target kit through `askdo-list-kits` behavior and configured kit roots.
3. Load required kit source files:

```text
kit.json
ENTRY.md
FLOW.md
MATES.md
ROLES.json
ROSTER.json
```

4. Run the basic rule check from `askdo-check`.
5. Review the kit across these dimensions:

- structure
- boundary
- flow
- crew
- roles and mates
- approvals and permissions
- output usefulness
- reuse and overlap
- language and deliverability

6. Separate findings into blocking issues, non-blocking level notes, structural evolution candidates, and user preference decisions.
7. Assign one verdict:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

8. Produce a concise audit report using `templates/audit/`.
9. If non-blocking improvements matter, recommend `record_level_and_run` instead of failing the kit.
10. Do not modify the kit unless the user chooses an approved revision path.

## Output

Return:

- audit verdict
- scorecard
- blocking issues
- improvement notes
- recommended next action
- unknowns or missing evidence

## Rules

- External kit audit may be public.
- Audit is not execution approval by itself.
- Blocking findings require revision before run.
- Non-blocking findings become level notes.
- Do not create verbose process logs.
