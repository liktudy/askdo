# Askdo

Askdo is an AI-native business multi-agent execution product.

Public promise:

```text
Ask. It does.
```

Operating loop:

```text
ask -> build -> flow -> run -> result -> level
```

Askdo lets a user describe a business need. The installed agent plugin then builds or reuses a user-owned `kit`, runs the kit's multi-agent `flow`, produces a result, and records only meaningful feedback for future improvement.

## Shape

```text
Askdo
= installable capability layer
+ user-owned kits
+ multi-agent business flows
+ result and feedback loop
```

Askdo is not a heavy agent runtime, not a web dashboard, and not a traditional BPM tool.

## Core Terms

| Term | Meaning |
| --- | --- |
| `brain` | Built-in Askdo capability for understanding, planning, building, checking, and routing. |
| `kit` | User-owned reusable business capability pack. |
| `flow` | Multi-agent business workflow inside a kit. |
| `crew` | A group of cooperating roles inside a kit. |
| `mate` | A single role agent inside a kit. |
| `run` | One execution of a kit. |
| `result` | Output returned to the user. |
| `level` | Improvement signal from real usage. |

## First Use

```text
Use Askdo: analyze the AI coding tools market and produce a competitor comparison report.
```

The first product surface is a Codex plugin example, not a local CLI. The user installs Askdo into the host agent tool, then starts with one natural-language ask.

The plugin writes user-owned assets into the current project:

```text
askdo/
|-- config.json
|-- kits/
`-- runs/
```

## Asset Ownership

Kits are user-owned business assets. Installing, upgrading, or uninstalling Askdo must not delete generated kits unless the user explicitly requests a destructive purge.
