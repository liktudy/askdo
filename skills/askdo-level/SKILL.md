---
name: askdo-level
description: Record meaningful improvement signals after Askdo runs without creating noisy process logs.
---

# Askdo Level

Use this skill after a run when the result creates reusable learning.

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

## Rules

- Keep records minimal.
- Prefer useful kit updates over verbose logs.
- Escalate if repeated failure suggests kit restructure.
- Do not treat non-blocking improvement notes as review failures.
- Do not record every audit observation; record only reusable improvement signals.
