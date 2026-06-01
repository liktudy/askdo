# Permission Levels

Permission declarations are operating contracts for mates, adapters, reviews, and future runtime enforcement.

Use the lowest viable permission level.

## L0 Observer

Read-only analysis, review, and recommendation.

```yaml
permission:
  edit: deny
  bash: deny
  webfetch: deny
```

## L1 Researcher

External information gathering without file edits.

```yaml
permission:
  edit: deny
  bash: deny
  webfetch: allow
```

## L2 Writer

Source file writing without command execution.

```yaml
permission:
  edit: allow
  bash: deny
  webfetch: deny
```

## L3 Executor

File writing and command execution inside approved scope.

```yaml
permission:
  edit: allow
  bash: allow
  webfetch: deny
```

## Assignment Rules

- Permission follows task need, not role seniority.
- Do not grant command execution unless required.
- Do not grant web access unless external information is required.
- Do not combine unrelated permission needs into one mate.
- Permission expansion requires review.
- Unclear permission assignment must be escalated.

