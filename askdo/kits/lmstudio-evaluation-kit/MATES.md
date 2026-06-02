# LM Studio Evaluation Mates

## Crew

`lmstudio-evaluation-crew`

Purpose: produce a complete LM Studio local model evaluation package covering UI settings, API formats, comparison methodology, and difference records.

## Role Model

Roles are stable responsibility seats defined in `ROLES.json`.

Mates are concrete workers assigned to roles in `ROSTER.json`.

Assignments are created per run from the selected scenario and must stay inside each mate's responsibility and permission level.

## Active Mate Summary

| Mate | Role | Primary responsibility | Permission |
| --- | --- | --- | --- |
| `scope-framer` | `evaluation-director` | Define evaluation goals, boundaries, assumptions, and output loop. | L0 Observer |
| `ui-parameter-mapper` | `ui-parameter-analyst` | Map UI parameter groups and test values. | L0 Observer |
| `context-offload-specialist` | `load-configuration-analyst` | Design context, offload, memory, and advanced load-setting tests. | L0 Observer |
| `sampling-designer` | `inference-parameter-analyst` | Design sampling and repeatability test cases. | L0 Observer |
| `api-case-designer` | `api-format-analyst` | Design OpenAI-compatible, structured output, and tool-use request cases. | L0 Observer |
| `difference-recorder` | `comparison-analyst` | Define scoring, difference logging, and comparison methods. | L0 Observer |
| `artifact-writer` | `evaluation-delivery-producer` | Produce Markdown, CSV, and JSON artifacts. | L3 Executor |
| `quality-checker` | `boundary-and-quality-reviewer` | Check completeness, feasibility, closure, and source safety. | L0 Observer |

## Roster Changes

Add, pause, delete, or replace mates in `ROSTER.json`.

Do not rewrite this operating contract only to change employees, staffing, or assignments.

## Permission Rule

Use the lowest viable permission. Starting LM Studio, downloading models, installing tools, using network, or writing outside the workspace requires a separate explicit choice gate.
