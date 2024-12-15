window.addEventListener("load", async function() {
  console.log("scopie playground initializing")

  window.scopie = await import("/static/scopie.browser.min.js");

  window.actionScopesInput = document.getElementById("action-scopes-input");
  window.actionScopesError = document.getElementById("action-scopes-error");
  window.actionValid = true;

  window.actorRulesInput = document.getElementById("actor-rules-input");
  window.actorRulesError = document.getElementById("actor-rules-error");
  window.actorValid = true;

  window.isAllowedDisplay = document.getElementById("is-allowed");

  window.actionScopesInput.addEventListener("keyup", function() {
    const e = scopie.validateScope(window.actionScopesInput.value)
    window.actionValid = e === undefined;
    window.actionScopesError.textContent = window.actionValid ? "Valid" : e.toString()
    window.updateAllowedState();
  });
  window.actorRulesInput.addEventListener("keyup", function() {
    const e = scopie.validateScope(window.actorRulesInput.value.trim().split('\n'))
    window.actorValid = e === undefined;
    window.actorRulesError.textContent = window.actorValid ? "Valid" : e.toString();
    window.updateAllowedState();
  });

  window.updateAllowedState = function() {
    if (!window.actionValid) {
      window.isAllowedDisplay.textContent = "Action scopes are invalid";
    }else if (!window.actorValid) {
      window.isAllowedDisplay.textContent = "Actor rules are invalid";
    } else {
      window.isAllowedDisplay.textContent = scopie.isAllowed(
        window.actionScopesInput.value.trim().split('\n'),
        window.actorRulesInput.value.trim().split('\n'),
      ) ? "Is Allowed" : "Is Not Allowed"
    }
  }
})
