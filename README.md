# [Scopie](https://scopie.dev/)

**Scopie is a small, explicit, scope-based authorization engine.**

It evaluates hierarchical permission patterns against requested actions using a deterministic, spec-defined algorithm.
Scopie is designed to be embedded directly into applications and services, without requiring a policy server, DSL, or external data source.

Scopie follows **clarity and explicit behavior** over flexibility.

## Status

Scopie is currently in **alpha**.

Behavior is versioned and defined by the `scenarios.json` file.
Implementations are expected to conform exactly to the scenarios for their supported version.

## What Scopie Is (and Is Not)

### Scopie *is*:

- A deterministic scope evaluator
- Based on hierarchical paths, wildcards, arrays, and variables
- Explicit allow vs deny semantics
- Langauge agnostic via a shared specification
- Easy to reason about and test
- ??? data owned by you

### Scopie is *not*:

- A policy engine
- A role management system
- An attribute-based authorization framework
- A centralized policy service

If you need expressive policy languages, dynamic external lookups, or centralized policy distribution, Scopie is likely not the right tool.

## Core Concepts

### Permissions and Actions

A **permission** that would allow or deny access:

```
allow:blog/read
deny:admin/**
```

An **action** is a concrete request being evaluated:

```
blog/read
```

Scopie evaluates an action against a set of granted permissions.

### Hierarchy and Wildcards

Permissions are hierarchical and path-based.

- `*` matches exactly one path segment
- `**` matches one or more path segments
- Arrays (`|`) match one of several values

Examples:

```
allow:blog/*/read
allow:admin/**
allow:reports/public|private/read
```

### Variables

Permissions may include variables that are substituted at evaluation time:

```
allow:tenant/@tenant_id/**
```

Variables are **simple substitutions**, not expressions or conditions.

## Evaluation Model

Scopie's evaluation rules are intentionally simple and explicit.

Given a set of permissions and an action:

1. Permissions are evaluated in sequence.
2. If a **matching deny** permission is found, evaluation **immediately stops** and access is denied.
3. If a **matching allow** permission is found, it is recorded and evaluation continues **only for deny permissions**.
4. If evaluation completes with at least one matching allow and no matching deny, access is allowed.
5. If no permissions match, access is denied.

This short-circuit behavior is deterministic and does not affect the final result:

- Deny always overrides allow
- Permission order does not change outcomes

## Specification and Scenarios

Scopie is **spec-first**.

The [scenarios.json](./scenarios.json) defines the **normative behavior** of Scopie across:

- Allow and deny precedence
- Wildcard and super-wildcard semantics
- Variable substitution
- Invalid input handling
- Determinism and order invariance
- A cross-language conformance suite

All Scopie implementations **must conform** to these scenarios.
If you want to understand exactly how Scopie behaves, then this is the place to look.

## Implementations

Scopie is implemented across multiple languages, all conforming to the same specification:

* [Go](https://github.com/miniscruff/scopie-go)
* [Javascript](https://github.com/miniscruff/scopie-js)
* [Python](https://github.com/miniscruff/scopie-py)

## Example

A portion of our application is around building, running and responding to financial reports.
We run half, quarterly, monthly and weekly reports.

**Verbs**

1. Edit: Modify how the report is built
2. Run: Manually run the report
3. Read: Read the reports in our tool
4. Approve: Sign off on the report, approved reports would then be shared
5. Delete: Remove an invalid or broken report

**Format**

For the above reasons we are going to specify our permissions and actions as:
```
reports/<duration>/<verb>
```

We could expand this later to include some sort of organization or business
group but for this example, we will keep it simple.

**Users**

1. Maya is allowed to do everything ( the boss )
```
allow:**
```
2. Adam is allowed to edit and read any report ( makes changes to the queries )
```
allow:reports/*/edit|read
```
3. Tyler can only read reports ( reviews reports but doesn't need to approve them )
```
allow:reports/*/read
```
4. Elisa can do everything but delete ( mostly there to approve, but occasionally edits queries )
```
allow:reports/*/*
deny:reports/*/delete
```
5. Jenna can edit and read but only the weekly reports ( a new hire working up )
```
allow:reports/weekly/edit|read
```
