import { initFitText } from "./helpers/fitText.js";
import { initSlideIn } from "./helpers/slideIn.js";
import { renderAllBlogs } from "./pages/blogs.js";

window.addEventListener("load", initFitText);
window.addEventListener("load", initSlideIn);

document.querySelector(".blogs-header") &&
  document.querySelector(".blogs-header").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const filter = btn.dataset.filter;
    if (!filter) {
      renderAllBlogs();
    }

    renderAllBlogs(filter);
  });

// ========== PAGE-SPECIFIC LOGIC ==========
const page = document.body.id;

if (page) {
  import(`./pages/${page}.js`)
    .then(() => console.log(`Loaded JS for: ${page.toUpperCase()}`))
    .catch(() => console.warn(`No JS found for page: ${page}`));
}

/**
 * ================= TO DO =================
 * - register form creates new user ===IN_PROGRESSO⏳===
 * - update styling for blog cards
 * - login form works + updates navbar to include users name
 * - create admin page so user can (create, update, delete own blogs)
 * - pressing on blog expands it to new page with full details
 * - Finish footer styling
 */
