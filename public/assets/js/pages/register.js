import { loginUser } from "./login.js";

const URL = "";

export async function registerUser(user = {}) {
  try {
    const res = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    const warningMsgEl = document.querySelector(".register-warning-message");

    function showMessage(message, isError = false) {
      if (!warningMsgEl) return;
      warningMsgEl.style.display = "block";
      warningMsgEl.classList.toggle("error", isError);
      warningMsgEl.innerText = message;

      setTimeout(() => {
        warningMsgEl.innerText = "";
        warningMsgEl.style.display = "none";
      }, 5000);
    }

    if (data.status === "Success") {
      showMessage(data.message, false);
      const registeredSuccesfully = true;
      return registeredSuccesfully;
    } else {
      showMessage(data.message, true);
    }
  } catch (error) {
    console.error(error);
  }
}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValues = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    password: registerForm.password.value,
    passwordConfirmation: registerForm.password_confirmation.value,
  };

  const registered = await registerUser(inputValues);

  if (registered) {
    await loginUser({
      email: inputValues.email,
      password: inputValues.password,
    });
    return;
  }
});
