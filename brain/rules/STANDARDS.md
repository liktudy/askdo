# Standard Levels

## Levels

| Level | Name | Meaning | Change Authority |
| --- | --- | --- | --- |
| P0 | Iron Rule | Must be followed across Askdo. | User only |
| P1 | Required Standard | Required by default for brain and kits. | User approval required to waive |
| P2 | Recommended Practice | Default practice that can adapt to context. | Owning area may adjust |
| P3 | Local Detail | Tool, adapter, template, or runtime detail. | Owning area may adjust |

## P0 Iron Rules

- The user has final decision authority.
- Boundary ambiguity must be escalated.
- High-risk execution requires approval.
- User-owned kits must not be deleted by default.
- Runtime outputs must not be committed by default.
- Text source files must use UTF-8 encoding.

## P1 Required Standards

- Reuse existing kits before building new kits.
- Generated kits must include `kit.json`, `FLOW.md`, and `MATES.md`.
- Generated mates must have one primary responsibility.
- Generated mates must use the lowest viable permission.
- Agents may propose creative alternatives within their boundaries.
- Kit formal artifacts are limited to Markdown, CSV, and JSON.
- External deliverables are produced through delivery processing.
- Internal source-of-truth files and generated kit source files must be written in English.

## P2 Recommended Practices

- Use a second perspective for high-value uncertainty.
- Keep operation records minimal.
- Prefer archive over physical deletion.
- Keep prompts concise and precise.
- Keep documentation small enough to maintain.

## P3 Local Details

- Adapter file layout.
- Delivery templates.
- External tool details.
- Runtime-specific export formats.

