# Decision Request

Decision ID: <decision-id>

Kit: `<kit-id>`

Requested action: <action>

Reason: <why this decision is needed>

Risk level: <low | normal | high | critical>

Expected result: <what will happen if approved>

Affected files or areas:

- <path or area>

## Choices

Choose one:

1. `approve_and_run` - Approve this action and continue execution.
2. `revise_kit` - Do not run yet; revise the kit or plan first.
3. `record_level_and_run` - Record non-blocking level notes and continue execution.
4. `reject` - Do not run this action.

Default safe choice: `revise_kit`

## Notes

Askdo must wait for the user decision before executing the blocked action.
