# Kit Lifecycle Rules

Kits are long-lived reusable business capability packs. They are not disposable task folders.

## States

- `active`: kit can accept approved runs.
- `paused`: kit is temporarily inactive.
- `under_review`: kit requires lifecycle, performance, or initial build approval review.
- `merge_candidate`: kit may overlap with another kit.
- `closure_candidate`: kit may be archived after approval.
- `closed`: kit is inactive and retained for traceability.
- `archived`: kit is retained as historical user-owned asset.

## Review Triggers

Review a kit when:

- flow execution repeatedly fails
- review failure count reaches escalation threshold
- kit is inactive for a long period
- kit overlaps with another kit
- kit output no longer creates useful value
- domain boundary becomes unclear
- the user requests review
- the latest audit verdict is `pass_with_level_notes`
- non-blocking level notes accumulate into a structural pattern

## Build Approval

Newly generated kits must start as:

```text
status: under_review
build_approval.status: pending
```

Askdo may prepare the kit source files while approval is pending, but must not execute the kit flow until the user approves it.

Approval must be requested as a choice gate.

Preferred surface:

```text
[Approve and run] [Revise kit] [Reject]
```

Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` beside the pending kit or run, then wait for the user decision. Host UI may render the same choices, but the choice gate is still required.

After approval:

```text
status: active
build_approval.status: approved
```

If approval is rejected, keep the user-owned kit files unless the user explicitly requests deletion or archive.

## Single Kit Entry

Every kit must have `ENTRY.md`.

Running a single kit starts from `ENTRY.md`, not by jumping directly into `FLOW.md`, `MATES.md`, `ROLES.json`, or `ROSTER.json`.

## Performance Signals

Track only meaningful signals:

- run count
- success count
- failure count
- review failure count
- reuse count
- delivery count
- overlap warnings
- last run date
- last success date
- last audit verdict
- last audit date
- level note count

Do not create process logs by default.

## Quality Verdicts

External kit audit verdicts are:

- `pass`: runnable without meaningful improvement notes.
- `pass_with_level_notes`: runnable with non-blocking improvements recorded for later.
- `revise_before_run`: not runnable until blocking issues are fixed.
- `reject_or_rebuild`: boundary or structure should be rejected or rebuilt.

`pass_with_level_notes` must not be treated as audit failure.

## Maturity Signals

Kit maturity is a later lifecycle signal and should not replace status.

Suggested maturity labels:

- `draft`
- `reviewed`
- `active`
- `stable`
- `mature`
- `needs_refactor`
