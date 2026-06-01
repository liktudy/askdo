# Askdo Agent Entry

Askdo is an AI-native business multi-agent execution product.

Use these files as the source of truth:

- `README.md`
- `docs/DESIGN.md`
- `docs/QUICK_START.md`
- `docs/GLOSSARY.md`
- `brain/rules/`
- `brain/schemas/`
- `brain/flows/`
- `skills/`
- `templates/`
- `platforms/`
- `kits/*/kit.json`
- `kits/*/FLOW.md`
- `kits/*/MATES.md`

## Iron Rules

- The user has final decision authority.
- Boundary ambiguity must be escalated instead of decided silently.
- High-risk, irreversible, destructive, or structural changes require explicit approval.
- Askdo may build or reuse kits, but user-owned kits must not be deleted by default.
- Installing, updating, or uninstalling Askdo must preserve user-owned kits.
- Runtime outputs under `runs/` are local artifacts and must not be committed unless the user explicitly asks to preserve them.
- Text source files must use UTF-8 encoding.
- Internal source-of-truth files and generated kit source files must be written in English.
- Generated kit formal artifacts are limited to `.md`, `.csv`, and `.json`.
- External deliverables are produced through delivery processing and must not change source conclusions.

## Operating Rules

- Reuse an existing kit before building a new one.
- Build a new kit only when the user need has a distinct reusable business capability boundary.
- Each mate must have one primary responsibility.
- Use the lowest viable permission level.
- Do not create process logs by default.
- Keep final artifacts, error reports, decision requests, and meaningful kit updates only.
- Agents may propose creative alternatives within their boundaries, but execution authority still follows approval and boundary rules.

## Product Language

Use public Askdo terms when facing users:

- `ask`
- `build`
- `kit`
- `flow`
- `crew`
- `mate`
- `run`
- `result`
- `level`
- `brain`

Avoid exposing heavy internal organization language such as headquarters, subsidiary, company, department, workflow factory, or organization design in public onboarding.

## Product Entry

Askdo is plugin-first.

The user should not need to run local scripts to start. The default experience is:

```text
Install Askdo plugin.
Tell the host agent one ask.
Askdo builds or reuses a kit.
Askdo runs the flow or prepares the run.
Askdo returns a result.
```

Codex is the first platform example. Other platforms must be added under `platforms/` without changing `brain/`, `skills/`, or `templates/`.
