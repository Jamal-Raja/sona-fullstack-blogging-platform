// Function to fit text within its container by adjusting font size
function fitTextToContainer(containerSelector, textSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const texts = container.querySelectorAll(textSelector);
    if (!texts.length) return;

    texts.forEach((t) => (t.style.fontSize = "10px"));

    const containerWidth = container.clientWidth;
    let fontSize = 10;

    while (
      [...texts].every((t) => t.scrollWidth <= containerWidth) &&
      fontSize < 500
    ) {
      fontSize++;
      texts.forEach((t) => (t.style.fontSize = fontSize + "px"));
    }

    texts.forEach((t) => (t.style.fontSize = fontSize - 1 + "px"));
  });
}

window.addEventListener("load", function () {
  fitTextToContainer(".dynamic-container", ".dynamic-text");
});

window.addEventListener("resize", function () {
  fitTextToContainer(".dynamic-container", ".dynamic-text");
});

// SLIDE IN ANIMATION WHEN IN VIEW
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".slide-in").forEach((el) => observer.observe(el));
