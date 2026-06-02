# LM Studio Evaluation Kit Entry

## Use This Kit

```text
use askdo kit lmstudio-evaluation-kit: design and run an LM Studio local model evaluation plan
```

## Purpose

Create a reusable evaluation package for testing local models in LM Studio across UI configuration, load-time settings, inference sampling, API request formats, structured output, tool use, and difference recording.

## Selected Scenario

`full-lmstudio-evaluation-kit`

## Run Gate

This kit can run only when:

- `kit.json` status is `active`.
- `build_approval.status` is `approved`.
- the ask is about LM Studio model evaluation, parameter testing, input format testing, or comparison methodology.
- the run does not install models, download models, change system settings, or start external services without explicit approval.
- network access is not required during execution unless the user explicitly asks for live documentation refresh.
- final artifacts are generated as Markdown, CSV, and JSON source deliverables.

## Inputs

- Target LM Studio version or default assumption.
- Candidate local models or default model slots.
- Hardware notes when available, including CPU, RAM, GPU, and VRAM.
- Evaluation goals: quality, speed, stability, structured output reliability, tool use reliability, and resource pressure.
- Required output language and audience.

## Default Assumptions

- Use 2 to 3 locally available models or model slots.
- Use LM Studio local server at `http://localhost:1234` for API examples.
- Cover OpenAI-compatible `/v1/chat/completions`, `/v1/responses`, structured JSON output, and tool use examples.
- Cover UI groups: Context and Offload, Advanced, Sampling, and Settings.
- Record differences in structured CSV and summarize conclusions in Markdown.

## Outputs

- `LM_STUDIO_EVALUATION_PLAN.md`
- `PARAMETER_MATRIX.csv`
- `API_CASES.json`
- `DIFFERENCE_LOG.csv`
- `FINAL_REPORT.md`

## When To Refuse Or Revise

- Refuse requests to bypass software licensing, extract private model data, or run destructive system operations.
- Request approval before starting servers, downloading models, installing dependencies, writing outside the workspace, or using network.
- Revise when the user wants a version-specific UI guide but no version is known and live docs cannot be checked.

## Decision Request

When approval is required, create a choice gate and wait for one of:

- `approve_and_run`
- `revise_kit`
- `reject`

Record the gate in `DECISION_REQUEST.md` and `DECISION_REQUEST.json` unless an adapter records the same decision.
