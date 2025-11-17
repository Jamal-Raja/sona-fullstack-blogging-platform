export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("user_id");
  localStorage.removeItem("loginTime");

  window.location.href = "/pages/login.html";
}
