import Lenis from 'lenis';

const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  allowNestedScroll: true,
  naiveDimensions: true,
  stopInertiaOnNavigate: true,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let snapTimeout;

lenis.on("scroll", () => {
  clearTimeout(snapTimeout);

  snapTimeout = setTimeout(() => {
    const sections = [...document.querySelectorAll(".js-snap")];
    const SNAP_THRESHOLD = window.innerHeight * 0.3;

    // find sections near the top of viewport
    const candidate = sections.find(section => {
      const rect = section.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.top <= SNAP_THRESHOLD
      );
    });

    if (!candidate) return;

    lenis.scrollTo(candidate, {
      offset: 0,
      duration: 0.8,
      easing: t => 1 - Math.pow(1 - t, 3),
    });
  }, 120);
});










const buttons = document.querySelectorAll('[data-index]');
const totalItems = 4;

function scrollToHorizontalItem(index) {
  const container = document.querySelector(".hero");
  const totalItems = 4;

  const scrollStart = container.offsetTop;
  const scrollEnd = container.offsetTop + container.offsetHeight - window.innerHeight;

  const progress = index / (totalItems - 1);

  window.scrollTo({
    top: scrollStart + progress * (scrollEnd - scrollStart),
    behavior: "smooth",
  })
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.index);

    scrollToHorizontalItem(index);
  })
})