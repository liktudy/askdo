# Minimal Operation Rules

Askdo must stay small, precise, and ready to use.

## Hard Rules

- Do not create process logs by default.
- Do not create temporary drafts by default.
- Do not create empty placeholder structures unless they carry real meaning.
- Do not generate extra crews, mates, templates, or flows for possible future use.
- Keep final artifacts, error reports, decision requests, and meaningful kit updates only.

## Records

Successful run:

- keep final result artifacts
- update `kit.json` only when lifecycle, performance, or structure changes

Failed run:

```text
ERROR_REPORT.md
```

Decision needed:

```text
DECISION_REQUEST.md
```

Do not generate by default:

- process logs
- command output logs
- formatting tweak logs
- temporary drafts
- repeated failure logs without decision value

