# Askdo Quality And Asset Governance

Status: active governance model

Owner: Askdo product and system design

## Purpose

Askdo must manage more than kit generation. It must help kit owners find, audit, improve, and run their kits while giving product maintainers a controlled way to review and evolve the Askdo product system.

This document defines the current quality and asset loop:

```text
Askdo Quality And Asset Governance
= kit registry
+ external kit quality
+ internal Askdo quality
+ product evolution
+ language policy
+ kit lifecycle and evolution
+ capability exposure gate
```

## Systems

### 1. Kit Registry

Askdo records user-owned kit locations through project config instead of assuming every kit lives in the current working directory.

The registry must support:

- local project kits
- external kit roots
- run roots
- deliverable roots
- unreadable or missing roots reported as unknowns
- no deletion or relocation without explicit user approval

### 2. External Kit Quality

External quality reviews user-owned kits.

It includes:

- rule check
- multi-role kit audit
- quality scorecard
- audit verdicts
- non-blocking level notes
- kit owner choice gates before material changes

External audit verdicts are:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

The important distinction is that a kit can be runnable and still carry improvement notes.

### 3. Internal Askdo Quality

Internal quality reviews Askdo itself.

It covers:

- `brain/rules/`
- `brain/flows/`
- `brain/schemas/`
- `brain/roles/`
- `skills/`
- `templates/`
- `platforms/`
- public product language
- source-of-truth consistency

Internal review is not a normal public kit-user capability. It should run only when the product maintainer explicitly asks for an Askdo self review, internal workshop, project audit, or equivalent maintenance task.

Internal workshop reports use their own schema and templates:

```text
brain/schemas/internal-workshop.schema.json
templates/internal-workshop/
```

They must not reuse external kit audit actions such as `approve_and_run` or `record_level_and_run`.

### 4. Product Evolution

Product evolution turns internal review, runtime evidence, external patterns, and maintainer corrections into current-loop improvements.

It is governed by product maintainer authority and uses:

```text
brain/flows/EVOLVE_ASKDO.md
brain/schemas/evolution.schema.json
templates/evolution/
skills/askdo-evolve/
```

Product evolution may apply safe low-risk product-source changes in the current loop. Structural, high-risk, irreversible, or direction-setting product changes require product maintainer decision.

### 5. Language Policy

Askdo separates internal iteration language from user-facing delivery language.

Defaults:

- internal source-of-truth: English
- machine-readable schema keys and enums: English
- generated kit source: English by default
- external deliverables and user-facing run outputs: project-configured language

If output language is not configured, Askdo may ask the user or use the host conversation language when that is safer for the user experience.

### 6. Kit Lifecycle And Evolution

Askdo uses repeated quality signals to recommend:

- maturity changes
- kit version changes
- diff audits
- overlap detection
- merge, split, pause, close, or archive decisions

These decisions still require kit owner authority when they change kit ownership, boundary, status, or structure.

### 7. Capability Exposure Gate

Askdo capabilities are grouped by exposure:

```text
public
internal_keyword_only
maintenance
```

Public skills may be shown to kit users. Internal keyword-only skills should not appear as normal onboarding options. Maintenance capabilities are for controlled product upkeep and require product maintainer intent.

## Active Operating Levels

### Core

- maintain kit registry and asset roots
- list and resolve kits before assuming no kit exists
- respect language config
- use audit verdict `pass_with_level_notes` when a kit can run with useful improvement notes

### Quality Loop

- run external kit quality when building, auditing, or preparing a risky run
- use multi-role kit audit dimensions
- turn non-blocking improvements into current-loop actions
- keep concise quality scorecards

### Internal Maintenance

- run internal workshop only when explicitly requested by the product maintainer
- run product evolution only when explicitly requested by the product maintainer
- keep internal maintenance records separate from user kit audit records
- require keyword-only trigger for internal self review

### Evolution Decisions

- use kit maturity, diff audit, lifecycle versioning, overlap detection, and evolution decision workflows when the current loop produces enough evidence
- ask the kit owner before merge, split, pause, close, archive, or boundary-expanding kit changes

## Product Engineering Update Track

This track records product-code improvements decided after reviewing gstack and Superpowers-style strengths. It complements the quality governance plan without changing the plugin-first user entry.

### P0

- add no-dependency product checks
- add manifest sync checks
- add product release version checks
- add user asset boundary checks

### Product Runtime

- introduce TypeScript as the product-code source for Askdo runtime and adapter logic
- keep generated JavaScript or distributable runtime files available so an installed plugin works immediately after download
- avoid new runtime dependencies unless a specific capability cannot be implemented safely without them
- preserve the current plugin-first experience and do not require users to run local scripts to start Askdo

### Extension Surfaces

- add precise extension surfaces for real Askdo lifecycle points instead of broad generic hooks
- cover registry resolution, scenario planning gates, kit audit, internal workshop, result delivery, and level recording
- keep extension contracts typed and minimal
- keep internal maintenance capabilities keyword-triggered while public capabilities remain discoverable

## Current-Loop Rule

Every optimization discovered during build, run, audit, level, or internal review must end in one current-loop action:

```text
revise now
ask the authorized decision-maker to decide
record a concrete level note with the next trigger
reject as not useful
```

Askdo must not produce an optimization plan that leaves the project unchanged when a safe, approved, in-scope improvement can be made now.

For Askdo product-source evolution, the decision-maker is the product maintainer. For generated kit evolution, the decision-maker is the kit owner or run decision-maker.

## Engineering Automation

Askdo product source changes should be checked and released through product scripts:

```text
npm run check
npm run release:patch
npm run manifests:generate
```

User-owned assets under configured asset roots do not require product version bumps. Product source changes do.

Product release versioning and kit lifecycle versioning are separate systems. Product releases use package and plugin manifest versions. Kit lifecycle versioning belongs to kit evolution and should be based on meaningful kit changes, audits, and reuse signals.
