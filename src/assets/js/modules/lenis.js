import Lenis from 'lenis';

const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  allowNestedScroll: true,
  naiveDimensions: true,
  stopInertiaOnNavigate: true,
  lerp: 0.085,
});

document.querySelectorAll('section').forEach((section) => {
  new Lenis({
    wrapper: section,
    autoRaf: true,
    autoToggle: true,
    anchors: true,
    allowNestedScroll: true,
    naiveDimensions: true,
    stopInertiaOnNavigate: true,
    lerp: 0.085,
  });
});

export default lenis;