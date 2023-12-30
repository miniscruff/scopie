# Scopie Specification

## Terms
A few terms and there definitions as it relates to scopie.

### Block
Values between slashes that indicate levels of our scope.
Can contain one of the following:

1. A literal string.
1. An array of literal strings separated by pipe (`|`) characters that are treated as an OR list.
1. A literal string prefixed by an at (`@`) that is translated to a value from our variable map.
1. A single asterisk (`*`) that will auto match any value, known as a wildcard.
1. Two asterisks (`**`) that matches the rest of the rule.

``` title="Block examples"
value
one|two|three
@user_name
*
**
```

### Scope
One or more blocks, joined by a slash (`/`).

``` title="Scope examples"
alpha/beta/omega
blog/@user/read|write
accounts/**
```

### Permision
Whether or not we are allowed to do the action.
Either the literal string `allow` or `deny`.

### Rule
Scope and permission combined together

``` title="Rule examples"
allow/bucket/images/upload
deny/iam_accounts/edit
```

## Interface
Scopie is designed to work in any language and in virtually any system that requires authorization.
There are going to be a few variations when it comes to different langauges and use cases but below is
our general use cases.

```
# IsAllowed returns whether or not our actor is allowed the action specified in the rules string.
# Depending on the language, we would also return an error, throw or raise an exception for invalid scopes.
IsAllowed(
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
) -> bool & error

# ValidateScope checks whether or not the given scope is valid given the requirements outlined in the specification.
# Depending on the language, we would return a native like error value.
ValidateScope(
    # Given scope to validate.
    scope string,
) error
```

## Allow rules
Coming Soon...

## BNF Notation
```bnf
<scopes> ::= <scope> (<scope_sep> <scope>)+ | <scope>
<rules> ::= <rule> (<scope_sep> <rule>)+ | <rule>

<rule> ::= <any_permission> (<block_sep> <scope>)+
<scope> ::= <block> (<block_sep> <block>)+ | <block>

<block> ::= <literals> | <array_block> | <var_block> | <wildcard> | <super_wildcard>
<array_block> ::= <literals> (<array_sep> <literals>)+
<var_block> ::= <var_prefix> <literals>

<any_permission> ::= <allow_permission> | <deny_permission>

<block_sep> ::= "/"
<scope_sep> ::= ","
<array_sep> ::= "|"
<var_prefix> ::= "@"
<wildcard> ::= "*"
<super_wildcard> ::= "**"
<allow_permission> ::= "allow"
<deny_permission> ::= "deny"
<literals> ::= ([A-Z] | [a-z] | "_" | "-")+
```
