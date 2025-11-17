export function showFailedMessage(message) {
  const alertEl = document.createElement("div");
  alertEl.className = "fail-alert";
  alertEl.textContent = message;

  document.body.appendChild(alertEl);

  requestAnimationFrame(() => {
    alertEl.classList.add("show");
  });

  setTimeout(() => {
    alertEl.classList.remove("show");
    setTimeout(() => alertEl.remove(), 300);
  }, 5000);
}
