import { initFitText } from "./helpers/fitText.js";
import { initSlideIn } from "./helpers/slideIn.js";

// ========== GLOBAL INITIALIZATIONS ==========
// Initialize FitText and SlideIn animations on page load
window.addEventListener("load", initFitText);
window.addEventListener("load", initSlideIn);

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
 * - Show alert when upon publishing blog ===IN_PROGRESSO⏳===
 * - Show alert upone updating blog ===IN_PROGRESSO⏳===
 * - Finish footer styling
 * - add category to blog cards (maybe change bg-color depending on category)
 * - update styling for blog cards 
 * - update styling for account page
 * - update title for all html pages
 * - fix favicon icon for all pages
 * - Implement 1hr logout timeout 
 * - Make responsive Uhhhhhhh!!!

 * - pressing on blog expands it to new page with full details ===COMPLETO✅===
 * - user update blog ===COMPLETO✅===
 * - Fix opening new page upon publishing blog ===COMPLETO✅===
 * - user taken back to my_account page when publishing blog ===COMPLETO✅===
 * - user delete blog ===COMPLETO✅===
 * - user create new blog ===COMPLETO✅===
 * - create admin page ===COMPLETO✅===
 * - register form creates new user ===COMPLETO✅===
 * - render users blogs on my_account page ===COMPLETO✅===
 * - login form works + updates navbar to include users name ===COMPLETO✅===
 */
