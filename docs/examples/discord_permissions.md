# Discord Permissions

Discord users role based authorization for server administration.
Below is an example of how you might go about supporting the same level
of control but using scopie and scope based permissions.

Not all discord permissions are listed below.

## Server Scopes

Our structure for discord scopes is `(allow or deny)/server/<server_id>/<group>/<action>`.
This is to allow us to define scopes across different servers while allowing us to
also create different namespaces for scopes separate from servers later.
It is also possible to separate server scopes completely from other servers, rather
then trying to compare the server id within the scope.

| Group | Action | Description |
| --- | --- | --- |
| channels | create | Create new channels
| channels | update | Update channel values
| channels | view | View channels
| expressions | create | Add custom emojis, stickers, and sounds
| expressions | update | Update existing custom expressions
| expressions | remove | Remove custom expressions
| webhooks | create | Create new webhooks
| webhooks | update | Update existing webhooks
| webhooks | remove | Remove webhooks
| members | kick | Kick other members
| members | ban | Ban other members
| members | invite | Invite new members
| messages | send | Able to send messages
| messages | threads | Able to send messages to threads
| messages | links | Able to send links in messages
| messages | files | Able to send files in messages
| messages | reactions | Able to react to messages

## Example scopes

Here are a small list of examples scopes.
Note that not all of these are practical and would be used in a real scenario.

### Super wildcards

| Scope | Description |
| --- | --- |
| `allow/**` | Access to everything
| `allow/server/**` | Access to everything on any server
| `allow/server/<server_id>/**` | Access to everything on one server
| `allow/server/<server_id>/<group>/**` | Access all actions related to a group

Note that the last example woudl work the same with a normal wildcard.

### Wildcards

| Scope | Description |
| --- | --- |
| `allow/server/*/...` | Access to actions on any server
| `allow/server/<server_id>/*/...` | Access to actions on one server
