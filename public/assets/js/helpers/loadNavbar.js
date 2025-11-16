// Load cached navbar HTML if available
const cachedNavbar = localStorage.getItem("cachedNavbar");

async function loadNavbar() {
  const navbarPlaceholder = document.getElementById("navbarPlaceholder");

  // If cached navbar exists, use it immediately
  if (cachedNavbar) {
    navbarPlaceholder.innerHTML = cachedNavbar;
    renderNavbar();
    return;
  }

  // Otherwise fetch fresh navbar HTML
  const res = await fetch("/components/navbar.html", { cache: "no-store" });
  const html = await res.text();

  // Cache it for next time
  localStorage.setItem("cachedNavbar", html);
  navbarPlaceholder.innerHTML = html;

  renderNavbar();
}

export function renderNavbar() {
  const navLinksUlEl = document.querySelector(".links");
  const loggedIn = localStorage.getItem("loggedIn");

  // Logged-in menu
  if (loggedIn) {
    const name = localStorage.getItem("name");

    navLinksUlEl.innerHTML = `
      <li id="navLinkMsg">Hi ${name}</li>
      <li id="navLinkBlogs"><a href="/pages/blogs.html">Blogs</a></li>
      <li id="navLinkMsg"><a href="/pages/account.html">My Account</a></li>
      <li id="navLinkLogout"><a href="/index.html">Logout</a></li>
    `;

    // Handle logout
    const logoutEl = document.getElementById("navLinkLogout");
    logoutEl.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      renderNavbar();
    });

    return;
  }

  // Logged-out menu
  navLinksUlEl.innerHTML = loggedOutLinks.join("");
}

// Links for users who are not logged in
const loggedOutLinks = [
  `<li id="navLinkBlogs"><a href="/pages/blogs.html">Blogs</a></li>`,
  `<li id="navLinkLogin"><a href="/pages/login.html">Login</a></li>`,
  `<li id="navLinkRegister"><a href="/pages/register.html">Register</a></li>`,
];

// Load navbar when the page is ready
document.addEventListener("DOMContentLoaded", loadNavbar);
