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

  window.updateAllowedState = function() {
    try {
      window.isAllowedDisplay.textContent = scopie.isAllowed(
        window.actionScopesInput.value.trim().split('\n'),
        window.actorRulesInput.value.trim().split('\n'),
      ) ? "Is Allowed" : "Is Not Allowed"
    } catch (e) {
      window.isAllowedDisplay.textContent = e.toString();
    }
  }

  /*
  window.actionScopesInput.addEventListener("keyup", function() {
    console.log(window.actionScopesInput.value.trim().split('\n'))
    const e = scopie.validateScope(window.actionScopesInput.value.trim().split('\n'))
    console.log('e', e)
    window.actionValid = e === undefined;
    window.actionScopesError.textContent = window.actionValid ? "Valid" : e.toString()
    window.updateAllowedState();
  });
  window.actorRulesInput.addEventListener("keyup", function() {
    console.log(window.actorRulesInput.value.trim().split('\n'))
    console.log('e', e)
    const e = scopie.validateScope(window.actorRulesInput.value.trim().split('\n'))
    window.actorValid = e === undefined;
    window.actorRulesError.textContent = window.actorValid ? "Valid" : e.toString();
    window.updateAllowedState();
  });
  */

  window.actionScopesInput.addEventListener("keyup", window.updateAllowedState)
  window.actorRulesInput.addEventListener("keyup", window.updateAllowedState)
})
