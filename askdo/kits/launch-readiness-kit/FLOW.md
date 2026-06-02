# Launch Readiness Flow

## Purpose

Assess readiness, identify blockers, and produce a decision-ready launch package.

## Flow Map

```mermaid
flowchart TD
  A["Receive launch scenario"] --> B{"Kit active and approved?"}
  B -- "No" --> C["Create choice gate and stop"]
  B -- "Yes" --> D["Define launch scope and assumptions"]
  D --> E["Review product readiness"]
  D --> F["Review operational readiness"]
  D --> G["Review risk and dependencies"]
  E --> H["Build readiness matrix"]
  F --> H
  G --> H
  H --> I{"Critical blocker found?"}
  I -- "Yes" --> J["Recommend no-go or conditional go"]
  I -- "No" --> K["Recommend go with controls"]
  J --> L["Create risk register"]
  K --> L
  L --> M["Draft go/no-go decision"]
  M --> N{"Decision package is evidence-backed?"}
  N -- "No" --> O["Revise evidence or assumptions"]
  O --> N
  N -- "Yes" --> P["Save report, risk register, and decision"]
```

## Steps

1. Start from `ENTRY.md`.
2. Confirm approval and boundary.
3. Define launch scope, assumptions, constraints, and success criteria.
4. Review product, operational, risk, and dependency readiness.
5. Build a readiness matrix.
6. Identify blockers and mitigation actions.
7. Produce a go/no-go recommendation.
8. Save Markdown and CSV artifacts.

## Failure Handling

- Stop when approval is missing.
- Refuse actual deployment or production mutation.
- Mark unknowns as launch risks.
- Recommend conditional go or no-go when blockers remain.
