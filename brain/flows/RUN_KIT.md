# Run Kit Flow

## Purpose

Run an existing kit for a concrete ask.

## Flow

1. Load `kit.json`.
2. Load `FLOW.md`.
3. Load `MATES.md`.
4. Check kit status.
5. Check approval and risk rules.
6. Execute the flow.
7. Produce the result.
8. Record only meaningful run signals.

## Blockers

Stop and request user input when:

- kit status blocks execution
- required approval is missing
- permission expansion is needed
- the ask exceeds the kit boundary
- destructive or irreversible action is requested

