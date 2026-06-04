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

Blocking issues require revision before run. Non-blocking notes may be recorded and the kit may still run if the user approves.

### Choice Gate

When an audit produces material findings, Askdo must ask the user to choose the next step.

Recommended choices:

- `approve_and_run`
- `revise_kit`
- `record_level_and_run`
- `reject`

## Internal Askdo Quality

Internal quality reviews Askdo itself.

It is keyword-triggered maintenance, not a normal public kit capability.

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

Internal review must not directly make structural changes unless the user explicitly approves them.

## Level Notes

Level notes record only meaningful reusable improvements.

They should not become process logs. Prefer concise recommendations that improve future reuse, quality, boundaries, or lifecycle decisions.
