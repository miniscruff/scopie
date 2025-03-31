window.addEventListener("load", async function() {
  console.log("scopie playground initializing")

  window.scopie = await import("/static/scopie.browser.min.v0.4.0.js");

  window.scopesInput = document.getElementById("scopes-input");
  window.scopesError = document.getElementById("scopes-error");
  window.scopesValid = true;

  window.rulesInput = document.getElementById("rules-input");
  window.rulesError = document.getElementById("rules-error");
  window.rulesValid = true;

  window.isAllowedDisplay = document.getElementById("is-allowed");

  window.updateAllowedState = function() {
    if (!window.scopesValid) {
      window.isAllowedDisplay.textContent = "Scopes are invalid"
    } else if (!window.rulesValid) {
      window.isAllowedDisplay.textContent = "Rules are invalid"
    } else {
      try {
        window.isAllowedDisplay.textContent = window.scopie.isAllowed(
          window.scopesInput.value.trim().split('\n'),
          window.rulesInput.value.trim().split('\n'),
        ) ? "Is Allowed" : "Is Not Allowed"
      } catch (e) {
        window.isAllowedDisplay.textContent = e.toString();
      }
    }
  }

  window.scopesInput.addEventListener("keyup", function() {
    const e = window.scopie.validateScopes(window.scopesInput.value.trim().split('\n'))
    window.scopesValid = e === undefined;
    window.scopesError.textContent = window.scopesValid ? "Valid" : e.toString()
    window.updateAllowedState();
  });
  window.rulesInput.addEventListener("keyup", function() {
    const e = window.scopie.validateScopes(window.rulesInput.value.trim().split('\n'))
    window.rulesValid = e === undefined;
    window.rulesError.textContent = window.rulesValid ? "Valid" : e.toString();
    window.updateAllowedState();
  });

  window.updateAllowedState()
})
