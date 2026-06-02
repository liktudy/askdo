# Daily Brief Kit Entry

## Use This Kit

```text
use askdo kit daily-brief-kit: convert daily notes into a concise brief
```

## Purpose

Create a short daily brief from a small set of notes, messages, or bullet points.

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask is about summarizing local user-provided notes.
- no external network, destructive action, or source-code change is required.

## Input

- Notes or a short scenario supplied by the user or host agent.

## Output

- `DAILY_BRIEF.md`

## Decision Request

If approval is missing, create a choice gate and wait.
