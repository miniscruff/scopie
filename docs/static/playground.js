window.addEventListener("load", async function() {
  console.log("scopie playground initializing")

  window.scopie = await import("/static/scopie.browser.min.v0.4.0.js");

  window.permissionsInput = document.getElementById("permissions-input");
  window.permissionsError = document.getElementById("permissions-error");
  window.permissionsValid = true;

  window.actionsInput = document.getElementById("actions-input");
  window.actionsError = document.getElementById("actions-error");
  window.actionsValid = true;

  window.isAllowedDisplay = document.getElementById("is-allowed");

  window.updateAllowedState = function() {
    if (!window.permissionsValid) {
      window.isAllowedDisplay.textContent = "Permissions are invalid"
    } else if (!window.actionsValid) {
      window.isAllowedDisplay.textContent = "Actions are invalid"
    } else {
      try {
        window.isAllowedDisplay.textContent = window.scopie.isAllowed(
          window.permissionsInput.value.trim().split('\n'),
          window.actionsInput.value.trim().split('\n'),
        ) ? "Is Allowed" : "Is Not Allowed"
      } catch (e) {
        window.isAllowedDisplay.textContent = e.toString();
      }
    }
  }

  window.permissionsInput.addEventListener("keyup", function() {
    const e = window.scopie.validatePermissions(window.permissionsInput.value.trim().split('\n'))
    window.permissionsValid = e === undefined;
    window.permissionsError.textContent = window.permissionsValid ? "Valid" : e.toString()
    window.updateAllowedState();
  });
  window.actionsInput.addEventListener("keyup", function() {
    const e = window.scopie.validatePermissions(window.actionsInput.value.trim().split('\n'))
    window.actionsValid = e === undefined;
    window.actionsError.textContent = window.actionsValid ? "Valid" : e.toString();
    window.updateAllowedState();
  });

  window.updateAllowedState()
})
