import lenis from "./lenis.js";

const items = [...document.querySelectorAll('.w li')];
const activeClass = 'is-active';
const visibleItems = new Set();

let activeItem = null;
let isScrolling = false;
let scrollTimeout = null;

function setActive(item) {
  document
    .querySelectorAll(`.${activeClass}`)
    .forEach(el => el.classList.remove(activeClass));

  if (item?.dataset.id) {
    document
      .querySelectorAll(`[data-id="${CSS.escape(item.dataset.id)}"]`)
      .forEach(el => el.classList.add(activeClass));
  }

  activeItem = item;
}

function updateActive() {
  if (!visibleItems.size) return;

  const viewportCenter = window.innerHeight / 2;

  let closest = null;
  let closestDistance = Infinity;

  visibleItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = item;
    }
  });

  if (!closest || closest === activeItem) return;

  setActive(closest);
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleItems.add(entry.target);
      } else {
        visibleItems.delete(entry.target);
      }
    });

    updateActive();
  },
  {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100)
  }
);

lenis.on('scroll', ({ velocity }) => {
  isScrolling = Math.abs(velocity) > 0.01;
});

items.forEach(item => {
  observer.observe(item);

  item.addEventListener('mouseenter', () => {
    if (isScrolling) return;
    setActive(item);
  });

  item.addEventListener('click', () => {
    setActive(item);
  });
});