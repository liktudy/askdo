---
name: askdo-check
description: Check an Askdo project for required structure, kit source files, boundaries, and schema consistency.
---

# Askdo Check

Use this skill when the user asks Askdo to validate a project or when a build/run needs preflight checks.

This is a rule check, not the full multi-role kit audit. Use `askdo-audit-kit` when the user asks for deep kit quality review.

## Check

- `askdo/config.json` exists when project assets have been initialized.
- configured kit roots can be resolved or reported as unknowns.
- each kit has `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
- each `kit.json` follows `brain/schemas/kit.schema.json`.
- new kits do not execute unless `status` is `active` and `build_approval.status` is `approved`.
- `ENTRY.md` exists as the single kit run entry.
- `FLOW.md` includes a flow map with decision gates and revision or stop paths.
- `ROLES.json` defines the crew, roles, archetypes, scenario bindings, default permissions, and acceptance checks.
- `ROSTER.json` maps mates to roles and active statuses.
- `MATES.md` summarizes the operating contract and points to structured role and roster files.
- each role has one or more active mates before execution.
- mates are concrete workers under roles.
- mates have single responsibilities inside their roles.
- high-risk work has approval points.
- approval blockers have explicit choice gates.
- pending newly generated kits have `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or an equivalent adapter-rendered choice gate.
- runtime outputs are not treated as source of truth.
- language config keeps internal source and machine-readable controls in English.
- audit verdicts use `pass`, `pass_with_level_notes`, `revise_before_run`, or `reject_or_rebuild` when reported.

## Output

Return a short validation report with:

- pass/fail status
- issues found
- recommended next action

Use `pass_with_level_notes` only for non-blocking improvements that should be recorded as level notes.
