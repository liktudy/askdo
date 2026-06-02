# Scenario Ladder Presentation Mates

## Crew

`scenario-ladder-presentation-crew`

Purpose: design and execute a progressive scenario ladder, then deliver the result as a presentation.

## Role Model

Roles are stable responsibility seats defined in `ROLES.json`.

Mates are concrete workers assigned to roles in `ROSTER.json`.

Assignments are created per run after the scenario ladder is designed.

## Active Mate Summary

| Mate | Role | Primary responsibility | Permission |
| --- | --- | --- | --- |
| `ask-interpreter` | `scenario-director` | Interpret the ask and keep the run inside the kit boundary. | L0 Observer |
| `ladder-architect` | `scenario-designer` | Design simple, medium, and hard scenarios from the ask. | L0 Observer |
| `safety-reviewer` | `boundary-reviewer` | Review scenario safety, permission needs, and stop conditions. | L0 Observer |
| `simple-runner` | `scenario-executor` | Execute the simple scenario and capture concise evidence. | L3 Executor |
| `medium-runner` | `scenario-executor` | Execute the medium scenario and capture concise evidence. | L3 Executor |
| `hard-runner` | `scenario-executor` | Execute the hard scenario only when safe and approved. | L3 Executor |
| `evidence-synthesizer` | `result-analyst` | Synthesize level results, confidence, and recommendations. | L0 Observer |
| `deck-builder` | `presentation-producer` | Produce and verify the presentation deliverable. | L3 Executor |

## Roster Changes

Add, pause, delete, or replace mates in `ROSTER.json`.

Do not rewrite this operating contract only to change employees, staffing, or assignments.

## Permission Rule

Use the lowest viable permission. Network access, writes outside the workspace, destructive actions, or structural source changes require a separate explicit choice gate.
