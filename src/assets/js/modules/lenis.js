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

const wrapper = document.querySelector('.scroller__sticky');
const track = document.querySelector('.scroller__track');

if (track && wrapper) {
  const horizontalLenis = new Lenis({
    wrapper: wrapper,
    content: track,
    orientation: 'horizontal',
    gestureOrientation: 'both',
    smoothWheel: true,
    smoothTouch: false,
    autoRaf: true,
    lerp: 0.085,
  });
}

export default lenis;