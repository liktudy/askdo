---
name: askdo-level
description: Apply or record meaningful improvement signals after Askdo runs without creating noisy process logs.
---

# Askdo Level

Use this skill after a run, audit, review, or user feedback when the result creates reusable learning.

## Record Only Meaningful Signals

Record:

- run count
- success or failure count
- review failure count
- reuse count
- delivery count
- overlap warning
- last run date
- last success date
- boundary or granularity improvement suggestions
- last audit verdict
- last audit date
- non-blocking level notes from `pass_with_level_notes`

Do not create process logs by default.

## Current-Loop Actions

For each meaningful signal, choose exactly one action:

- apply now when the change is safe, approved, and in scope
- ask the authorized decision-maker to decide when the change affects boundary, risk, ownership, or structure
- record a concrete level note with the next trigger when the signal should be consumed by a later review, run, audit, or user decision
- reject the signal when it is noisy, speculative, or not reusable

## Evidence Bar

Level notes are decision-grade insights, not activity logs.

A level note is valid only when it includes:

- evidence from a run, audit, result review, user feedback, or repeated pattern
- implication for future kit use, review, execution, boundary, or maturity
- next trigger that should consume the note

Do not record material that was merely noticed, discussed, or covered without evidence that it should change the next loop.

## Rules

- Keep records minimal.
- Prefer useful kit updates over verbose logs.
- Escalate if repeated failure suggests kit restructure.
- Do not treat non-blocking improvement notes as review failures.
- Do not record every audit observation; record only reusable improvement signals.
- Do not park useful optimization in a vague future plan.
