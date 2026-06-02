# Daily Brief Flow

## Purpose

Produce a concise daily brief from a small note set.

## Flow Map

```mermaid
flowchart TD
  A["Receive notes"] --> B{"Kit active and approved?"}
  B -- "No" --> C["Create choice gate and stop"]
  B -- "Yes" --> D["Extract facts, decisions, risks, and actions"]
  D --> E{"Any unclear ownership?"}
  E -- "Yes" --> F["Mark as unresolved"]
  E -- "No" --> G["Draft daily brief"]
  F --> G
  G --> H{"Brief is concise and useful?"}
  H -- "No" --> I["Revise brief"]
  I --> H
  H -- "Yes" --> J["Save DAILY_BRIEF.md"]
```

## Steps

1. Start from `ENTRY.md`.
2. Confirm approval and boundary.
3. Extract facts, decisions, risks, and next actions.
4. Mark unknown owners or dates as unresolved.
5. Save a concise Markdown brief.

## Failure Handling

- Stop when approval is missing.
- Refuse secret extraction or unsupported external access.
