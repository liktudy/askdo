# Decision Request Rules

Decision requests are Askdo's approval mechanism.

A decision request is a choice gate, not an execution instruction.

## When Required

Create a decision request when:

- a newly generated kit needs build approval before execution
- a run requires expanded permission
- a run asks for high-risk, irreversible, destructive, or structural action
- a kit needs material role, roster, entry, or flow changes before running
- boundary ambiguity cannot be resolved safely

## Surfaces

Portable record:

```text
DECISION_REQUEST.md
DECISION_REQUEST.json
```

Optional adapters may render the same choices through host UI.

Do not rely on a vague natural-language prompt when a structured decision is required. Do not ask the user to type a command as a substitute for choosing the next step.

## Required Choices

Every decision request must include clear choices. For new kit approval, use:

- `approve_and_run`
- `revise_kit`
- `reject`

For permission or boundary requests, adapt choices to the decision while keeping them mutually exclusive.

## Required Content

- decision id
- kit id
- decision kind
- requested action
- reason
- risk level
- expected result
- files or areas affected
- available choices
- default safe choice
- expiry or next step when useful

## Execution Rule

Askdo must not execute the blocked action until the user has made a decision.

## Adapter Rule

Platform adapters may render decision requests with host-native choice UI when possible.

Do not misuse unrelated permission prompts, command escalation, or fake tool calls to simulate Askdo approval.
