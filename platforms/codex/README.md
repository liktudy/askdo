# Askdo For Codex

This directory documents the first platform package for Askdo.

User experience:

```text
Install Askdo in Codex.
Tell Codex one ask:
Use Askdo: analyze the AI coding tools market and produce a competitor comparison report.
```

Codex should then:

1. load Askdo plugin instructions
2. use Askdo skills
3. create project assets under `askdo/`
4. build or reuse a kit
5. run the kit flow
6. return the result

The Codex wrapper must not redefine Askdo rules. Source of truth stays in `brain/`, `skills/`, and `templates/`.

