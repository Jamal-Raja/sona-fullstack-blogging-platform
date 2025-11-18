// Load the navbar after successful login
import { renderNavbar } from "../helpers/loadNavbar.js";
import { showFailedMessage } from "../helpers/showFailureMsg.js";

const URL = "";

export async function loginUser(credentials = {}) {
  // Send login request
  const res = await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const data = await res.json();

  // Stop if login failed
  if (data.status !== "Success") {
    showFailedMessage(data.message);
    return;
  }

  // Store login information
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("loggedIn", true);
  localStorage.setItem("name", data.name);
  localStorage.setItem("user_id", data.user_id);
  localStorage.setItem("loginTime", Date.now());

  renderNavbar();

  sessionStorage.setItem("loggedIn", true);
  // Redirect to account page
  window.location.href = "/pages/account.html";
}

const loginFormEl = document.getElementById("loginForm");

if (loginFormEl) {
  loginFormEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const credentials = {
      email: loginFormEl.email.value,
      password: loginFormEl.password.value,
    };

    loginUser(credentials);
  });
}
