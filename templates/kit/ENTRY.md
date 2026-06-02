# Kit Entry

## Use This Kit

```text
use askdo kit <kit-name>: <concrete ask>
```

## Purpose

<kit purpose>

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask fits this kit boundary.
- required risk or permission approvals are present.

## Inputs

- <required input>
- <optional input>

## Outputs

- <result format>

## When To Refuse Or Revise

- Refuse execution when the ask exceeds the kit boundary.
- Request approval when the ask requires expanded permission or high-risk action.
- Revise the kit when the flow, roles, or roster do not fit the requested scenario.

## Decision Request

When approval is required, create a choice gate and wait for one of:

- `approve_and_run`
- `revise_kit`
- `reject`

Record the gate in `DECISION_REQUEST.md` and `DECISION_REQUEST.json` unless an adapter records the same decision.
