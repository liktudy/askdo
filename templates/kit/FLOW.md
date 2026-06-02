# Flow

## Purpose

<kit purpose>

## Input

- A concrete user ask.
- Constraints, desired format, and known risks.

## Flow Map

```mermaid
flowchart TD
  A["Receive ask"] --> B{"Kit approved and active?"}
  B -- "No" --> C["Create structured decision request"]
  C --> B
  B -- "Yes" --> D{"Ask fits kit boundary?"}
  D -- "No" --> E["Refuse, clarify, or propose a new kit"]
  D -- "Yes" --> F["Map scenario and assignments"]
  F --> G["Assign mates from ROSTER.json through roles in ROLES.json"]
  G --> H{"Risk or permission expansion needed?"}
  H -- "Yes" --> I["Request approval"]
  I --> J{"Approved?"}
  J -- "No" --> K["Revise plan or stop"]
  J -- "Yes" --> L["Execute assignments"]
  H -- "No" --> L
  L --> M["Review result"]
  M --> N{"Review passed?"}
  N -- "No" --> O["Revise result or flow"]
  O --> M
  N -- "Yes" --> P["Deliver result"]
  P --> Q["Record meaningful level signals"]
```

## Steps

1. Read `ENTRY.md`.
2. Confirm `kit.json` status is `active` and `build_approval.status` is `approved`.
3. Clarify only when the ask is too ambiguous to act safely.
4. Map the ask to a scenario and run assignments.
5. Resolve roles from `ROLES.json`.
6. Select concrete mates from `ROSTER.json`.
7. Request approval for risk, permission expansion, or boundary expansion.
8. Execute the work.
9. Review the result for correctness, boundary fit, and usefulness.
10. If review fails, revise the plan, role assignment, result, or flow before delivery.
11. Return the result.
12. Record only meaningful level signals.

## Output

- A useful result for the user.
- Optional Markdown, CSV, or JSON internal artifacts when needed.

## Approval

Stop and ask for approval before:

- running a newly generated kit
- high-risk, destructive, irreversible, or boundary-expanding work
- permission expansion
- material role or roster changes

Create a choice gate, record it in decision request artifacts or an adapter surface, and wait for the user decision.
