# Platforms

Platform directories package the same Askdo core behavior for specific host agent tools.

Core source should stay platform-independent:

```text
brain/
skills/
templates/
docs/
```

Platform wrappers live here:

```text
platforms/codex/
platforms/claude-code/
platforms/cursor/
platforms/opencode/
```

Codex is the first platform example.

