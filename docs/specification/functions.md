---
description: What functions are defined by scopie.
---

# Functions

Scopie is designed to work in any language and in virtually any system that can use authorization.

The exact interface will vary based on what how each language formats functions, variables and
handles errors.
Even the order of parameters may vary based on language due to optional or key value support.

## Is Allowed
Returns whether or not the user with the given permissions are allowed to complete the action.
Depending on the language, we would also return an error, throw or raise an exception for invalid
permissions or actions.

```py title="Is Allowed"
is_allowed(
    # Actions specifies what our user is attempting to do.
    # Example: ["accounts/thor/edit"]
    actions []string,
    # Permissions specifies what our user has access to do.
    # When using more then one permission, they are treated as a series of OR conditions,
    # and a user will be allowed if they match any of the actions.
    # Example: ["allow:accounts/thor/**"]
    permissions []string,
    # An optional dictionary or map of variable to values.
    # Variable keys should not start with `@`
    # Example: { "username": "thor" }
    variables dict[string, string],
) -> bool and error or raise/exception expected
```

## Validate Permissions
Checks the given permissions are valid given the requirements outlined in the specification.
Depending on the language, this could return a boolean and throw an error, return
an error or other language standard.

```py title="Validate Permissions"
validate_permissions(
    # Given permissions to validate.
    permissions []string,
) error
```

## Validate Actions
Checks the actions are valid given the requirements outlined in the specification.
Depending on the language, this could return a boolean and throw an error, return
an error or other language standard.

```py title="Validate Actions"
validate_actions(
    # Given actions to validate.
    actions []string,
) error
```
