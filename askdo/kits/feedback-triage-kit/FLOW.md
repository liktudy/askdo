# Feedback Triage Flow

## Purpose

Classify feedback, detect themes, prioritize issues, and produce an action table.

## Flow Map

```mermaid
flowchart TD
  A["Receive feedback set"] --> B{"Kit active and approved?"}
  B -- "No" --> C["Create choice gate and stop"]
  B -- "Yes" --> D["Normalize feedback items"]
  D --> E["Group by theme"]
  E --> F["Score severity and frequency"]
  F --> G{"Any high-risk item?"}
  G -- "Yes" --> H["Escalate in report"]
  G -- "No" --> I["Create action table"]
  H --> I
  I --> J["Draft triage report"]
  J --> K{"Actions are clear?"}
  K -- "No" --> L["Revise owner, priority, or rationale"]
  L --> K
  K -- "Yes" --> M["Save FEEDBACK_TRIAGE.md and ACTION_TABLE.csv"]
```

## Steps

1. Start from `ENTRY.md`.
2. Confirm approval and boundary.
3. Normalize feedback into discrete items.
4. Group items by theme.
5. Score severity and frequency.
6. Recommend priority and owner type.
7. Save a Markdown report and CSV action table.

## Failure Handling

- Stop when approval is missing.
- Redact or avoid sensitive personal data.
- Mark uncertain prioritization instead of inventing certainty.
