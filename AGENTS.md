# Askdo Agent Entry

Askdo is an AI-native business multi-agent execution product.

Use these Askdo product files as the source of truth:

- `README.md`
- `docs/DESIGN.md`
- `docs/QUALITY_AND_ASSET_GOVERNANCE.md`
- `docs/ENGINEERING.md`
- `docs/QUICK_START.md`
- `docs/GLOSSARY.md`
- `brain/rules/`
- `brain/schemas/`
- `brain/flows/`
- `brain/roles/`
- `skills/`
- `templates/`
- `platforms/`
- `scripts/`
- `kits/*/kit.json`
- `kits/*/ENTRY.md`
- `kits/*/FLOW.md`
- `kits/*/MATES.md`
- `kits/*/ROLES.json`
- `kits/*/ROSTER.json`

Treat these as user-owned project assets. They are source of truth for the owning project or kit, not for Askdo product source:

- `askdo/config.json`
- `askdo/kits/*/kit.json`
- `askdo/kits/*/ENTRY.md`
- `askdo/kits/*/FLOW.md`
- `askdo/kits/*/MATES.md`
- `askdo/kits/*/ROLES.json`
- `askdo/kits/*/ROSTER.json`

## Iron Rules

- Askdo product source and generated user-owned kits have separate authority domains.
- Askdo product source changes belong to the Askdo product maintainer.
- Generated kit, run, and deliverable decisions belong to the kit owner or run decision-maker.
- Do not ask ordinary kit users to approve Askdo product-source upgrades.
- Boundary ambiguity must be escalated instead of decided silently.
- High-risk, irreversible, destructive, or structural changes require explicit approval.
- Askdo may build or reuse kits, but user-owned kits must not be deleted by default.
- Newly generated kits must be approved by the user before execution.
- Approval must be requested as a choice gate with explicit options; Askdo must stop until the user selects the next step.
- Before kit generation or execution, Askdo must analyze ask completeness, feasibility, and closure.
- Before scenario recommendation, Askdo must settle the scenario planning basis with the decision-maker.
- If the planning basis is incomplete, infeasible, not logically closed, conflicting, or materially undecided, Askdo must ask the decision-maker whether to confirm, revise, resolve, use defaults, defer non-blocking planning items, or stop.
- Askdo must not output recommended scenarios while the user and Askdo have not confirmed the scenario planning basis.
- Askdo must present 1 to 3 complete scenario options and wait for the user to choose one before kit generation or execution.
- Running a single kit must start from that kit's `ENTRY.md`.
- Installing, updating, or uninstalling Askdo must preserve user-owned kits.
- Runtime outputs under `runs/` are local artifacts and must not be committed unless the user explicitly asks to preserve them.
- Text source files must use UTF-8 encoding.
- Internal source-of-truth files must be written in English.
- Machine-readable schema keys, enum values, filenames, and control states must remain English.
- Generated kit source defaults to English; user-facing kit narrative and external deliverables may use the configured output language.
- Generated kit formal artifacts are limited to `.md`, `.csv`, and `.json`.
- External deliverables are produced through delivery processing and must not change source conclusions.
- Askdo must support user-owned kit roots outside the current folder through `askdo/config.json`.
- Askdo must distinguish external user kit quality from internal Askdo project quality.
- Internal Askdo self review must be product-maintainer-triggered and must not be exposed as ordinary public onboarding.
- Askdo product evolution must be product-maintainer-triggered and must not be exposed as ordinary public kit-user onboarding.
- Askdo must distinguish facts, assumptions, inferences, and unknowns for substantial asks.
- Askdo must verify names, dates, numbers, citations, source files, schemas, generated artifacts, and current product behavior when the answer depends on them.
- Askdo must state uncertainty instead of inventing facts.

## Operating Rules

- Reuse an existing kit before building a new one.
- List and resolve existing kits through the registry before assuming no kit exists.
- Build a new kit only when the user need has a distinct reusable business capability boundary.
- Each mate must have one primary responsibility.
- Each role must define a stable responsibility seat, and each role must have one or more mates assigned to it.
- A mate is a concrete worker under a role, not the role itself.
- Shared role definitions must be reused through role archetypes and scenario bindings instead of copied across scenarios.
- Employee or mate roster changes should be made in structured roster files, not by rewriting the operating contract by default.
- Use the lowest viable permission level.
- Do not create process logs by default.
- Keep final artifacts, error reports, decision requests, and meaningful kit updates only.
- Use `pass_with_level_notes` when a kit can run but has useful non-blocking improvements.
- Record non-blocking kit improvements as level notes instead of treating every improvement as an audit failure.
- Every Askdo iteration must improve the current project, kit, run, result, or decision record now; do not hide useful optimization behind an unowned future plan.
- When Askdo finds a useful improvement, it must choose one current-loop action: revise now, record a concrete level note with an explicit trigger, ask the authorized decision-maker to decide, or reject the note as not useful.
- Agents may propose creative alternatives within their boundaries, but execution authority still follows approval and boundary rules.
- Agents may challenge weak premises, deliver negative conclusions, and recommend stronger paths when evidence supports them.
- Creativity must remain tied to feasibility, evidence, and the relevant authority domain.

## Product Language

Use public Askdo terms when facing users:

- `ask`
- `build`
- `kit`
- `mission`
- `flow`
- `crew`
- `role`
- `context contract`
- `mate`
- `assignment`
- `run`
- `result`
- `loop`
- `level`
- `brain`
- `registry`
- `audit`
- `evolution`

Avoid exposing heavy internal organization language such as headquarters, subsidiary, company, department, workflow factory, or organization design in public onboarding.

## Product Entry

Askdo is plugin-first.

The user should not need to run local scripts to start. The default experience is:

```text
Install Askdo plugin.
Tell the host agent one ask.
Askdo analyzes whether the ask is complete, feasible, and closed-loop.
Askdo settles the scenario planning basis with the user before recommending scenarios.
If planning direction is incomplete, conflicting, or undecided, Askdo asks the user whether to confirm, revise, resolve, default, defer non-blocking planning items, or stop.
Askdo offers 1 to 3 complete scenarios for the user to choose.
Askdo builds or reuses a kit.
Askdo anchors each kit in a mission with observable success, constraints, and out-of-scope boundaries.
Askdo runs the flow or prepares the run.
Askdo returns a result.
Askdo applies meaningful improvements inside the current loop or records a concrete level note with the next trigger.
```

Codex is the first platform example. Other platforms must be added under `platforms/` without changing `brain/`, `skills/`, or `templates/`.
