document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section-reveal");

  sections.forEach((section, index) => {
    window.setTimeout(() => {
      section.classList.add("is-visible");
    }, 70 * index);
  });

  const copyButton = document.querySelector("[data-copy-target]");

  if (copyButton instanceof HTMLButtonElement) {
    copyButton.addEventListener("click", async () => {
      const targetId = copyButton.getAttribute("data-copy-target");

      if (!targetId) {
        return;
      }

      const source = document.getElementById(targetId);

      if (!source) {
        return;
      }

      const previousLabel = copyButton.textContent;

      try {
        await navigator.clipboard.writeText(source.textContent ?? "");
        copyButton.textContent = "Copied";
      } catch {
        copyButton.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        copyButton.textContent = previousLabel;
      }, 1400);
    });
  }
});
