// Load cached navbar HTML if available
const cachedNavbar = localStorage.getItem("cachedNavbar");

async function loadNavbar() {
  const navbarPlaceholder = document.getElementById("navbarPlaceholder");

  // Use cached navbar if it exists
  if (cachedNavbar) {
    navbarPlaceholder.innerHTML = cachedNavbar;
    renderNavbar();
    return;
  }

  // Fetch and cache navbar for future loads
  const res = await fetch("/components/navbar.html", { cache: "no-store" });
  const html = await res.text();

  localStorage.setItem("cachedNavbar", html);
  navbarPlaceholder.innerHTML = html;

  renderNavbar();
}

export function renderNavbar() {
  const navLinksUlEl = document.querySelector(".links");
  const loggedIn = localStorage.getItem("loggedIn");

  // Logged-in navigation
  if (loggedIn) {
    navLinksUlEl.innerHTML = loggedInLinks.join("");

    const logoutEl = document.getElementById("navLinkLogout");
    logoutEl.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      renderNavbar();
    });

    return;
  }

  // Logged-out navigation
  navLinksUlEl.innerHTML = loggedOutLinks.join("");
}

const loggedOutLinks = [
  `<li id="navLinkBlogs"><a href="/pages/blogs.html">Blogs</a></li>`,
  `<li id="navLinkLogin"><a href="/pages/login.html">Login</a></li>`,
  `<li id="navLinkRegister"><a href="/pages/register.html">Register</a></li>`,
];

const loggedInLinks = [
  `<li id="navLinkBlogs"><a href="/pages/blogs.html">Blogs</a></li>`,
  `<li id="navLinkLogout"><a href="#">Logout</a></li>`,
];

document.addEventListener("DOMContentLoaded", loadNavbar);
