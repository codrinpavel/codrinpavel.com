const SELECTOR = "[data-reveal],[data-inview]";
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 25;
const MAX_DELAY_MS = 2500;

const BATCH_SELECTOR = "[data-reveal-batch]";
const MAX_BATCH_BLOCK_MS = 500;

let observer;
let elementOrder = new Map();

let nextRevealAt = 0;
let ready = false;
let pending = new Set();

function initReveals() {
  if (observer) {
    observer.disconnect();
  }

  document.documentElement.classList.add("js-reveals");

  const elements = Array.from(document.querySelectorAll(SELECTOR));

  elementOrder = new Map(elements.map((el, index) => [el, index]));
  nextRevealAt = 0;
  ready = false;
  pending = new Set();

  for (const el of elements) {
    el.classList.remove(INVIEW_CLASS);
    el.style.removeProperty("--transition-delay");
    el.style.removeProperty("--reveal-delay");
  }

  if (!("IntersectionObserver" in window)) {
    afterFirstPaint(() => {
      reveal(elements);
    });

    return;
  }

  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.1,
  });

  for (const el of elements) {
    observer.observe(el);
  }

  /*
    Wait until the browser has had a real paint opportunity with the hidden CSS.

    This replaces the old forced-layout hack.

    No getBoundingClientRect().
    No offsetHeight.
    No synchronous layout read.
  */
  afterFirstPaint(() => {
    ready = true;

    const queuedEntries = observer.takeRecords();
    const queuedEntering = getEnteringFromEntries(queuedEntries);

    for (const el of queuedEntering) {
      pending.add(el);
    }

    if (pending.size) {
      reveal(Array.from(pending));
      pending.clear();
    }
  });
}

function handleIntersect(entries) {
  const entering = getEnteringFromEntries(entries);

  if (!entering.length) return;

  if (!ready) {
    for (const el of entering) {
      pending.add(el);
    }

    return;
  }

  reveal(entering);
}

function getEnteringFromEntries(entries) {
  return entries
    .filter(entry => {
      return (
        entry.isIntersecting &&
        !entry.target.classList.contains(INVIEW_CLASS)
      );
    })
    .map(entry => entry.target);
}

function reveal(entering) {
  const now = performance.now();

  entering = entering.filter(el => {
    return !el.classList.contains(INVIEW_CLASS);
  });

  if (!entering.length) return;

  entering.sort((a, b) => {
    return elementOrder.get(a) - elementOrder.get(b);
  });

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
      const extraDelay = toNumber(el.dataset.delay, 0);
      const stagger = toNumber(el.dataset.stagger, DEFAULT_STAGGER_MS);

      const delayAt = revealAt + extraDelay;
      const delay = Math.min(
        Math.max(delayAt - now, 0),
        MAX_DELAY_MS
      );

      /*
        Keep the old custom property for compatibility,
        but also expose a clearer one for animation CSS.
      */
      const delayValue = `${Math.round(delay)}ms`;

      el.style.setProperty("--transition-delay", delayValue);
      el.style.setProperty("--reveal-delay", delayValue);

      /*
        This now triggers a keyframe animation, not a transition that depends
        on a previously flushed layout state.
      */
      el.classList.add(INVIEW_CLASS);

      revealAt = delayAt + stagger;

      if (observer) {
        observer.unobserve(el);
      }
    }

    if (group.batch) {
      nextRevealAt = Math.min(
        revealAt,
        groupStartAt + MAX_BATCH_BLOCK_MS
      );
    } else {
      nextRevealAt = revealAt;
    }
  }
}

function afterFirstPaint(callback) {
  requestAnimationFrame(() => {
    setTimeout(() => {
      requestAnimationFrame(callback);
    }, 0);
  });
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