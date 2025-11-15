export function initFitText() {
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

  fitTextToContainer(".dynamic-container", ".dynamic-text");

  window.addEventListener("resize", () => {
    fitTextToContainer(".dynamic-container", ".dynamic-text");
  });
}
