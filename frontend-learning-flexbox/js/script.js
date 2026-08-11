const tipButton = document.getElementById("tipButton");
const tipMessage = document.getElementById("tipMessage");

if (tipButton && tipMessage) {
  tipButton.addEventListener("click", () => {
    const isHidden = tipMessage.hasAttribute("hidden");

    if (isHidden) {
      tipMessage.textContent =
        "Use Flexbox for one-dimensional layouts. Start with display: flex, then control direction, wrapping, alignment and spacing.";
      tipMessage.removeAttribute("hidden");
      tipButton.textContent = "Hide CSS Tip";
    } else {
      tipMessage.setAttribute("hidden", "");
      tipButton.textContent = "Show CSS Tip";
    }
  });
}
