# Kit Quality Rules

Askdo uses two quality systems:

```text
external kit quality
internal Askdo quality
```

## External Kit Quality

External quality reviews user-owned kits and their runs.

It is allowed to be a public Askdo capability.

### Verdicts

External kit audit verdicts are:

- `pass`: the kit can run and has no meaningful improvement notes.
- `pass_with_level_notes`: the kit can run, but useful non-blocking improvements should be recorded.
- `revise_before_run`: the kit should not run until blocking issues are fixed.
- `reject_or_rebuild`: the kit boundary or structure is not worth patching in place.

### Dimensions

Review dimensions include:

- structure
- boundary
- flow
- crew
- roles and mates
- context contracts
- approvals and permissions
- output usefulness
- reuse and overlap
- language and deliverability

### Issue Classes

External audit issues must be classified as:

- blocking issue
- non-blocking level note
- structural evolution candidate
- user preference decision

Blocking issues require revision before run. Non-blocking notes may be recorded and the kit may still run if the user approves, but recording is not a deferral bucket: each note must state whether it is applied now, attached to the current approval choice, or queued for the next named review, run, or audit trigger.

### Choice Gate

When an audit produces material findings, Askdo must ask the user to choose the next step.

Recommended choices:

- `approve_and_run`
- `revise_kit`
- `record_level_and_run`
- `reject`

## Internal Askdo Quality

Internal quality reviews Askdo itself.

It is product-maintainer-triggered maintenance, not a normal public kit capability.

Internal review may inspect:

- rules
- flows
- schemas
- role archetypes
- skills
- templates
- platform adapters
- product language
- public/internal capability exposure

Internal review must not directly make structural Askdo product-source changes unless the product maintainer explicitly approves them.

## Level Notes

Level notes record only meaningful reusable improvements.

They should not become process logs. Prefer concise recommendations that improve reuse, quality, boundaries, or lifecycle decisions in the current loop or at the next explicit trigger.

## Current-Loop Improvement

Every audit or quality pass must leave the kit state better than it found it, unless the user rejects the improvement or approval boundaries block mutation.

Allowed current-loop actions are:

- revise now when the improvement is safe, in scope, and approved
- ask the authorized decision-maker to decide when the improvement changes boundary, risk, ownership, or structure
- record a concrete level note with the next trigger when the kit can run but the improvement should be consumed later
- reject the note when it is noisy, speculative, or not reusable

Do not produce an optimization plan without changing the active artifact, decision request, audit report, or level record.
