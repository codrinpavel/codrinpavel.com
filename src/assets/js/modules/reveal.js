const SELECTOR = "[data-reveal]";
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 25;
const MAX_DELAY_MS = 2500;

const BATCH_SELECTOR = "[data-reveal-batch]";
const MAX_BATCH_BLOCK_MS = 500;

const elements = [...document.querySelectorAll(SELECTOR)];
const elementOrder = new Map(elements.map((el, index) => [el, index]));

let nextRevealAt = 0;
let ready = false;
let pending = [];

requestAnimationFrame(() => {
  ready = true;
  if (pending.length) {
    reveal(pending);
    pending = [];
  }
});

const observer = new IntersectionObserver(handleIntersect, {
  threshold: 0.1,
});

elements.forEach(el => observer.observe(el));

function handleIntersect(entries) {
  const entering = entries
    .filter(entry => entry.isIntersecting)
    .map(entry => entry.target);

  if (!entering.length) return;

  if (!ready) {
    pending.push(...entering);
    return;
  }

  reveal(entering);
}

function reveal(entering) {
  const now = performance.now();

  entering.sort((a, b) => elementOrder.get(a) - elementOrder.get(b));

  nextRevealAt = Math.max(nextRevealAt, now);

  const groups = [];

  for (const el of entering) {
    const batch = el.closest(BATCH_SELECTOR);

    if (batch) {
      let group = groups.find(group => group.batch === batch);
      if (!group) {
        group = { batch, elements: [] };
        groups.push(group);
      }
      group.elements.push(el);
    } else {
      groups.push({ batch: null, elements: [el] });
    }
  }

  for (const group of groups) {
    const groupStartAt = nextRevealAt;
    let revealAt = groupStartAt;

    for (const el of group.elements) {
      const extraDelay = Number(el.dataset.delay) || 0;
      const stagger = Number(el.dataset.stagger) || DEFAULT_STAGGER_MS;

      revealAt += extraDelay;

      const delay = Math.min(revealAt - now, MAX_DELAY_MS) | 0;

      el.style.setProperty("--transition-delay", `${delay}ms`);
      el.classList.add(INVIEW_CLASS);

      revealAt += stagger;
      observer.unobserve(el);
    }

    if (group.batch) {
      nextRevealAt = Math.min(revealAt, groupStartAt + MAX_BATCH_BLOCK_MS);
    } else {
      nextRevealAt = revealAt;
    }
  }
}