---
hide:
  - navigation
  - toc
title: Scopie language implementations
---

# Playground

Try out scopes and rules in scopie to determine if the actor would be allowed to run that action.

## Action Scopes

<textarea class="md-typeset" multiline id="action-scopes" name="action-scopes" rows="5" cols="42" wrap="off">
blog/create
</textarea>
<div id="action-scopes-error">Valid</div>

## Actor Rules

<textarea class="md-typeset"id="actor-rules" name="actor-rules" rows="5" cols="42" wrap="off">
allow/blog/create|update
allow/accounts/read
</textarea>
<div id="actor-rules-error">Valid</div>

## Result
<div id="is-allowed">Is Allowed</div>

<script defer async src="/static/playground.js"></script>
