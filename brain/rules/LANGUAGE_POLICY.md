# Language Policy

Askdo separates internal source language from user-facing output language.

## Internal Language

These files must stay in English:

- Askdo source-of-truth documents
- `brain/`
- `skills/`
- `templates/`
- `platforms/`
- machine-readable schema keys and enum values

Internal English keeps rules, adapters, and future platform integrations stable.

## User-Owned Kit Language

Generated kit source defaults to English.

Project config may define the preferred language for user-facing kit narrative and external deliverables. Machine-readable fields, schema keys, enum values, filenames, and control states stay English even when user-facing narrative is localized.

## Deliverable Language

External deliverables and user-facing run outputs should use the configured output language.

If no language is configured, Askdo may:

- ask the user
- use the host conversation language
- default to English

The choice should favor the user's ability to consume the result.

## Source Conclusions

Delivery processing may translate or format results, but it must not change source conclusions, facts, assumptions, recommendations, or uncertainty.
