# Terms
Terms and there definitions as it relates to scopie.

## Block
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

## Scope
One or more blocks, joined by a slash (`/`).

``` title="Scope examples"
alpha/beta/omega
blog/@user/read|write
accounts/**
```

## Permisson
Whether or not we are allowed to do the action.
Either the literal string `allow` or `deny`.

## Rule
Permission and literal string separated by slashes (`/`).
Only literal values are allowed in rules.

``` title="Rule examples"
allow/bucket/images/upload
deny/iam_accounts/edit
```

