# Functions

Scopie is designed to work in any language and in virtually any system that can use authorization.
The exact interface will vary based on what how each language formats functions, variables and
handles errors.

```py title="Is Allowed"
# is_allowed returns whether or not our actor is allowed the action specified in the scopes string.
# Depending on the language, we would also return an error, throw or raise an exception for invalid scopes.
is_allowed(
    # A dictionary or map of variable to values.
    # Variable keys should not start with `@`
    # Example: { "username": "thor" }
    vars dict[string, string],
    # Scopes specifies one or more scopes our actor must match as defined above.
    # Example: "accounts/thor/edit"
    scopes string,
    # Actor specifies one or more rules our requesting actor has.
    # Example: "accounts/@username/*"
    actor []string,
) -> bool and error
```

```py title="Validate Scope"
# ValidateScope checks whether or not the given scope is valid given the requirements outlined in the specification.
# Depending on the language, this could return a boolean and throw an error, return an error or any other language
# standard.
validate_scope(
    # Given scope to validate.
    scope string,
) error
```

