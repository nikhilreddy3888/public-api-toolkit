document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section-reveal");

  sections.forEach((section, index) => {
    window.setTimeout(() => {
      section.classList.add("is-visible");
    }, 70 * index);
  });

  document.querySelectorAll("[data-copy-target]").forEach((copyButton) => {
    if (!(copyButton instanceof HTMLButtonElement)) return;

    copyButton.addEventListener("click", async () => {
      const targetId = copyButton.getAttribute("data-copy-target");

      if (!targetId) return;

      const source = document.getElementById(targetId);

      if (!source) return;

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
  });
});

function switchTab(name) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  if (event && event.target) event.target.classList.add("active");
  const panel = document.getElementById("tab-" + name);
  if (panel) panel.classList.add("active");
}

function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle("open");
}