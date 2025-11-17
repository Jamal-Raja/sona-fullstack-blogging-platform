export function showSuccessMessage(message) {
  const alertEl = document.createElement("div");
  alertEl.className = "success-alert";
  alertEl.textContent = message;

  document.body.appendChild(alertEl);

  requestAnimationFrame(() => {
    alertEl.classList.add("show");
  });

  setTimeout(() => {
    alertEl.classList.remove("show");
    setTimeout(() => alertEl.remove(), 300);
  }, 2000);
}
