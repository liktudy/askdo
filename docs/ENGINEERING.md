# Askdo Engineering

## Product Code And User Assets

Askdo product source lives in:

```text
AGENTS.md
README.md
docs/
brain/
skills/
templates/
platforms/
scripts/
kits/
```

User-owned project assets live under configured asset roots such as:

```text
askdo/config.json
askdo/kits/
askdo/runs/
askdo/deliverables/
```

The product repository currently has legacy tracked files under `askdo/`. Do not delete or move them without an explicit migration decision. New user-owned assets are ignored by `.gitignore`.

## Checks

Run:

```text
npm run check
```

This runs:

- source JSON parsing
- Codex manifest sync check
- OpenCode orchestrator syntax check
- OpenCode quality-mode smoke check
- user asset boundary warning

Strict asset-boundary enforcement is available after migration:

```text
npm run check:assets:strict
```

## Product Version Release

Product source changes should be released with a version bump before push.

Use:

```text
npm run release:patch
npm run release:minor
npm run release:major
```

The release script updates:

- `package.json`
- `platforms/codex/.codex-plugin/plugin.json`
- `templates/project/config.json`
- `platforms/opencode/lib/orchestrator.js`
- `CHANGELOG.md`

Check release metadata:

```text
npm run check:version
```

User kit or run changes under `askdo/` do not require a product version bump.

Product release versioning is separate from kit lifecycle versioning. Product releases update Askdo package and plugin surfaces. Kit version changes belong to user-owned kit evolution and should be driven by meaningful kit source, audit, or reuse changes.

## Manifest Sync

Codex plugin skills are generated from `skills/*/SKILL.md`.

Use:

```text
npm run manifests:generate
npm run manifests:check
```

Do not hand-maintain the Codex manifest when adding or removing Askdo skills.
