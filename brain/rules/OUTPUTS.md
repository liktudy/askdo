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

## Local Output Rule

Runtime output directories are local-only and must not be committed by default.

Recommended paths:

```text
runs/
kits/<kit>/runs/
```

