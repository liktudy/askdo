# Decision Request

Decision ID: a-share-hot-stock-research-build-approval

Kit: `a-share-hot-stock-research`

Requested action: Approve and run the newly generated A-share hot stock research kit.

Reason: The selected scenario requires a reusable Askdo kit that can gather current public A-share market information, verify stock-specific facts, and produce bounded non-personalized trading suggestions. Newly generated kits must be approved before execution.

Risk level: high

Expected result: Askdo will activate the kit, verify current A-share market data and public stock information, then deliver a short-to-medium-term hot-stock information report with bounded suggestions.

Affected files or areas:

- `askdo/kits/a-share-hot-stock-research/kit.json`
- `askdo/kits/a-share-hot-stock-research/ENTRY.md`
- `askdo/kits/a-share-hot-stock-research/FLOW.md`
- `askdo/kits/a-share-hot-stock-research/MATES.md`
- `askdo/kits/a-share-hot-stock-research/ROLES.json`
- `askdo/kits/a-share-hot-stock-research/ROSTER.json`

## Choices

Choose one:

1. `approve_and_run` - Approve this kit and continue execution.
2. `revise_kit` - Do not run yet; revise the kit or plan first.
3. `reject` - Do not run this action.

Default safe choice: `revise_kit`

Selected choice: `approve_and_run`

Decision status: `approved`

Decided at: `2026-06-02T15:30:00+08:00`

## Notes

Askdo must wait for the user decision before executing the blocked action.
