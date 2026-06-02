# Launch Readiness Kit Entry

## Use This Kit

```text
use askdo kit launch-readiness-kit: assess launch readiness and produce a go/no-go package
```

## Purpose

Assess whether a product, workflow, or internal capability is ready to launch.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask is about readiness assessment, not direct production launch.
- the run does not deploy, publish, delete, or change production systems.
- any external access or structural source change receives a separate approval.

## Input

- Launch scenario, assumptions, constraints, and known risks.

## Output

- `LAUNCH_READINESS_REPORT.md`
- `RISK_REGISTER.csv`
- `GO_NO_GO_DECISION.md`

## Decision Request

If approval is missing, create a choice gate and wait.
