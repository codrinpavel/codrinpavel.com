import Lenis from 'lenis';

const content = document.querySelector('.scroller');

const lenis = new Lenis({
  wrapper: document.querySelector('section'),
  content: content || document.documentElement,
  orientation: content ? 'horizontal' : 'vertical',
  autoRaf: true,
  lerp: 0.085,
});

export default lenis;