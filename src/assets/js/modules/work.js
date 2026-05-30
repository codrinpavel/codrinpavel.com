import lenis from './lenis.js';

const workSection = document.querySelector('#work');
const filterNav = document.querySelector('.work-filters');
const filterButtons = filterNav.querySelectorAll('[data-filter]');
const table = document.querySelector('.work-table');

// Any element that participates in filtering
const filterableElements = document.querySelectorAll('[data-tags]');

function matchesFilter(element, filter) {
  return element.dataset.tags
    ?.split(',')
    .map(tag => tag.trim())
    .includes(filter);
}

function updateElements() {
  filterableElements.forEach((element) => {
    element.hidden = !matchesFilter(element, table.dataset.filter);
  });
}

function updateClientHeadings() {
  let lastClient = null;

  table.querySelectorAll('tr[data-client]').forEach((row) => {
    const heading = row.querySelector('td:first-child .type-large');

    if (!heading) return;

    // hidden rows should never hide headings
    if (row.hidden) {
      heading.hidden = false;
      return;
    }

    heading.hidden = row.dataset.client === lastClient;
    lastClient = row.dataset.client;
  });
}

function setFilter(filter) {
  table.dataset.filter = filter;

  filterButtons.forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      button.dataset.filter === filter ? 'true' : 'false'
    );
  });

  updateElements();
  updateClientHeadings();
}

function isNavSticky() {
  return filterNav.getBoundingClientRect().top <= 1;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    if (isNavSticky()) {
      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = 'auto';

      setFilter(filter);

      lenis.scrollTo(workSection, {
        offset: 0,
        duration: 1.2,
        lock: true,
      });

      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousScrollBehavior;
      });
    }
    else {
      lenis.scrollTo(workSection, {
        offset: 0,
        duration: 1.2,
        lock: true,
      });

      setFilter(filter);
    }
  });
});

setFilter('award');