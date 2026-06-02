# Role Archetypes

Role archetypes are reusable responsibility patterns.

Use them when several scenarios need the same kind of role but the scenario context changes the work.

## Rules

- A role archetype captures stable accountability, boundary, permission defaults, and acceptance checks.
- Scenario-specific behavior belongs in `scenario_bindings`.
- Do not copy the same role into multiple scenarios when an archetype plus binding would preserve reuse.
- Do not force one role archetype to cover unrelated responsibilities.
- A mate belongs to a concrete role instance through `ROSTER.json`.

## Example

```json
{
  "id": "advisory-reviewer",
  "archetype": "quality-and-boundary-reviewer",
  "scenario_bindings": [
    {
      "scenario": "human-capital-advisory",
      "responsibility_adjustment": "Focus on HR-sensitive boundaries, executive clarity, and implementation risk.",
      "permission_adjustment": "none"
    }
  ]
}
```
