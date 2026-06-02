# Quick Start

This guide shows the shortest path from a user ask to a runnable kit through a host agent plugin.

## 1. Install Askdo

```text
Install the Askdo Codex plugin.
```

Codex is the first platform example. Other platforms should be added later under `platforms/`.

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
7. check existing `askdo/kits/`
8. reuse a kit when suitable
9. build a new kit only when needed
10. run or prepare the kit flow
11. produce the result

## 3. Generated Project Assets

The plugin writes user-owned assets into the current project:

```text
askdo/
|-- config.json
|-- kits/
|   `-- market-research/
|       |-- kit.json
|       |-- FLOW.md
|       `-- MATES.md
`-- runs/
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

## 6. Preserve User Assets

Uninstalling Askdo must not delete kits.

Physical deletion of a kit is destructive and requires explicit user approval.
