---
description: How to create a github like authorization system using scopie.
---

# GitHub Access Tokens

If you ever needed to create an [access token for GitHub](https://github.com/settings/tokens/new)
this example attempts to match the same level of control using scopie.
For brevity reasons, only the scopes related to repositories are listed.

## Repository Scopes

Our structure for repository scopes is `(allow or deny)/repo/<org>/<repo>/<group>/<action>`.
This allows us to create organization, user or other scopes in a separate top level namespace,
such that wildcards and super wildcards are grouped at the top level.

| Group | Action | Description |
| --- | --- | --- |
| status | read | Read commit status
| deployments | read | Read deployment status
| invites | read | Read invitations
| invites | write | Send invitations to other users
| security_events | read | Read security events
| workflow | update | Update GitHub action workflows
| packages | upload | Upload packages to GitHub package registry
| packages | read | Read packages from GitHub package registry
| packages | delete | Delete packages to GitHub package registry
| hooks | write | Write repository hooks
| hooks | update | Update repository hooks
| hooks | delete | Delete repository hooks
| discussions | read | Read discussions
| discussions | create | Create a new discussion
| discussions | comment | Comment on an existing discussion
| discussions | delete | Delete a discussion
| audits | read | Read the audit log

## Full control options

Under the GitHub UI you can select the group headers to create tokens
with full control over that group.
The equilivent to that in scopie is using wildcards.

For example, full control over the "discussion" actions, would be:
```
allow/repo/<org>/<repo>/discussions/*
```

## Example scopes

Here are a small list of examples scopes.
Not all of these would make sense in practice.

### Super wildcards

These scopes relate to using super wildcards for generalized access.

| Scope | Description |
| --- | --- |
| `allow/**` | Access to everything
| `allow/repo/**` | Access to everything under any organization
| `allow/repo/<org>/**` | Access to everything under the organization
| `allow/repo/<org>/<repo>/**` | Access to everything under the repository
| `allow/repo/<org>/<repo>/<group>/**` | Access to all actions under the group

### Wildcards

These scopes relate to using wildcards for generalized access.

| Scope | Description |
| --- | --- |
| `allow/repo/*/...` | Access to actions under any org
| `allow/repo/<org>/*/...` | Access to actions under any repo
| `allow/repo/<org>/<repo>/*/...` | Access to actions under any group
| `allow/repo/*/*/` | Access to actions under any org and any repo

Note that when scopes have multiple levels of variables you may need to wildcard more then one block.
For example if you want to give access for specifically creating hooks ( `hooks/create` )
on any repository in any organization, you would use `allow/repo/*/*/hooks/create`.

Its possible to give access to any repository in the org as well such as `allow/repo/<org>/*/hooks/create`.

There is also the unlikely scenario of giving access to a specific repository name in any org such as
`allow/repo/*/docker_images/packages/upload` which would give access to upload packages to the "docker_images"
repository in any organization.

### Variables

Actor scopes can include variables that relate to actor attempting to do the action.
In our case we are going to use the `@username` variable which can be used as the organization just like GitHub.

| Scope | Description |
| --- | --- |
| `allow/repo/@username/**` | Allow our user to do anything in our own organization
