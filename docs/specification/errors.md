---
description: Explanation and list of all scopie error codes.
---

# Errors

When validating a scope or trying to process a scope or rule that has an incorrect format we return or throw errors.
To keep consistency across languages we define an error format in the specification and include error messages as
part of the validation test suite.

Parsing the errors should not be required, this format is aimed at being helpful to log for internal debugging,
but are probably not useful for your end users.

In cases where you are taking user input and saving a scope, you should use `validate_scope` function to check
if the provided value is properly formatted.
You may also need to do extra processing to make sure the values defined in the scope logically make sense
in your system as a whole.

**Formats:**
When getting an error when trying to process the error mentions whether the invalid data came from
the actor rules or action scopes.
```
scopie-<code>
    in <actor or action>: <short message>
```

When using the validation function we omit the scope or actor as they are not given.
```
scopie-<code> <short message>
```

Note: newlines added for clarity

For scopes of `["blog/:15/read"]`, since `:` is not allowed in scopes.
```
scopie-100 in actor: invalid character ':'
```

Errors here are not in any particular order, but just as they are discovered or valiations written.
Message formats are provided that will match the output which implementations will use for error values.
In a lot of cases this will just reiterate the summary of the error but in some it will
include variables from the respective scope or actor.

## 100
Invalid character.

Scopie only allows letters, numbers, underscore `_`  and dashes `-` in scope blocks, any other character is invalid.

```title="Valid"
blog/15/create
```

```title="Invalid"
blog/:15/create
     ^ invalid character ':'
```

```title="Message format"
invalid character '{character}'
```

## 101
Variable inside array group.

Array blocks can not contain variables and must be the entire block on its own.
This is so that variables are used more like namespaces or grouping specifiers and would conflict with
array blocks that are one of a few actions or specific namespaces.

```title="Valid"
projects/@project/repository/create
```

```title="Invalid"
projects/acme|sesame|@project/repository/create
                     ^ variable not allowed inside array group
```

```title="Message format"
variable '{key}' found in array block
```

## 102
Wildcard in array.

Array blocks can not contain wildcards and must be the entire block on its own.
Having a wildcard would override any array or literal value.

```title="Valid"
projects/acme/*
```

```title="Invalid"
projects/acme/read|write|*
```

```title="Message format"
wildcard found in array block
```

## 103
Super wildcard in array

Array blocks can not contain super wildcards and must be the entire block on its own.
Having a super wildcard would override any array or literal value.

```title="Valid"
projects/acme/**
```

```title="Invalid"
projects/acme/read|write|**
```

```title="Message format"
super wildcard found in array block
```

## 104
Variable key not found in dictionary.

A variable was referenced that does not exist in the variable map or dictionary.

```title="Valid"
vars = { "project": "acme" }
projects/@project/repository/create
```

```title="Invalid"
vars = { "user": "tnt" }
projects/@project/repository/create
         ^ variable project does not exist
```

```title="Message format"
variable '{key}' not found
```

## 105
Super wildcard not in the last block

A super wildcard will auto match all future blocks, because of this any further
blocks would be ignored.

```title="Valid"
projects/repository/**
```

```title="Invalid"
projects/repository/**/create
```

```title="Message format"
super wildcard not in the last block
```

## 106

Empty scope

Having an empty scope for either the actor or required scopes doesn't actually make any sense
for authorization and is likely caused by something else.
We return an error here instead to hopefully catch this instead of silently denying.

```title="Valid"
accounts/create
```

```title="Invalid"
# empty
```

```title="Message format"
scope was empty
```
