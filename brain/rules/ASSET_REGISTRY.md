# Asset Registry Rules

Askdo must not assume that user-owned kits, runs, or deliverables live only in the current working directory.

## Project Config

The project config is the registry entry point:

```text
askdo/config.json
```

It may declare:

- `asset_roots.kits`
- `asset_roots.runs`
- `asset_roots.deliverables`
- legacy `kits_dir`
- legacy `runs_dir`

Legacy paths remain valid for compatibility. When both legacy paths and `asset_roots` exist, Askdo should read both and de-duplicate resolved roots.

## Listing Kits

When listing kits, Askdo should:

1. Read `askdo/config.json` when it exists.
2. Resolve configured kit roots relative to the project when they are relative paths.
3. Include `./askdo/kits` as a fallback local root.
4. Inspect only directories that contain `kit.json`.
5. Read each kit's formal source files when needed.
6. Report missing, unreadable, or duplicate roots as explicit unknowns or warnings.

## External Roots

External roots are user-owned assets.

Askdo may read configured external kit roots when permitted by the host environment. It must not write outside the current workspace unless the user explicitly approves the operation and the host grants permission.

## Records

The registry records location and status. It must not become a process log.

Useful registry fields include:

- kit id
- kit name
- status
- approval status
- source root
- run root
- deliverable root
- last run date
- last audit verdict
- maturity

## Destructive Operations

Deleting, moving, merging, or closing user-owned kits requires explicit user approval.
