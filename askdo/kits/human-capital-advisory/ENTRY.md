# Human Capital Advisory Entry

## Use This Kit

```text
use askdo kit human-capital-advisory: <enterprise organization advisory ask>
```

## Purpose

Design and run a human capital advisory capability that helps enterprises diagnose internal structures, design tailored operating improvements, and guide systematic implementation.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask fits human capital advisory, organization design, operating efficiency, or implementation support.
- the ask does not require unapproved legal, compensation, termination, compliance, or irreversible employee-impacting action.

## Inputs

- Enterprise size, stage, and business context.
- Current structure or known organization symptoms.
- Desired report format and decision audience.
- Known constraints, sensitive HR boundaries, or risk areas.

## Outputs

- Advisory report in Markdown.
- Diagnostic map, target model, implementation roadmap, and metrics when useful.

## When To Refuse Or Revise

- Refuse execution when the ask requests unqualified legal, compensation, termination, or compliance decisions.
- Request approval when employee-impacting or high-risk HR execution is requested.
- Revise the kit when a requested scenario needs roles, mates, or flow paths not covered by `ROLES.json` and `ROSTER.json`.
