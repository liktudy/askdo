# Kit Audit Flow

## Purpose

Review a user-owned kit with rule checks, multi-dimensional quality review, and level-note classification.

## Flow

1. Identify the target kit.
2. Resolve the kit through the registry and configured kit roots.
3. Load `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
4. Run the basic rule check.
5. Review structure, boundary, flow, crew, role, mate, approval, output, reuse, overlap, and language dimensions.
6. Separate blocking issues from non-blocking level notes.
7. Assign one audit verdict:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

8. Produce a concise audit report.
9. If findings are material, present a choice gate.
10. Do not modify the kit unless the user chooses revision or another approved action.

## Output

- audit verdict
- quality scorecard
- blocking issues
- improvement notes
- recommended next action
- uncertainty or missing evidence
