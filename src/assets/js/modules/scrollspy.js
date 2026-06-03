const links = [...document.querySelectorAll('a[href^="#"]')];

const items = links
  .map(link => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

const visibleSections = new Set();

const observerOptions = {
  rootMargin: '-100px 0px -70% 0px',
  threshold: 0
};

function setActive(id) {
  links.forEach(link => {
    link.classList.toggle(
      "is-active",
      id && link.getAttribute("href") === `#${id}`
    );
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;

    if (entry.isIntersecting) {
      visibleSections.add(id);
    } else {
      visibleSections.delete(id);
    }
  });

  const activeId = [...visibleSections][0];

  setActive(activeId || null);
}, observerOptions);

items.forEach(item => observer.observe(item.section));