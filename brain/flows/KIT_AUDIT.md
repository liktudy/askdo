# Kit Audit Flow

## Purpose

Review a user-owned kit with rule checks, multi-dimensional quality review, and level-note classification.

## Flow

1. Identify the target kit.
2. Resolve the kit through the registry and configured kit roots.
3. Load `kit.json`, `ENTRY.md`, `FLOW.md`, `MATES.md`, `ROLES.json`, and `ROSTER.json`.
4. Read the kit mission from `kit.json` and `ENTRY.md`; use it as the audit compass.
5. Run the basic rule check.
6. Review structure, boundary, flow, crew, role, mate, context contract, approval, output, reuse, overlap, language, and mission-fit dimensions.
7. Separate blocking issues from non-blocking level notes.
8. Assign one audit verdict:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

9. Produce a concise audit report.
10. If findings are material, present a choice gate.
11. Apply safe, approved in-scope improvements during the current loop when the user chooses revision or another approved action.
12. Record non-blocking findings as concrete level notes with evidence, implication, and next trigger when the kit remains runnable.
13. Do not modify the kit unless the user chooses revision or another approved action.

## Output

- audit verdict
- quality scorecard
- blocking issues
- improvement notes
- recommended next action
- uncertainty or missing evidence
- current-loop action taken or next trigger for every level note
- evidence and implication for every level note
