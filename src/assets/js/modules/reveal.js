const SELECTOR = "[data-reveal],[data-inview]";
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 25;

let observer;
let elementOrder = new Map();

let queued = new Set();
let revealFrame = 0;

function initReveals() {
  if (observer) {
    observer.disconnect();
  }

  const elements = Array.from(document.querySelectorAll(SELECTOR));

  elementOrder = new Map(elements.map((el, index) => [el, index]));

  queued.clear();
  revealFrame = 0;

  for (const el of elements) {
    el.classList.remove(INVIEW_CLASS);
    el.style.removeProperty("--transition-delay");
  }

  if (!("IntersectionObserver" in window)) {
    reveal(elements);
    return;
  }

  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0,
    rootMargin: "0px 0px 25% 0px",
  });

  for (const el of elements) {
    observer.observe(el);
  }
}

function handleIntersect(entries) {
  const entering = entries
    .filter(entry => {
      return (
        entry.isIntersecting &&
        !entry.target.classList.contains(INVIEW_CLASS)
      );
    })
    .map(entry => entry.target);

  if (!entering.length) return;

  queueReveal(entering);
}

function queueReveal(elements) {
  for (const el of elements) {
    queued.add(el);
  }

  if (revealFrame) return;

  revealFrame = requestAnimationFrame(() => {
    revealFrame = 0;

    const elements = Array.from(queued);
    queued.clear();

    reveal(elements);
  });
}

function reveal(elements) {
  elements = elements.filter(el => {
    return !el.classList.contains(INVIEW_CLASS);
  });

  if (!elements.length) return;

  elements.sort((a, b) => {
    return elementOrder.get(a) - elementOrder.get(b);
  });

  /*
    Local timeline.

    This resets every time reveal() runs.
    So visible elements sequence together,
    but later scroll reveals start from 0 again.
  */
  let delay = 0;

  for (const el of elements) {
    const extraDelay = toNumber(el.dataset.delay, 0);
    const stagger = toNumber(el.dataset.stagger, DEFAULT_STAGGER_MS);

    delay += extraDelay;

    el.style.setProperty(
      "--transition-delay",
      `${Math.round(delay)}ms`
    );

    el.classList.add(INVIEW_CLASS);

    delay += stagger;

    if (observer) {
      observer.unobserve(el);
    }
  }
}

function toNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveals, { once: true });
} else {
  initReveals();
}

window.addEventListener("pageshow", event => {
  if (event.persisted) {
    initReveals();
  }
});

window.initReveals = initReveals;