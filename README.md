# Askdo

Askdo is an AI-native business multi-agent execution product.

Public promise:

```text
Ask. It does.
```

Operating loop:

```text
ask -> refine -> scenario -> build -> flow -> run -> result -> level
```

Askdo lets a user describe a business need. The installed agent plugin first checks whether the ask is complete, feasible, logically closed, and settled enough for scenario planning. If the planning basis is incomplete, conflicting, or undecided, the decision-maker chooses whether to confirm, revise, resolve, accept proposed defaults, defer non-blocking planning items, or stop. Only after that planning gate is resolved does Askdo propose 1 to 3 complete scenarios, then build or reuse a user-owned `kit`, run the kit's multi-agent `flow`, produce a result, and record only meaningful feedback for future improvement.

Askdo also keeps a lightweight asset and quality layer:

```text
registry -> rule check -> kit audit -> level notes -> lifecycle signal
```

The registry lets Askdo find kits even when they live outside the current folder. Kit quality distinguishes blocking audit failures from runnable kits that still have useful improvement notes.

## Shape

```text
Askdo
= installable capability layer
+ user-owned kits
+ multi-agent business flows
+ result and feedback loop
```

Askdo is not a heavy agent runtime, not a web dashboard, and not a traditional BPM tool.

## Core Terms

| Term | Meaning |
| --- | --- |
| `brain` | Built-in Askdo capability for understanding, planning, building, checking, and routing. |
| `scenario` | A complete user-selectable path from ask to result, with outcome, assumptions, artifacts, risk, and closure logic. |
| `kit` | User-owned reusable business capability pack. |
| `flow` | Multi-agent business workflow inside a kit. |
| `crew` | A cooperating team inside a kit, made of roles and their assigned mates. |
| `role` | A stable responsibility seat inside a crew. |
| `role archetype` | A reusable role pattern that can be adapted through scenario bindings. |
| `mate` | A concrete worker assigned to a role. A role may have one or more mates. |
| `assignment` | One run-specific task owned by a mate. |
| `run` | One execution of a kit. |
| `result` | Output returned to the user. |
| `level` | Improvement signal from real usage. |
| `registry` | Project config and asset roots used to find user-owned kits, runs, and deliverables. |
| `audit` | Quality review that classifies kit findings as blocking issues or non-blocking level notes. |

## First Use

```text
Use Askdo: analyze the AI coding tools market and produce a competitor comparison report.
```

The first product surface is a Codex plugin example, not a local CLI. The user installs Askdo into the host agent tool, then starts with one natural-language ask.

The plugin writes user-owned assets into the current project:

```text
askdo/
|-- config.json
|-- kits/
`-- runs/
```

`askdo/config.json` may also point to user-owned kits, runs, and deliverables outside the current folder.

Before kit generation or execution, Askdo analyzes the ask and settles the scenario planning basis. The decision-maker chooses whether to confirm the planning frame, revise it, resolve open questions, accept proposed defaults, defer non-blocking planning items with recorded limits, or stop. Only after that planning gate is resolved does Askdo present 1 to 3 complete scenarios and wait for the user to choose one.

Generated kits start in review. The user must approve a kit before Askdo runs it.

External kit audit verdicts are:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

`pass_with_level_notes` means the kit can run, but Askdo should record meaningful non-blocking improvements for future level-up work.

Approval is a choice gate:

```text
[Approve and run] [Revise kit] [Reject]
```

The UI shape is secondary. Askdo must make the choices explicit and stop until the user selects one. `DECISION_REQUEST.md` and `DECISION_REQUEST.json` are the portable record of that choice gate.

Each kit has a single execution entry:

```text
<kit-root>/<kit-name>/ENTRY.md
```

## Asset Ownership

Kits are user-owned business assets. Installing, upgrading, or uninstalling Askdo must not delete generated kits unless the user explicitly requests a destructive purge.
