import Lenis from 'lenis';

const scrollerWrapper = document.querySelector('.scroller');
const scrollerContent = document.querySelector('.scroller__track');

const lenis = new Lenis({
  wrapper: scrollerWrapper || window,
  content: scrollerContent || document.documentElement,
  orientation: scrollerContent ? 'horizontal' : 'vertical',
  autoRaf: true,
  lerp: 0.085,
});

export default lenis;