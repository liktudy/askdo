# Glossary

## Ask

The user's request or business need.

An ask may be incomplete. Askdo refines it before build or execution.

## Scenario

A complete user-selectable path from ask to result.

A scenario includes outcome, inputs or assumptions, likely kit path, expected artifacts, feasibility, risk notes, and closure logic.

## Scenario Planning Gate

The decision gate before scenario recommendation.

Askdo uses it to settle the planning basis with the user: objective, scope, audience, artifact type, inputs, constraints, assumptions, risk tolerance, execution depth, success criteria, likely kit path, and closure logic.

Askdo may discuss options or propose defaults inside this gate, but it must not output recommended scenarios until the planning basis is confirmed, revised, resolved, defaulted, deferred for non-blocking items, or stopped by the user.

## Brain

The built-in Askdo capability that understands asks, plans work, builds or reuses kits, checks rules, and routes execution.

## Kit

A user-owned reusable business capability pack.

A kit is not an installed Askdo skill. It is generated or maintained by the user through Askdo.

## Registry

The project config and asset roots used to find user-owned kits, runs, and deliverables.

The registry may point to assets inside or outside the current folder.

## Flow

The multi-agent business workflow inside a kit.

## Crew

A cooperating team inside a kit.

A crew is made of roles and the mates assigned to those roles.

## Role

A stable responsibility seat inside a crew.

A role defines accountability, boundary, default permissions, and acceptance checks. A role is not a worker by itself.

## Role Archetype

A reusable role pattern.

When several scenarios need the same role, Askdo should reuse a role archetype and adapt it with scenario bindings instead of copying separate role definitions for each scenario.

## Mate

A concrete worker assigned to a role.

A role may have one or more mates. Each mate must have one primary responsibility inside its role and the lowest viable permission level.

## Assignment

One run-specific task owned by a mate.

Assignments are created for a run. They should not be confused with stable kit structure.

## Entry

The single execution entry for a kit.

Askdo runs one kit through `ENTRY.md`, after checking kit approval, status, boundary, and permissions.

## Decision Request

A structured approval request with explicit choices.

Askdo creates a choice gate and waits for the user decision before execution. The gate may be shown through host UI, Markdown, JSON, or another adapter surface.

## Run

One execution of a kit flow.

## Result

The useful output returned to the user.

## Level

Meaningful feedback used to improve kit granularity, precision, reuse, lifecycle, or performance.

## Audit

A structured quality review.

External kit audit reviews user-owned kits. Internal Askdo audit reviews Askdo itself and is keyword-triggered maintenance.

## Audit Verdict

The result of a kit quality review.

Supported external kit verdicts are:

```text
pass
pass_with_level_notes
revise_before_run
reject_or_rebuild
```

## Level Note

A non-blocking improvement signal.

Level notes are saved only when they improve future reuse, quality, lifecycle decisions, or performance. They are not process logs.

## Internal Workshop

A keyword-triggered review of Askdo itself.

It focuses on Askdo source-of-truth consistency, rules, flows, schemas, skills, templates, platform adapters, and product language.

## Deliverable Language

The configured language for user-facing run outputs and external deliverables.

Internal source files and machine-readable control fields stay in English.
