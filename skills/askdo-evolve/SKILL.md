---
name: askdo-evolve
description: Product-maintainer-only Askdo evolution loop that discovers product gaps, applies safe improvements, requests decisions for structural changes, verifies, and records product learning.
---

# Askdo Evolve

Use this skill only when the Askdo product maintainer asks Askdo to evolve itself, optimize Askdo product source, run product evolution, or improve the Askdo system.

This skill evolves Askdo product source. It is not a public kit-user capability and does not audit or mutate user-owned kits by default.

## Steps

1. Confirm the request targets Askdo product source and the requester is acting as product maintainer.
2. Read:

```text
AGENTS.md
brain/rules/AUTHORITY.md
brain/flows/EVOLVE_ASKDO.md
brain/schemas/evolution.schema.json
docs/QUALITY_AND_ASSET_GOVERNANCE.md
CHANGELOG.md
```

3. Gather signals from product source, recent changes, check output, smoke output, internal workshop findings, user corrections, and external patterns.
4. Classify signals as:

- drift
- missing contract
- repeated friction
- negative space
- external pattern
- runtime evidence
- concept compression
- authority confusion

5. Generate evolution candidates with evidence, impact, risk level, authority domain, and current-loop action.
6. Apply safe low-risk product-source changes now when in scope.
7. Ask the product maintainer before structural, high-risk, irreversible, or direction-setting changes.
8. Record product learning only when it changes future Askdo evolution behavior.
9. Run verification after applied changes.
10. Produce an evolution report using `templates/evolution/`.

## Current-Loop Actions

Every candidate must end in exactly one action:

- `apply_now`: safe, in-scope product-source improvement applied in this loop.
- `request_decision`: product maintainer decision required.
- `record_learning`: useful insight recorded, no source change needed now.
- `reject`: noisy, speculative, or not useful.

## Rules

- Product maintainer authority governs Askdo source evolution.
- Kit owner authority governs generated kit assets.
- Do not ask ordinary kit users to approve Askdo product-source upgrades.
- Do not mutate user-owned kits by default.
- Do not produce an evolution plan without an action.
- Verification is part of evolution, not a separate optional step.
