# Askdo For OpenCode

This directory packages Askdo for OpenCode using the same wrapper pattern as
Superpowers:

1. `package.json` points OpenCode at the Askdo plugin entry file.
2. The plugin exposes one Askdo orchestrator tool named `askdo`.
3. The plugin registers the shared Askdo `skills/` directory as supporting context.
4. The plugin injects the Askdo bootstrap context at session start.

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

With the orchestrator enabled, OpenCode should prefer the `askdo` tool over
manual skill chaining. The tool advances Askdo through:

```text
intake
-> scenario planning gate
-> scenario selection gate
-> kit generation or reuse
-> approval gate
-> run
-> result
```

The user-facing interaction remains simple:

```text
use askdo: analyze current hot A-share stocks
confirm_planning_frame
1
approve_and_run
```

The tool persists per-session state under:

```text
askdo/.state/opencode/<session-id>.json
```

## How It Works

The OpenCode plugin lives at:

```text
platforms/opencode/.opencode/plugins/askdo.js
```

It keeps Askdo's source of truth platform-independent by reading the root
`AGENTS.md`, registering the root `skills/` directory at runtime, and exposing a
single product-level `askdo` tool that orchestrates the shared rules.
