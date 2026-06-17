import Lenis from 'lenis';

const scrollerWrapper = document.querySelector('.scroller');
const scrollerContent = document.querySelector('.scroller__track');

const sectionWrapper = document.querySelector('main');
const sectionContent = document.querySelector('section');

const lenis = new Lenis({
  wrapper: scrollerWrapper || sectionWrapper,
  content: scrollerContent || sectionContent,
  orientation: scrollerContent ? 'horizontal' : 'vertical',
  autoRaf: true,
  lerp: 0.085,
});

export default lenis;