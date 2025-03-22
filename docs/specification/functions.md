---
description: What functions are defined by scopie.
---

# Functions

Scopie is designed to work in any language and in virtually any system that can use authorization.

The exact interface will vary based on what how each language formats functions, variables and
handles errors.
Even the order of parameters may vary based on language due to optional or key value support.

## Is Allowed
Returns whether or not the scopes are allowed with the given rules.
Depending on the language, we would also return an error, throw or raise an exception for invalid
scopes or rules.

```py title="Is Allowed"
is_allowed(
    # Scopes specifies one or more scopes our actor must match.
    # When using more then one scope, they are treated as a series of OR conditions,
    # and an actor will be allowed if they match any of the scopes.
    # Example: ["accounts/thor/edit"]
    scopes []string,
    # Rules specifies one or more rules our requesting scopes has to have
    # to be allowed access.
    # Example: ["allow/accounts/@username/*"]
    rules []string,
    # An optional dictionary or map of variable to values.
    # Variable keys should not start with `@`
    # Example: { "username": "thor" }
    variables dict[string, string],
) -> bool and error
```

## Validate Scopes
Checks whether or not the given scopes or rules are valid given the
requirements outlined in the specification.
Depending on the language, this could return a boolean and throw an error, return
an error or other language standard.

```py title="Validate Scopes"
validate_scopes(
    # Given scope or rule to validate.
    scopeOrRules []string,
) error
```
