import Lenis from 'lenis';

const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  allowNestedScroll: true,
  naiveDimensions: true,
  stopInertiaOnNavigate: true,
});

const totalItems = 4;

function scrollToHorizontalItem(index) {
  const container = document.querySelector(".hero");
  const totalItems = 4;

  const scrollStart = container.offsetTop
  const scrollEnd = container.offsetTop + container.offsetHeight - window.innerHeight;

  const progress = index / (totalItems - 1)

  window.scrollTo({
    top: scrollStart + progress * (scrollEnd - scrollStart),
    behavior: "smooth",
  })
}

const buttons = document.querySelectorAll('[data-index]');

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.index)

    scrollToHorizontalItem(index)
  })
})