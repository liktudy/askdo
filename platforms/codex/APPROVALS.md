# Askdo Approvals For Codex

Askdo approvals are choice gates. A Codex adapter may render them like command approval prompts, but the required product behavior is the user choosing the next step.

## Target Experience

When a kit needs approval, Codex should expose a choice gate:

```text
Askdo wants to run a kit

Kit: askdo-project-review
Action: approve and run
Risk: normal
Result: run simple/medium/hard tests and generate a Word report

[Approve and run] [Revise kit] [Reject]
```

## Required Adapter Contract

The Codex adapter should accept an Askdo decision payload that follows:

```text
brain/schemas/decision.schema.json
```

The adapter maps choices to a host UI when available, or records them in decision request artifacts.

Required choice ids for new kit approval:

- `approve_and_run`
- `revise_kit`
- `reject`

## State Mapping

If the user chooses `approve_and_run`:

- set `kit.json.status` to `active`
- set `kit.json.build_approval.status` to `approved`
- set `kit.json.build_approval.approved_at` to the decision timestamp
- start the run from `ENTRY.md`

If the user chooses `revise_kit`:

- keep `kit.json.status` as `under_review`
- keep `kit.json.build_approval.status` as `pending`
- revise the kit or plan before asking again

If the user chooses `reject`:

- keep the user-owned kit files
- set `kit.json.build_approval.status` to `rejected`
- do not execute the kit

## Portable Record

Askdo must write:

```text
DECISION_REQUEST.json
DECISION_REQUEST.md
```

Then Askdo waits for the user decision. A host UI is optional presentation, not the approval mechanism itself.

## Important Safety Rule

Do not trigger Codex command approval by running a fake escalated shell command. Command approval is for sandbox permissions, not business approval. Askdo approval is a choice gate.
