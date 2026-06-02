# Boundary Rules

## Product Boundary

Askdo builds, runs, and improves user-owned business kits.

Askdo does not own the user's long-term business assets.

## Brain Boundary

The brain may:

- define rules
- check existing kits
- build or update kit source files
- route execution
- validate structures
- process delivery formatting
- record meaningful level signals

The brain must not:

- delete user-owned kits by default
- silently execute high-risk work
- bypass approval
- treat adapters as source of truth

## Kit Boundary

Kits execute approved business flows.

Kits may:

- run their own flows
- produce internal artifacts
- request review, delivery, or escalation
- update meaningful performance and lifecycle signals

Kits must not:

- create, merge, close, or restructure other kits by themselves
- bypass approval
- change brain rules
- publish external deliverables without delivery processing

## Crew Boundary

A crew is a cooperating team inside a kit.

A crew contains roles. Each role contains one or more mates.

Crews must not hide unclear ownership. If responsibility is unclear between roles, escalate or revise the kit.

## Role Boundary

A role is a stable responsibility seat.

Each role must define:

- accountability
- boundary
- default permission level
- acceptance checks
- one or more assigned mates

A role must not be treated as a worker. Execution happens through mates and run-specific assignments.

Shared role responsibilities must be modeled as role archetypes with scenario bindings when the same role appears in multiple scenarios.

## Mate Boundary

A mate is a concrete worker assigned to one role.

Each mate must have one primary responsibility within its role.

A mate may recommend work outside its boundary, but must not execute outside its boundary.

Creative recommendations must separate observations, assumptions, options, and recommended action.

## Assignment Boundary

An assignment is one run-specific task owned by a mate.

Assignments must fit the mate responsibility and permission level. If an assignment requires unrelated responsibility or expanded permission, escalate before execution.

## Entry Boundary

`ENTRY.md` is the single execution doorway for a kit.

It must check approval, status, boundary fit, and required permissions before the flow executes.
