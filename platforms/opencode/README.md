# Askdo For OpenCode

This directory packages Askdo for OpenCode using the same wrapper pattern as
Superpowers:

1. `package.json` points OpenCode at the Askdo plugin entry file.
2. The plugin registers the shared Askdo `skills/` directory.
3. The plugin injects the Askdo bootstrap context at session start.

Do not change `brain/`, `skills/`, or `templates/` for OpenCode-specific behavior. Add only platform wrapping here.

## Install

Add Askdo to the `plugin` array in your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["askdo@git+https://github.com/liktudy/askdo.git"]
}
```

For a local checkout, point OpenCode at this repository path instead:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/path/to/askdo"]
}
```

Restart OpenCode after changing the config.

## Verify

Ask OpenCode:

```text
Use Askdo: build a competitor analysis kit for AI coding tools.
```

OpenCode should load the Askdo skills, start with `askdo-intake`, then build or
reuse a kit and prepare the run/result according to the shared Askdo rules.

## How It Works

The OpenCode plugin lives at:

```text
platforms/opencode/.opencode/plugins/askdo.js
```

It keeps Askdo's source of truth platform-independent by reading the root
`AGENTS.md` and registering the root `skills/` directory at runtime.
