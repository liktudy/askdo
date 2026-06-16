# Evolve Askdo Flow

## Purpose

Evolve Askdo product source under product maintainer authority.

This flow is internal product maintenance. It is not a kit-owner capability and must not modify user-owned kits.

## Flow

1. Confirm the request targets Askdo product source and that the requester is acting as product maintainer.
2. Read `AGENTS.md`, `brain/rules/AUTHORITY.md`, `docs/QUALITY_AND_ASSET_GOVERNANCE.md`, and `brain/schemas/evolution.schema.json`.
3. Gather evolution signals:

- drift between docs, rules, schemas, skills, templates, and adapters
- missing contracts where concepts exist without schema, template, skill, or runtime support
- repeated friction from user corrections, checks, audit findings, or warnings
- negative space where Askdo claims a capability but lacks enforcement or output
- external patterns that fit Askdo's mission
- runtime evidence from checks, smoke tests, schema failures, or asset-boundary warnings
- concept compression opportunities
- authority-domain confusion

4. Create evolution candidates with evidence, impact, risk, authority domain, and current-loop action.
5. Apply safe low-risk product-source improvements when they are in scope and do not need a product maintainer decision.
6. Create a product maintainer decision request for structural, high-risk, irreversible, or direction-setting product changes.
7. Record product learning when the candidate changes future Askdo evolution behavior.
8. Run product verification checks after applied changes.
9. Produce `EVOLUTION_REPORT.md` and `EVOLUTION_REPORT.json` using `templates/evolution/`.

## Rules

- Do not ask kit users to approve Askdo product-source evolution.
- Do not mutate user-owned kits unless the product maintainer explicitly expands scope and the kit owner authority is also satisfied.
- Do not create an evolution plan without a current-loop action.
- Safe changes must be verified in the same loop.
- Product learning records are not process logs; record only decision-grade insights.

## Output

- evolution signals
- evolution candidates
- actions taken
- product maintainer decisions required
- product learning records
- verification results
