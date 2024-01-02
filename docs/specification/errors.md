# Errors

When validating a scope or trying to process a scope or rule that has an incorrect format we return or throw errors.
To keep consistency across languages we define an error type in the specification and include error values as
part of the validation test suite.

Parsing the errors should not be required, this format is aimed at being helpful to log for internal debugging,
but are probably not useful for your end users.

**Format:**
```
scopie <code>
    in <scopes or actor>@<character index of error>:
    <short message>
```
Note: newlines added for clarity

For a scope of `blog/:15/read`, since `:` is not allowed in scopes.
```
scopie 100 in scopes@5: invalid character ':'
```

Errors here are not in any particular order, but just as they are discovered or valiations written.
The short message given in the error is also repeated here as the fist line.

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
