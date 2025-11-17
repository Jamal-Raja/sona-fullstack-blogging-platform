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
 * - user update blog ===IN_PROGRESSO⏳===
 * - Show alert when user creates new blog ===IN_PROGRESSO⏳===
 * - Finish footer styling
 * - pressing on blog expands it to new page with full details
 * - update styling for blog cards 

 * - Fix opening new page upon publishing blog ===COMPLETO✅===
 * - user taken back to my_account page when publishing blog ===COMPLETO✅===
 * - user delete blog ===COMPLETO✅===
 * - user create new blog ===COMPLETO✅===
 * - create admin page ===COMPLETO✅===
 * - register form creates new user ===COMPLETO✅===
 * - render users blogs on my_account page ===COMPLETO✅===
 * - login form works + updates navbar to include users name ===COMPLETO✅===
 */
