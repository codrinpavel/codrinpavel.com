const SELECTOR = "[data-reveal]";
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 25;
const MAX_DELAY_MS = 2500;

const BATCH_SELECTOR = "[data-reveal-batch]";
const MAX_BATCH_BLOCK_MS = 500;

let observer;
let elementOrder = new Map();

let nextRevealAt = 0;
let ready = false;
let pending = [];

function initReveals() {
  if (observer) {
    observer.disconnect();
  }

  const elements = [...document.querySelectorAll(SELECTOR)];

  elementOrder = new Map(elements.map((el, index) => [el, index]));
  nextRevealAt = 0;
  ready = false;
  pending = [];

  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.1,
  });

  for (const el of elements) {
    el.classList.remove(INVIEW_CLASS);
    el.style.removeProperty("--transition-delay");

    observer.observe(el);
  }

  forceHiddenState(elements);

  afterFirstPaint(() => {
    ready = true;

    const queuedEntries = observer.takeRecords();
    const queuedEntering = getEnteringFromEntries(queuedEntries);

    const initiallyVisible = elements.filter(el => {
      return (
        !el.classList.contains(INVIEW_CLASS) &&
        isInViewport(el)
      );
    });

    const toReveal = [
      ...new Set([
        ...pending,
        ...queuedEntering,
        ...initiallyVisible,
      ]),
    ];

    pending = [];

    if (toReveal.length) {
      reveal(toReveal);
    }
  });
}

function handleIntersect(entries) {
  const entering = getEnteringFromEntries(entries);

  if (!entering.length) return;

  if (!ready) {
    pending.push(...entering);
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

      el.style.setProperty("--transition-delay", `${Math.round(delay)}ms`);

      /*
        Force the browser to recognize the current hidden style
        before switching to the revealed style.
      */
      el.getBoundingClientRect();

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

function forceHiddenState(elements) {
  for (const el of elements) {
    /*
      Reading layout here forces style recalculation after removing
      .is-inview. This helps avoid hidden/revealed states being collapsed
      into the same render cycle.
    */
    el.getBoundingClientRect();
  }
}

function afterFirstPaint(callback) {
  /*
    requestAnimationFrame runs before paint.

    The first RAF lets the browser reach a paint opportunity.
    The timeout lets that paint actually commit.
    The second RAF starts the reveal on the next visual frame.
  */
  requestAnimationFrame(() => {
    setTimeout(() => {
      requestAnimationFrame(callback);
    }, 0);
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();

  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < viewportHeight &&
    rect.left < viewportWidth
  );
}

function revealVisibleElements() {
  if (!ready) return;

  const visible = [...document.querySelectorAll(SELECTOR)].filter(el => {
    return (
      !el.classList.contains(INVIEW_CLASS) &&
      isInViewport(el)
    );
  });

  if (visible.length) {
    reveal(visible);
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

window.addEventListener("load", revealVisibleElements, { once: true });

window.initReveals = initReveals;