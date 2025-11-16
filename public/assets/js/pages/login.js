import { renderNavbar } from "../helpers/loadNavbar.js";

const URL = "http://localhost:6969";

async function loginUser(credentials = {}) {
  const res = await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const data = await res.json();

  const warningEl = document.querySelector(".login-warning-message");

  function showMessage(message, isError = false) {
    warningEl.style.display = "block";
    warningEl.classList.toggle("error", isError);
    warningEl.innerText = message;

    setTimeout(() => {
      warningEl.innerText = "";
      warningEl.style.display = "none";
    }, 5000);
  }
  // If login fails, show error message
  if (data.status !== "Success") {
    showMessage(data.message, true);
    return;
  }
  /** DO THIS ON LOGIN SUCCESS:
   *  - add bearertoken to localstorage --COMPLETO✅--
   *  - hide login and register options in navbar --COMPLETO✅--
   * - update navbar to show users name
   * - show logout option --COMPLETO✅--
   * - take user to new page (users admin page)
   */
  showMessage(data.message, false);

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("loggedIn", true);
  renderNavbar();
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
