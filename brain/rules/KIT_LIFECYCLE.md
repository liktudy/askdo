# Kit Lifecycle Rules

Kits are long-lived reusable business capability packs. They are not disposable task folders.

## States

- `active`: kit can accept approved runs.
- `paused`: kit is temporarily inactive.
- `under_review`: kit requires lifecycle or performance review.
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

Do not create process logs by default.

