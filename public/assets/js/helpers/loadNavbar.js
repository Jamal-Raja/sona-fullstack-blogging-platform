/**
 * Dynamically loads the shared navbar component into the current page.
 * This prevents duplication across multiple HTML files and keeps the
 * navbar consistent throughout the application.
 */
async function loadNavbar() {
  // Locate the placeholder element where the navbar will be injected
  const navbarPlaceholder = document.getElementById("navbarPlaceholder");

  // Fetch the HTML markup for the navbar component from the shared directory
  const res = await fetch("/components/navbar.html");

  // Convert the fetched response into plain HTML text
  const html = await res.text();

  // Insert the navbar markup into the placeholder, rendering it on the page
  navbarPlaceholder.innerHTML = html;
}

/**
 * Ensure the navbar is loaded only after the DOM is fully available.
 * This prevents issues where the placeholder might not yet exist.
 */
document.addEventListener("DOMContentLoaded", loadNavbar);
