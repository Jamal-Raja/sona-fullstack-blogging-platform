import { initFitText } from "./helpers/fitText.js";
import { initSlideIn } from "./helpers/slideIn.js";

window.addEventListener("load", initFitText);
window.addEventListener("load", initSlideIn);

// ========== PAGE-SPECIFIC LOGIC ==========
const page = document.body.id;

if (page) {
  import(`./pages/${page}.js`)
    .then(() => console.log(`Loaded JS for: ${page}`))
    .catch(() => console.warn(`No JS found for page: ${page}`));
}
