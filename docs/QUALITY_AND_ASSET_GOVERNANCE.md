# Askdo Quality And Asset Governance

Status: saved optimization blueprint

Owner: Askdo product and system design

## Purpose

Askdo must manage more than kit generation. It must help users find, audit, improve, and run their kits while also giving Askdo a controlled way to review its own product system.

This document records the current optimization direction:

```text
Askdo Quality And Asset Governance
= kit registry
+ external kit quality
+ internal Askdo quality
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
- user choice gates before material changes

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

Internal review is not a normal public user capability. It should run only when the user explicitly asks for an Askdo self review, internal workshop, project audit, or equivalent keyword-triggered maintenance task.

Internal workshop reports use their own schema and templates:

```text
brain/schemas/internal-workshop.schema.json
templates/internal-workshop/
```

They must not reuse external kit audit actions such as `approve_and_run` or `record_level_and_run`.

### 4. Language Policy

Askdo separates internal iteration language from user-facing delivery language.

Defaults:

- internal source-of-truth: English
- machine-readable schema keys and enums: English
- generated kit source: English by default
- external deliverables and user-facing run outputs: project-configured language

If output language is not configured, Askdo may ask the user or use the host conversation language when that is safer for the user experience.

### 5. Kit Lifecycle And Evolution

Askdo should eventually use repeated quality signals to recommend:

- maturity changes
- kit version changes
- diff audits
- overlap detection
- merge, split, pause, close, or archive decisions

This belongs after the V1 quality loop is reliable.

### 6. Capability Exposure Gate

Askdo capabilities are grouped by exposure:

```text
public
internal_keyword_only
maintenance
```

Public skills may be shown to users. Internal keyword-only skills should not appear as normal onboarding options. Maintenance capabilities are for controlled project upkeep and should require explicit intent.

## Priority Plan

### P0

- add kit registry and asset roots
- add list-all-kits capability
- add language config
- add audit verdict `pass_with_level_notes`

### P1

- add external Kit Quality V1
- add multi-role kit audit dimensions
- add level notes for non-blocking improvements
- add quality scorecard

### P2

- add Internal Workshop V1
- add internal backlog records
- require keyword-only trigger for internal self review

### P3

- add kit maturity
- add diff audit
- add versioning
- add overlap detection
- add evolution decision workflows

## V1 Scope

The first implementation should land only the smallest useful governance loop:

```text
Kit Registry
-> Language Policy
-> External Kit Quality V1
-> Internal Workshop boundary
```

Full kit evolution should remain a later capability until Askdo has enough real usage signals.
