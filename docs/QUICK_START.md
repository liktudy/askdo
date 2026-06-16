# Quick Start

This guide shows the shortest path from a user ask to a runnable kit through a host agent plugin.

## 1. Install Askdo

```text
Install the Askdo Codex plugin.
```

Codex is the first platform example. Platform wrappers live under `platforms/`, including OpenCode.

## 2. Start With One Ask

Example ask:

```text
Use Askdo: analyze the AI coding tools market and produce a competitor comparison report.
```

Askdo should:

1. analyze ask completeness, feasibility, and closure
2. identify the scenario planning basis: objective, scope, audience, artifacts, inputs, constraints, assumptions, risk tolerance, execution depth, success criteria, likely kit path, and closure logic
3. ask whether to confirm, revise, resolve open questions, accept defaults, defer non-blocking planning items, or stop when the planning basis is incomplete, conflicting, or undecided
4. generate 1 to 3 complete scenario options only after the scenario planning gate is resolved
5. wait for the user to choose one scenario
6. create `askdo/config.json` in the current project if missing
7. check existing kit roots from `askdo/config.json`
8. reuse a kit when suitable
9. build a new kit only when needed
10. run or prepare the kit flow
11. produce the result
12. record meaningful level notes only when they improve reuse or quality

## 3. Generated Project Assets

The plugin writes user-owned assets into the current project:

```text
askdo/
|-- config.json
|-- kits/
|   `-- market-research/
|       |-- kit.json
|       |-- ENTRY.md
|       |-- FLOW.md
|       |-- MATES.md
|       |-- ROLES.json
|       `-- ROSTER.json
`-- runs/
```

`askdo/config.json` may also point to kit, run, and deliverable roots outside the current folder:

```json
{
  "asset_roots": {
    "kits": ["./askdo/kits"],
    "runs": ["./askdo/runs"],
    "deliverables": ["./askdo/deliverables"]
  },
  "language": {
    "internal_source": "en",
    "kit_source_default": "en",
    "deliverable_default": "en",
    "ask_when_unspecified": true
  }
}
```

## 4. Run An Existing Kit

```text
Use Askdo kit market-research: compare current AI coding tools.
```

The host agent should read the kit files and Askdo rules, then produce the result.

## 5. Check The System

```text
Use Askdo to check this project's kits.
```

Checks should validate:

- config
- kit structure
- schema compliance
- permission declarations
- boundary requirements
- missing source files

## 6. List Kits

```text
Use Askdo to list all kits.
```

Askdo should read the project registry, inspect configured kit roots, and show kit id, name, status, approval status, last run date, quality status, and source root.

## 7. Audit A Kit

```text
Use Askdo to audit kit market-research.
```

External kit audit returns one of:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

Non-blocking improvements should become level notes rather than audit failures.

## 8. Internal Askdo Workshop

```text
Run an Askdo internal workshop.
```

This reviews Askdo itself, not a user kit. It is product-maintainer-triggered maintenance and should not be shown as ordinary public onboarding.

## 9. Product Evolution

```text
Run Askdo product evolution.
```

This evolves Askdo product source under product maintainer authority. It is not a public kit-user capability.

## 10. Preserve User Assets

Uninstalling Askdo must not delete kits.

Physical deletion of a kit is destructive and requires explicit kit owner approval.
