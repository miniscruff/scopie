# Example Blog

# Example
Blog project with accounts and posts under accounts.

| Scope | Action |
| --- | --- |
/account/{account_id}/read | read account info
/account/{account_id}/update | update account info
/account/{account_id}/delete | delete account
/blog/post/create | create posts
/blog/post/read | read posts
/blog/post/{post_id}/read | read a specific post
/blog/post/{post_id}/read_draft | read a specific post that is in draft
/blog/post/{post_id}/update | update a specific post
/blog/post/{post_id}/delete | delete a specific post
/blog/post/{post_id}/publish | publish a specific post
/blog/post/{post_id}/unpublish | unpublish a specific post
/account/{account_id}/posts/create | create posts on an account
/account/{account_id}/posts/read | read posts from an account
/account/{account_id}/posts/update | update posts from an account
/account/{account_id}/posts/delete | delete posts from an account

## Example scenarios
1. Allow a user to do everything on their account: id=acc_01
    * `allow/account/acc_01/*`
1. Deny a user from reading a post: post_id=post_01
    * `deny/blog/post/read/post_01`
1. Moderator can delete any post
    * `allow/blog/post/*/delete`
1. Allow a user to update a post on their account
    * `allow/account/acc_01/posts/update`
1. Account or post level checks
    * `allow/account/acc_01/posts/read,allow/blog/post/post_01/read`
    * the checking actor must match one of the above, aka an OR check
    * this leads to an O(n*m) where n = required scopes and m = actor scopes
