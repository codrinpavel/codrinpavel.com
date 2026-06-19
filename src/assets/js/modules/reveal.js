const SELECTOR = "[data-reveal]";
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 25;
const MAX_DELAY_MS = 9999;

const elements = [...document.querySelectorAll(SELECTOR)];
const elementOrder = new Map(elements.map((el, index) => [el, index]));

let nextRevealAt = 0;

const observer = new IntersectionObserver(handleIntersect, {
  threshold: 0.1,
});

elements.forEach(el => observer.observe(el));

function handleIntersect(entries) {
  const now = performance.now();

  const entering = entries
    .filter(entry => entry.isIntersecting)
    .map(entry => entry.target)
    .sort((a, b) => elementOrder.get(a) - elementOrder.get(b));

  if (!entering.length) return;

  nextRevealAt = Math.max(nextRevealAt, now);

  for (const el of entering) {
    const extraDelay = Number(el.dataset.delay || 0);
    const stagger = Number(el.dataset.stagger || DEFAULT_STAGGER_MS);

    nextRevealAt += extraDelay;

    const delay = Math.round(Math.min(nextRevealAt - now, MAX_DELAY_MS));

    el.style.setProperty("--animation-delay", `${delay}ms`);
    el.classList.add(INVIEW_CLASS);

    nextRevealAt += stagger;

    observer.unobserve(el);
  }
}