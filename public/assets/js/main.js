import { initFitText } from "./helpers/fitText.js";
import { initSlideIn } from "./helpers/slideIn.js";
import { logoutUser } from "./helpers/logout.js";

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

// ========== SESSION EXPIRY CHECK ==========
// Auto-logout user after 1 hour of inactivity
function checkSessionExpiry() {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return; // user not logged in

  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();

  if (now - loginTime > ONE_HOUR) {
    logoutUser();
  }
}

checkSessionExpiry();

/**
 * ================= TO DO =================
 * - fix favicon icon for all pages ===IN_PROGRESSO⏳=== 

 * - Make responsive Uhhhhhhh!!! ===COMPLETO✅=== 
 * - registration should log u in and open my_account page ===COMPLETO✅=== 
* - add category to blog cards (maybe change bg-color depending on category) ===COMPLETO✅=== 
* - update styling for blog cards ===COMPLETO✅===
* - update styling for account page ===COMPLETO✅===
* - Show alert upon updating blog ===COMPLETO✅===
* - Show alert upon deleting blog ===COMPLETO✅===
* - Show alert upon publishing blog ===COMPLETO✅===
* - Implement 1hr logout timeout ===COMPLETO✅===
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
