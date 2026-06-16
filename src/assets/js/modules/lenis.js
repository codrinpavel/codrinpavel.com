import Lenis from 'lenis';

const wrapper = document.querySelector('.scroller');
const content = document.querySelector('.scroller__track');

const lenis = new Lenis({
  wrapper: wrapper || window,
  content: content || document.documentElement,
  orientation: content ? 'horizontal' : 'vertical',
  autoRaf: true,
  lerp: 0.085,
});

export default lenis;