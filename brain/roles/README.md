# Role Archetypes

Role archetypes are reusable responsibility patterns.

Use them when several scenarios need the same kind of role but the scenario context changes the work.

## Rules

- A role archetype captures stable accountability, boundary, context contract, permission defaults, and acceptance checks.
- Scenario-specific behavior belongs in `scenario_bindings`.
- Do not copy the same role into multiple scenarios when an archetype plus binding would preserve reuse.
- Do not force one role archetype to cover unrelated responsibilities.
- A mate belongs to a concrete role instance through `ROSTER.json`.
- A context contract defines what the role may read, what it should exclude, what compressed packet it returns, and whether it may write memory or kit changes.

## Example

```json
{
  "id": "advisory-reviewer",
  "archetype": "quality-and-boundary-reviewer",
  "context_contract": {
    "inputs": ["selected scenario", "kit mission", "draft result", "acceptance checks"],
    "exclusions": ["unrelated run history", "builder scratchpad unless needed"],
    "return_packet": ["blocking issues", "non-blocking level notes", "approval recommendation"],
    "memory_write": "propose_level_note"
  },
  "scenario_bindings": [
    {
      "scenario": "human-capital-advisory",
      "responsibility_adjustment": "Focus on HR-sensitive boundaries, executive clarity, and implementation risk.",
      "permission_adjustment": "none"
    }
  ]
}
```
