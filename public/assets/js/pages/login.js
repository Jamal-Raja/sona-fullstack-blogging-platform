// Load the navbar after successful login
import { renderNavbar } from "../helpers/loadNavbar.js";

const URL = "http://localhost:6969";

async function loginUser(credentials = {}) {
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
  const warningEl = document.querySelector(".login-warning-message");

  // Display a temporary message to the user
  function showMessage(message, isError = false) {
    warningEl.style.display = "block";
    warningEl.classList.toggle("error", isError);
    warningEl.innerText = message;

    setTimeout(() => {
      warningEl.innerText = "";
      warningEl.style.display = "none";
    }, 5000);
  }

  // Stop if login failed
  if (data.status !== "Success") {
    showMessage(data.message, true);
    return;
  }

  showMessage(data.message);

  // Store login information
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("loggedIn", true);
  localStorage.setItem("name", data.name);

  renderNavbar();

  // Redirect to account page
  window.location.href = "/pages/account.html";
}

const loginFormEl = document.getElementById("loginForm");

loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const credentials = {
    email: loginFormEl.email.value,
    password: loginFormEl.password.value,
  };

  loginUser(credentials);
});
