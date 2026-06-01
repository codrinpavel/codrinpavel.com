import lenis from "./lenis.js";

const buttons = document.querySelectorAll('[data-index]');
const totalItems = 4;

function scrollToHorizontalItem(index) {
  const container = document.querySelector(".hero");

  const scrollStart = container.offsetTop;
  const scrollEnd =
    container.offsetTop + container.offsetHeight - window.innerHeight;

  const progress = index / (totalItems - 1);
  const target = scrollStart + progress * (scrollEnd - scrollStart);

  lenis.scrollTo(target, {
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.index);
    scrollToHorizontalItem(index);
  });
});