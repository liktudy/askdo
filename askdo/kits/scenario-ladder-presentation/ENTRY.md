# Scenario Ladder Presentation Entry

## Use This Kit

```text
use askdo kit scenario-ladder-presentation: automatically design and execute simple, medium, and hard scenarios, then produce a presentation result
```

## Purpose

Design a progressive scenario ladder from a user ask, execute the simple, medium, and hard levels safely, synthesize the results, and deliver the final output as a presentation.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask fits scenario design, progressive testing, product review, workflow validation, or capability demonstration.
- each scenario is non-destructive and uses the lowest viable permission.
- any request for network access, external writes, destructive action, or structural source changes receives a separate explicit approval.
- presentation delivery is produced through delivery processing after source conclusions are complete.

## Inputs

- User ask and target subject.
- Any known scope limits, forbidden actions, or required evidence.
- Required levels: simple, medium, hard.
- Desired presentation language, audience, and file format.

## Outputs

- Auto-designed scenario ladder.
- Execution evidence for simple, medium, and hard levels.
- Result synthesis and recommendations.
- Presentation deliverable.

## When To Refuse Or Revise

- Refuse execution when the ask requires destructive changes, secret disclosure, impersonation, production-impacting actions, or unsupported external access.
- Request approval when a scenario needs expanded permission, network access, or writes outside the workspace.
- Revise the ladder when a lower level exposes a blocker that makes the next level unsafe or misleading.
- Revise the kit when the requested scenario type needs roles or mates not covered by `ROLES.json` and `ROSTER.json`.

## Decision Request

When approval is required, create a choice gate and wait for one of:

- `approve_and_run`
- `revise_kit`
- `reject`

Record the gate in `DECISION_REQUEST.md` and `DECISION_REQUEST.json` unless an adapter records the same decision.
