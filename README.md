# [Scopie](https://scopie.dev/)

Authorization engine for configuring per user per feature access control.
Access is configured via plain text and handled directly via code.
Configuration storage is controlled by you, scopie just handles the logic.

## Implementations

* [Go](https://github.com/miniscruff/scopie-go)
* [Javascript](https://github.com/miniscruff/scopie-js)
* [Python](https://github.com/miniscruff/scopie-py)

A language agnostic set of scenarios can be found in the [scenarios.json](./scenarios.json) file.

## Example

A portion of our application is around building, running and responding to financial reports.
We run half, quarterly, monthly and weekly reports.

**Actions**

1. Edit: Modify how the report is built
2. Run: Manually run the report
3. Read: Read the reports in our tool
4. Approve: Sign off on the report, approved reports would then be shared
5. Delete: Remove an invalid or broken report

**Format**

For the above reasons we are going to specify our permissions and actions as:
```
reports/<duration>/<action>
```

We could expand this later to include some sort of organization or business
group but for this example, we will keep it simple.

**Users**

1. Maya is allowed to do everything ( the boss )
```
allow/**
```
2. Adam is allowed to edit and read any report ( makes changes to the queries )
```
allow/reports/*/edit|read
```
3. Tyler can only read reports ( reviews reports but doesn't need to approve them )
```
allow/reports/*/read
```
4. Elisa can do everything but delete ( mostly there to approve, but occasionally edits queries )
```
allow/reports/*/*
deny/reports/*/delete
```
5. Jenna can edit and read but only the weekly reports ( a new hire working up )
```
allow/reports/weekly/edit|read
```
