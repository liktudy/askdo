# Askdo Project Review Entry

## Use This Kit

```text
use askdo kit askdo-project-review: review Askdo from multiple dimensions, run simple-medium-hard tests, and produce a Word report
```

## Purpose

Assemble a multi-dimensional review crew to evaluate the Askdo project through simple, medium, and hard test levels, then deliver test results and optimization recommendations as a Word document.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask fits project review, structured testing, quality assessment, or improvement planning.
- command execution stays inside the current workspace and uses the lowest viable permission.
- Word delivery is produced through delivery processing after source conclusions are complete.

## Inputs

- Target project path or current workspace.
- Review dimensions to emphasize, if any.
- Required test levels: simple, medium, hard.
- Desired report language and Word output expectations.

## Outputs

- Test result summary.
- Multi-dimensional review findings.
- Optimization plan with priority and effort.
- Word document deliverable.

## When To Refuse Or Revise

- Refuse execution when the ask requires destructive changes, publishing, secret disclosure, or production-impacting actions.
- Request approval when tests require expanded command execution, network access, or changes outside the workspace.
- Revise the kit when the requested review dimension needs roles or mates not covered by `ROLES.json` and `ROSTER.json`.

## Decision Request

When approval is required, create a choice gate and wait for one of:

- `approve_and_run`
- `revise_kit`
- `reject`

Record the gate in `DECISION_REQUEST.md` and `DECISION_REQUEST.json` unless an adapter records the same decision.
