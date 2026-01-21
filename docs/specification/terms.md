# Terms
Terms and there definitions as it relates to scopie.

## Block
Values between slashes that indicate levels of our permission.
Can contain one of the following:

1. A literal string.
1. An array of literal strings separated by pipe (`|`) characters that are treated as an OR list.
1. A literal string prefixed by an at (`@`) that is translated to a value from our variable map.
1. A single asterisk (`*`) that will auto match any value, known as a wildcard.
1. Two asterisks (`**`) that matches the rest of the action.

``` title="Block examples"
value
one|two|three
@user_name
*
**
```

## Permission
One or more blocks, joined by a slash (`/`).

``` title="Permission examples"
alpha/beta/omega
blog/@user/read|write
accounts/**
```

## Grant
Whether or not we are allowed to do the action.
Either the literal string `allow` or `deny`.

## Action
Permission and literal blocks separated by slashes (`/`).
Colons are used to separate the grant from the blocks.

``` title="Action examples"
allow:bucket/images/upload
deny:iam_accounts/edit
```

## Keywords
They may not be explicity checked but it is important not to use any scopie keywords when
defining permissions and actions as they may have unintended side effects.

- allow
- deny

