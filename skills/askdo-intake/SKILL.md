---
name: askdo-intake
description: Start Askdo from a natural-language user ask, decide whether to reuse an existing kit or build a new one, and keep the user-facing experience simple.
---

# Askdo Intake

Use this skill when the user asks Askdo to handle a business need.

## Goal

Turn one user ask into the correct next action:

```text
reuse kit
build kit
run kit
ask for clarification
present scenario options
request approval
```

## Steps

1. Read `AGENTS.md` and `brain/rules/`.
2. Analyze the ask for completeness, feasibility, and closure.
3. For substantial asks, separate facts, assumptions, inferences, and unknowns.
4. Identify which facts need verification before build, run, or answer.
5. Identify the scenario planning basis: objective, scope, audience, result artifact, inputs, constraints, assumptions, risk tolerance, execution depth, success criteria, likely kit path, and closure logic.
6. If the planning basis is incomplete, infeasible, not logically closed, conflicting, or materially undecided, name the planning issues and ask the decision-maker how to handle them before scenario generation.
7. Offer planning decisions such as confirm planning frame, revise planning frame, resolve now, use proposed defaults, defer non-blocking planning items with recorded limits, or stop.
8. Do not generate recommended scenario options until the scenario planning gate is resolved.
9. Once the scenario planning gate is resolved, generate 1 to 3 complete scenario options.
10. Each scenario must include outcome, assumptions or inputs, planning decisions applied, likely kit path, expected artifacts, risks, and closure logic.
11. Ask the user to choose one scenario. Recommend one when useful, but do not override the user's choice.
12. Check the current project for `askdo/config.json`.
13. If missing, create the minimal project asset structure:

```text
askdo/
|-- config.json
|-- kits/
`-- runs/
```

14. Check existing `askdo/kits/`.
15. Reuse a kit when suitable for the selected scenario.
16. Build a new kit only when the selected scenario has a reusable business capability boundary.
17. If a new kit is built, create a choice gate and stop before execution.
18. If an approved existing kit is selected, start execution from its `ENTRY.md`.
19. Run or prepare the selected kit flow.
20. Verify generated outputs and factual claims before delivery.

## Rules

- Do not expose heavy internal organization language in user-facing output.
- Do not delete user-owned kits.
- Escalate unclear boundaries.
- Do not generate recommended scenario options while the scenario planning basis is still undecided.
- Do not build or run from the raw ask before scenario selection is complete.
- Askdo may propose creative or more ambitious scenarios, but the user chooses the final path.
- Challenge weak premises and name negative conclusions when evidence supports them.
- State uncertainty instead of inventing facts, names, dates, numbers, citations, or product behavior.
- Request approval before high-risk, destructive, irreversible, or boundary-expanding work.
- Write `DECISION_REQUEST.md` and `DECISION_REQUEST.json` or use an adapter to render the same choices.
- Do not ask the user to type an execution command when a choice gate is required.
