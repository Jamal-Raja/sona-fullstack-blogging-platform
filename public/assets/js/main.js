import { initFitText } from "./helpers/fitText.js";
import { initSlideIn } from "./helpers/slideIn.js";
import { renderAllBlogs } from "./pages/blogs.js";

// ========== GLOBAL INITIALIZATIONS ==========
// Initialize FitText and SlideIn animations on page load
window.addEventListener("load", initFitText);
window.addEventListener("load", initSlideIn);

// ========== BLOG FILTER BUTTONS ==========
// Load all blogs or filtered blogs when filter buttons are clicked
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
// Dynamically import JS files based on the current page using the body ID
const page = document.body.id;
if (page) {
  import(`./pages/${page}.js`)
    .then(() => console.log(`Loaded JS for: ${page.toUpperCase()}`))
    .catch(() => console.warn(`No JS found for page: ${page.toUpperCase()}`));
}

/**
 * ================= TO DO =================
 * - register form creates new user ===COMPLETO✅===
 * - update styling for blog cards ===IN_PROGRESSO⏳===
 * - login form works + updates navbar to include users name ===IN_PROGRESSO⏳===
 * - create admin page so user can (create, update, delete own blogs)
 * - pressing on blog expands it to new page with full details
 * - Finish footer styling
 */
