---
hide:
  - navigation
  - toc
title: Scopie playground
---

# Playground

Try out permissions and actions in scopie to determine if the user would be allowed to run that action.

## permissions

<textarea class="md-typeset" id="permissions-input" rows="5" cols="42" wrap="off">
blog/create
</textarea>
<div id="permissions-error">Valid</div>

## Actions

<textarea class="md-typeset" id="actions-input" rows="5" cols="42" wrap="off">
allow/blog/create|update
allow/accounts/read
</textarea>
<div id="actions-error">Valid</div>

## Result
<div id="is-allowed">Is Allowed</div>

<script defer async src="/static/playground.js"></script>
