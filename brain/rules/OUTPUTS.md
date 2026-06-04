# Output Rules

## Internal Kit Artifacts

Kit formal artifacts are limited to:

- Markdown: `.md`
- CSV: `.csv`
- JSON: `.json`

Internal artifacts are used for execution, review, structured records, and delivery processing.

## External Deliverables

Allowed external deliverable formats include:

- PPTX
- DOCX
- PDF
- HTML
- Markdown
- CSV
- JSON

Delivery processing may change presentation, structure, and format, but must not change source conclusions.

External deliverables and user-facing run outputs should use the configured deliverable language when one exists.

Internal source files, machine-readable schema keys, enum values, filenames, and control states stay in English.

## Quality Outputs

Kit audit outputs may include:

- `AUDIT_REPORT.md`
- `AUDIT_REPORT.json`
- `LEVEL_NOTES.md`

Audit reports classify blocking issues separately from non-blocking level notes.

Level notes are meaningful improvement records, not process logs.

Internal workshop outputs may include:

- `INTERNAL_WORKSHOP_REPORT.md`
- `INTERNAL_WORKSHOP_REPORT.json`

Internal workshop reports classify Askdo source consistency, schema/template alignment, skill boundaries, platform adapters, capability exposure, and language policy alignment. They are not user kit audit reports.

## Local Output Rule

Runtime output directories are local-only and must not be committed by default.

Recommended paths:

```text
runs/
kits/<kit>/runs/
askdo/runs/
askdo/kits/<kit>/runs/
```
