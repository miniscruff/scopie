# Functions

Scopie is designed to work in any language and in virtually any system that can use authorization.

The exact interface will vary based on what how each language formats functions, variables and
handles errors.
Even the order of parameters may vary based on language due to optionals.

## Is Allowed
Returns whether or not our actor is allowed the action required.
Depending on the language, we would also return an error, throw or raise an exception for invalid scopes.

```py title="Is Allowed"
is_allowed(
    # Scopes specifies one or more scopes our actor must match.
    # When using more then one scope, they are treated as a series of OR conditions,
    # and an actor will be allowed if they match any of the scopes.
    # Example: ["accounts/thor/edit"]
    actionScopes []string,
    # Actor specifies one or more rules our requesting actor has.
    # Example: ["allow/accounts/@username/*"]
    actorRules []string,
    # An optional dictionary or map of variable to values.
    # Variable keys should not start with `@`
    # Example: { "username": "thor" }
    variables dict[string, string],
) -> bool and error
```

## Validate Scope
Checks whether or not the given scope or rule is valid given the
requirements outlined in the specification.
Depending on the language, this could return a boolean and throw an error, return
an error or other language standard.

```py title="Validate Scope"
validate_scope(
    # Given scope or rule to validate.
    scopeOrRule string,
) error
```

## Minimize
Minimize will attempt to reduce the number of scopes or rules by following a few checks.
During this process each scope or rule is also validated using the validate_scope
specification exiting early if any invalid scopes are found. This allows you to
call minimize in place of validation if you're end goal is the scopes or rules
and not just checking input is valid.

### Checks

1. Merge identical scopes
    1. `["blog/read", "blog/read"]` to `["blog/read"]`
1. Merge into arrays
    1. `["blog/read", "blog/create"]` to `["blog/read|create"]`
1. Reduce by wildcards and super wildcards
    1. `["blog/read", "blog/*"]` to `["blog/*"]`
    1. `["blog/tech/read", "blog/tech/write", "blog/**"]` to `["blog/**"]`
1. Remove allow rules that match a deny rule
    1. `["allow/blog/read", "deny/blog/*"]` to `["deny/blog/*"]`

There are some conditions we do not merge.

1. Guessing wildcards:
    1. Given you have read and write as the only two valid options: `["a/read", "a/write"]`
    1. We will not merge this to `["a/*"]` as we would not know these are the only two options.
    1. Additionally, using `*` implies everything no and in the future.
    1. Where as `read|write` implies just these two and if we add more, do not add them.

```py title="Minimize"
minimize(
    # Given scopes or rules to minimize.
    # It is expected that it is all scopes or all rules, otherwise it will fail.
    scopeOrRules: []string,
) []string and error
```
