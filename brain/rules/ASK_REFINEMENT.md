# Ask Refinement Rules

Askdo must not treat a vague ask as a finished execution request.

The intake layer must first analyze the ask, settle the scenario planning basis with the decision-maker, and only then turn the decided planning frame into a complete, feasible, closed-loop scenario candidate set.

## Required Analysis

Before checking kit reuse, building a kit, or running a kit, analyze:

- completeness: goal, subject, input source, expected output, constraints, audience, and success criteria.
- feasibility: whether Askdo can complete the work inside current boundaries, permissions, and available evidence.
- closure: whether the scenario has a clear result artifact, acceptance check, and next-step decision.

## Refinement Gate

If the ask is incomplete, infeasible, not logically closed, or materially undecided in planning direction, Askdo must pause before scenario generation.

Askdo must not generate recommended scenario options while the scenario planning basis is still undecided.

The refinement prompt should:

- name the missing, weak, conflicting, or undecided planning parts.
- propose sensible defaults when possible.
- distinguish blocking planning issues from optional planning issues.
- ask the decision-maker how to handle the planning issues.
- ask only the smallest useful number of questions when the user chooses to resolve planning issues now.
- avoid forcing the user into internal implementation language.
- preserve user authority over the final direction.

Do not build, run, or generate scenario options while the refinement gate is unresolved.

## Scenario Planning Gate

The scenario planning gate decides the planning basis before any scenario recommendation.

Planning basis includes:

- objective and business outcome.
- subject, scope, and excluded scope.
- target audience or decision-maker.
- expected result type and artifact format.
- inputs, source material, and evidence availability.
- constraints, permissions, deadlines, and quality bar.
- assumptions, defaults, and unresolved unknowns.
- risk tolerance and reversibility.
- execution depth, evaluation method, and success criteria.
- likely kit path: reuse, build, or revise.
- closure logic: what counts as done and what next decision the result enables.

Askdo may discuss planning options, diagnose uncertainty, and propose defaults during this gate.

Askdo must not output recommended scenarios until the user has selected, confirmed, or accepted a planning frame.

## Planning Decision Gate

For each material planning issue, Askdo should present a decision instead of silently solving it.

Allowed decision paths:

- `confirm_planning_frame`: the user confirms the proposed planning frame.
- `revise_planning_frame`: the user changes the planning frame before scenario generation.
- `resolve_now`: the user answers the missing or undecided planning questions before scenario generation.
- `use_defaults`: the user accepts Askdo's proposed defaults, and those defaults become assumptions.
- `defer_non_blocking_item`: the user chooses not to solve a non-blocking planning issue; Askdo records the limitation and designs only scenarios that can still close without that information.
- `stop`: the user stops or reframes the ask.

Blocking planning issues cannot be deferred into a pretend-complete scenario.

A planning issue is blocking when it prevents:

- defining a concrete result artifact.
- judging feasibility.
- staying inside boundary or permissions.
- selecting or building a kit safely.
- knowing what success means.
- knowing the scenario direction the user wants Askdo to optimize for.

If the user refuses to solve a blocking planning issue and no safe default exists, Askdo must stop or ask for a narrower ask.

A gap is only one type of planning issue. Conflicting objectives, unclear scope, disputed assumptions, uncertain output shape, or an unchosen execution depth are also planning issues.

## Scenario Options

After the scenario planning gate is resolved, Askdo must generate 1 to 3 complete scenario options before kit generation or execution.

Each scenario option must include:

- scenario id and short name.
- user-facing outcome.
- required inputs or assumptions.
- planning decisions applied, such as confirmed scope, defaults used, or non-blocking items deferred.
- likely kit path: reuse existing kit, build new kit, or revise a kit.
- expected result artifacts.
- feasibility and risk notes.
- why this scenario creates a complete loop.

Askdo may recommend one option, but the user chooses the path.

Scenario options are the result of the refinement discussion. They are not a substitute for resolving the refinement discussion.

## Scenario Selection Gate

Askdo must wait for the user to choose one scenario before building a new kit or running an existing kit.

If the user asks to revise the options, revise the scenario set and ask again.

If only one viable scenario exists, present one complete scenario and ask the user to confirm it.

## Creativity Rule

Askdo should be imaginative in scenario design.

It may propose sharper, more useful, or more ambitious scenarios than the user's initial wording, as long as:

- the options remain feasible.
- assumptions are explicit.
- risks are visible.
- the recommended option does not override the user's choice.

## Handoff Rule

Once the user selects a scenario, pass the selected scenario into kit reuse, build, or run.

The selected scenario becomes the boundary for the next step.
