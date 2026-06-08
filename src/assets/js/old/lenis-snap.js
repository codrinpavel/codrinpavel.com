import lenis from './lenis';

const sections = [...document.querySelectorAll(".js-snap")];
let sectionTops = [];
let snapTimeout;
let isSnapping = false;

function updateSectionTops() {
  sectionTops = sections.map(section => ({
    el: section,
    top: section.offsetTop,
  }));
}

updateSectionTops();
window.addEventListener("resize", updateSectionTops);

lenis.on("scroll", ({ scroll }) => {
  if (isSnapping) return;
  clearTimeout(snapTimeout);

  snapTimeout = setTimeout(() => {
    const SNAP_THRESHOLD = window.innerHeight * 0.3;

    const candidate = sectionTops.find(({ top }) => {
      const distance = top - scroll;

      return (
        distance >= 0 &&
        distance <= SNAP_THRESHOLD
      );
    });

    if (!candidate) return;
    isSnapping = true;

    lenis.scrollTo(candidate.el, {
      offset: 0,
      duration: 0.8,
      easing: t => 1 - Math.pow(1 - t, 3),
      onComplete: () => {
        isSnapping = false;
      },
    });
  }, 120);
});